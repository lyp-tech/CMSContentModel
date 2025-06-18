export interface HighlightItem {
  /** Title of the highlight */
  title: string;
  /** URL the highlight links to */
  url: string;
  /** Image URL for the highlight card */
  imageUrl: string;
  /** Short description of the highlight */
  description: string;
}

export interface HighlightsOptions {
  /** Main title for the highlights section */
  title?: string;
  /** Array of highlight items to display */
  items: HighlightItem[];
  /** Optional custom class for the container */
  containerClass?: string;
  /** Optional custom class for the title */
  titleClass?: string;
  /** Optional custom class for the card container */
  cardContainerClass?: string;
  /** Optional custom class for individual cards */
  cardClass?: string;
}
