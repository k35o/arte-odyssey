import { Anchor, BaselineStatus, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';

const baselineStatusProps: PropItem[] = [
  { name: 'featureId', types: ['string'], defaultValue: null },
];

export function BaselineStatusPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">BaselineStatus</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.baselineStatus.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-baseline-status--docs`}
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
          code="import { BaselineStatus } from '@k8o/arte-odyssey';"
          lang="ts"
        />
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Heading type="h2">
            <T k="components.common.usageTitle" />
          </Heading>
          <ComponentPreview code='<BaselineStatus featureId="container-queries" />'>
            <div className="w-full">
              <BaselineStatus featureId="container-queries" />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.baselineStatus.differentFeaturesTitle" />
          </Heading>
          <ComponentPreview
            code={`<BaselineStatus featureId="subgrid" />
<BaselineStatus featureId="has-selector" />
<BaselineStatus featureId="anchor-positioning" />`}
          >
            <div className="flex w-full flex-col gap-4">
              <BaselineStatus featureId="subgrid" />
              <BaselineStatus featureId="has-selector" />
              <BaselineStatus featureId="anchor-positioning" />
            </div>
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <PropsTable items={baselineStatusProps} />
      </section>
    </div>
  );
}
