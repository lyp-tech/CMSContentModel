import { HelpSectionOptions } from '../models/HelpSectionOptions';

/**
 * Renders a help section with an icon, text content, and a call-to-action button.
 */
export class HelpSectionRenderer {
  private options: Required<HelpSectionOptions>;

  constructor(options: HelpSectionOptions) {
    this.options = {
      iconAlt: 'Help and support',
      containerClass: 'w-full mt-8',
      headingClass: 'text-xl font-semibold mb-2',
      descriptionClass: 'text-gray-700',
      buttonClass: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
      ...options
    };
  }

  /**
   * Renders the help section component
   */
  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = this.options.containerClass;

    // Add divider
    container.appendChild(this.renderDivider());
    
    // Add main content
    container.appendChild(this.renderContent());

    return container;
  }

  /**
   * Renders the divider section
   * @private
   */
  private renderDivider(): HTMLElement {
    const dividerContainer = document.createElement('div');
    dividerContainer.className = 'w-full mb-8';
    
    const divider = document.createElement('div');
    divider.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200';
    
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-12 gap-6';
    
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'col-span-12';
    
    grid.appendChild(emptyDiv);
    divider.appendChild(grid);
    dividerContainer.appendChild(divider);
    
    return dividerContainer;
  }

  /**
   * Renders the main content section
   * @private
   */
  private renderContent(): HTMLElement {
    const content = document.createElement('div');
    content.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
    
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-12 gap-6 items-center border-b border-gray-200 pb-8 mb-8';

    // Add icon
    grid.appendChild(this.renderIcon());
    
    // Add text content
    grid.appendChild(this.renderTextContent());
    
    // Add button
    grid.appendChild(this.renderButton());
    
    content.appendChild(grid);
    return content;
  }

  /**
   * Renders the icon section
   * @private
   */
  private renderIcon(): HTMLElement {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'col-span-12 md:col-span-1 text-center mx-auto';
    
    const icon = document.createElement('img');
    icon.src = this.options.iconUrl;
    icon.alt = this.options.iconAlt || '';
    icon.className = 'mx-auto';
    icon.loading = 'lazy';
    
    iconContainer.appendChild(icon);
    return iconContainer;
  }

  /**
   * Renders the text content section
   * @private
   */
  private renderTextContent(): HTMLElement {
    const textContainer = document.createElement('div');
    textContainer.className = 'col-span-12 md:col-span-7 text-center md:text-left mx-auto my-8 md:my-0';
    
    const heading = document.createElement('h3');
    heading.className = this.options.headingClass;
    heading.textContent = this.options.heading;
    
    const description = document.createElement('p');
    description.className = this.options.descriptionClass;
    description.innerHTML = this.options.description;
    
    textContainer.appendChild(heading);
    textContainer.appendChild(description);
    
    return textContainer;
  }

  /**
   * Renders the call-to-action button
   * @private
   */
  private renderButton(): HTMLElement {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'col-span-12 md:col-span-3 text-center mx-auto';
    
    const button = document.createElement('a');
    button.href = this.options.buttonUrl;
    button.className = this.options.buttonClass;
    button.textContent = this.options.buttonText;
    
    buttonContainer.appendChild(button);
    return buttonContainer;
  }
}
