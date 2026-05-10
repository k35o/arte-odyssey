'use client';

import type {
  FloatingContext,
  Placement,
  ReferenceType,
} from '@floating-ui/react';
import {
  type CSSProperties,
  type KeyboardEvent,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type RefCallback,
  type RefObject,
  useMemo,
  useRef,
} from 'react';

import { createSafeContext } from './../../../helpers/create-safe-context';
import { useClickAway } from './../../../hooks/click-away';

type PopoverContext = {
  rootId: string;
  type: 'dialog' | 'menu' | 'listbox';
  closeOnClickAway: boolean;
  trapFocus: boolean;
  isOpen: boolean;
  toggleOpen: () => void;
  onOpen: () => void;
  onClose: () => void;

  context: FloatingContext;
  placement: Placement;
  triggerRef: RefObject<Element | null>;
  setTriggerRef: (node: ReferenceType | null) => void;
  setContentRef: (node: HTMLElement | null) => void;
  contentStyles: CSSProperties;
};

export const [PopoverProvider, usePopoverContext] =
  createSafeContext<PopoverContext>(
    'usePopoverContext must be used within a Popover.Root',
  );

export const useFloatingUIContext = () => {
  const popover = usePopoverContext();
  return useMemo(() => popover.context, [popover]);
};

export const usePlacement = (): Placement => {
  const popover = usePopoverContext();
  return popover.placement;
};

export const useOpenContext = () => {
  const popover = usePopoverContext();
  return useMemo(
    () => ({
      isOpen: popover.isOpen,
      onOpen: popover.onOpen,
      onClose: popover.onClose,
      toggleOpen: popover.toggleOpen,
    }),
    [popover.isOpen, popover.onClose, popover.onOpen, popover.toggleOpen],
  );
};

export type PopoverContentProps = {
  id: string;
  ref: RefObject<HTMLDivElement | null>;
  role: 'dialog' | 'menu' | 'listbox';
  'aria-orientation'?: 'vertical';
};

export const usePopoverContent = () => {
  const popover = usePopoverContext();
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(
    ref,
    (event) => {
      if (!popover.isOpen) {
        return;
      }
      if (
        event.target instanceof Node &&
        popover.triggerRef.current?.contains(event.target) === true
      ) {
        return;
      }
      popover.onClose();
    },
    popover.closeOnClickAway,
  );

  const itemProps = useMemo<PopoverContentProps>(() => {
    const id = `${popover.rootId}_list`;
    switch (popover.type) {
      case 'dialog':
        return { id, ref, role: 'dialog' };
      case 'menu':
        return {
          id,
          ref,
          role: 'menu',
          'aria-orientation': 'vertical',
        };
      case 'listbox':
        return { id, ref, role: 'listbox' };
      default: {
        const _exhaustive: never = popover.type;
        return _exhaustive;
      }
    }
  }, [popover.rootId, popover.type, ref]);

  return useMemo(
    () => ({
      id: `${popover.rootId}_list`,
      ref,
      isOpen: popover.isOpen,
      trapFocus: popover.trapFocus,
      context: popover.context,
      setContentRef: popover.setContentRef,
      contentStyles: popover.contentStyles,
      itemProps,
    }),
    [
      popover.rootId,
      popover.isOpen,
      popover.context,
      popover.setContentRef,
      popover.contentStyles,
      ref,
      popover.trapFocus,
      itemProps,
    ],
  );
};

export type PopoverTriggerProps = {
  ref: RefCallback<HTMLElement>;
  onClick: MouseEventHandler<HTMLElement>;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
  'aria-haspopup': 'dialog' | 'menu' | 'listbox';
  'aria-expanded': boolean;
  'aria-controls'?: string;
  role?: 'combobox';
};

export const usePopoverTrigger = (): PopoverTriggerProps => {
  const popover = usePopoverContext();
  return useMemo(() => {
    const listId = popover.isOpen ? `${popover.rootId}_list` : undefined;
    switch (popover.type) {
      case 'dialog':
        return {
          onClick: popover.toggleOpen,
          onKeyDown: (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              popover.toggleOpen();
            }
          },
          'aria-haspopup': 'dialog',
          'aria-expanded': popover.isOpen,
          'aria-controls': listId,
          ref: popover.setTriggerRef,
        };
      case 'menu':
        return {
          onClick: popover.toggleOpen,
          onKeyDown: (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              popover.toggleOpen();
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              popover.onOpen();
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              popover.onOpen();
            }
          },
          'aria-haspopup': 'menu',
          'aria-expanded': popover.isOpen,
          'aria-controls': listId,
          ref: popover.setTriggerRef,
        };
      case 'listbox':
        return {
          onClick: popover.toggleOpen,
          onKeyDown: (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              popover.toggleOpen();
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              popover.onOpen();
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              popover.onOpen();
            }
          },
          role: 'combobox',
          'aria-haspopup': 'listbox',
          'aria-expanded': popover.isOpen,
          'aria-controls': listId,
          ref: popover.setTriggerRef,
        };
      default: {
        const _exhaustive: never = popover.type;
        return _exhaustive;
      }
    }
  }, [popover]);
};
