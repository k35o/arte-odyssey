# Vite Example - ArteOdyssey

This example demonstrates how to use ArteOdyssey UI components in a Vite + React application.

## Overview

This example showcases:

- Basic setup of ArteOdyssey in a Vite project
- Usage of Button component with icons
- Tailwind CSS integration
- TypeScript configuration

## Getting Started

### Prerequisites

- Node.js 22.18.0
- pnpm 10.15.0

### Installation & Setup

From the root of the ArteOdyssey monorepo:

```bash
# Install dependencies
pnpm install

# Navigate to this example
cd examples/vite

# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
examples/vite/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── vite-env.d.ts    # Vite type declarations
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tsconfig.*.json      # Additional TypeScript configs
└── vite.config.ts       # Vite configuration
```

## What's Included

### Components Used

- **Button** - Interactive button with icon support
- **PlusIcon** - Icon from the ArteOdyssey icon collection

### Features Demonstrated

- State management with React hooks
- Component styling with Tailwind CSS
- Icon integration
- Event handling
- TypeScript integration

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm check` - Run Biome linting checks
- `pnpm check:write` - Run Biome checks and auto-fix issues

## Key Configuration

### Vite Configuration

The project uses `@vitejs/plugin-react-swc` for fast React development with SWC compilation.

### Tailwind CSS

Tailwind CSS is configured via `@tailwindcss/vite` plugin for optimal performance and development experience.

### TypeScript

Full TypeScript support with strict configuration for type safety.

## Usage Example

The main application (`src/App.tsx`) demonstrates a simple counter example:

```tsx
import { Button, PlusIcon } from '@k8o/arte-odyssey';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 font-bold text-2xl">カウント: {count}</h1>
      <Button
        onClick={() => setCount((c) => c + 1)}
        size="md"
        startIcon={<PlusIcon />}
        variant="solid"
      >
        カウントを増加
      </Button>
    </div>
  );
}
```

## Extending This Example

You can extend this example by:

1. Adding more ArteOdyssey components
2. Creating custom layouts and pages
3. Implementing routing with React Router
4. Adding state management solutions
5. Integrating with APIs and backends

## Troubleshooting

### Common Issues

**Build errors with Tailwind CSS:**
Make sure Tailwind CSS is properly configured and all required dependencies are installed.

**TypeScript errors:**
Run `pnpm typecheck` to identify and fix type issues.

**Component not found:**
Ensure you're importing components from the correct ArteOdyssey package path.

## Related Documentation

- [ArteOdyssey Main Documentation](../../packages/arte-odyssey/README.md)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

This example is part of the ArteOdyssey monorepo. See the [main README](../../README.md) for more information about the project.
