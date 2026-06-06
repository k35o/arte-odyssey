import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../buttons/button';
import { useToast } from './context';
import { ToastProvider } from './provider';
import { Toast } from './toast';

const ToastTrigger = () => {
  const { onOpen } = useToast();
  return (
    <Button
      onClick={() => {
        onOpen('success', 'トーストを呼びました');
      }}
    >
      トーストを呼ぶ
    </Button>
  );
};

const meta: Meta<typeof ToastProvider> = {
  title: 'components/feedback/toast',
  component: ToastProvider,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  render: () => <ToastTrigger />,
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

export const Primary: Story = {};

export const ToastSuccess: Story = {
  render: () => <Toast id="1" message="成功しました" tone="success" />,
};

export const ToasInfo: Story = {
  render: () => <Toast id="1" message="情報です" tone="info" />,
};

export const ToastError: Story = {
  render: () => <Toast id="1" message="失敗しました" tone="error" />,
};

export const ToastWarning: Story = {
  render: () => <Toast id="1" message="警告です" tone="warning" />,
};
