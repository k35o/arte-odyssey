import type { FC } from 'react';

import { BaseIcon, type BaseIconProps } from './base';

const ArteOdysseyLogo: FC<{
  className?: string;
}> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="arte-odyssey-g1" x1="0%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="var(--teal-300)" />
        <stop offset="100%" stopColor="var(--cyan-300)" />
      </linearGradient>
    </defs>

    <circle cx="128" cy="250" r="20" fill="url(#arte-odyssey-g1)" />

    <path
      d="M146 242 C158 155 215 90 300 78 C375 68 425 120 432 195 C436 235 420 268 392 282"
      stroke="url(#arte-odyssey-g1)"
      strokeWidth="22"
      strokeLinecap="round"
    />

    <path
      d="M146 258 C185 278 250 288 320 284 C355 280 378 274 392 265"
      stroke="url(#arte-odyssey-g1)"
      strokeWidth="22"
      strokeLinecap="round"
    />

    <path
      d="M200 286 C195 330 185 375 192 425"
      stroke="url(#arte-odyssey-g1)"
      strokeWidth="13"
      strokeLinecap="round"
    />

    <path
      d="M280 288 C282 332 288 378 298 430"
      stroke="url(#arte-odyssey-g1)"
      strokeWidth="10"
      strokeLinecap="round"
    />

    <path
      d="M350 280 C358 320 370 365 388 415"
      stroke="url(#arte-odyssey-g1)"
      strokeWidth="7"
      strokeLinecap="round"
    />
  </svg>
);

export const ArteOdyssey: FC<Partial<BaseIconProps>> = ({ size = 'md' }) => (
  <BaseIcon
    renderItem={(props) => <ArteOdysseyLogo {...props} />}
    size={size}
  />
);
