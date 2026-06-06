'use client';

import { ListBox, ListIcon } from '@k8o/arte-odyssey';
import { useState } from 'react';

const OPTIONS = [
  { key: 'apple', label: 'Apple' },
  { key: 'banana', label: 'Banana' },
  { key: 'cherry', label: 'Cherry' },
  { key: 'grape', label: 'Grape' },
  { key: 'melon', label: 'Melon' },
];

export function ListBoxBasicPreview() {
  const [selected, setSelected] = useState<string>();
  return (
    <div className="w-56">
      <ListBox.Root
        onChange={(key: string) => {
          setSelected(key);
        }}
        options={OPTIONS}
        value={selected}
      >
        <ListBox.Trigger />
        <ListBox.Content />
      </ListBox.Root>
    </div>
  );
}

export function ListBoxSizesPreview() {
  const [sm, setSm] = useState<string>();
  const [md, setMd] = useState<string>();
  const [lg, setLg] = useState<string>();
  return (
    <div className="flex flex-wrap items-start gap-4">
      <div className="w-44">
        <ListBox.Root
          onChange={(key: string) => {
            setSm(key);
          }}
          options={OPTIONS}
          value={sm}
        >
          <ListBox.Trigger size="sm" />
          <ListBox.Content />
        </ListBox.Root>
      </div>
      <div className="w-48">
        <ListBox.Root
          onChange={(key: string) => {
            setMd(key);
          }}
          options={OPTIONS}
          value={md}
        >
          <ListBox.Trigger size="md" />
          <ListBox.Content />
        </ListBox.Root>
      </div>
      <div className="w-56">
        <ListBox.Root
          onChange={(key: string) => {
            setLg(key);
          }}
          options={OPTIONS}
          value={lg}
        >
          <ListBox.Trigger size="lg" />
          <ListBox.Content />
        </ListBox.Root>
      </div>
    </div>
  );
}

export function ListBoxTriggerIconPreview() {
  const [selected, setSelected] = useState<string>();
  return (
    <ListBox.Root
      onChange={(key: string) => {
        setSelected(key);
      }}
      options={OPTIONS}
      value={selected}
    >
      <ListBox.TriggerIcon icon={<ListIcon />} />
      <ListBox.Content />
    </ListBox.Root>
  );
}
