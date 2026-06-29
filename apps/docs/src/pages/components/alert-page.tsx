import { Alert, Anchor, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import {
  AlertDismissiblePreview,
  AlertWithActionPreview,
} from './_previews/alert-previews';

const alertProps: PropItem[] = [
  {
    name: 'tone',
    types: ["'success'", "'info'", "'warning'", "'error'"],
    defaultValue: null,
  },
  {
    name: 'message',
    types: ['string', 'string[]'],
    defaultValue: null,
  },
  {
    name: 'action',
    types: ['{ label: string; renderItem: (props) => ReactNode }'],
    defaultValue: null,
  },
  {
    name: 'onClose',
    types: ['() => void'],
    defaultValue: null,
  },
  {
    name: 'closeLabel',
    types: ['string'],
    defaultValue: "'閉じる'",
  },
];

export function AlertPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">Alert</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.alert.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-alert--docs`}
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
          code="import { Alert } from '@k8o/arte-odyssey';"
          lang="ts"
        />
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Heading type="h2">
            <T k="components.common.usageTitle" />
          </Heading>
          <ComponentPreview code='<Alert message="This is an info alert." tone="info" />'>
            <Alert message="This is an info alert." tone="info" />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.alert.statusesTitle" />
          </Heading>
          <ComponentPreview
            code={`<Alert message="Operation completed successfully." tone="success" />
<Alert message="Here is some useful information." tone="info" />
<Alert message="Please proceed with caution." tone="warning" />
<Alert message="Something went wrong." tone="error" />`}
          >
            <Alert message="Operation completed successfully." tone="success" />
            <Alert message="Here is some useful information." tone="info" />
            <Alert message="Please proceed with caution." tone="warning" />
            <Alert message="Something went wrong." tone="error" />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.alert.multipleMessagesTitle" />
          </Heading>
          <ComponentPreview
            code={`<Alert
  message={[
    "Password must be at least 8 characters.",
    "Password must include a number.",
    "Password must include a special character.",
  ]}
  tone="error"
/>`}
          >
            <Alert
              message={[
                'Password must be at least 8 characters.',
                'Password must include a number.',
                'Password must include a special character.',
              ]}
              tone="error"
            />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.alert.dismissibleTitle" />
          </Heading>
          <ComponentPreview
            code={`const [isVisible, setIsVisible] = useState(true);

<Alert
  message="..."
  onClose={() => setIsVisible(false)}
  tone="warning"
/>`}
          >
            <AlertDismissiblePreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.alert.actionTitle" />
          </Heading>
          <ComponentPreview
            code={`<Alert
  action={{
    label: '詳しくはこちら',
    renderItem: ({ children }) => (
      <button
        className="text-primary-fg cursor-pointer underline underline-offset-2"
        onClick={openHelp}
        type="button"
      >
        {children}
      </button>
    ),
  }}
  message="..."
  onClose={dismiss}
  tone="warning"
/>`}
          >
            <AlertWithActionPreview />
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <PropsTable
          inherits="HTMLAttributes<HTMLDivElement>"
          items={alertProps}
        />
      </section>
    </div>
  );
}
