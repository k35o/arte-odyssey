'use client';

import {
  type FC,
  type PropsWithChildren,
  type ReactNode,
  useId,
  useRef,
} from 'react';

import { cn } from '../../../helpers/cn';
import { IconButton } from '../../buttons/icon-button';
import { Heading } from '../../data-display/heading';
import { CloseIcon } from '../../icons';
import { Modal } from '../modal';

export const Drawer: FC<
  PropsWithChildren<{
    title: ReactNode;
    isOpen?: boolean;
    defaultOpen?: boolean;
    onClose?: () => void;
    side?: 'left' | 'right';
  }>
> = ({ title, isOpen, defaultOpen, onClose, side = 'right', children }) => {
  const rootId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <Modal
      defaultOpen={defaultOpen}
      isOpen={isOpen}
      onClose={onClose}
      ref={dialogRef}
      type={side}
    >
      <section
        aria-describedby={`${rootId}-content`}
        aria-labelledby={`${rootId}-header`}
        className="vertical:flex-row flex h-full flex-col"
        id={rootId}
      >
        <div
          className="flex shrink-0 items-center justify-center p-4 pb-2"
          id={`${rootId}-header`}
        >
          {typeof title === 'string' ? (
            <Heading type="h3">{title}</Heading>
          ) : (
            title
          )}
          <div
            className={cn(
              'absolute top-2',
              side === 'left' ? 'left-2' : 'right-2',
            )}
          >
            <IconButton
              label="閉じる"
              onClick={(e) => {
                e.stopPropagation();
                dialogRef.current?.close();
              }}
              tooltipDisabled
            >
              <CloseIcon size="sm" />
            </IconButton>
          </div>
        </div>
        {/* バックドロップクリックでの閉じる挙動を内側で止めるためだけの onClick */}
        {/* (キーボード操作は Drawer の Escape ハンドラが担う) */}
        {/* oxlint-disable eslint-plugin-jsx-a11y/click-events-have-key-events, eslint-plugin-jsx-a11y/no-static-element-interactions */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain p-4"
          id={`${rootId}-content`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
        {/* oxlint-enable eslint-plugin-jsx-a11y/click-events-have-key-events, eslint-plugin-jsx-a11y/no-static-element-interactions */}
      </section>
    </Modal>
  );
};
