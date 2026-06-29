import type { FC, HTMLAttributes, ReactNode } from 'react';

import { LINK_CLASS_NAME } from '../../_internal/link';
import { AlertIcon } from '../../icons';
import { cn } from './../../../helpers/cn';
import type { Status } from './../../../types/variables';

type AlertAction = {
  label: string;
  renderItem: (props: { className: string; children: ReactNode }) => ReactNode;
};

type Props = {
  tone: Status;
  message: string | string[];
  action?: AlertAction;
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

export const Alert: FC<Props> = ({ tone, message, action, ...rest }) => {
  const actionNode = action
    ? action.renderItem({
        className: LINK_CLASS_NAME,
        children: action.label,
      })
    : null;
  const inlineAction = action ? (
    <span className="ml-1 font-normal">{actionNode}</span>
  ) : null;

  let messageContent: ReactNode;
  if (Array.isArray(message) && message.length > 1) {
    const list = (
      <ul className="space-y-1">
        {message.map((msg) => (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
    );
    messageContent = action ? (
      <div>
        {list}
        <div className="mt-1">{actionNode}</div>
      </div>
    ) : (
      list
    );
  } else {
    const text = Array.isArray(message) ? message[0] : message;
    messageContent = (
      <p className="font-bold">
        {text}
        {inlineAction}
      </p>
    );
  }

  return (
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
      {messageContent}
    </div>
  );
};
