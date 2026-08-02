// Things the codemod reports but never rewrites.
// verify.sh asserts this file is reported exactly as manual.expected.txt says,
// and that the codemod leaves it byte-for-byte alone.
import {
  Button,
  Checkbox as Check,
  IconButton,
  ListBox,
  RadioCard,
} from '@k8o/arte-odyssey';
import { useState } from 'react';

// ListBox options changed shape: { key, label } -> { value, label }.
const OPTIONS = [
  { key: 'apple', label: 'りんご' },
  { key: 'banana', label: 'バナナ' },
];

const AliasedIconTrigger = ListBox.TriggerIcon;

export const Manual = ({ remote }: { remote: { key: string }[] }) => {
  const [fruit, setFruit] = useState('apple');
  const [plan, setPlan] = useState('free');

  return (
    <div>
      <ListBox.Root onChange={setFruit} options={OPTIONS} value={fruit}>
        <ListBox.Trigger />
        <ListBox.Content />
      </ListBox.Root>

      <ListBox.Root onChange={setFruit} options={remote} value={fruit}>
        <AliasedIconTrigger icon={<span />} />
        <ListBox.Content />
      </ListBox.Root>

      <RadioCard
        aria-labelledby="plan-label"
        name="plan"
        onChange={setPlan}
        options={[{ value: 'free', label: 'Free' }]}
        value={plan}
      />

      {/* Aliased import: the JSX tag is `Check`, so the rewrite cannot see it. */}
      <Check label="同意する" value={false} />

      {/* Not valid on <button>: the props type is ButtonHTMLAttributes now. */}
      <Button href="/back" type="button">
        戻る
      </Button>
      <IconButton label="ヘルプ" target="_blank" />
    </div>
  );
};

export const assertions = (canvas: {
  getByRole: (role: string, options?: Record<string, unknown>) => unknown;
}) => [
  // RadioCard is a radiogroup of input[type=radio] now.
  canvas.getByRole('button', { pressed: true }),
  canvas.getByRole('button', { name: 'Free', pressed: false }),
];
