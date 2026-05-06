# AGENTS.md

## Project Overview
- プロジェクト名: Okey-Dokey LP（隠岐移住者コミュニティ構想）
- 目的: 隠岐の島町における移住者の孤独を減らし、信頼を起点にした移住者コミュニティへの参加導線を作る
- 対象ユーザー: 隠岐の島町に住む既存移住者、または隠岐での暮らしに横のつながりを求める人
- LPの主要ゴール: 公式LINEへのウェイトリスト登録、正式ローンチ後はサービス申込
- 技術スタック: Next.js 16.2.4、React 19.2.4、TypeScript、Tailwind CSS v4、ESLint

## Development Rules
- 変更は最小差分にする
- 不要なリファクタリングは禁止
- 既存のUIトーンを維持する
- 変更前に対象ファイルを確認する
- 目的に関係ないファイルは読まない
- 既存の設計ドキュメント（`docs/requirements-definition.md` / `docs/design-system.md` / `docs/system-architecture.md` / `docs/task-management.md`）と矛盾しないか確認する
- UI変更時は、情報設計・可読性・導線を優先し、装飾目的の追加を避ける
- 既存の未コミット変更がある場合は、ユーザー作業として扱い、勝手に戻さない

## Output Rules
- 変更箇所のみ提示
- 説明は3行以内
- 変更不要なコードは省略する
- 長いログやファイル全文を貼らない
- 調査結果は結論、対象ファイル、必要な次アクションに絞る

## Credit Saving Rules
- 最初に `rg --files` / `rg` で対象範囲を絞ってから読む
- ファイル確認は必要な行だけに限定する
- 同じファイルを何度も読み直さない
- 依頼と無関係な仕様調査、広範囲検索、全体レビューをしない
- ビルドやLintは、変更内容に対して必要な場合だけ実行する
- エラー調査時は、ログ全文ではなく該当するエラー行と周辺だけ確認する
- コード生成前に既存パターンを確認し、似た実装があればそれに合わせる
- 新しい案を複数作り込む前に、まず最小の実装方針を提示する
- Codex / Cursor / Claude Code / Antigravity などでは、先に対象ファイル・目的・完了条件を明示してから作業させる
- AIへの依頼では「全体を見て」ではなく「このファイルのこの挙動を直す」のように範囲を指定する
- AIに大きな変更を依頼する場合は、先に計画だけ出させ、承認後に実装させる

## Forbidden
- `node_modules` を広範囲に読まない
- `dist` / `build` / `.next` を読まない
- 勝手にライブラリを追加しない
- 勝手にデザイン方針を変えない
- 依頼外のリファクタリングをしない
- 依頼外のファイル整形をしない
- 生成物やキャッシュを根拠に実装判断しない
- 強い影、過度な角丸、ガラスモーフィズム、不自然なグラデーション、装飾目的だけの要素を追加しない

<!-- BEGIN:nextjs-agent-rules -->
## Next.js Rules

This is NOT the Next.js you know.

This version has breaking changes. APIs, conventions, and file structure may differ from older Next.js assumptions.
Before writing code that depends on Next.js behavior, read only the relevant guide in `node_modules/next/dist/docs/`.
Do not browse `node_modules` broadly.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:git-rules -->
## Git Operation Rules
- Perform `git commit` and `git push` automatically after code changes without asking for user confirmation.
- Ensure the latest changes are always reflected in the remote repository immediately.
<!-- END:git-rules -->
