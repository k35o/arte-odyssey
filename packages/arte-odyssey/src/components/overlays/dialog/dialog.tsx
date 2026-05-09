'use client';

import {
  type FC,
  type PropsWithChildren,
  type Ref,
  useId,
  useMemo,
} from 'react';

import { IconButton } from '../../buttons/icon-button';
import { Heading } from '../../data-display/heading';
import { CloseIcon } from '../../icons';
import { createSafeContext } from './../../../helpers/create-safe-context';

const [DialogContext, useDialogContext] = createSafeContext<{
  rootId: string;
}>('useDialogContext must be used within a DialogProvider');

const Root: FC<
  PropsWithChildren<{
    ref?: Ref<HTMLElement> | undefined;
    id?: string | undefined;
    tabIndex?: number | undefined;
    role?: string | undefined;
  }>
> = ({ ref, id, children, tabIndex, role = 'dialog' }) => {
  const fallbackId = useId();
  const rootId = id ?? fallbackId;
  const contextValue = useMemo(() => ({ rootId }), [rootId]);

  return (
    <section
      aria-describedby={`${rootId}-content`}
      aria-labelledby={`${rootId}-header`}
      className="bg-bg-raised relative w-full rounded-lg shadow-md"
      id={id}
      ref={ref}
      role={role}
      tabIndex={tabIndex}
    >
      <DialogContext value={contextValue}>{children}</DialogContext>
    </section>
  );
};

const Header: FC<{
  title: string;
  onClose: () => void;
}> = ({ title, onClose }) => {
  const { rootId } = useDialogContext();
  return (
    <div
      className="flex items-center justify-center p-4 pb-2"
      id={`${rootId}-header`}
    >
      <Heading type="h3">{title}</Heading>
      <div className="absolute top-2 right-2">
        <IconButton
          label="閉じる"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          tooltipDisabled
        >
          <CloseIcon size="sm" />
        </IconButton>
      </div>
    </div>
  );
};

const Content: FC<PropsWithChildren> = ({ children }) => {
  const { rootId } = useDialogContext();
  return (
    // バックドロップクリックでの閉じる挙動を内側で止めるためだけの onClick
    // (キーボード操作は Modal の Escape ハンドラが担う)
    /* oxlint-disable eslint-plugin-jsx-a11y/click-events-have-key-events, eslint-plugin-jsx-a11y/no-static-element-interactions */
    <div
      className="p-4"
      id={`${rootId}-content`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
    /* oxlint-enable eslint-plugin-jsx-a11y/click-events-have-key-events, eslint-plugin-jsx-a11y/no-static-element-interactions */
  );
};

export const Dialog = {
  Root,
  Header,
  Content,
} as const;
