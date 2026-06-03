import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { ExternalLinkIcon } from '../../icons';

type RestProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children' | 'target' | 'rel' | 'className' | 'style'
>;

type Props<T extends string> = {
  href: T;
  children: ReactNode;
  openInNewTab?: boolean;
  renderAnchor?: (
    props: {
      type: 'internal' | 'external';
      href: NoInfer<T>;
      className: string;
      target?: string;
      rel?: string;
      children: ReactNode;
    } & RestProps,
  ) => ReactNode;
} & RestProps;

export const Anchor = <T extends string>({
  href,
  children,
  openInNewTab = false,
  renderAnchor = ({ children: anchorChildren, ...rest }) => (
    <a {...rest}>{anchorChildren}</a>
  ),
  ...rest
}: Props<T>) => {
  const isExternal = href.startsWith('http');
  const type = !isExternal && !openInNewTab ? 'internal' : 'external';
  const baseClassName =
    'text-fg-info underline transition-colors hover:text-fg-info/80 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-border-info focus-visible:rounded-sm';
  const props =
    type === 'internal'
      ? {
          className: baseClassName,
          children,
        }
      : {
          className: `${baseClassName} inline-flex items-center gap-0.5`,
          target: '_blank',
          rel: 'noopener noreferrer',
          children: (
            <>
              {children}
              <ExternalLinkIcon size="sm" />
            </>
          ),
        };
  return renderAnchor({
    ...rest,
    type,
    href,
    ...props,
  });
};
