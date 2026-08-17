---
'@k8o/arte-odyssey': patch
---

`props.json` に `@k8o/arte-odyssey/ai`（Conversation / Message / PromptInput / Reasoning / Suggestion / ToolInvocation）と `@k8o/arte-odyssey/ai/response`（Response）の props を追加しました。extract-props がルートエントリしか見ておらず、AI コンポーネントだけ型からの props 生成の対象外になっていました。ドキュメントサイトの AI チャットページにも生成された props テーブルを掲載しています。
