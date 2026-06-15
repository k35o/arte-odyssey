import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../buttons/button';
import { Popover } from './popover';

const meta: Meta<typeof Popover.Root> = {
  title: 'components/overlays/popover',
  component: Popover.Root,
};

export default meta;
type Story = StoryObj<typeof Popover.Root>;

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger
        renderItem={(props) => (
          <Button {...props} size="md" type="button">
            メニュー
          </Button>
        )}
      />
      <Popover.Content
        renderItem={(props) => (
          <div className="bg-bg-raised rounded-lg p-4 shadow-md" {...props}>
            <div role="menuitem">ポップオーバーのコンテンツ</div>
          </div>
        )}
      />
    </Popover.Root>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', {
      name: 'メニュー',
    });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
  },
};

// 画面の四隅・上下左右の端・中央にトリガーを並べ、各 Popover をクリックで開いて
// 配置と flip（端で入りきらないと反対側へ反転）を目視確認するためのストーリー。
const PLACEMENT_POSITIONS = [
  { key: 'top-left', label: '左上', className: 'top-2 left-2' },
  { key: 'top', label: '上中央', className: 'top-2 left-1/2 -translate-x-1/2' },
  { key: 'top-right', label: '右上', className: 'top-2 right-2' },
  {
    key: 'left',
    label: '左中央',
    className: 'top-1/2 left-2 -translate-y-1/2',
  },
  {
    key: 'center',
    label: '中央',
    className: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  },
  {
    key: 'right',
    label: '右中央',
    className: 'top-1/2 right-2 -translate-y-1/2',
  },
  { key: 'bottom-left', label: '左下', className: 'bottom-2 left-2' },
  {
    key: 'bottom',
    label: '下中央',
    className: 'bottom-2 left-1/2 -translate-x-1/2',
  },
  { key: 'bottom-right', label: '右下', className: 'bottom-2 right-2' },
] as const;

export const Placements: Story = {
  render: () => (
    <div className="fixed inset-0">
      {PLACEMENT_POSITIONS.map(({ key, label, className }) => (
        <div className={`absolute ${className}`} key={key}>
          <Popover.Root>
            <Popover.Trigger
              renderItem={(props) => (
                <Button {...props} size="sm" type="button">
                  {label}
                </Button>
              )}
            />
            <Popover.Content
              renderItem={(props) => (
                <div
                  className="bg-bg-raised rounded-lg p-4 shadow-md"
                  {...props}
                >
                  <div role="menuitem">{label}のポップオーバー</div>
                </div>
              )}
            />
          </Popover.Root>
        </div>
      ))}
    </div>
  ),
};
