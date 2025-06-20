import { HeroSectionOptions } from '../models/HeroSectionOptions';
import { NavigationRenderer } from './NavigationRenderer';

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
    const section = document.createElement('div');
    
    // Create a container for logo and navigation
    const headerContainer = document.createElement('div');
    headerContainer.className = 'bg-white py-4 border-b border-gray-200';
    
    // Create a centered content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
    
    // Create a flex container for logo and nav
    const navContainer = document.createElement('div');
    navContainer.className = 'flex flex-col md:flex-row items-center justify-center gap-8';
    
    // Render the logo if URL is provided
    if (this.options.logoUrl) {
      const logo = document.createElement('img');
      logo.src = this.options.logoUrl;
      logo.alt = this.options.logoAlt || 'Logo';
      logo.className = 'h-16 w-auto';
      navContainer.appendChild(logo);
    }
    
    // Render the navigation bar
    if (this.options.navItems && this.options.navItems.length > 0) {
      const navRenderer = new NavigationRenderer({
        items: this.options.navItems,
        containerClass: '',
        itemClass: 'mx-2',
        submenuClass: 'mt-2',
        submenuItemClass: 'whitespace-nowrap',
        dropdownPosition: 'center',
        closeOnClickOutside: true
      });
      navContainer.appendChild(navRenderer.render());
    }
    
    contentWrapper.appendChild(navContainer);
    headerContainer.appendChild(contentWrapper);
    section.appendChild(headerContainer);
    
    // Render the hero section if defined
    if (this.options.hero) {
      section.appendChild(this.renderHeroSection());
    }
    
    return section;
  }

  /**
   * Renders the hero section with title, subtitle, and search
   * @private
   */
  private renderHeroSection(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'relative bg-white';
    
    const container = document.createElement('div');
    container.className = 'px-6 pt-8 md:pt-16 relative z-10';
    
    const content = document.createElement('div');
    content.className = 'max-w-2xl mx-auto pt-8 relative';
    
    // Add title
    if (this.options.hero?.title) {
      const title = document.createElement('h1');
      title.className = 'text-4xl md:text-5xl font-bold text-gray-800 text-center mb-4';
      title.textContent = this.options.hero.title;
      content.appendChild(title);
    }
    
    // Add subtitle
    if (this.options.hero?.subtitle) {
      const subtitleContainer = document.createElement('div');
      subtitleContainer.className = 'text-center my-6';
      
      const subtitle = document.createElement('p');
      subtitle.className = 'text-lg md:text-xl text-gray-600';
      subtitle.textContent = this.options.hero.subtitle;
      
      subtitleContainer.appendChild(subtitle);
      content.appendChild(subtitleContainer);
    }
    
    // Add search if enabled
    if (this.options.hero?.searchPlaceholder) {
      content.appendChild(this.renderHeroSearch());
    }
    
    container.appendChild(content);
    section.appendChild(container);
    
    // Add hero images if defined
    if (this.options.hero?.backgroundImage || this.options.hero?.foregroundImage) {
      const images = this.renderHeroImages();
      if (images) {
        section.insertAdjacentHTML('beforeend',images);
      }
    }
    
    return section;
  }

  /**
   * Renders the search bar for the hero section
   * @private
   */
  private renderHeroSearch(): HTMLElement {
    if (!this.options.hero) return document.createElement('div');
    
    const searchDiv = document.createElement('div');
    searchDiv.className = 'bg-white px-6 py-4 rounded-lg shadow-md relative z-10';
    
    const form = document.createElement('form');
    form.className = 'flex flex-col md:flex-row items-center gap-4';
    form.setAttribute('role', 'search');
    form.setAttribute('aria-label', 'Site Search');
    
    const label = document.createElement('label');
    label.setAttribute('for', 'moe-search-input');
    label.className = 'sr-only';
    label.textContent = 'Search';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'moe-search-input';
    input.className = 'flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200';
    input.placeholder = this.options.hero.searchPlaceholder;
    input.autocomplete = 'off';
    
    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition';
    button.setAttribute('aria-label', 'Search');
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('viewBox', '0 0 24 24');
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '11');
    circle.setAttribute('cy', '11');
    circle.setAttribute('r', '8');
    circle.setAttribute('stroke', 'currentColor');
    circle.setAttribute('stroke-width', '2');
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '21');
    line.setAttribute('y1', '21');
    line.setAttribute('x2', '16.65');
    line.setAttribute('y2', '16.65');
    line.setAttribute('stroke', 'currentColor');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-linecap', 'round');
    
    svg.appendChild(circle);
    svg.appendChild(line);
    
    button.appendChild(svg);
    button.appendChild(document.createTextNode('Search'));
    
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    
    searchDiv.appendChild(form);
    
    const popularSearches = this.renderPopularSearches();
    if (popularSearches) {
      searchDiv.insertAdjacentHTML('beforeend', popularSearches);
    }
    
    return searchDiv;
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
}
