/**
 * A hero section component that displays a title, subtitle, and optional images.
 * 
 * @element moe-hero
 * 
 * @attr {string} title - The main heading text
 * @attr {string} subtitle - The subheading text
 * @attr {string} background-image - URL of the background image
 * @attr {string} foreground-image - URL of the foreground image
 * @attr {string} foreground-size - Size class for the foreground image (default: 'w-3/4 max-w-2xl')
 * 
 * @cssprop --hero-bg-color - Background color (default: #ffffff)
 * @cssprop --hero-text-color - Text color (default: #1f2937)
 * @cssprop --hero-padding - Vertical padding (default: 6rem 1rem)
 */
class Hero extends HTMLElement {
  private _shadow: ShadowRoot;
  
  static get observedAttributes() {
    return ['title', 'subtitle', 'background-image', 'foreground-image', 'foreground-size', 'image-offset'];
  }

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  // Getters for attributes with default values
  get title(): string {
    return this.getAttribute('title') || '';
  }

  get subtitle(): string {
    return this.getAttribute('subtitle') || '';
  }

  get backgroundImage(): string | null {
    return this.getAttribute('background-image');
  }

  get foregroundImage(): string | null {
    return this.getAttribute('foreground-image');
  }

  get foregroundSize(): string {
    return this.getAttribute('foreground-size') || 'w-3/4 max-w-2xl';
  }

  get imageOffset(): string {
    return this.getAttribute('image-offset') || '0';
  }

  private _render() {
    if (!this._shadow) return;

    const style = `
      :host {
        display: block;
        --hero-bg-color: #ffffff;
        --hero-text-color: #1f2937;
        --hero-padding: 6rem 1rem;
      }

      
      .hero {
        position: relative;
        background-color: var(--hero-bg-color);
        color: var(--hero-text-color);
        padding: var(--hero-padding);
        overflow: hidden;
      }
      
      .hero-container {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        z-index: 2;
      }
      
      .hero-content {
        max-width: 42rem;
        margin: 0 auto;
        text-align: center;
        position: relative;
        z-index: 2;
      }
      
      .hero-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 1.2;
      }
      
      .hero-subtitle {
        font-size: 1.25rem;
        opacity: 0.9;
        margin-bottom: 2rem;
      }
      
      .hero-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center;
        z-index: 3;
      }
      
      .hero-foreground {
        display: block;
        margin: 2rem auto 0;
        max-width: 100%;
        height: auto;
      }
      
      @media (min-width: 768px) {
        .hero-title {
          font-size: 3.5rem;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
        }
      }
    `;

    const template = `
      <section class="hero">
        ${this.backgroundImage ? 
          `<div class="hero-bg" style="background-image: url('${this.escapeHtml(this.backgroundImage)}')"></div>` 
          : ''
        }
        
        <div class="hero-container">
          <div class="hero-content">
            ${this.title ? `<h1 class="hero-title">${this.escapeHtml(this.title)}</h1>` : ''}
            ${this.subtitle ? `<p class="hero-subtitle">${this.escapeHtml(this.subtitle)}</p>` : ''}
          </div>
          
          ${this.foregroundImage ? 
            `<img 
              src="${this.escapeHtml(this.foregroundImage)}" 
              alt="" 
              class="hero-foreground ${this.escapeHtml(this.foregroundSize)}"
              style="margin-top: ${this.imageOffset};"
              loading="lazy"
            >` 
            : ''
          }
        </div>
      </section>
    `;

    this._shadow.innerHTML = `<style>${style}</style>${template}`;
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
if (!customElements.get('moe-hero')) {
  customElements.define('moe-hero', Hero);
}

export default Hero;
