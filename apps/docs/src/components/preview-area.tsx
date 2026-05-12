'use client';

import type { FC, ReactNode } from 'react';

import { useLocale } from '../i18n';
import { useWritingMode } from '../theme/writing-mode-context';

type Props = {
  children: ReactNode;
};

export const PreviewArea: FC<Props> = ({ children }) => {
  const { writingMode } = useWritingMode();
  const locale = useLocale();
  const isVertical = locale === 'ja' && writingMode === 'vertical';
  return (
    <div
      className={
        isVertical
          ? 'border-border-mute bg-bg-base writing-v flex flex-wrap items-center gap-4 border-b p-6'
          : 'border-border-mute bg-bg-base flex flex-wrap items-center gap-4 border-b p-6'
      }
    >
      {children}
    </div>
  );
};
