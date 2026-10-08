import { NextRequest } from "next/server";
import { currentMember } from "@/lib/membership/session";
import { membershipEnabled } from "@/lib/membership/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!membershipEnabled) return new Response("Not Found", { status: 404 });
  const member = await currentMember(request.cookies.get("membership_session")?.value);
  if (!member) return Response.json({ code: "UNAUTHORIZED" }, { status: 401 });
  return Response.json(member, { headers: { "Cache-Control": "no-store" } });
}
