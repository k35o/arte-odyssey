import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC } from 'react';

import { ChromeIcon, EdgeIcon, FirefoxIcon, SafariIcon } from './browsers';

const meta: Meta<FC> = {
  title: 'components/icons/browsers',
};

export default meta;
type Story = StoryObj<FC>;

export const Primary: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <ChromeIcon />
        <p className="text-fg-mute text-sm">Chrome</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <EdgeIcon />
        <p className="text-fg-mute text-sm">Edge</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FirefoxIcon />
        <p className="text-fg-mute text-sm">Firefox</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SafariIcon />
        <p className="text-fg-mute text-sm">Safari</p>
      </div>
    </div>
  ),
};
