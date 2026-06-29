import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { LINK_CLASS_NAME } from '../../_internal/link';
import { ExternalLinkIcon } from '../../icons';

type RestProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children' | 'target' | 'rel' | 'className' | 'style'
>;

type RenderAnchorProps<T extends string> = {
  type: 'internal' | 'external';
  href: NoInfer<T>;
  className: string;
  target?: string;
  rel?: string;
  children: ReactNode;
} & RestProps;

type Props<T extends string> = {
  href: T;
  children: ReactNode;
  openInNewTab?: boolean;
  renderAnchor?: (props: RenderAnchorProps<T>) => ReactNode;
} & RestProps;

// Stable module-level reference so it is not re-created on every render
// (default prop function expressions break referential equality).
const defaultRenderAnchor = ({
  children: anchorChildren,
  ...rest
}: RenderAnchorProps<string>): ReactNode => <a {...rest}>{anchorChildren}</a>;

export const Anchor = <T extends string>({
  href,
  children,
  openInNewTab = false,
  renderAnchor = defaultRenderAnchor,
  ...rest
}: Props<T>) => {
  const isExternal = href.startsWith('http');
  const type = !isExternal && !openInNewTab ? 'internal' : 'external';
  const props =
    type === 'internal'
      ? {
          className: LINK_CLASS_NAME,
          children,
        }
      : {
          className: `${LINK_CLASS_NAME} inline-flex items-center gap-0.5`,
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
