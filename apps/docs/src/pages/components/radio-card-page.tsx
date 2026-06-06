import { Anchor, Heading, RadioCard, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import { RadioCardControlledPreview } from './_previews/radio-card-previews';

const radioCardProps: PropItem[] = [
  { name: 'aria-labelledby', types: ['string'], defaultValue: null },
  { name: 'disabled', types: ['boolean'], defaultValue: 'false' },
  { name: 'invalid', types: ['boolean'], defaultValue: 'false' },
  { name: 'options', types: ['RadioCardOption[]'], defaultValue: null },
  { name: 'value', types: ['string'], defaultValue: null },
  {
    name: 'onChange',
    types: ['(value: string) => void'],
    defaultValue: null,
  },
  { name: 'defaultValue', types: ['string'], defaultValue: null },
];

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
        <Heading type="h1">RadioCard</Heading>
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
        <Heading type="h2">
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
          <Heading type="h2">
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
          <Heading type="h3">
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
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <PropsTable
          inherits="FieldsetHTMLAttributes<HTMLFieldSetElement>"
          items={radioCardProps}
        />
      </section>
    </div>
  );
}
