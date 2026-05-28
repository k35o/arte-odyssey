import type { ReactNode } from 'react';

import './styles/globals.css';

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>ArteOdyssey</title>
        <meta
          content="ArteOdyssey - React UI Component Library"
          name="description"
        />
        <script>
          {`const raw = localStorage.getItem('arte-odyssey-theme');
let t = null;
try { t = raw ? JSON.parse(raw) : null; } catch { t = raw; }
// 旧 sepia 値は廃止されたため light として扱う
if (t === 'dark' || ((t !== 'light') && matchMedia('(prefers-color-scheme:dark)').matches)) {
  document.documentElement.classList.add('dark');
}`}
        </script>
      </head>
      <body className="bg-bg-surface text-fg-base">{children}</body>
    </html>
  );
}
