import type { FC, HTMLAttributes } from 'react';

import { AlertIcon } from '../../icons';
import { cn } from './../../../helpers/cn';
import type { Status } from './../../../types/variables';

type Props = {
  status: Status;
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

export const Alert: FC<Props> = ({ status, message, ...rest }) => (
  <div
    {...rest}
    className={cn(
      'flex items-center gap-3 rounded-lg p-4',
      status === 'success' && 'bg-bg-success',
      status === 'info' && 'bg-bg-info',
      status === 'warning' && 'bg-bg-warning',
      status === 'error' && 'bg-bg-error',
    )}
    role={status === 'error' || status === 'warning' ? 'alert' : 'status'}
  >
    <span
      className={cn(
        status === 'success' && 'text-fg-success',
        status === 'info' && 'text-fg-info',
        status === 'warning' && 'text-fg-warning',
        status === 'error' && 'text-fg-error',
      )}
    >
      <AlertIcon size="md" status={status} />
      <span className="sr-only">{STATUS_LABEL[status]}</span>
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
