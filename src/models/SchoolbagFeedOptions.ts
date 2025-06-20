/**
 * Represents a single article in the Schoolbag feed
 */
export interface SchoolbagArticle {
  /** Article title */
  title: string;
  /** Article URL */
  url: string;
  /** Image URL for the article thumbnail */
  imageUrl: string;
  /** Publication date */
  date: string;
  /** Alt text for the article image */
  altText?: string;
}

/**
 * Button configuration for the SchoolbagFeed component
 */
export interface SchoolbagFeedButtonOptions {
  /** Button text */
  text?: string;
  /** Button URL */
  url?: string;
  /** Custom button class */
  className?: string;
  /** Whether to show the button (default: true) */
  show?: boolean;
}

/**
 * Options for configuring the SchoolbagFeed component
 */
export interface SchoolbagFeedOptions {
  /** Array of articles to display */
  articles: SchoolbagArticle[];
  /** URL to the main Schoolbag website */
  schoolbagUrl: string;
  /** Optional title for the feed */
  title?: string;
  /** Button configuration */
  button?: SchoolbagFeedButtonOptions;
  /** Optional custom class for the container */
  containerClass?: string;
  /** Optional custom class for the grid */
  gridClass?: string;
  /** Optional custom class for article cards */
  articleClass?: string;
  /** Optional custom class for the button */
  buttonClass?: string;
}
