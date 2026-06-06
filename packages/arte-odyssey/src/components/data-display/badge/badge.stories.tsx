import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'components/data-display/badge',
  component: Badge,
  args: {
    text: 'New',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm" text="Small" />
      <Badge size="md" text="Medium" />
      <Badge size="lg" text="Large" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge text="Neutral" />
      <Badge text="Info" tone="info" />
      <Badge text="Success" tone="success" />
      <Badge text="Warning" tone="warning" />
      <Badge text="Error" tone="error" />
    </div>
  ),
};

export const Outline: Story = {
  args: {
    text: 'Preview',
    tone: 'info',
    variant: 'outline',
  },
};
