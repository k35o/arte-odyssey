import { Anchor, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import {
  ToastBasicPreview,
  ToastCloseAllPreview,
} from './_previews/toast-previews';

const toastProviderProps: PropItem[] = [
  {
    name: 'portalRef',
    types: ['RefObject<HTMLElement | null>'],
    defaultValue: null,
  },
  {
    name: 'position',
    types: ["'fixed'", "'absolute'"],
    defaultValue: "'fixed'",
  },
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

const useToastReturnProps: PropItem[] = [
  {
    name: 'onOpen',
    types: ['(status: Status, message: string) => void'],
    defaultValue: null,
  },
  {
    name: 'onClose',
    types: ['(id: string) => void'],
    defaultValue: null,
  },
  {
    name: 'onCloseAll',
    types: ['() => void'],
    defaultValue: null,
  },
];

export function ToastPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">Toast</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.toast.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-toast--docs`}
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
          code="import { ToastProvider, useToast } from '@k8o/arte-odyssey';"
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
            code={`<ToastProvider>
  <ToastDemo />
</ToastProvider>

function ToastDemo() {
  const { onOpen } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => onOpen('success', 'Operation completed')}>
        Success
      </Button>
      <Button onClick={() => onOpen('info', 'Here is some information')}>
        Info
      </Button>
      <Button onClick={() => onOpen('warning', 'Please check your input')}>
        Warning
      </Button>
      <Button onClick={() => onOpen('error', 'Something went wrong')}>
        Error
      </Button>
    </div>
  );
}`}
          >
            <ToastBasicPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.toast.useToastTitle" />
          </Heading>
          <CodeBlock
            code={`const { onOpen, onClose, onCloseAll } = useToast();

// Show a toast
onOpen('success', 'Saved successfully');

// Close a specific toast by ID
onClose(toastId);

// Close all toasts
onCloseAll();`}
            lang="tsx"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.toast.closeAllTitle" />
          </Heading>
          <ComponentPreview
            code={`function CloseAllDemo() {
  const { onOpen, onCloseAll } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => onOpen('info', 'Notification 1')}>
        Add Toast
      </Button>
      <Button onClick={() => onOpen('success', 'Notification 2')}>
        Add Another
      </Button>
      <Button onClick={onCloseAll}>Close All</Button>
    </div>
  );
}`}
          >
            <ToastCloseAllPreview />
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <Heading type="h3">ToastProvider</Heading>
        <PropsTable items={toastProviderProps} />
        <Heading type="h3">useToast</Heading>
        <PropsTable items={useToastReturnProps} />
      </section>
    </div>
  );
}
