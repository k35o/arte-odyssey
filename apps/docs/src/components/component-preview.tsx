import type { FC, ReactNode } from 'react';

import { CodeBlock } from './code-block';
import { PreviewArea } from './preview-area';

type Props = {
  children: ReactNode;
  code: string;
  lang?: 'tsx' | 'ts';
};

export const ComponentPreview: FC<Props> = ({
  children,
  code,
  lang = 'tsx',
}) => (
  <div className="dark:border-border-subtle flex flex-col overflow-hidden rounded-xl border border-transparent shadow-sm">
    <PreviewArea>{children}</PreviewArea>
    <CodeBlock code={code} lang={lang} rounded="bottom" />
  </div>
);
