// src/core/ComponentRegistry.ts
import { ComponentConstructor, ComponentType } from './ComponentTypes';
import { HeroRenderer } from '../renderers/HeroRenderer';
import { NewsFeedRenderer } from '../renderers/NewsFeedRenderer';
import { HighlightsRenderer } from '../renderers/HighlightsRenderer';
import { PopularLinksRenderer } from '../renderers/PopularLinksRenderer';
import { EncouragementCardRenderer } from '../renderers/EncouragementCardRenderer';
import { HelpSectionRenderer } from '../renderers/HelpSectionRenderer';
import { SchoolbagFeedRenderer } from '../renderers/SchoolbagFeedRenderer';

export class ComponentRegistry {
    private static registry: Record<ComponentType, ComponentConstructor> = {};

    static initialize(): void {
        this.register('HeroRenderer', HeroRenderer);
        this.register('NewsFeedRenderer', NewsFeedRenderer);
        this.register('HighlightsRenderer', HighlightsRenderer);
        this.register('PopularLinksRenderer', PopularLinksRenderer);
        this.register('EncouragementCardRenderer', EncouragementCardRenderer);
        this.register('HelpSectionRenderer', HelpSectionRenderer);
        this.register('SchoolbagFeedRenderer', SchoolbagFeedRenderer);
    }

    static register<T>(type: ComponentType, component: ComponentConstructor<T>): void {
        this.registry[type] = component;
    }

    static getComponent<T>(type: ComponentType): ComponentConstructor<T> | undefined {
        return this.registry[type] as ComponentConstructor<T>;
    }

    static hasComponent(type: ComponentType): boolean {
        return !!this.registry[type];
    }
}

// Initialize registry
ComponentRegistry.initialize();