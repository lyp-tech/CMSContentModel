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
}
