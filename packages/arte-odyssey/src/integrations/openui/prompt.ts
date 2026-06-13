import type { PromptOptions } from '@openuidev/lang-core';

import { buildArteOdysseyLibrary } from '../_shared/openui-defs';

/**
 * `@k8o/arte-odyssey/openui/prompt`（サーバー安全）
 *
 * OpenUI のシステムプロンプトを生成するためだけのエントリ。React にも描画
 * コードにも依存しないので、RSC のサーバーコンポーネントや API ルートから
 * import して呼べる（json-render の `catalog.prompt()` と対称）。
 *
 * 実際の描画は 'use client' な `@k8o/arte-odyssey/openui`（library）を使う。
 *
 * @example
 * import { prompt } from '@k8o/arte-odyssey/openui/prompt';
 * const systemPrompt = prompt();
 */
const promptLibrary = buildArteOdysseyLibrary({});

export const prompt = (options?: PromptOptions): string =>
  promptLibrary.prompt(options);
