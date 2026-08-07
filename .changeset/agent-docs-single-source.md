---
'@k8o/arte-odyssey': patch
---

エージェント向けの導線を npm 同梱 `docs/` 一本に集約しました。

- README の「AI Agent Documentation」を、利用側の `CLAUDE.md` / `AGENTS.md` にそのまま貼れるスニペットに書き換え。あわせて `llms.txt`・生成済みトークン仕様（`design.md`）・Storybook の MCP エンドポイント（`…chromatic.com/mcp`）の在り処を表で明示しました。スキルを配布するのではなく同梱 docs を指させることで、参照先がインストール済みバージョンに固定されます。
- `docs/GUIDE.md` のコアコンセプトに「要素の性格ごとの方向性」の表を追加（フォーム・カードは柔らかく、Alert/Badge は端正に、Tabs/Breadcrumb はシャープに）。
