import { Anchor, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import {
  DefaultOpenPreview,
  ModalBasicPreview,
  ModalTypesPreview,
} from './_previews/modal-previews';

const modalProps: PropItem[] = [
  {
    name: 'placement',
    types: ["'center'", "'bottom'", "'right'", "'left'"],
    defaultValue: "'center'",
  },
  { name: 'defaultOpen', types: ['boolean'], defaultValue: null },
  { name: 'isOpen', types: ['boolean'], defaultValue: null },
  { name: 'onClose', types: ['() => void'], defaultValue: null },
  { name: 'aria-label', types: ['string'], defaultValue: null },
  { name: 'aria-labelledby', types: ['string'], defaultValue: null },
  { name: 'aria-describedby', types: ['string'], defaultValue: null },
  {
    name: 'ref',
    types: ['RefObject<HTMLDialogElement | null>'],
    defaultValue: null,
  },
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

export function ModalPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">Modal</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.modal.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-modal--docs`}
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
          code="import { Modal } from '@k8o/arte-odyssey';"
          lang="ts"
        />
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Heading type="h2">
            <T k="components.common.usageTitle" />
          </Heading>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.common.basicUsageTitle" />
          </Heading>
          <ComponentPreview
            code={`const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>
  Open Modal
</Button>
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  placement="center"
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
            <ModalBasicPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.modal.typesTitle" />
          </Heading>
          <ComponentPreview
            code={`<Button onClick={() => setCenterOpen(true)}>Center</Button>
<Button onClick={() => setBottomOpen(true)}>Bottom</Button>
<Button onClick={() => setRightOpen(true)}>Right</Button>

<Modal isOpen={centerOpen} onClose={() => setCenterOpen(false)} placement="center">
  <Dialog.Root>
    <Dialog.Header onClose={() => setCenterOpen(false)} title="Center Modal" />
    <Dialog.Content>Centered on screen</Dialog.Content>
  </Dialog.Root>
</Modal>

<Modal isOpen={bottomOpen} onClose={() => setBottomOpen(false)} placement="bottom">
  <Dialog.Root>
    <Dialog.Header onClose={() => setBottomOpen(false)} title="Bottom Modal" />
    <Dialog.Content>Slides up from bottom</Dialog.Content>
  </Dialog.Root>
</Modal>

<Modal isOpen={rightOpen} onClose={() => setRightOpen(false)} placement="right">
  <Dialog.Root>
    <Dialog.Header onClose={() => setRightOpen(false)} title="Right Modal" />
    <Dialog.Content>Slides in from right</Dialog.Content>
  </Dialog.Root>
</Modal>`}
          >
            <ModalTypesPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.modal.defaultOpenTitle" />
          </Heading>
          <ComponentPreview
            code={`<Modal defaultOpen placement="center">
  <Dialog.Root>
    <Dialog.Header
      onClose={() => {}}
      title="Default Open Modal"
    />
    <Dialog.Content>
      <p>This modal is open by default.</p>
    </Dialog.Content>
  </Dialog.Root>
</Modal>`}
          >
            <DefaultOpenPreview />
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <PropsTable items={modalProps} />
      </section>
    </div>
  );
}
