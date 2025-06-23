# Refactoring Renderer to Web Component

This document outlines the process and best practices for refactoring a renderer class into a custom web component, based on the NavigationRenderer to Navigation component refactoring.

## Overview

The refactoring process involves converting a traditional renderer class into a custom web component that follows web standards. This provides better encapsulation, reusability, and native browser support.

## Step-by-Step Process

### 1. Create the Web Component Class

```typescript
// Before: Renderer Class
export class NavigationRenderer {
  constructor(private options: NavigationOptions) {}
  
  render(): HTMLElement {
    // Render logic
  }
}

// After: Web Component
export class NavigationBar extends HTMLElement {
  private items: NavigationItem[] = [];
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
}
```

### 2. Handle Attributes and Properties

- Convert constructor options to HTML attributes
- Use getters/setters for two-way data binding
- Observe attribute changes

```typescript
// Define observed attributes
static get observedAttributes() {
  return ['dropdown-position', 'logo-url', 'logo-alt'];
}

// Handle attribute changes
attributeChangedCallback(name: string, oldValue: string, newValue: string) {
  if (oldValue === newValue) return;
  this.render();
}
```

### 3. Update Rendering Logic

- Move render logic to `render()` method
- Use template literals for HTML
- Include styles in the shadow DOM

```typescript
private render(): void {
  if (!this.shadowRoot) return;
  
  // Get attributes
  const logoUrl = this.getAttribute('logo-url') || '';
  const logoAlt = this.getAttribute('logo-alt') || 'Logo';
  
  this.shadowRoot.innerHTML = `
    <style>
      /* Scoped styles */
    </style>
    <nav class="navigation-container">
      ${logoUrl ? `
        <div class="logo-container">
          <img src="${logoUrl}" alt="${logoAlt}">
        </div>
      ` : ''}
      <!-- Navigation items -->
    </nav>
  `;
}
```

### 4. Handle Data Loading

For JSON data:
- Use `<script type="application/json">` for static data
- Parse data in `connectedCallback`

```typescript
private parseItems(): void {
  const script = this.querySelector('script[type="application/json"]');
  if (script) {
    try {
      this.items = JSON.parse(script.textContent || '[]');
    } catch (e) {
      console.error('Failed to parse navigation items', e);
    }
  }
}
```

### 5. Register the Web Component

```typescript
// At the end of the file
if (!customElements.get('navigation-bar')) {
  customElements.define('navigation-bar', NavigationBar);
}
```

## Best Practices

1. **Attribute Naming**: Use kebab-case for attributes (e.g., `logo-url`)
2. **Responsive Design**: Include mobile-first CSS in the shadow DOM
3. **Events**: Dispatch custom events for user interactions
4. **Accessibility**: Ensure proper ARIA attributes and keyboard navigation
5. **Documentation**: Add JSDoc comments for public methods and attributes

## Example Usage

```html
<navigation-bar
  logo-url="/path/to/logo.png"
  logo-alt="Company Logo"
  dropdown-position="center"
  class="custom-class">
  <script type="application/json">
    [
      { "text": "Home", "url": "/" },
      { "text": "About", "url": "/about" }
    ]
  </script>
</navigation-bar>
```

## Migration Guide

1. Update HTML templates to use the new web component
2. Replace renderer instantiation with direct HTML usage
3. Update any event listeners to work with the new component
4. Test across different browsers and devices

## Common Pitfalls

1. **Styling**: Remember styles are scoped in shadow DOM
2. **Timing**: Use `connectedCallback` for initialization
3. **Data Loading**: Handle async data loading appropriately
4. **Browser Support**: Test in target browsers

## Related Files

- `src/components/Navigation.ts` - The refactored web component
- `src/renderers/NavigationRenderer.ts` - The original renderer (now deprecated)
- `examples/navigation-example.html` - Example usage

## Next Steps

1. Consider adding TypeScript decorators for better DX
2. Add unit tests for the web component
3. Create Storybook stories for documentation
4. Add visual regression tests
