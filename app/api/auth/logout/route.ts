import { NextRequest, NextResponse } from "next/server";
import { revokeSession } from "@/lib/membership/session";
import { membershipBaseUrl, membershipEnabled } from "@/lib/membership/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!membershipEnabled) return new Response("Not Found", { status: 404 });
  if (request.headers.get("origin") !== membershipBaseUrl().origin) {
    return Response.json({ code: "INVALID_ORIGIN" }, { status: 403 });
  }
  await revokeSession(request.cookies.get("membership_session")?.value);
  const response = NextResponse.redirect(new URL("/join", membershipBaseUrl()), { status: 303 });
  response.cookies.set("membership_session", "", { path: "/", maxAge: 0 });
  return response;
}
