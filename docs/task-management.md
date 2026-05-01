# タスク管理: Okey-Dokey LP

## 1. 進行フェーズ
- Phase 0: 初期セットアップ
- Phase 1: LP本体実装
- Phase 2: 計測導入
- Phase 3: 法的ページ実装
- Phase 4: QA/公開準備
- Phase 5: 正式ローンチ移行

## 2. タスクリスト（実装）

### Phase 0: 初期セットアップ
- [ ] Next.js App Routerプロジェクト作成
- [ ] Tailwind CSS導入
- [ ] shadcn/ui初期化
- [ ] フォント（しっぽり明朝 / Noto Sans JP / Space Mono）導入
- [ ] デザイントークン（色・文字）を設定

### Phase 1: LP本体実装
- [ ] セクション構造作成（Hero〜Footer）
- [ ] Heroコピーと背景演出実装
- [ ] Crisisセクションの数値強調（50%）実装
- [ ] Conceptセクション実装
- [ ] Activitiesカード4種実装
- [ ] Co-creationセクション（STATUS: PENDING...）実装
- [ ] Footer CTA実装
- [ ] CTAリンクをLINE URLへ接続（同一URL）

### Phase 2: アニメーション/計測
- [ ] Typed.js風テキスト演出
- [ ] Intersection Observerによるフェードイン
- [ ] ボタンのグリッチ/ノイズホバー
- [ ] フィルムグレイン演出
- [ ] GA4導入
- [ ] GTM導入
- [ ] Meta Pixel導入
- [ ] CTAクリックイベント計測実装

### Phase 3: 法的ページ
- [ ] プライバシーポリシーひな形作成
- [ ] 特定商取引法表記ひな形作成
- [ ] 運営者情報ひな形作成
- [ ] LPフッターへのリンク設置

### Phase 4: QA/公開準備
- [ ] モバイル表示確認（iOS/Android想定）
- [ ] 主要ブラウザ確認（Safari/Chrome）
- [ ] リンク切れ確認（CTA・法的ページ）
- [ ] 計測タグ発火確認（GA4/GTM/Meta）
- [ ] Lighthouse簡易確認（Performance/SEO/Best Practices）
- [ ] 公開手順書更新

### Phase 5: 正式ローンチ移行
- [ ] CTA導線をウェイトリストから申込導線へ切替
- [ ] Hero/主要セクションのコピーを申込訴求向けに更新
- [ ] 計測イベントを申込ファネル中心に再設計
- [ ] 申込完了までの導線テスト（離脱確認含む）
- [ ] ローンチ後のA/Bテスト対象を定義

## 3. 優先順位
- P0:
  - CTA遷移（LINE）を確実に動かす
  - Hero〜Footerの情報導線を完成させる
- P1:
  - 計測タグ導入
  - アニメーション品質向上
- P2:
  - 表現の微調整
  - コピー/素材差し替え運用性の改善
- P3:
  - 正式ローンチ時の申込導線最適化
  - 申込CVR改善施策

## 4. 完了条件（Definition of Done）
- LP全セクションが仕様どおり表示される
- Hero/Footer CTAが `https://lin.ee/TJIOxNu` へ遷移する
- 法的ページ3種へ遷移できる
- GA4/GTM/Metaの計測が確認できる
- モバイル閲覧で致命的な崩れがない

## 5. 正式ローンチ切替の完了条件
- CTAが申込導線に切替済みである
- 申込ファネルの計測イベントが可視化されている
- 旧ウェイトリスト導線への遷移が残っていない
