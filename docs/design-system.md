# デザインシステム: Okey-Dokey LP

## 1. デザインコンセプト
- テーマ: **Island Meadow & Sun（島の緑と陽だまり — ブライト・エディトリアル）**
- トーン:
  - 明るく風通しがよい（黒ベタや重苦しい暗色ブロックを使わない）
  - 誠実で親しみやすい（20〜50代のUIターン者がフラットに馴染める空気感）
  - カルチャー・ライフスタイル誌のような整理された紙面（余白と1px罫線）
- 引き算のルール（禁止事項）:
  - 白フチ多重シャドウ文字（`text-on-photo`）や手書き風フォントは使わない
  - 点滅・バウンス（`animate-pulse` / `animate-bounce`）、背景のぼかしカラーブロブ（`blur-3xl`）は使わない
  - 極端な角丸（`rounded-[3rem]`）、強いドロップシャドウ、カードから飛び出す巨大アイコンは使わない

## 2. カラーパレット
- **Base Background**: `#FFFFFF`（Pure White / 基本紙面）
- **Sub Surface (Mint Tint)**: `#F0FDF4`（Pale Meadow / セクション背景・強調ボックス）
- **Card Surface**: `#F8FAF9`（Soft Sage White / カード・枠内の背景）
- **Primary Ink (Text)**: `#1E2D28`（Deep Forest Charcoal / 真っ黒を避けた柔らかいチャコール文字）
- **Muted Ink (Sub Text)**: `#4B635B`（Muted Sage / 補足・リード文・キャプション）
- **Border / Rule**: `#D1E5DD`（Hairline Sage / 1pxの区切り罫線・グリッド線）
- **Primary Accent**: `#0D9488`（Island Teal / 隠岐の海と森をつなぐティールグリーン）
- **Sun Point**: `#F97316`（Sun Orange / 陽だまりの温かさを添えるポイントカラー）
- **CTA Action**: `#06C755`（LINE Green / 公式LINE登録ボタン）

## 3. タイポグラフィ
- **Headings**: `Noto Sans JP`（Bold / Black, `letter-spacing: -0.02em`, `line-height: 1.35`）
  - 明朝体ではなく、力強くクリーンなゴシック体で見出しを組み、アクティブで開かれた印象にする
- **Body**: `Noto Sans JP`（Regular / Medium, `line-height: 1.85`）
  - 20〜50代がスマートフォンでも読み疲れしない広めの行間を確保する
- **Index / Meta**: `Space Mono`
  - `01 / PLAY`、`Fig. 01`、`50%`、`¥500 / MONTH` などの番号・数値・メタデータに使用し、エディトリアルなリズムを作る

## 4. コンポーネント・レイアウト指針
- モバイルファーストの12カラム・エディトリアルグリッド
- 写真と文字の分離:
  - 写真の上に無理に文字を重ねて白フチで読ませるのではなく、余白と1px枠線（`border-[#D1E5DD]`）で写真とテキストを美しく並置する
- 角丸と境界線:
  - 角丸は控えめ（`rounded-md` 〜 `rounded-xl` / `6px〜12px`）に統一し、影ではなく1pxの罫線と淡い面塗りで情報をグループ化する
- アセット運用:
  - 外部ストックフォト（Unsplash等）は使用せず、`public/images/oki/` の隠岐の実写素材で統一する
