'use client';

import type { FC, InputHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

import { FOCUS_RING } from '../../_internal/focus-ring';
import { cn } from './../../../helpers/cn';

type Props = {
  invalid?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'style'>;

export const TextField: FC<Props> = ({
  invalid = false,
  readOnly,
  ...rest
}) => {
  const { pending } = useFormStatus();
  return (
    <input
      aria-invalid={invalid}
      className={cn(
        'rounded-xl border border-border-base bg-bg-base px-3 py-2 inline-full',
        'aria-invalid:border-border-error',
        'disabled:cursor-not-allowed disabled:border-border-mute disabled:bg-bg-mute hover:disabled:bg-bg-mute',
        'read-only:cursor-not-allowed read-only:bg-bg-subtle',
        FOCUS_RING,
      )}
      readOnly={pending || readOnly}
      type="text"
      {...rest}
    />
  );
};
