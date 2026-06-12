import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';

import { ScrollLinked } from './scroll-linked';

const meta: Meta<typeof ScrollLinked> = {
  title: 'components/layout/scroll-linked',
  component: ScrollLinked,
};

export default meta;
type Story = StoryObj<typeof ScrollLinked>;

export const NoScroll: Story = {
  // The progress bar is driven by a motion spring (not CSS animation), so
  // its resting state is not pixel-deterministic — and with no scroll the
  // screenshot is a blank page anyway.
  parameters: { vrt: { skip: true } },
};

export const Scroll: Story = {
  decorators: [
    (Story) => (
      <div className="h-lvh overflow-y-scroll">
        <Story />
      </div>
    ),
  ],
};

export const WithContainer: Story = {
  decorators: [
    (Story) => {
      const containerRef = useRef<HTMLDivElement>(null);
      return (
        <div>
          <section
            aria-label="スクロールコンテナの例"
            className="border-border-mute relative h-96 overflow-y-scroll rounded-lg border"
            ref={containerRef}
            // キーボードでもスクロールできるよう section にフォーカスを許可
            // oxlint-disable-next-line eslint-plugin-jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
          >
            <Story args={{ container: containerRef }} />
            <div className="h-[200vh] p-4">
              <h2 className="mb-4 text-xl font-bold">
                コンテナ内スクロールの例
              </h2>
              <p className="mb-4">
                このコンテナ内をスクロールすると、上部にプログレスバーが表示されます。
              </p>
              <p className="mb-4">
                プログレスバーはウィンドウではなく、このコンテナのスクロール位置を追跡します。
              </p>
              <div className="mt-8 space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <p className="bg-bg-mute rounded-lg p-4" key={`content-${i}`}>
                    コンテンツブロック {i + 1}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      );
    },
  ],
};
