import type { FC, PropsWithChildren, ReactNode } from 'react';

import { cn } from '../../../helpers/cn';

type RootProps = PropsWithChildren;

type RowProps = PropsWithChildren<{
  interactive?: boolean;
}>;

type CellAlign = 'left' | 'center' | 'right';

type HeaderCellProps = PropsWithChildren<{
  align?: CellAlign;
}>;

type CellProps = PropsWithChildren<{
  align?: CellAlign;
  colSpan?: number;
  tone?: 'default' | 'muted';
}>;

type SectionProps = PropsWithChildren;

type CaptionProps = PropsWithChildren;

type EmptyStateProps = {
  colSpan: number;
  children: ReactNode;
};

const Root: FC<RootProps> = ({ children }) => (
  <div className="border-border-mute bg-bg-base vertical:writing-sideways-rl vertical:h-fit vertical:w-fit w-full overflow-x-auto rounded-lg border">
    <table className="min-w-full border-collapse text-left text-sm">
      {children}
    </table>
  </div>
);

const Head: FC<SectionProps> = ({ children }) => (
  <thead className="bg-bg-subtle">{children}</thead>
);

const Body: FC<SectionProps> = ({ children }) => (
  <tbody className="vertical:[&_tr:last-child]:border-l-0 [&_tr:last-child]:border-b-0">
    {children}
  </tbody>
);

const Row: FC<RowProps> = ({ children, interactive = false }) => (
  <tr
    className={cn(
      'border-border-mute border-b transition-colors vertical:border-b-0 vertical:border-l',
      interactive && 'hover:bg-bg-mute',
    )}
  >
    {children}
  </tr>
);

const HeaderCell: FC<HeaderCellProps> = ({ align = 'left', children }) => (
  <th
    className={cn(
      'px-4 py-3 font-medium text-fg-base',
      align === 'center' && 'text-center',
      align === 'right' && 'text-right',
    )}
    scope="col"
  >
    {children}
  </th>
);

const Cell: FC<CellProps> = ({
  align = 'left',
  children,
  colSpan,
  tone = 'default',
}) => (
  <td
    className={cn(
      'px-4 py-3 align-middle',
      tone === 'muted' ? 'text-fg-mute' : 'text-fg-base',
      align === 'center' && 'text-center',
      align === 'right' && 'text-right',
    )}
    colSpan={colSpan}
  >
    {children}
  </td>
);

const Caption: FC<CaptionProps> = ({ children }) => (
  <caption className="text-fg-mute caption-bottom px-4 py-3 text-sm">
    {children}
  </caption>
);

const EmptyState: FC<EmptyStateProps> = ({ children, colSpan }) => (
  <tr className="border-border-mute border-b transition-colors">
    <td
      className="text-fg-mute px-4 py-10 text-center align-middle"
      colSpan={colSpan}
    >
      {children}
    </td>
  </tr>
);

export const Table = {
  Root,
  Head,
  Body,
  Row,
  HeaderCell,
  Cell,
  Caption,
  EmptyState,
} as const;
