'use client';

import type { FC, InputHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '../../../helpers/cn';
import { useDisclosure } from '../../../hooks/disclosure';
import { ViewIcon, ViewOffIcon } from '../../icons';

type Props = {
  invalid?: boolean;
  showLabel?: string;
  hideLabel?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'style'>;

export const PasswordInput: FC<Props> = ({
  invalid = false,
  autoComplete = 'current-password',
  showLabel = 'Show password',
  hideLabel = 'Hide password',
  disabled = false,
  readOnly,
  ...rest
}) => {
  const { isOpen: isVisible, toggle: toggleVisible } = useDisclosure();
  const { pending } = useFormStatus();

  return (
    <div className="relative w-full">
      <input
        aria-invalid={invalid}
        autoComplete={autoComplete}
        className={cn(
          'rounded-xl border border-border-base bg-bg-base px-3 py-2 pe-12',
          'aria-invalid:border-border-error',
          'disabled:cursor-not-allowed disabled:border-border-mute disabled:bg-bg-mute hover:disabled:bg-bg-mute',
          'read-only:cursor-not-allowed read-only:bg-bg-subtle',
          'focus-visible:border-transparent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-info',
        )}
        disabled={disabled}
        readOnly={pending || readOnly}
        style={{ inlineSize: '100%' }}
        type={isVisible ? 'text' : 'password'}
        {...rest}
      />
      <button
        aria-label={isVisible ? hideLabel : showLabel}
        className={cn(
          'absolute top-1/2 end-2 inline-flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-fg-mute transition-colors',
          'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-info',
          !disabled && !pending && 'hover:bg-bg-mute hover:text-fg-base',
          (disabled || pending) && 'cursor-not-allowed text-fg-mute/70',
        )}
        disabled={disabled || pending}
        onClick={toggleVisible}
        type="button"
      >
        {isVisible ? <ViewOffIcon size="sm" /> : <ViewIcon size="sm" />}
      </button>
    </div>
  );
};
