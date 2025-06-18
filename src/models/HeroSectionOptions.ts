/**
 * Defines the highlight item structure for the HeroSection component
 */
export interface HeroHighlightItem {
  /** Type of highlight which determines the styling */
  type: 'info' | 'warning' | 'success' | 'error';
  /** Main text content of the highlight */
  text: string;
  /** Optional link to include in the highlight */
  link?: {
    /** Display text for the link */
    text: string;
    /** URL for the link */
    url: string;
  };
}

/**
 * Configuration options for the HeroSection component
 */
export interface HeroSectionOptions {
  /** URL of the logo image */
  logoUrl: string;
  /** Alt text for the logo image */
  logoAlt?: string;
  /** Navigation items to display */
  navItems: Array<{
    /** Display text for the navigation item */
    text: string;
    /** URL for the navigation item */
    url: string;
  }>;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Form action URL for the search form */
  searchAction?: string;
  /** Array of highlight items to display */
  highlights?: HeroHighlightItem[];
}
