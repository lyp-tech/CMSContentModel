# SGDS (Singapore Government Design System) Usage Guide

This document outlines how to properly use SGDS web components in this project.

## Installation

### 1. Install via NPM (Recommended for Build Tools)

```bash
npm install @govtechsg/sgds-web-component
```

### 2. Using from CDN (For Quick Prototyping)

Add these to your HTML file:

```html
<!-- CSS -->
// Load global css file
<link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.0.5/themes/day.css' rel='stylesheet' type='text/css' />

// it is recommended to load a particular version when using cdn e.g. https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@1.0.2
<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.0.5"></script>

//or load a single component e.g. Masthead
<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.0.5/components/Masthead/index.umd.js"></script>
```

## Usage in TypeScript/JavaScript

### 1. Importing Components

```typescript
// For individual component imports (tree-shaking friendly)
import '@govtechsg/sgds-web-component/dist/components/card';
import '@govtechsg/sgds-web-component/dist/components/grid';
import '@govtechsg/sgds-web-component/dist/components/link';
// Add other components as needed
```

### 2. Using Components

```typescript
// When creating elements dynamically
const card = document.createElement('sgds-card');
card.innerHTML = `
  <div slot="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card content</p>
  </div>
`;
```

## Best Practices

1. **Component Structure**
   - Always use the proper slot names when available
   - Follow the component API documentation for required attributes

2. **Styling**
   - Use SGDS utility classes when possible
   - For custom styles, target the component's shadow parts when available
   - Avoid using `!important` as it can break component styling

3. **Accessibility**
   - Ensure all interactive elements have proper ARIA attributes
   - Test keyboard navigation
   - Use semantic HTML within components

## Current Implementation Review

### What We're Doing Right
- ✅ Using the correct CDN links for both CSS and JS
- ✅ Including both ES modules and nomodule fallback
- ✅ Using proper SGDS components (`sgds-card`, `sgds-grid`, etc.)
- ✅ Following component structure with proper slots

### What Needs Improvement
- ❌ **Missing TypeScript Types**: We should install `@govtechsg/sgds-web-component` as a dev dependency for TypeScript support
- ❌ **No Tree Shaking**: Currently loading all components via CDN instead of importing only what we need
- ❌ **Missing Error Boundaries**: No error handling for when SGDS fails to load
- ❌ **No Version Pinning**: Using `latest` in CDN URLs which could lead to breaking changes

## Recommended Updates

1. **Update index.html**
   ```html
   <!-- Change from -->
   <link href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component/dist/sgds-web-component/sgds-web-component.css" rel="stylesheet" />
   
   <!-- To (pinned version) -->
   <link href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.0.5/dist/sgds-web-component/sgds-web-component.css" rel="stylesheet" />
   ```

2. **Install Dependencies**
   ```bash
   npm install --save-dev @govtechsg/sgds-web-component@3.0.5
   ```

3. **Add TypeScript Types**
   ```typescript
   // src/types/sgds.d.ts
   declare namespace JSX {
     interface IntrinsicElements {
       'sgds-card': any;
       'sgds-grid': any;
       'sgds-link': any;
       'sgds-avatar': any;
       'sgds-badge': any;
       'sgds-icon': any;
     }
   }
   ```

4. **Add Error Boundary**
   ```html
   <div id="sgds-error" style="display: none;" class="alert alert-danger">
     Error loading SGDS components. Please refresh the page or check your connection.
   </div>
   
   <script>
   window.addEventListener('error', (event) => {
     if (event.target && 
         (event.target as HTMLElement).tagName && 
         (event.target as HTMLElement).tagName.toLowerCase().startsWith('sgds-')) {
       document.getElementById('sgds-error').style.display = 'block';
     }
   }, true);
   </script>
   ```

## Component-Specific Notes

### sgds-grid
- Use `columns` attribute for responsive layouts (e.g., `columns="1 2-md 3-lg"`)
- Use `gap` attribute for consistent spacing (e.g., `gap="3"`)

### sgds-card
- Use `has-img-top` when including a top image
- Use named slots: `header`, `image`, `card-body`, `footer`
- Add `h-100` class for equal height cards in a grid

### sgds-badge
- Use `variant` prop for different styles (e.g., `variant="light"`)
- Use `size` prop for different sizes (e.g., `size="sm"`)

## Resources
- [SGDS Web Components Documentation](https://webcomponent.designsystem.tech.gov.sg/)
- [SGDS GitHub](https://github.com/GovTechSG/sgds-web-component)
- [SGDS Storybook](https://webcomponent.designsystem.tech.gov.sg/?path=/story/welcome--page)
