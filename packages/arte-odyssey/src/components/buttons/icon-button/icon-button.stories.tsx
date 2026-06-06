import type { Meta, StoryObj } from '@storybook/react-vite';

import { CopyIcon } from '../../icons';
import { IconButton } from './icon-button';

const meta: Meta<typeof IconButton> = {
  title: 'components/buttons/icon-button',
  component: IconButton,
  args: {
    label: 'コピー',
    children: <CopyIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const ColorBase: Story = {
  args: {
    color: 'base',
  },
};

export const ColorPrimary: Story = {
  args: {
    color: 'primary',
  },
};

export const ColorSecondary: Story = {
  args: {
    color: 'secondary',
  },
};
