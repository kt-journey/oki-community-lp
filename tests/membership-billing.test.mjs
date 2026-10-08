import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

// The billing policy has no runtime imports. Compile it without adding a test runner dependency.
const source = readFileSync(new URL("../lib/membership/billing.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { validateCheckoutPrice, verifySubscription, verifyPaidInvoice } =
  await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

process.env.STRIPE_PRICE_MONTHLY = "price_monthly_test";
process.env.STRIPE_PRICE_YEARLY = "price_yearly_test";

const memberId = "11111111-1111-4111-8111-111111111111";
const periodStart = 1791417600;
const periodEnd = 1794096000;

function subscription(priceId = "price_monthly_test") {
  return {
    id: "sub_test", customer: "cus_test", metadata: { member_id: memberId },
    status: "active", cancel_at_period_end: false, collection_method: "charge_automatically",
    trial_end: null, discounts: [],
    items: { has_more: false, data: [{ quantity: 1, current_period_end: periodEnd,
      price: { id: priceId, currency: "jpy", unit_amount: 300,
        recurring: { interval: "month", interval_count: 1 } } }] },
  };
}

function invoice() {
  return {
    id: "in_test", status: "paid", currency: "jpy", customer: "cus_test",
    parent: { subscription_details: { subscription: "sub_test" } },
    amount_paid: 300, total: 300, amount_remaining: 0,
    status_transitions: { paid_at: periodStart + 10 },
    lines: { has_more: false, data: [{
      parent: { type: "subscription_item_details", subscription_item_details: { proration: false } },
      subscription: "sub_test", pricing: { price_details: { price: "price_monthly_test" } },
      quantity: 1, amount: 300, period: { start: periodStart, end: periodEnd },
    }] },
  };
}

const payments = [{ status: "paid", amount_paid: 300,
  payment: { type: "payment_intent", payment_intent: "pi_test" } }];

test("Checkout accepts only the configured recurring amount and interval", () => {
  const valid = { id: "price_monthly_test", active: true, currency: "jpy",
    unit_amount: 300, type: "recurring", recurring: { interval: "month", interval_count: 1 } };
  assert.doesNotThrow(() => validateCheckoutPrice(valid, "monthly"));
  assert.throws(() => validateCheckoutPrice({ ...valid, unit_amount: 0 }, "monthly"));
  assert.throws(() => validateCheckoutPrice({ ...valid, recurring: { interval: "year", interval_count: 1 } }, "monthly"));
  assert.doesNotThrow(() => validateCheckoutPrice({ ...valid, id: "price_yearly_test",
    unit_amount: 3000, recurring: { interval: "year", interval_count: 1 } }, "yearly"));
  assert.throws(() => validateCheckoutPrice({ ...valid, id: "price_yearly_test",
    unit_amount: 300, recurring: { interval: "year", interval_count: 1 } }, "yearly"));
});

test("Subscription requires one undiscounted, untrialed item tied to a member", () => {
  const valid = subscription();
  assert.equal(verifySubscription(valid).memberId, memberId);
  assert.throws(() => verifySubscription({ ...valid, discounts: [{}] }));
  assert.throws(() => verifySubscription({ ...valid, items: { ...valid.items, data: [valid.items.data[0], valid.items.data[0]] } }));
});

test("Only an exact paid subscription invoice grants its line period", () => {
  const sub = verifySubscription(subscription());
  const valid = verifyPaidInvoice(invoice(), sub, payments);
  assert.equal(valid.amountPaidYen, 300);
  assert.equal(valid.periodEnd, new Date(periodEnd * 1000).toISOString());
  assert.throws(() => verifyPaidInvoice({ ...invoice(), amount_paid: 0 }, sub, payments));
  assert.throws(() => verifyPaidInvoice({ ...invoice(), customer: "cus_other" }, sub, payments));
  const prorated = invoice();
  prorated.lines.data[0].parent.subscription_item_details.proration = true;
  assert.throws(() => verifyPaidInvoice(prorated, sub, payments));
  assert.throws(() => verifyPaidInvoice(invoice(), sub, []));
});
