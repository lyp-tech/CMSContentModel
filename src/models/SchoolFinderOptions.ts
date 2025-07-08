/**
 * Represents a school card in the school finder results
 */
export interface SchoolCard {
  /**
   * Name of the school
   */
  name: string;
  
  /**
   * Area where the school is located
   */
  area: string;
  
  /**
   * Full address of the school
   */
  address: string;
  
  /**
   * URL to the school's details page
   */
  url: string;
  
  /**
   * Whether the school is favorited by the user
   */
  isFavorite?: boolean;
}

/**
 * Location filter options
 */
export interface LocationFilterOption {
  /**
   * Display label for the option
   */
  label: string;
  
  /**
   * Value for the option
   */
  value: string;
  
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

/**
 * Area option for the area dropdown
 */
export interface AreaOption {
  /**
   * Display label for the area
   */
  label: string;
  
  /**
   * Value for the area
   */
  value: string;
}

/**
 * Partner center option
 */
export interface PartnerCenterOption {
  /**
   * Unique identifier for the partner center
   */
  id: string;
  
  /**
   * Display label for the partner center
   */
  label: string;
  
  /**
   * Value for the partner center
   */
  value: string;
  
  /**
   * Whether the partner center is selected
   */
  selected?: boolean;
}

/**
 * Special needs support option
 */
export interface SpecialNeedsOption {
  /**
   * Unique identifier for the special needs option
   */
  id: string;
  
  /**
   * Display label for the special needs option
   */
  label: string;
  
  /**
   * Value for the special needs option
   */
  value: string;
  
  /**
   * Whether the special needs option is selected
   */
  selected?: boolean;
}

/**
 * Options for the SchoolFinder component
 */
export interface SchoolFinderOptions {
  /**
   * Title for the results section
   */
  resultsTitle?: string;
  
  /**
   * Placeholder text for the address search input
   */
  addressPlaceholder?: string;
  
  /**
   * Distance filter options
   */
  distanceOptions?: LocationFilterOption[];
  
  /**
   * Area options for the area dropdown
   */
  areas?: AreaOption[];
  
  /**
   * Partner center options
   */
  partnerCenters?: PartnerCenterOption[];
  
  /**
   * Special needs support options
   */
  specialNeeds?: SpecialNeedsOption[];
  
  /**
   * School cards to display in the results
   */
  schools?: SchoolCard[];
  
  /**
   * Total count of schools
   */
  totalCount?: number;
  
  /**
   * Container class for styling
   */
  containerClass?: string;
  
  /**
   * Sidebar class for styling
   */
  sidebarClass?: string;
  
  /**
   * Main content class for styling
   */
  mainClass?: string;
}
