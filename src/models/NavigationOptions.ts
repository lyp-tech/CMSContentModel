/**
 * Represents a sub-menu item in a navigation item
 */
export interface NavigationSubItem {
  /** Text to display for the sub-menu item */
  text: string;
  /** URL for the sub-menu item */
  url: string;
}

/**
 * Represents a navigation item in the main menu
 */
export interface NavigationItem {
  /** Text to display for the navigation item */
  text: string;
  /** URL for the navigation item (optional for items with submenus) */
  url: string;
  /** Submenu items for dropdown menus */
  subItems?: NavigationSubItem[];
  /** Optional slot name for positioning (e.g., 'end' for right-aligned items) */
  slot?: string;
}

/**
 * Configuration options for the NavigationRenderer component
 */
export interface NavigationOptions {
  /** Array of navigation items to render */
  items: NavigationItem[];
  /** Additional CSS class for the navigation container */
  containerClass?: string;
  /** Additional CSS class for the navigation items */
  itemClass?: string;
  /** Additional CSS class for submenu elements */
  submenuClass?: string;
  /** Additional CSS class for the submenu items */
  submenuItemClass?: string;
  /** Position of dropdown menus relative to their parent (default: 'left') */
  dropdownPosition?: 'left' | 'center' | 'right';
  /** Whether to close dropdowns when clicking outside (default: true) */
  closeOnClickOutside?: boolean;
  /** URL of the logo image */
  logoUrl?: string;
  /** Alt text for the logo image */
  logoAlt?: string;
  /** Additional CSS class for the logo container */
  logoClass?: string;
  /** URL to navigate when logo is clicked (default: '/') */
  logoLinkUrl?: string;
  /** Width of the logo (e.g., '100px', '2rem', 'auto') */
  logoWidth?: string;
  /** Height of the logo (e.g., '50px', '3rem', 'auto') */
  logoHeight?: string;
  /** Maximum width of the logo (e.g., '200px', '100%') */
  logoMaxWidth?: string;
}
