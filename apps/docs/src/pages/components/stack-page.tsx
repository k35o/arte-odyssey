import { Anchor, Badge, Heading, Separator, Stack } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';

const stackProps: PropItem[] = [
  {
    name: 'direction',
    types: ["'row'", "'column'"],
    defaultValue: "'column'",
  },
  {
    name: 'gap',
    types: ["'none'", "'sm'", "'md'", "'lg'", "'xl'"],
    defaultValue: "'md'",
  },
  {
    name: 'align',
    types: ["'start'", "'center'", "'end'", "'stretch'"],
    defaultValue: null,
  },
  {
    name: 'justify',
    types: ["'start'", "'center'", "'end'", "'between'"],
    defaultValue: null,
  },
];

const sampleItems = ['有効', '保留', 'エラー'] as const;
const SAMPLE_TONE = ['success', 'warning', 'error'] as const;

export function StackPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Heading type="h1">Stack</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.stack.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-stack--docs`}
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
          code="import { Stack } from '@k8o/arte-odyssey';"
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
            code={`<Stack direction="row" gap="sm">
  <Badge text="有効" tone="success" />
  <Badge text="保留" tone="warning" />
  <Badge text="エラー" tone="error" />
</Stack>`}
          >
            <Stack direction="row" gap="sm">
              {sampleItems.map((label, i) => (
                <Badge key={label} text={label} tone={SAMPLE_TONE[i]} />
              ))}
            </Stack>
          </ComponentPreview>
        </div>

        {/* Direction */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.stack.directionTitle" />
          </Heading>
          <ComponentPreview
            code={`<Stack direction="column" gap="sm">…</Stack>
<Stack direction="row" gap="sm">…</Stack>`}
          >
            <Stack direction="column" gap="md">
              <Stack direction="column" gap="sm">
                {sampleItems.map((label, i) => (
                  <Badge key={label} text={label} tone={SAMPLE_TONE[i]} />
                ))}
              </Stack>
              <Stack direction="row" gap="sm">
                {sampleItems.map((label, i) => (
                  <Badge key={label} text={label} tone={SAMPLE_TONE[i]} />
                ))}
              </Stack>
            </Stack>
          </ComponentPreview>
        </div>

        {/* Gap */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.stack.gapTitle" />
          </Heading>
          <ComponentPreview code='<Stack direction="row" gap="none|sm|md|lg|xl">…</Stack>'>
            <Stack direction="column" gap="md">
              {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((g) => (
                <Stack direction="row" gap={g} key={g}>
                  <Badge text={`gap=${g}`} tone="neutral" variant="outline" />
                  <Badge text="A" tone="info" />
                  <Badge text="B" tone="info" />
                  <Badge text="C" tone="info" />
                </Stack>
              ))}
            </Stack>
          </ComponentPreview>
        </div>

        {/* Align & justify */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.stack.alignTitle" />
          </Heading>
          <ComponentPreview code='<Stack direction="row" align="center" justify="between">…</Stack>'>
            <div className="bg-bg-subtle rounded-lg px-3 py-3">
              <Stack align="center" direction="row" gap="md" justify="between">
                <Badge text="L" tone="info" />
                <Badge text="C" tone="success" />
                <Badge text="R" tone="warning" />
              </Stack>
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
          inherits="HTMLAttributes<HTMLDivElement>"
          items={stackProps}
        />
      </section>
    </div>
  );
}
