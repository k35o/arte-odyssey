'use client';

import { useMemo } from 'react';

import { createSafeContext } from '../../../helpers/create-safe-context';
import type { ListNavigation } from '../_internal/use-list-navigation';
import { useOpenContext } from '../popover/hooks';

export type Option = {
  key: string;
  label: string;
};

type MenuContext = ListNavigation & {
  options: Option[];
  selectedIndex: number;
  handleSelect: (index: number) => void;
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
    }),
    [menu],
  );
};

export const useMenuItem = (index: number) => {
  const menu = useMenuContext();
  const { onClose } = useOpenContext();
  return useMemo(
    () => ({
      selected: menu.selectedIndex === index,
      props: {
        role: 'option' as const,
        'aria-selected': menu.selectedIndex === index,
        ...menu.getItemProps(index),
        onClick: () => {
          menu.handleSelect(index);
          onClose();
        },
      },
    }),
    [index, menu, onClose],
  );
};

export const useMenuTrigger = () => {
  const menu = useMenuContext();
  const defaultLabel = '選択してください';
  const label =
    menu.selectedIndex < 0
      ? defaultLabel
      : (menu.options[menu.selectedIndex]?.label ?? defaultLabel);
  return useMemo(() => ({ label }), [label]);
};
