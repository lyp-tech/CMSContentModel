# Search Component

A reusable search component with support for popular searches, built as a web component.

## Installation

Import the component in your JavaScript/TypeScript file:

```typescript
import './path/to/Search';
```

## Usage

### Basic Usage

```html
<moe-search></moe-search>
```

### With Custom Placeholder

```html
<moe-search placeholder="Search our site..."></moe-search>
```

### With Popular Searches

```html
<moe-search 
  popular-searches="Education,Admissions,Scholarships,Calendar"
></moe-search>
```

### With Custom Form Action

```html
<moe-search action="/search"></moe-search>
```

### Listening for Search Events

```javascript
document.querySelector('moe-search').addEventListener('search', (e) => {
  console.log('Search query:', e.detail.query);
  // Handle search...
});
```

## API

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `placeholder` | String | `"Search..."` | Placeholder text for the search input |
| `action` | String | `"#"` | Form action URL |
| `popular-searches` | String (comma-separated) | `""` | Popular search terms |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | String | Current search query |
| `popularSearches` | String[] | Array of popular search terms |

### Events

| Event | Description | Event Detail |
|-------|-------------|--------------|
| `search` | Fired when a search is submitted | `{ query: string }` |

## Styling

The component uses Shadow DOM with encapsulated styles. You can customize the appearance using CSS custom properties:

```css
moe-search {
  --search-button-bg: #1d4ed8;
  --search-button-hover: #1e40af;
  --search-button-text: white;
  --search-input-border: #d1d5db;
  --search-popular-text: #6b7280;
  --search-popular-link: #3b82f6;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
