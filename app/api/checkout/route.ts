import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";
import { validateCheckoutPrice, priceIdForPlan } from "@/lib/membership/billing";
import { isMembershipPlan } from "@/lib/membership/plans";
import { currentMember } from "@/lib/membership/session";
import { validBillingCsrfToken } from "@/lib/membership/csrf";
import { memberDatabase, membershipBaseUrl, membershipBillingEnabled, stripeClient } from "@/lib/membership/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!membershipBillingEnabled) return new Response("Not Found", { status: 404 });
  if (request.headers.get("origin") !== membershipBaseUrl().origin) {
    return Response.json({ code: "INVALID_ORIGIN" }, { status: 403 });
  }
  const sessionToken = request.cookies.get("membership_session")?.value;
  if (!validBillingCsrfToken(sessionToken, request.headers.get("x-membership-csrf"))) {
    return Response.json({ code: "INVALID_CSRF" }, { status: 403 });
  }
  const member = await currentMember(sessionToken);
  if (!member) return Response.json({ code: "UNAUTHORIZED" }, { status: 401 });
  if (member.accessActive) return Response.json({ code: "ALREADY_ACTIVE" }, { status: 409 });

  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ code: "INVALID_INPUT" }, { status: 400 }); }
  const plan = typeof body === "object" && body !== null && "plan" in body ? body.plan : undefined;
  if (!isMembershipPlan(plan) || (plan === "yearly" && process.env.MEMBERSHIP_YEARLY_ENABLED !== "true")) {
    return Response.json({ code: "INVALID_PLAN" }, { status: 400 });
  }

  try {
    const db = memberDatabase();
    const { data: allowed, error: throttleError } = await db.rpc("claim_member_action", {
      p_member_id: member.id, p_action: "checkout", p_limit: 6, p_window_seconds: 600,
    });
    if (throttleError) throw throttleError;
    if (!allowed) return Response.json({ code: "RATE_LIMITED" }, { status: 429 });
    const stripe = stripeClient();
    const { data: record, error: recordError } = await db.from("members")
      .select("id,stripe_customer_id,stripe_subscription_id,stripe_subscription_status")
      .eq("id", member.id).single();
    if (recordError || !record) throw recordError ?? new Error("Member missing");
    if (record.stripe_subscription_id
      && !["canceled", "incomplete_expired"].includes(record.stripe_subscription_status ?? "")) {
      return Response.json({ code: "EXISTING_SUBSCRIPTION" }, { status: 409 });
    }

    const priceId = priceIdForPlan(plan);
    validateCheckoutPrice(await stripe.prices.retrieve(priceId), plan);

    let customerId: string = record.stripe_customer_id ?? "";
    if (!customerId) {
      const customer = await stripe.customers.create(
        { metadata: { member_id: member.id } },
        { idempotencyKey: `membership-customer-${member.id}` },
      );
      const { data: updated, error } = await db.from("members")
        .update({ stripe_customer_id: customer.id, updated_at: new Date().toISOString() })
        .eq("id", member.id).is("stripe_customer_id", null)
        .select("stripe_customer_id").maybeSingle();
      if (error) throw error;
      if (updated) customerId = updated.stripe_customer_id;
      else {
        const { data: refreshed, error: refreshError } = await db.from("members")
          .select("stripe_customer_id").eq("id", member.id).single();
        if (refreshError || !refreshed?.stripe_customer_id) throw refreshError ?? new Error("Customer binding missing");
        customerId = refreshed.stripe_customer_id;
      }
    }
    const customer = await stripe.customers.retrieve(customerId);
    if (customer.deleted || customer.metadata.member_id !== member.id) {
      throw new Error("Stripe Customer does not match member");
    }
    const subscriptions = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 10 });
    if (subscriptions.has_more || subscriptions.data.some((sub) =>
      !["canceled", "incomplete_expired"].includes(sub.status))) {
      return Response.json({ code: "EXISTING_SUBSCRIPTION" }, { status: 409 });
    }

    const { data: existing, error: existingError } = await db.from("checkout_attempts")
      .select("id,plan_code,stripe_checkout_session_id,idempotency_key,status,created_at")
      .eq("member_id", member.id).in("status", ["creating", "open"])
      .maybeSingle();
    if (existingError) throw existingError;
    let attempt = existing;
    if (attempt && attempt.plan_code !== plan) {
      return Response.json({ code: "CHECKOUT_IN_PROGRESS" }, { status: 409 });
    }
    if (attempt?.stripe_checkout_session_id) {
      const session = await stripe.checkout.sessions.retrieve(attempt.stripe_checkout_session_id);
      if (session.status === "open" && session.url) {
        return Response.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
      }
      const { error: closeError } = await db.from("checkout_attempts")
        .update({ status: session.status === "complete" ? "completed" : "expired" })
        .eq("id", attempt.id);
      if (closeError) throw closeError;
      if (session.status === "complete") {
        return Response.json({ code: "PAYMENT_PROCESSING" }, { status: 409 });
      }
      attempt = null;
    }
    if (attempt && Date.now() - new Date(attempt.created_at).getTime() > 24 * 60 * 60 * 1000) {
      const { error: staleError } = await db.from("checkout_attempts")
        .update({ status: "failed" }).eq("id", attempt.id);
      if (staleError) throw staleError;
      attempt = null;
    }
    if (!attempt) {
      const { data: inserted, error } = await db.from("checkout_attempts")
        .insert({ member_id: member.id, plan_code: plan, idempotency_key: randomUUID() })
        .select("id,plan_code,stripe_checkout_session_id,idempotency_key,status,created_at").single();
      if (error || !inserted) {
        if (error?.code === "23505") return Response.json({ code: "CHECKOUT_IN_PROGRESS" }, { status: 409 });
        throw error ?? new Error("Checkout reservation missing");
      }
      attempt = inserted;
    }

    const base = membershipBaseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      client_reference_id: member.id,
      line_items: [{ price: priceId, quantity: 1 }],
      allowed_payment_method_types: ["card"],
      allow_promotion_codes: false,
      automatic_tax: { enabled: false },
      subscription_data: { metadata: { member_id: member.id } },
      metadata: { member_id: member.id, checkout_attempt_id: attempt.id },
      success_url: new URL("/join/checkout?session_id={CHECKOUT_SESSION_ID}", base).toString(),
      cancel_url: new URL("/join?checkout=cancelled", base).toString(),
    }, { idempotencyKey: attempt.idempotency_key });
    if (!session.url) throw new Error("Stripe Checkout URL missing");
    const { error: saveError } = await db.from("checkout_attempts")
      .update({ stripe_checkout_session_id: session.id, status: "open",
        expires_at: new Date(session.expires_at * 1000).toISOString() })
      .eq("id", attempt.id);
    if (saveError) throw saveError;
    return Response.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Membership Checkout failed", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ code: "CHECKOUT_UNAVAILABLE" }, { status: 503 });
  }
}
