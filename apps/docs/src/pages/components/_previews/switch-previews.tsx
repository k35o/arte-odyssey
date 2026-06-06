'use client';

import { Switch } from '@k8o/arte-odyssey';
import { useState } from 'react';

export function SwitchControlledPreview() {
  const [value, setValue] = useState(false);

  return (
    <Switch
      disabled={false}
      invalid={false}
      required={false}
      label="Controlled switch"
      onChange={(checked) => {
        setValue(checked);
      }}
      value={value}
    />
  );
}
