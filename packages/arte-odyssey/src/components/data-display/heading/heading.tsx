import type { FC, HTMLAttributes } from 'react';

import { cn } from './../../../helpers/cn';

type Props = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  lineClamp?: number;
} & Omit<HTMLAttributes<HTMLHeadingElement>, 'className' | 'style'>;

export const Heading: FC<Props> = ({ children, type, lineClamp, ...rest }) => {
  const lineClampClass = {
    [`line-clamp-${lineClamp?.toString() ?? ''}`]: lineClamp,
  };
  if (type === 'h1') {
    return (
      <h1
        {...rest}
        className={cn('font-bold text-2xl md:text-3xl', lineClampClass)}
      >
        {children}
      </h1>
    );
  }
  if (type === 'h2') {
    return (
      <h2
        {...rest}
        className={cn('font-bold text-xl md:text-2xl', lineClampClass)}
      >
        {children}
      </h2>
    );
  }
  if (type === 'h3') {
    return (
      <h3
        {...rest}
        className={cn('font-bold text-lg md:text-xl', lineClampClass)}
      >
        {children}
      </h3>
    );
  }
  if (type === 'h4') {
    return (
      <h4
        {...rest}
        className={cn('font-bold text-md md:text-lg', lineClampClass)}
      >
        {children}
      </h4>
    );
  }
  if (type === 'h5') {
    return (
      <h5
        {...rest}
        className={cn('font-bold text-sm md:text-md', lineClampClass)}
      >
        {children}
      </h5>
    );
  }
  return (
    <h6
      {...rest}
      className={cn('font-bold text-xs md:text-sm', lineClampClass)}
    >
      {children}
    </h6>
  );
};
