import { MediaItem, MediaGalleryOptions } from '../models/MediaItem';

// SGDS Web Components global registration (TypeScript best practice for npm usage)
import '@govtechsg/sgds-web-component';
import '@govtechsg/sgds-web-component/themes/root.css';

/**
 * Renders a collection of media items in the DOM using SGDS components
 */
export class MediaGalleryRenderer {
  private mediaItems: MediaItem[];
  private options: Required<MediaGalleryOptions>;

  /**
   * Creates a new MediaGalleryRenderer instance
   * @param mediaItems Array of media items to display
   * @param options Configuration options for the gallery
   */
  constructor(mediaItems: MediaItem[], options: MediaGalleryOptions) {
    this.mediaItems = [...mediaItems];
    this.options = {
      layout: 'grid',
      itemsPerPage: 12,
      showFilter: true,
      showSearch: true,
      showAuthor: true,
      showDate: true,
      showTags: true,
      ...options,
    };
  }

  /**
   * Renders the media gallery in the specified container
   */
  render(): void {
    const { container } = this.options;
    
    // Clear the container
    container.innerHTML = '';
    
    // Render the gallery controls
    this.renderControls(container);
    
    // Render the media items
    this.renderMediaItems(container);
  }

  /**
   * Renders the gallery controls (SGDS view mode toggle + filter dropdown + search)
   */
  private renderControls(container: HTMLElement): void {
    const controls = document.createElement('div');
    controls.className = 'media-gallery-controls mb-4';

    // Get unique media types in the current items
    const types = Array.from(new Set(this.mediaItems.map(item => item.type)));
    const allTypes = ['all', ...types];
    const currentType = (this as any)._currentType || 'all';
    const currentSearch = (this as any)._currentSearch || '';

    // SGDS controls: button group, filter dropdown, search input
    controls.innerHTML = `
      <div class="d-flex align-items-center gap-3 flex-wrap">
        <div class="btn-group" role="group" aria-label="View mode toggle">
          <button type="button" class="sgds btn btn-outline-primary${this.options.layout === 'grid' ? ' active' : ''}" data-view="grid">
            <sgds-icon name="grid" class="me-1"></sgds-icon> Grid
          </button>
          <button type="button" class="sgds btn btn-outline-primary${this.options.layout === 'list' ? ' active' : ''}" data-view="list">
            <sgds-icon name="list" class="me-1"></sgds-icon> List
          </button>
        </div>
        <div class="dropdown">
          <button class="sgds btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${currentType === 'all' ? 'All Types' : currentType.charAt(0).toUpperCase() + currentType.slice(1)}
          </button>
          <ul class="dropdown-menu">
            ${allTypes.map(type => `
              <li><a class="dropdown-item${currentType === type ? ' active' : ''}" href="#" data-type="${type}">${type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}</a></li>
            `).join('')}
          </ul>
        </div>
        <div class="flex-grow-1" style="min-width: 200px; max-width: 320px;">
          <input type="search" class="sgds form-control" placeholder="Search media..." value="${currentSearch.replace(/"/g, '&quot;')}" id="media-gallery-search" />
        </div>
      </div>
    `;

    setTimeout(() => {
      // View mode toggle
      const btns = controls.querySelectorAll('button[data-view]');
      btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const view = (e.currentTarget as HTMLElement).getAttribute('data-view');
          if (view && view !== this.options.layout) {
            this.options = { ...this.options, layout: view as 'grid' | 'list' };
            this.render();
          }
        });
      });
      // Filter dropdown
      const typeLinks = controls.querySelectorAll('a[data-type]');
      typeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const type = (e.currentTarget as HTMLElement).getAttribute('data-type') || 'all';
          (this as any)._currentType = type;
          this.render();
        });
      });
      // Search box
      const searchInput = controls.querySelector<HTMLInputElement>('#media-gallery-search');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          (this as any)._currentSearch = (e.target as HTMLInputElement).value;
          this.render();
        });
      }
    }, 0);

    container.appendChild(controls);
  }

  /**
   * Renders the media items in the gallery using SGDS grid or filtered by type and search
   */
  private renderMediaItems(container: HTMLElement): void {
    const wrapper = document.createElement('div');
    wrapper.className = 'media-gallery-items';

    // Filter items by selected type and search
    const currentType = (this as any)._currentType || 'all';
    const currentSearch = ((this as any)._currentSearch || '').toLowerCase();
    let itemsToRender = currentType === 'all'
      ? this.mediaItems
      : this.mediaItems.filter(item => item.type === currentType);
    if (currentSearch) {
      itemsToRender = itemsToRender.filter(item =>
        item.title.toLowerCase().includes(currentSearch) ||
        (item.description && item.description.toLowerCase().includes(currentSearch))
      );
    }

    if (itemsToRender.length === 0) {
      wrapper.innerHTML = `
        <div class="text-center py-5">
          <p>No media items found</p>
        </div>
      `;
    } else if (this.options.layout === 'grid') {
      // SGDS grid layout
      wrapper.innerHTML = `
        <div class="sgds-grid" columns="1 2-md 3-lg" gap="3">
          ${itemsToRender.map(item => this.renderMediaItem(item).outerHTML).join('')}
        </div>
      `;
    } else {
      // SGDS list mode: vertical stack of sgds-card with spacing
      wrapper.innerHTML = `
        <div class="d-flex flex-column gap-3">
          ${itemsToRender.map(item => this.renderMediaItem(item).outerHTML).join('')}
        </div>
      `;
    }
    container.appendChild(wrapper);
  }

  /**
   * Renders a single media item using SGDS components
   */
  private renderMediaItem(item: MediaItem): HTMLElement {
    const card = document.createElement('sgds-card');
    card.className = 'h-100';

    // Image or icon slot
    if (item.thumbnailUrl) {
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = item.thumbnailUrl;
      img.alt = item.title;
      img.style.height = '160px';
      img.style.objectFit = 'cover';
      card.appendChild(img);
    } else {
      const icon = document.createElement('sgds-icon');
      icon.setAttribute('slot', 'icon');
      icon.setAttribute('name', this.getIconForType(item.type));
      icon.setAttribute('size', '3xl');
      card.appendChild(icon);
    }

    // Title slot
    const title = document.createElement('span');
    title.setAttribute('slot', 'title');
    title.textContent = item.title;
    card.appendChild(title);

    // Description slot
    if (item.description) {
      const desc = document.createElement('span');
      desc.setAttribute('slot', 'description');
      desc.textContent = item.description;
      card.appendChild(desc);
    }

    // Link slot
    const linkContainer = document.createElement('sgds-link');
    linkContainer.setAttribute('slot', 'link');
    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Open ';
    const arrowIcon = document.createElement('sgds-icon');
    arrowIcon.setAttribute('name', 'arrow-right');
    link.appendChild(arrowIcon);
    linkContainer.appendChild(link);
    card.appendChild(linkContainer);

    return card;
  }

  /**
   * Gets the appropriate icon name for a media type
   */
  private getIconForType(type: string): string {
    switch (type) {
      case 'image':
        return 'image';
      case 'video':
        return 'film';
      case 'document':
        return 'file-earmark-text';
      default:
        return 'file-earmark';
    }
  }

  /**
   * Updates the media items and re-renders the gallery
   */
  updateMediaItems(mediaItems: MediaItem[]): void {
    this.mediaItems = [...mediaItems];
    this.render();
  }
}
