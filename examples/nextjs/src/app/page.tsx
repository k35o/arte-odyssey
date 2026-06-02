// ★ Server Component（'use client' なし）。
// サーバー安全な catalog を import して、サーバー上で catalog.prompt() を実行する。
// これが成立する＝ catalog が RSC のサーバー側で使える証拠。
import { catalog } from '@k8o/arte-odyssey/json-render';

import { GenUiClient } from './gen-ui-client';

// 実運用では LLM が生成する spec。ここでは手書き（プレーン JSON）。
const spec = {
  root: 'root',
  elements: {
    root: {
      type: 'Stack',
      props: { direction: 'column', gap: 'lg' },
      children: ['heading', 'alert', 'actions', 'form'],
    },
    heading: {
      type: 'Heading',
      props: { text: 'RSC から描画', level: 'h3' },
      children: [],
    },
    alert: {
      type: 'Alert',
      props: {
        status: 'success',
        message: 'registry はクライアント、catalog はサーバーで動いています',
      },
      children: [],
    },
    actions: {
      type: 'Stack',
      props: { direction: 'row', gap: 'sm' },
      children: ['save', 'help'],
    },
    save: { type: 'Button', props: { label: '保存' }, children: [] },
    help: {
      type: 'Button',
      props: {
        label: 'ヘルプ',
        variant: 'outlined',
        href: 'https://example.com',
      },
      children: [],
    },
    form: {
      type: 'Stack',
      props: { direction: 'column', gap: 'md' },
      children: ['nickname', 'notify'],
    },
    nickname: {
      type: 'TextField',
      props: { name: 'nickname', placeholder: 'ニックネーム' },
      children: [],
    },
    notify: {
      type: 'Switch',
      props: { name: 'notify', label: '通知を受け取る', defaultChecked: true },
      children: [],
    },
  },
};

export default function Home() {
  // ← サーバー上でプロンプト生成（catalog がサーバー安全でないとここで失敗する）
  const systemPrompt = catalog.prompt();
  const promptChars = systemPrompt.length;

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 p-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">
          arte-odyssey × json-render（RSC）
        </h1>
        <p className="text-fg-mute text-sm" data-testid="server-prompt-info">
          サーバーで catalog.prompt() を生成（{promptChars} 文字）。下の UI は
          クライアントの registry で描画。
        </p>
      </div>
      <GenUiClient spec={spec} />
    </div>
  );
}
