import type { FC, HTMLAttributes } from 'react';

import { cn } from '../../../helpers/cn';

type Props = {
  text: string;
  size?: 'sm' | 'md';
  interactive?: boolean;
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'error';
  variant?: 'solid' | 'outline';
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className' | 'style'>;

export const Badge: FC<Props> = ({
  interactive = false,
  size = 'md',
  text,
  tone = 'neutral',
  variant = 'solid',
  ...rest
}) => {
  const interactiveClassName = cn(
    interactive &&
      'cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-info',
    interactive &&
      tone === 'neutral' &&
      variant === 'solid' &&
      'hover:bg-bg-emphasize active:bg-bg-base',
    interactive &&
      tone === 'neutral' &&
      variant === 'outline' &&
      'hover:bg-bg-subtle active:bg-bg-mute',
    interactive &&
      tone === 'info' &&
      variant === 'solid' &&
      'hover:bg-bg-info/80 active:bg-bg-info/60',
    interactive &&
      tone === 'info' &&
      variant === 'outline' &&
      'hover:bg-bg-info active:bg-bg-info/80',
    interactive &&
      tone === 'success' &&
      variant === 'solid' &&
      'hover:bg-bg-success/80 active:bg-bg-success/60',
    interactive &&
      tone === 'success' &&
      variant === 'outline' &&
      'hover:bg-bg-success active:bg-bg-success/80',
    interactive &&
      tone === 'warning' &&
      variant === 'solid' &&
      'hover:bg-bg-warning/80 active:bg-bg-warning/60',
    interactive &&
      tone === 'warning' &&
      variant === 'outline' &&
      'hover:bg-bg-warning active:bg-bg-warning/80',
    interactive &&
      tone === 'error' &&
      variant === 'solid' &&
      'hover:bg-bg-error/80 active:bg-bg-error/60',
    interactive &&
      tone === 'error' &&
      variant === 'outline' &&
      'hover:bg-bg-error active:bg-bg-error/80',
  );

  const badgeClassName = cn(
    'inline-flex items-center rounded-full border font-medium transition-colors',
    size === 'sm' && 'px-2 py-0.5 text-xs',
    size === 'md' && 'px-2.5 py-1 text-xs',
    tone === 'neutral' &&
      variant === 'solid' &&
      'border-border-mute bg-bg-mute text-fg-base',
    tone === 'neutral' &&
      variant === 'outline' &&
      'border-border-base bg-bg-base text-fg-base',
    tone === 'info' &&
      variant === 'solid' &&
      'border-border-info bg-bg-info text-fg-info',
    tone === 'info' &&
      variant === 'outline' &&
      'border-border-info bg-bg-base text-fg-info',
    tone === 'success' &&
      variant === 'solid' &&
      'border-border-success bg-bg-success text-fg-success',
    tone === 'success' &&
      variant === 'outline' &&
      'border-border-success bg-bg-base text-fg-success',
    tone === 'warning' &&
      variant === 'solid' &&
      'border-border-warning bg-bg-warning text-fg-warning',
    tone === 'warning' &&
      variant === 'outline' &&
      'border-border-warning bg-bg-base text-fg-warning',
    tone === 'error' &&
      variant === 'solid' &&
      'border-border-error bg-bg-error text-fg-error',
    tone === 'error' &&
      variant === 'outline' &&
      'border-border-error bg-bg-base text-fg-error',
    interactiveClassName,
  );

  if (interactive) {
    return (
      <button {...rest} className={badgeClassName} type="button">
        {text}
      </button>
    );
  }

  return (
    <span {...rest} className={badgeClassName}>
      {text}
    </span>
  );
};
