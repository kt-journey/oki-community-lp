import { NextRequest } from "next/server";
import { validBillingCsrfToken } from "@/lib/membership/csrf";
import { generateOpenChatCode, openChatCodeHash, openChatInviteUrl } from "@/lib/membership/openchat-code";
import { currentMember } from "@/lib/membership/session";
import { memberDatabase, membershipBaseUrl, membershipOpenChatEnabled } from "@/lib/membership/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!membershipOpenChatEnabled) return new Response("Not Found", { status: 404 });
  if (request.headers.get("origin") !== membershipBaseUrl().origin) {
    return Response.json({ code: "INVALID_ORIGIN" }, { status: 403 });
  }
  const sessionToken = request.cookies.get("membership_session")?.value;
  if (!validBillingCsrfToken(sessionToken, request.headers.get("x-membership-csrf"))) {
    return Response.json({ code: "INVALID_CSRF" }, { status: 403 });
  }
  const member = await currentMember(sessionToken);
  if (!member) return Response.json({ code: "UNAUTHORIZED" }, { status: 401 });
  if (!member.accessActive) return Response.json({ code: "NOT_ELIGIBLE" }, { status: 403 });
  if (member.openchatStatus) return Response.json({ code: "REQUEST_EXISTS" }, { status: 409 });

  try {
    const inviteUrl = openChatInviteUrl();
    const secret = process.env.OPENCHAT_CODE_HMAC_KEY ?? "";
    const code = generateOpenChatCode();
    const hash = openChatCodeHash(code, secret);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const { error } = await memberDatabase().rpc("issue_openchat_code", {
      p_member_id: member.id, p_code_hash: hash, p_expires_at: expiresAt,
    });
    if (error) {
      if (error.message.includes("OPENCHAT_CODE_LIMIT")) {
        return Response.json({ code: "RATE_LIMITED" }, { status: 429 });
      }
      if (error.message.includes("OPENCHAT_ALREADY_PENDING")) {
        return Response.json({ code: "REQUEST_EXISTS" }, { status: 409 });
      }
      if (error.message.includes("OPENCHAT_MEMBER_INELIGIBLE")) {
        return Response.json({ code: "NOT_ELIGIBLE" }, { status: 403 });
      }
      throw error;
    }
    return Response.json({ code, expiresAt, inviteUrl }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("OpenChat code issuance failed", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ code: "CODE_UNAVAILABLE" }, { status: 503 });
  }
}
