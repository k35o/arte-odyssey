import { Anchor, Heading, RadioCard, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import { inheritsOf, propsOf } from '../../data/component-props';
import {
  RadioCardControlledPreview,
  RadioCardFormPreview,
} from './_previews/radio-card-previews';

const options = [
  {
    value: 'starter',
    label: 'Starter',
    description: '個人利用や小さなプロトタイプ向けの最小構成です。',
  },
  {
    value: 'pro',
    label: 'Pro',
    description: '継続的な更新と公開運用を前提にした標準構成です。',
  },
  {
    value: 'team',
    label: 'Team',
    description: 'レビューや共同編集を含むチーム利用向けです。',
  },
] as const;

export function RadioCardPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading level="h1">RadioCard</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.radioCard.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-form-radio-card--docs`}
            openInNewTab
          >
            <T k="components.common.storybookLink" />
          </Anchor>
        </div>
      </div>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading level="h2">
          <T k="components.common.importTitle" />
        </Heading>
        <CodeBlock
          code="import { RadioCard } from '@k8o/arte-odyssey';"
          lang="ts"
        />
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Heading level="h2">
            <T k="components.common.usageTitle" />
          </Heading>
          <ComponentPreview
            code={`import { RadioCard } from '@k8o/arte-odyssey';
import { useState } from 'react';

const options = [
  { value: 'starter', label: 'Starter', description: '...' },
  { value: 'pro', label: 'Pro', description: '...' },
  { value: 'team', label: 'Team', description: '...' },
];

const [value, setValue] = useState('pro');

<p id="plan-label">プランを選択</p>
<RadioCard
  disabled={false}
  invalid={false}
  aria-labelledby="plan-label"
  onChange={(value) => setValue(value)}
  options={options}
  value={value}
/>`}
          >
            <RadioCardControlledPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading level="h3">
            <T k="components.radioCard.defaultValueTitle" />
          </Heading>
          <ComponentPreview
            code={`const options = [
  { value: 'starter', label: 'Starter', description: '...' },
  { value: 'pro', label: 'Pro', description: '...' },
  { value: 'team', label: 'Team', description: '...' },
];

<p id="plan-default-label">プランを選択</p>
<RadioCard
  defaultValue="starter"
  disabled={false}
  invalid={false}
  aria-labelledby="plan-default-label"
  options={options}
/>`}
          >
            <div className="w-full max-w-2xl">
              <p
                className="text-fg-base mb-3 font-medium"
                id="plan-default-label"
              >
                プランを選択
              </p>
              <RadioCard
                defaultValue="starter"
                disabled={false}
                invalid={false}
                aria-labelledby="plan-default-label"
                options={options}
              />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading level="h3">
            <T k="components.radioCard.formTitle" />
          </Heading>
          <p className="text-fg-mute text-sm">
            <T k="components.radioCard.formDescription" />
          </p>
          <ComponentPreview
            code={`const [submitted, setSubmitted] = useState<string | null>(null);

<Form
  action={(formData) => {
    const plan = formData.get('plan');
    setSubmitted(typeof plan === 'string' ? plan : null);
  }}
>
  <p id="plan-form-label">プランを選択</p>
  <RadioCard
    defaultValue="pro"
    disabled={false}
    invalid={false}
    aria-labelledby="plan-form-label"
    name="plan"
    options={options}
  />
  <Button type="submit">送信</Button>
</Form>`}
          >
            <RadioCardFormPreview />
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading level="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <PropsTable
          inherits={inheritsOf('RadioCard')}
          items={propsOf('RadioCard')}
        />
      </section>
    </div>
  );
}
