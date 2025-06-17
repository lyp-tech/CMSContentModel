# Task: Implement Media Gallery Content Model

## Overview
Create a new Media Gallery content model that can be used to display a collection of media items such as images, videos, and documents, similar to the Tech Summit media page.

## Requirements

### 1. MediaItem Model
- [ ] Create a new `MediaItem` interface in `src/models/MediaItem.ts` with the following properties:
  - `id`: string - Unique identifier
  - `title`: string - Title of the media item
  - `description`: string - Optional description
  - `type`: 'image' | 'video' | 'document' - Type of media
  - `url`: string - URL to the media file
  - `thumbnailUrl`: string - URL to the thumbnail/image
  - `publishedAt`: string - ISO date string
  - `metadata`: Record<string, unknown> - Additional metadata
  - `tags`: string[] - Array of tags for categorization
  - `author`: { name: string, avatar?: string } - Author information

### 2. MediaGalleryRenderer
- [ ] Create a new `MediaGalleryRenderer` class in `src/renderers/MediaGalleryRenderer.ts`:
  - Should accept an array of `MediaItem` objects
  - Should support different view modes (grid/list) using `sgds-grid` and `sgds-list` components
  - Should use `sgds-card` for each media item display
  - Should implement filtering using `sgds-dropdown` for media type selection
  - Should include search functionality using `sgds-search`
  - Should use `sgds-pagination` for handling large numbers of items
  - Should include loading states with `sgds-spinner`
  - Should use `sgds-toast` for user feedback on actions

### 3. Media Gallery Styles and SGDS Components
- [ ] Implement responsive grid layout using SGDS grid system:
  - Use `sgds-grid` with responsive columns
  - Implement breakpoints for different screen sizes
  - Use SGDS spacing utilities for consistent margins and padding

- [ ] Media item cards using `sgds-card`:
  ```html
  <sgds-card class="media-item">
    <div slot="image">
      <!-- Media thumbnail or icon based on type -->
      <sgds-icon name="file-earmark-image" size="2x"></sgds-icon>
    </div>
    <div slot="card-body">
      <h5 class="card-title">Title</h5>
      <p class="card-text">Description</p>
      <div class="d-flex gap-2">
        <sgds-badge variant="secondary">Tag</sgds-badge>
      </div>
    </div>
    <div slot="card-footer" class="d-flex justify-content-between align-items-center">
      <small class="text-muted">Published date</small>
      <sgds-avatar size="sm" src="author-avatar.jpg"></sgds-avatar>
    </div>
  </sgds-card>
  ```

- [ ] View mode toggles:
  - Use `sgds-button-group` for grid/list toggle
  - Implement active states using SGDS button variants

- [ ] Filter and search UI:
  - Use `sgds-dropdown` for media type filters
  - Implement search with `sgds-search` component
  - Add clear filters button with `sgds-button`

- [ ] Loading and empty states:
  - Show `sgds-spinner` during loading
  - Display empty state with `sgds-empty-state` when no items are found

### 4. Example Implementation
- [ ] Create an example page in `examples/media-gallery.html`
  - Sample data
  - Initialize the MediaGalleryRenderer
  - Demonstrate all features

### 5. Documentation
- [ ] Update README.md with usage examples
- [ ] Add JSDoc comments to all public methods
- [ ] Create a demo page in the examples directory

## Technical Notes

### SGDS Component Integration
- Use the following SGDS components:
  - `sgds-card` for media items
  - `sgds-grid` and `sgds-list` for layout
  - `sgds-dropdown` for filters
  - `sgds-search` for search functionality
  - `sgds-pagination` for pagination
  - `sgds-avatar` for author avatars
  - `sgds-badge` for tags
  - `sgds-icon` for icons
  - `sgds-button` and `sgds-button-group` for actions
  - `sgds-spinner` for loading states
  - `sgds-toast` for notifications

### Implementation Guidelines
- Follow the same patterns as the existing `Post` model and `PostCollectionRenderer`
- Ensure all interactive elements have proper ARIA attributes
- Implement keyboard navigation following WAI-ARIA patterns
- Support touch gestures for mobile devices
- Write unit tests for the renderer
- Ensure TypeScript types are properly defined
- Follow SGDS design tokens for colors, spacing, and typography
- Optimize images and media for performance
- Implement lazy loading for images below the fold

## Dependencies
- `@govtechsg/sgds-web-component` (already in project dependencies)
- TypeScript types for SGDS components (if available)
- No additional dependencies required beyond what's already in the project

## Acceptance Criteria
- [ ] All TypeScript code passes type checking
- [ ] All tests pass
- [ ] Code is properly documented
- [ ] Example page works in all target browsers
- [ ] Performance is acceptable with large numbers of items
- [ ] Accessibility requirements are met

## Related Files
- `src/models/MediaItem.ts`
- `src/renderers/MediaGalleryRenderer.ts`
- `examples/media-gallery.html`
- `src/styles/media-gallery.scss`
