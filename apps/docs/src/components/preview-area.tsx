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
    <div className="border-border-mute bg-bg-base flex flex-col border-b">
      {locale === 'ja' && (
        <div className="flex justify-end">
          <WritingModeSwitcher />
        </div>
      )}
      <div
        className={
          isVertical
            ? 'writing-v flex flex-wrap items-center gap-4 p-6 [min-inline-size:24rem]'
            : 'flex flex-wrap items-center gap-4 p-6'
        }
      >
        {children}
      </div>
    </div>
  );
};
