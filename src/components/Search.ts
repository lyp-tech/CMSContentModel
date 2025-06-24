/**
 * A search component with an input field, search button, and optional popular searches.
 * 
 * @element moe-search
 * 
 * @attr {string} placeholder - Placeholder text for the search input
 * @attr {string} action - Form action URL
 * @attr {string} popular-searches - Comma-separated list of popular search terms
 * 
 * @fires search - Dispatches when the search is submitted
 * @property {string} value - The current search query
 */

class Search extends HTMLElement {
  private _value = '';
  private _popularSearches: string[] = [];
  private _shadow: ShadowRoot;
  private _inputElement?: HTMLInputElement;

  static get observedAttributes() {
    return ['placeholder', 'action', 'popular-searches', 'header', 'description'];
  }

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._render();
  }

  get header(): string | null {
    return this.getAttribute('header');
  }

  set header(value: string | null) {
    if (value) {
      this.setAttribute('header', value);
    } else {
      this.removeAttribute('header');
    }
  }

  get description(): string | null {
    return this.getAttribute('description');
  }

  set description(value: string | null) {
    if (value) {
      this.setAttribute('description', value);
    } else {
      this.removeAttribute('description');
    }
  }

  get placeholder(): string {
    return this.getAttribute('placeholder') || 'Search...';
  }

  set placeholder(value: string) {
    this.setAttribute('placeholder', value);
  }

  get action(): string {
    return this.getAttribute('action') || '#';
  }

  set action(value: string) {
    this.setAttribute('action', value);
  }

  get popularSearches(): string[] {
    return [...this._popularSearches];
  }

  set popularSearches(value: string[]) {
    this._popularSearches = Array.isArray(value) ? [...value] : [];
    this._renderPopularSearches();
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value || '';
    if (this._inputElement) {
      this._inputElement.value = this._value;
    }
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'popular-searches':
        this._popularSearches = newValue ? newValue.split(',').map(s => s.trim()) : [];
        this._renderPopularSearches();
        break;
      case 'placeholder':
      case 'action':
      case 'header':
      case 'description':
        this._render();
        break;
    }
  }

  private _handleInput = (e: Event) => {
    this._value = (e.target as HTMLInputElement).value;
  };

  private _handleSubmit = (e: Event) => {
    e.preventDefault();
    
    // Dispatch the search event
    const searchEvent = new CustomEvent('search', {
      detail: { 
        query: this._value,
        preventDefault: () => { e.preventDefault(); }
      },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    
    const defaultPrevented = !this.dispatchEvent(searchEvent);
    
    // Only submit the form if the event wasn't prevented
    if (!defaultPrevented && this.action && this.action !== '#') {
      const form = this._shadow.querySelector('form') as HTMLFormElement;
      if (form) {
        form.submit();
      }
    }
  };

  private _handlePopularSearchClick = (search: string, e: Event) => {
    e.preventDefault();
    this.value = search;
    this.dispatchEvent(new CustomEvent('search', {
      detail: { query: search },
      bubbles: true,
      composed: true
    }));
  };

  private _render() {
    if (!this._shadow) return;

    const style = `
      :host {
        display: block;
        width: 100%;
      }
      
      .search-header {
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .search-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.5rem;
      }

      .search-description {
        color: #53576a;
        font-family: Lora, serif;
        font-style: italic;
        font-size: 1.125rem;
        max-width: 42rem;
        margin: 0 auto;
      }

      .search-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .search-input-group {
        display: flex;
        width: 100%;
      }
      
      input[type="text"] {
        flex: 1;
        padding: 0.75rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem 0 0 0.5rem;
        font-size: 1rem;
        line-height: 1.5;
      }
      
      button[type="submit"] {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background-color: #1d4ed8;
        color: white;
        border: none;
        border-radius: 0 0.5rem 0.5rem 0;
        padding: 0 1.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      
      button[type="submit"]:hover {
        background-color: #1e40af;
      }
      
      .popular-searches {
        font-size: 0.875rem;
        color: #6b7280;
      }
      
      .popular-searches span {
        margin-right: 0.5rem;
      }
      
      .popular-searches a {
        color: #3b82f6;
        text-decoration: none;
        margin: 0 0.25rem;
        cursor: pointer;
      }
      
      .popular-searches a:hover {
        text-decoration: underline;
      }
    `;

    const headerHtml = this.header ? `
      <div class="search-header">
        <h1 class="search-title">${this.escapeHtml(this.header)}</h1>
        ${this.description ? `<p class="search-description">${this.escapeHtml(this.description)}</p>` : ''}
      </div>` : '';

    const template = `
      ${headerHtml}
      <form class="search-form" action="${this.action}" method="get">
        <div class="search-input-group">
          <input
            type="text"
            placeholder="${this.escapeHtml(this.placeholder)}"
            aria-label="Search"
            value="${this.escapeHtml(this._value)}"
          />
          <button type="submit" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-linecap="round" />
            </svg>
            Search
          </button>
        </div>
        <div class="popular-searches-container"></div>
      </form>
    `;

    this._shadow.innerHTML = `<style>${style}</style>${template}`;
    
    // Set up event listeners
    const form = this._shadow.querySelector('form');
    if (form) {
      form.addEventListener('submit', this._handleSubmit);
    }

    this._inputElement = this._shadow.querySelector('input');
    if (this._inputElement) {
      this._inputElement.addEventListener('input', this._handleInput);
    }

    // Render popular searches
    this._renderPopularSearches();
  }

  private _renderPopularSearches() {
    if (!this._shadow) return;

    const container = this._shadow.querySelector('.popular-searches-container');
    if (!container) return;

    if (this._popularSearches.length === 0) {
      container.innerHTML = '';
      return;
    }

    const popularSearches = document.createElement('div');
    popularSearches.className = 'popular-searches';
    
    const label = document.createElement('span');
    label.textContent = 'Popular:';
    popularSearches.appendChild(label);

    this._popularSearches.forEach((search, index) => {
      if (index > 0) {
        const separator = document.createTextNode('|');
        popularSearches.appendChild(separator);
      }
      
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = search;
      link.addEventListener('click', (e) => this._handlePopularSearchClick(search, e));
      
      popularSearches.appendChild(link);
    });

    container.innerHTML = '';
    container.appendChild(popularSearches);
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Register the custom element
if (!customElements.get('moe-search')) {
  customElements.define('moe-search', Search);
}

export default Search;
