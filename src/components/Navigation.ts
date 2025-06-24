import { NavigationItem, NavigationSubItem } from '../models/NavigationOptions';

/**
 * A custom web component for site navigation using SGDS (Singapore Government Design System) components.
 * Provides a responsive navigation bar with support for dropdown menus, right-aligned items,
 * and custom theming through CSS variables.
 * 
 * @element moe-navigation
 * 
 * @attr {string} logo-url - URL of the logo image to display in the navigation
 * @attr {string} logo-alt - Alt text for the logo image
 * @attr {string} logo-class - Additional CSS classes to apply to the logo image
 * 
 * @cssprop --nav-bg - Background color of the navigation bar (default: #ffffff)
 * @cssprop --nav-text - Text color for navigation items (default: #333333)
 * @cssprop --nav-hover - Hover and active state color (default: #0066cc)
 * @cssprop --nav-dropdown-bg - Background color of dropdown menus (default: #ffffff)
 * @cssprop --nav-dropdown-text - Text color in dropdown menus (default: #333333)
 * @cssprop --nav-dropdown-hover - Hover state for dropdown items (default: #f8f9fa)
 * @cssprop --nav-divider - Color for dividers and borders (default: #e5e7eb)
 * @cssprop --nav-transition - Transition timing for interactive elements (default: all 0.2s ease-in-out)
 * 
 * @slot - Default slot for navigation items defined in the JSON configuration
 * @slot end - For right-aligned navigation items or custom elements
 * @slot non-collapsible - For elements that should remain visible in mobile view
 * 
 * @example
 * ```html
 * <moe-navigation 
 *   logo-url="/logo.svg" 
 *   logo-alt="Company Logo"
 *   logo-class="h-8"
 * >
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
  /** @private */
  private _shadow: ShadowRoot;

  /** @returns {string[]} List of observed attributes */
  static get observedAttributes() {
    return ['logo-url', 'logo-alt', 'logo-class'];
  }

  /**
   * Creates a new NavigationBar instance
   */
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  /**
   * Called when the element is added to the DOM
   * @override
   */
  connectedCallback() {
    if (!this._shadow) {
      console.warn('Shadow root not initialized');
      return;
    }
    this._render();
    this._setupEventListeners();
  }

  /**
   * Called when the element is removed from the DOM
   * @override
   */
  disconnectedCallback() {
    this._removeEventListeners();
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

  /**
   * Parses the navigation items from the JSON script tag
   * @private
   * @returns Array of parsed navigation items
   */
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

  /**
   * Renders navigation items with proper accessibility attributes
   * @param items - Array of navigation items to render
   * @returns HTML string of rendered navigation items
   */
  private _renderNavigationItems(items: NavigationItem[]): string {
    return items.map(item => {
      if (item.subItems && item.subItems.length > 0) {
        // Render dropdown menu with ARIA attributes
        return `
          <sgds-mainnav-dropdown 
            ${item.slot ? `slot="${item.slot}"` : ''}
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span 
              slot="toggler" 
              role="button" 
              tabindex="0"
              aria-label="${this._escapeHtml(item.text)} menu"
            >
              ${this._escapeHtml(item.text)}
            </span>
            <div role="menu">
              ${item.subItems.map(subItem => 
                `<sgds-dropdown-item 
                  href="${this._escapeHtml(subItem.url)}"
                  role="menuitem"
                  tabindex="-1"
                >
                  ${this._escapeHtml(subItem.text)}
                </sgds-dropdown-item>`
              ).join('')}
            </div>
          </sgds-mainnav-dropdown>
        `;
      } else {
        // Render regular menu item with proper ARIA
        return `
          <sgds-mainnav-item ${item.slot ? `slot="${item.slot}"` : ''}>
            <a 
              href="${this._escapeHtml(item.url)}"
              role="menuitem"
              tabindex="-1"
            >
              ${this._escapeHtml(item.text)}
            </a>
          </sgds-mainnav-item>
        `;
      }
    }).join('');
  }

  /**
   * Escapes HTML special characters to prevent XSS
   * @param unsafe - The string to escape
   * @returns Escaped HTML string
   * @private
   */
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
          /* CSS Custom Properties for theming */
          --nav-bg: #ffffff;
          --nav-text: #333333;
          --nav-hover: #0066cc;
          --nav-dropdown-bg: #ffffff;
          --nav-dropdown-text: #333333;
          --nav-dropdown-hover: #f8f9fa;
          --nav-divider: #e5e7eb;
          --nav-transition: all 0.2s ease-in-out;
          
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        /* SGDS Component Customization */
        sgds-mainnav {
          --sgds-mainnav-bg: var(--nav-bg);
          --sgds-mainnav-link-color: var(--nav-text);
          --sgds-mainnav-link-hover-color: var(--nav-hover);
          --sgds-dropdown-bg: var(--nav-dropdown-bg);
          --sgds-dropdown-link-color: var(--nav-dropdown-text);
          --sgds-dropdown-link-hover-bg: var(--nav-dropdown-hover);
          --sgds-dropdown-border-color: var(--nav-divider);
          --sgds-dropdown-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        /* Smooth transitions */
        sgds-mainnav-dropdown,
        sgds-dropdown-item,
        [slot="toggler"] {
          transition: var(--nav-transition);
        }
        
        /* Improve dropdown menu appearance */
        [role="menu"] {
          padding: 0.5rem 0;
          min-width: 200px;
        }
        
        /* Style the logo */
        img[slot="brand"] {
          height: 2.5rem;
          width: auto;
          object-fit: contain;
        }
        
        /* Right-aligned items container */
        [slot="end"] {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: auto;
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

  /**
   * Called when an observed attribute changes
   * @param name - The name of the attribute that changed
   * @param oldValue - The previous value of the attribute
   * @param newValue - The new value of the attribute
   * @override
   */
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      this._render();
      this._setupEventListeners();
    }
  }

  /**
   * Sets up event listeners for dropdown toggles and keyboard navigation
   * @private
   */
  private _setupEventListeners() {
    if (!this._shadow) return;
    
    // Handle dropdown toggle clicks
    const dropdownTogglers = this._shadow.querySelectorAll<HTMLElement>('[slot="toggler"]');
    dropdownTogglers.forEach(toggler => {
      toggler.removeEventListener('click', this._handleDropdownToggle);
      toggler.addEventListener('click', this._handleDropdownToggle);
      
      // Add keyboard navigation
      toggler.removeEventListener('keydown', this._handleKeyDown);
      toggler.addEventListener('keydown', this._handleKeyDown);
    });
    
    // Close dropdowns when clicking outside
    document.removeEventListener('click', this._handleClickOutside);
    document.addEventListener('click', this._handleClickOutside);
  }
  
  /**
   * Removes all event listeners
   * @private
   */
  private _removeEventListeners() {
    if (!this._shadow) return;
    
    const dropdownTogglers = this._shadow.querySelectorAll<HTMLElement>('[slot="toggler"]');
    dropdownTogglers.forEach(toggler => {
      toggler.removeEventListener('click', this._handleDropdownToggle);
      toggler.removeEventListener('keydown', this._handleKeyDown);
    });
    
    document.removeEventListener('click', this._handleClickOutside);
  }
  
  /**
   * Handles dropdown toggle
   * @private
   */
  private _handleDropdownToggle = (e: Event) => {
    e.stopPropagation();
    const toggler = e.currentTarget as HTMLElement;
    const dropdown = toggler.closest('sgds-mainnav-dropdown');
    
    if (dropdown) {
      const isExpanded = dropdown.getAttribute('aria-expanded') === 'true';
      dropdown.setAttribute('aria-expanded', String(!isExpanded));
      
      // Close other open dropdowns
      if (!isExpanded) {
        this._closeOtherDropdowns(dropdown);
      }
    }
  };
  
  /**
   * Handles keyboard navigation
   * @private
   */
  private _handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key;
    const target = e.target as HTMLElement;
    const dropdown = target.closest('sgds-mainnav-dropdown');
    
    if (!dropdown) return;
    
    switch (key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        this._handleDropdownToggle(e);
        break;
        
      case 'Escape':
        dropdown.setAttribute('aria-expanded', 'false');
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        const firstItem = dropdown.querySelector<HTMLElement>('sgds-dropdown-item');
        firstItem?.focus();
        break;
    }
  };
  
  /**
   * Handles clicks outside the component
   * @private
   */
  private _handleClickOutside = (e: MouseEvent) => {
    if (!this._shadow) return;
    
    const target = e.target as Node;
    const isClickInside = this._shadow.contains(target);
    
    if (!isClickInside) {
      this._closeAllDropdowns();
    }
  };
  
  /**
   * Closes all dropdowns except the specified one
   * @private
   */
  private _closeOtherDropdowns(exceptDropdown: Element | null = null) {
    if (!this._shadow) return;
    
    const dropdowns = this._shadow.querySelectorAll('sgds-mainnav-dropdown');
    dropdowns.forEach(dropdown => {
      if (dropdown !== exceptDropdown) {
        dropdown.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  /**
   * Closes all dropdowns
   * @private
   */
  private _closeAllDropdowns() {
    if (!this._shadow) return;
    
    const dropdowns = this._shadow.querySelectorAll('sgds-mainnav-dropdown');
    dropdowns.forEach(dropdown => {
      dropdown.setAttribute('aria-expanded', 'false');
    });
  }
}

// Register the custom element
if (!customElements.get('moe-navigation')) {
  customElements.define('moe-navigation', NavigationBar);
}

export default NavigationBar;
