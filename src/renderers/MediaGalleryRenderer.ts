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
    // Render controls
    this.renderControls(container);
    // Remove any previous media-gallery-items (defensive)
    Array.from(container.querySelectorAll('.media-gallery-items')).forEach(el => el.remove());
    // Render items
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

    // --- View mode toggle ---
    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';
    btnGroup.setAttribute('role', 'group');
    btnGroup.setAttribute('aria-label', 'View mode toggle');

    const gridBtn = document.createElement('button');
    gridBtn.type = 'button';
    gridBtn.className = `sgds btn btn-outline-primary${this.options.layout === 'grid' ? ' active' : ''}`;
    gridBtn.setAttribute('data-view', 'grid');
    gridBtn.innerHTML = '<sgds-icon name="lightbulb" class="me-1"></sgds-icon> Grid';
    gridBtn.addEventListener('click', () => {
      if (this.options.layout !== 'grid') {
        this.options.layout = 'grid';
        this.render();
      }
    });

    const listBtn = document.createElement('button');
    listBtn.type = 'button';
    listBtn.className = `sgds btn btn-outline-primary${this.options.layout === 'list' ? ' active' : ''}`;
    listBtn.setAttribute('data-view', 'list');
    listBtn.innerHTML = '<sgds-icon name="list" class="me-1"></sgds-icon> List';
    listBtn.addEventListener('click', () => {
      if (this.options.layout !== 'list') {
        this.options.layout = 'list';
        this.render();
      }
    });

    btnGroup.appendChild(gridBtn);
    btnGroup.appendChild(listBtn);

    // --- Filter dropdown ---
    const dropdownDiv = document.createElement('div');
    dropdownDiv.className = 'dropdown';

    const dropdownBtn = document.createElement('button');
    dropdownBtn.className = 'sgds btn btn-outline-secondary dropdown-toggle';
    dropdownBtn.type = 'button';
    dropdownBtn.setAttribute('data-bs-toggle', 'dropdown');
    dropdownBtn.setAttribute('aria-expanded', 'false');
    dropdownBtn.textContent = currentType === 'all' ? 'All Types' : currentType.charAt(0).toUpperCase() + currentType.slice(1);

    const dropdownMenu = document.createElement('ul');
    dropdownMenu.className = 'dropdown-menu';
    allTypes.forEach(type => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = `dropdown-item${currentType === type ? ' active' : ''}`;
      a.href = '#';
      a.setAttribute('data-type', type);
      a.textContent = type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1);
      a.addEventListener('click', (e) => {
        e.preventDefault();
        (this as any)._currentType = type;
        this.render();
      });
      li.appendChild(a);
      dropdownMenu.appendChild(li);
    });
    dropdownDiv.appendChild(dropdownBtn);
    dropdownDiv.appendChild(dropdownMenu);

    // --- Search input ---
    const searchDiv = document.createElement('div');
    searchDiv.className = 'flex-grow-1';
    searchDiv.style.minWidth = '200px';
    searchDiv.style.maxWidth = '320px';
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.className = 'sgds form-control';
    searchInput.placeholder = 'Search media...';
    searchInput.value = currentSearch;
    searchInput.id = 'media-gallery-search';
    searchInput.addEventListener('input', (e) => {
      (this as any)._currentSearch = (e.target as HTMLInputElement).value;
      this.render();
    });
    searchDiv.appendChild(searchInput);

    // --- Controls wrapper ---
    const controlsWrapper = document.createElement('div');
    controlsWrapper.className = 'd-flex align-items-center gap-3 flex-wrap';
    controlsWrapper.appendChild(btnGroup);
    controlsWrapper.appendChild(dropdownDiv);
    controlsWrapper.appendChild(searchDiv);

    controls.appendChild(controlsWrapper);
    container.appendChild(controls);
  }

  /**
   * Renders the media items in the gallery using SGDS grid or filtered by type and search
   */
  private renderMediaItems(container: HTMLElement): void {
    // Remove previous gallery items if any (defensive, but should be empty after render())
    const prev = container.querySelector('.media-gallery-items');
    if (prev) prev.remove();

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
      wrapper.innerHTML = `<div class="text-center py-5"><p>No media items found</p></div>`;
    } else if (this.options.layout === 'grid') {
      console.log('Rendering GRID layout');
      wrapper.innerHTML = `
        <div class="sgds-container">
          <div class="sgds-grid">
            ${itemsToRender.map(item => `
              <div class="sgds-col-2 sgds-col-sm-2 sgds-col-md-2 sgds-col-lg-2">${this.renderMediaItem(item).outerHTML}</div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      console.log('Rendering LIST layout');
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
