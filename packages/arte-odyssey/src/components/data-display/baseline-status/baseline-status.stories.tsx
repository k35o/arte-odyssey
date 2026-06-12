import type { Meta, StoryObj } from '@storybook/react-vite';

import { BaselineStatus } from './baseline-status';

const meta: Meta<typeof BaselineStatus> = {
  title: 'components/data-display/baseline-status',
  component: BaselineStatus,
  // The baseline-status web component fetches live feature data over the
  // network, so its rendering is not deterministic enough for VRT.
  parameters: { vrt: { skip: true } },
};

export default meta;
type Story = StoryObj<typeof BaselineStatus>;

export const Primary: Story = {
  args: {
    featureId: 'promise-try',
  },
};
