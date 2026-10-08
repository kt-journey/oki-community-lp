import { createHash } from "node:crypto";
import { memberDatabase } from "./server";
import { isMembershipAccessActive } from "./plans";

function sessionHash(token: string): string {
  return `\\x${createHash("sha256").update(token).digest("hex")}`;
}

export type MemberSnapshot = {
  id: string;
  displayName: string | null;
  plan: "monthly" | "yearly" | null;
  paidUntil: string | null;
  subscriptionStatus: string | null;
  cancelAtPeriodEnd: boolean;
  hasOpenHold: boolean;
  accessActive: boolean;
  openchatStatus: "pending" | "approved" | "removal_due" | null;
};

export async function currentMember(token: string | undefined): Promise<MemberSnapshot | null> {
  if (!token || !/^[A-Za-z0-9_-]{64}$/.test(token)) return null;
  const db = memberDatabase();
  const { data: session, error: sessionError } = await db.from("member_sessions")
    .select("member_id,expires_at,revoked_at")
    .eq("token_hash", sessionHash(token)).maybeSingle();
  if (sessionError) throw sessionError;
  if (!session || session.revoked_at || new Date(session.expires_at).getTime() <= Date.now()) return null;

  const { data: member, error: memberError } = await db.from("members")
    .select("id,line_display_name,plan_code,access_paid_until,stripe_subscription_status,cancel_at_period_end")
    .eq("id", session.member_id).single();
  if (memberError || !member) throw memberError ?? new Error("Member missing");
  const { data: hold, error: holdError } = await db.from("membership_holds")
    .select("id").eq("member_id", member.id).is("closed_at", null).limit(1).maybeSingle();
  if (holdError) throw holdError;
  const { data: openchat, error: openchatError } = await db.from("openchat_memberships")
    .select("status").eq("member_id", member.id)
    .in("status", ["pending", "approved", "removal_due"]).maybeSingle();
  if (openchatError) throw openchatError;
  const hasOpenHold = Boolean(hold);
  return {
    id: member.id,
    displayName: member.line_display_name,
    plan: member.plan_code,
    paidUntil: member.access_paid_until,
    subscriptionStatus: member.stripe_subscription_status,
    cancelAtPeriodEnd: member.cancel_at_period_end,
    hasOpenHold,
    accessActive: isMembershipAccessActive(member.access_paid_until, hasOpenHold),
    openchatStatus: openchat?.status ?? null,
  };
}

export async function revokeSession(token: string | undefined): Promise<void> {
  if (!token || !/^[A-Za-z0-9_-]{64}$/.test(token)) return;
  const { error } = await memberDatabase().from("member_sessions")
    .update({ revoked_at: new Date().toISOString() })
    .eq("token_hash", sessionHash(token))
    .is("revoked_at", null);
  if (error) throw error;
}
