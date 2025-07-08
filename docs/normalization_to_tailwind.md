# HTML/CSS Normalization to Tailwind CSS

This document serves as a reference for converting custom utility classes to standard Tailwind CSS classes.

## Conversion Guidelines

### Common Class Mappings

| Custom Class | Tailwind CSS Equivalent |
|--------------|-------------------------|
| `d:f` | `flex` |
| `fld:r` | `flex-row` |
| `ai:c` | `items-center` |
| `jc:fe` | `justify-end` |
| `m-x:a` | `mx-auto` |
| `p-x:xl` | `px-6` |
| `p-y:2xs` | `py-1` |
| `m-r:2xs` | `mr-1` |
| `m-l:2xs` | `ml-1` |
| `c:white` | `text-white` |
| `h:100` | `h-full` |
| `wrap:m` | `max-w-7xl` |

### Example Conversion

#### Original HTML with Custom Utilities
```html
<div class="h:100 d:f fld:r jc:fe ai:c">
    <ul class="d:f fld:r ai:c">
        <!-- items -->
    </ul>
</div>
```

#### Converted to Tailwind CSS
```html
<div class="h-full flex flex-row justify-end items-center">
    <ul class="flex flex-row items-center">
        <!-- items -->
    </ul>
</div>
```

### Best Practices
1. Use responsive prefixes (sm:, md:, lg:) for responsive design
2. Leverage Tailwind's spacing scale (1 = 0.25rem, 2 = 0.5rem, etc.)
3. Maintain semantic HTML structure
4. Group related classes together (layout, spacing, typography, etc.)
5. Use @apply in your CSS for repeated component styles

### Common Patterns
- Navigation bars: `flex items-center justify-between`
- Cards: `bg-white rounded-lg shadow-md p-4`
- Buttons: `px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700`
- Containers: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Notes
- Always verify the converted output in the browser
- Adjust spacing and colors to match your design system
- Consider creating reusable components for frequently used patterns