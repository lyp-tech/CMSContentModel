import { NavigationItem } from '../models/NavigationOptions';

/**
 * A custom web component for site navigation using SGDS components
 * 
 * @element moe-navigation
 * 
 * @attr {string} logo-url - URL of the logo image
 * @attr {string} logo-alt - Alt text for the logo
 * @attr {string} logo-class - Additional CSS classes for the logo
 * 
 * @example
 * ```html
 * <moe-navigation logo-url="/logo.svg" logo-alt="Company Logo">
 *   <script type="application/json">
 *     [
 *       { "text": "Home", "url": "/" },
 *       { 
 *         "text": "Services",
 *         "url": "#",
 *         "subItems": [
 *           { "text": "Web Development", "url": "/services/web" },
 *           { "text": "Design", "url": "/services/design" }
 *         ]
 *       },
 *       { "text": "Contact", "url": "/contact", "slot": "end" }
 *     ]
 *   </script>
 *   <sgds-button slot="end" variant="primary">Login</sgds-button>
 * </moe-navigation>
 * ```
 */
export class NavigationBar extends HTMLElement {
  private _items: NavigationItem[] = [];
  private _shadow: ShadowRoot;

  static get observedAttributes() {
    return ['logo-url', 'logo-alt', 'logo-class'];
  }

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
  }

  disconnectedCallback() {
    // Clean up if needed
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this._render();
    }
  }

  // Getters for logo properties
  get logoUrl(): string | null {
    return this.getAttribute('logo-url');
  }

  get logoAlt(): string {
    return this.getAttribute('logo-alt') || 'Logo';
  }

  get logoClass(): string {
    return this.getAttribute('logo-class') || '';
  }

  private _parseNavigationItems(): NavigationItem[] {
    try {
      const script = this.querySelector('script[type="application/json"]');
      if (!script || !script.textContent) return [];
      
      const items = JSON.parse(script.textContent);
      if (!Array.isArray(items)) return [];
      
      return items as NavigationItem[];
    } catch (error) {
      console.error('Failed to parse navigation items:', error);
      return [];
    }
  }

  private _renderNavigationItems(items: NavigationItem[]): string {
    return items.map(item => {
      if (item.subItems && item.subItems.length > 0) {
        // Render dropdown menu
        return `
          <sgds-mainnav-dropdown ${item.slot ? `slot="${item.slot}"` : ''}>
            <span slot="toggler">${this._escapeHtml(item.text)}</span>
            ${item.subItems.map(subItem => 
              `<sgds-dropdown-item href="${this._escapeHtml(subItem.url)}">
                ${this._escapeHtml(subItem.text)}
              </sgds-dropdown-item>`
            ).join('')}
          </sgds-mainnav-dropdown>
        `;
      } else {
        // Render regular menu item
        return `
          <sgds-mainnav-item ${item.slot ? `slot="${item.slot}"` : ''}>
            <a href="${this._escapeHtml(item.url)}">
              ${this._escapeHtml(item.text)}
            </a>
          </sgds-mainnav-item>
        `;
      }
    }).join('');
  }

  private _escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private _render() {
    if (!this._shadow) return;

    // Parse navigation items
    const items = this._parseNavigationItems();
    
    // Render the navigation
    this._shadow.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        /* Ensure SGDS components are styled correctly */
        sgds-mainnav {
          --sgds-mainnav-bg: #fff;
          --sgds-mainnav-link-color: #333;
          --sgds-mainnav-link-hover-color: #0066cc;
          --sgds-dropdown-bg: #fff;
          --sgds-dropdown-link-color: #333;
          --sgds-dropdown-link-hover-bg: #f8f9fa;
        }
      </style>
      
      <sgds-mainnav>
        ${this.logoUrl ? `
          <img 
            slot="brand" 
            src="${this._escapeHtml(this.logoUrl)}" 
            alt="${this._escapeHtml(this.logoAlt)}" 
            class="${this._escapeHtml(this.logoClass)}"
          >
        ` : ''}
        
        ${this._renderNavigationItems(items.filter(item => !item.slot || item.slot !== 'end'))}
        
        <!-- Render items with slot="end" -->
        <div slot="end">
          ${this._renderNavigationItems(items.filter(item => item.slot === 'end'))}
          <slot name="end"></slot>
        </div>
        
        <slot name="non-collapsible"></slot>
      </sgds-mainnav>
    `;
  }
  }

  /**
   * Parses the navigation items from the script tag
   */
  private parseItems(): void {
    const script = this.querySelector('script[type="application/json"]');
    if (script) {
      try {
        this.items = JSON.parse(script.textContent || '[]');
      } catch (e) {
        console.error('Failed to parse navigation items:', e);
        this.items = [];
      }
    }
  }

  /**
   * Renders the navigation component
   */
  private render(): void {
    if (!this.shadowRoot) return;
    
    // Parse the navigation items from the script tag
    this.parseItems();

    const dropdownPosition = this.getAttribute('dropdown-position') || 'left';
    const itemClass = this.getAttribute('item-class') || '';
    const submenuClass = this.getAttribute('submenu-class') || '';
    const submenuItemClass = this.getAttribute('submenu-item-class') || '';
    const logoUrl = this.getAttribute('logo-url') || '';
    const logoAlt = this.getAttribute('logo-alt') || 'Logo';
    const logoClass = this.getAttribute('logo-class') || '';
    const logoLinkUrl = this.getAttribute('logo-link-url') || '/';
    const logoWidth = this.getAttribute('logo-width') || 'auto';
    const logoHeight = this.getAttribute('logo-height') || '4rem';
    const logoMaxWidth = this.getAttribute('logo-max-width') || 'none';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .navigation-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: white;
          padding: 1rem;
          width: 100%;
        }
        
        @media (min-width: 768px) {
          .navigation-container {
            flex-direction: row;
            justify-content: space-evenly;
            padding: 0.5rem 2rem;
          }
        }

        .logo-container {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        @media (min-width: 768px) {
          .logo-container {
            margin-bottom: 0;
            margin-right: 2rem;
          }
        }

        .logo-link {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .logo-img {
          width: ${logoWidth};
          height: ${logoHeight};
          max-width: ${logoMaxWidth};
          object-fit: contain;
          display: block;
        }
        
        .navigation-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          list-style: none;
          margin: 0;
          padding: 0;
          width: 100%;
        }
        
        @media (min-width: 768px) {
          .navigation-list {
            justify-content: flex-start;
            flex-wrap: nowrap;
            width: auto;
          }
        }
        
        .navigation-item {
          position: relative;
          height: 100%;
          display: flex;
          align-items: flex-end;
        }
        
        .navigation-link {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          color: #1a365d;
          text-decoration: none;
          height: 100%;
          position: relative;
        }
        
        .navigation-link:hover {
          color: #2c5282;
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
          border-top: none;
          border-radius: 0 0 0.375rem 0.375rem;
          min-width: 12rem;
          z-index: 50;
          display: none;
        }
        
        .dropdown-menu[data-position="center"] {
          left: 50%;
          transform: translateX(-50%);
        }
        
        .dropdown-menu[data-position="right"] {
          left: auto;
          right: 0;
        }
        
        .dropdown-item {
          display: block;
          padding: 0.5rem 1rem;
          color: #2d3748;
          text-decoration: none;
          white-space: nowrap;
        }
        
        .dropdown-item:hover {
          background-color: #f7fafc;
          color: #2b6cb0;
        }
        
        .dropdown-toggle {
          display: inline-flex;
          align-items: center;
          margin-left: 0.25rem;
        }
        
        .dropdown-toggle::after {
          content: '';
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 0.25rem;
          vertical-align: middle;
          border-top: 0.3em solid;
          border-right: 0.3em solid transparent;
          border-left: 0.3em solid transparent;
        }
      </style>
      
      <nav class="navigation-container" >
        ${logoUrl ? `
          <div class="logo-container">
            <a href="${logoLinkUrl}" class="logo-link">
              <img src="${logoUrl}" alt="${logoAlt}" class="logo-img ${logoClass}">
            </a>
          </div>
        ` : ''}
        <ul class="navigation-list">
          ${this.items.map((item, index) => this.renderNavigationItem(item, index, {
            dropdownPosition,
            itemClass,
            submenuClass,
            submenuItemClass
          })).join('')}
        </ul>
      </nav>
    `;
  }
  
  /**
   * Renders a single navigation item
   */
  private renderNavigationItem(
    item: NavigationItem, 
    index: number, 
    options: {
      dropdownPosition: string;
      itemClass: string;
      submenuClass: string;
      submenuItemClass: string;
    }
  ): string {
    const hasChildren = item.subItems && item.subItems.length > 0;
    const itemClasses = [
      'navigation-item',
      options.itemClass,
      hasChildren ? 'has-children' : ''
    ].filter(Boolean).join(' ');
    
    return `
      <li class="${itemClasses}" data-index="${index}">
        <a href="${item.url || '#'}" class="navigation-link">
          ${item.text}
          ${hasChildren ? '<span class="dropdown-toggle" aria-hidden="true"></span>' : ''}
        </a>
        ${hasChildren ? this.renderDropdownMenu(item, index, options) : ''}
      </li>
    `;
  }
  
  /**
   * Renders a dropdown menu
   */
  private renderDropdownMenu(
    item: NavigationItem,
    parentIndex: number,
    options: {
      dropdownPosition: string;
      submenuClass: string;
      submenuItemClass: string;
    }
  ): string {
    if (!item.subItems?.length) return '';
    
    const menuClasses = [
      'dropdown-menu',
      options.submenuClass,
      `dropdown-menu-${parentIndex}`
    ].filter(Boolean).join(' ');
    
    return `
      <div 
        class="${menuClasses}" 
        data-position="${options.dropdownPosition || 'left'}"
        data-parent-index="${parentIndex}"
      >
        ${item.subItems.map(subItem => `
          <a 
            href="${subItem.url}" 
            class="dropdown-item ${options.submenuItemClass}"
          >
            ${subItem.text}
          </a>
        `).join('')}
      </div>
    `;
  }
  
  /**
   * Sets up event listeners for the component
   */
  private setupEventListeners(): void {
    if (!this.shadowRoot) return;
    
    // Remove existing listeners first
    this.removeEventListeners();
    
    // Add mouseenter/mouseleave for dropdowns
    const navItems = this.shadowRoot.querySelectorAll<HTMLLIElement>('.has-children');
    navItems.forEach(item => {
      item.addEventListener('mouseenter', this.handleItemMouseEnter);
      item.addEventListener('mouseleave', this.handleItemMouseLeave);
      
      // Add click handler for mobile
      const link = item.querySelector('.navigation-link');
      if (link) {
        link.addEventListener('click', this.handleItemClick);
      }
    });
    
    // Close dropdowns when clicking outside
    if (this.getAttribute('close-on-outside-click') !== 'false') {
      document.addEventListener('click', this.handleDocumentClick);
    }
  }
  
  /**
   * Removes all event listeners
   */
  private removeEventListeners(): void {
    if (!this.shadowRoot) return;
    
    const navItems = this.shadowRoot.querySelectorAll<HTMLLIElement>('.has-children');
    navItems.forEach(item => {
      item.removeEventListener('mouseenter', this.handleItemMouseEnter);
      item.removeEventListener('mouseleave', this.handleItemMouseLeave);
      
      const link = item.querySelector('.navigation-link');
      if (link) {
        link.removeEventListener('click', this.handleItemClick);
      }
    });
    
    document.removeEventListener('click', this.handleDocumentClick);
  }
  
  /**
   * Handles mouse enter on navigation items
   */
  private handleItemMouseEnter = (e: Event): void => {
    const target = e.currentTarget as HTMLElement;
    const dropdown = target.querySelector<HTMLElement>('.dropdown-menu');
    if (dropdown) {
      dropdown.style.display = 'block';
    }
  };
  
  /**
   * Handles mouse leave on navigation items
   */
  private handleItemMouseLeave = (e: Event): void => {
    const target = e.currentTarget as HTMLElement;
    const dropdown = target.querySelector<HTMLElement>('.dropdown-menu');
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  };
  
  /**
   * Handles clicks on navigation items (for mobile)
   */
  private handleItemClick = (e: Event): void => {
    // Only handle if we're on mobile or if it's a touch device
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
      return;
    }
    
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    const parent = target.closest('.has-children');
    const dropdown = parent?.querySelector<HTMLElement>('.dropdown-menu');
    
    if (dropdown) {
      const isOpen = dropdown.style.display === 'block';
      dropdown.style.display = isOpen ? 'none' : 'block';
    }
  };
  
  /**
   * Handles clicks outside the component to close dropdowns
   */
  private handleDocumentClick = (e: Event): void => {
    if (!this.shadowRoot) return;
    
    const target = e.target as Node;
    const isInside = this.shadowRoot.contains(target) || this.contains(target);
    
    if (!isInside) {
      const dropdowns = this.shadowRoot.querySelectorAll<HTMLElement>('.dropdown-menu');
      dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
      });
    }
  };
}

// Register the custom element
if (!customElements.get('moe-navigation')) {
  customElements.define('moe-navigation', NavigationBar);
}

export default NavigationBar;

export default NavigationBar;
