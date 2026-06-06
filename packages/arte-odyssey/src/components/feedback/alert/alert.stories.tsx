import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'components/feedback/alert',
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    tone: 'success',
    message: 'Success',
  },
};

export const Info: Story = {
  args: {
    tone: 'info',
    message: 'Info',
  },
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    message: 'Warning',
  },
};

export const Error: Story = {
  args: {
    tone: 'error',
    message: 'Error',
  },
};

export const ArrayMessage: Story = {
  args: {
    tone: 'error',
    message: [
      'メールアドレスの形式が正しくありません',
      'パスワードは8文字以上で入力してください',
      '利用規約に同意してください',
    ],
  },
};

export const SingleArrayMessage: Story = {
  args: {
    tone: 'success',
    message: ['Success'],
  },
};
