import { NextRequest } from "next/server";
import { currentMember } from "@/lib/membership/session";
import { validBillingCsrfToken } from "@/lib/membership/csrf";
import { memberDatabase, membershipBaseUrl, membershipEnabled, stripeClient } from "@/lib/membership/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!membershipEnabled) return new Response("Not Found", { status: 404 });
  if (request.headers.get("origin") !== membershipBaseUrl().origin) {
    return Response.json({ code: "INVALID_ORIGIN" }, { status: 403 });
  }
  const sessionToken = request.cookies.get("membership_session")?.value;
  if (!validBillingCsrfToken(sessionToken, request.headers.get("x-membership-csrf"))) {
    return Response.json({ code: "INVALID_CSRF" }, { status: 403 });
  }
  const member = await currentMember(sessionToken);
  if (!member) return Response.json({ code: "UNAUTHORIZED" }, { status: 401 });

  try {
    const db = memberDatabase();
    const { data: allowed, error: throttleError } = await db.rpc("claim_member_action", {
      p_member_id: member.id, p_action: "portal", p_limit: 12, p_window_seconds: 3600,
    });
    if (throttleError) throw throttleError;
    if (!allowed) return Response.json({ code: "RATE_LIMITED" }, { status: 429 });
    const { data: record, error } = await db.from("members")
      .select("stripe_customer_id,stripe_subscription_id")
      .eq("id", member.id).single();
    if (error || !record?.stripe_customer_id || !record.stripe_subscription_id) {
      return Response.json({ code: "NO_SUBSCRIPTION" }, { status: 409 });
    }
    const configurationId = process.env.STRIPE_PORTAL_CONFIGURATION_ID;
    if (!configurationId) throw new Error("Portal configuration missing");
    const stripe = stripeClient();
    const configuration = await stripe.billingPortal.configurations.retrieve(configurationId);
    if (!configuration.active || !configuration.features.subscription_cancel.enabled
      || configuration.features.subscription_cancel.mode !== "at_period_end"
      || configuration.features.subscription_update.enabled
      || !configuration.features.payment_method_update.enabled) {
      throw new Error("Portal configuration permits an unsupported billing change");
    }
    const customer = await stripe.customers.retrieve(record.stripe_customer_id);
    if (customer.deleted || customer.metadata.member_id !== member.id) {
      throw new Error("Stripe Customer does not match member");
    }
    const session = await stripe.billingPortal.sessions.create({
      customer: record.stripe_customer_id,
      configuration: configurationId,
      return_url: new URL("/join", membershipBaseUrl()).toString(),
    });
    return Response.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Membership Portal failed", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ code: "PORTAL_UNAVAILABLE" }, { status: 503 });
  }
}
