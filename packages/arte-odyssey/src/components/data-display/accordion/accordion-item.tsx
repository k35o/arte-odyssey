'use client';

import { type FC, type PropsWithChildren, useId } from 'react';

import { AccordionItemProvider } from './context';

export const AccordionItem: FC<
  PropsWithChildren<{ defaultOpen?: boolean }>
> = ({ children, defaultOpen = false }) => {
  const id = useId();
  return (
    <AccordionItemProvider defaultOpen={defaultOpen} id={id}>
      <div className="vertical:h-full">{children}</div>
    </AccordionItemProvider>
  );
};
