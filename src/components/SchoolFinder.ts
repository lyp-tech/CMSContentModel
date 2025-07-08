import { 
  SchoolFinderOptions,
  SchoolCard,
  LocationFilterOption,
  AreaOption,
  PartnerCenterOption,
  SpecialNeedsOption
} from '../models/SchoolFinderOptions';
import '@govtechsg/sgds-web-component';
import '@govtechsg/sgds-web-component/themes/root.css';

/**
 * SchoolFinder component for displaying school search interface with filters and results
 * 
 * Usage:
 * <school-finder>
 *   <script type="application/json">
 *     {
 *       "resultsTitle": "MOE Kindergartens",
 *       "distanceOptions": [...],
 *       "areas": [...],
 *       "partnerCenters": [...],
 *       "specialNeeds": [...],
 *       "schools": [...]
 *     }
 *   </script>
 * </school-finder>
 */
export class SchoolFinder extends HTMLElement {
  private options: Required<SchoolFinderOptions> = {
    resultsTitle: 'MOE Kindergartens',
    addressPlaceholder: 'Enter your address or postal code',
    distanceOptions: [
      { label: 'Schools within 500m', value: '0.5', disabled: true },
      { label: 'Schools between 500m – 1 km', value: '1', disabled: true },
    ],
    areas: [],
    partnerCenters: [],
    specialNeeds: [],
    schools: [],
    totalCount: 0,
    containerClass: 'max-w-screen-xl mx-auto px-4 grid grid-cols-12 gap-3',
    sidebarClass: 'col-span-12 lg:col-span-4 pr-8 py-8',
    mainClass: 'col-span-12 lg:col-span-8 bg-gray-100 py-8 lg:ml-8'
  };
  
  // Search state
  private searchQuery = '';
  private selectedDistance = '';
  private selectedArea = '';
  private isLoading = false;
  private searchDebounceTimer: number | null = null;
  private searchDebounceDelay = 500; // ms

  constructor() {
    super();
  }

  connectedCallback() {
    this.style.display = 'block';
    this.style.width = '100%';
    this.parseData();
    this.render();
    this.setupEventListeners();
  }

  /**
   * Parse JSON data from child <script type="application/json"> tag
   */
  private parseData() {
    const script = this.querySelector('script[type="application/json"]');
    if (script) {
      try {
        const data = JSON.parse(script.textContent || '{}') as Partial<SchoolFinderOptions>;
        this.options = { ...this.options, ...data } as Required<SchoolFinderOptions>;
        
        // Calculate total count if not provided
        if (!data.totalCount && data.schools) {
          this.options.totalCount = data.schools.length;
        }
      } catch (err) {
        console.error('Failed to parse SchoolFinder data', err);
      }
    }
  }

  /**
   * Use light DOM for better CSS integration
   */
  createRenderRoot() {
    return this;
  }

  /**
   * Setup event listeners for interactive elements
   */
  private setupEventListeners() {
    // Clear all button
    const clearAllBtn = this.querySelector('#clearAllBtn');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        this.clearAllFilters();
      });
    }

    // Address search input
    const addressInput = this.querySelector('.moe-autosuggest input');
    if (addressInput) {
      addressInput.addEventListener('input', (e) => {
        this.handleAddressInput(e as InputEvent);
      });
      
      addressInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.performSearch();
        }
      });
    }
    
    // Distance radio buttons
    const distanceRadios = this.querySelectorAll('input[name="postal-code-filter"]');
    distanceRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        this.handleDistanceChange(radio as HTMLInputElement);
      });
    });
    
    // Area select
    const areaSelect = this.querySelector('.moe-select button');
    if (areaSelect) {
      areaSelect.addEventListener('click', () => {
        this.toggleAreaDropdown();
      });
    }

    // Favorite buttons
    const favButtons = this.querySelectorAll('.moe-fav-love');
    favButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const card = (e.currentTarget as HTMLElement).closest('.moe-card');
        if (card) {
          const schoolName = card.querySelector('.font-heading.text-lg')?.textContent?.trim() || '';
          this.toggleFavorite(schoolName);
        }
      });
    });
  }
  
  /**
   * Handle address input changes with debounce
   */
  private handleAddressInput(e: InputEvent) {
    this.searchQuery = (e.target as HTMLInputElement).value;
    
    // Clear previous timer
    if (this.searchDebounceTimer) {
      window.clearTimeout(this.searchDebounceTimer);
    }
    
    // Set new timer for debounced search
    this.searchDebounceTimer = window.setTimeout(() => {
      if (this.searchQuery.length >= 3) {
        this.performSearch();
      }
    }, this.searchDebounceDelay);
  }
  
  /**
   * Handle distance radio button changes
   */
  private handleDistanceChange(radio: HTMLInputElement) {
    this.selectedDistance = radio.value;
    this.performSearch();
  }
  
  /**
   * Toggle area dropdown
   */
  private toggleAreaDropdown() {
    // Implementation will be added by user
    console.log('Toggle area dropdown');
  }
  
  /**
   * Handle area selection
   */
  private handleAreaSelection(area: string) {
    this.selectedArea = area;
    this.performSearch();
  }
  
  /**
   * Clear all filters
   */
  private clearAllFilters() {
    // Reset search state
    this.searchQuery = '';
    this.selectedDistance = '';
    this.selectedArea = '';
    
    // Reset UI elements
    const addressInput = this.querySelector('.moe-autosuggest input') as HTMLInputElement;
    if (addressInput) {
      addressInput.value = '';
    }
    
    const distanceRadios = this.querySelectorAll('input[name="postal-code-filter"]');
    distanceRadios.forEach(radio => {
      (radio as HTMLInputElement).checked = false;
    });
    
    // Reset area select
    const areaSelect = this.querySelector('.moe-select button');
    if (areaSelect) {
      areaSelect.textContent = 'Select an area';
    }
    
    // Dispatch event
    this.dispatchEvent(new CustomEvent('clear-filters', {
      bubbles: true,
      composed: true
    }));
    
    // Perform search with empty filters
    this.performSearch();
  }
  
  /**
   * Toggle favorite status for a school
   */
  private toggleFavorite(schoolName: string) {
    // Find the school in the list
    const schoolIndex = this.options.schools.findIndex(school => school.name === schoolName);
    
    if (schoolIndex !== -1) {
      // Toggle favorite status
      this.options.schools[schoolIndex].isFavorite = !this.options.schools[schoolIndex].isFavorite;
      
      // Update UI
      const favoriteButton = this.querySelector(`.moe-card:nth-child(${schoolIndex + 1}) .moe-fav-love`);
      if (favoriteButton) {
        favoriteButton.classList.toggle('active');
      }
      
      // Dispatch event
      this.dispatchEvent(new CustomEvent('toggle-favorite', {
        bubbles: true,
        composed: true,
        detail: { 
          schoolName,
          isFavorite: this.options.schools[schoolIndex].isFavorite 
        }
      }));
    }
  }
  
  /**
   * Perform search with current filters
   */
  private async performSearch() {
    try {
      this.setLoading(true);
      
      // Build search params
      const searchParams = new URLSearchParams();
      
      if (this.searchQuery) {
        searchParams.append('query', this.searchQuery);
      }
      
      if (this.selectedDistance) {
        searchParams.append('distance', this.selectedDistance);
      }
      
      if (this.selectedArea) {
        searchParams.append('area', this.selectedArea);
      }
      
      // Get selected partner centers
      const partnerCenters: string[] = [];
      this.querySelectorAll('input[id^="pc-"]:checked').forEach(checkbox => {
        partnerCenters.push((checkbox as HTMLInputElement).value);
      });
      
      if (partnerCenters.length > 0) {
        searchParams.append('partnerCenters', partnerCenters.join(','));
      }
      
      // Get selected special needs
      const specialNeeds: string[] = [];
      this.querySelectorAll('input[id^="sn-"]:checked').forEach(checkbox => {
        specialNeeds.push((checkbox as HTMLInputElement).value);
      });
      
      if (specialNeeds.length > 0) {
        searchParams.append('specialNeeds', specialNeeds.join(','));
      }
      
      // Call API
      const results = await this.fetchSchools(searchParams);
      
      // Update UI with results
      this.updateResults(results);
      
    } catch (error) {
      console.error('Error performing search:', error);
      this.showError('An error occurred while searching for schools. Please try again.');
    } finally {
      this.setLoading(false);
    }
  }
  
  /**
   * Fetch schools from API
   */
  private async fetchSchools(searchParams: URLSearchParams): Promise<SchoolCard[]> {
    // This is a placeholder implementation
    // The actual implementation will be added by the user
    
    console.log('Fetching schools with params:', searchParams.toString());
    
    // For now, return mock data or existing schools
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        resolve(this.options.schools);
      }, 500);
    });
  }
  
  /**
   * Update results in the UI
   */
  private updateResults(schools: SchoolCard[]) {
    // Update schools in options
    this.options.schools = schools;
    this.options.totalCount = schools.length;
    
    // Update results container
    const resultsContainer = this.querySelector('.moe-school-card-animation');
    if (resultsContainer) {
      resultsContainer.innerHTML = this.renderSchoolCards();
    }
    
    // Update count
    const countElement = this.querySelector('main span.block.mb-2');
    if (countElement) {
      countElement.innerHTML = `
        Showing <span class="font-bold">${this.options.totalCount}</span> ${this.options.resultsTitle}
      `;
    }
    
    // Setup event listeners for new cards
    this.setupFavoriteButtons();
  }
  
  /**
   * Setup favorite buttons for dynamically added cards
   */
  private setupFavoriteButtons() {
    const favButtons = this.querySelectorAll('.moe-fav-love');
    favButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const card = (e.currentTarget as HTMLElement).closest('.moe-card');
        if (card) {
          const schoolName = card.querySelector('.font-heading.text-lg')?.textContent?.trim() || '';
          this.toggleFavorite(schoolName);
        }
      });
    });
  }
  
  /**
   * Set loading state
   */
  private setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
    
    // Update UI to show loading state
    const resultsContainer = this.querySelector('.moe-school-card-animation');
    if (resultsContainer) {
      if (isLoading) {
        resultsContainer.classList.add('loading');
        // Optionally add loading indicator
        // resultsContainer.innerHTML = '<div class="loading-spinner"></div>';
      } else {
        resultsContainer.classList.remove('loading');
      }
    }
  }
  
  /**
   * Show error message
   */
  private showError(message: string) {
    // Implementation will be added by user
    console.error(message);
  }

  /**
   * Render the component
   */
  private render() {
    this.innerHTML = `
      <div id="moe-school-finder-container" class="${this.options.containerClass}">
        ${this.renderSidebar()}
        ${this.renderResults()}
      </div>
    `;
  }

  /**
   * Render the sidebar with filters
   */
  private renderSidebar() {
    return `
      <aside id="schoolFinderSidebar" class="${this.options.sidebarClass}">
        ${this.renderSidebarHeader()}
        <sgds-accordion>
          ${this.renderLocationAccordion()}
          ${this.renderPartnerCentersAccordion()}
          ${this.renderSpecialNeedsAccordion()}
        </sgds-accordion>
      </aside>
    `;
  }

  /**
   * Render the sidebar header
   */
  private renderSidebarHeader() {
    return `
      <div class="flex items-center justify-between text-gray-700 mb-4">
        <div class="flex items-center">
          <span class="text-xl mr-2 icon-filter"></span>
          <span class="text-base">Criteria</span>
        </div>
        <button id="clearAllBtn" class="text-primary-500 text-base">Clear all</button>
      </div>
    `;
  }

  /**
   * Render the location accordion
   */
  private renderLocationAccordion() {
    const distanceRadios = this.options.distanceOptions
      .map((opt, idx) => `
        <div class="moe-radio mt-4 ${opt.disabled ? 'type--disabled' : ''}">
          <input id="distance-${idx}" type="radio" name="postal-code-filter" value="${opt.value}" ${opt.disabled ? 'disabled' : ''} />
          <label for="distance-${idx}" class="pl-2">
            ${opt.label}
            <div class="check"></div>
          </label>
        </div>
      `)
      .join('');

    const areaOptions = this.options.areas
      .map(area => `<option value="${area.value}">${area.label}</option>`)
      .join('');

    return `
      <sgds-accordion-item open>
        <div slot="header" class="w-full flex items-center justify-between">
          <div>Location</div>
        </div>
        <div slot="content">
          <div class="mb-4 flex items-center">
            <span class="moe-tooltip mr-2" data-tippy-content="Information correct as November 2022. &#xA9; Singapore Land Authority." tabindex="0"></span>
            <span class="text-xs text-gray-500">Disclaimer</span>
          </div>
          
          <span class="block text-sm mb-2">Search for schools near you</span>
          
          <div class="moe-autosuggest moe-autosuggest--size-large mb-4">
            <input placeholder="${this.options.addressPlaceholder}" aria-label="${this.options.addressPlaceholder}" 
                   class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          
          ${distanceRadios}
          
          <span class="block my-6 text-sm font-bold">OR</span>
          
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm">Search for schools by area</span>
          </div>
          
          <div class="moe-select mb-4 moe-select--no-selection moe-select--size-full">
            <button type="button" class="w-full flex items-center justify-between border border-gray-300 rounded px-3 py-2">
              Select an area
              <span class="icon-dropdown"></span>
            </button>
            <!-- Area options: ${areaOptions} -->
          </div>
        </div>
      </sgds-accordion-item>
    `;
  }

  /**
   * Render the partner centers accordion
   */
  private renderPartnerCentersAccordion() {
    const checkboxes = this.options.partnerCenters
      .map(center => `
        <label for="pc-${center.id}" class="moe-checkbox flex items-center space-x-2 ${center === this.options.partnerCenters[0] ? '' : 'mt-2'}">
          <input id="pc-${center.id}" type="checkbox" value="${center.value}" ${center.selected ? 'checked' : ''} />
          <span class="checkmark type-grey-2"></span>
          <span class="text-sm text-gray-500">${center.label}</span>
        </label>
      `)
      .join('');

    return `
      <sgds-accordion-item>
        <div slot="header" class="w-full flex items-center justify-between">
          <div>Partner Early Years Centres</div>
        </div>
        <div slot="content">
          <div class="mb-4 flex items-center">
            <span class="moe-tooltip mr-2" data-tippy-content="E-Bridge Pre-school, NTUC My First Skool &#xA9;" tabindex="0"></span>
            <span class="text-xs text-gray-500">Who are they?</span>
          </div>
          ${checkboxes || `
            <label for="checkbox-my-first-skool" class="moe-checkbox flex items-center space-x-2">
              <input id="checkbox-my-first-skool" type="checkbox" value="My First Skool" />
              <span class="checkmark type-grey-2"></span>
              <span class="text-sm text-gray-500">My First Skool</span>
            </label>
            
            <label for="checkbox-pcf-sparkletots-preschool" class="moe-checkbox flex items-center space-x-2 mt-2">
              <input id="checkbox-pcf-sparkletots-preschool" type="checkbox" value="PCF Sparkletots Preschool" />
              <span class="checkmark type-grey-2"></span>
              <span class="text-sm text-gray-500">PCF Sparkletots Preschool</span>
            </label>
          `}
        </div>
      </sgds-accordion-item>
    `;
  }

  /**
   * Render the special needs accordion
   */
  private renderSpecialNeedsAccordion() {
    const checkboxes = this.options.specialNeeds
      .map(need => `
        <label for="sn-${need.id}" class="moe-checkbox flex items-center space-x-2 mt-2">
          <input id="sn-${need.id}" type="checkbox" value="${need.value}" ${need.selected ? 'checked' : ''} />
          <span class="checkmark type-grey-2"></span>
          <span class="text-sm text-gray-500">${need.label}</span>
        </label>
      `)
      .join('');

    return `
      <sgds-accordion-item>
        <div slot="header" class="w-full flex items-center justify-between">
          <div>Support for special educational needs</div>
        </div>
        <div slot="content">
          ${checkboxes || `
            <label for="checkbox-moderate-to-profound-hearing-loss-signing-approach" class="moe-checkbox flex items-center space-x-2 mt-2">
              <input id="checkbox-moderate-to-profound-hearing-loss-signing-approach" type="checkbox" 
                     value="Moderate to profound hearing loss (Signing Approach)" />
              <span class="checkmark type-grey-2"></span>
              <span class="text-sm text-gray-500">
                Moderate to profound hearing loss (Signing Approach)
              </span>
            </label>
          `}
          <span class="block text-sm text-gray-500 mb-1.5 mt-6">
            <strong>Note</strong>: All MKs are committed to supporting children &#xA9;
          </span>
        </div>
      </sgds-accordion-item>
    `;
  }

  /**
   * Render the results section
   */
  private renderResults() {
    return `
      <main class="${this.options.mainClass}">
        <div class="flex justify-between mb-4">
          <span class="text-2xl lg:text-2xl font-bold font-heading text-gray-700">
            ${this.options.resultsTitle}
          </span>
          
          <!-- Pagination placeholder -->
          <div class="moe-pagination">
            <!-- Pagination controls would go here -->
          </div>
        </div>
        
        <span class="block mb-2">
          Showing <span class="font-bold">${this.options.totalCount}</span> ${this.options.resultsTitle}
        </span>
        
        <div class="moe-school-card-animation">
          ${this.renderSchoolCards()}
        </div>
        
        <!-- Bottom pagination -->
        <div class="flex mt-8 justify-end">
          <div class="moe-pagination">
            <!-- Pagination controls would go here -->
          </div>
        </div>
      </main>
    `;
  }

  /**
   * Render the school cards
   */
  private renderSchoolCards() {
    if (this.options.schools.length === 0) {
      return `
        <div class="p-4 text-center text-gray-500">
          No schools found matching your criteria.
        </div>
      `;
    }

    return this.options.schools
      .map(school => `
        <div class="relative">
          <a href="${school.url}" target="_blank" tabindex="0" 
             class="moe-card hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4 mb-4">
            <div class="moe-card-inner">
              <div class="flex flex-row justify-between mb-1.5 items-center">
                <div>
                  <p class="font-heading text-lg font-semibold text-gray-700 mb-2">
                    ${school.name}
                  </p>
                  
                  <div class="flex flex-col">
                    <div class="flex flex-row items-center">
                      <span class="icon-landmark text-xl text-gray-500"></span>
                      <p class="text-sm text-gray-500 ml-2 font-bold">${school.area}</p>
                    </div>
                    <p class="text-sm text-gray-500 mt-0 ml-4 pl-4">
                      ${school.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <button class="moe-fav-love flex-shrink-0 ${school.isFavorite ? 'active' : ''}" tabindex="0" 
                    aria-label="${school.isFavorite ? 'Remove school from favorites' : 'Add school to favorites'}">
              <span class="icon-heart"></span>
            </button>
          </a>
        </div>
      `)
      .join('');
  }
}

// Register the web component
if (!customElements.get('school-finder')) {
  customElements.define('school-finder', SchoolFinder);
}

export default SchoolFinder;
