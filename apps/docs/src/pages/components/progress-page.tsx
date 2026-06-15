import { Anchor, Heading, Progress, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';

const progressProps: PropItem[] = [
  { name: 'progress', types: ['number'], defaultValue: null },
  { name: 'maxProgress', types: ['number'], defaultValue: null },
  { name: 'minProgress', types: ['number'], defaultValue: '0' },
  { name: 'label', types: ['string'], defaultValue: null },
];

export function ProgressPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">Progress</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.progress.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-progress--docs`}
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
          code="import { Progress } from '@k8o/arte-odyssey';"
          lang="ts"
        />
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Heading type="h2">
            <T k="components.common.usageTitle" />
          </Heading>
          <ComponentPreview code="<Progress maxProgress={100} progress={60} />">
            <div className="w-full">
              <Progress maxProgress={100} progress={60} />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.progress.differentValuesTitle" />
          </Heading>
          <ComponentPreview
            code={`<Progress maxProgress={100} progress={20} />
<Progress maxProgress={100} progress={50} />
<Progress maxProgress={100} progress={80} />
<Progress maxProgress={100} progress={100} />`}
          >
            <div className="flex w-full flex-col gap-4">
              <Progress maxProgress={100} progress={20} />
              <Progress maxProgress={100} progress={50} />
              <Progress maxProgress={100} progress={80} />
              <Progress maxProgress={100} progress={100} />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.progress.withLabelTitle" />
          </Heading>
          <ComponentPreview
            code={`<Progress
  label="Upload progress"
  maxProgress={100}
  progress={75}
/>`}
          >
            <div className="w-full">
              <Progress
                label="Upload progress"
                maxProgress={100}
                progress={75}
              />
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
          inherits="HTMLAttributes<HTMLDivElement>"
          items={progressProps}
        />
      </section>
    </div>
  );
}
