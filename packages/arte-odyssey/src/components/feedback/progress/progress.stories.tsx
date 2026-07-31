import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Progress } from '.';

const meta: Meta<typeof Progress> = {
  title: 'components/feedback/progress',
  component: Progress,
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Primary: Story = {
  args: {
    progress: 50,
    maxProgress: 100,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('progressbar')).toHaveAccessibleName('50%');
  },
};

export const WithMinProgress: Story = {
  args: {
    progress: 150,
    minProgress: 100,
    maxProgress: 200,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('progressbar')).toHaveAccessibleName('50%');
  },
};
