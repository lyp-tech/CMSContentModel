import { HighlightItem } from '../models/HighlightsOptions';

/**
 * A custom web component for displaying a responsive carousel of highlight cards.
 * 
 * @example
 * ```html
 * <highlights-carousel
 *   title="Featured Content"
 *   container-class="max-w-6xl mx-auto"
 *   title-class="text-3xl font-bold text-center my-8"
 *   card-class="w-64 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
 *   card-container-class="gap-6 px-4"
 * >
 *   <script type="application/json">
 *     [
 *       {
 *         "title": "Featured Article",
 *         "description": "Check out our latest article on web development.",
 *         "url": "/articles/1",
 *         "imageUrl": "/images/featured-1.jpg"
 *       },
 *       {
 *         "title": "New Release",
 *         "description": "Discover our newest product features.",
 *         "url": "/releases/1",
 *         "imageUrl": "/images/featured-2.jpg"
 *       }
 *     ]
 *   </script>
 * </highlights-carousel>
 * ```
 * 
 * @attr {string} title - The title of the highlights section
 * @attr {string} container-class - Additional CSS class for the main container
 * @attr {string} title-class - Additional CSS class for the title
 * @attr {string} card-class - Additional CSS class for each card
 * @attr {string} card-container-class - Additional CSS class for the cards container
 */

/**
 * A custom web component for displaying a carousel of highlight cards
 * 
 * @example
 * ```html
 * <highlights-carousel>
 *   <script type="application/json">
 *     [
 *       {
 *         "title": "Highlight 1",
 *         "url": "#",
 *         "imageUrl": "/path/to/image.jpg",
 *         "description": "Description for highlight 1"
 *       }
 *     ]
 *   </script>
 * </highlights-carousel>
 * ```
 */
export class HighlightsCarousel extends HTMLElement {
  /**
   * Default configuration for the highlights carousel
   */
  private defaultConfig = {
    containerClass: 'max-w-6xl mx-auto',
    titleClass: 'pb-8 pt-12 text-3xl md:text-4xl font-bold text-center',
    cardClass: 'flex-shrink-0 w-56 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all',
    cardContainerClass: 'flex gap-10 md:gap-14 min-w-[850px]',
  };
  
  private items: HighlightItem[] = [];
  private currentIndex: number = 0;
  private cardsContainer: HTMLElement | null = null;
  private dotsContainer: HTMLElement | null = null;
  private visibleCards: number = 1;

  private boundHandleResize: () => void;
  private scrollTimeout: number | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.boundHandleResize = this.handleResize.bind(this);
  }

  connectedCallback() {
    this.parseItems();
    this.visibleCards = this.calculateVisibleCards();
    this.render();
    this.setupEventListeners();
    
    // Add window resize listener
    window.addEventListener('resize', this.boundHandleResize);
  }
  
  disconnectedCallback() {
    // Clean up event listeners
    window.removeEventListener('resize', this.boundHandleResize);
    if (this.scrollTimeout) {
      window.clearTimeout(this.scrollTimeout);
    }
    
    // Clean up references
    this.cardsContainer = null;
    this.dotsContainer = null;
  }
  
  private handleResize() {
    // Recalculate visible cards and update dots if needed
    const prevVisibleCards = this.visibleCards;
    this.visibleCards = this.calculateVisibleCards();
    
    // Only re-render if the number of visible cards changed
    if (prevVisibleCards !== this.visibleCards) {
      this.render();
      this.setupEventListeners();
    }
  }
  
  private calculateVisibleCards(): number {
    // Adjust these breakpoints as needed
    if (window.innerWidth >= 1024) return 4; // Desktop
    if (window.innerWidth >= 768) return 3;  // Tablet
    return 1;                                // Mobile
  }

  private parseItems(): void {
    const script = this.querySelector('script[type="application/json"]');
    if (script) {
      try {
        this.items = JSON.parse(script.textContent || '[]');
      } catch (e) {
        console.error('Failed to parse highlight items', e);
      }
    }
  }
  
  private renderCard(item: HighlightItem, cardClass: string = ''): string {
    return `
      <a href="${item.url}" class="highlight-card" style="
        display: block;
        background: white;
        border-radius: 0.5rem;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        height: 100%;
        margin: 0 12px;
      ">
        <img 
          src="${item.imageUrl}" 
          alt="${item.title}" 
          style="
            width: 100%;
            height: 160px;
            object-fit: cover;
            display: block;
          "
        >
        <div style="padding: 1rem;">
          <h3 style="
            margin: 0 0 0.5rem 0;
            font-size: 1rem;
            font-weight: 600;
            color: #1a202c;
          ">${item.title}</h3>
          <p style="
            margin: 0;
            font-size: 0.875rem;
            color: #4a5568;
            line-height: 1.5;
          ">${item.description}</p>
        </div>
      </a>
    `;
  }

  private navigate(direction: number): void {
    if (!this.cardsContainer) return;
    
    const cards = Array.from(this.cardsContainer.children) as HTMLElement[];
    if (cards.length === 0) return;
    
    // Find the first mostly visible card
    const containerRect = this.cardsContainer.getBoundingClientRect();
    let currentIndex = 0;
    
    for (let i = 0; i < cards.length; i++) {
      const cardRect = cards[i].getBoundingClientRect();
      if (cardRect.left >= containerRect.left - (cardRect.width / 2) && 
          cardRect.right <= containerRect.right + (cardRect.width / 2)) {
        currentIndex = i;
        break;
      }
    }
    
    // Calculate target index based on direction and visible cards
    const visibleCards = this.calculateVisibleCards();
    let targetIndex = currentIndex + (visibleCards * direction);
    
    // Clamp the target index to valid range
    targetIndex = Math.max(0, Math.min(targetIndex, cards.length - 1));
    
    // Scroll to the target card
    const targetCard = cards[targetIndex];
    if (!targetCard) return;
    
    // Calculate scroll position to center the target card
    const scrollLeft = targetCard.offsetLeft - (containerRect.width / 2) + (targetCard.clientWidth / 2);
    
    this.cardsContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  }

  private renderNavigationArrows(): string {
    return `
      <div class="navigation-arrows">
        <button 
          class="nav-arrow prev" 
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button 
          class="nav-arrow next" 
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <style>
        .navigation-arrows {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 10;
        }
        
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          pointer-events: auto;
          transition: all 0.2s ease;
          padding: 0;
        }
        
        .nav-arrow:hover {
          background: #f9fafb;
          transform: translateY(-50%) scale(1.1);
        }
        
        .nav-arrow.prev {
          left: -60px;
        }
        
        .nav-arrow.next {
          right: -50px;
        }
        
        .nav-arrow svg {
          width: 20px;
          height: 20px;
          color: #374151;
        }
      </style>
    `;
  }

  private setupEventListeners(): void {
    if (!this.shadowRoot) return;
    
    // Clean up existing event listeners first
    this.cleanupEventListeners();
    
    // Add event listeners after a small delay to ensure DOM is ready
    setTimeout(() => {
      const prevButton = this.shadowRoot?.querySelector('.nav-arrow.prev');
      const nextButton = this.shadowRoot?.querySelector('.nav-arrow.next');
      
      if (prevButton) {
        prevButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.navigate(-1);
        });
      }
      
      if (nextButton) {
        nextButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.navigate(1);
        });
      }
      
      this.cardsContainer = this.shadowRoot.querySelector('.cards-container');
      this.dotsContainer = this.shadowRoot.querySelector('.dots-container');
      
      // Update active dot on scroll
      if (this.cardsContainer) {
        const scrollHandler = () => {
          if (this.scrollTimeout) {
            window.clearTimeout(this.scrollTimeout);
          }
          this.scrollTimeout = window.setTimeout(() => {
            this.updateActiveDot();
          }, 100);
        };
        
        this.cardsContainer.addEventListener('scroll', scrollHandler);
        // Store the reference to the handler for cleanup
        (this.cardsContainer as any)._scrollHandler = scrollHandler;
        
        // Trigger initial update
        this.updateActiveDot();
      }
      
      // Add event listener to dots
      if (this.dotsContainer) {
        const clickHandler = this.handleDotClick.bind(this);
        this.dotsContainer.addEventListener('click', clickHandler);
        // Store the reference to the handler for cleanup
        (this.dotsContainer as any)._clickHandler = clickHandler;
      }
    }, 100);
  }
  
  private cleanupEventListeners(): void {
    if (this.cardsContainer && (this.cardsContainer as any)._scrollHandler) {
      this.cardsContainer.removeEventListener('scroll', (this.cardsContainer as any)._scrollHandler);
      delete (this.cardsContainer as any)._scrollHandler;
    }
    
    if (this.dotsContainer && (this.dotsContainer as any)._clickHandler) {
      this.dotsContainer.removeEventListener('click', (this.dotsContainer as any)._clickHandler);
      delete (this.dotsContainer as any)._clickHandler;
    }
  }
  
  private updateActiveDot(): void {
    if (!this.cardsContainer || !this.dotsContainer) return;
    
    const scrollLeft = this.cardsContainer.scrollLeft;
    const cards = Array.from(this.cardsContainer.children) as HTMLElement[];
    if (cards.length === 0) return;
    
    // Find the first fully visible card
    const containerWidth = this.cardsContainer.clientWidth;
    let activeIndex = 0;
    
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardRect = card.getBoundingClientRect();
      const containerRect = this.cardsContainer.getBoundingClientRect();
      
      // Check if at least 50% of the card is visible
      if (cardRect.left >= containerRect.left - (cardRect.width / 2) && 
          cardRect.right <= containerRect.right + (cardRect.width / 2)) {
        activeIndex = i;
        break;
      }
    }
    
    // Calculate the dot index based on visible cards
    const visibleCards = this.calculateVisibleCards();
    const dotIndex = Math.floor(activeIndex / visibleCards);
    
    // Update dots
    const dots = this.dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index === dotIndex) {
        dot.style.background = '#3b82f6';
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.style.background = '#d1d5db';
        dot.removeAttribute('aria-current');
      }
    });
  }
  
  private scrollToCard(dotIndex: number): void {
    if (!this.cardsContainer) return;
    
    const cards = Array.from(this.cardsContainer.children) as HTMLElement[];
    if (cards.length === 0) return;
    
    const visibleCards = this.calculateVisibleCards();
    const targetCardIndex = Math.min(dotIndex * visibleCards, cards.length - 1);
    const targetCard = cards[targetCardIndex];
    
    if (!targetCard) return;
    
    const container = this.cardsContainer.parentElement;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const cardRect = targetCard.getBoundingClientRect();
    
    // Calculate the scroll position to center the card
    const scrollLeft = targetCard.offsetLeft - (containerRect.width / 2) + (cardRect.width / 2);
    
    // Smooth scroll to the target position
    this.cardsContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  }
  
  private handleDotClick(event: MouseEvent): void {
    if (!(event.target instanceof HTMLElement)) return;
    
    const dot = event.target.closest('.dot');
    if (!dot) return;
    
    const index = parseInt(dot.getAttribute('data-index') || '0', 10);
    this.scrollToCard(index);
    
    // Update active dot immediately for better UX
    const dots = this.dotsContainer?.querySelectorAll('.dot');
    if (!dots) return;
    
    dots.forEach((d, i) => {
      if (i === index) {
        d.style.background = '#3b82f6';
        d.setAttribute('aria-current', 'true');
      } else {
        d.style.background = '#d1d5db';
        d.removeAttribute('aria-current');
      }
    });
  }
  
  private renderDots(): string {
    if (this.items.length <= this.calculateVisibleCards()) return '';
    
    const dotsCount = Math.ceil(this.items.length / Math.max(1, this.calculateVisibleCards()));
    const dots = [];
    
    for (let i = 0; i < dotsCount; i++) {
      dots.push(`
        <button 
          class="dot" 
          aria-label="Go to slide ${i + 1}"
          ${i === 0 ? 'aria-current="true"' : ''}
          data-index="${i}"
          style="
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: none;
            background: ${i === 0 ? '#3b82f6' : '#d1d5db'};
            margin: 0 4px;
            padding: 0;
            cursor: pointer;
            transition: background 0.3s ease;
          "
        ></button>
      `);
    }
    
    return `
      <div style="
        display: flex;
        justify-content: center;
        margin-top: 24px;
        padding: 8px 0;
      ">
        ${dots.join('')}
      </div>
    `;
  }

  /**
   * List of attributes to observe for changes
   */
  static get observedAttributes() {
    return ['title', 'container-class', 'title-class', 'card-class', 'card-container-class'];
  }
  
  /**
   * Called when an observed attribute changes
   * @param name The name of the attribute that changed
   * @param oldValue The previous value of the attribute
   * @param newValue The new value of the attribute
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.render();
  }
  
  /**
   * Gets an attribute value with fallback to default config
   * @param attr The attribute name
   * @returns The attribute value or default value if not set
   */
  private getAttr(attr: string): string {
    // Convert kebab-case to camelCase for default config access
    const camelCaseAttr = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    return this.getAttribute(attr) || this.defaultConfig[camelCaseAttr as keyof typeof this.defaultConfig] || '';
  }

  private render(): void {
    if (!this.shadowRoot) return;

    const title = this.getAttribute('title') || '';
    const containerClass = this.getAttribute('container-class') || '';
    const titleClass = this.getAttribute('title-class') || '';
    const cardClass = this.getAttribute('card-class') || '';
    const cardContainerClass = this.getAttribute('card-container-class') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
        }
        
        .carousel-wrapper {
          position: relative;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 3rem;
          box-sizing: border-box;
          overflow: visible;
        }
        
        .highlights-container {
          width: 100%;
          padding: 2rem 0;
          margin: 0 auto;
          position: relative;
        }
        
        .highlights-title {
          margin: 0 0 1.5rem 0;
          text-align: center;
        }
        
        .cards-container {
          display: flex;
          overflow-x: auto;
          gap: 2.5rem;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          box-sizing: border-box;
          width: 100%;
          padding: 1rem 0;
        }
        
        .cards-container::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
        
        .highlight-card {
          flex: 0 0 auto;
          width: 360px;
          scroll-snap-align: start;
        }
        
        .highlight-card:first-child {
          scroll-snap-align: start;
        }
        
        .highlight-card:last-child {
          scroll-snap-align: end;
        }
        
        .highlight-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .highlight-card img {
          transition: transform 0.3s ease;
        }
        
        .highlight-card:hover img {
          transform: scale(1.03);
        
        .nav-arrow.prev {
          left: 0.5rem;
        }
        
        .nav-arrow.next {
          right: 0.5rem;
        }
        
        .highlights-container {
          position: relative;
          padding-bottom: 2rem;
        }
        
        .dots-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }
        
        .dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: #d1d5db;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .dot:hover {
          background-color: #9ca3af;
        }
        
        .dot.active {
          background-color: #3b82f6;
          width: 0.75rem;
          height: 0.75rem;
        }
      </style>
      
      <div class="highlights-container ${containerClass}">
        ${title ? `<h2 class="highlights-title ${titleClass}">${title}</h2>` : ''}
        <div class="cards-container ${cardContainerClass}">
          ${this.items.map(item => this.renderCard(item, cardClass)).join('')}
        </div>
        ${this.renderNavigationArrows()}
        ${this.renderDots()}
      </div>
    `;
  }
}

// Register the custom element
if (!customElements.get('highlights-carousel')) {
  customElements.define('highlights-carousel', HighlightsCarousel);
}

export default HighlightsCarousel;
