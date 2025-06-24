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

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      this._render();
    }
  }
}

// Register the custom element
if (!customElements.get('moe-navigation')) {
  customElements.define('moe-navigation', NavigationBar);
}

export default NavigationBar;
