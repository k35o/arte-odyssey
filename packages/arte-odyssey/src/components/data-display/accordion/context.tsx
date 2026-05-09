'use client';

import { createContext, type FC, type PropsWithChildren, use } from 'react';

import { createSafeContext } from '../../../helpers/create-safe-context';
import { useDisclosure } from '../../../hooks/disclosure';

const OpenContext = createContext(false);

type ToggleOpen = () => void;
const [ToggleOpenContext, useToggleOpen] = createSafeContext<ToggleOpen>(
  'useToggleOpen must be used within AccordionProvider',
);
const [ItemIdContext, useItemId] = createSafeContext<string>(
  'useItemId must be used within AccordionProvider',
);

export { useItemId, useToggleOpen };

export const useOpen = (): boolean => use(OpenContext);

export const AccordionItemProvider: FC<
  PropsWithChildren<{
    defaultOpen?: boolean;
    id: string;
  }>
> = ({ defaultOpen = false, id, children }) => {
  const { isOpen, toggle } = useDisclosure(defaultOpen);

  return (
    <OpenContext value={isOpen}>
      <ToggleOpenContext value={toggle}>
        <ItemIdContext value={id}>{children}</ItemIdContext>
      </ToggleOpenContext>
    </OpenContext>
  );
};
