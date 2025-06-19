/**
 * Options for configuring the HelpSection component
 */
export interface HelpSectionOptions {
  /** URL for the help icon/image */
  iconUrl: string;
  /** Alt text for the help icon */
  iconAlt?: string;
  /** Main heading text */
  heading: string;
  /** Description text with placeholders for links */
  description: string;
  /** Text for the contact button */
  buttonText: string;
  /** URL for the contact button */
  buttonUrl: string;
  /** Optional custom class for the container */
  containerClass?: string;
  /** Optional custom class for the heading */
  headingClass?: string;
  /** Optional custom class for the description */
  descriptionClass?: string;
  /** Optional custom class for the button */
  buttonClass?: string;
}
