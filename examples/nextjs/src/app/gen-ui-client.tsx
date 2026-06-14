'use client';

import type { Spec } from '@json-render/core';
// 事前結線済みコンポーネント（'use client'）。registry の二重渡しや
// JSONUIProvider / Renderer の生 import が不要になる。
import { JsonRenderUI } from '@k8o/arte-odyssey/json-render/registry';

/**
 * クライアントコンポーネント。
 * サーバーから渡された spec（プレーン JSON）を arte-odyssey で描画する。
 */
export function GenUiClient({ spec }: { spec: unknown }) {
  return <JsonRenderUI spec={spec as Spec} />;
}
