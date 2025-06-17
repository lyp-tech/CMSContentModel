/**
 * Represents a media item in the CMS (image, video, or document)
 */
export interface MediaItem {
  /** Unique identifier for the media item */
  id: string;
  
  /** Title of the media item */
  title: string;
  
  /** Optional description of the media item */
  description?: string;
  
  /** Type of media */
  type: 'image' | 'video' | 'document';
  
  /** URL to the media file */
  url: string;
  
  /** URL to the thumbnail/image preview */
  thumbnailUrl?: string;
  
  /** Publication date in ISO format */
  publishedAt: string;
  
  /** Last updated date in ISO format */
  updatedAt?: string;
  
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  
  /** Array of tags for categorization */
  tags?: string[];
  
  /** Author information */
  author: {
    /** Author's name */
    name: string;
    
    /** Optional URL to author's avatar */
    avatar?: string;
  };
}

/**
 * Configuration options for rendering a media gallery
 */
export interface MediaGalleryOptions {
  /** Container element where the gallery will be rendered */
  container: HTMLElement;
  
  /** Layout mode: 'grid' or 'list' */
  layout?: 'grid' | 'list';
  
  /** Maximum number of items to display per page */
  itemsPerPage?: number;
  
  /** Whether to show the media type filter */
  showFilter?: boolean;
  
  /** Whether to show the search box */
  showSearch?: boolean;
  
  /** Whether to show the author information */
  showAuthor?: boolean;
  
  /** Whether to show the publication date */
  showDate?: boolean;
  
  /** Whether to show tags */
  showTags?: boolean;
}
