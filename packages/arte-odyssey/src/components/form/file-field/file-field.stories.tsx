import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../buttons/button';
import { FileField } from './file-field';

const meta: Meta<typeof FileField.Root> = {
  title: 'components/form/file-field',
  component: FileField.Root,
  args: {
    id: 'filefield',
  },
  render: (args) => (
    <FileField.Root {...args}>
      <FileField.Trigger
        renderItem={({ disabled, onClick }) => (
          <Button disabled={disabled} onClick={onClick}>
            ファイルを選択
          </Button>
        )}
      />
      <FileField.ItemList />
    </FileField.Root>
  ),
  parameters: {
    a11y: {
      options: {
        rules: {
          // FileField単体ではラベルを付随しない
          'label-title-only': { enabled: false },
          label: { enabled: false },
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileField.Root>;

export const Default: Story = {
  args: {
    disabled: false,
    invalid: false,
    required: false,
  },
};

export const Multiple: Story = {
  args: {
    disabled: false,
    invalid: false,
    required: false,
    multiple: true,
  },
};

export const MaxFiles: Story = {
  args: {
    disabled: false,
    invalid: false,
    required: false,
    multiple: true,
    maxFiles: 3,
  },
};

export const ImageOnly: Story = {
  args: {
    disabled: false,
    invalid: false,
    required: false,
    accept: 'image/*',
  },
};

export const WebkitDirectory: Story = {
  args: {
    disabled: false,
    invalid: false,
    required: false,
    webkitDirectory: true,
  },
};

export const HasClearButton: Story = {
  args: {
    disabled: false,
    invalid: false,
    required: false,
    multiple: true,
  },
  render: (args) => (
    <FileField.Root {...args}>
      <FileField.Trigger
        renderItem={({ disabled, onClick }) => (
          <Button disabled={disabled} onClick={onClick}>
            ファイルを追加
          </Button>
        )}
      />
      <FileField.ItemList clearable />
    </FileField.Root>
  ),
};

export const ShowWebkitRelativePath: Story = {
  args: {
    disabled: false,
    invalid: false,
    required: false,
    webkitDirectory: true,
  },
  render: (args) => (
    <FileField.Root {...args}>
      <FileField.Trigger
        renderItem={({ disabled, onClick }) => (
          <Button disabled={disabled} onClick={onClick} variant="outline">
            ファイルを選択
          </Button>
        )}
      />
      <FileField.ItemList showWebkitRelativePath />
    </FileField.Root>
  ),
};

export const OnlyTrigger: Story = {
  args: {
    disabled: false,
    invalid: false,
    required: false,
  },
  render: (args) => (
    <FileField.Root {...args}>
      <FileField.Trigger
        renderItem={({ disabled, onClick }) => (
          <Button disabled={disabled} onClick={onClick} variant="outline">
            ファイルを選択
          </Button>
        )}
      />
    </FileField.Root>
  ),
};
