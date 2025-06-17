/**
 * Represents a single post in the CMS
 */
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  featuredImage?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Configuration options for rendering a collection of posts
 */
export interface PostCollectionOptions {
  container: HTMLElement;
  layout?: 'grid' | 'list';
  limit?: number;
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showTags?: boolean;
}
