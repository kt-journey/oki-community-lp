# 会員機能の開発状態と設定

正本仕様：`/Users/kota/Library/Mobile Documents/iCloud~md~obsidian/Documents/Vault/03_Projects/隠岐移住者コミュニティ/入会管理システム_実装用技術仕様書.md`

## 現在の状態

- DB初期マイグレーション、LINE Login、会員セッション、`/join`の準備画面まで実装。
- Stripe Checkout、Webhook、資格更新、OpenChat申請コード、管理画面は未実装。
- 既存LPの無料LINE先行登録には変更を加えていない。会員機能は`MEMBERSHIP_FEATURE_ENABLED=true`のときだけ利用可能。実運用の入会受付には使わない。
- Supabase本番DBへのマイグレーション適用、LINEチャンネル連携、決済テストは未実施。

## 設定値

サーバー環境変数として次を設定する。秘密値に`NEXT_PUBLIC_`接頭辞を付けない。`.env.local`等はGitに登録しない。

| 変数 | 用途 |
|---|---|
| `MEMBERSHIP_FEATURE_ENABLED` | `true`で開発用入会ページ・認証APIを有効化。通常は未設定。 |
| `MEMBERSHIP_APP_URL` | このアプリの公開ベースURL。LINEのCallbackと一致するHTTPS URL。ローカルのみ`http://localhost`可。 |
| `LINE_LOGIN_CHANNEL_ID` | LINE LoginチャンネルID。 |
| `LINE_LOGIN_CHANNEL_SECRET` | LINE Loginチャンネルsecret。 |
| `SUPABASE_URL` | SupabaseプロジェクトURL。 |
| `SUPABASE_SECRET_KEY` | サーバー専用secret key。ブラウザーには公開しない。 |
| `STRIPE_SECRET_KEY` | Stripeサーバー秘密鍵。Checkout実装時に使用。 |

## セットアップ順

1. LINE Loginと公式アカウントのMessaging APIチャンネルを同一プロバイダー配下に設定し、友だち追加オプションを連携する。
2. Supabaseで`supabase/migrations/20261008000000_membership_foundation.sql`をレビューして適用する。RLSと権限撤回を確認する。
3. LINE LoginのCallback URLを`{MEMBERSHIP_APP_URL}/api/auth/line/callback`に登録する。
4. テスト環境の秘密値を設定してフラグを有効化し、ログイン・ログアウト・セッション期限を検証する。
5. 決済や有料会員向け公開導線は、仕様書の決定待ちと残りの実装が完了してから有効化する。
