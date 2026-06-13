// SSG出力(dist/public)をSPAフォールバック付きで配信する検証用サーバ。
// vite preview にはhistoryフォールバックが無いため、モバイル検証スイープで使う。
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = join(import.meta.dirname, '..', 'dist', 'public');
const port = Number(process.env.PORT ?? 4173);

const MIME = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript'],
  ['.mjs', 'text/javascript'],
  ['.css', 'text/css'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.json', 'application/json'],
  ['.woff2', 'font/woff2'],
  ['.png', 'image/png'],
]);

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  let file = normalize(join(root, decodeURIComponent(url.pathname)));
  if (!file.startsWith(root)) {
    res.writeHead(403).end();
    return;
  }
  if (!existsSync(file) || statSync(file).isDirectory()) {
    const indexInDir = join(file, 'index.html');
    file = existsSync(indexInDir) ? indexInDir : join(root, 'index.html');
  }
  res.writeHead(200, {
    'content-type': MIME.get(extname(file)) ?? 'application/octet-stream',
    // 検証用サーバなので鮮度を最優先する
    'cache-control': 'no-store',
  });
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.warn(`serving ${root} on http://localhost:${String(port)}`);
});
