import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { currentMember } from "@/lib/membership/session";
import { membershipBillingEnabled, membershipEnabled, membershipOpenChatEnabled } from "@/lib/membership/server";
import { BillingAction } from "@/components/membership/billing-action";
import { OpenChatCodeAction } from "@/components/membership/openchat-code-action";
import { billingCsrfToken } from "@/lib/membership/csrf";

export const dynamic = "force-dynamic";

export default async function JoinPage() {
  if (!membershipEnabled) notFound();
  const sessionToken = (await cookies()).get("membership_session")?.value;
  const member = await currentMember(sessionToken);
  const csrfToken = member && sessionToken ? billingCsrfToken(sessionToken) : "";

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <p className="mb-5 text-sm font-semibold text-muted">隠岐の島町 移住者コミュニティ</p>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">入会のご案内</h1>
      <div className="border-t border-neutral-300 pt-6 text-base leading-8">
        {member ? (
          <>
            <p>{member.displayName ? `${member.displayName}さん、` : ""}LINEアカウントを確認しました。</p>
            {!membershipBillingEnabled && !member.subscriptionStatus ? (
              <p className="mt-4">会費のお支払いと参加申請は準備中です。受付開始までは決済されません。</p>
            ) : member.accessActive ? (
              <section className="mt-8 border-t border-neutral-200 pt-6" aria-label="会員資格">
                <h2 className="text-xl font-semibold">会員資格は有効です</h2>
                <p className="mt-2">お支払い済みの利用期限：{new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", dateStyle: "long" }).format(new Date(member.paidUntil!))}</p>
                {member.cancelAtPeriodEnd && <p>期間末で解約予定です。</p>}
                {membershipOpenChatEnabled ? (
                  member.openchatStatus === "approved" ? <p className="mt-4">運営記録では参加承認済みです。</p>
                    : member.openchatStatus === "pending" ? <p className="mt-4">参加申請は運営の確認待ちです。</p>
                      : member.openchatStatus === "removal_due" ? <p className="mt-4">参加状態を運営が確認中です。</p>
                        : <OpenChatCodeAction csrfToken={csrfToken} />
                ) : <p className="mt-4 text-sm text-muted">オープンチャットの参加申請は準備中です。開始時にご案内します。</p>}
                <div className="mt-6"><BillingAction action="portal" csrfToken={csrfToken} label="お支払い方法・解約を管理" /></div>
              </section>
            ) : member.hasOpenHold ? (
              <section className="mt-8 border-t border-neutral-200 pt-6" aria-label="お支払いの確認">
                <h2 className="text-xl font-semibold">お支払い内容を確認中です</h2>
                <p className="mt-2">現在、会員資格を一時停止しています。運営からの案内をご確認ください。</p>
                {member.subscriptionStatus && <div className="mt-6"><BillingAction action="portal" csrfToken={csrfToken} label="お支払い方法・解約を管理" /></div>}
              </section>
            ) : member.subscriptionStatus && !["canceled", "incomplete_expired"].includes(member.subscriptionStatus) ? (
              <section className="mt-8 border-t border-neutral-200 pt-6" aria-label="決済状況">
                <h2 className="text-xl font-semibold">お支払い状況を確認中です</h2>
                <p className="mt-2">会員資格はまだ有効になっていません。決済済みの場合は再決済せず、しばらくしてから更新してください。</p>
                <div className="mt-6"><BillingAction action="portal" csrfToken={csrfToken} label="お支払い方法・解約を管理" /></div>
              </section>
            ) : !membershipBillingEnabled ? (
              <p className="mt-4">現在、新規の申込受付を停止しています。</p>
            ) : (
              <section className="mt-8 border-t border-neutral-200 pt-6" aria-label="会費のお支払い">
                <h2 className="text-xl font-semibold">会費を選ぶ</h2>
                <p className="mt-2 text-sm text-muted">いずれも自動更新です。期間末解約はお支払い管理画面から行えます。</p>
                <div className="mt-6 grid gap-6 border-b border-neutral-200 pb-6 sm:grid-cols-2">
                  <div><p className="font-semibold">月額 300円</p><p className="mb-3 text-sm">毎月更新</p><BillingAction action="checkout" plan="monthly" csrfToken={csrfToken} label="月額で申し込む" /></div>
                  {process.env.MEMBERSHIP_YEARLY_ENABLED === "true" &&
                    <div><p className="font-semibold">年額 3,000円</p><p className="mb-3 text-sm">12か月ごとに更新</p><BillingAction action="checkout" plan="yearly" csrfToken={csrfToken} label="年額で申し込む" /></div>}
                </div>
                <p className="mt-4 text-sm">申込前に<a href="/legal" className="underline underline-offset-4">販売条件</a>と<a href="/privacy" className="underline underline-offset-4">個人情報の取扱い</a>をご確認ください。</p>
              </section>
            )}
            <form action="/api/auth/logout" method="post" className="mt-8">
              <button className="border border-neutral-700 px-5 py-2 text-sm font-semibold">ログアウト</button>
            </form>
          </>
        ) : (
          <>
            <p>{membershipBillingEnabled ? "会費の申込にはLINEログインが必要です。" : "入会受付は準備中です。LINEログイン後も、このページから会費の決済はできません。"}</p>
            <a className="mt-8 inline-block border border-neutral-700 px-5 py-2 text-sm font-semibold" href="/api/auth/line/start">
              LINEでログイン
            </a>
          </>
        )}
      </div>
    </main>
  );
}
