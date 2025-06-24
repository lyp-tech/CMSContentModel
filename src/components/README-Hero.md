# Hero Component

A flexible hero section component that displays a title, subtitle, and optional background/foreground images.

## Installation

Import the component in your JavaScript/TypeScript file:

```typescript
import './path/to/Hero';
```

## Usage

### Basic Usage

```html
<moe-hero
  title="Welcome to Our Site"
  subtitle="Discover amazing content and resources"
></moe-hero>
```

### With Background Image

```html
<moe-hero
  title="Welcome to Our Site"
  subtitle="Discover amazing content and resources"
  background-image="/path/to/background.jpg"
></moe-hero>
```

### With Foreground Image

```html
<moe-hero
  title="Welcome to Our Site"
  subtitle="Discover amazing content and resources"
  foreground-image="/path/to/foreground.png"
  foreground-size="w-1/2 max-w-md"
></moe-hero>
```

## API

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | String | `''` | The main heading text |
| `subtitle` | String | `''` | The subheading text |
| `background-image` | String | `null` | URL of the background image |
| `foreground-image` | String | `null` | URL of the foreground image |
| `foreground-size` | String | `'w-3/4 max-w-2xl'` | Tailwind classes for the foreground image size |
| `image-offset` | String | `'0'` | CSS margin-top value to adjust the vertical position of the foreground image (e.g., '-4rem') |

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--hero-bg-color` | `#ffffff` | Background color |
| `--hero-text-color` | `#1f2937` | Text color |
| `--hero-padding` | `6rem 1rem` | Vertical and horizontal padding |

## Styling

You can customize the appearance using CSS custom properties:

```css
moe-hero {
  --hero-bg-color: #f3f4f6;
  --hero-text-color: #111827;
  --hero-padding: 8rem 1rem;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
