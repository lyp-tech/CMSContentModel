import { TopHeaderOptions, TopHeaderLink } from '../models/TopHeaderOptions';

export class TopHeader extends HTMLElement {
  private options: Required<TopHeaderOptions> = {
    links: [],
    shortlist: {
      count: 0,
      href: '/shortlist',
    },
    containerClass: '',
  };

  static get observedAttributes() {
    return ['container-class'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.parseAttributes();
    this.parseLinks();
    this.render();
  }

  private parseAttributes() {
    this.options.containerClass = this.getAttribute('container-class') || this.options.containerClass;
  }

  private parseLinks() {
    const script = this.querySelector('script[type="application/json"]');
    if (script) {
      try {
        const data = JSON.parse(script.textContent || '{}');
        if (Array.isArray(data.links)) {
          this.options.links = data.links;
        }
        if (data.shortlist) {
          this.options.shortlist = { ...this.options.shortlist, ...data.shortlist };
        }
        if (data.containerClass) {
          this.options.containerClass = data.containerClass;
        }
      } catch (e) {
        console.error('Failed to parse TopHeader data', e);
      }
    }
  }

  private renderLink(link: TopHeaderLink) {
    return `
      <li class="flex items-center">
        <a href="${link.href}" 
           class="px-4 py-2 rounded hover:bg-gray-700 transition-colors whitespace-nowrap"
           ${link.text.includes(' ') ? `aria-label="${link.text}"` : ''}>
          ${link.text}
        </a>
      </li>
    `;
  }

  private renderShortlist() {
    const { count, href } = this.options.shortlist;
    return `
      <li class="flex items-center">
        <a href="${href}"
           aria-label="Shortlist"
           class="px-4 py-2 rounded hover:bg-gray-700 transition-colors whitespace-nowrap">
          <span class="mr-1 text-[#E96A6A]">❤</span>
          My shortlisted
          <span class="ml-1">(${count})</span>
        </a>
      </li>
    `;
  }

  private render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #282e45;
          color: white;
          padding: 0.75rem 0;
          width: 100%;
          /* Force full width and prevent layout shifts */
          position: relative;
          box-sizing: border-box;
        }
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
          /* Ensure container takes full width */
          width: 100%;
          box-sizing: border-box;
        }
        .nav-container {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          /* Ensure nav takes full width of container */
          box-sizing: border-box;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0 0 0 auto; /* Push to the right */
          display: flex;
          gap: 1rem;
          /* Ensure ul doesn't exceed container */
          max-width: 100%;
          box-sizing: border-box;
        }
        li {
          display: flex;
        }
        a {
          color: inherit;
          text-decoration: none;
          padding: 0.25rem 0.75rem;
          white-space: nowrap;
        }
        a:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      </style>
      <div class="container">
        <nav class="nav-container">
          <ul>
            ${this.options.links.map(link => this.renderLink(link)).join('\n')}
            ${this.renderShortlist()}
          </ul>
        </nav>
      </div>
    `;
  }

  // Handle attribute changes
  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === 'container-class' && newValue !== null) {
      this.options.containerClass = newValue;
      this.render();
    }
  }
}

// Register the web component
if (!customElements.get('moe-top-header')) {
  customElements.define('moe-top-header', TopHeader);
}

export default TopHeader;
