# 会員機能の開発状態と設定

正本仕様：`/Users/kota/Library/Mobile Documents/iCloud~md~obsidian/Documents/Vault/03_Projects/隠岐移住者コミュニティ/入会管理システム_実装用技術仕様書.md`

## 現在の状態

- DB初期・課金・OpenChatコードのマイグレーション、LINE Login、会員セッション、Stripe Checkout、Webhook、支払済み期限の更新、Stripe Customer Portal、`/join`の状態表示まで実装。
- 有効会員向けOpenChat申請コードの発行と、期限切れのコード失効・退出待ち登録処理を実装。管理者のコード照合・承認台帳、定期実行設定、日次のStripe照合、公式アカウントからの通知は未実装。管理者の承認体制ができるまで`MEMBERSHIP_OPENCHAT_ENABLED`はオフにする。
- 既存LPの無料LINE先行登録には変更を加えていない。会員機能は`MEMBERSHIP_FEATURE_ENABLED=true`、新規申込はさらに`MEMBERSHIP_BILLING_ENABLED=true`かつ`MEMBERSHIP_TERMS_PUBLISHED=true`のときだけ利用可能。既存契約のPortal導線は新規申込停止中も使える。現時点では課金フラグを有効にしない。
- Supabase本番DBへのマイグレーション適用、LINE・Stripeの実接続、決済テストは未実施。販売条件・プライバシーの既存ページはひな形であり、公開前の確定が必要。

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
| `STRIPE_SECRET_KEY` | Stripeサーバー秘密鍵。テスト環境と本番で分離。 |
| `STRIPE_WEBHOOK_SECRET` | この環境のWebhook endpoint署名秘密値。 |
| `STRIPE_PRICE_MONTHLY` | 税込/税務取扱い確定後のJPY 300・月次Price ID。 |
| `STRIPE_PRICE_YEARLY` | 年額導入時のJPY 3,000・年次Price ID。 |
| `STRIPE_PORTAL_CONFIGURATION_ID` | カード更新と期間末解約だけを許可したCustomer Portal設定ID。 |
| `MEMBERSHIP_BILLING_ENABLED` | `true`で新規CheckoutのUI/APIを有効化。通常は未設定。 |
| `MEMBERSHIP_TERMS_PUBLISHED` | 販売条件・解約条件・プライバシー文面を公開し運営者が確認した場合のみ`true`。 |
| `MEMBERSHIP_YEARLY_ENABLED` | 年額の提供が決定した場合のみ`true`。通常は未設定。 |
| `MEMBERSHIP_OPENCHAT_ENABLED` | 管理者の照合・承認体制が完成した場合のみ`true`。通常は未設定。 |
| `OPENCHAT_INVITE_URL` | LINE上のOpenChatからコピーしたHTTPS招待URL。会員資格確認後にのみ応答。 |
| `OPENCHAT_CODE_HMAC_KEY` | コードのHMAC用秘密値。32バイト以上。StripeやLINEの秘密値と共用しない。変更すると既発行コードは照合不能になる。 |
| `MEMBERSHIP_JOB_SECRET` | 期限切れ処理用の32バイト以上のBearer秘密値。定期実行環境にだけ渡す。 |

## セットアップ順

1. LINE Loginと公式アカウントのMessaging APIチャンネルを同一プロバイダー配下に設定し、友だち追加オプションを連携する。
2. Supabaseで`supabase/migrations/20261008000000_membership_foundation.sql`、`20261008010000_membership_billing.sql`、`20261008020000_openchat_code_and_expiry.sql`の順にレビューして適用する。RLS・関数の実行権限を確認する。
3. LINE LoginのCallback URLを`{MEMBERSHIP_APP_URL}/api/auth/line/callback`に登録する。
4. テスト環境の秘密値を設定してフラグを有効化し、ログイン・ログアウト・セッション期限を検証する。
5. Stripe Priceを月額300円で作成する。年額を提供する場合のみ年額3,000円のPriceも作成する。通貨JPY、繰り返し間隔、数量1、カード決済、税額・手数料の設定を確認する。
6. Customer Portalを作成し、期間末解約とカード更新のみを有効にする。Stripe Webhookには`/api/stripe/webhook`を登録し、`checkout.session.completed`、`checkout.session.expired`、`invoice.paid`、`invoice.payment_failed`、`customer.subscription.created/updated/deleted`、`charge.refunded`、`charge.dispute.created`を購読する。SDKとWebhookイベントのAPIバージョンを`2026-09-30.endive`に合わせる。
7. テストモードで初回決済、二重送信、更新支払、失敗、期間末解約、全額・部分返金、Dispute、Webhookの重複・順不同を確認する。`checkout.session.completed`だけでは資格が付かず、正しい`invoice.paid`のみで`access_paid_until`が延びることを確認する。
8. 販売条件・プライバシー文面、OpenChat承認体制、期限切れ処理、問い合わせ先、運用監視を完成させた後に課金フラグを有効化する。
9. OpenChatを「参加の承認」に設定し、質問を「会員ページの参加確認コードを入力してください」とする。URLと管理者権限を実機で確認する。コード照合・承認記録の管理画面が完成するまで、OpenChat表示フラグを有効化しない。
10. 期限切れ処理は`POST /api/internal/openchat/expire`へ`Authorization: Bearer <MEMBERSHIP_JOB_SECRET>`を付けて呼ぶ。定期実行基盤への登録、失敗監視、翌営業日までの手動退出担当は未設定。これらの確定後に日次実行する。

## 現段階の運用上の制約

- Webhookは署名検証後にDBへ保存し、イベントIDの行ロックで同期処理する。処理失敗はHTTP 503としてStripe再送を受ける。`stripe_events`の`failed`や長時間`processing`の行を運営者が監視・再実行する仕組みは次フェーズで必要。
- 返金・Dispute・即時解約では資格を保留にし、未使用コードを失効、承認済みのOpenChat台帳を退出待ちにする。ただしLINE上での退出は手動。解除も管理者による審査が必要。
- 期限切れの資格判定は読み取り時に即時反映される。OpenChat台帳を退出待ちへ移すDB関数と認証付きAPIはあるが、定期呼び出しは未設定。LINE上の退出は運営者が手動で行う。
- 申請コードは20文字・24時間有効・会員ごとに1時間3回まで。DBにはHMACのみ保存し、平文は発行時の応答だけに含める。再発行で旧コードを失効させる。現在は管理者照合機能がないため、運用を開始しない。
- CheckoutとPortalは同一Origin、会員セッション、セッションに結び付いたCSRF tokenを要求する。会員ごとのDBレート制限はCheckoutが10分に6回、Portalが1時間に12回。
