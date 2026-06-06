import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useState } from 'react';

import { RadioCard } from './radio-card';

const OPTIONS = [
  {
    value: 'starter',
    label: 'Starter',
    description: 'For simple personal projects and early drafts.',
  },
  {
    value: 'pro',
    label: 'Pro',
    description: 'For active products that need richer editing workflows.',
  },
  {
    value: 'team',
    label: 'Team',
    description: 'For shared libraries, review flows, and collaboration.',
  },
] as const;

const meta: Meta<typeof RadioCard> = {
  title: 'components/form/radio-card',
  component: RadioCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-lg max-w-full">
        <Story />
      </div>
    ),
  ],
  args: {
    'aria-labelledby': 'radio-card-label',
    disabled: false,
    invalid: false,
    options: OPTIONS,
  },
};

export default meta;
type Story = StoryObj<typeof RadioCard>;

const DefaultRender = (props: ComponentProps<typeof RadioCard>) => {
  const [value, setValue] = useState('pro');

  return (
    <div>
      <p className="text-fg-base mb-3 font-medium" id="radio-card-label">
        Choose a plan
      </p>
      <RadioCard
        aria-labelledby={props['aria-labelledby']}
        disabled={props.disabled}
        invalid={props.invalid}
        onChange={(nextValue) => {
          setValue(nextValue);
        }}
        options={props.options}
        value={value}
      />
    </div>
  );
};

export const Default: Story = {
  render: (props) => <DefaultRender {...props} />,
};

export const DefaultValue: Story = {
  args: {
    defaultValue: 'starter',
  },
  render: (props) => (
    <div>
      <p className="text-fg-base mb-3 font-medium" id="radio-card-label">
        Choose a plan
      </p>
      <RadioCard
        aria-labelledby={props['aria-labelledby']}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        invalid={props.invalid}
        options={props.options}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'team',
  },
  render: DefaultValue.render,
};
