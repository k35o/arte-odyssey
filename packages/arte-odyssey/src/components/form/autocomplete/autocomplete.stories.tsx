import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useState } from 'react';
import { expect } from 'storybook/test';

import { Autocomplete } from './autocomplete';

const AutocompleteRender = ({
  id,
  'aria-describedby': describedBy,
  invalid,
  disabled,
  required,
}: ComponentProps<typeof Autocomplete>) => {
  const options = [
    { value: '2', label: '2進数' },
    { value: '8', label: '8進数' },
    { value: '10', label: '10進数' },
    { value: '16', label: '16進数' },
  ];
  const [value, setValue] = useState<string[]>([]);

  return (
    <Autocomplete
      aria-describedby={describedBy}
      id={id}
      disabled={disabled}
      invalid={invalid}
      required={required}
      onChange={setValue}
      options={options}
      value={value}
    />
  );
};

const meta: Meta<typeof Autocomplete> = {
  title: 'components/form/autocomplete',
  component: Autocomplete,
  render: (props) => <AutocompleteRender {...props} />,
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {
  args: {
    id: 'autocomplete',
    'aria-describedby': undefined,
    invalid: false,
    disabled: false,
    required: false,
  },
};

export const Invalid: Story = {
  args: {
    id: 'autocomplete',
    'aria-describedby': undefined,
    invalid: true,
    disabled: false,
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    id: 'autocomplete',
    'aria-describedby': undefined,
    invalid: false,
    disabled: true,
    required: true,
  },
};

// 回帰: 幅の狭いコンテナで「すべて閉じる」ボタンが枠外にはみ出さないこと。
// チップ行(flex w-full)が min-w-0 で縮められないと、クリアボタンが押し出される。
export const NarrowContainer: Story = {
  render: () => (
    <Autocomplete
      defaultValue={['chrome']}
      id="autocomplete-narrow"
      options={[
        { value: 'chrome', label: 'Chrome for Developers' },
        { value: 'web-dev', label: 'web.dev' },
        { value: 'mdn', label: 'MDN Web Docs' },
      ]}
    />
  ),
  decorators: [
    (Story) => (
      <div className="w-56">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const clearAll = canvasElement.querySelector('[aria-label="すべて閉じる"]');
    if (!(clearAll instanceof HTMLElement)) {
      throw new Error('クリアボタンが見つかりません');
    }
    const box = clearAll.closest('.rounded-xl');
    if (!(box instanceof HTMLElement)) {
      throw new Error('外枠が見つかりません');
    }
    // チップ行が min-w-0 で縮まないと「すべて閉じる」が枠外に押し出される
    await expect(clearAll.getBoundingClientRect().right).toBeLessThanOrEqual(
      box.getBoundingClientRect().right + 1,
    );
  },
};
