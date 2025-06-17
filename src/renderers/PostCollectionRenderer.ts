import { Post, PostCollectionOptions } from '../models/Post';

// SGDS Web Components global registration (TypeScript best practice for npm usage)
import '@govtechsg/sgds-web-component';
import '@govtechsg/sgds-web-component/themes/root.css';

/**
 * Renders a collection of posts in the DOM using SGDS components
 */
export class PostCollectionRenderer {
  private posts: Post[];
  private options: Required<PostCollectionOptions>;

  constructor(posts: Post[], options: PostCollectionOptions) {
    this.posts = posts;
    this.options = {
      layout: 'list',
      limit: 10,
      showExcerpt: true,
      showAuthor: true,
      showDate: true,
      showTags: true,
      ...options,
    };
  }

  /**
   * Renders the post collection to the specified container using SGDS components
   */
  render(): void {
    const { container, limit } = this.options;
    const postsToRender = this.posts.slice(0, limit);
    container.innerHTML = '';
    const grid = document.createElement('sgds-grid');
    grid.setAttribute('columns', this.options.layout === 'grid' ? '1 2-md 3-lg' : '1');
    grid.setAttribute('gap', '3');
    postsToRender.forEach(post => {
      const card = this.renderPost(post);
      grid.appendChild(card);
    });
    container.appendChild(grid);
  }

  /**
   * Renders a single post item using SGDS Card component (DOM API version)
   */
  private renderPost(post: Post): HTMLElement {
    const { showExcerpt, showAuthor, showDate, showTags } = this.options;
    const card = document.createElement('sgds-card');

    card.className = 'h-100';
    // Image or icon slot
    if (post.featuredImage) {
      // Image variant
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.alt = post.title;
      img.src = post.featuredImage;
      img.style.height = '200px';
      img.style.objectFit = 'cover';
      card.appendChild(img);
    } else {
      // Icon variant
      const icon = document.createElement('sgds-icon');
      icon.setAttribute('slot', 'icon');
      icon.setAttribute('name', 'file-text');
      icon.setAttribute('size', '3xl');
      card.appendChild(icon);
    }

    // Title slot
    const title = document.createElement('span');
    title.setAttribute('slot', 'title');
    title.textContent = post.title;
    card.appendChild(title);

    // Description slot (using excerpt)
    if (showExcerpt && post.excerpt) {
      const description = document.createElement('span');
      description.setAttribute('slot', 'description');
      description.textContent = post.excerpt;
      card.appendChild(description);
    }

    // Link slot
    const linkContainer = document.createElement('sgds-link');
    linkContainer.setAttribute('slot', 'link');
    const link = document.createElement('a');
    link.href = `/posts/${post.slug}`;
    link.textContent = 'Read more ';
    
    const arrowIcon = document.createElement('sgds-icon');
    arrowIcon.setAttribute('name', 'arrow-right');
    link.appendChild(arrowIcon);
    
    linkContainer.appendChild(link);
    card.appendChild(linkContainer);

    // Add metadata as data attributes for styling if needed
    if (post.publishedAt) {
      card.dataset.publishedAt = post.publishedAt;
    }
    if (post.tags) {
      card.dataset.tags = post.tags.join(',');
    }

    // Author and tags section (added as additional content below the card)
    if (showAuthor || (showTags && post.tags && post.tags.length > 0)) {
      const metaDiv = document.createElement('div');
      metaDiv.className = 'mt-2';
      metaDiv.style.fontSize = '0.875rem';

      // Author
      if (showAuthor && post.author) {
        const authorDiv = document.createElement('div');
        authorDiv.className = 'd-flex align-items-center mb-1';
        if (post.author.avatar) {
          const avatar = document.createElement('sgds-avatar');
          avatar.setAttribute('src', post.author.avatar);
          avatar.setAttribute('size', 'sm');
          avatar.className = 'me-2';
          authorDiv.appendChild(avatar);
        }
        const nameSpan = document.createElement('span');
        nameSpan.className = 'text-muted';
        nameSpan.textContent = post.author.name;
        authorDiv.appendChild(nameSpan);
        metaDiv.appendChild(authorDiv);
      }

      // Tags
      if (showTags && post.tags && post.tags.length > 0) {
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'd-flex flex-wrap gap-1';
        post.tags.forEach(tag => {
          const badge = document.createElement('sgds-badge');
          badge.setAttribute('variant', 'light');
          badge.setAttribute('size', 'sm')
          badge.textContent = tag;
          tagsDiv.appendChild(badge);
        });
        metaDiv.appendChild(tagsDiv);
      }
      
      // Append meta info after the card content
      card.parentNode?.insertBefore(metaDiv, card.nextSibling);
    }
    return card;
  }

  /**
   * Updates the posts and re-renders the collection
   */
  updatePosts(posts: Post[]): void {
    this.posts = posts;
    this.render();
  }
}
