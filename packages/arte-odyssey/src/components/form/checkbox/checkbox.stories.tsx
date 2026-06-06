import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useState } from 'react';

import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'components/form/checkbox',
  component: Checkbox,
  args: {
    disabled: false,
    label: 'checkbox',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const DefaultRender = (props: ComponentProps<typeof Checkbox>) => {
  const [value, setValue] = useState(false);

  return (
    <Checkbox
      disabled={props.disabled}
      label={props.label}
      onChange={(checked) => {
        setValue(checked);
      }}
      value={value}
    />
  );
};

export const Default: Story = {
  render: (props) => <DefaultRender {...props} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    label: 'disabled checkbox',
  },
};
