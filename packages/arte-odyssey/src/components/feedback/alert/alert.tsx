import type { FC, HTMLAttributes } from 'react';

import { AlertIcon } from '../../icons';
import { cn } from './../../../helpers/cn';
import type { Status } from './../../../types/variables';

type Props = {
  tone: Status;
  message: string | string[];
} & Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'role' | 'className' | 'style'
>;

const STATUS_LABEL = {
  success: '成功',
  info: '情報',
  warning: '警告',
  error: 'エラー',
} as const satisfies Record<Status, string>;

export const Alert: FC<Props> = ({ tone, message, ...rest }) => (
  <div
    {...rest}
    className={cn(
      'flex items-center gap-3 rounded-lg p-4',
      tone === 'success' && 'bg-bg-success',
      tone === 'info' && 'bg-bg-info',
      tone === 'warning' && 'bg-bg-warning',
      tone === 'error' && 'bg-bg-error',
    )}
    role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}
  >
    <span
      className={cn(
        tone === 'success' && 'text-fg-success',
        tone === 'info' && 'text-fg-info',
        tone === 'warning' && 'text-fg-warning',
        tone === 'error' && 'text-fg-error',
      )}
    >
      <AlertIcon size="md" status={tone} />
      <span className="sr-only">{STATUS_LABEL[tone]}</span>
    </span>
    {Array.isArray(message) ? (
      message.length > 1 ? (
        <ul className="space-y-1">
          {message.map((msg) => (
            <li key={msg}>{msg}</li>
          ))}
        </ul>
      ) : (
        <p className="font-bold">{message[0]}</p>
      )
    ) : (
      <p className="font-bold">{message}</p>
    )}
  </div>
);
