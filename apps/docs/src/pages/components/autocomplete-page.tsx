import { Anchor, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import {
  AutocompleteBasicPreview,
  AutocompleteDisabledPreview,
  AutocompleteInvalidPreview,
  AutocompleteMultiplePreview,
  AutocompleteRequiredPreview,
} from './_previews/autocomplete-previews';

const autocompleteProps: PropItem[] = [
  { name: 'id', types: ['string'], defaultValue: null },
  {
    name: 'aria-describedby',
    types: ['string | undefined'],
    defaultValue: null,
  },
  { name: 'invalid', types: ['boolean'], defaultValue: null },
  { name: 'disabled', types: ['boolean'], defaultValue: null },
  { name: 'required', types: ['boolean'], defaultValue: null },
  { name: 'options', types: ['Option[]'], defaultValue: null },
  { name: 'value', types: ['string[]'], defaultValue: null },
  {
    name: 'onChange',
    types: ['(value: string[]) => void'],
    defaultValue: null,
  },
  { name: 'defaultValue', types: ['string[]'], defaultValue: null },
];

export function AutocompletePage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">Autocomplete</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.autocomplete.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-form-autocomplete--docs`}
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
          code="import { Autocomplete } from '@k8o/arte-odyssey';"
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
            code={`const [value, setValue] = useState<string[]>([]);

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grape', value: 'grape' },
  { label: 'Orange', value: 'orange' },
];

<Autocomplete
  id="autocomplete-basic"
  aria-describedby={undefined}
  disabled={false}
  invalid={false}
  required={false}
  onChange={setValue}
  options={options}
  value={value}
/>`}
          >
            <AutocompleteBasicPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.autocomplete.requiredTitle" />
          </Heading>
          <ComponentPreview
            code={`<Autocomplete
  id="autocomplete-required"
  aria-describedby={undefined}
  disabled={false}
  invalid={false}
  required
  onChange={setValue}
  options={options}
  value={value}
/>`}
          >
            <AutocompleteRequiredPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.autocomplete.multipleSelectionTitle" />
          </Heading>
          <ComponentPreview
            code={`const [value, setValue] = useState<string[]>(['apple', 'cherry']);

<Autocomplete
  id="autocomplete-multiple"
  aria-describedby={undefined}
  disabled={false}
  invalid={false}
  required={false}
  onChange={setValue}
  options={options}
  value={value}
/>`}
          >
            <AutocompleteMultiplePreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.autocomplete.disabledTitle" />
          </Heading>
          <ComponentPreview
            code={`<Autocomplete
  id="autocomplete-disabled"
  aria-describedby={undefined}
  disabled
  invalid={false}
  required={false}
  onChange={setValue}
  options={options}
  value={['apple']}
/>`}
          >
            <AutocompleteDisabledPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.autocomplete.invalidTitle" />
          </Heading>
          <ComponentPreview
            code={`<Autocomplete
  id="autocomplete-invalid"
  aria-describedby={undefined}
  disabled={false}
  invalid
  required={false}
  onChange={setValue}
  options={options}
  value={value}
/>`}
          >
            <AutocompleteInvalidPreview />
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <PropsTable
          inherits="InputHTMLAttributes<HTMLInputElement>"
          items={autocompleteProps}
        />
      </section>
    </div>
  );
}
