/**
 * Represents a navigation link in the top header
 */
export interface TopHeaderLink {
  /** Display text for the link */
  text: string;
  /** URL the link points to */
  href: string;
  /** Optional icon name (if applicable) */
  icon?: string;
}

/**
 * Options for configuring the TopHeader component
 */
export interface TopHeaderOptions {
  /** Array of navigation links */
  links?: TopHeaderLink[];
  /** Shortlist configuration */
  shortlist?: {
    /** Current count of shortlisted items */
    count: number;
    /** URL for the shortlist page */
    href?: string;
  };
  /** Additional CSS classes for the header */
  containerClass?: string;
}
