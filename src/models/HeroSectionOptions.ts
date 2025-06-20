import { NavigationItem } from './NavigationOptions';

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
  navItems?: NavigationItem[];
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Form action URL for the search form */
  searchAction?: string;
  /** Array of highlight items to display */
  highlights?: HeroHighlightItem[];
  
  /** Hero section configuration */
  hero?: {
    /** Main title of the hero section */
    title: string;
    /** Subtitle text */
    subtitle: string;
    /** Placeholder text for the hero search input */
    searchPlaceholder: string;
    /** List of popular search terms */
    popularSearches: string[];
    /** Optional background image URL */
    backgroundImage?: string;
    /** Optional foreground image URL */
    foregroundImage?: string;
    /** Optional CSS classes for the foreground image size (e.g., 'w-3/4 max-w-2xl') */
    foregroundImageSizeClass?: string;
  };
}
