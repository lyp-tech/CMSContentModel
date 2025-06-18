export interface PopularLink {
  text: string;
  url: string;
  target?: string;
  rel?: string;
}

export interface PopularLinksSection {
  id: string;
  title: string;
  icon: string;
  links: PopularLink[];
}

export interface PopularLinksOptions {
  sections: PopularLinksSection[];
  containerClass?: string;
  sectionClass?: string;
  titleClass?: string;
  linkClass?: string;
}
