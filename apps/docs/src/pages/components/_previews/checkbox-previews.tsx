'use client';

import { Checkbox, CheckboxGroup } from '@k8o/arte-odyssey';
import { useState } from 'react';

export function CheckboxControlledPreview() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Controlled checkbox"
      onChange={(nextChecked) => {
        setChecked(nextChecked);
      }}
      value={checked}
    />
  );
}

export function CheckboxGroupControlledPreview() {
  const [value, setValue] = useState(['react']);

  return (
    <CheckboxGroup name="frameworks" onChange={setValue} value={value}>
      <Checkbox itemValue="react" label="React" />
      <Checkbox itemValue="vue" label="Vue" />
      <Checkbox itemValue="svelte" label="Svelte" />
    </CheckboxGroup>
  );
}

export function CheckboxGroupDisabledPreview() {
  return (
    <CheckboxGroup defaultValue={['vue']} disabled name="frameworks-disabled">
      <Checkbox itemValue="react" label="React" />
      <Checkbox itemValue="vue" label="Vue" />
      <Checkbox itemValue="svelte" label="Svelte" />
    </CheckboxGroup>
  );
}
