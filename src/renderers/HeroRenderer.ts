import { HeroSectionOptions } from '../models/HeroSectionOptions';

/**
 * Renders a hero section with logo, navigation, search, and highlights.
 * This component is designed to be used as a site header.
 */
export class HeroRenderer {
  private options: HeroSectionOptions;

  /**
   * Creates a new HeroRenderer instance
   * @param options Configuration options for the hero section
   */
  constructor(options: HeroSectionOptions) {
    this.options = {
      logoAlt: 'Logo',
      searchPlaceholder: 'Search...',
      searchAction: '#',
      highlights: [],
      ...options,
      hero: options.hero ? {
        title: options.hero.title || '',
        subtitle: options.hero.subtitle || '',
        searchPlaceholder: options.hero.searchPlaceholder || 'Search...',
        popularSearches: options.hero.popularSearches || [],
        backgroundImage: options.hero.backgroundImage,
        foregroundImage: options.hero.foregroundImage,
        foregroundImageSizeClass: options.hero.foregroundImageSizeClass || 'w-3/4 max-w-2xl'
      } : undefined
    };
  }

  /**
   * Renders the hero section as an HTMLElement
   * @returns HTMLElement containing the rendered hero section
   */
  render(): HTMLElement {
    // If hero section is defined, render it
    /*if (this.options.hero) {
      return this.renderHeroSection();
    }*/
    
    // Otherwise, render the default header
    const section = document.createElement('section');
    section.className = 'bg-white py-8 px-4 border-b border-gray-200';

    section.innerHTML = this.renderContent();

    // --- View mode toggle ---
    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';
    btnGroup.setAttribute('role', 'group');
    btnGroup.setAttribute('aria-label', 'View mode toggle');

    section.appendChild(btnGroup);
    section.appendChild(this.renderHeroSection())
    return section;
  }

  /**
   * Renders the hero section with title, subtitle, and search
   * @private
   */
  private renderHeroSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'relative bg-white ';
    section.innerHTML = `
      <div class="px-6 pt-8 md:pt-16 relative z-10">
        <div class="max-w-2xl mx-auto pt-8 relative">
          <!-- Heading -->
          <h1 class="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-4">
            ${this.options.hero?.title || ''}
          </h1>
          <!-- Subheading -->
          <div class="text-center my-6">
            <p class="text-lg md:text-xl text-gray-600">
              ${this.options.hero?.subtitle || ''}
            </p>
          </div>
          ${this.renderHeroSearch()}
        </div>
      </div>
      ${this.renderHeroImages()}
    `;
    return section;
  }

  /**
   * Renders the search bar for the hero section
   * @private
   */
  private renderHeroSearch(): string {
    if (!this.options.hero) return '';
    
    return `
      <div class="bg-white px-6 py-4 rounded-lg shadow-md relative z-10">
        <form class="flex flex-col md:flex-row items-center gap-4" role="search" aria-label="Site Search">
          <label for="moe-search-input" class="sr-only">Search</label>
          <input
            type="text"
            id="moe-search-input"
            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="${this.options.hero.searchPlaceholder}"
            autocomplete="off"
          />
          <button
            type="submit"
            aria-label="Search"
            class="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Search
          </button>
        </form>
        ${this.renderPopularSearches()}
      </div>
    `;
  }

  /**
   * Renders the popular searches section
   * @private
   */
  private renderPopularSearches(): string {
    const searches = this.options.hero?.popularSearches || [];
    if (searches.length === 0) return '';

    return `
      <div class="mt-4 text-sm text-gray-500">
        <span class="font-medium text-gray-700">Popular:</span>
        ${searches.map((search, index) => `
          ${index > 0 ? '|' : ''}
          <span class="ml-2 hover:text-blue-600 cursor-pointer">${search}</span>
        `).join(' ')}
      </div>
    `;
  }

  /**
   * Renders the hero section images (background and foreground)
   * @private
   */
  private renderHeroImages(): string {
    if (!this.options.hero) return '';
    
    const { backgroundImage, foregroundImage, foregroundImageSizeClass } = this.options.hero;
    return `
      ${foregroundImage ? `
        <img
          src="${foregroundImage}"
          alt=""
          class="mx-auto mt-12 mb-4 z-10 relative ${foregroundImageSizeClass}"
        />
      ` : ''}
      ${backgroundImage ? `
        <img
          src="${backgroundImage}"
          alt=""
          class="absolute top-90 left-0 w-full h-32 md:h-48 pointer-events-none z-20"
        />
      ` : ''}
    `;
  }

  /**
   * Renders the inner content of the hero section
   * @private
   */
  private renderContent(): string {
    return `
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        ${this.renderLogoAndNav()}
        ${this.renderSearch()}
        ${this.renderHighlights()}
      </div>
    `;
  }

  /**
   * Renders the logo and navigation section
   * @private
   */
  private renderLogoAndNav(): string {
    return `
      <div class="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
        <img 
          src="${this.options.logoUrl}" 
          alt="${this.options.logoAlt}" 
          class="h-16 w-auto mb-4 md:mb-0"
        >
        <nav class="flex gap-4 text-blue-900 font-semibold text-lg">
          ${this.options.navItems.map(item => `
            <a 
              href="${item.url}" 
              class="hover:underline"
            >${item.text}</a>
          `).join('')}
        </nav>
      </div>
    `;
  }

  /**
   * Renders the search form
   * @private
   */
  private renderSearch(): string {
    return `
      <form 
        class="flex w-full md:w-1/3" 
        role="search" 
        aria-label="Site Search"
        action="${this.options.searchAction}"
        method="get"
      >
        <input
          type="search"
          placeholder="${this.options.searchPlaceholder}"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          name="q"
          aria-label="Search input"
        />
        <button
          type="submit"
          class="bg-blue-700 text-white px-4 py-2 rounded-r-lg hover:bg-blue-800 transition"
          aria-label="Submit search"
        >
          Search
        </button>
      </form>
    `;
  }

  /**
   * Renders the highlights panel if any highlights are provided
   * @private
   */
  private renderHighlights(): string {
    if (!this.options.highlights?.length) return '';

    return `
      <div class="hidden md:flex flex-col items-end gap-2 w-72">
        ${this.options.highlights.map(highlight => `
          <div class="${this.getHighlightClass(highlight.type)} px-4 py-2 rounded font-medium text-sm">
            <span>${highlight.text}</span>
            ${highlight.link ? `
              <a 
                href="${highlight.link.url}" 
                class="underline text-blue-700 ml-1"
              >${highlight.link.text}</a>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Returns the appropriate CSS classes for a highlight based on its type
   * @param type The type of highlight
   * @private
   */
  private getHighlightClass(type: string): string {
    const classes = {
      info: 'bg-blue-50 text-blue-900',
      warning: 'bg-yellow-100 text-yellow-900',
      success: 'bg-green-50 text-green-900',
      error: 'bg-red-50 text-red-900'
    };
    return classes[type as keyof typeof classes] || classes.info;
  }
}
