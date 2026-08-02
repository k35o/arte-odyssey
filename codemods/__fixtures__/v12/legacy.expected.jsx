// Fixture pair for the `--config sgconfig.yml` run, which is what reaches JSX
// kept in `.jsx` / `.js` files: legacy.input.jsx before, legacy.expected.jsx
// after.
import { Button, Checkbox, ListBox, Modal, Pagination } from '@k8o/arte-odyssey';

export const Legacy = ({ agreed, onAgree, page, onPage }) => (
  <div>
    <Checkbox label="同意する" onChange={onAgree} checked={agreed} />
    <Button color="base" type="button">
      戻る
    </Button>
    <Pagination currentPage={page} onChange={onPage} totalPages={3} />
    <Modal isOpen placement="right">
      <ListBox.IconTrigger icon={<span />} />
    </Modal>
  </div>
);
