import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { memberDatabase, stripeClient, stripeWebhookSecret } from "@/lib/membership/server";
import { processMembershipStripeEvent } from "@/lib/membership/stripe-events";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });
  let event;
  try {
    event = stripeClient().webhooks.constructEvent(await request.text(), signature, stripeWebhookSecret());
    const liveKey = process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_") ?? false;
    if (event.livemode !== liveKey) throw new Error("Stripe mode mismatch");
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  const db = memberDatabase();
  const object = event.data.object as { id?: unknown };
  const { error: insertError } = await db.from("stripe_events").upsert({
    stripe_event_id: event.id,
    event_type: event.type,
    stripe_object_id: typeof object.id === "string" ? object.id : null,
    payload: event,
  }, { onConflict: "stripe_event_id", ignoreDuplicates: true });
  if (insertError) return new Response("Event storage unavailable", { status: 503 });

  const claimId = randomUUID();
  const { data: claim, error: claimError } = await db.rpc("claim_stripe_event", {
    p_event_id: event.id, p_claim_id: claimId,
  });
  if (claimError) return new Response("Event claim unavailable", { status: 503 });
  if (claim === "complete") return new Response(null, { status: 200 });
  if (claim !== "claimed") return new Response("Event is being processed", { status: 503 });

  try {
    const result = await processMembershipStripeEvent(event);
    const { error } = await db.rpc("finish_stripe_event", {
      p_event_id: event.id, p_claim_id: claimId, p_status: result, p_error: null,
    });
    if (error) throw error;
    return new Response(null, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown event error";
    console.error("Membership Stripe event failed", { eventId: event.id, message });
    await db.rpc("finish_stripe_event", {
      p_event_id: event.id, p_claim_id: claimId, p_status: "failed", p_error: message,
    });
    return new Response("Event processing failed", { status: 503 });
  }
}
