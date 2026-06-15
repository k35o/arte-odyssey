import { Anchor, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import {
  AlertDialogPreview,
  DialogBasicPreview,
  DialogWithModalPreview,
} from './_previews/dialog-previews';

const dialogRootProps: PropItem[] = [
  {
    name: 'role',
    types: ['string'],
    defaultValue: "'dialog'",
  },
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

const dialogHeaderProps: PropItem[] = [
  { name: 'title', types: ['string'], defaultValue: null },
  { name: 'onClose', types: ['() => void'], defaultValue: null },
];

const dialogContentProps: PropItem[] = [
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

export function DialogPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">Dialog</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.dialog.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-dialog--docs`}
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
          code={`import { Dialog } from '@k8o/arte-odyssey';
import { Modal } from '@k8o/arte-odyssey';`}
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
            code={`<Dialog.Root>
  <Dialog.Header onClose={handleClose} title="Dialog Title" />
  <Dialog.Content>Dialog content here</Dialog.Content>
</Dialog.Root>`}
          >
            <DialogBasicPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.common.basicUsageTitle" />
          </Heading>
          <ComponentPreview
            code={`const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>
  Open Dialog
</Button>
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  type="center"
>
  <Dialog.Root>
    <Dialog.Header
      onClose={() => setIsOpen(false)}
      title="Confirmation"
    />
    <Dialog.Content>
      <p>Are you sure you want to proceed?</p>
    </Dialog.Content>
  </Dialog.Root>
</Modal>`}
          >
            <DialogWithModalPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.dialog.alertDialogTitle" />
          </Heading>
          <ComponentPreview
            code={`const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Delete Item</Button>
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  type="center"
>
  <Dialog.Root role="alertdialog">
    <Dialog.Header
      onClose={() => setIsOpen(false)}
      title="Delete Confirmation"
    />
    <Dialog.Content>
      <div className="flex flex-col gap-4">
        <p>
          Are you sure you want to delete this item?
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button
            color="gray"
            onClick={() => setIsOpen(false)}
            variant="outline"
          >
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Delete
          </Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
</Modal>`}
          >
            <AlertDialogPreview />
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <Heading type="h3">Dialog.Root</Heading>
        <PropsTable items={dialogRootProps} />
        <Heading type="h3">Dialog.Header</Heading>
        <PropsTable items={dialogHeaderProps} />
        <Heading type="h3">Dialog.Content</Heading>
        <PropsTable items={dialogContentProps} />
      </section>
    </div>
  );
}
