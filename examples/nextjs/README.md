# Next.js Example - ArteOdyssey

This example demonstrates how to use ArteOdyssey UI components in a Next.js application with App Router.

## Overview

This example showcases:

- Basic setup of ArteOdyssey in a Next.js project
- Usage of Button component with icons
- Client-side component integration
- Tailwind CSS with PostCSS configuration
- TypeScript configuration with Next.js
- Turbopack for fast development and builds

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
cd examples/nextjs

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
examples/nextjs/
├── src/
│   └── app/
│       ├── globals.css      # Global styles with ArteOdyssey CSS
│       ├── layout.tsx       # Root layout component
│       └── page.tsx         # Home page component
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration for Tailwind
├── tsconfig.json            # TypeScript configuration
└── next-env.d.ts           # Next.js type declarations
```

## What's Included

### Components Used

- **Button** - Interactive button with icon support
- **PlusIcon** - Icon from the ArteOdyssey icon collection

### Features Demonstrated

- Client-side state management with React hooks
- Next.js App Router integration
- Component styling with Tailwind CSS
- Icon integration
- Event handling
- TypeScript integration
- Turbopack integration for fast development

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production with Turbopack
- `pnpm start` - Start production server
- `pnpm typecheck` - Run TypeScript type checking with Next.js typegen
- `pnpm check` - Run Biome linting checks
- `pnpm check:write` - Run Biome checks and auto-fix issues

## Key Configuration

### Next.js Configuration

The project uses Next.js 15.5.2 with:

- **Turbopack** for faster development and builds
- **App Router** for modern Next.js routing
- **TypeScript** with Next.js typegen

### Tailwind CSS

Tailwind CSS is configured with PostCSS for optimal integration with Next.js.

### Client Components

ArteOdyssey components are used in client components (marked with `'use client'`) since they include interactive features and state management.

## Usage Example

The main page (`src/app/page.tsx`) demonstrates a simple counter example:

```tsx
'use client';

import { Button, PlusIcon } from '@k8o/arte-odyssey';
import { useState } from 'react';

export default function Home() {
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

### Global Styles Setup

In `src/app/globals.css`:

```css
@import '@k8o/arte-odyssey/styles.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Extending This Example

You can extend this example by:

1. Adding more pages and routes
2. Implementing server-side rendering (SSR) where appropriate
3. Using Next.js features like:
   - API routes
   - Server components for non-interactive content
   - Image optimization
   - Static generation (SSG)
4. Adding more ArteOdyssey components
5. Implementing authentication and data fetching
6. Adding SEO optimization with Next.js metadata

## Next.js App Router Considerations

### Client vs Server Components

- **Use client components** (`'use client'`) for ArteOdyssey components that have interactivity
- **Use server components** (default) for static content that doesn't need client-side JavaScript
- **Mix both** for optimal performance

### Example Structure

```tsx
// Server component (default)
export default function Page() {
  return (
    <div>
      <h1>Server-rendered content</h1>
      <InteractiveSection />
    </div>
  );
}

// Client component
('use client');
function InteractiveSection() {
  return <Button onClick={() => alert('Hello!')}>Click me</Button>;
}
```

## Troubleshooting

### Common Issues

**Hydration errors:**
Make sure interactive components are marked as client components with `'use client'`.

**Build errors with Tailwind CSS:**
Verify PostCSS configuration and Tailwind CSS setup.

**TypeScript errors:**
Run `pnpm typecheck` to identify and fix type issues. Next.js typegen will generate route types automatically.

**Component not found:**
Ensure you're importing components from the correct ArteOdyssey package path.

## Performance Tips

1. Use server components for static content
2. Use client components only when necessary
3. Leverage Next.js built-in optimizations
4. Use dynamic imports for code splitting
5. Optimize images with Next.js Image component

## Related Documentation

- [ArteOdyssey Main Documentation](../../packages/arte-odyssey/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

This example is part of the ArteOdyssey monorepo. See the [main README](../../README.md) for more information about the project.
