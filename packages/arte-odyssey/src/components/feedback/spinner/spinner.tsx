import type { FC, OutputHTMLAttributes } from 'react';

import { cn } from '../../../helpers/cn';

type Props = {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
} & Omit<
  OutputHTMLAttributes<HTMLOutputElement>,
  'children' | 'aria-label' | 'className' | 'style'
>;

export const Spinner: FC<Props> = ({
  label = 'Loading',
  size = 'md',
  ...rest
}) => (
  <output
    {...rest}
    aria-label={label}
    aria-live="polite"
    className="inline-flex items-center justify-center"
  >
    <span
      aria-hidden
      className={cn(
        'inline-block animate-spin rounded-full border-4 border-border-base border-t-primary-border',
        size === 'sm' && 'size-4',
        size === 'md' && 'size-6',
        size === 'lg' && 'size-8',
      )}
    />
    <span className="sr-only">{label}</span>
  </output>
);
