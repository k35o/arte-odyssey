'use client';

import { Pagination } from '@k8o/arte-odyssey';
import { useState } from 'react';

export function PaginationPreview() {
  const [page, setPage] = useState(1);
  return <Pagination currentPage={page} onChange={setPage} totalPages={10} />;
}

export function PaginationDisabledPreview() {
  return (
    <Pagination currentPage={3} disabled onChange={() => {}} totalPages={10} />
  );
}
