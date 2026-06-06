import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { Option } from './hooks';
import { ListBox } from './list-box';

const meta: Meta<typeof ListBox.Root> = {
  title: 'components/overlays/list-box',
  component: ListBox.Root,
  parameters: {
    a11y: {
      options: {
        rules: {
          // https://github.com/floating-ui/floating-ui/pull/2298#issuecomment-1518101512
          'aria-hidden-focus': { enabled: false },
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListBox.Root>;

const OPTIONS: Option[] = [
  { key: '1', label: 'りんご' },
  { key: '2', label: 'バナナ' },
  { key: '3', label: 'さくらんぼ' },
  { key: '4', label: 'ぶどう' },
  { key: '5', label: 'メロン' },
  { key: '6', label: 'いちご' },
  { key: '7', label: 'みかん' },
  { key: '8', label: 'もも' },
  { key: '9', label: 'キウイ' },
  { key: '10', label: 'レモン' },
];

const DefaultRender = () => {
  const [selected, setSelected] = useState<string>();
  return (
    <div className="w-56">
      <ListBox.Root
        onChange={(key: string) => {
          setSelected(key);
        }}
        options={OPTIONS}
        value={selected}
      >
        <ListBox.Trigger />
        <ListBox.Content />
      </ListBox.Root>
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultRender />,
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('combobox', {
      name: '選択してください',
    });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
  },
};
