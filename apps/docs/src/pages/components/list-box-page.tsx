import { Anchor, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import {
  ListBoxBasicPreview,
  ListBoxSizesPreview,
  ListBoxTriggerIconPreview,
} from './_previews/list-box-previews';

const listBoxRootProps: PropItem[] = [
  {
    name: 'placement',
    types: ['Placement'],
    defaultValue: "'bottom'",
  },
  { name: 'options', types: ['Option[]'], defaultValue: null },
  { name: 'value', types: ['string', 'undefined'], defaultValue: null },
  {
    name: 'onChange',
    types: ['(key: string) => void'],
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
];

const listBoxTriggerIconProps: PropItem[] = [
  {
    name: 'size',
    types: ["'sm'", "'md'", "'lg'"],
    defaultValue: "'md'",
  },
  { name: 'icon', types: ['ReactElement'], defaultValue: null },
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
            code={`const OPTIONS = [
  { key: 'apple', label: 'Apple' },
  { key: 'banana', label: 'Banana' },
  { key: 'cherry', label: 'Cherry' },
  { key: 'grape', label: 'Grape' },
  { key: 'melon', label: 'Melon' },
];

const [selected, setSelected] = useState<string>();

<ListBox.Root
  onChange={(key) => setSelected(key)}
  options={OPTIONS}
  value={selected}
>
  <ListBox.Trigger />
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
  <ListBox.Trigger size="sm" />
  <ListBox.Content />
</ListBox.Root>

<ListBox.Root onChange={onChange} options={OPTIONS} value={value}>
  <ListBox.Trigger size="md" />
  <ListBox.Content />
</ListBox.Root>

<ListBox.Root onChange={onChange} options={OPTIONS} value={value}>
  <ListBox.Trigger size="lg" />
  <ListBox.Content />
</ListBox.Root>`}
          >
            <ListBoxSizesPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.listBox.triggerIconTitle" />
          </Heading>
          <ComponentPreview
            code={`import { ListIcon } from '@k8o/arte-odyssey';

<ListBox.Root onChange={onChange} options={OPTIONS} value={value}>
  <ListBox.TriggerIcon icon={<ListIcon />} />
  <ListBox.Content />
</ListBox.Root>`}
          >
            <ListBoxTriggerIconPreview />
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
        <Heading type="h3">ListBox.TriggerIcon</Heading>
        <PropsTable items={listBoxTriggerIconProps} />
        <Heading type="h3">ListBox.Content</Heading>
        <PropsTable items={listBoxContentProps} />
      </section>
    </div>
  );
}
