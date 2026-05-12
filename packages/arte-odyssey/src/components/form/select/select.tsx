'use client';

import type { FC, SelectHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

import type { Option } from '../../../types/variables';
import { ChevronIcon } from '../../icons';
import { cn } from './../../../helpers/cn';

type Props = {
  invalid?: boolean;
  options: readonly Option[];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'style'>;

export const Select: FC<Props> = ({
  invalid = false,
  options,
  disabled = false,
  ...rest
}) => {
  const { pending } = useFormStatus();
  return (
    <div
      className={cn(
        'relative flex h-fit items-center rounded-xl border border-border-base bg-bg-base',
        invalid && 'border-border-error',
        (disabled || pending) &&
          'cursor-not-allowed border-border-mute bg-bg-mute',
        'focus-within:border-transparent focus-within:outline-hidden focus-within:ring-2 focus-within:ring-border-info',
      )}
      style={{ inlineSize: '100%' }}
    >
      <select
        aria-invalid={invalid}
        className={cn(
          'grow appearance-none bg-transparent px-3 py-2 text-fg-base focus-visible:outline-hidden',
          'disabled:cursor-not-allowed',
        )}
        disabled={disabled || pending}
        style={{ inlineSize: '100%' }}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="vertical:rotate-90 pointer-events-none me-3 shrink-0"
      >
        <ChevronIcon direction="down" size="sm" />
      </span>
    </div>
  );
};
