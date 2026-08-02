// Look-alikes the codemod must leave byte-for-byte alone.
// verify.sh runs the codemod over this file and fails if it changes at all.
import {
  Button,
  CheckboxCard,
  CheckboxGroup,
  Heading,
  IconButton,
  Popover,
  RadioCard,
  TextField,
} from '@k8o/arte-odyssey';
import { useState } from 'react';

export const Untouched = () => {
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [plan, setPlan] = useState('free');

  return (
    <div className="bg-gray-100 text-gray-500">
      {/* CheckboxGroup keeps `value`: it is string[], not a boolean. */}
      <CheckboxGroup
        name="frameworks"
        onChange={setFrameworks}
        value={frameworks}
      />

      {/* CheckboxCard / RadioCard keep `value` too. */}
      <CheckboxCard
        name="tools"
        onChange={setFrameworks}
        options={[{ value: 'vite', label: 'Vite' }]}
        value={frameworks}
      />
      <RadioCard
        aria-labelledby="plan-label"
        name="plan"
        onChange={setPlan}
        options={[{ value: 'free', label: 'Free' }]}
        value={plan}
      />

      {/* `type` is a genuine prop on Heading / Button / Popover.Root. */}
      <Heading type="h2">見出し</Heading>
      <Button type="submit">送信</Button>
      <Popover.Root type="dialog" />
      <TextField onChange={() => {}} type="email" value="" />

      {/* `gray` outside `<Button color>` is a palette name, not the token. */}
      <p className="text-gray-500">gray</p>
      <IconButton color="base" label="閉じる" />
      <span data-color="gray" />
    </div>
  );
};
