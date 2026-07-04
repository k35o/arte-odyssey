---
'@k8o/arte-odyssey': minor
---

AI チャット向けのコンポーネント群を追加しました。

サブパス `@k8o/arte-odyssey/ai` から、状態管理や通信を持たない presentational なチャット部品を提供します。`messages.map()` で組み立てる composition 駆動の API で、AI SDK でも自前実装でも接続できます。

- `Conversation`（`Root` / `Messages` / `ScrollButton`）: stick-to-bottom スクロールと「最新へ」ボタン。`role="log"` と `aria-busy` でストリーミングを支援。
- `Message`（`Root` / `Content`）: `from` で user / assistant を切り替える吹き出し。`isStreaming` で点滅カーソル。
- `PromptInput`（`Root` / `Textarea` / `Submit`）: IME 変換確定の Enter では送信しない入力欄。`status` に応じて送信 / 停止を切り替え。
- `ToolInvocation` / `Reasoning`: ツール呼び出しと思考過程の折りたたみ表示。
- `Suggestion`（`List` / `Item`）: サジェストチップ。

加えて 2 つのサブパスを追加しました。

- `@k8o/arte-odyssey/ai/response`: ストリーミング対応の Markdown レンダラ `Response`。`streamdown` を optional peer として利用（未クローズのコードブロック等にも耐える）。
- `@k8o/arte-odyssey/ai-sdk`: AI SDK の `UIMessage.parts` を各コンポーネントに対応付ける `mapMessageParts`。`ai` を optional peer として利用。

`streamdown` と `ai` はいずれも optional peerDependency のため、該当サブパスを使う場合のみインストールが必要です。

あわせて、`Avatar` に `icon?: ReactNode` と `color?: 'base' | 'primary' | 'secondary'` を追加しました。画像・イニシャルに加えてアイコンをアバターとして表示でき（優先度は `src`(画像) > `icon` > イニシャル）、`color` で Teal / Cyan のアクセント円にできます。アシスタントの表示などに使えます。アシスタント向けの `AssistantIcon`（Lucide の `bot-message-square`）も追加しています。
