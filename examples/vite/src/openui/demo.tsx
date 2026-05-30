import { library } from '@k8o/arte-odyssey/openui';
import { Renderer } from '@openuidev/react-lang';

/**
 * 公式アダプタ `@k8o/arte-odyssey/openui` の library をそのまま使う。
 * response（OpenUI Lang / DSL）は実運用では LLM がストリーム出力する。
 *
 * 注: OpenUI は型付き子要素。Card は Stack を内包できる（root を Card にして全体を包む）。
 * Stack 自身の入れ子は非対応。引数は位置引数（props 定義順）。
 */
const response = `root = Card("full", "bordered", [main])
main = Stack("column", "lg", null, null, [heading, alert, save, cancel, help, badge, sep, plan, detail, nickname, agree, notify])
heading = Heading("プロフィール設定", "h3")
alert = Alert("info", "この画面は OpenUI Lang から描画されています")
save = Button("保存")
cancel = Button("キャンセル", "outlined", "secondary")
help = Button("ヘルプ", "outlined", "gray", null, null, "https://example.com")
badge = Badge("有効", "success")
sep = Separator()
plan = Select("plan", [{value: "free", label: "Free"}, {value: "pro", label: "Pro"}, {value: "team", label: "Team"}], "pro")
detail = Tabs("詳細", [{label: "概要", content: "OpenUI Lang から Tabs を描画しています。"}, {label: "料金", content: "Pro プランは月額 1,000 円です。"}])
nickname = TextField("nickname", "ニックネーム")
agree = Checkbox("agree", "規約に同意する")
notify = Switch("notify", "通知を受け取る", true)`;

export function OpenUiDemo() {
  return <Renderer library={library} response={response} />;
}
