import { Anchor, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';

const headingProps: PropItem[] = [
  {
    name: 'type',
    types: ["'h1'", "'h2'", "'h3'", "'h4'", "'h5'", "'h6'"],
    defaultValue: null,
  },
  { name: 'id', types: ['string'], defaultValue: null },
  { name: 'lineClamp', types: ['number'], defaultValue: null },
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

export function HeadingPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">Heading</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.heading.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-heading--docs`}
            openInNewTab
          >
            <T k="components.common.storybookLink" />
          </Anchor>
        </div>
      </div>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.importTitle" />
        </Heading>
        <CodeBlock
          code="import { Heading } from '@k8o/arte-odyssey';"
          lang="ts"
        />
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Heading type="h2">
            <T k="components.common.usageTitle" />
          </Heading>
          <ComponentPreview code='<Heading type="h2">Section Title</Heading>'>
            <Heading type="h2">Section Title</Heading>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.heading.typesTitle" />
          </Heading>
          <ComponentPreview
            code={`<Heading type="h1">Heading 1</Heading>
<Heading type="h2">Heading 2</Heading>
<Heading type="h3">Heading 3</Heading>
<Heading type="h4">Heading 4</Heading>
<Heading type="h5">Heading 5</Heading>
<Heading type="h6">Heading 6</Heading>`}
          >
            <div className="flex flex-col gap-4">
              <Heading type="h1">Heading 1</Heading>
              <Heading type="h2">Heading 2</Heading>
              <Heading type="h3">Heading 3</Heading>
              <Heading type="h4">Heading 4</Heading>
              <Heading type="h5">Heading 5</Heading>
              <Heading type="h6">Heading 6</Heading>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.heading.lineClampTitle" />
          </Heading>
          <ComponentPreview
            code={`<Heading lineClamp={1} type="h3">
  This is a very long heading text that will be
  truncated to a single line using line clamp
</Heading>`}
          >
            <div className="max-w-sm">
              <Heading lineClamp={1} type="h3">
                This is a very long heading text that will be truncated to a
                single line using line clamp
              </Heading>
            </div>
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <PropsTable
          inherits="HTMLAttributes<HTMLHeadingElement>"
          items={headingProps}
        />
      </section>
    </div>
  );
}
