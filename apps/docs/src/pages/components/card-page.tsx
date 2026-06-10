import { Anchor, Card, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';

const cardProps: PropItem[] = [
  {
    name: 'appearance',
    types: ["'shadow'", "'bordered'"],
    defaultValue: "'shadow'",
  },
  {
    name: 'width',
    types: ["'full'", "'fit'"],
    defaultValue: "'full'",
  },
  {
    name: 'interactive',
    types: ['boolean'],
    defaultValue: 'false',
  },
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

export function CardPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Heading type="h1">Card</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.card.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-card--docs`}
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
        <CodeBlock code="import { Card } from '@k8o/arte-odyssey';" lang="ts" />
      </section>
      <Separator color="mute" />

      {/* Usage */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Heading type="h2">
            <T k="components.common.usageTitle" />
          </Heading>
          <ComponentPreview
            code={`<Card>
  <div className="p-6">Card content</div>
</Card>`}
          >
            <Card>
              <div className="p-6">Card content</div>
            </Card>
          </ComponentPreview>
        </div>

        {/* Width */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.card.widthTitle" />
          </Heading>
          <ComponentPreview
            code={`<Card width="full">
  <div className="p-6">Full width</div>
</Card>
<Card width="fit">
  <div className="p-6">Fit content</div>
</Card>`}
          >
            <div className="w-full">
              <Card width="full">
                <div className="p-6">Full width</div>
              </Card>
            </div>
            <Card width="fit">
              <div className="p-6">Fit content</div>
            </Card>
          </ComponentPreview>
        </div>

        {/* Interactive */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">Interactive</Heading>
          <p className="text-fg-mute">
            <T k="components.card.interactiveDescription" />
          </p>
          <ComponentPreview
            code={`<Card interactive>
  <a className="block p-6" href="https://example.com">
    Hover to scale up
  </a>
</Card>`}
          >
            <Card interactive>
              <a className="block p-6" href="https://example.com">
                Hover to scale up
              </a>
            </Card>
          </ComponentPreview>
        </div>

        {/* Appearance */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">Appearance</Heading>
          <ComponentPreview
            code={`<Card appearance="shadow">
  <div className="p-6">Shadow</div>
</Card>
<Card appearance="bordered">
  <div className="p-6">Bordered</div>
</Card>`}
          >
            <Card appearance="shadow">
              <div className="p-6">Shadow</div>
            </Card>
            <Card appearance="bordered">
              <div className="p-6">Bordered</div>
            </Card>
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
          inherits="HTMLAttributes<HTMLDivElement>"
          items={cardProps}
        />
      </section>
    </div>
  );
}
