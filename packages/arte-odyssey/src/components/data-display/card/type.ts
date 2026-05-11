import type { HTMLAttributes } from 'react';

export type CardProps = {
  width?: 'full' | 'fit';
  appearance?: 'shadow' | 'bordered';
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;
