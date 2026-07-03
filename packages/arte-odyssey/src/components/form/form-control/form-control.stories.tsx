import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect } from 'storybook/test';

import { Autocomplete } from '../autocomplete';
import { TextField } from '../text-field';
import { FormControl } from './form-control';

type RenderInputProps = {
  id: string;
  'aria-describedby': string | undefined;
  'aria-labelledby': string;
  disabled: boolean;
  invalid: boolean;
  required: boolean;
};

const RenderInput = (props: RenderInputProps) => {
  const [state, setState] = useState('');
  return (
    <TextField
      {...props}
      onChange={(e) => {
        setState(e.target.value);
      }}
      value={state}
    />
  );
};

const meta: Meta<typeof FormControl> = {
  title: 'components/form/form-control',
  component: FormControl,
  args: {
    renderInput: (props) => <RenderInput {...props} />,
  },
};

export default meta;
type Story = StoryObj<typeof FormControl>;

export const Default: Story = {
  args: {
    label: 'メールアドレス',
  },
};

export const HelpText: Story = {
  args: {
    label: 'メールアドレス',
    helpText: 'RFCに準拠したメールアドレスを入力してください。',
  },
};

export const Required: Story = {
  args: {
    label: 'メールアドレス',
    helpText: 'RFCに準拠したメールアドレスを入力してください。',
    required: true,
  },
};

export const Error: Story = {
  args: {
    label: 'メールアドレス',
    helpText: 'RFCに準拠したメールアドレスを入力してください。',
    invalid: true,
    errorText: 'メールアドレスが正しくありません。',
    required: true,
  },
};

export const ErrorWithoutText: Story = {
  args: {
    label: 'メールアドレス',
    helpText: 'RFCに準拠したメールアドレスを入力してください。',
    invalid: true,
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'メールアドレス',
    helpText: 'RFCに準拠したメールアドレスを入力してください。',
    disabled: true,
  },
};

export const Legend: Story = {
  args: {
    label: 'メールアドレス',
    helpText: 'RFCに準拠したメールアドレスを入力してください。',
    labelAs: 'legend',
  },

  parameters: {
    a11y: {
      options: {
        rules: {
          // labelが不要なケースに使うのでoffにする
          label: { enabled: false },
          'label-title-only': { enabled: false },
        },
      },
    },
  },
};

// 回帰: fieldset は UA 標準で min-inline-size:min-content を持つため、min-w-0 が無いと
// 狭いコンテナで中身（Autocomplete の選択チップ）がはみ出す。枠内に収まることを検証する。
export const NarrowContainer: Story = {
  args: {
    label: 'ソース',
    renderInput: (props) => (
      <Autocomplete
        {...props}
        defaultValue={['smashing-magazine']}
        options={[
          { value: 'smashing-magazine', label: 'Smashing Magazine' },
          { value: 'web-dev', label: 'web.dev' },
          { value: 'chrome', label: 'Chrome for Developers' },
        ]}
      />
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-56">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const fieldset = canvasElement.querySelector('fieldset');
    const container = fieldset?.parentElement;
    if (
      !(fieldset instanceof HTMLFieldSetElement) ||
      !(container instanceof HTMLElement)
    ) {
      // `Error` はこのファイルの Story 名に影が付くため globalThis 経由で参照する
      throw new globalThis.Error('fieldset が見つかりません');
    }
    const fieldsetWidth = fieldset.getBoundingClientRect().width;
    const containerWidth = container.getBoundingClientRect().width;
    // min-w-0 が無いと fieldset が min-content まで広がりコンテナをはみ出す
    await expect(fieldsetWidth).toBeLessThanOrEqual(containerWidth + 1);
  },
};
