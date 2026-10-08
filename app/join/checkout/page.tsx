import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { CheckoutStatus } from "@/components/membership/checkout-status";
import { currentMember } from "@/lib/membership/session";
import { membershipEnabled } from "@/lib/membership/server";

export const dynamic = "force-dynamic";

export default async function CheckoutReturnPage() {
  if (!membershipEnabled) notFound();
  const member = await currentMember((await cookies()).get("membership_session")?.value);
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <p className="mb-5 text-sm font-semibold text-muted">隠岐の島町 移住者コミュニティ</p>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">お支払い状況</h1>
      <div className="border-t border-neutral-300 pt-6 text-base leading-8">
        {!member ? <p>確認にはLINEでのログインが必要です。</p> : member.accessActive ? (
          <p>お支払いを確認しました。会員ページから現在の利用期間をご確認ください。</p>
        ) : (
          <>
            <p>お支払いの確認を待っています。この画面はしばらく自動で更新されます。</p>
            <p className="mt-3 text-sm text-muted">時間がかかる場合は、後ほど会員ページをご確認ください。ここから再決済しないでください。</p>
            <CheckoutStatus />
          </>
        )}
        <Link href="/join" className="mt-8 inline-block underline underline-offset-4">会員ページに戻る</Link>
      </div>
    </main>
  );
}
