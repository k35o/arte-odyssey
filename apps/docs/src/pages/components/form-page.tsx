import { Anchor, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';
import { propsOf } from '../../data/component-props';
import {
  FormActionStatePreview,
  FormBasicPreview,
} from './_previews/form-previews';

export function FormPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">Form</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.form.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-form-form--docs`}
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
        <CodeBlock code="import { Form } from '@k8o/arte-odyssey';" lang="ts" />
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Heading type="h2">
            <T k="components.common.usageTitle" />
          </Heading>
          <ComponentPreview
            code={`<Form
  action={async (formData) => {
    const name = formData.get('name');
    await save(name);
  }}
>
  <FormControl
    label="お名前"
    renderInput={(props) => <TextField {...props} name="name" />}
  />
  <Button type="submit">送信</Button>
</Form>`}
          >
            <FormBasicPreview />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.form.actionStateTitle" />
          </Heading>
          <ComponentPreview
            code={`const [message, formAction] = useActionState(
  async (_prev, formData) => {
    const name = formData.get('name');
    await sleep(1000);
    return \`こんにちは、\${name}さん\`;
  },
  '',
);

return (
  <Form action={formAction}>
    <FormControl
      label="お名前"
      renderInput={(props) => <TextField {...props} name="name" />}
    />
    <Button type="submit">送信</Button>
    <p>{message}</p>
  </Form>
);`}
          >
            <FormActionStatePreview />
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <PropsTable items={propsOf('Form')} />
      </section>
    </div>
  );
}
