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
    <div
      className={cn(
        'relative flex w-full items-center rounded-xl border border-border-base bg-bg-base vertical:h-full vertical:w-auto',
        invalid && 'border-border-error',
        (disabled || pending) &&
          'cursor-not-allowed border-border-mute bg-bg-mute',
        'focus-within:border-transparent focus-within:outline-hidden focus-within:ring-2 focus-within:ring-border-info',
      )}
    >
      <input
        aria-invalid={invalid}
        autoComplete={autoComplete}
        className={cn(
          'w-full grow bg-transparent px-3 py-2 focus-visible:outline-hidden vertical:h-full vertical:w-auto',
          'disabled:cursor-not-allowed',
          'read-only:cursor-not-allowed read-only:bg-bg-subtle',
        )}
        disabled={disabled}
        readOnly={pending || readOnly}
        type={isVisible ? 'text' : 'password'}
        {...rest}
      />
      <button
        aria-label={isVisible ? hideLabel : showLabel}
        className={cn(
          'me-2 inline-flex shrink-0 items-center justify-center rounded-md p-1 text-fg-mute transition-colors',
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
