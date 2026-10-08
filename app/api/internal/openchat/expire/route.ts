import { timingSafeEqual } from "node:crypto";
import { NextRequest } from "next/server";
import { memberDatabase } from "@/lib/membership/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const configured = process.env.MEMBERSHIP_JOB_SECRET ?? "";
  const supplied = request.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  const configuredBytes = Buffer.from(configured);
  const suppliedBytes = Buffer.from(supplied);
  if (configuredBytes.length < 32 || configuredBytes.length !== suppliedBytes.length
    || !timingSafeEqual(configuredBytes, suppliedBytes)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { data, error } = await memberDatabase().rpc("sweep_expired_openchat_access");
  if (error) {
    console.error("OpenChat expiry sweep failed", error.message);
    return new Response("Sweep unavailable", { status: 503 });
  }
  return Response.json(data, { headers: { "Cache-Control": "no-store" } });
}
