import type { MessageKey } from '../types';

export const ja = {
  'nav.home': 'ホーム',
  'nav.getStarted': 'はじめに',
  'nav.components': 'コンポーネント',
  'nav.theming': 'Theming',
  'nav.hooks': 'Hooks',
  'nav.helpers': 'Helpers',
  'home.title': 'ArteOdyssey',
  'home.description': 'k8oで利用するためのReact UIコンポーネントライブラリ',
  'home.github': 'GitHub',
  'home.storybook': 'Storybook',
  'home.featuresTitle': '特徴',
  'home.featureReact': 'React 19',
  'home.featureReactDescription':
    '最新のReact 19で構築。Server Componentsやアクションなど、モダンなパターンに対応しています。',
  'home.featureTailwind': 'Tailwind CSS 4',
  'home.featureTailwindDescription':
    'Tailwind CSS 4 のユーティリティファーストアプローチに統合。ライトモードとダークモードもセマンティックトークンでシームレスに切り替えられます。',
  'home.featureDarkMode': 'ダークモード',
  'home.featureDarkModeDescription':
    'ライトモードとダークモードをシームレスに切り替え。セマンティックトークンが自動で適応します。',
  'home.featureTypeScript': 'TypeScript',
  'home.featureTypeScriptDescription':
    '完全な型定義を提供。エディタの補完とコンパイル時の型チェックで安全に開発できます。',
  'home.featureAccessible': 'アクセシビリティ',
  'home.featureAccessibleDescription':
    'WAI-ARIAパターンに基づき、キーボード操作やスクリーンリーダーに配慮したコンポーネントを目指しています。',
  'home.featureMinimal': '柔と端のデザイン',
  'home.featureMinimalDescription':
    '触れるものは柔らかく、読むものは端正に。余白と形の柔らかさで魅せるUIを提供します。',
  'home.featureVerticalWriting': '縦書き対応',
  'home.featureVerticalWritingDescription':
    '`writing-v` と `vertical:` variant で、縦書きの紙面でも読みやすいレイアウトを実現。日本語ドキュメントを縦書きで体験できます。',
  'common.language': '言語',
  'nav.openMenu': 'メニューを開く',
  'getStarted.introduction':
    'ArteOdysseyは、React 19とTailwind CSS 4で構築されたUIコンポーネントライブラリです。フォームやカードなどユーザーが操作する要素は丸みと余白で親しみやすく、情報を伝える要素はシャープさを保って明確に。穏やかだけど退屈じゃないUIを実現します。',
  'getStarted.installationTitle': 'インストール',
  'getStarted.installationDescription':
    'お好みのパッケージマネージャーでインストールしてください。',
  'getStarted.setupTitle': 'セットアップ',
  'getStarted.setupDescription':
    'インストール後、以下の2つの設定を行ってください。',
  'getStarted.setupCssDescription':
    'CSSファイルをアプリケーションのエントリーポイントでインポートしてください。',
  'getStarted.setupProviderDescription':
    'ArteOdysseyProviderでアプリケーションをラップしてください。',
  'getStarted.usageTitle': '使い方',
  'getStarted.usageDescription':
    'セットアップが完了したら、コンポーネントをインポートして使用できます。',
  'getStarted.requirementsTitle': '動作要件',
  'getStarted.requirementsDescription':
    'ArteOdysseyを使用するには、以下のピア依存関係が必要です。',
  'getStarted.nextStepsTitle': '次のステップ',
  'getStarted.nextStepsComponents':
    'コンポーネント一覧を確認して、使用できるUIパーツを探す',
  'getStarted.nextStepsTheming': 'テーマのカスタマイズ方法を学ぶ',
  'getStarted.nextStepsStorybook':
    'Storybookで各コンポーネントの詳細なドキュメントを確認する',
  'getStarted.packageManagerLabel': 'パッケージマネージャー',
  'components.description': 'ArteOdysseyが提供するUIコンポーネントの一覧です。',
  'components.categoryButtons': 'Buttons',
  'components.categoryNavigation': 'Navigation',
  'components.categoryForms': 'Forms',
  'components.categoryDataDisplay': 'Data Display',
  'components.categoryFeedback': 'Feedback',
  'components.categoryOverlays': 'Overlays',
  'components.categoryLayout': 'Layout',
  'components.categoryMedia': 'Media',
  'components.common.storybookLink': 'Storybookで確認',
  'components.common.importTitle': 'インポート',
  'components.common.usageTitle': '使い方',
  'components.common.propsTitle': 'Props',
  'components.common.inheritsLabel':
    '型ベース（内部で固定する一部 attrs は除外）:',
  'components.button.description':
    'ユーザーのアクションを受け付けるボタンコンポーネントです。',
  'components.button.variantsTitle': 'バリアント',
  'components.button.colorsTitle': 'カラー',
  'components.button.sizesTitle': 'サイズ',
  'components.button.iconsTitle': 'アイコン付き',
  'components.button.fullWidthTitle': 'Full Width',
  'components.button.disabledTitle': '無効',
  'components.button.renderItemTitle': 'リンクとしてレンダリング',
  'components.iconButton.description':
    'アイコンのみのボタンコンポーネントです。',
  'components.iconButton.sizesTitle': 'サイズ',
  'components.iconButton.backgroundsTitle': '背景',
  'components.iconButton.disabledTitle': '無効',
  'components.iconButton.renderItemTitle': 'リンクとしてレンダリング',
  'components.anchor.description': 'テキストリンクコンポーネントです。',
  'components.anchor.openInNewTabTitle': '新しいタブで開く',
  'components.anchor.renderAnchorTitle': 'render prop で要素差し替え',
  'components.anchor.renderAnchorDescription':
    'Next.js の Link や react-router の Link など、フレームワーク固有の anchor コンポーネントに差し替えるには renderAnchor を渡してください。受け取った props はすべて差し替え後の要素にスプレッドしてください。',
  'components.textField.description': 'テキスト入力フィールドです。',
  'components.textField.placeholderTitle': 'プレースホルダー',
  'components.textField.disabledTitle': '無効',
  'components.textField.invalidTitle': 'エラー',
  'components.textarea.description': '複数行テキスト入力フィールドです。',
  'components.textarea.rowsTitle': '行数',
  'components.textarea.autoResizeTitle': '自動リサイズ',
  'components.textarea.disabledTitle': '無効',
  'components.textarea.invalidTitle': 'エラー',
  'components.numberField.description': '数値入力フィールドです。',
  'components.numberField.stepPrecisionTitle': 'ステップと有効数字',
  'components.numberField.minMaxTitle': '最小値 / 最大値',
  'components.numberField.disabledTitle': '無効',
  'components.numberField.invalidTitle': 'エラー',
  'components.select.description': '選択肢から値を選ぶセレクトボックスです。',
  'components.select.disabledTitle': '無効',
  'components.select.invalidTitle': 'エラー',
  'components.select.requiredTitle': '必須',
  'components.select.defaultValueTitle': 'デフォルト値',
  'components.checkbox.description': 'チェックボックスコンポーネントです。',
  'components.checkbox.defaultCheckedTitle': 'デフォルトチェック',
  'components.checkbox.disabledTitle': '無効',
  'components.checkbox.controlledTitle': '制御モード',
  'components.checkboxCard.description':
    '選択肢全体をカードとして提示する複数選択コンポーネントです。',
  'components.checkboxCard.defaultValueTitle': 'デフォルト値',
  'components.switch.description':
    'オン・オフの状態を切り替えるスイッチコンポーネントです。',
  'components.switch.defaultCheckedTitle': 'デフォルトチェック',
  'components.switch.disabledTitle': '無効',
  'components.switch.controlledTitle': '制御モード',
  'components.passwordInput.description':
    '表示切り替えボタン付きのパスワード入力フィールドです。',
  'components.passwordInput.controlledTitle': '制御モード',
  'components.passwordInput.disabledTitle': '無効',
  'components.radio.description': 'ラジオボタングループです。',
  'components.radioGroup.description':
    '排他的に選択するラジオオプション用のグループコンポーネントです。',
  'components.radio.disabledTitle': '無効',
  'components.radio.defaultValueTitle': 'デフォルト値',
  'components.radioCard.description':
    '選択肢全体をカードとして提示する単一選択コンポーネントです。',
  'components.radioCard.defaultValueTitle': 'デフォルト値',
  'components.autocomplete.description':
    '入力補完付きの選択コンポーネントです。',
  'components.autocomplete.disabledTitle': '無効',
  'components.autocomplete.invalidTitle': 'エラー',
  'components.autocomplete.requiredTitle': '必須',
  'components.autocomplete.multipleSelectionTitle': '複数選択',
  'components.slider.description':
    'トラックとハンドルをスタイリングした単一ノブのスライダー入力です。',
  'components.slider.minMaxStepTitle': '最小値 / 最大値 / ステップ',
  'components.slider.disabledTitle': '無効',
  'components.fileField.description': 'ファイルアップロードフィールドです。',
  'components.fileField.acceptTypesTitle': '受け入れタイプ',
  'components.fileField.multipleFilesTitle': '複数ファイル',
  'components.fileField.disabledTitle': '無効',
  'components.fileField.invalidTitle': 'エラー',
  'components.formControl.description':
    'ラベルやエラー表示を提供するフォームコントロールラッパーです。',
  'components.formControl.helpTextTitle': 'ヘルプテキスト',
  'components.formControl.errorTextTitle': 'エラーテキスト',
  'components.formControl.requiredTitle': '必須',
  'components.formControl.disabledTitle': '無効',
  'components.form.description':
    'action prop を受け付け、Async React の form action パターンで送信を扱うフォームラッパーです。',
  'components.form.actionStateTitle': 'useActionState と組み合わせる',
  'components.accordion.description': '折りたたみ可能なコンテンツパネルです。',
  'components.accordion.defaultOpenTitle': 'デフォルトで開く',
  'components.avatar.description':
    'フォールバック表示付きのプロフィール画像コンポーネントです。',
  'components.avatar.withImageTitle': '画像付き',
  'components.avatar.sizesTitle': 'サイズ',
  'components.badge.description':
    'ステータスやカテゴリを表すコンパクトなラベルです。',
  'components.badge.tonesTitle': 'トーン',
  'components.badge.variantsTitle': 'バリアント',
  'components.badge.interactiveTitle': 'インタラクティブ',
  'components.card.description': 'コンテンツをグループ化するカードです。',
  'components.card.widthTitle': 'Width',
  'components.code.description': 'インラインコード表示コンポーネントです。',
  'components.code.colorDetectionTitle': 'カラー検出',
  'components.table.description':
    '意味論を保ったまま横スクロールにも対応するテーブルコンポーネントです。',
  'components.table.emptyStateTitle': '空状態',
  'components.listBox.description':
    'ドロップダウン形式のリスト選択コンポーネントです。',
  'components.baselineStatus.description':
    'Web機能のブラウザサポート状況を表示するコンポーネントです。',
  'components.baselineStatus.differentFeaturesTitle': '様々な機能',
  'components.progress.description': '進捗バーコンポーネントです。',
  'components.progress.differentValuesTitle': '異なる値',
  'components.progress.withLabelTitle': 'ラベル付き',
  'components.heading.description': '見出しコンポーネントです。',
  'components.heading.typesTitle': 'タイプ',
  'components.heading.lineClampTitle': '行数制限',
  'components.alert.description':
    'ステータスに応じたメッセージを表示するアラートです。',
  'components.alert.statusesTitle': 'ステータス',
  'components.skeleton.description':
    '読み込み前のコンテンツを表すプレースホルダーです。',
  'components.skeleton.shapesTitle': '形状',
  'components.skeleton.sizesTitle': 'サイズ',
  'components.skeleton.animationTitle': 'アニメーション',
  'components.spinner.description': 'ローディングスピナーです。',
  'components.spinner.sizesTitle': 'サイズ',
  'components.toast.description':
    '一時的な通知メッセージを表示するトーストです。',
  'components.tooltip.description':
    'ホバー時に補足情報を表示するツールチップです。',
  'components.dialog.description': 'ダイアログコンポーネントです。',
  'components.drawer.description': '画面端からスライドインするドロワーです。',
  'components.modal.description': 'モーダルダイアログコンポーネントです。',
  'components.popover.description':
    '要素に紐づくフローティングコンテンツです。',
  'components.dropdownMenu.description':
    'ドロップダウンメニューコンポーネントです。',
  'components.dropdownMenu.iconTriggerTitle': 'アイコントリガー',
  'components.separator.description': '区切り線コンポーネントです。',
  'components.separator.orientationsTitle': '方向',
  'components.separator.colorsTitle': 'カラー',
  'components.tabs.description': 'タブ切り替えコンポーネントです。',
  'components.tabs.defaultSelectedTitle': 'デフォルト選択',
  'components.breadcrumb.description': 'ナビゲーションのパンくずリストです。',
  'components.breadcrumb.sizesTitle': 'サイズ',
  'components.pagination.description':
    '前後のページ移動と現在位置を示すシンプルなページネーションです。',
  'components.pagination.disabledTitle': '無効',
  'components.scrollLinked.description':
    'スクロール位置に連動するプログレスバーです。',
  'components.icons.description':
    'ArteOdysseyが提供するアイコンコンポーネントの一覧です。',
  'components.icons.sizesTitle': 'サイズ',
  'components.errorBoundary.description':
    'エラーバウンダリコンポーネントです。',
  'components.common.basicUsageTitle': '基本的な使い方',
  'components.modal.typesTitle': 'タイプ',
  'components.toast.useToastTitle': 'useToastフック',
  'components.errorBoundary.fallbackRenderTitle': 'リセット付きフォールバック',
  'components.popover.placementTitle': '配置',
  'components.tooltip.placementTitle': '配置',
  'components.listBox.sizesTitle': 'サイズ',
  'components.listBox.triggerIconTitle': 'TriggerIcon',
  'components.modal.defaultOpenTitle': 'デフォルトで開く',
  'components.dropdownMenu.sizesTitle': 'サイズ',
  'components.dropdownMenu.placementTitle': '配置',
  'components.drawer.customContentTitle': 'カスタムコンテンツ',
  'components.dialog.alertDialogTitle': 'アラートダイアログ',
  'components.alert.multipleMessagesTitle': '複数メッセージ',
  'components.accordion.multipleDefaultOpenTitle': '複数デフォルトで開く',
  'components.breadcrumb.currentPageTitle': '現在のページ',
  'components.toast.closeAllTitle': 'すべて閉じる',
  'components.scrollLinked.windowScrollTitle': 'ウィンドウスクロール',
  'components.errorBoundary.fallbackComponentTitle': 'FallbackComponent',
  'components.errorBoundary.resetKeysTitle': 'リセットキー',
  'hooks.description': 'ArteOdysseyが提供するカスタムフックの一覧です。',
  'hooks.categoryDomInteraction': 'DOM操作',
  'hooks.categoryStateStorage': '状態・ストレージ',
  'hooks.categoryTiming': 'タイミング',
  'hooks.categoryUtility': 'ユーティリティ',
  'hooks.categoryObserver': 'オブザーバー',
  'hooks.common.importTitle': 'インポート',
  'hooks.common.usageTitle': '使い方',
  'hooks.common.basicUsageTitle': '基本的な使い方',
  'hooks.common.parametersTitle': 'パラメーター',
  'hooks.common.returnValueTitle': '戻り値',
  'hooks.useClickAway.description':
    '指定した要素の外側でのクリックを検出するフックです。',
  'hooks.useClient.description':
    'クライアント側で実行されているかどうかを返すフックです。',
  'hooks.useClipboard.description':
    'クリップボードの読み書き操作を提供するフックです。',
  'hooks.useHash.description': 'URLハッシュを追跡し変更に反応するフックです。',
  'hooks.useInterval.description':
    '一定間隔でコールバックを実行するフックです。',
  'hooks.useLocalStorage.description':
    'localStorageに状態を永続化し、タブ間で同期するフックです。',
  'hooks.useLocalStorage.removeTitle': '値の削除',
  'hooks.useSessionStorage.description':
    'sessionStorageに状態を永続化するフックです。',
  'hooks.useSessionStorage.removeTitle': '値の削除',
  'hooks.useResize.description':
    'ResizeObserverで要素のサイズ変更を監視するフックです。',
  'hooks.useScrollDirection.description':
    '現在のスクロール方向を検出するフックです。',
  'hooks.useScrollDirection.targetTitle': '要素を指定する',
  'hooks.useScrollDirection.bodyNotScrollableNote':
    'このページのbodyはスクロールしないため、ここでは動作を試せません。実際のスクロール可能なページでご確認ください。',
  'hooks.useStep.description':
    'キーボードサポート付きのステップベースナビゲーションフックです。',
  'hooks.useTimeout.description':
    '指定した遅延後にコールバックを実行するフックです。',
  'hooks.useWindowResize.description':
    'ウィンドウリサイズイベントを監視するフックです。',
  'hooks.useBreakpoint.description':
    'ビューポートが指定したブレイクポイントに一致するかを判定するフックです。',
  'hooks.useDebouncedTransition.description':
    'startTransitionとAbortControllerを組み合わせ、delay経過後にアクションを実行するフックです。',
  'hooks.useDeferredDebounce.description':
    'useDeferredValueをラップし、値とペンディング状態を返すフックです。',
  'hooks.useDisclosure.description':
    'open・close・toggleアクションで開閉状態を管理するフックです。',
  'hooks.useIntersectionObserver.description':
    'IntersectionObserverで要素の可視状態を監視するフックです。',
  'hooks.useInView.description':
    '要素がビューポート内に表示されているかどうかを返すフックです。',
  'hooks.useWindowSize.description': '現在のウィンドウサイズを返すフックです。',
  'hooks.useScrollLock.description':
    'bodyまたは指定した要素のスクロールをロック・アンロックするフックです。',
  'hooks.useScrollLock.targetTitle': '要素を指定する',
  'hooks.useScrollLock.bodyNotScrollableNote':
    'このページのbodyはスクロールしないため、ここでは動作を試せません。実際のスクロール可能なページでご確認ください。',
  'hooks.useHover.description': '要素のホバー状態を検出するフックです。',
  'hooks.useControllableState.description':
    'controlled/uncontrolledコンポーネントの状態を管理するフックです。',
  'hooks.useWritingMode.description':
    '要素のwriting-modeを監視し、horizontalかverticalを返すフックです。',
  'helpers.description': 'ArteOdysseyが提供するヘルパー関数の一覧です。',
  'helpers.categoryStyling': 'スタイリング',
  'helpers.categoryReact': 'React',
  'helpers.common.importTitle': 'インポート',
  'helpers.common.usageTitle': '使い方',
  'helpers.common.basicUsageTitle': '基本的な使い方',
  'helpers.common.parametersTitle': 'パラメーター',
  'helpers.common.returnValueTitle': '戻り値',
  'helpers.cn.description':
    'clsxとtailwind-mergeを組み合わせたクラス名ユーティリティです。',
  'helpers.mergeRefs.description':
    '複数のrefを1つの要素に結合するユーティリティです。',
  'helpers.mergeProps.description':
    'classNameやイベントハンドラを適切にマージしながら、複数のpropsを合成するユーティリティです。',
  'helpers.chain.description':
    '複数の関数を順番に呼び出す関数を作るユーティリティです。',
  'helpers.createSafeContext.description':
    'Provider外でアクセスされた場合に明確にthrowするContextを作成するユーティリティです。',
  'theming.introduction':
    'ArteOdysseyは、CSS変数ベースのデザイントークンシステムを使用しています。ライトモードとダークモードの両方に対応し、カスタマイズが容易です。',
  'theming.colorPaletteTitle': 'カラーパレット',
  'theming.colorPaletteDescription':
    '10色のベースカラーファミリーがあり、各色に50〜900の10段階のシェードが用意されています。',
  'theming.semanticColorsTitle': 'セマンティックカラー',
  'theming.semanticColorsDescription':
    'ベースカラーをもとにした用途別のカラートークンです。テーマ切り替え時に自動的に適切な値に変わります。',
  'theming.foregroundTitle': '前景色（Foreground）',
  'theming.backgroundTitle': '背景色（Background）',
  'theming.borderTitle': 'ボーダー（Border）',
  'theming.brandColorsTitle': 'ブランドカラー',
  'theming.brandColorsDescription':
    'PrimaryはTeal、SecondaryはCyanをベースとしたブランドカラーです。',
  'theming.typographyTitle': 'タイポグラフィ',
  'theming.typographyDescription':
    'テキストサイズ、フォントウェイト、レタースペーシング、行の高さのデザイントークンです。',
  'theming.textSizesTitle': 'テキストサイズ',
  'theming.fontWeightsTitle': 'フォントウェイト',
  'theming.letterSpacingTitle': 'レタースペーシング',
  'theming.lineHeightTitle': '行の高さ',
  'theming.shadowTitle': 'シャドウ',
  'theming.shadowDescription': 'ボックスシャドウのデザイントークンです。',
  'theming.borderRadiusTitle': 'ボーダーラディウス',
  'theming.borderRadiusDescription': '角丸のデザイントークンです。',
  'theming.darkModeTitle': 'ダークモード',
  'theming.darkModeDescription':
    'ルート要素にdarkクラスを追加することで、ダークモードが有効になります。セマンティックカラートークンは自動的にダークモード用の値に切り替わります。',
  'theming.spacingTitle': 'スペーシング',
  'theming.spacingDescription':
    'スペーシングスケールです。基本単位は0.25rem（4px）で、p-{n}やgap-{n}はn × 0.25remに計算されます。',
  'theming.breakpointsTitle': 'ブレイクポイント',
  'theming.breakpointsDescription': 'レスポンシブブレイクポイントです。',
  'theming.zIndexTitle': 'Z-Index レイヤ',
  'theming.zIndexDescription':
    'オーバーレイ系コンポーネントの重なり順を定義する 3 層スケールです。trigger に紐付く浮遊 UI（Popover / DropdownMenu / ListBox / Tooltip）はoverlay、Modal / Drawer はmodal、Toast はtoastに配置されます。',
  'sideNav.openNavigation': 'ナビゲーションを開く',
  'common.switchToDarkMode': 'ダークモードに切り替え',
  'common.switchToLightMode': 'ライトモードに切り替え',
  'common.switchToVerticalWriting': '縦書きプレビューに切り替え',
  'common.switchToHorizontalWriting': '横書きプレビューに切り替え',
  'error.title': '問題が発生しました',
  'error.description': '予期しないエラーが発生しました。',
  'error.retry': '再読み込み',
} as const satisfies Record<MessageKey, string>;
