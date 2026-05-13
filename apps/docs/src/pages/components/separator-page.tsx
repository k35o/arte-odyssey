import { Anchor, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';

const separatorProps: PropItem[] = [
  {
    name: 'orientation',
    types: ["'horizontal'", "'vertical'"],
    defaultValue: "'horizontal'",
  },
  {
    name: 'color',
    types: ["'base'", "'mute'", "'subtle'"],
    defaultValue: "'base'",
  },
];

export function SeparatorPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Heading type="h1">Separator</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.separator.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-separator--docs`}
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
          code="import { Separator } from '@k8o/arte-odyssey';"
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
          <ComponentPreview code='<Separator color="mute" />'>
            <div className="block-32 inline-full">
              <Separator color="mute" />
            </div>
          </ComponentPreview>
        </div>

        {/* Orientations */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.separator.orientationsTitle" />
          </Heading>
          <ComponentPreview
            code={`<Separator orientation="horizontal" />
<Separator orientation="vertical" />`}
          >
            <div className="flex flex-col gap-6 block-32 inline-full">
              <div className="flex-1 inline-full">
                <Separator orientation="horizontal" />
              </div>
              <div className="flex items-center block-16 inline-full">
                <Separator orientation="vertical" />
              </div>
            </div>
          </ComponentPreview>
        </div>

        {/* Colors */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.separator.colorsTitle" />
          </Heading>
          <ComponentPreview
            code={`<Separator color="base" />
<Separator color="mute" />
<Separator color="subtle" />`}
          >
            <div className="flex flex-col gap-6 block-32 inline-full">
              <div className="flex-1 inline-full">
                <Separator color="base" />
              </div>
              <div className="flex-1 inline-full">
                <Separator color="mute" />
              </div>
              <div className="flex-1 inline-full">
                <Separator color="subtle" />
              </div>
            </div>
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
          inherits="HTMLAttributes<HTMLSpanElement>"
          items={separatorProps}
        />
      </section>
    </div>
  );
}
