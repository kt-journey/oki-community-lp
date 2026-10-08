import type Stripe from "stripe";
import { BillingReviewError, verifyPaidInvoice, verifySubscription, type VerifiedSubscription } from "./billing";
import { memberDatabase, stripeClient } from "./server";

function idOf(value: string | { id: string } | null | undefined): string | null {
  return typeof value === "string" ? value : value?.id ?? null;
}

function eventObjectId(event: Stripe.Event): string {
  const object = event.data.object as { id?: unknown };
  if (typeof object.id !== "string") throw new BillingReviewError("Stripe event object ID missing");
  return object.id;
}

async function loadMembershipSubscription(id: string): Promise<{
  raw: Stripe.Subscription; verified: VerifiedSubscription;
} | null> {
  const stripe = stripeClient();
  const raw = await stripe.subscriptions.retrieve(id);
  if (!raw.metadata.member_id) return null;
  const verified = verifySubscription(raw);
  const customer = await stripe.customers.retrieve(verified.customerId);
  if (customer.deleted || customer.metadata.member_id !== verified.memberId) {
    throw new BillingReviewError("Subscription Customer does not match member");
  }
  return { raw, verified };
}

async function bindSubscription(sub: VerifiedSubscription): Promise<void> {
  const { error } = await memberDatabase().rpc("bind_member_subscription", {
    p_member_id: sub.memberId,
    p_customer_id: sub.customerId,
    p_subscription_id: sub.subscriptionId,
    p_plan_code: sub.plan,
    p_price_id: sub.priceId,
    p_status: sub.status,
    p_cancel_at_period_end: sub.cancelAtPeriodEnd,
    p_current_period_end: sub.currentPeriodEnd,
  });
  if (error) throw error;
}

async function handleCheckout(event: Stripe.Event): Promise<"done" | "ignored"> {
  const stripe = stripeClient();
  const session = await stripe.checkout.sessions.retrieve(eventObjectId(event));
  if (!session.metadata?.member_id) return "ignored";
  if (session.mode !== "subscription"
    || session.client_reference_id !== session.metadata.member_id
    || !session.metadata.checkout_attempt_id) {
    throw new BillingReviewError("Checkout Session metadata mismatch");
  }
  const db = memberDatabase();
  const { data: attempt, error } = await db.from("checkout_attempts")
    .select("id,member_id,stripe_checkout_session_id")
    .eq("id", session.metadata.checkout_attempt_id).single();
  if (error || !attempt || attempt.member_id !== session.metadata.member_id
    || attempt.stripe_checkout_session_id !== session.id) {
    throw new BillingReviewError("Checkout attempt mismatch");
  }
  if (event.type === "checkout.session.expired") {
    const { error: updateError } = await db.from("checkout_attempts")
      .update({ status: "expired" }).eq("id", attempt.id).neq("status", "completed");
    if (updateError) throw updateError;
    return "done";
  }
  if (session.status !== "complete") throw new BillingReviewError("Checkout is not complete");
  const subscriptionId = idOf(session.subscription);
  if (!subscriptionId) throw new BillingReviewError("Checkout Subscription missing");
  const loaded = await loadMembershipSubscription(subscriptionId);
  if (!loaded || loaded.verified.memberId !== attempt.member_id) {
    throw new BillingReviewError("Checkout Subscription member mismatch");
  }
  await bindSubscription(loaded.verified);
  const { error: updateError } = await db.from("checkout_attempts")
    .update({ status: "completed" }).eq("id", attempt.id);
  if (updateError) throw updateError;
  return "done";
}

async function handleInvoicePaid(invoiceId: string): Promise<"done" | "ignored"> {
  const stripe = stripeClient();
  const invoice = await stripe.invoices.retrieve(invoiceId);
  const subscriptionId = idOf(invoice.parent?.subscription_details?.subscription);
  if (!subscriptionId) return "ignored";
  const loaded = await loadMembershipSubscription(subscriptionId);
  if (!loaded) return "ignored";
  const sub = loaded.verified;
  if (loaded.raw.status === "canceled" && !loaded.raw.cancel_at_period_end) {
    throw new BillingReviewError("Immediately canceled Subscription needs manual review");
  }
  if (invoice.parent?.subscription_details?.metadata?.member_id !== sub.memberId) {
    throw new BillingReviewError("Invoice Subscription metadata mismatch");
  }
  const paymentList = await stripe.invoicePayments.list({ invoice: invoiceId, status: "paid", limit: 10 });
  if (paymentList.has_more) throw new BillingReviewError("Invoice has too many payments");
  const paid = verifyPaidInvoice(invoice, sub, paymentList.data);
  const intentId = idOf(paymentList.data[0]?.payment.payment_intent);
  if (!intentId) throw new BillingReviewError("Paid PaymentIntent missing");
  const intent = await stripe.paymentIntents.retrieve(intentId);
  if (intent.status !== "succeeded" || intent.amount_received !== paid.amountPaidYen
    || idOf(intent.customer) !== sub.customerId) {
    throw new BillingReviewError("Card payment is not confirmed");
  }
  const { error } = await memberDatabase().rpc("record_paid_membership_invoice", {
    p_member_id: sub.memberId,
    p_customer_id: sub.customerId,
    p_subscription_id: sub.subscriptionId,
    p_plan_code: sub.plan,
    p_price_id: sub.priceId,
    p_subscription_status: sub.status,
    p_cancel_at_period_end: sub.cancelAtPeriodEnd,
    p_current_period_end: sub.currentPeriodEnd,
    p_invoice_id: paid.invoiceId,
    p_currency: paid.currency,
    p_amount_paid_yen: paid.amountPaidYen,
    p_period_start: paid.periodStart,
    p_period_end: paid.periodEnd,
    p_paid_at: paid.paidAt,
  });
  if (error) throw error;
  return "done";
}

async function handleSubscription(event: Stripe.Event): Promise<"done" | "ignored"> {
  const loaded = await loadMembershipSubscription(eventObjectId(event));
  if (!loaded) return "ignored";
  await bindSubscription(loaded.verified);
  if (loaded.raw.status === "canceled" && !loaded.raw.cancel_at_period_end) {
    const { error } = await memberDatabase().rpc("hold_membership_for_payment", {
      p_member_id: loaded.verified.memberId,
      p_reason: "operator_stop",
      p_stripe_object_id: loaded.raw.id,
    });
    if (error) throw error;
  }
  return "done";
}

async function handleInvoiceFailure(invoiceId: string): Promise<"done" | "ignored"> {
  const invoice = await stripeClient().invoices.retrieve(invoiceId);
  const subscriptionId = idOf(invoice.parent?.subscription_details?.subscription);
  if (!subscriptionId) return "ignored";
  const loaded = await loadMembershipSubscription(subscriptionId);
  if (!loaded) return "ignored";
  await bindSubscription(loaded.verified);
  return "done";
}

async function handleRefundOrDispute(event: Stripe.Event): Promise<"done" | "ignored"> {
  const stripe = stripeClient();
  const disputeChargeId = event.type === "charge.dispute.created"
    ? idOf((event.data.object as Stripe.Dispute).charge) : null;
  if (event.type === "charge.dispute.created" && !disputeChargeId) {
    throw new BillingReviewError("Dispute Charge missing");
  }
  const charge = event.type === "charge.refunded"
    ? await stripe.charges.retrieve(eventObjectId(event))
    : await stripe.charges.retrieve(disputeChargeId!);
  if (event.type === "charge.refunded" && charge.amount_refunded === 0) return "ignored";
  const intentId = idOf(charge.payment_intent);
  if (!intentId) return "ignored";
  const paymentList = await stripe.invoicePayments.list({
    payment: { type: "payment_intent", payment_intent: intentId }, status: "paid", limit: 10,
  });
  if (paymentList.has_more || paymentList.data.length > 1) {
    throw new BillingReviewError("Refund payment maps to multiple invoices");
  }
  const invoiceId = idOf(paymentList.data[0]?.invoice);
  if (!invoiceId) return "ignored";
  const invoice = await stripe.invoices.retrieve(invoiceId);
  const subscriptionId = idOf(invoice.parent?.subscription_details?.subscription);
  if (!subscriptionId) return "ignored";
  const loaded = await loadMembershipSubscription(subscriptionId);
  if (!loaded) return "ignored";
  if (idOf(invoice.customer) !== loaded.verified.customerId) {
    throw new BillingReviewError("Refund Customer mismatch");
  }
  const reason = event.type === "charge.dispute.created" ? "dispute"
    : charge.amount_refunded >= charge.amount ? "full_refund" : "partial_refund_review";
  const { error } = await memberDatabase().rpc("hold_membership_for_payment", {
    p_member_id: loaded.verified.memberId,
    p_reason: reason,
    p_stripe_object_id: charge.id,
  });
  if (error) throw error;
  return "done";
}

export async function processMembershipStripeEvent(event: Stripe.Event): Promise<"done" | "ignored"> {
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.expired":
      return handleCheckout(event);
    case "invoice.paid":
      return handleInvoicePaid(eventObjectId(event));
    case "invoice.payment_failed":
      return handleInvoiceFailure(eventObjectId(event));
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      return handleSubscription(event);
    case "charge.refunded":
    case "charge.dispute.created":
      return handleRefundOrDispute(event);
    default:
      return "ignored";
  }
}
