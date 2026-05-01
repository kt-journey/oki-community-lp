# システム構成: Okey-Dokey LP

## 1. 構成概要
- フロントエンド: Next.js（App Router）
- スタイリング: Tailwind CSS
- UI: shadcn/ui
- デプロイ: HTTPS前提の静的/SSRホスティング環境（未確定）

## 2. ディレクトリ方針（例）
- `app/`
  - `page.tsx`（LP本体）
  - `privacy/page.tsx`（プライバシーポリシー）
  - `legal/page.tsx`（特定商取引法表記）
  - `about/page.tsx`（運営者情報）
- `components/`
  - `sections/`（Hero, Crisis, Concept, Activities, Cocreation, FooterCTA）
  - `ui/`（shadcnベースの共通UI）
- `lib/`
  - `analytics/`（GA4, GTM, Meta Pixel連携ユーティリティ）
- `public/`
  - ヒーロー画像/動画など静的アセット

## 3. 外部連携
- 公式LINE遷移先: `https://lin.ee/TJIOxNu`
- 計測:
  - GA4
  - GTM
  - Meta Pixel

## 4. 環境変数設計（例）
- `NEXT_PUBLIC_LINE_URL`
- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`

## 5. アプリケーション仕様
- LPはシングルページで構築
- CTAはHero/Footerで同一URLを参照
- 計測イベント:
  - Hero CTAクリック
  - Footer CTAクリック
  - LINE外部遷移クリック
- Section 1に「独自調査」注記を表示
- プレローンチ/正式ローンチの切替:
  - コンテンツとCTAを設定値で切替できる構造にする
  - ルーティングは維持し、ページ差し替えではなく文言・導線差し替えで対応する

## 6. フェーズ切替設計（推奨）
- 切替方式:
  - `NEXT_PUBLIC_SITE_PHASE=waitlist|apply` のような環境変数でフェーズを制御
- 切替対象:
  - CTA文言
  - CTAリンク先
  - 計測イベント名
  - 一部コピー
- 設計方針:
  - コンテンツ定義ファイル（例: `content/waitlist.ts`, `content/apply.ts`）を用意し差し替える
  - UIコンポーネントは共通利用する

## 7. アニメーション設計
- Typed演出はクライアントコンポーネントで実装
- スクロール出現はIntersection Observerで制御
- グリッチ/ノイズ演出はCSS主体で軽量化

## 8. 法的ページ
- LPフッターから別ページへリンク
- 初期はひな形文面で作成
- 将来的に文面差し替えしやすい構造（セクション分割）にする

## 9. セキュリティ/運用
- HTTPS前提で配信
- 外部スクリプト（計測タグ）はID未設定時に読み込まないガードを実装
- 重要URLはハードコードせず環境変数または定数で一元管理
