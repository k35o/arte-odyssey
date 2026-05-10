'use client';

import { type FC, type TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from './../../../helpers/cn';

type Props = {
  invalid?: boolean;
  fullHeight?: boolean;
  autoResize?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'style'>;

const resizeToContent = (el: HTMLTextAreaElement) => {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight.toString()}px`;
};

export const Textarea: FC<Props> = ({
  invalid = false,
  fullHeight = false,
  autoResize = false,
  readOnly,
  value,
  onInput,
  onKeyDown,
  ...rest
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (ref.current && autoResize) {
      resizeToContent(ref.current);
    }
  }, [autoResize, value]);

  return (
    <textarea
      aria-invalid={invalid}
      className={cn(
        'w-full resize-none rounded-xl border border-border-base bg-bg-base px-3 py-2',
        'aria-invalid:border-border-error',
        'disabled:cursor-not-allowed disabled:border-border-mute disabled:bg-bg-mute hover:disabled:bg-bg-mute',
        'read-only:cursor-not-allowed read-only:bg-bg-subtle',
        'focus-visible:border-transparent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-info',
        fullHeight && 'h-full',
      )}
      onInput={(e) => {
        if (autoResize) {
          resizeToContent(e.currentTarget);
        }
        onInput?.(e);
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
        onKeyDown?.(e);
      }}
      readOnly={pending || readOnly}
      ref={ref}
      value={value}
      {...rest}
    />
  );
};
