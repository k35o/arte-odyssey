import { Anchor, Heading, Separator, Switch } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import { SwitchControlledPreview } from './_previews/switch-previews';

const switchProps: PropItem[] = [
  { name: 'aria-describedby', types: ['string'], defaultValue: null },
  { name: 'invalid', types: ['boolean'], defaultValue: 'false' },
  { name: 'disabled', types: ['boolean'], defaultValue: 'false' },
  { name: 'required', types: ['boolean'], defaultValue: 'false' },
  { name: 'label', types: ['string'], defaultValue: null },
  { name: 'value', types: ['boolean'], defaultValue: null },
  {
    name: 'onChange',
    types: ['(checked: boolean) => void'],
    defaultValue: null,
  },
  { name: 'defaultChecked', types: ['boolean'], defaultValue: null },
  { name: 'id', types: ['string'], defaultValue: null },
  { name: 'name', types: ['string'], defaultValue: null },
];

export function SwitchPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">Switch</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.switch.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-form-switch--docs`}
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
          code="import { Switch } from '@k8o/arte-odyssey';"
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
            code={`<Switch
  disabled={false}
  invalid={false}
  required={false}
  label="Email notifications"
/>`}
          >
            <Switch
              disabled={false}
              invalid={false}
              required={false}
              label="Email notifications"
            />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.switch.defaultCheckedTitle" />
          </Heading>
          <ComponentPreview
            code={`<Switch
  defaultChecked
  disabled={false}
  invalid={false}
  required={false}
  label="Automatic backups"
/>`}
          >
            <Switch
              defaultChecked
              disabled={false}
              invalid={false}
              required={false}
              label="Automatic backups"
            />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.switch.controlledTitle" />
          </Heading>
          <ComponentPreview
            code={`const [value, setValue] = useState(false);

<Switch
  disabled={false}
  invalid={false}
  required={false}
  label="Controlled switch"
  onChange={(checked) => setValue(checked)}
  value={value}
/>`}
          >
            <SwitchControlledPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.switch.disabledTitle" />
          </Heading>
          <ComponentPreview
            code={`<Switch disabled invalid={false} required={false} label="Airplane mode" />
<Switch defaultChecked disabled invalid={false} required={false} label="Offline sync" />`}
          >
            <Switch
              disabled
              invalid={false}
              required={false}
              label="Airplane mode"
            />
            <Switch
              defaultChecked
              disabled
              invalid={false}
              required={false}
              label="Offline sync"
            />
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
          items={switchProps}
        />
      </section>
    </div>
  );
}
