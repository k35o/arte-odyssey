'use client';

import type { FC } from 'react';
import { Streamdown } from 'streamdown';

type Props = {
  children: string;
  isStreaming?: boolean;
};

/**
 * ストリーミング対応の Markdown レンダラ。未クローズのコードブロックなど
 * 途中の Markdown も streamdown が破綻なく描画する。
 *
 * このコンポーネントは streamdown（optional peer）に依存する。利用側は
 * `pnpm add streamdown` に加え、`streamdown/styles.css` の読み込みと
 * Tailwind の `@source` 設定が必要。詳細は docs を参照。
 */
export const Response: FC<Props> = ({ children, isStreaming = false }) => (
  <Streamdown
    className="text-fg-base"
    mode={isStreaming ? 'streaming' : 'static'}
    parseIncompleteMarkdown
  >
    {children}
  </Streamdown>
);
