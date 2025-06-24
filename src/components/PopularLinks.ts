import { PopularLinksOptions, PopularLinksSection } from '../models/PopularLinksOptions';
import '@govtechsg/sgds-web-component';
import '@govtechsg/sgds-web-component/themes/root.css';

export class PopularLinks extends HTMLElement {
  private options: Required<PopularLinksOptions> = {
    containerClass: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12',
    sectionClass: 'flex-1 min-w-[240px] bg-white rounded-lg shadow-lg p-8 flex flex-col items-start text-lg',
    titleClass: 'text-2xl font-semibold mb-4 block',
    linkClass: 'text-blue-700 hover:text-blue-800 hover:underline text-lg',
    sections: []
  };
  
  private resizeObserver: ResizeObserver | null = null;

  static get observedAttributes() {
    return ['container-class', 'section-class', 'title-class', 'link-class'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.parseAttributes();
    this.parseSections();
    this.render();
  }
  
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
  
  // Use Light DOM instead of Shadow DOM for better Tailwind CSS integration
  createRenderRoot() {
    return this;
  }

  private parseAttributes() {
    this.options.containerClass = this.getAttribute('container-class') || this.options.containerClass;
    this.options.sectionClass = this.getAttribute('section-class') || this.options.sectionClass;
    this.options.titleClass = this.getAttribute('title-class') || this.options.titleClass;
    this.options.linkClass = this.getAttribute('link-class') || this.options.linkClass;
  }

  private parseSections() {
    const script = this.querySelector('script[type="application/json"]');
    if (script) {
      try {
        const data = JSON.parse(script.textContent || '{}');
        if (data && typeof data === 'object') {
          // If it's an array, use it as sections
          if (Array.isArray(data)) {
            this.options.sections = data;
          } 
          // If it has a sections property, use that
          else if (Array.isArray(data.sections)) {
            this.options.sections = data.sections;
          }
        }
      } catch (e) {
        console.error('Failed to parse sections data', e);
      }
    }
  }

  private shouldUseAccordion(): boolean {
    // Use window.innerWidth for the check
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }

  private renderAccordion(section: PopularLinksSection): HTMLElement {
    const accordionItem = document.createElement('sgds-accordion-item');
    
    // Create header with icon and title
    const header = document.createElement('div');
    header.slot = 'header';
    header.className = 'flex items-center gap-3';
    
    if (section.icon) {
      const icon = document.createElement('sgds-icon');
      icon.setAttribute('name', section.icon);
      icon.setAttribute('size', 'md');
      icon.classList.add('flex-shrink-0');
      header.appendChild(icon);
    }
    
    const title = document.createElement('span');
    title.textContent = section.title;
    header.appendChild(title);
    
    // Create content with links
    const content = document.createElement('div');
    content.slot = 'content';
    content.className = 'pl-9';
    
    if (section.links?.length) {
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
      
      content.appendChild(list);
    }
    
    accordionItem.appendChild(header);
    accordionItem.appendChild(content);
    
    return accordionItem;
  }

  private setupResizeObserver(container: HTMLElement) {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    
    const checkAndRender = () => {
      const shouldBeAccordion = this.shouldUseAccordion();
      const currentIsAccordion = !!this.querySelector('sgds-accordion');
      
      if (shouldBeAccordion !== currentIsAccordion) {
        this.render();
      }
    };
    
    // Initial check
    checkAndRender();
    
    // Setup observer for future changes
    this.resizeObserver = new ResizeObserver(checkAndRender);
    this.resizeObserver.observe(container);
  }

  private render() {
    // Clear existing content
    this.innerHTML = '';

    // Create section element
    const section = document.createElement('div');
    section.className = 'py-8';
    
    // Create container
    const container = document.createElement('div');
    container.className = this.options.containerClass;
    
    // Check if we should use accordion
    const useAccordion = this.shouldUseAccordion();
    
    if (useAccordion) {
      // Create accordion
      const accordion = document.createElement('sgds-accordion');
      accordion.className = 'w-full';
      
      // Add accordion items
      this.options.sections.forEach(sectionData => {
        accordion.appendChild(this.renderAccordion(sectionData));
      });
      
      container.appendChild(accordion);
    } else {
      // Original grid layout
      const grid = document.createElement('div');
      grid.className = 'flex flex-col md:flex-row justify-center flex-wrap gap-8';
      
      // Add sections to grid
      this.options.sections.forEach(sectionData => {
        grid.appendChild(this.renderSection(sectionData));
      });
      
      container.appendChild(grid);
    }
    
    section.appendChild(container);
    this.appendChild(section);
    
    // Set up resize observer
    this.setupResizeObserver(container);
  }

  private renderSection(section: PopularLinksSection): HTMLElement {
    const sectionEl = document.createElement('div');
    sectionEl.className = this.options.sectionClass;
    sectionEl.id = section.id;

    // Create title container
    const titleContainer = document.createElement('div');
    titleContainer.className = 'flex items-baseline gap-3 mb-3';

    // Add SGDS icon if provided
    if (section.icon) {
      const icon = document.createElement('sgds-icon');
      icon.setAttribute('name', section.icon);
      icon.setAttribute('size', 'md');
      icon.classList.add('flex-shrink-0');
      titleContainer.appendChild(icon);
    }

    // Add title
    const title = document.createElement('span');
    title.className = this.options.titleClass;
    title.textContent = section.title;
    titleContainer.appendChild(title);

    // Add title container to section
    sectionEl.appendChild(titleContainer);

    // Add links if they exist
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

// Register the web component
if (!customElements.get('popular-links')) {
  customElements.define('popular-links', PopularLinks);
}

export default PopularLinks;