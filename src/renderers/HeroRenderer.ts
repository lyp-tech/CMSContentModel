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
      ...options
    };
  }

  /**
   * Renders the hero section as an HTMLElement
   * @returns HTMLElement containing the rendered hero section
   */
  render(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'bg-white py-8 px-4 border-b border-gray-200';
    section.innerHTML = this.renderContent();
    return section;
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
