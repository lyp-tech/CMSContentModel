# Component Creation Guide

This document outlines the standardized process for creating new renderer components in the CMS Content Model project.

## 1. Directory Structure

```
src/
  models/           # TypeScript interfaces
  renderers/         # Component implementations
examples/          # Example implementations
  [component-name]/
    [component-name].ts
    [component-name].html
docs/              # Documentation
```

## 2. Creating a New Component

### 2.1 Define the Model
1. Create a new file in `src/models/` (e.g., `[ComponentName]Options.ts`)
2. Define TypeScript interfaces for component options
3. Add JSDoc comments for all properties
4. Export all necessary types

### 2.2 Implement the Renderer
1. Create a new file in `src/renderers/` (e.g., `[ComponentName]Renderer.ts`)
2. Implement the renderer class with:
   - Constructor that accepts options
   - `render()` method that returns HTMLElement
   - Private helper methods as needed
3. Use Tailwind CSS for styling
4. Ensure accessibility (ARIA labels, keyboard nav)

### 2.3 Create Example Implementation
1. Add a new directory in `examples/`
2. Create TypeScript file to demonstrate usage
3. Create HTML file to display the example
4. Include all configuration options

## 3. Best Practices

### Code Organization
- Keep components focused on single responsibility
- Use TypeScript types strictly
- Follow existing code style
- Write self-documenting code

### Styling
- Use Tailwind utility classes
- Ensure responsive design
- Include hover/focus states
- Document custom CSS requirements

### Documentation
- Add JSDoc comments
- Document public API
- Include usage examples
- List dependencies

## 4. Testing
- Test in multiple browsers
- Verify responsive behavior
- Check accessibility
- Test with different data scenarios

## 5. Integration
- Update main app example
- Ensure no conflicts with other components
- Document any integration requirements

## 6. Review Process
- Code review
- Performance check
- Browser compatibility
- Mobile responsiveness
