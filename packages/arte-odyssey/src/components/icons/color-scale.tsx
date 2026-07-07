import type { FC } from 'react';

import { BaseIcon, type BaseIconProps } from './base';

const ColorScale: FC<{ className: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="6" rx="1.5" width="7" x="3" y="3" />
    <rect height="6" rx="1.5" width="7" x="8.5" y="9" />
    <rect fill="currentColor" height="6" rx="1.5" width="7" x="14" y="15" />
  </svg>
);

export const ColorScaleIcon: FC<Partial<BaseIconProps>> = ({ size = 'md' }) => (
  <BaseIcon renderItem={(props) => <ColorScale {...props} />} size={size} />
);
