'use client';

import type { Spec } from '@json-render/core';
import { JsonRenderUI } from '@k8o/arte-odyssey/json-render/registry';

export function GenUiClient({ spec }: { spec: unknown }) {
  return <JsonRenderUI spec={spec as Spec} />;
}
