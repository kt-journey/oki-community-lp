export type MembershipPlan = "monthly" | "yearly";

export function isMembershipPlan(value: unknown): value is MembershipPlan {
  return value === "monthly" || value === "yearly";
}

export function isMembershipAccessActive(
  paidUntil: string | null,
  hasOpenHold: boolean,
  now = new Date(),
): boolean {
  if (!paidUntil || hasOpenHold) return false;
  const expiry = new Date(paidUntil);
  return Number.isFinite(expiry.getTime()) && expiry.getTime() > now.getTime();
}
