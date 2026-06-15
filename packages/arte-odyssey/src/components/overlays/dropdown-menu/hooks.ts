'use client';

import { type MouseEventHandler, useMemo } from 'react';

import { createSafeContext } from '../../../helpers/create-safe-context';
import type { ListNavigation } from '../_internal/use-list-navigation';
import { useOpenContext } from '../popover/hooks';

type MenuContext = ListNavigation;

export const [MenuContextProvider, useMenuContext] =
  createSafeContext<MenuContext>(
    'useMenuContext must be used within a DropdownMenu.Root',
  );

export const useMenuContent = () => {
  const menu = useMenuContext();

  return useMemo(
    () => ({
      contentProps: menu.getContentProps(),
    }),
    [menu],
  );
};

export const useMenuItem = ({
  onClick,
  index,
}: {
  onClick: MouseEventHandler;
  index: number;
}) => {
  const menu = useMenuContext();
  const { onClose } = useOpenContext();
  return useMemo(
    () => ({
      role: 'menuitem' as const,
      ...menu.getItemProps(index),
      onClick: (e: Parameters<MouseEventHandler>[0]) => {
        onClick(e);
        onClose();
      },
    }),
    [index, menu, onClick, onClose],
  );
};
