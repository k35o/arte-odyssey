import { Anchor, Breadcrumb, Heading, Separator } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';

const breadcrumbListProps: PropItem[] = [
  {
    name: 'size',
    types: ["'sm'", "'md'", "'lg'"],
    defaultValue: "'md'",
  },
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

const breadcrumbItemProps: PropItem[] = [
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

const breadcrumbLinkProps: PropItem[] = [
  { name: 'href', types: ['string'], defaultValue: null },
  { name: 'current', types: ['boolean'], defaultValue: 'false' },
  { name: 'component', types: ['FC'], defaultValue: null },
  { name: 'children', types: ['ReactNode'], defaultValue: null },
];

export function BreadcrumbPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">Breadcrumb</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.breadcrumb.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-breadcrumb--docs`}
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
          code="import { Breadcrumb } from '@k8o/arte-odyssey';"
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
            code={`<Breadcrumb.List>
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
    <Breadcrumb.Link current href="/components/breadcrumb">
      Breadcrumb
    </Breadcrumb.Link>
  </Breadcrumb.Item>
</Breadcrumb.List>`}
          >
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link current href="/components/breadcrumb">
                  Breadcrumb
                </Breadcrumb.Link>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.breadcrumb.currentPageTitle" />
          </Heading>
          <ComponentPreview
            code={`<Breadcrumb.List>
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
    <Breadcrumb.Link current href="/components/breadcrumb">
      Breadcrumb
    </Breadcrumb.Link>
  </Breadcrumb.Item>
</Breadcrumb.List>`}
          >
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link current href="/components/breadcrumb">
                  Breadcrumb
                </Breadcrumb.Link>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.breadcrumb.sizesTitle" />
          </Heading>
          <ComponentPreview
            code={`<Breadcrumb.List size="sm">
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
    <Breadcrumb.Link current href="/docs">Docs</Breadcrumb.Link>
  </Breadcrumb.Item>
</Breadcrumb.List>

<Breadcrumb.List size="md">
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
    <Breadcrumb.Link current href="/docs">Docs</Breadcrumb.Link>
  </Breadcrumb.Item>
</Breadcrumb.List>

<Breadcrumb.List size="lg">
  <Breadcrumb.Item>
    <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
  </Breadcrumb.Item>
  <Breadcrumb.Separator />
  <Breadcrumb.Item>
    <Breadcrumb.Link current href="/docs">Docs</Breadcrumb.Link>
  </Breadcrumb.Item>
</Breadcrumb.List>`}
          >
            <div className="flex w-full flex-col gap-4">
              <Breadcrumb.List size="sm">
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link current href="/docs">
                    Docs
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
              <Breadcrumb.List size="md">
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link current href="/docs">
                    Docs
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
              <Breadcrumb.List size="lg">
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link current href="/docs">
                    Docs
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </div>
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <Heading type="h3">Breadcrumb.List</Heading>
        <PropsTable items={breadcrumbListProps} />
        <Heading type="h3">Breadcrumb.Item</Heading>
        <PropsTable items={breadcrumbItemProps} />
        <Heading type="h3">Breadcrumb.Separator</Heading>
        <PropsTable items={[]} />
        <Heading type="h3">Breadcrumb.Link</Heading>
        <PropsTable items={breadcrumbLinkProps} />
      </section>
    </div>
  );
}
