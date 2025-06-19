import {NewsFeedOptions, NewsItem} from '../models/NewsFeedOptions';

export class NewsFeedRenderer {
  private options: Required<NewsFeedOptions>;

  constructor(options: NewsFeedOptions) {
    this.options = {
      title: 'News',
      readMoreUrl: '#',
      containerClass: 'col-span-12 mb-8 md:col-span-7 md:px-4',
      titleClass: 'mb-12 font-bold',
      titleTextColor: '',
      itemClass: 'block h-full border-b border-gray-200 shadow-none hover:shadow-none hover:bg-gray-100',
      readMoreClass: 'border-solid border-0 more-news-link',
      ...options,
    };
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = this.options.containerClass;

    // Add title if provided
    if (this.options.title) {
      const title = document.createElement('h2');
      title.className = this.options.titleClass;
      title.textContent = this.options.title;
      container.appendChild(title);
    }

    // Create news feed container
    const feedContainer = document.createElement('div');
    feedContainer.className = 'moe-app-news-feed';
    
    const feedList = document.createElement('div');
    feedList.id = 'moe-app-news-feed';
    
    const listWrapper = document.createElement('div');
    listWrapper.className = 'w-full max-w-4xl mx-auto px-4';
    
    const list = document.createElement('ul');
    list.className = 'space-y-4';

    // Add news items
    this.options.items.forEach(item => {
      list.appendChild(this.renderNewsItem(item));
    });

    listWrapper.appendChild(list);
    feedList.appendChild(listWrapper);
    feedContainer.appendChild(feedList);
    container.appendChild(feedContainer);

    // Add 'Read more' link if URL is provided
    if (this.options.readMoreUrl) {
      container.appendChild(this.renderReadMoreLink());
    }

    return container;
  }

  private renderNewsItem(item: NewsItem): HTMLElement {
    const li = document.createElement('li');
    
    const link = document.createElement('a');
    link.className = this.options.itemClass;
    link.href = item.url;
    link.target = item.target || '_self';
    if (item.rel) link.rel = item.rel;
    
    const article = document.createElement('article');
    article.className = 'moe-media-card';
    
    const content = document.createElement('div');
    content.className = 'py-8 moe-media-card__content';
    
    const title = document.createElement('h2');
    title.className = `text-xl font-semibold mb-2 uppercase ${this.options.titleTextColor || ''}`;
    title.textContent = item.title;
    
    const meta = document.createElement('div');
    meta.className = 'mb-2';
    
    const category = document.createElement('span');
    category.textContent = item.category;
    
    const date = document.createElement('time');
    date.className = 'text-sm font-accent text-gray-400';
    date.textContent = `Published: ${item.publishedDate}`;
    
    meta.appendChild(category);
    meta.appendChild(document.createElement('br'));
    meta.appendChild(date);
    
    content.appendChild(title);
    content.appendChild(meta);
    article.appendChild(content);
    link.appendChild(article);
    li.appendChild(link);
    
    return li;
  }

  private renderReadMoreLink(): HTMLElement {
    const link = document.createElement('a');
    link.href = this.options.readMoreUrl || '#';
    link.className = this.options.readMoreClass;
    link.textContent = 'Read more news ';
    link.style.boxShadow = 'none';
    
    const icon = document.createElement('span');
    icon.className = 'icon-arrow-right';
    link.appendChild(icon);
    
    return link;
  }
}
