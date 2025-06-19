import { EncouragementCardOptions } from '../models/EncouragementCardOptions';

export class EncouragementCardRenderer {
  private options: Required<EncouragementCardOptions>;

  constructor(options: EncouragementCardOptions) {
    this.options = {
      iconAlt: '',
      containerClass: 'col-span-12 mb-8 md:col-span-5 md:px-6',
      cardClass: 'bg-gray-100 p-6 text-center rounded-lg',
      headingClass: 'text-2xl font-bold',
      descriptionClass: 'text-gray-700',
      viewLinkClass: 'text-blue-600 hover:underline',
      buttonClass: 'inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-colors duration-200',
      ...options
    };
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = this.options.containerClass;

    const card = this.createCard();
    container.appendChild(card);

    return container;
  }

  private createCard(): HTMLElement {
    const card = document.createElement('div');
    card.className = this.options.cardClass;

    const icon = this.createIcon();
    const content = this.createContent();
    const button = this.createButton();

    card.appendChild(icon);
    card.appendChild(content);
    card.appendChild(button);

    return card;
  }

  private createIcon(): HTMLElement {
    const iconContainer = document.createElement('div');
    const img = document.createElement('img');
    
    img.src = this.options.iconUrl;
    img.alt = this.options.iconAlt;
    img.className = 'block mx-auto';
    img.loading = 'lazy';
    
    iconContainer.appendChild(img);
    return iconContainer;
  }

  private createContent(): HTMLElement {
    const content = document.createElement('div');
    content.className = 'my-6 space-y-4';

    const heading = document.createElement('p');
    heading.className = 'max-w-prose mx-auto';
    
    const strong = document.createElement('strong');
    strong.className = this.options.headingClass;
    strong.textContent = this.options.heading;
    
    const description = document.createElement('p');
    description.className = this.options.descriptionClass;
    description.textContent = this.options.description;
    
    const viewLink = document.createElement('a');
    viewLink.href = this.options.viewLinkUrl;
    viewLink.className = this.options.viewLinkClass;
    viewLink.textContent = this.options.viewLinkText;

    heading.appendChild(strong);
    content.appendChild(heading);
    content.appendChild(description);
    content.appendChild(viewLink);

    return content;
  }

  private createButton(): HTMLElement {
    const button = document.createElement('a');
    button.href = this.options.buttonUrl;
    button.className = this.options.buttonClass;
    button.textContent = this.options.buttonText;
    button.target = '_blank';
    button.rel = 'noopener';
    
    return button;
  }
}
