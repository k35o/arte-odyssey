import type { FC, PropsWithChildren } from 'react';

import { ChevronIcon } from '../../icons';
import { cn } from './../../../helpers/cn';

const List: FC<
  PropsWithChildren<{
    size?: 'sm' | 'md' | 'lg';
  }>
> = ({ children, size = 'md' }) => (
  <nav aria-label="パンクズリスト">
    <ol
      className={cn(
        'flex list-none items-center gap-1 text-fg-mute',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-xs md:text-md',
        size === 'lg' && 'text-xl md:text-2xl',
      )}
    >
      {children}
    </ol>
  </nav>
);

const Item: FC<PropsWithChildren> = ({ children }) => (
  <li className="inline-flex items-center">{children}</li>
);

const Separator: FC = () => (
  <li className="text-fg-mute vertical:rotate-90">
    <ChevronIcon direction="right" size="sm" />
  </li>
);

const _Link = <T extends string>({
  href,
  current = false,
  children,
  component,
}: PropsWithChildren<{
  href: T;
  current?: boolean;
  component?: FC<{ href: T; className: string }>;
}>) => {
  const Link = component ?? 'a';
  return current ? (
    <span className="text-fg-base">{children}</span>
  ) : (
    <Link
      className="hover:text-fg-base focus-visible:ring-border-info underline transition-colors focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
      href={href}
    >
      {children}
    </Link>
  );
};

export const Breadcrumb = {
  List,
  Item,
  Separator,
  Link: _Link,
} as const;
