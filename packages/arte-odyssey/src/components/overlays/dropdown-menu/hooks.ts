'use client';

import { useListItem } from '@floating-ui/react';
import {
  type HTMLAttributes,
  type HTMLProps,
  type MouseEventHandler,
  type RefObject,
  useMemo,
} from 'react';

import { createSafeContext } from '../../../helpers/create-safe-context';
import { useOpenContext } from '../popover/hooks';

type MenuContext = {
  activeIndex: number | null;
  itemElementsRef: RefObject<Array<HTMLElement | null>>;
  getTriggerProps: (
    userProps?: HTMLProps<HTMLElement>,
  ) => HTMLAttributes<HTMLElement>;
  getContentProps: (
    userProps?: HTMLProps<HTMLElement>,
  ) => HTMLAttributes<HTMLElement>;
  getItemProps: (
    userProps?: Omit<HTMLProps<HTMLButtonElement>, 'selected' | 'active'>,
  ) => HTMLAttributes<HTMLElement>;
};

export const [MenuContextProvider, useMenuContext] =
  createSafeContext<MenuContext>(
    'useMenuContext must be used within a DropdownMenu.Root',
  );

export const useMenuContent = () => {
  const menu = useMenuContext();

  return useMemo(
    () => ({
      contentProps: menu.getContentProps(),
      itemElementsRef: menu.itemElementsRef,
    }),
    [menu],
  );
};

export const useMenuItem = ({ onClick }: { onClick: MouseEventHandler }) => {
  const menu = useMenuContext();
  const { onClose } = useOpenContext();
  const item = useListItem();
  return useMemo(
    () => ({
      ref: item.ref,
      role: 'menuitem',
      tabIndex: menu.activeIndex === item.index ? 0 : -1,
      ...menu.getItemProps({
        onClick: (e) => {
          onClick(e);
          onClose();
        },
      }),
    }),
    [item.index, item.ref, menu, onClick, onClose],
  );
};

export const useMenuTrigger = () => {
  const menu = useMenuContext();
  return useMemo(() => menu.getTriggerProps, [menu]);
};
