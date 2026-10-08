"use client";

import { useState } from "react";
import type { MembershipPlan } from "@/lib/membership/plans";

type Props = {
  action: "checkout" | "portal";
  plan?: MembershipPlan;
  label: string;
  csrfToken: string;
};

export function BillingAction({ action, plan, label, csrfToken }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function start() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(action === "checkout" ? "/api/checkout" : "/api/billing/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Membership-CSRF": csrfToken },
        body: JSON.stringify(action === "checkout" ? { plan } : {}),
        credentials: "same-origin",
      });
      const result = await response.json() as { url?: string; code?: string };
      if (!response.ok || !result.url) {
        setError(result.code === "EXISTING_SUBSCRIPTION" || result.code === "PAYMENT_PROCESSING"
          ? "お支払い状況を確認中です。少し待ってからページを更新してください。"
          : "手続きを開始できませんでした。時間をおいて再度お試しください。");
        return;
      }
      const destination = new URL(result.url);
      if (destination.protocol !== "https:" || !destination.hostname.endsWith(".stripe.com")) {
        throw new Error("Unexpected payment destination");
      }
      window.location.assign(destination.toString());
    } catch {
      setError("通信に失敗しました。接続を確認して再度お試しください。");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button type="button" disabled={busy} onClick={start}
        className="border border-neutral-800 bg-neutral-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
        {busy ? "準備しています…" : label}
      </button>
      {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
