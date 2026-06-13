# ArteOdyssey

A modern, TypeScript-first React UI component library built with performance and developer experience in mind.

## Features

- **Modern Stack**: Built with React 19, TypeScript 6+, and Tailwind CSS 4+
- **Accessible**: WCAG compliant components with full keyboard navigation
- **Performant**: Optimized bundle size with tree-shakeable components
- **Developer Friendly**: Comprehensive TypeScript support and Storybook documentation
- **Customizable**: Built on Tailwind CSS with semantic design tokens for easy theming
- **Generative UI Ready**: Official [json-render](https://json-render.dev) and [OpenUI](https://www.openui.com) adapters let an LLM generate on-brand UIs from these components — `validateGeneratedSpec()` validates/repairs LLM output and `<JsonRenderUI spec={spec} />` renders it in one line. See [Generative UI integrations](packages/arte-odyssey/README.md#generative-ui-integrations).

## Installation

```bash
npm install @k8o/arte-odyssey
# or
pnpm add @k8o/arte-odyssey
# or
yarn add @k8o/arte-odyssey
```

## AI Agent Documentation

ArteOdyssey includes design system documentation in the published npm package. When installed, AI coding assistants can reference `node_modules/@k8o/arte-odyssey/docs/GUIDE.md` for design principles, component APIs, and usage patterns.

## Development

This is a monorepo managed with [Vite+](https://vite.plus) (`vp`) and pnpm.

### Prerequisites

- Node.js ≥24.13.0
- pnpm 11.1.3

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run type checking
pnpm typecheck

# Run tests
pnpm test

# Run linting and formatting
pnpm check:write
```

### Project Structure

```
apps/
  docs/                  # Documentation site (Vite + @funstack/router)
packages/
  arte-odyssey/          # Main UI library package
examples/
  vite/                  # Vite example application
  nextjs/                # Next.js example application
```

### Available Scripts

- `pnpm build` - Build all packages
- `pnpm test` - Run all tests
- `pnpm test:ui` - Run tests with UI
- `pnpm test:coverage` - Run tests with coverage
- `pnpm typecheck` - Type check all packages
- `pnpm check` - Run linting checks
- `pnpm check:write` - Run linting checks and auto-fix
- `pnpm release` - Build and publish packages

### Visual Regression Testing

Per-story VRT runs on [storybook-addon-vrt](https://github.com/k35o/storybook-addon-vrt).

```bash
pnpm --filter @k8o/arte-odyssey test:vrt          # capture story screenshots
pnpm --filter @k8o/arte-odyssey exec svrt compare # compare against the baseline
pnpm --filter @k8o/arte-odyssey exec svrt approve # accept changes as the new baseline
```

On CI, every pull request is compared against the latest baseline captured on
`main`, and a summary with a link to the visual report is posted as a PR
comment. Merging the pull request makes its screenshots the next baseline.

## Documentation

- [Component Documentation](packages/arte-odyssey/README.md)
- [Generative UI integrations (json-render / OpenUI)](packages/arte-odyssey/README.md#generative-ui-integrations)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

**k8o** ([GitHub](https://github.com/k35o))
