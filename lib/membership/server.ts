import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const membershipEnabled = process.env.MEMBERSHIP_FEATURE_ENABLED === "true";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server configuration: ${name}`);
  return value;
}

export function memberDatabase() {
  return createClient(required("SUPABASE_URL"), required("SUPABASE_SECRET_KEY"), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

export function stripeClient() {
  return new Stripe(required("STRIPE_SECRET_KEY"));
}

export function membershipBaseUrl(): URL {
  const url = new URL(required("MEMBERSHIP_APP_URL"));
  if (url.protocol !== "https:" && url.hostname !== "localhost") {
    throw new Error("MEMBERSHIP_APP_URL must use HTTPS");
  }
  return url;
}

export function lineLoginSettings() {
  return {
    channelId: required("LINE_LOGIN_CHANNEL_ID"),
    channelSecret: required("LINE_LOGIN_CHANNEL_SECRET"),
  };
}
