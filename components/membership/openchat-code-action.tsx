"use client";

import { useState } from "react";

type IssuedCode = { code: string; expiresAt: string; inviteUrl: string };

export function OpenChatCodeAction({ csrfToken }: { csrfToken: string }) {
  const [issued, setIssued] = useState<IssuedCode | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function issue() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/openchat/code", {
        method: "POST", headers: { "X-Membership-CSRF": csrfToken },
        credentials: "same-origin",
      });
      const result = await response.json() as IssuedCode & { code: string };
      if (!response.ok) {
        setError(result.code === "RATE_LIMITED"
          ? "発行回数の上限に達しました。1時間後に再度お試しください。"
          : result.code === "REQUEST_EXISTS" ? "参加申請は運営の確認待ちです。"
            : "コードを発行できませんでした。会員資格を確認して再度お試しください。");
        return;
      }
      setIssued(result);
    } catch {
      setError("通信に失敗しました。接続を確認して再度お試しください。");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-5">
      {!issued ? (
        <button type="button" onClick={issue} disabled={busy}
          className="border border-neutral-800 bg-neutral-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
          {busy ? "発行しています…" : "参加確認コードを発行する"}
        </button>
      ) : (
        <div aria-live="polite">
          <p>参加確認コード</p>
          <output className="my-2 block break-all font-mono text-xl font-semibold tracking-wider">{issued.code}</output>
          <p className="text-sm text-muted">有効期限：{new Intl.DateTimeFormat("ja-JP", {
            dateStyle: "long", timeStyle: "short", timeZone: "Asia/Tokyo",
          }).format(new Date(issued.expiresAt))}。再発行すると以前のコードは使えません。</p>
          <p className="mt-4">下記のリンクから参加申請し、承認質問にこのコードを入力してください。</p>
          <a href={issued.inviteUrl} target="_blank" rel="noopener noreferrer"
            className="mt-3 inline-block underline underline-offset-4">LINEオープンチャットで参加申請する</a>
          <p className="mt-3 text-sm text-muted">参加には運営者の承認が必要です。このコードだけでは本人確認は完了しません。</p>
        </div>
      )}
      {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
