import { NextResponse } from "next/server";
import { lineAuthorizationUrl, pkceChallenge, randomUrlToken } from "@/lib/membership/line";
import { lineLoginSettings, membershipBaseUrl, membershipEnabled } from "@/lib/membership/server";

export const runtime = "nodejs";

export async function GET() {
  if (!membershipEnabled) return new Response("Not Found", { status: 404 });

  const { channelId } = lineLoginSettings();
  const redirectUri = new URL("/api/auth/line/callback", membershipBaseUrl()).toString();
  const state = randomUrlToken();
  const nonce = randomUrlToken();
  const verifier = randomUrlToken(48);
  const response = NextResponse.redirect(lineAuthorizationUrl({
    channelId,
    redirectUri,
    state,
    nonce,
    codeChallenge: pkceChallenge(verifier),
  }));
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/api/auth/line/callback",
    maxAge: 600,
  };
  response.cookies.set("line_oauth_state", state, cookieOptions);
  response.cookies.set("line_oauth_nonce", nonce, cookieOptions);
  response.cookies.set("line_oauth_verifier", verifier, cookieOptions);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
