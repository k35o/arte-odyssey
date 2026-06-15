import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import type { Placement } from '../../../types/variables';
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

// 各 placement が「意図した側・整列」で出ることをアサーションで保証する。
// 画面中央のトリガーから開くため flip は起きず、要求した placement がそのまま反映される。
const assertPlacement = (
  placement: Placement,
  trigger: Element,
  content: Element,
) => {
  const t = trigger.getBoundingClientRect();
  const c = content.getBoundingClientRect();
  const TOL = 2;
  const [side, align] = placement.split('-');

  // 出る側（offset 8px ぶん必ず外側になる）
  if (side === 'top') expect(c.bottom).toBeLessThanOrEqual(t.top + TOL);
  if (side === 'bottom') expect(c.top).toBeGreaterThanOrEqual(t.bottom - TOL);
  if (side === 'left') expect(c.right).toBeLessThanOrEqual(t.left + TOL);
  if (side === 'right') expect(c.left).toBeGreaterThanOrEqual(t.right - TOL);

  // 整列（上下placementなら水平、左右placementなら垂直）
  const horizontal = side === 'top' || side === 'bottom';
  const startGap = horizontal ? c.left - t.left : c.top - t.top;
  const endGap = horizontal ? t.right - c.right : t.bottom - c.bottom;
  const centerGap = horizontal
    ? (c.left + c.right) / 2 - (t.left + t.right) / 2
    : (c.top + c.bottom) / 2 - (t.top + t.bottom) / 2;
  if (align === 'start') {
    expect(Math.abs(startGap)).toBeLessThanOrEqual(TOL);
  } else if (align === 'end') {
    expect(Math.abs(endGap)).toBeLessThanOrEqual(TOL);
  } else {
    expect(Math.abs(centerGap)).toBeLessThanOrEqual(TOL + 1);
  }
};

const placementStory = (placement: Placement): Story => ({
  render: () => (
    <div className="flex min-h-svh items-center justify-center">
      <Popover.Root placement={placement}>
        <Popover.Trigger
          renderItem={(props) => (
            <Button {...props} size="sm" type="button">
              {placement}
            </Button>
          )}
        />
        <Popover.Content
          renderItem={(props) => (
            <div className="bg-bg-raised rounded-lg p-4 shadow-md" {...props}>
              <div role="menuitem">{placement}</div>
            </div>
          )}
        />
      </Popover.Root>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: placement });
    await userEvent.click(trigger);
    const content = await waitFor(() => {
      const el = [...document.querySelectorAll('[popover]')].find(
        (p) => p.matches(':popover-open') && !p.id.startsWith('storybook'),
      );
      if (!el) {
        throw new Error('popover did not open');
      }
      return el;
    });
    // 開くアニメーション（scale）で寸法がぶれないよう最終状態に固定してから測る
    for (const animation of content.getAnimations()) {
      animation.finish();
    }
    assertPlacement(placement, trigger, content);
  },
});

export const Top = placementStory('top');
export const TopStart = placementStory('top-start');
export const TopEnd = placementStory('top-end');
export const Bottom = placementStory('bottom');
export const BottomStart = placementStory('bottom-start');
export const BottomEnd = placementStory('bottom-end');
export const Left = placementStory('left');
export const LeftStart = placementStory('left-start');
export const LeftEnd = placementStory('left-end');
export const Right = placementStory('right');
export const RightStart = placementStory('right-start');
export const RightEnd = placementStory('right-end');
