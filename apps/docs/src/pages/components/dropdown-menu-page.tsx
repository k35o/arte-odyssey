import { Anchor, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import {
  DropdownMenuBasicPreview,
  DropdownMenuIconTriggerPreview,
  DropdownMenuPlacementPreview,
  DropdownMenuSizesPreview,
} from './_previews/dropdown-menu-previews';

const dropdownMenuRootProps: PropItem[] = [
  {
    name: 'placement',
    types: ['Placement'],
    defaultValue: "'bottom-start'",
  },
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

const dropdownMenuTriggerProps: PropItem[] = [
  { name: 'text', types: ['string'], defaultValue: null },
  {
    name: 'size',
    types: ["'sm'", "'md'", "'lg'"],
    defaultValue: "'md'",
  },
  {
    name: 'variant',
    types: ["'solid'", "'outline'", "'skeleton'"],
    defaultValue: "'solid'",
  },
];

const dropdownMenuIconTriggerProps: PropItem[] = [
  { name: 'icon', types: ['ReactNode'], defaultValue: null },
  { name: 'label', types: ['string'], defaultValue: null },
];

const dropdownMenuContentProps: PropItem[] = [
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

const dropdownMenuItemProps: PropItem[] = [
  { name: 'label', types: ['string'], defaultValue: null },
  { name: 'onClick', types: ['MouseEventHandler'], defaultValue: null },
];

export function DropdownMenuPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Heading type="h1">DropdownMenu</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.dropdownMenu.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-dropdown-menu--docs`}
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
          code="import { DropdownMenu } from '@k8o/arte-odyssey';"
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
          <ComponentPreview
            code={`<DropdownMenu.Root>
  <DropdownMenu.Trigger text="Actions" />
  <DropdownMenu.Content>
    <DropdownMenu.Item label="Edit" onClick={() => {}} />
    <DropdownMenu.Item label="Duplicate" onClick={() => {}} />
    <DropdownMenu.Item label="Delete" onClick={() => {}} />
  </DropdownMenu.Content>
</DropdownMenu.Root>`}
          >
            <DropdownMenuBasicPreview />
          </ComponentPreview>
        </div>

        {/* With IconTrigger */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.dropdownMenu.iconTriggerTitle" />
          </Heading>
          <ComponentPreview
            code={`import { DarkModeIcon } from '@k8o/arte-odyssey';

<DropdownMenu.Root>
  <DropdownMenu.IconTrigger
    icon={<DarkModeIcon size="lg" />}
    label="Theme"
  />
  <DropdownMenu.Content>
    <DropdownMenu.Item label="Light" onClick={() => {}} />
    <DropdownMenu.Item label="Dark" onClick={() => {}} />
    <DropdownMenu.Item label="System" onClick={() => {}} />
  </DropdownMenu.Content>
</DropdownMenu.Root>`}
          >
            <DropdownMenuIconTriggerPreview />
          </ComponentPreview>
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.dropdownMenu.sizesTitle" />
          </Heading>
          <ComponentPreview
            code={`<DropdownMenu.Root>
  <DropdownMenu.Trigger size="sm" text="Small" />
  <DropdownMenu.Content>
    <DropdownMenu.Item label="Edit" onClick={() => {}} />
    <DropdownMenu.Item label="Delete" onClick={() => {}} />
  </DropdownMenu.Content>
</DropdownMenu.Root>

<DropdownMenu.Root>
  <DropdownMenu.Trigger size="md" text="Medium" />
  <DropdownMenu.Content>
    <DropdownMenu.Item label="Edit" onClick={() => {}} />
    <DropdownMenu.Item label="Delete" onClick={() => {}} />
  </DropdownMenu.Content>
</DropdownMenu.Root>

<DropdownMenu.Root>
  <DropdownMenu.Trigger size="lg" text="Large" />
  <DropdownMenu.Content>
    <DropdownMenu.Item label="Edit" onClick={() => {}} />
    <DropdownMenu.Item label="Delete" onClick={() => {}} />
  </DropdownMenu.Content>
</DropdownMenu.Root>`}
          >
            <DropdownMenuSizesPreview />
          </ComponentPreview>
        </div>

        {/* Placement */}
        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.dropdownMenu.placementTitle" />
          </Heading>
          <ComponentPreview
            code={`<DropdownMenu.Root placement="bottom-start">
  <DropdownMenu.Trigger text="Bottom Start" />
  <DropdownMenu.Content>
    <DropdownMenu.Item label="Edit" onClick={() => {}} />
    <DropdownMenu.Item label="Delete" onClick={() => {}} />
  </DropdownMenu.Content>
</DropdownMenu.Root>

<DropdownMenu.Root placement="bottom-end">
  <DropdownMenu.Trigger text="Bottom End" />
  <DropdownMenu.Content>
    <DropdownMenu.Item label="Edit" onClick={() => {}} />
    <DropdownMenu.Item label="Delete" onClick={() => {}} />
  </DropdownMenu.Content>
</DropdownMenu.Root>

<DropdownMenu.Root placement="top-start">
  <DropdownMenu.Trigger text="Top Start" />
  <DropdownMenu.Content>
    <DropdownMenu.Item label="Edit" onClick={() => {}} />
    <DropdownMenu.Item label="Delete" onClick={() => {}} />
  </DropdownMenu.Content>
</DropdownMenu.Root>`}
          >
            <DropdownMenuPlacementPreview />
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      {/* Props */}
      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <Heading type="h3">DropdownMenu.Root</Heading>
        <PropsTable items={dropdownMenuRootProps} />
        <Heading type="h3">DropdownMenu.Trigger</Heading>
        <PropsTable items={dropdownMenuTriggerProps} />
        <Heading type="h3">DropdownMenu.IconTrigger</Heading>
        <PropsTable items={dropdownMenuIconTriggerProps} />
        <Heading type="h3">DropdownMenu.Content</Heading>
        <PropsTable items={dropdownMenuContentProps} />
        <Heading type="h3">DropdownMenu.Item</Heading>
        <PropsTable items={dropdownMenuItemProps} />
      </section>
    </div>
  );
}
