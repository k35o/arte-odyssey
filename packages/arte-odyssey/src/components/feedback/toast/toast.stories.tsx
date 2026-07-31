import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button } from '../../buttons/button';
import { Anchor } from '../../navigation/anchor';
import type { Status } from './../../../types/variables';
import { type ToastOptions, useToast } from './context';
import { ToastProvider } from './provider';

const ToastTrigger = ({
  label = 'トーストを呼ぶ',
  message = 'トーストを呼びました',
  options,
  tone = 'success',
}: {
  label?: string;
  message?: string;
  options?: ToastOptions;
  tone?: Status;
}) => {
  const { onOpen } = useToast();
  return (
    <Button
      onClick={() => {
        onOpen(tone, message, options);
      }}
    >
      {label}
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

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'トーストを呼ぶ' }),
    );
    const body = within(canvasElement.ownerDocument.body);
    const toast = await body.findByRole('status');
    await expect(toast).toHaveTextContent('トーストを呼びました');
    // 手動で閉じられる（閉じるボタンが必ず付く）。出現アニメーション完了を待つ
    await waitFor(() => {
      expect(
        within(toast).getByRole('button', { name: '閉じる' }),
      ).toBeVisible();
    });
  },
};

export const Tones: Story = {
  render: () => (
    <div className="flex gap-2">
      <ToastTrigger label="success" message="成功しました" tone="success" />
      <ToastTrigger label="info" message="情報です" tone="info" />
      <ToastTrigger label="warning" message="警告です" tone="warning" />
      <ToastTrigger label="error" message="失敗しました" tone="error" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'success' }));
    await expect(await body.findByRole('status')).toHaveTextContent(
      '成功しました',
    );
    // error / warning は割り込み読み上げの alert ロールになる
    await userEvent.click(canvas.getByRole('button', { name: 'error' }));
    await expect(await body.findByRole('alert')).toHaveTextContent(
      '失敗しました',
    );
  },
};

export const CloseButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'トーストを呼ぶ' }),
    );
    const body = within(canvasElement.ownerDocument.body);
    const toast = await body.findByRole('status');
    await userEvent.click(
      within(toast).getByRole('button', { name: '閉じる' }),
    );
    await waitFor(() => {
      expect(body.queryByRole('status')).not.toBeInTheDocument();
    });
  },
};

export const AutoDismiss: Story = {
  render: () => (
    <ToastTrigger message="500ms で消えます" options={{ duration: 500 }} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'トーストを呼ぶ' }),
    );
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByRole('status')).toBeInTheDocument();
    await waitFor(
      () => {
        expect(body.queryByRole('status')).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  },
};

export const Persistent: Story = {
  render: () => (
    <ToastTrigger
      message="自動では消えません"
      options={{ duration: Number.POSITIVE_INFINITY }}
      tone="error"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'トーストを呼ぶ' }),
    );
    const body = within(canvasElement.ownerDocument.body);
    const toast = await body.findByRole('alert');
    // AutoDismiss(500ms) より十分長く待っても残っていることを確認する
    await new Promise((resolve) => {
      setTimeout(resolve, 1200);
    });
    await expect(toast).toBeVisible();
    // 閉じるボタンでだけ閉じられる
    await userEvent.click(
      within(toast).getByRole('button', { name: '閉じる' }),
    );
    await waitFor(() => {
      expect(body.queryByRole('alert')).not.toBeInTheDocument();
    });
  },
};

export const PauseOnHover: Story = {
  render: () => (
    <ToastTrigger message="ホバー中は消えません" options={{ duration: 1000 }} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'トーストを呼ぶ' }),
    );
    const body = within(canvasElement.ownerDocument.body);
    const toast = await body.findByRole('status');
    // すぐにホバーしてタイマーを止める
    await userEvent.hover(toast);
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
    await expect(body.getByRole('status')).toBeVisible();
    // ホバーを外すと残り時間で自動クローズが再開する
    await userEvent.unhover(toast);
    await waitFor(
      () => {
        expect(body.queryByRole('status')).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  },
};

export const PauseOnFocus: Story = {
  render: () => (
    <ToastTrigger
      message="フォーカス中は消えません"
      options={{ duration: 1000 }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'トーストを呼ぶ' }),
    );
    const body = within(canvasElement.ownerDocument.body);
    const toast = await body.findByRole('status');
    // Tab で閉じるボタンにフォーカスを移すとタイマーが止まる (WCAG 2.2.1)
    await userEvent.tab();
    await expect(
      within(toast).getByRole('button', { name: '閉じる' }),
    ).toHaveFocus();
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
    await expect(body.getByRole('status')).toBeVisible();
    // フォーカスが外れると残り時間で自動クローズが再開する
    await userEvent.tab();
    await waitFor(
      () => {
        expect(body.queryByRole('status')).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  },
};

export const WithAction: Story = {
  render: () => (
    <ToastTrigger
      message="下書きを削除しました"
      options={{
        action: {
          label: '元に戻す',
          renderItem: ({ children }) => (
            <Anchor href="#undo">{children}</Anchor>
          ),
        },
        duration: Number.POSITIVE_INFINITY,
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'トーストを呼ぶ' }),
    );
    const body = within(canvasElement.ownerDocument.body);
    const toast = await body.findByRole('status');
    await waitFor(() => {
      expect(
        within(toast).getByRole('link', { name: '元に戻す' }),
      ).toBeVisible();
    });
  },
};

export const MaxCount: Story = {
  render: () => (
    <ToastTrigger
      message="上限テスト"
      options={{ duration: Number.POSITIVE_INFINITY }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'トーストを呼ぶ' });
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    // 6 個目以降を開くと最古が閉じ演出に入り、表示は常に最大 5 個
    await waitFor(() => {
      expect(body.getAllByRole('status')).toHaveLength(5);
    });
  },
};
