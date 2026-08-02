// Fixture pair for codemods/verify.sh: this is rewrite.input.tsx before the
// codemod and rewrite.expected.tsx after it.
import {
  Button,
  Checkbox,
  CheckboxGroup,
  ListBox,
  Modal,
  Pagination,
  Switch,
} from '@k8o/arte-odyssey';
import { useState } from 'react';

export const Rewrite = () => {
  const [agreed, setAgreed] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [fruit, setFruit] = useState('apple');

  return (
    <div>
      <Checkbox label="同意する" onChange={setAgreed} checked={agreed} />
      <Switch label="通知を受け取る" onChange={setEnabled} checked={enabled} />

      <CheckboxGroup name="frameworks" onChange={setFrameworks}>
        <CheckboxGroup.Item
          itemValue="react"
          label="React"
          checked={frameworks.includes('react')}
        />
      </CheckboxGroup>

      <Button color="base" type="button">
        戻る
      </Button>
      <Button color='base' size="sm" type="submit">
        送信
      </Button>

      <Pagination currentPage={page} onChange={setPage} totalPages={10} />

      <Modal isOpen placement="bottom">
        <p>本文</p>
      </Modal>

      <ListBox.Root
        onChange={setFruit}
        options={[{ value: 'apple', label: 'りんご' }]}
        value={fruit}
      >
        <ListBox.IconTrigger icon={<span />} />
        <ListBox.Content />
      </ListBox.Root>

      <ListBox.Root
        onChange={setFruit}
        options={[{ value: 'banana', label: 'バナナ' }]}
        value={fruit}
      >
        <ListBox.IconTrigger icon={<span />}></ListBox.IconTrigger>
        <ListBox.Content />
      </ListBox.Root>
    </div>
  );
};
