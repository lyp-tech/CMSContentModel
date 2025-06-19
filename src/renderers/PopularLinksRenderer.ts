import { PopularLinksOptions, PopularLinksSection } from '../models/PopularLinksOptions';

export class PopularLinksRenderer {
  private options: Required<PopularLinksOptions>;

  constructor(options: PopularLinksOptions) {
    this.options = {
      containerClass: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12',
      sectionClass: 'flex-1 min-w-[240px] bg-white rounded-lg shadow-lg p-8 flex flex-col items-start text-lg',
      titleClass: 'text-2xl font-semibold mb-4 block',
      linkClass: 'text-blue-700 hover:text-blue-800 hover:underline text-lg',
      ...options
    };
  }

  render(): HTMLElement {
    const section = document.createElement('section');
    section.className = 'py-8';
    
    const container = document.createElement('div');
    container.className = this.options.containerClass;
    
    const grid = document.createElement('div');
    grid.className = 'flex flex-col md:flex-row justify-center flex-wrap gap-8';
    
    this.options.sections.forEach(sectionData => {
      grid.appendChild(this.renderSection(sectionData));
    });
    
    container.appendChild(grid);
    section.appendChild(container);
    return section;
  }

  private renderSection(section: PopularLinksSection): HTMLElement {
    const sectionEl = document.createElement('div');
    sectionEl.className = this.options.sectionClass;
    sectionEl.id = section.id;

    // Create title container
    const titleContainer = document.createElement('div');
    titleContainer.className = 'flex items-baseline gap-3 mb-3'; // Changed to items-baseline

    // Add SGDS icon if provided
    if (section.icon) {
      const icon = document.createElement('sgds-icon');
      icon.setAttribute('name', section.icon);
      icon.setAttribute('size', 'md'); // Slightly smaller icon when next to text
      icon.classList.add('flex-shrink-0'); // Prevent icon from shrinking
      titleContainer.appendChild(icon);
    }

    // Add title
    const title = document.createElement('span');
    title.className = this.options.titleClass;
    title.textContent = section.title;
    titleContainer.appendChild(title);

    // Add title container to section
    sectionEl.appendChild(titleContainer);

    // Add links
    if (section.links && section.links.length > 0) {
      const list = document.createElement('ul');
      list.className = 'space-y-2';
      
      section.links.forEach(link => {
        const item = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.className = this.options.linkClass;
        anchor.textContent = link.text;
        
        if (link.target) anchor.target = link.target;
        if (link.rel) anchor.rel = link.rel;
        
        item.appendChild(anchor);
        list.appendChild(item);
      });
      
      sectionEl.appendChild(list);
    }

    return sectionEl;
  }
}
