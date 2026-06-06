'use client';

import { RadioCard } from '@k8o/arte-odyssey';
import { useState } from 'react';

const options = [
  {
    value: 'starter',
    label: 'Starter',
    description: '個人利用や小さなプロトタイプ向けの最小構成です。',
  },
  {
    value: 'pro',
    label: 'Pro',
    description: '継続的な更新と公開運用を前提にした標準構成です。',
  },
  {
    value: 'team',
    label: 'Team',
    description: 'レビューや共同編集を含むチーム利用向けです。',
  },
] as const;

export function RadioCardControlledPreview() {
  const [value, setValue] = useState('pro');

  return (
    <div className="w-full max-w-2xl">
      <p
        className="text-fg-base mb-3 font-medium"
        id="radio-card-preview-label"
      >
        プランを選択
      </p>
      <RadioCard
        disabled={false}
        invalid={false}
        aria-labelledby="radio-card-preview-label"
        onChange={(nextValue) => {
          setValue(nextValue);
        }}
        options={options}
        value={value}
      />
    </div>
  );
}
