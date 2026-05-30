'use client';

import type { Spec } from '@json-render/core';
import { JSONUIProvider, Renderer } from '@json-render/react';
// クライアント専用の registry（'use client'）。サーバーからは import しない。
import { registry } from '@k8o/arte-odyssey/json-render/registry';

/**
 * クライアントコンポーネント。
 * サーバーから渡された spec（プレーン JSON）を arte-odyssey で描画する。
 */
export function GenUiClient({ spec }: { spec: unknown }) {
  return (
    <JSONUIProvider registry={registry}>
      <Renderer registry={registry} spec={spec as Spec} />
    </JSONUIProvider>
  );
}
