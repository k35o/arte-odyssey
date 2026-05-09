'use client';

import { useListItem } from '@floating-ui/react';
import {
  type HTMLAttributes,
  type HTMLProps,
  type RefObject,
  useMemo,
} from 'react';

import { createSafeContext } from '../../../helpers/create-safe-context';
import { useOpenContext } from '../popover/hooks';

export type Option = {
  key: string;
  label: string;
};

type MenuContext = {
  options: Option[];
  activeIndex: number | null;
  selectedIndex: number | null;
  handleSelect: (index: number) => void;
  itemElementsRef: RefObject<Array<HTMLElement | null>>;
  getTriggerProps: (
    userProps?: HTMLProps<HTMLElement>,
  ) => HTMLAttributes<HTMLElement>;
  getContentProps: (
    userProps?: HTMLProps<HTMLElement>,
  ) => HTMLAttributes<HTMLElement>;
  getItemProps: (
    userProps?: Omit<HTMLProps<HTMLElement>, 'selected' | 'active'>,
  ) => HTMLAttributes<HTMLElement>;
};

const [MenuContextProvider, useMenuContext] = createSafeContext<MenuContext>(
  'useMenuContext must be used within a ListBox.Root',
);

export { MenuContextProvider };

export const useMenuContent = () => {
  const menu = useMenuContext();

  return useMemo(
    () => ({
      options: menu.options,
      selectedIndex: menu.selectedIndex,
      contentProps: menu.getContentProps(),
      itemElementsRef: menu.itemElementsRef,
    }),
    [menu],
  );
};

export const useMenuItem = (index: number) => {
  const menu = useMenuContext();
  const { onClose } = useOpenContext();
  const item = useListItem();
  return useMemo(
    () => ({
      selected: menu.selectedIndex === index,
      props: {
        ref: item.ref,
        'aria-selected': menu.selectedIndex === index,
        role: 'option',
        tabIndex: menu.activeIndex === item.index ? 0 : -1,
        ...menu.getItemProps({
          onClick: () => {
            menu.handleSelect(index);
            onClose();
          },
        }),
      },
    }),
    [index, item.index, item.ref, menu, onClose],
  );
};

export const useMenuTrigger = () => {
  const menu = useMenuContext();
  const defaultLabel = '選択してください';
  const label =
    menu.selectedIndex === null
      ? defaultLabel
      : (menu.options[menu.selectedIndex]?.label ?? defaultLabel);
  return useMemo(
    () => ({
      label,
      getTriggerProps: menu.getTriggerProps,
    }),
    [label, menu.getTriggerProps],
  );
};
