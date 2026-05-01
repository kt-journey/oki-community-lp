export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A131A] px-5 py-16 text-[#E0E0E0] md:px-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl">プライバシーポリシー（ひな形）</h1>
        <p className="text-[#E0E0E0]/80">
          本ページは正式文面作成前のひな形です。正式ローンチ前に運用実態に合わせて更新します。
        </p>
        <section className="space-y-2">
          <h2 className="text-xl">1. 取得する情報</h2>
          <p className="text-[#E0E0E0]/80">
            お問い合わせ内容、アクセス解析情報、LINE登録に伴う識別情報等を取得する場合があります。
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-xl">2. 利用目的</h2>
          <p className="text-[#E0E0E0]/80">
            コミュニティ運営、案内連絡、サービス改善および統計分析のために利用します。
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-xl">3. お問い合わせ</h2>
          <p className="text-[#E0E0E0]/80">窓口情報は正式文面で記載します。</p>
        </section>
      </div>
    </main>
  );
}
