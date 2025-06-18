import { HighlightsOptions } from '../models/HighlightsOptions';

export class HighlightsRenderer {
  private options: Required<HighlightsOptions>;

  constructor(options: HighlightsOptions) {
    this.options = {
      title: 'Highlights',
      containerClass: 'max-w-6xl mx-auto text-left',
      titleClass: 'pb-6 pt-12 text-2xl md:text-3xl font-bold text-center',
      cardContainerClass: 'flex gap-6 md:gap-8 min-w-[900px]',
      cardClass: 'flex-shrink-0 w-64 bg-white rounded-lg shadow hover:shadow-lg transition',
      ...options
    };
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
    scrollContainer.className = 'overflow-x-auto';
    
    const cardsContainer = document.createElement('div');
    cardsContainer.className = this.options.cardContainerClass;

    // Add highlight cards
    this.options.items.forEach(item => {
      cardsContainer.appendChild(this.renderHighlightCard(item));
    });

    scrollContainer.appendChild(cardsContainer);
    container.appendChild(scrollContainer);
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
