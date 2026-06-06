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
main = Stack("column", "lg", null, null, [crumbs, heading, alert, save, cancel, help, badge, prog, table, accordion, sep, plan, size, vol, detail, nickname, agree, notify, pager])
crumbs = Breadcrumb(null, [{label: "Home", href: "/"}, {label: "Profile", current: true}])
heading = Heading("プロフィール設定", "h3")
alert = Alert("info", "この画面は OpenUI Lang から描画されています")
save = Button("保存")
cancel = Button("キャンセル", "outline", "secondary")
help = Button("ヘルプ", "outline", "gray", null, null, "https://example.com")
badge = Badge("有効", "success")
prog = Progress(70, 100, null, "完了度")
table = Table("プラン比較", [{label: "プラン"}, {label: "料金", align: "right"}], [["Free", "¥0"], ["Pro", "¥1,000"]])
accordion = Accordion([{title: "よくある質問", content: "回答テキスト。", defaultOpen: true}])
sep = Separator()
plan = Select("plan", [{value: "free", label: "Free"}, {value: "pro", label: "Pro"}, {value: "team", label: "Team"}], "pro")
size = Radio("size", "サイズ", [{value: "s", label: "S"}, {value: "m", label: "M"}, {value: "l", label: "L"}], "m")
vol = Slider("vol", 50, 0, 100)
detail = Tabs("詳細", [{label: "概要", content: "OpenUI Lang から Tabs を描画しています。"}, {label: "料金", content: "Pro プランは月額 1,000 円です。"}])
nickname = TextField("nickname", "ニックネーム")
agree = Checkbox("agree", "規約に同意する")
notify = Switch("notify", "通知を受け取る", true)
pager = Pagination("page", 5)`;

export function OpenUiDemo() {
  return <Renderer library={library} response={response} />;
}
