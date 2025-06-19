export interface NewsItem {
  /** Title of the news article */
  title: string;
  /** URL to the full article */
  url: string;
  /** Category of the news (e.g., 'Press Releases') */
  category: string;
  /** Publication date as a string */
  publishedDate: string;
  /** Optional target attribute for the link */
  target?: string;
  /** Optional rel attribute for the link */
  rel?: string;
}

export interface NewsFeedOptions {
  /** Title of the news feed section */
  title?: string;
  /** Array of news items to display */
  items: NewsItem[];
  /** URL for the 'Read more' link */
  readMoreUrl?: string;
  /** Custom class for the container */
  containerClass?: string;
  /** Custom class for the title */
  titleClass?: string;
  /** Custom text color class for the title (e.g., 'text-blue-600') */
  titleTextColor?: string;
  /** Custom class for news items */
  itemClass?: string;
  /** Custom class for the 'Read more' link */
  readMoreClass?: string;
}
