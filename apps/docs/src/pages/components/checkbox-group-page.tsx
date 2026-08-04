import {
  Anchor,
  Checkbox,
  CheckboxGroup,
  Heading,
  Separator,
} from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import { CheckboxGroupControlledPreview } from './_previews/checkbox-group-previews';

const checkboxGroupProps: PropItem[] = [
  { name: 'aria-labelledby', types: ['string'], defaultValue: null },
  { name: 'name', types: ['string'], defaultValue: null },
  { name: 'disabled', types: ['boolean'], defaultValue: 'false' },
  { name: 'invalid', types: ['boolean'], defaultValue: 'false' },
  { name: 'value', types: ['string[]'], defaultValue: null },
  {
    name: 'onChange',
    types: ['(value: string[]) => void'],
    defaultValue: null,
  },
  { name: 'defaultValue', types: ['string[]'], defaultValue: null },
  { name: 'ref', types: ['Ref<HTMLFieldSetElement>'], defaultValue: null },
];

export function CheckboxGroupPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">CheckboxGroup</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.checkboxGroup.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-form-checkbox-group--docs`}
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
          code="import { Checkbox, CheckboxGroup } from '@k8o/arte-odyssey';"
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
            code={`const [value, setValue] = useState(['react']);

<p id="frameworks-label">Frameworks</p>
<CheckboxGroup
  aria-labelledby="frameworks-label"
  name="frameworks"
  onChange={setValue}
  value={value}
>
  <Checkbox itemValue="react" label="React" />
  <Checkbox itemValue="vue" label="Vue" />
  <Checkbox itemValue="svelte" label="Svelte" />
</CheckboxGroup>`}
          >
            <CheckboxGroupControlledPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.checkboxGroup.defaultValueTitle" />
          </Heading>
          <ComponentPreview
            code={`<p id="frameworks-default-label">Frameworks</p>
<CheckboxGroup
  aria-labelledby="frameworks-default-label"
  defaultValue={['vue']}
  name="frameworks-default"
>
  <Checkbox itemValue="react" label="React" />
  <Checkbox itemValue="vue" label="Vue" />
  <Checkbox itemValue="svelte" label="Svelte" />
</CheckboxGroup>`}
          >
            <div>
              <p
                className="text-fg-base mb-2 font-medium"
                id="frameworks-default-label"
              >
                Frameworks
              </p>
              <CheckboxGroup
                aria-labelledby="frameworks-default-label"
                defaultValue={['vue']}
                name="frameworks-default"
              >
                <Checkbox itemValue="react" label="React" />
                <Checkbox itemValue="vue" label="Vue" />
                <Checkbox itemValue="svelte" label="Svelte" />
              </CheckboxGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.checkboxGroup.disabledTitle" />
          </Heading>
          <ComponentPreview
            code={`<p id="frameworks-disabled-label">Frameworks</p>
<CheckboxGroup
  aria-labelledby="frameworks-disabled-label"
  defaultValue={['vue']}
  disabled
  name="frameworks-disabled"
>
  <Checkbox itemValue="react" label="React" />
  <Checkbox itemValue="vue" label="Vue" />
  <Checkbox itemValue="svelte" label="Svelte" />
</CheckboxGroup>`}
          >
            <div>
              <p
                className="text-fg-base mb-2 font-medium"
                id="frameworks-disabled-label"
              >
                Frameworks
              </p>
              <CheckboxGroup
                aria-labelledby="frameworks-disabled-label"
                defaultValue={['vue']}
                disabled
                name="frameworks-disabled"
              >
                <Checkbox itemValue="react" label="React" />
                <Checkbox itemValue="vue" label="Vue" />
                <Checkbox itemValue="svelte" label="Svelte" />
              </CheckboxGroup>
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
          items={checkboxGroupProps}
        />
      </section>
    </div>
  );
}
