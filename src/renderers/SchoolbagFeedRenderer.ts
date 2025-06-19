import { SchoolbagFeedOptions, SchoolbagArticle } from '../models/SchoolbagFeedOptions';

/**
 * Renders a feed of articles from Schoolbag
 */
export class SchoolbagFeedRenderer {
  private options: Required<SchoolbagFeedOptions>;

  constructor(options: SchoolbagFeedOptions) {
    this.options = {
      title: 'Schoolbag Stories',
      containerClass: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      gridClass: 'grid grid-cols-1 gap-6',
      articleClass: 'col-span-1',
      button: {
        text: 'Visit Schoolbag For More Articles',
        url: 'https://www.schoolbag.edu.sg/',
        className: 'inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors',
        show: true
      },
      ...options,
      // Ensure button configuration is properly merged
      button: {
        ...(options.button || {})
      }
    };
  }

  /**
   * Renders the Schoolbag feed component
   */
  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = this.options.containerClass;
    container.id = 'moe-app-schoolbag-feed';

    const feedContainer = document.createElement('div');
    feedContainer.className = 'moe-app-schoolbag-feed';

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'max-w-6xl mx-auto';

    const grid = this.renderArticleGrid();
    contentWrapper.appendChild(grid);
    feedContainer.appendChild(contentWrapper);
    container.appendChild(feedContainer);

    // Add visit button if enabled
    if (this.options.button?.show !== false) {
      container.appendChild(this.renderVisitButton());
    }

    return container;
  }

  /**
   * Renders the grid of articles
   * @private
   */
  private renderArticleGrid(): HTMLElement {
    const grid = document.createElement('ul');
    grid.className = this.options.gridClass;

    this.options.articles.forEach(article => {
      const articleElement = this.renderArticle(article);
      grid.appendChild(articleElement);
    });

    return grid;
  }

  /**
   * Renders a single article
   * @private
   */
  private renderArticle(article: SchoolbagArticle): HTMLElement {
    const li = document.createElement('li');
    li.className = this.options.articleClass;

    const articleLink = document.createElement('a');
    articleLink.href = article.url;
    articleLink.target = '_blank';
    articleLink.rel = 'noopener';
    articleLink.className = 'flex flex-col lg:flex-row gap-4 h-full p-4 border-b border-gray-200 lg:border-b-0 hover:bg-gray-50 transition-colors';

    // Article image container
    const figure = document.createElement('figure');
    figure.className = 'moe-media-card__media lg:w-1/3';
    
    const img = document.createElement('img');
    img.src = article.imageUrl;
    img.alt = article.altText || '';
    img.loading = 'lazy';
    img.className = 'w-full h-48 lg:h-full object-cover rounded';
    
    figure.appendChild(img);
    
    // Article content container
    const content = document.createElement('div');
    content.className = 'moe-media-card__content lg:w-2/3';
    
    const dateDiv = document.createElement('div');
    dateDiv.className = 'mb-2';
    
    const date = document.createElement('time');
    date.className = 'text-sm text-gray-500';
    date.textContent = article.date;
    
    dateDiv.appendChild(date);
    
    const title = document.createElement('h2');
    title.className = 'text-lg font-semibold';
    title.textContent = article.title;
    
    content.appendChild(dateDiv);
    content.appendChild(title);
    
    articleLink.appendChild(figure);
    articleLink.appendChild(content);
    li.appendChild(articleLink);

    return li;
  }

  /**
   * Renders the "Visit Schoolbag" button
   * @private
   */
  private renderVisitButton(): HTMLElement {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'my-8 text-center w-full';
    
    const button = document.createElement('a');
    button.href = this.options.button?.url || 'https://www.schoolbag.edu.sg/';
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.className = this.options.button?.className || 'inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors';
    button.textContent = this.options.button?.text || 'Visit Schoolbag For More Articles';
    
    // Add arrow icon if using the default button style
    if (!this.options.button?.className) {
      const icon = document.createElement('span');
      icon.className = 'icon-arrow-upper-right align-middle text-2xl';
      button.appendChild(icon);
    }
    
    buttonContainer.appendChild(button);
    return buttonContainer;
  }
}
