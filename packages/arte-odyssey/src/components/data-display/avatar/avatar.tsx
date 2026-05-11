'use client';

import type { FC, HTMLAttributes } from 'react';
import { useState } from 'react';

import { cn } from '../../../helpers/cn';

type Props = {
  alt?: string;
  fallback?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  src?: string;
} & Omit<
  HTMLAttributes<HTMLSpanElement>,
  'role' | 'aria-label' | 'className' | 'style'
>;

const getInitials = (name?: string) => {
  if (name === undefined || name === '') {
    return '?';
  }

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return initials === '' ? '?' : initials;
};

export const Avatar: FC<Props> = ({
  alt,
  fallback,
  name,
  size = 'md',
  src,
  ...rest
}) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;
  const label = alt ?? name ?? 'Avatar';
  const imageSize = size === 'sm' ? 32 : size === 'md' ? 40 : 56;

  return (
    <span
      {...rest}
      aria-label={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-base bg-bg-mute font-medium text-fg-base',
        size === 'sm' && 'size-8 text-xs',
        size === 'md' && 'size-10 text-sm',
        size === 'lg' && 'size-14 text-lg',
      )}
      role="img"
    >
      {showImage ? (
        <img
          alt={alt ?? ''}
          className="size-full object-cover"
          height={imageSize}
          onError={() => {
            setFailedSrc(src ?? null);
          }}
          src={src}
          width={imageSize}
        />
      ) : (
        <span aria-hidden>{fallback ?? getInitials(name)}</span>
      )}
    </span>
  );
};
