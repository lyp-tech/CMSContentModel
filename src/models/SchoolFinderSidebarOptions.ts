export interface LocationFilterOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface AreaOption {
  label: string;
  value: string;
}

export interface PartnerCentreOption {
  id: string;
  label: string;
  value: string;
}

export interface SpecialNeedsOption {
  id: string;
  label: string;
  value: string;
}

export interface SchoolFinderSidebarOptions {
  /**
   * Placeholder text for the address/postal code input
   * @default "Enter your address or postal code"
   */
  placeholder?: string;

  /**
   * Distance filter radio options (displayed under the input)
   */
  distanceOptions?: LocationFilterOption[];

  /**
   * Area select list
   */
  areas?: AreaOption[];

  /**
   * Partner Early Years Centres checkbox list
   */
  partnerCentres?: PartnerCentreOption[];

  /**
   * Special needs checkbox list
   */
  specialNeeds?: SpecialNeedsOption[];
}
