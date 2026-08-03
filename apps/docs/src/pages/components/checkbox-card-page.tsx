import { Anchor, CheckboxCard, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import { CheckboxCardControlledPreview } from './_previews/checkbox-card-previews';

const checkboxCardProps: PropItem[] = [
  { name: 'aria-labelledby', types: ['string'], defaultValue: null },
  { name: 'disabled', types: ['boolean'], defaultValue: 'false' },
  { name: 'invalid', types: ['boolean'], defaultValue: 'false' },
  { name: 'options', types: ['CheckboxCardOption[]'], defaultValue: null },
  { name: 'value', types: ['string[]'], defaultValue: null },
  {
    name: 'onChange',
    types: ['(value: string[]) => void'],
    defaultValue: null,
  },
  { name: 'defaultValue', types: ['string[]'], defaultValue: null },
  { name: 'ref', types: ['Ref<HTMLFieldSetElement>'], defaultValue: null },
];

const options = [
  {
    value: 'history',
    label: 'Version history',
    description: '変更履歴を保存して必要な時に差し戻せます。',
  },
  {
    value: 'comments',
    label: 'Inline comments',
    description: '各セクションに直接フィードバックを残せます。',
  },
  {
    value: 'share',
    label: 'Share links',
    description: '閲覧専用の共有リンクをすぐに発行できます。',
  },
] as const;

export function CheckboxCardPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">CheckboxCard</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.checkboxCard.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-form-checkbox-card--docs`}
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
          code="import { CheckboxCard } from '@k8o/arte-odyssey';"
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
            code={`import { CheckboxCard } from '@k8o/arte-odyssey';
import { useState } from 'react';

const options = [
  {
    value: 'history',
    label: 'Version history',
    description: '変更履歴を保存して必要な時に差し戻せます。',
  },
  {
    value: 'comments',
    label: 'Inline comments',
    description: '各セクションに直接フィードバックを残せます。',
  },
  {
    value: 'share',
    label: 'Share links',
    description: '閲覧専用の共有リンクをすぐに発行できます。',
  },
];

const [value, setValue] = useState(['comments']);

<p id="features-label">有効にする機能を選択</p>
<CheckboxCard
  disabled={false}
  invalid={false}
  aria-labelledby="features-label"
  onChange={setValue}
  options={options}
  value={value}
/>`}
          >
            <CheckboxCardControlledPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.checkboxCard.defaultValueTitle" />
          </Heading>
          <ComponentPreview
            code={`const options = [
  {
    value: 'history',
    label: 'Version history',
    description: '変更履歴を保存して必要な時に差し戻せます。',
  },
  {
    value: 'comments',
    label: 'Inline comments',
    description: '各セクションに直接フィードバックを残せます。',
  },
  {
    value: 'share',
    label: 'Share links',
    description: '閲覧専用の共有リンクをすぐに発行できます。',
  },
];

<p id="features-default-label">有効にする機能を選択</p>
<CheckboxCard
  defaultValue={['history', 'share']}
  disabled={false}
  invalid={false}
  aria-labelledby="features-default-label"
  options={options}
/>`}
          >
            <div className="w-full max-w-2xl">
              <p
                className="text-fg-base mb-3 font-medium"
                id="features-default-label"
              >
                有効にする機能を選択
              </p>
              <CheckboxCard
                defaultValue={['history', 'share']}
                disabled={false}
                invalid={false}
                aria-labelledby="features-default-label"
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
          items={checkboxCardProps}
        />
      </section>
    </div>
  );
}
