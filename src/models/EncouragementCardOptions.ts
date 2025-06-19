/**
 * Options for configuring the EncouragementCard component
 */
export interface EncouragementCardOptions {
  /** URL for the card's icon/image */
  iconUrl: string;
  /** Alt text for the icon/image */
  iconAlt?: string;
  /** Main heading text */
  heading: string;
  /** Description text */
  description: string;
  /** Text for the view link */
  viewLinkText: string;
  /** URL for the view link */
  viewLinkUrl: string;
  /** Text for the action button */
  buttonText: string;
  /** URL for the action button */
  buttonUrl: string;
  /** Optional custom class for the container */
  containerClass?: string;
  /** Optional custom class for the card */
  cardClass?: string;
  /** Optional custom class for the heading */
  headingClass?: string;
  /** Optional custom class for the description */
  descriptionClass?: string;
  /** Optional custom class for the view link */
  viewLinkClass?: string;
  /** Optional custom class for the button */
  buttonClass?: string;
}
