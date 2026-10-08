import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { exchangeAndVerifyLineCode, randomUrlToken } from "@/lib/membership/line";
import { lineLoginSettings, memberDatabase, membershipBaseUrl, membershipEnabled } from "@/lib/membership/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!membershipEnabled) return new Response("Not Found", { status: 404 });

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const savedState = request.cookies.get("line_oauth_state")?.value;
  const nonce = request.cookies.get("line_oauth_nonce")?.value;
  const verifier = request.cookies.get("line_oauth_verifier")?.value;
  const responseOnError = NextResponse.redirect(new URL("/join?error=login", membershipBaseUrl()));
  for (const name of ["line_oauth_state", "line_oauth_nonce", "line_oauth_verifier"]) {
    responseOnError.cookies.set(name, "", { path: "/api/auth/line/callback", maxAge: 0 });
  }
  if (!code || !state || !savedState || state !== savedState || !nonce || !verifier) {
    return responseOnError;
  }

  try {
    const settings = lineLoginSettings();
    const identity = await exchangeAndVerifyLineCode({
      code,
      nonce,
      verifier,
      redirectUri: new URL("/api/auth/line/callback", membershipBaseUrl()).toString(),
      channelId: settings.channelId,
      channelSecret: settings.channelSecret,
    });
    const db = memberDatabase();
    const { data: member, error: memberError } = await db.from("members")
      .upsert({ line_user_id: identity.sub, line_display_name: identity.name ?? null }, { onConflict: "line_user_id" })
      .select("id").single();
    if (memberError || !member) throw memberError ?? new Error("Member missing");

    const token = randomUrlToken(48);
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const { error: sessionError } = await db.from("member_sessions").insert({
      member_id: member.id,
      token_hash: `\\x${tokenHash}`,
      expires_at: expiresAt.toISOString(),
    });
    if (sessionError) throw sessionError;

    const response = NextResponse.redirect(new URL("/join", membershipBaseUrl()));
    for (const name of ["line_oauth_state", "line_oauth_nonce", "line_oauth_verifier"]) {
      response.cookies.set(name, "", { path: "/api/auth/line/callback", maxAge: 0 });
    }
    response.cookies.set("membership_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("LINE membership login failed", error);
    return responseOnError;
  }
}
