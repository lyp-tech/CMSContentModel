// src/core/ComponentTypes.ts
export interface ComponentConstructor<T = any> {
    new (options: T): {
        render(): HTMLElement;
    };
}

export type ComponentType = string;

export const COMPONENT_TYPES = {
    HERO: 'HeroRenderer',
    NEWS_FEED: 'NewsFeedRenderer',
    HIGHLIGHTS: 'HighlightsRenderer',
    POPULAR_LINKS: 'PopularLinksRenderer',
    ENCOURAGEMENT_CARD: 'EncouragementCardRenderer',
    HELP_SECTION: 'HelpSectionRenderer',
    SCHOOLBAG_FEED: 'SchoolbagFeedRenderer'
} as const;

// src/core/types/ComponentTypes.ts

/**
 * Base interface that all component options must extend
 */
export interface ComponentOptions {
    /** Unique identifier for the component instance */
    id?: string;
    /** Additional CSS classes to apply to the component */
    className?: string;
}

/**
 * Type representing valid component type keys
 */
export type ComponentTypeKey = keyof typeof COMPONENT_TYPES;

/**
 * Type representing valid component type values
 */
export type ComponentTypeValue = typeof COMPONENT_TYPES[ComponentTypeKey];

/**
 * Type guard to check if a string is a valid component type
 */
export function isComponentType(type: string): type is ComponentTypeValue {
    return Object.values(COMPONENT_TYPES).includes(type as ComponentTypeValue);
}