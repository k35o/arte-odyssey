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
    <div className="relative h-fit w-full">
      <select
        aria-invalid={invalid}
        className={cn(
          'w-full appearance-none rounded-xl border border-border-base bg-bg-base px-3 py-2 pe-10 text-fg-base',
          'aria-invalid:border-border-error',
          'disabled:cursor-not-allowed disabled:border-border-mute disabled:bg-bg-mute hover:disabled:bg-bg-mute',
          'focus-visible:border-transparent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-info',
        )}
        disabled={disabled || pending}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="vertical:rotate-90 absolute end-3 top-2/4 -translate-y-1/2">
        <ChevronIcon direction="down" size="sm" />
      </div>
    </div>
  );
};
