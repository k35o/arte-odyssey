import { Anchor, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import {
  TooltipBasicPreview,
  TooltipPlacementPreview,
} from './_previews/tooltip-previews';

const tooltipRootProps: PropItem[] = [
  {
    name: 'placement',
    types: ['Placement'],
    defaultValue: "'bottom-start'",
  },
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

const tooltipTriggerProps: PropItem[] = [
  {
    name: 'renderItem',
    types: ['(props: Record<string, unknown>) => ReactElement'],
    defaultValue: null,
  },
];

const tooltipContentProps: PropItem[] = [
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

export function TooltipPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">Tooltip</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.tooltip.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-tooltip--docs`}
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
          code="import { Tooltip } from '@k8o/arte-odyssey';"
          lang="ts"
        />
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Heading type="h2">
            <T k="components.common.usageTitle" />
          </Heading>
          <ComponentPreview
            code={`<Tooltip.Root placement="bottom-start">
  <Tooltip.Trigger
    renderItem={(props) => (
      <Button type="button" {...props}>
        Hover me
      </Button>
    )}
  />
  <Tooltip.Content>
    <p>Supplementary information</p>
  </Tooltip.Content>
</Tooltip.Root>`}
          >
            <TooltipBasicPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.tooltip.placementTitle" />
          </Heading>
          <ComponentPreview
            code={`<Tooltip.Root placement="top">
  <Tooltip.Trigger
    renderItem={(props) => (
      <Button type="button" {...props}>Top</Button>
    )}
  />
  <Tooltip.Content>
    <p>Top tooltip</p>
  </Tooltip.Content>
</Tooltip.Root>

<Tooltip.Root placement="right">
  <Tooltip.Trigger
    renderItem={(props) => (
      <Button type="button" {...props}>Right</Button>
    )}
  />
  <Tooltip.Content>
    <p>Right tooltip</p>
  </Tooltip.Content>
</Tooltip.Root>

<Tooltip.Root placement="bottom">
  <Tooltip.Trigger
    renderItem={(props) => (
      <Button type="button" {...props}>Bottom</Button>
    )}
  />
  <Tooltip.Content>
    <p>Bottom tooltip</p>
  </Tooltip.Content>
</Tooltip.Root>

<Tooltip.Root placement="left">
  <Tooltip.Trigger
    renderItem={(props) => (
      <Button type="button" {...props}>Left</Button>
    )}
  />
  <Tooltip.Content>
    <p>Left tooltip</p>
  </Tooltip.Content>
</Tooltip.Root>`}
          >
            <TooltipPlacementPreview />
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <Heading type="h3">Tooltip.Root</Heading>
        <PropsTable items={tooltipRootProps} />
        <Heading type="h3">Tooltip.Trigger</Heading>
        <PropsTable items={tooltipTriggerProps} />
        <Heading type="h3">Tooltip.Content</Heading>
        <PropsTable items={tooltipContentProps} />
      </section>
    </div>
  );
}
