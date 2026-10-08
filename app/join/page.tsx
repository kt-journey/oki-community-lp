import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { currentMember } from "@/lib/membership/session";
import { membershipEnabled } from "@/lib/membership/server";

export const dynamic = "force-dynamic";

export default async function JoinPage() {
  if (!membershipEnabled) notFound();
  const member = await currentMember((await cookies()).get("membership_session")?.value);

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <p className="mb-5 text-sm font-semibold text-muted">隠岐の島町 移住者コミュニティ</p>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">入会のご案内</h1>
      <div className="border-t border-neutral-300 pt-6 text-base leading-8">
        {member ? (
          <>
            <p>{member.displayName ? `${member.displayName}さん、` : ""}LINEアカウントを確認しました。</p>
            <p className="mt-4">会費のお支払いと参加申請は準備中です。受付開始までは決済されません。</p>
            <form action="/api/auth/logout" method="post" className="mt-8">
              <button className="border border-neutral-700 px-5 py-2 text-sm font-semibold">ログアウト</button>
            </form>
          </>
        ) : (
          <>
            <p>入会受付は準備中です。LINEログイン後も、このページから会費の決済はできません。</p>
            <a className="mt-8 inline-block border border-neutral-700 px-5 py-2 text-sm font-semibold" href="/api/auth/line/start">
              LINEでログイン
            </a>
          </>
        )}
      </div>
    </main>
  );
}
