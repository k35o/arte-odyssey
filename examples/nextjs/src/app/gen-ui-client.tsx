'use client';

import type { ArteSpec } from '@k8o/arte-odyssey/json-render';
import { JsonRenderUI } from '@k8o/arte-odyssey/json-render/registry';

export function GenUiClient({ spec }: { spec: ArteSpec }) {
  return <JsonRenderUI spec={spec} />;
}
