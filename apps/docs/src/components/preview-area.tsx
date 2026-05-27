'use client';

import type { FC, ReactNode } from 'react';

import { useLocale } from '../i18n';
import { useWritingMode } from '../theme/writing-mode-context';
import { WritingModeSwitcher } from './writing-mode-switcher';

type Props = {
  children: ReactNode;
};

export const PreviewArea: FC<Props> = ({ children }) => {
  const { writingMode } = useWritingMode();
  const locale = useLocale();
  const isVertical = locale === 'ja' && writingMode === 'vertical';
  return (
    <div className="border-border-subtle bg-bg-surface relative border-b">
      {locale === 'ja' && (
        <div className="absolute top-2 right-2 z-10">
          <WritingModeSwitcher />
        </div>
      )}
      <div
        className={
          isVertical
            ? 'writing-v flex flex-wrap items-center gap-4 p-6 pt-14 min-inline-96'
            : 'flex flex-wrap items-center gap-4 p-6 pt-14'
        }
      >
        {children}
      </div>
    </div>
  );
};
