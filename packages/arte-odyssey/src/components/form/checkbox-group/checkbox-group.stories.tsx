import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { expect } from 'storybook/test';

import { CheckboxGroup } from '.';
import { Checkbox } from '../checkbox';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'components/form/checkbox-group',
  component: CheckboxGroup,
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const DefaultRender = () => {
  const [value, setValue] = useState(['react']);

  return (
    <CheckboxGroup name="frameworks" onChange={setValue} value={value}>
      <Checkbox itemValue="react" label="React" />
      <Checkbox itemValue="vue" label="Vue" />
      <Checkbox itemValue="svelte" label="Svelte" />
    </CheckboxGroup>
  );
};

export const Default: Story = {
  render: () => <DefaultRender />,
  play: async ({ canvas, userEvent }) => {
    const react = canvas.getByRole('checkbox', { name: 'React' });
    const vue = canvas.getByRole('checkbox', { name: 'Vue' });

    await expect(react).toBeChecked();
    await expect(vue).not.toBeChecked();

    await userEvent.click(vue);

    await expect(vue).toBeChecked();
    await expect(react).toBeChecked();
  },
};

export const Disabled: Story = {
  render: () => (
    <CheckboxGroup defaultValue={['vue']} disabled name="frameworks-disabled">
      <Checkbox itemValue="react" label="React" />
      <Checkbox itemValue="vue" label="Vue" />
      <Checkbox itemValue="svelte" label="Svelte" />
    </CheckboxGroup>
  ),
};

const RefRender = () => {
  const ref = useRef<HTMLFieldSetElement>(null);

  return (
    <div className="flex flex-col items-start gap-2">
      <CheckboxGroup defaultValue={[]} name="frameworks-ref" ref={ref}>
        <CheckboxGroup.Item itemValue="react" label="React" />
        <CheckboxGroup.Item itemValue="vue" label="Vue" />
      </CheckboxGroup>
      <button
        onClick={() => {
          ref.current?.querySelector('input')?.focus();
        }}
        type="button"
      >
        focus
      </button>
    </div>
  );
};

export const ForwardsRef: Story = {
  render: () => <RefRender />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'focus' }));

    await expect(canvas.getByRole('checkbox', { name: 'React' })).toHaveFocus();
  },
};
