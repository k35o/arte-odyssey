'use client';

import type { FC, HTMLProps, MouseEvent, ReactNode } from 'react';
import { useTransition } from 'react';
import { useFormStatus } from 'react-dom';

import { FOCUS_RING } from '../../_internal/focus-ring';
import { Spinner } from '../../feedback/spinner/spinner';
import { cn } from './../../../helpers/cn';

type Props = {
  type?: 'button' | 'submit';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'gray';
  variant?: 'contained' | 'outlined' | 'skeleton';
  fullWidth?: boolean;
  isActive?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onAction?: () => void | Promise<void>;
  renderItem?: (props: { className: string; children: ReactNode }) => ReactNode;
} & Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type' | 'className' | 'style'>;

export const Button: FC<Props> = ({
  ref,
  children,
  type = 'button',
  size = 'md',
  color = 'primary',
  variant = 'contained',
  disabled = false,
  fullWidth = false,
  isActive = false,
  onAction,
  onClick,
  startIcon,
  endIcon,
  renderItem,
  ...rest
}) => {
  const [transitionPending, startTransition] = useTransition();
  const { pending: formPending } = useFormStatus();
  const isPending = transitionPending || (type === 'submit' && formPending);
  const isDisabled = disabled || isPending;

  const handleClick =
    onClick || onAction
      ? (event: MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          if (onAction) {
            startTransition(async () => {
              await onAction();
            });
          }
        }
      : undefined;

  const spinnerSize = size === 'lg' ? 'md' : 'sm';
  const resolvedStartIcon =
    !renderItem && isPending ? (
      <Spinner label="Loading" size={spinnerSize} />
    ) : (
      startIcon
    );
  const hasStartIcon = resolvedStartIcon !== undefined;
  const hasEndIcon = endIcon !== undefined;

  const baseClassName = cn(
    'rounded-full border-2 text-center font-bold transition-colors',
    {
      'border-transparent bg-primary-bg text-primary-fg hover:bg-primary-bg-emphasize/80 active:bg-primary-bg-emphasize':
        variant === 'contained' && color === 'primary',
      'border-transparent bg-secondary-bg text-secondary-fg hover:bg-secondary-bg-emphasize/80 active:bg-secondary-bg-emphasize':
        variant === 'contained' && color === 'secondary',
      'border-transparent bg-bg-subtle text-fg-base hover:bg-bg-mute/80 active:bg-bg-mute':
        variant === 'contained' && color === 'gray',
      'border-primary-border bg-bg-base text-primary-fg hover:bg-bg-subtle active:bg-bg-mute':
        variant === 'outlined' && color === 'primary',
      'border-secondary-border bg-bg-base text-secondary-fg hover:bg-bg-subtle active:bg-bg-mute':
        variant === 'outlined' && color === 'secondary',
      'border-border-base bg-bg-base text-fg-base hover:bg-bg-subtle active:bg-bg-mute':
        variant === 'outlined' && color === 'gray',
      'border-transparent bg-transparent text-fg-mute hover:bg-bg-subtle hover:text-fg-base active:bg-bg-mute active:text-fg-base':
        variant === 'skeleton',
    },
    FOCUS_RING,
    size === 'sm' && 'px-3 py-1 text-sm',
    size === 'md' && 'px-4 py-2 text-md',
    size === 'lg' && 'px-6 py-3 text-lg',
    fullWidth && 'w-full vertical:w-auto',
    (hasStartIcon || hasEndIcon) && 'flex items-center gap-2',
    hasStartIcon && hasEndIcon
      ? 'justify-between'
      : hasStartIcon && variant !== 'skeleton'
        ? 'justify-center'
        : hasEndIcon && 'justify-between',
    isActive && 'text-fg-info',
  );

  const composedChildren = (
    <>
      {resolvedStartIcon}
      {children}
      {endIcon}
    </>
  );

  if (renderItem) {
    return renderItem({
      className: baseClassName,
      children: composedChildren,
    });
  }

  return (
    <button
      aria-busy={isPending || undefined}
      className={cn(baseClassName, 'cursor-pointer', {
        'cursor-not-allowed opacity-35 hover:bg-primary-bg active:bg-primary-bg':
          isDisabled && variant === 'contained' && color === 'primary',
        'cursor-not-allowed opacity-35 hover:bg-secondary-bg active:bg-secondary-bg':
          isDisabled && variant === 'contained' && color === 'secondary',
        'cursor-not-allowed opacity-35 hover:bg-bg-subtle active:bg-bg-subtle':
          isDisabled && variant === 'contained' && color === 'gray',
        'cursor-not-allowed bg-bg-base opacity-35':
          isDisabled && variant === 'outlined',
        'cursor-not-allowed bg-transparent text-fg-mute opacity-35':
          isDisabled && variant === 'skeleton',
      })}
      disabled={isDisabled}
      onClick={handleClick}
      ref={ref}
      type={type === 'submit' ? 'submit' : 'button'}
      {...rest}
    >
      {composedChildren}
    </button>
  );
};
