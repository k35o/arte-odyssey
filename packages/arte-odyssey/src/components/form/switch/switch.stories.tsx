import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useState } from 'react';

import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'components/form/switch',
  component: Switch,
  args: {
    disabled: false,
    invalid: false,
    required: false,
    label: 'Enable notifications',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

const DefaultRender = (props: ComponentProps<typeof Switch>) => {
  const [value, setValue] = useState(false);

  return (
    <Switch
      id={props.id}
      disabled={props.disabled}
      invalid={props.invalid}
      required={props.required}
      label={props.label}
      name={props.name}
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

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
    disabled: false,
    invalid: false,
    required: false,
    label: 'Automatic updates',
  },
};

export const Disabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
    invalid: false,
    required: false,
    label: 'Location services',
  },
};
