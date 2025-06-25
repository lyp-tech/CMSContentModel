# Web Component Creation Guide

This document outlines the standardized process for creating new web components in the CMS Content Model project using native Web Components and TypeScript.

## 1. Directory Structure

```
src/
  components/         # Web component implementations
  models/             # TypeScript interfaces and types
examples/            # Example implementations
  [component-name]/
    [component-name].html
    [component-name].ts
tests/               # Component tests
docs/                # Documentation
```

## 2. Creating a New Web Component

### 2.1 Define the Component Interface
1. Create a new file in `src/models/` (e.g., `[ComponentName]Options.ts`)
2. Define TypeScript interfaces for component properties and events
3. Add JSDoc comments for all public APIs
4. Export all necessary types

### 2.2 Implement the Web Component
1. Create a new file in `src/components/` (e.g., `[ComponentName].ts`)
2. Implement the web component class extending `HTMLElement`:
   - Define observed attributes
   - Implement lifecycle callbacks
   - Use Shadow DOM for encapsulation
   - Add event handling
   - Include accessibility attributes

```typescript
export class ComponentName extends HTMLElement {
  static get observedAttributes() {
    return ['prop1', 'prop2'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  // Add other lifecycle methods and helpers
}

// Register the component
if (!customElements.get('moe-component-name')) {
  customElements.define('moe-component-name', ComponentName);
}
```

### 2.3 Styling Guidelines
1. Use CSS custom properties for theming
2. Include styles in the shadow DOM
3. Follow mobile-first responsive design
4. Document all CSS custom properties

### 2.4 Data Handling
- Use attributes for simple properties
- For complex data, use JSON in `<script type="application/json">`
- Implement proper error handling for data parsing

## 3. Best Practices

### Component Design
- Keep components focused and single-purpose
- Use TypeScript for type safety
- Follow the Custom Elements standards
- Implement proper accessibility (ARIA)

### Performance
- Use efficient rendering (avoid frequent re-renders)
- Implement `disconnectedCallback` for cleanup
- Use event delegation where appropriate

### Documentation
- Document all public attributes, properties, and methods
- Include usage examples
- Document event types and payloads
- List CSS custom properties

## 4. Testing
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Verify responsive behavior
- Check accessibility (a11y)
- Test with different data scenarios
- Include unit tests for complex logic

## 5. Integration
- Update example pages
- Document any integration requirements
- Test with other components
- Document any known issues or limitations

## 6. Framework Usage

### Vanilla Web Components Only
- Use standard `CustomElement` API
- No framework-specific code (React, Vue, Angular, etc.)
- No web component libraries (Lit, Stencil, etc.)

### Allowed Dependencies
- `@govtechsg/sgds-web-component`
- TypeScript type definitions
- Utility functions from shared modules

### Exception Process
For any additional dependencies:
1. Document the justification
2. Get explicit approval
3. Update this guide with the exception

## 7. Example Component

```html
<moe-example-component 
  title="Example"
  max-items="5"
  class="custom-style"
>
  <script type="application/json">
    [
      { "id": 1, "label": "Item 1" },
      { "id": 2, "label": "Item 2" }
    ]
  </script>
  <span slot="footer">Custom footer content</span>
</moe-example-component>
```

## 8. Review Checklist
- [ ] Code follows project standards
- [ ] Accessibility verified
- [ ] Responsive design tested
- [ ] Documentation complete
- [ ] Tests written and passing
- [ ] Browser compatibility verified
- [ ] Performance impact assessed
