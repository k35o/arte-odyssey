import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Response } from './response';

const meta: Meta<typeof Response> = {
  title: 'components/ai/response',
  component: Response,
  parameters: { vrt: { skip: true } },
};

export default meta;
type Story = StoryObj<typeof Response>;

const markdown = [
  '# 見出し',
  '',
  '**太字** と *斜体* のテキスト。',
  '',
  '- 項目1',
  '- 項目2',
].join('\n');

export const Default: Story = {
  args: { children: markdown },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('見出し')).toBeVisible();
  },
};

export const IncompleteWhileStreaming: Story = {
  args: {
    children: '生成中のテキスト。**強調はまだ閉じて',
    isStreaming: true,
  },
};
