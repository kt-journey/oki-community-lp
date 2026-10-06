# デザインシステム: Okey-Dokey LP

## 1. デザインコンセプト
- テーマ: Quiet Editorial（人のつながりを静かに伝える）
- トーン:
  - 静寂
  - 誠実
  - 余白のある編集感
  - CTAは明確に残す
- 運用方針:
  - リファレンス（いいけん、島根県）の静けさを借りつつ、LINE登録導線は維持する
  - レイアウト基盤とコンポーネント構造は維持し、コピーと一部トーンのみ可変にする

## 2. カラーパレット
- Background: `#FFFFFF`
- Surface Alt: `#F5F6F7`
- Foreground: `#1A1A1A`
- Muted Text: `#5C5C5C`
- Accent: `#E85D04`（強調・番号・重要数字）
- LINE CTA: `#06C755`（CTAボタン専用。他要素では使わない）

### 推奨配色ルール
- 写真に色を任せ、UIアクセントは橙1色に固定する
- 緑はLINE CTAのみ
- 本文は Muted、見出しは Foreground
- 暗背景セクション（Crisis / Co-creation）では白文字＋Accent

## 3. タイポグラフィ
- Headings: Shippori Mincho（Serif）
- Body: Noto Sans JP（Sans-serif）
- Accent script: ta-oonishi（必要時のみ）
- Monospace: Space Mono（番号・STEP表示）

### 文字運用ルール
- H1/H2は明朝で情緒と物語性を演出（過度な `font-black` は避ける）
- 本文は Noto Sans JP で可読性を優先
- 英字の大ラベル（ISLAND RHYTHM 等）は使わず、短い日本語ラベルにする

## 4. コンポーネント指針
- UIライブラリ: Tailwind CSS + shadcn/ui
- 主要コンポーネント:
  - LINE CTAボタン（緑固定）
  - データ強調テキスト（50%）
  - 番号付きリスト（Recommended / Activities）
  - タイムライン（Roadmap）
  - フッターリンク群（法的ページ）

### フェーズ移行を見据えた設計ルール
- CTAボタンは文言・リンク先・イベント名を設定値で差し替え可能にする
- セクション見出しと本文は `content/site.ts` から供給する
- 強調表現（例: 50%）は差し替え可能な実装にする

## 5. エフェクト/モーション
- ヒーロー: 軽い Ken Burns（`hero-image`）
- Intersection Observer によるフェードアップ（`.reveal`）
- Crisis の下線ハイライト（スケールイン）
- pulse / bounce / 過度な hover scale は使わない
- `prefers-reduced-motion` で上記を無効化する

## 6. レイアウト方針
- モバイルファースト
- ヒーロー予算: ブランド / 一句 / 短い補足 / CTA1つ / フルブリード写真
- ヒーロー内にバッジ・特典バー・円バッジを置かない
- セクションは「1目的・1見出し」
- カードは操作が必要なとき以外は使わない
- セクション間余白は多めに取り、読後の呼吸感を作る

## 7. アセット運用
- ヒーローは人物・関係性が伝わる写真を優先する
- 風景写真は補助・背景用途
- 外部ストック（Unsplash等）に依存せず、`public/images/oki/` の本素材を使う

## 8. アクセシビリティ方針
- 写真上のテキストは十分なオーバーレイでコントラストを担保する
- フォーカスリングを明示する（特に CTA）
- `prefers-reduced-motion` に対応する
