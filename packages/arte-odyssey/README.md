# @k8o/arte-odyssey

A modern React UI component library built with TypeScript, Tailwind CSS, and accessibility in mind.

## Installation

```bash
npm install @k8o/arte-odyssey
# or
pnpm add @k8o/arte-odyssey
# or
yarn add @k8o/arte-odyssey
```

## Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom typescript tailwindcss
```

Required versions:

- React ≥19.0.0
- TypeScript ≥6.0.0
- Tailwind CSS ≥4.0.0

## Quick Start

1. Import the CSS and set up the provider:

```css
/* In your main CSS file (recommended for Tailwind CSS 4) */
@import 'tailwindcss';
@import '@k8o/arte-odyssey/styles.css';
```

```tsx
// In your app entry point
import { ArteOdysseyProvider } from '@k8o/arte-odyssey';

function App() {
  return (
    <ArteOdysseyProvider>
      <YourApp />
    </ArteOdysseyProvider>
  );
}
```

2. Use components:

```tsx
import { Button } from '@k8o/arte-odyssey';
import { Card } from '@k8o/arte-odyssey';

function MyPage() {
  return (
    <Card title="Welcome to ArteOdyssey">
      <Button
        color="primary"
        variant="contained"
        onClick={() => alert('Hello!')}
      >
        Click me
      </Button>
    </Card>
  );
}
```

## AI Agent Documentation

ArteOdyssey includes design system documentation in `docs/` directory. When installed via npm, AI coding assistants can reference `node_modules/@k8o/arte-odyssey/docs/GUIDE.md` for design principles, component APIs, and usage patterns.

## Component Categories

### Buttons

- **Button** - Primary action button (use `renderItem` to render as a link)
- **IconButton** - Button with icon only (use `renderItem` to render as a link)

### Navigation

- **Anchor** - Text link with external-link awareness
- **Breadcrumb** - Navigation path indicator
- **Pagination** - Page navigation controls
- **Tabs** - Tab-based content organization

### Form Controls

- **Autocomplete** - Search with suggestions
- **Checkbox** / **CheckboxCard** / **CheckboxGroup** - Multi-selection inputs
- **FileField** - File upload with composite pattern
- **Form** / **FormControl** - Form wrapper and field with label/validation
- **NumberField** - Numeric input with controls
- **PasswordInput** - Password input with show/hide toggle
- **Radio** / **RadioCard** - Single-selection inputs
- **Select** - Dropdown selection
- **Slider** - Slider input control
- **Switch** - Toggle switch
- **TextField** - Single-line text input
- **Textarea** - Multi-line text input

### Data Display

- **Accordion** - Collapsible content panels
- **Avatar** - User/entity avatar
- **Badge** - Status/label indicator
- **BaselineStatus** - Web standard support indicator
- **Card** / **InteractiveCard** - Flexible content container (with hover interaction)
- **Code** - Formatted code display
- **Heading** - Typography heading component
- **Table** - Tabular data display

### Feedback

- **Alert** - Important messages and notifications
- **Progress** - Progress indication
- **Skeleton** - Content loading placeholder
- **Spinner** - Loading indicator
- **ToastProvider** / **useToast** - Temporary notification messages

### Overlays

- **Dialog** - Modal dialog boxes
- **Drawer** - Slide-out panel
- **DropdownMenu** - Action menu component
- **ListBox** - Selectable list component
- **Modal** - Overlay modal component
- **Popover** - Floating content container
- **Tooltip** - Contextual help text

### Layout

- **ScrollLinked** - Scroll progress indicator
- **Separator** - Visual content divider

### Utilities

- **ArteOdysseyProvider** - Root provider for the library
- **PortalRootProvider** / **usePortalRoot** - Customize the portal mount root
- **Icons** - Icon component collection

## Usage Examples

### Button

```tsx
import { Button } from '@k8o/arte-odyssey';

// Primary action
<Button color="primary" variant="contained" size="md">
  Save
</Button>

// Secondary action
<Button color="gray" variant="outlined">
  Cancel
</Button>

// Text-only
<Button variant="skeleton">
  Learn more
</Button>
```

### Form with Validation

```tsx
import { FormControl } from '@k8o/arte-odyssey';
import { TextField } from '@k8o/arte-odyssey';
import { Button } from '@k8o/arte-odyssey';

<form>
  <FormControl
    label="Email"
    isRequired
    errorText={error}
    renderInput={(props) => (
      <TextField {...props} id="email" placeholder="Enter your email" />
    )}
  />
  <Button type="submit">Submit</Button>
</form>;
```

### Dialog

```tsx
import { Dialog } from '@k8o/arte-odyssey';
import { Button } from '@k8o/arte-odyssey';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      {isOpen && (
        <Dialog.Root>
          <Dialog.Header
            title="Confirm Action"
            onClose={() => setIsOpen(false)}
          />
          <Dialog.Content>
            <p>Are you sure you want to continue?</p>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  );
}
```

## Granular Imports

ArteOdyssey supports granular imports to optimize your bundle size:

```tsx
// Import specific components
import { Button } from '@k8o/arte-odyssey';
import { Card } from '@k8o/arte-odyssey';

// Import specific hooks
import { useClickAway } from '@k8o/arte-odyssey';
import { useLocalStorage } from '@k8o/arte-odyssey';
```

## Generative UI integrations

ArteOdyssey ships official adapters so an LLM can generate UIs using these components, via either [json-render](https://json-render.dev) or [OpenUI](https://www.openui.com). Each adapter constrains the model to ArteOdyssey components with prop schemas locked to the design tokens, so generated UIs stay on-brand. Component-specific `renderItem` render props are bridged internally — the model only ever sees flat data (e.g. `href`).

These integrations are exposed as optional subpath exports. Install the framework you use (they are optional peer dependencies):

```bash
# json-render
pnpm add @json-render/core @json-render/react zod
# OpenUI
pnpm add @openuidev/react-lang zod
```

Supported components (**all 47**, both frameworks):

- **Layout / containers**: `Stack`, `Card`, `InteractiveCard`, `Form`
- **Buttons / nav**: `Button`, `IconButton`, `Anchor`, `Breadcrumb`, `Pagination`
- **Display**: `Badge`, `Heading`, `Avatar`, `Code`, `Icon`, `Alert`, `Spinner`, `Progress`, `Skeleton`, `Separator`, `Tabs`, `Accordion`, `Table`, `BaselineStatus`, `ScrollLinked`
- **Overlays (self-contained widgets)**: `Modal`, `Dialog`, `Drawer`, `Popover`, `Tooltip`, `DropdownMenu`, `Toast`
- **Form**: `TextField`, `Textarea`, `PasswordInput`, `NumberField`, `Slider`, `Checkbox`, `Switch`, `Select`, `Radio`, `RadioCard`, `CheckboxCard`, `ListBox`, `CheckboxGroup`, `Autocomplete`, `FileField`, `FormControl`

Overlays are exposed as **self-contained widgets**: a `Modal`/`Dialog`/`Drawer`/`Popover` declares its own trigger button via `triggerLabel`, manages open/close internally, and renders the supplied children inside the surface. This lets a model generate UIs that include overlays without modelling imperative open/close state. `Tooltip`/`DropdownMenu`/`Toast` follow the same self-contained pattern (trigger + content).

### json-render (RSC-ready)

The catalog (schemas / prompt) and the registry (rendering) are split so the catalog is **server-safe** — you can generate the system prompt in a React Server Component, and render on the client.

```tsx
// Server Component: prompt generation
import { catalog } from '@k8o/arte-odyssey/json-render';

const systemPrompt = catalog.prompt(); // safe on the server
```

```tsx
// Client Component: rendering
'use client';
import { registry } from '@k8o/arte-odyssey/json-render/registry';
import { JSONUIProvider, Renderer } from '@json-render/react';

export function GenUi({ spec }: { spec: unknown }) {
  return (
    <JSONUIProvider registry={registry}>
      <Renderer registry={registry} spec={spec} />
    </JSONUIProvider>
  );
}
```

| Export                                   | Side           | Contents                         |
| ---------------------------------------- | -------------- | -------------------------------- |
| `@k8o/arte-odyssey/json-render`          | server-safe    | `catalog` (schemas + `prompt()`) |
| `@k8o/arte-odyssey/json-render/registry` | `'use client'` | `registry` (rendering)           |

### OpenUI

```tsx
'use client';
import { library } from '@k8o/arte-odyssey/openui';
import { Renderer } from '@openuidev/react-lang';

export function GenUi({ response }: { response: string }) {
  return <Renderer library={library} response={response} />;
}
```

Generate the system prompt at build time with the OpenUI CLI, or call `library.prompt()` in the same client bundle.

> **Notes**
>
> - Make sure `@k8o/arte-odyssey/styles.css` is loaded and the app is wrapped in `ArteOdysseyProvider`.
> - `Tabs` panels are text content (`tabs: [{ label, content }]`); rich-component panels are a future enhancement.
> - In OpenUI, `Card` can contain a `Stack`, but `Stack` cannot nest another `Stack` (the framework does not support self-referential schemas). json-render nests freely (slots-based).

## Custom Hooks

The library includes several useful hooks:

- **useBreakpoint** - Tailwind breakpoint matcher
- **useClickAway** - Detect clicks outside an element
- **useClient** - Client-side rendering detection
- **useClipboard** - Clipboard operations
- **useControllableState** - Controlled/uncontrolled state pattern
- **useDebouncedTransition** - Rate-limited transition with `AbortSignal`
- **useDeferredDebounce** - `useDeferredValue` with pending flag
- **useDisclosure** - Open/close/toggle disclosure state
- **useHash** - URL hash management
- **useHover** - Element hover detection
- **useIntersectionObserver** / **useInView** - Element visibility
- **useInterval** - Interval timer management
- **useLocalStorage** / **useSessionStorage** - Web Storage with React state
- **useResize** - Element resize detection (ResizeObserver)
- **useScrollDirection** - Scroll direction detection
- **useScrollLock** - Body/element scroll lock
- **useStep** - Step-based state management
- **useTimeout** - Timeout management
- **useWindowResize** - Window resize events
- **useWindowSize** - Window size tracking
- **useWritingMode** - Detect horizontal/vertical `writing-mode`

## Accessibility

All components follow WCAG accessibility guidelines:

- Semantic HTML elements
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## Styling & Customization

Components are built with Tailwind CSS and support customization through:

- CSS custom properties (semantic design tokens)
- Tailwind utility classes
- Light / Dark mode via semantic color tokens

## Development

For local development and contributing:

```bash
# Install dependencies
pnpm install

# Start Storybook for component development
pnpm storybook

# Run tests
pnpm test

# Build the library
pnpm build

# Type checking
pnpm typecheck

# Linting and formatting
pnpm check:write
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see [LICENSE](../../LICENSE) for details.

## Contributing

Contributions are welcome! Please see the [main repository](../../README.md) for contribution guidelines.
