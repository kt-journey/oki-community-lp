# AI Agent Brief: Okey-Dokey LP

Codex / Cursor / Claude Code / Antigravity などが、LPのデザイン・文章ブラッシュアップを安全に続けるための共通ブリーフです。作業前にこの順番で確認し、指定外のファイルは触らないでください。

## 1. 読む順番
1. `AGENTS.md`
2. `docs/requirements-definition.md`
3. `docs/design-system.md`
4. `content/site.ts`
5. `components/landing-page.tsx`

## 2. 対象ファイル
- 文章・CTA・セクション文言: `content/site.ts`
- LP表示構造・セクション配置・既存コンポーネント調整: `components/landing-page.tsx`
- デザイン判断の根拠: `docs/design-system.md`
- 目的・KPI・ページ構成の根拠: `docs/requirements-definition.md`
- AI作業ルールの根拠: `AGENTS.md`

## 3. デザイン禁止事項
- 強い影、多重シャドウ、浮遊カードの多用をしない
- 過度な角丸、丸すぎるバッジやカードを増やさない
- ガラスモーフィズム、`backdrop-filter`、半透明パネルを追加しない
- 不自然なグラデーション、装飾だけの背景図形、意味のないアニメーションを追加しない
- Dribbble的な見栄え優先ではなく、実在サイトのような情報設計を優先する

## 4. 文章トーン
- 日本語のみ
- 誠実、静か、少し熱量がある言葉にする
- 移住者の孤独を煽りすぎず、横のつながりと共創の余白を前向きに伝える
- 公式LINE登録へ自然につながる短い文にする
- 「秘密」は排他性ではなく、仲間内で育つ温かさとして扱う

## 5. 変更時の完了条件
- LPの主目的である公式LINEウェイトリスト登録導線が弱くなっていない
- Hero / Footer CTAの文言とリンク管理が崩れていない
- `content/site.ts` と `components/landing-page.tsx` の内容が矛盾していない
- モバイル表示で文字の重なり、横スクロール、CTAの押しにくさがない
- 変更範囲が依頼されたファイルと目的に収まっている

## 6. 推奨サブエージェント役割
- Requirements Keeper: 要件、KPI、CTA、フェーズ戦略との矛盾を確認する
- UX / IA Designer: セクション順、視線誘導、モバイル導線を確認する
- Copy Editor: 日本語コピーの自然さ、誠実さ、CTAへのつながりを整える
- Frontend Implementer: 既存構造に沿って最小差分で実装する
- QA Reviewer: レスポンシブ、アクセシビリティ、リンク、表示崩れを確認する

## 7. やってはいけないこと
- 既存の未コミット変更や他エージェントの編集を戻さない
- 依頼外のリファクタリング、ファイル整形、ライブラリ追加をしない
- `node_modules`、`.next`、`dist`、`build` を広範囲に読まない
- 生成物やキャッシュを根拠に仕様判断しない
- LP全体のデザイン方針を勝手に変更しない
- 装飾目的だけの要素を追加しない
