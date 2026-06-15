'use client';

import {
  type FC,
  type PropsWithChildren,
  type ReactElement,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react';

import { cn } from '../../../helpers';
import { useDisclosure, useWritingMode } from '../../../hooks';
import { useFocusTrap } from '../../../hooks/focus-trap';
import type { Placement } from '../../../types/variables';
import { getContentAnchorStyle, toAnchorName } from './anchor-positioning';
import {
  type PopoverContentProps,
  PopoverProvider,
  type PopoverTriggerProps,
  usePopoverContent,
  usePopoverContext,
  usePopoverTrigger,
} from './hooks';

export {
  useOpenContext,
  type PopoverContentProps,
  type PopoverTriggerProps,
} from './hooks';

const Root: FC<
  PropsWithChildren<{
    placement?: Placement;
    type?: 'dialog' | 'menu' | 'listbox';
    flipDisabled?: boolean;
    closeOnClickAway?: boolean;
    trapFocus?: boolean;
  }>
> = ({
  children,
  type = 'menu',
  placement = 'bottom-start',
  flipDisabled = false,
  closeOnClickAway = true,
  trapFocus = true,
}) => {
  const id = useId();
  const { isOpen, open, close, toggle } = useDisclosure();

  const anchorName = toAnchorName(id);
  const triggerRef = useRef<HTMLElement | null>(null);

  const setTriggerRef = useCallback(
    (node: HTMLElement | null) => {
      triggerRef.current = node;
      if (node) {
        node.style.setProperty('anchor-name', anchorName);
      }
    },
    [anchorName],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  return (
    <PopoverProvider
      value={{
        rootId: id,
        type,
        closeOnClickAway,
        trapFocus,
        isOpen,
        toggleOpen: toggle,
        onOpen: open,
        onClose: close,
        placement,
        anchorName,
        flipDisabled,
        triggerRef,
        setTriggerRef,
      }}
    >
      {children}
    </PopoverProvider>
  );
};

const Content: FC<{
  renderItem: (props: PopoverContentProps) => ReactElement;
  // 開閉アニメーション。scale=ポップ（既定）、fade=フェード（Tooltip 用）。
  animation?: 'scale' | 'fade';
}> = ({ renderItem, animation = 'scale' }) => {
  const { isOpen, trapFocus, anchorName, placement, flipDisabled, itemProps } =
    usePopoverContent();
  const { triggerRef } = usePopoverContext();

  // content は popover で top-layer に出すためインライン描画になり、trigger 側の
  // writing-mode を継承する。`vertical:` variant は `.writing-v` 祖先を要求するので、
  // 縦書きなら class を付与する。
  const writingMode = useWritingMode(triggerRef);
  const writingClass = writingMode === 'vertical' ? 'writing-v' : undefined;

  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // Popover API の top-layer 表示・非表示を isOpen に同期する（FloatingPortal の置換）。
  // manual: native の light-dismiss は使わず、外側クリック / Escape は従来どおり
  // JS（useClickAway / window keydown）で扱い、trigger との二重トグルを避ける。
  // 要素は常時マウントし、開閉アニメは CSS（@starting-style + allow-discrete）で行う。
  useEffect(() => {
    const el = contentWrapperRef.current;
    if (!el) {
      return;
    }
    if (isOpen && !el.matches(':popover-open')) {
      el.showPopover();
    } else if (!isOpen && el.matches(':popover-open')) {
      el.hidePopover();
    }
  }, [isOpen]);

  // floating-ui の FloatingFocusManager(modal=false) 相当を自前フックで代替。
  useFocusTrap(contentWrapperRef, triggerRef, isOpen && trapFocus);

  return (
    // outline-hidden: フォーカス管理で当てる tabindex=-1 の管理用フォーカスでは
    // ブラウザ既定の outline を出さない（中の項目・ボタンは各自の focus リングを持つ）。
    <div
      className={cn(
        'z-overlay outline-hidden',
        animation === 'fade' ? 'ao-anim-fade' : 'ao-anim-scale',
        writingClass,
      )}
      popover="manual"
      ref={contentWrapperRef}
      style={getContentAnchorStyle(anchorName, placement, flipDisabled)}
    >
      {renderItem(itemProps)}
    </div>
  );
};

const Trigger: FC<{
  renderItem: (props: PopoverTriggerProps) => ReactElement;
}> = ({ renderItem }) => renderItem(usePopoverTrigger());

export const Popover = {
  Root,
  Content,
  Trigger,
} as const;
