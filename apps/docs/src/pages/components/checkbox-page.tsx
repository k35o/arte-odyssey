import { Anchor, Checkbox, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import {
  CheckboxControlledPreview,
  CheckboxGroupControlledPreview,
  CheckboxGroupDisabledPreview,
} from './_previews/checkbox-previews';

const checkboxProps: PropItem[] = [
  { name: 'label', types: ['string'], defaultValue: null },
  { name: 'itemValue', types: ['string'], defaultValue: null },
  { name: 'disabled', types: ['boolean'], defaultValue: 'false' },
  { name: 'value', types: ['boolean'], defaultValue: null },
  {
    name: 'onChange',
    types: ['(checked: boolean) => void'],
    defaultValue: null,
  },
  { name: 'defaultChecked', types: ['boolean'], defaultValue: null },
];

const checkboxGroupProps: PropItem[] = [
  { name: 'name', types: ['string'], defaultValue: null },
  { name: 'aria-labelledby', types: ['string'], defaultValue: null },
  { name: 'aria-describedby', types: ['string'], defaultValue: null },
  { name: 'disabled', types: ['boolean'], defaultValue: 'false' },
  { name: 'invalid', types: ['boolean'], defaultValue: 'false' },
  { name: 'required', types: ['boolean'], defaultValue: 'false' },
  { name: 'value', types: ['string[]'], defaultValue: null },
  {
    name: 'onChange',
    types: ['(value: string[]) => void'],
    defaultValue: null,
  },
  { name: 'defaultValue', types: ['string[]'], defaultValue: null },
];

export function CheckboxPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Heading type="h1">Checkbox</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.checkbox.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-form-checkbox--docs`}
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
          code="import { Checkbox } from '@k8o/arte-odyssey';"
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
          <ComponentPreview code='<Checkbox label="I agree to the terms" />'>
            <Checkbox label="I agree to the terms" />
          </ComponentPreview>
        </div>

        {/* Default Checked */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.checkbox.defaultCheckedTitle" />
          </Heading>
          <ComponentPreview code='<Checkbox defaultChecked label="Checked by default" />'>
            <Checkbox defaultChecked label="Checked by default" />
          </ComponentPreview>
        </div>

        {/* Controlled */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.checkbox.controlledTitle" />
          </Heading>
          <ComponentPreview
            code={`const [checked, setChecked] = useState(false);

<Checkbox
  label="Controlled checkbox"
  onChange={(checked) => setChecked(checked)}
  value={checked}
/>`}
          >
            <CheckboxControlledPreview />
          </ComponentPreview>
        </div>

        {/* Disabled */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.checkbox.disabledTitle" />
          </Heading>
          <ComponentPreview
            code={`<Checkbox disabled label="Unchecked disabled" />
<Checkbox defaultChecked disabled label="Checked disabled" />`}
          >
            <Checkbox disabled label="Unchecked disabled" />
            <Checkbox defaultChecked disabled label="Checked disabled" />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">Group</Heading>
          <ComponentPreview
            code={`<CheckboxGroup name="frameworks" onChange={setValue} value={value}>
  <Checkbox itemValue="react" label="React" />
  <Checkbox itemValue="vue" label="Vue" />
  <Checkbox itemValue="svelte" label="Svelte" />
</CheckboxGroup>`}
          >
            <CheckboxGroupControlledPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">Group Disabled</Heading>
          <ComponentPreview
            code={`<CheckboxGroup defaultValue={['vue']} disabled name="frameworks-disabled">
  <Checkbox itemValue="react" label="React" />
  <Checkbox itemValue="vue" label="Vue" />
  <Checkbox itemValue="svelte" label="Svelte" />
</CheckboxGroup>`}
          >
            <CheckboxGroupDisabledPreview />
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
          inherits="InputHTMLAttributes<HTMLInputElement>"
          items={checkboxProps}
        />
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">CheckboxGroup Props</Heading>
        <PropsTable
          inherits="InputHTMLAttributes<HTMLInputElement>"
          items={checkboxGroupProps}
        />
      </section>
    </div>
  );
}
