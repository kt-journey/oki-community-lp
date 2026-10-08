import { createHmac, timingSafeEqual } from "node:crypto";
import { lineLoginSettings } from "./server";

export function billingCsrfToken(sessionToken: string): string {
  return createHmac("sha256", lineLoginSettings().channelSecret)
    .update(`billing:${sessionToken}`).digest("hex");
}

export function validBillingCsrfToken(sessionToken: string | undefined, supplied: string | null): boolean {
  if (!sessionToken || !supplied || !/^[0-9a-f]{64}$/.test(supplied)) return false;
  return timingSafeEqual(Buffer.from(billingCsrfToken(sessionToken), "hex"), Buffer.from(supplied, "hex"));
}
