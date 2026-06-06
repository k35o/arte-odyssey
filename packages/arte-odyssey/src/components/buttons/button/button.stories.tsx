import type { Meta, StoryObj } from '@storybook/react-vite';

import { CopyIcon } from '../../icons';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'components/buttons/button',
  component: Button,
  args: {
    type: 'button',
    onClick: () => {
      console.warn('clicked');
    },
  },
  render: (props) => <Button {...props}>ボタン</Button>,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    color: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const OutlineSecondary: Story = {
  args: {
    color: 'secondary',
    variant: 'outline',
  },
};

export const Skeleton: Story = {
  args: {
    variant: 'skeleton',
  },
};

export const Gray: Story = {
  args: {
    color: 'gray',
  },
};

export const OutlineGray: Story = {
  args: {
    color: 'gray',
    variant: 'outline',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

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
export const DisabledOutline: Story = {
  args: {
    variant: 'outline',
    disabled: true,
  },
};

export const DisabledSkeleton: Story = {
  args: {
    variant: 'skeleton',
    disabled: true,
  },
};

export const StartIcon: Story = {
  args: {
    startIcon: <CopyIcon />,
  },
};

export const EndIcon: Story = {
  args: {
    endIcon: <CopyIcon />,
  },
};

export const AsyncAction: Story = {
  args: {
    onAction: async () => {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1500);
      });
      console.warn('async action completed');
    },
  },
};
