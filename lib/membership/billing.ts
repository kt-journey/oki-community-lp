import type Stripe from "stripe";
import type { MembershipPlan } from "./plans";

const PLAN_RULES = {
  monthly: { amount: 300, interval: "month" },
  yearly: { amount: 3000, interval: "year" },
} as const;

export class BillingReviewError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BillingReviewError";
  }
}

export function priceIdForPlan(plan: MembershipPlan): string {
  const name = plan === "monthly" ? "STRIPE_PRICE_MONTHLY" : "STRIPE_PRICE_YEARLY";
  const value = process.env[name];
  if (!value) throw new Error(`Missing server configuration: ${name}`);
  return value;
}

export function planForPrice(priceId: string): MembershipPlan {
  if (priceId && priceId === process.env.STRIPE_PRICE_MONTHLY) return "monthly";
  if (priceId && priceId === process.env.STRIPE_PRICE_YEARLY) return "yearly";
  throw new BillingReviewError("Price is not registered for membership");
}

export function validateCheckoutPrice(price: Stripe.Price, plan: MembershipPlan): void {
  const rule = PLAN_RULES[plan];
  if (!price.active || price.id !== priceIdForPlan(plan)
    || price.currency !== "jpy" || price.unit_amount !== rule.amount
    || price.type !== "recurring" || price.recurring?.interval !== rule.interval
    || price.recurring.interval_count !== 1) {
    throw new BillingReviewError("Stripe Price does not match the membership plan");
  }
}

function objectId(value: string | { id: string } | null | undefined): string | null {
  return typeof value === "string" ? value : value?.id ?? null;
}

export type VerifiedSubscription = {
  memberId: string;
  customerId: string;
  subscriptionId: string;
  plan: MembershipPlan;
  priceId: string;
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string;
};

export function verifySubscription(subscription: Stripe.Subscription): VerifiedSubscription {
  const memberId = subscription.metadata.member_id;
  const customerId = objectId(subscription.customer);
  const item = subscription.items.data[0];
  if (!memberId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(memberId)
    || !customerId || subscription.items.has_more || subscription.items.data.length !== 1 || !item
    || item.quantity !== 1 || subscription.collection_method !== "charge_automatically"
    || subscription.trial_end || subscription.discounts.length > 0) {
    throw new BillingReviewError("Subscription is outside the supported membership model");
  }
  const plan = planForPrice(item.price.id);
  const rule = PLAN_RULES[plan];
  if (item.price.currency !== "jpy" || item.price.unit_amount !== rule.amount
    || item.price.recurring?.interval !== rule.interval || item.price.recurring.interval_count !== 1
    || !item.current_period_end) {
    throw new BillingReviewError("Subscription price or period differs from membership plan");
  }
  return {
    memberId,
    customerId,
    subscriptionId: subscription.id,
    plan,
    priceId: item.price.id,
    status: subscription.status,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    currentPeriodEnd: new Date(item.current_period_end * 1000).toISOString(),
  };
}

export type VerifiedPaidInvoice = {
  invoiceId: string;
  amountPaidYen: number;
  currency: "jpy";
  periodStart: string;
  periodEnd: string;
  paidAt: string;
};

export function verifyPaidInvoice(
  invoice: Stripe.Invoice,
  subscription: VerifiedSubscription,
  payments: Stripe.InvoicePayment[],
): VerifiedPaidInvoice {
  const rule = PLAN_RULES[subscription.plan];
  const line = invoice.lines.data[0];
  const parentSubscription = objectId(invoice.parent?.subscription_details?.subscription);
  const lineSubscription = objectId(line?.subscription);
  const linePrice = objectId(line?.pricing?.price_details?.price);
  const payment = payments[0];
  if (invoice.status !== "paid" || invoice.currency !== "jpy"
    || invoice.customer === null || objectId(invoice.customer) !== subscription.customerId
    || parentSubscription !== subscription.subscriptionId
    || invoice.amount_paid !== rule.amount || invoice.total !== rule.amount
    || invoice.amount_remaining !== 0 || !invoice.status_transitions.paid_at
    || invoice.lines.has_more || invoice.lines.data.length !== 1 || !line
    || line.parent?.type !== "subscription_item_details"
    || line.parent.subscription_item_details?.proration !== false
    || lineSubscription !== subscription.subscriptionId
    || linePrice !== subscription.priceId || line.quantity !== 1
    || line.amount !== rule.amount || line.period.end <= line.period.start
    || payments.length !== 1 || !payment || payment.status !== "paid"
    || payment.payment.type !== "payment_intent" || payment.amount_paid !== rule.amount
    || !payment.payment.payment_intent) {
    throw new BillingReviewError("Invoice is not an exact paid membership period");
  }
  return {
    invoiceId: invoice.id,
    amountPaidYen: rule.amount,
    currency: "jpy",
    periodStart: new Date(line.period.start * 1000).toISOString(),
    periodEnd: new Date(line.period.end * 1000).toISOString(),
    paidAt: new Date(invoice.status_transitions.paid_at * 1000).toISOString(),
  };
}
