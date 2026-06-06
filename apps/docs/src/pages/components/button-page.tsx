import {
  Anchor,
  Button,
  ChevronIcon,
  Heading,
  MailIcon,
  Separator,
} from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import { ButtonAsLinkPreview } from './_previews/button-previews';

const buttonProps: PropItem[] = [
  {
    name: 'variant',
    types: ["'solid'", "'outline'", "'skeleton'"],
    defaultValue: "'solid'",
  },
  {
    name: 'color',
    types: ["'primary'", "'secondary'", "'gray'"],
    defaultValue: "'primary'",
  },
  {
    name: 'size',
    types: ["'sm'", "'md'", "'lg'"],
    defaultValue: "'md'",
  },
  {
    name: 'type',
    types: ["'button'", "'submit'"],
    defaultValue: "'button'",
  },
  { name: 'fullWidth', types: ['boolean'], defaultValue: 'false' },
  { name: 'isActive', types: ['boolean'], defaultValue: 'false' },
  { name: 'startIcon', types: ['ReactNode'], defaultValue: null },
  { name: 'endIcon', types: ['ReactNode'], defaultValue: null },
  { name: 'disabled', types: ['boolean'], defaultValue: 'false' },
  {
    name: 'onAction',
    types: ['() => void | Promise<void>'],
    defaultValue: null,
  },
  {
    name: 'renderItem',
    types: ['(props: { className, children }) => ReactNode'],
    defaultValue: null,
  },
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

export function ButtonPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Heading type="h1">Button</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.button.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-button--docs`}
            openInNewTab
          >
            <T k="components.common.storybookLink" />
          </Anchor>
        </div>
      </div>
      <Separator color="mute" />

      {/* Import */}
      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.importTitle" />
        </Heading>
        <CodeBlock
          code="import { Button } from '@k8o/arte-odyssey';"
          lang="ts"
        />
      </section>
      <Separator color="mute" />

      {/* Usage */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Heading type="h2">
            <T k="components.common.usageTitle" />
          </Heading>
          <ComponentPreview
            code={`<Button variant="solid" color="primary">
  Click me
</Button>`}
          >
            <Button color="primary" variant="solid">
              Click me
            </Button>
          </ComponentPreview>
        </div>

        {/* Variants */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.button.variantsTitle" />
          </Heading>
          <ComponentPreview
            code={`<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="skeleton">Skeleton</Button>`}
          >
            <Button variant="solid">Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="skeleton">Skeleton</Button>
          </ComponentPreview>
        </div>

        {/* Colors */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.button.colorsTitle" />
          </Heading>
          <ComponentPreview
            code={`<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="gray">Gray</Button>`}
          >
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="gray">Gray</Button>
          </ComponentPreview>
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.button.sizesTitle" />
          </Heading>
          <ComponentPreview
            code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
          >
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </ComponentPreview>
        </div>

        {/* With Icons */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.button.iconsTitle" />
          </Heading>
          <ComponentPreview
            code={`import { MailIcon, ChevronIcon } from '@k8o/arte-odyssey';

<Button startIcon={<MailIcon size="sm" />}>
  Send Email
</Button>
<Button endIcon={<ChevronIcon direction="right" size="sm" />}>
  Next
</Button>`}
          >
            <Button startIcon={<MailIcon size="sm" />}>Send Email</Button>
            <Button endIcon={<ChevronIcon direction="right" size="sm" />}>
              Next
            </Button>
          </ComponentPreview>
        </div>

        {/* Full Width */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.button.fullWidthTitle" />
          </Heading>
          <ComponentPreview code="<Button fullWidth>Full Width Button</Button>">
            <div className="w-full">
              <Button fullWidth>Full Width Button</Button>
            </div>
          </ComponentPreview>
        </div>

        {/* Disabled */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.button.disabledTitle" />
          </Heading>
          <ComponentPreview code="<Button disabled>Disabled</Button>">
            <Button disabled>Disabled</Button>
          </ComponentPreview>
        </div>

        {/* Render as Link */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.button.renderItemTitle" />
          </Heading>
          <ComponentPreview
            code={`<Button
  renderItem={({ className, children }) => (
    <a className={className} href="https://example.com">
      {children}
    </a>
  )}
>
  Visit
</Button>`}
          >
            <ButtonAsLinkPreview />
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      {/* Props */}
      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <PropsTable
          inherits="ButtonHTMLAttributes<HTMLButtonElement>"
          items={buttonProps}
        />
      </section>
    </div>
  );
}
