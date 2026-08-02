'use client';

import {
  type FC,
  type Ref,
  type TextareaHTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import { useFormStatus } from 'react-dom';

import { FOCUS_RING } from '../../_internal/focus-ring';
import { cn } from './../../../helpers/cn';
import { mergeRefs } from './../../../helpers/merge-refs';

type Props = {
  invalid?: boolean;
  fullHeight?: boolean;
  autoResize?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
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
  ref,
  value,
  onInput,
  onKeyDown,
  ...rest
}) => {
  const innerRef = useRef<HTMLTextAreaElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (innerRef.current && autoResize) {
      resizeToContent(innerRef.current);
    }
  }, [autoResize, value]);

  return (
    <textarea
      aria-invalid={invalid}
      className={cn(
        'resize-none rounded-xl border border-border-base bg-bg-base px-3 py-2 inline-full',
        'aria-invalid:border-border-error',
        'disabled:cursor-not-allowed disabled:border-border-mute disabled:bg-bg-mute hover:disabled:bg-bg-mute',
        'read-only:cursor-not-allowed read-only:bg-bg-subtle',
        FOCUS_RING,
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
      ref={mergeRefs(innerRef, ref)}
      value={value}
      {...rest}
    />
  );
};
