'use client';

import type { FC } from 'react';

import { Button } from '../../buttons/button';
import { ChevronIcon } from '../../icons';

type Props = {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  disabled?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  'aria-label'?: string;
};

export const Pagination: FC<Props> = ({
  totalPages,
  currentPage,
  onChange,
  disabled = false,
  prevLabel = '前へ',
  nextLabel = '次へ',
  'aria-label': ariaLabel = 'ページネーション',
}) => {
  const safeTotal = Math.max(1, totalPages);
  const safeCurrent = Math.min(Math.max(1, currentPage), safeTotal);
  const isFirst = safeCurrent <= 1;
  const isLast = safeCurrent >= safeTotal;

  return (
    <nav aria-label={ariaLabel}>
      <div className="flex items-center justify-center gap-2">
        <Button
          color="base"
          disabled={disabled || isFirst}
          onClick={() => {
            onChange(safeCurrent - 1);
          }}
          size="sm"
          startIcon={
            <span className="vertical:rotate-90 inline-flex">
              <ChevronIcon direction="left" size="sm" />
            </span>
          }
          variant="skeleton"
        >
          {prevLabel}
        </Button>
        <p
          aria-live="polite"
          className="text-fg-mute px-3 text-sm tabular-nums"
        >
          <span className="text-fg-base">{safeCurrent}</span>
          <span className="mx-1">/</span>
          <span>{safeTotal}</span>
        </p>
        <Button
          color="base"
          disabled={disabled || isLast}
          endIcon={
            <span className="vertical:rotate-90 inline-flex">
              <ChevronIcon direction="right" size="sm" />
            </span>
          }
          onClick={() => {
            onChange(safeCurrent + 1);
          }}
          size="sm"
          variant="skeleton"
        >
          {nextLabel}
        </Button>
      </div>
    </nav>
  );
};
