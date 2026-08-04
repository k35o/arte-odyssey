import { Anchor, Badge, Heading, Separator, Table } from '@k8o/arte-odyssey';

import { CodeBlock } from '../../components/code-block';
import { ComponentPreview } from '../../components/component-preview';
import type { PropItem } from '../../components/props-table';
import { PropsTable } from '../../components/props-table';
import { T } from '../../components/t';
import { STORYBOOK_URL } from '../../constants';

const tableRootProps: PropItem[] = [
  { name: 'children', types: ['ReactNode'], defaultValue: null },
  { name: 'className', types: ['string'], defaultValue: null },
  { name: 'containerClassName', types: ['string'], defaultValue: null },
];

const tableRowProps: PropItem[] = [
  { name: 'children', types: ['ReactNode'], defaultValue: null },
  { name: 'interactive', types: ['boolean'], defaultValue: 'false' },
  { name: 'className', types: ['string'], defaultValue: null },
];

const tableCellProps: PropItem[] = [
  { name: 'children', types: ['ReactNode'], defaultValue: null },
  {
    name: 'align',
    types: ['"left" | "center" | "right"'],
    defaultValue: '"left"',
  },
  {
    name: 'tone',
    types: ['"default" | "muted"'],
    defaultValue: '"default"',
  },
  { name: 'className', types: ['string'], defaultValue: null },
];

export function TablePage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 md:px-8">
      <div className="flex flex-col gap-4">
        <Heading type="h1">Table</Heading>
        <p className="text-fg-mute text-lg">
          <T k="components.table.description" />
        </p>
        <div>
          <Anchor
            href={`${STORYBOOK_URL}/?path=/docs/components-table--docs`}
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
          code="import { Table } from '@k8o/arte-odyssey';"
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
            code={`<Table.Root>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Feature</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell align="right">Coverage</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row interactive>
      <Table.Cell>Switch</Table.Cell>
      <Table.Cell>Stable</Table.Cell>
      <Table.Cell align="right">100%</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>`}
          >
            <Table.Root>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>Feature</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell align="right">Coverage</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                <Table.Row interactive>
                  <Table.Cell>Switch</Table.Cell>
                  <Table.Cell>
                    <Badge label="Stable" tone="success" />
                  </Table.Cell>
                  <Table.Cell align="right">100%</Table.Cell>
                </Table.Row>
                <Table.Row interactive>
                  <Table.Cell>Table</Table.Cell>
                  <Table.Cell>
                    <Badge label="Planned" tone="info" variant="outline" />
                  </Table.Cell>
                  <Table.Cell align="right">0%</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <Heading type="h3">
            <T k="components.table.emptyStateTitle" />
          </Heading>
          <ComponentPreview
            code={`<Table.Root>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Role</Table.HeaderCell>
      <Table.HeaderCell align="right">Projects</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.EmptyState colSpan={3}>
      No records have been added yet.
    </Table.EmptyState>
  </Table.Body>
</Table.Root>`}
          >
            <Table.Root>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Role</Table.HeaderCell>
                  <Table.HeaderCell align="right">Projects</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                <Table.EmptyState colSpan={3}>
                  No records have been added yet.
                </Table.EmptyState>
              </Table.Body>
            </Table.Root>
          </ComponentPreview>
        </div>
      </section>
      <Separator color="mute" />

      <section className="flex flex-col gap-4">
        <Heading type="h2">
          <T k="components.common.propsTitle" />
        </Heading>
        <Heading type="h3">Table.Root</Heading>
        <PropsTable items={tableRootProps} />
        <Heading type="h3">Table.Row</Heading>
        <PropsTable items={tableRowProps} />
        <Heading type="h3">Table.Cell / Table.HeaderCell</Heading>
        <PropsTable items={tableCellProps} />
      </section>
    </div>
  );
}
