# CMS Content Model Library

A vanilla TypeScript library for defining and managing content models for headless CMS implementations using Optical (a GovTech product wrapping Directus). This library provides type-safe content models and utilities that map to the Optical CMS API responses and SGDS web components.

## Key Features

- Vanilla TypeScript/JavaScript with no framework dependencies
- Type-safe content model definitions
- SGDS web component integration
- Lightweight and framework-agnostic design
- Built with `@govtechsg/sgds-web-component` for consistent UI

## Project Structure

```
├── src/
│   ├── models/          # TypeScript interfaces for content models
│   ├── components/       # SGDS web component utilities and wrappers
│   ├── services/         # API services and data transformation
│   ├── types/            # Shared TypeScript types and type guards
│   └── index.ts          # Main library exports
├── tests/                # Test files
├── .gitignore
├── package.json
├── tsconfig.json         # TypeScript configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
npm install @your-org/cms-content-model
# or
yarn add @your-org/cms-content-model
```

## Development Guidelines

### Component Development

1. Only use components from `@govtechsg/sgds-web-component`
2. Create utility functions to work with SGDS web components
3. Provide TypeScript types for web component properties and events
4. Document component usage with JSDoc and examples
5. No framework-specific code - keep it vanilla JavaScript/TypeScript

### Documentation

- [Component Creation Guide](docs/component-creation-guide.md) - Learn how to create new renderer components

Detailed documentation for the project can be found in the `docs/` directory.

### Content Model Definition

1. Define clear interfaces for each content type
2. Use TypeScript's type system to enforce data structure
3. Document required and optional fields
4. Include validation where necessary

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for consistent formatting
- Write JSDoc for all public APIs

## Example Usage

```typescript
import { ContentRenderer } from '@your-org/cms-content-model';

// Example of rendering content from Optical CMS API
const content = await fetchContentFromOptical('content-id');
const element = document.getElementById('content-container');

if (element) {
  const renderer = new ContentRenderer();
  renderer.render(content, element);
}
```

## Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your-org/cms-content-model/tags).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
