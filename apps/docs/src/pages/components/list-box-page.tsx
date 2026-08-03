import { Anchor, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import {
  ListBoxBasicPreview,
  ListBoxIconTriggerPreview,
  ListBoxSizesPreview,
} from './_previews/list-box-previews';

const listBoxRootProps: PropItem[] = [
  {
    name: 'placement',
    types: ['Placement'],
    defaultValue: "'bottom'",
  },
  { name: 'options', types: ['readonly Option[]'], defaultValue: null },
  { name: 'value', types: ['string', 'undefined'], defaultValue: null },
  {
    name: 'onChange',
    types: ['(value: string) => void'],
    defaultValue: null,
  },
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

const listBoxTriggerProps: PropItem[] = [
  {
    name: 'size',
    types: ["'sm'", "'md'", "'lg'"],
    defaultValue: "'md'",
  },
  { name: 'label', types: ['string'], defaultValue: null },
];

const listBoxIconTriggerProps: PropItem[] = [
  {
    name: 'size',
    types: ["'sm'", "'md'", "'lg'"],
    defaultValue: "'md'",
  },
  { name: 'icon', types: ['ReactElement'], defaultValue: null },
  { name: 'label', types: ['string'], defaultValue: null },
];

const listBoxContentProps: PropItem[] = [
  { name: 'helpContent', types: ['ReactElement'], defaultValue: null },
];

export function ListBoxPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">ListBox</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.listBox.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-list-box--docs`}
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
          code="import { ListBox } from '@k8o/arte-odyssey';"
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
            code={`const OPTIONS: readonly Option[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'melon', label: 'Melon' },
];

const [selected, setSelected] = useState<string>();

<ListBox.Root
  onChange={(value) => setSelected(value)}
  options={OPTIONS}
  value={selected}
>
  <ListBox.Trigger label="Fruit" />
  <ListBox.Content />
</ListBox.Root>`}
          >
            <ListBoxBasicPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.listBox.sizesTitle" />
          </Heading>
          <ComponentPreview
            code={`<ListBox.Root onChange={onChange} options={OPTIONS} value={value}>
  <ListBox.Trigger label="Fruit (sm)" size="sm" />
  <ListBox.Content />
</ListBox.Root>

<ListBox.Root onChange={onChange} options={OPTIONS} value={value}>
  <ListBox.Trigger label="Fruit (md)" size="md" />
  <ListBox.Content />
</ListBox.Root>

<ListBox.Root onChange={onChange} options={OPTIONS} value={value}>
  <ListBox.Trigger label="Fruit (lg)" size="lg" />
  <ListBox.Content />
</ListBox.Root>`}
          >
            <ListBoxSizesPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.listBox.iconTriggerTitle" />
          </Heading>
          <ComponentPreview
            code={`import { ListIcon } from '@k8o/arte-odyssey';

<ListBox.Root onChange={onChange} options={OPTIONS} value={value}>
  <ListBox.IconTrigger icon={<ListIcon />} label="Fruit" />
  <ListBox.Content />
</ListBox.Root>`}
          >
            <ListBoxIconTriggerPreview />
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <Heading type="h3">ListBox.Root</Heading>
        <PropsTable items={listBoxRootProps} />
        <Heading type="h3">ListBox.Trigger</Heading>
        <PropsTable items={listBoxTriggerProps} />
        <Heading type="h3">ListBox.IconTrigger</Heading>
        <PropsTable items={listBoxIconTriggerProps} />
        <Heading type="h3">ListBox.Content</Heading>
        <PropsTable items={listBoxContentProps} />
      </section>
    </div>
  );
}
