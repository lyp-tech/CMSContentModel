import { HighlightsOptions } from '../models/HighlightsOptions';

export class HighlightsRenderer {
  private options: Required<HighlightsOptions>;

  constructor(options: HighlightsOptions) {
    this.options = {
      title: 'Highlights',
      containerClass: 'max-w-6xl mx-auto text-left text-lg',
      titleClass: 'pb-8 pt-12 text-3xl md:text-4xl font-bold text-center',
      cardContainerClass: 'flex gap-8 md:gap-10 min-w-[900px]',
      cardClass: 'flex-shrink-0 w-56 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all', // Changed from w-72 to w-64
      ...options
    };
  }

  private calculateVisibleCards(): number {
    // Adjust these breakpoints as needed
    if (window.innerWidth >= 1024) return 4; // Desktop
    if (window.innerWidth >= 768) return 3;  // Tablet
    return 1;                                // Mobile
  }

  private scrollToCard(index: number, cardsContainer: HTMLElement): void {
    const card = cardsContainer.children[index] as HTMLElement;
    if (card) {
      // Get the scrollable parent (the one with overflow-x-auto)
      const scrollContainer = cardsContainer.parentElement;
      if (scrollContainer) {
        // Calculate the scroll position to center the card
        const containerWidth = scrollContainer.clientWidth;
        const cardLeft = card.offsetLeft;
        const cardWidth = card.clientWidth;
        const scrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
        
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }

  private updateActiveDot(activeIndex: number, container: HTMLElement): void {
    const dots = container.querySelectorAll('button');
    dots.forEach((dot, index) => {
      dot.className = `w-3 h-3 rounded-full ${index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'}`;
      dot.ariaPressed = (index === activeIndex).toString();
    });
  }

  private navigate(direction: number, cardsContainer: HTMLElement): void {
    const scrollContainer = cardsContainer.parentElement;
    if (!scrollContainer) return;
    
    const cardWidth = cardsContainer.children[0]?.clientWidth || 0;
    const scrollAmount = cardWidth * this.calculateVisibleCards() * direction;
    
    scrollContainer.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

// In HeroRenderer.ts, update the renderNavigationArrows method:

  private renderNavigationArrows(container: HTMLElement, cardsContainer: HTMLElement): void {
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10 transition-colors hidden md:block';
    prevButton.setAttribute('aria-label', 'Previous slide');
    prevButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  `;
    prevButton.addEventListener('click', () => this.navigate(-1, cardsContainer));

    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = 'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10 transition-colors hidden md:block';
    nextButton.setAttribute('aria-label', 'Next slide');
    nextButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  `;
    nextButton.addEventListener('click', () => this.navigate(1, cardsContainer));

    container.style.position = 'relative';
    container.appendChild(prevButton);
    container.appendChild(nextButton);
  }

  private renderDots(container: HTMLElement, cardsContainer: HTMLElement): void {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'flex justify-center gap-2 mt-6';
    
    const cardCount = this.options.items.length;
    const visibleCards = this.calculateVisibleCards();
    const dotsCount = Math.ceil(cardCount / Math.max(1, visibleCards));
    
    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('button');
      dot.className = `w-3 h-3 rounded-full transition-colors ${i === 0 ? 'bg-blue-600' : 'bg-gray-300'}`;
      dot.ariaLabel = `Go to slide ${i + 1}`;
      dot.ariaPressed = (i === 0).toString();
      
      dot.addEventListener('click', () => {
        this.scrollToCard(i * visibleCards, cardsContainer);
        this.updateActiveDot(i, dotsContainer);
      });
      
      dotsContainer.appendChild(dot);
    }
    
    // Handle scroll events to update active dot
    let scrollTimeout: number;
    cardsContainer.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        const scrollPosition = cardsContainer.scrollLeft;
        const cardWidth = cardsContainer.children[0]?.clientWidth || 0;
        const activeIndex = Math.round(scrollPosition / (cardWidth * visibleCards));
        this.updateActiveDot(activeIndex, dotsContainer);
      }, 100);
    });
    
    container.appendChild(dotsContainer);
  }

  render(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'w-full px-4 py-8';
    section.id = 'moe-home-page-highlights';
    
    const container = document.createElement('div');
    container.className = this.options.containerClass;

    // Add title if provided
    if (this.options.title) {
      const title = document.createElement('h2');
      title.className = this.options.titleClass;
      title.textContent = this.options.title;
      container.appendChild(title);
    }

    // Create scrollable container
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'overflow-x-auto relative';
    
    // Add navigation arrows
    const cardsContainer = document.createElement('div');
    cardsContainer.className = this.options.cardContainerClass;
    
    // Add navigation arrows
    this.renderNavigationArrows(scrollContainer, cardsContainer);
    cardsContainer.style.scrollSnapType = 'x mandatory';

    // Add highlight cards
    this.options.items.forEach(item => {
      const card = this.renderHighlightCard(item);
      card.style.scrollSnapAlign = 'start';
      cardsContainer.appendChild(card);
    });

    scrollContainer.appendChild(cardsContainer);
    container.appendChild(scrollContainer);
    
    // Add dots navigation if there are enough cards
    if (this.options.items.length > this.calculateVisibleCards()) {
      this.renderDots(container, cardsContainer);
    }
    
    section.appendChild(container);

    return section;
  }

  private renderHighlightCard(item: any): HTMLElement {
    const card = document.createElement('a');
    card.href = item.url;
    card.className = this.options.cardClass;
    
    // Add image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'h-36 w-full bg-cover bg-center rounded-t-lg';
    imageDiv.style.backgroundImage = `url('${item.imageUrl}')`;
    card.appendChild(imageDiv);

    // Add content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'p-6';
    
    const title = document.createElement('span');
    title.className = 'block text-lg font-semibold mb-2';
    title.textContent = item.title;
    
    const description = document.createElement('p');
    description.className = 'text-gray-600 text-sm';
    description.textContent = item.description;
    
    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    card.appendChild(contentDiv);

    return card;
  }
}
