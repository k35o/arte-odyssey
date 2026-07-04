import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { ToolInvocation } from './tool-invocation';

const meta: Meta<typeof ToolInvocation> = {
  title: 'components/ai/tool-invocation',
  component: ToolInvocation,
  args: {
    name: 'search_web',
  },
};

export default meta;
type Story = StoryObj<typeof ToolInvocation>;

export const Running: Story = {
  args: {
    state: 'input-available',
    input: { query: 'ArteOdyssey とは' },
  },
};

export const Success: Story = {
  args: {
    state: 'output-available',
    input: { query: 'ArteOdyssey とは' },
    output: 'k8o の React UI ライブラリです。',
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('出力')).toBeVisible();
  },
};

export const Failed: Story = {
  args: {
    state: 'output-error',
    input: { query: 'ArteOdyssey とは' },
    errorText: 'ネットワークエラー',
    defaultOpen: true,
  },
};

export const Collapsed: Story = {
  args: {
    state: 'output-available',
    input: { query: 'ArteOdyssey とは' },
    output: '結果',
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /search_web/u });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};
