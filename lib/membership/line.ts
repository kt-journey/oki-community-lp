import { createHash, randomBytes } from "node:crypto";

export function randomUrlToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export function pkceChallenge(verifier: string): string {
  return createHash("sha256").update(verifier).digest("base64url");
}

export function lineAuthorizationUrl(params: {
  channelId: string;
  redirectUri: string;
  state: string;
  nonce: string;
  codeChallenge: string;
}): string {
  const url = new URL("https://access.line.me/oauth2/v2.1/authorize");
  url.search = new URLSearchParams({
    response_type: "code",
    client_id: params.channelId,
    redirect_uri: params.redirectUri,
    state: params.state,
    nonce: params.nonce,
    scope: "openid profile",
    code_challenge: params.codeChallenge,
    code_challenge_method: "S256",
    bot_prompt: "normal",
  }).toString();
  return url.toString();
}

type LineIdentity = { sub: string; name?: string };

export async function exchangeAndVerifyLineCode(params: {
  code: string;
  verifier: string;
  nonce: string;
  redirectUri: string;
  channelId: string;
  channelSecret: string;
}): Promise<LineIdentity> {
  const tokenResponse = await fetch("https://api.line.me/oauth2/v2.1/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: params.code,
      redirect_uri: params.redirectUri,
      client_id: params.channelId,
      client_secret: params.channelSecret,
      code_verifier: params.verifier,
    }),
    cache: "no-store",
  });
  if (!tokenResponse.ok) throw new Error("LINE token exchange failed");
  const tokenData: unknown = await tokenResponse.json();
  if (!isRecord(tokenData) || typeof tokenData.id_token !== "string") {
    throw new Error("LINE ID token missing");
  }

  const verifyResponse = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      id_token: tokenData.id_token,
      client_id: params.channelId,
      nonce: params.nonce,
    }),
    cache: "no-store",
  });
  if (!verifyResponse.ok) throw new Error("LINE ID token verification failed");
  const identity: unknown = await verifyResponse.json();
  if (!isRecord(identity) || typeof identity.sub !== "string" || !/^U[0-9a-f]{32}$/.test(identity.sub)) {
    throw new Error("LINE user ID invalid");
  }
  return { sub: identity.sub, name: typeof identity.name === "string" ? identity.name : undefined };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
