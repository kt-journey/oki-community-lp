import { createHmac, randomBytes } from "node:crypto";

// Letters I/O and digits 0/1 are omitted to reduce transcription errors in LINE.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateOpenChatCode(): string {
  return Array.from(randomBytes(20), (byte) => ALPHABET[byte & 31]).join("");
}

export function openChatCodeHash(code: string, secret: string): string {
  if (Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("OPENCHAT_CODE_HMAC_KEY must contain at least 32 bytes");
  }
  return `\\x${createHmac("sha256", secret).update(code).digest("hex")}`;
}

export function openChatInviteUrl(): string {
  const configured = process.env.OPENCHAT_INVITE_URL;
  if (!configured) throw new Error("OPENCHAT_INVITE_URL missing");
  const url = new URL(configured);
  if (url.protocol !== "https:" || url.username || url.password
    || !["line.me", "openchat.line.me"].includes(url.hostname)) {
    throw new Error("OPENCHAT_INVITE_URL must be an HTTPS LINE link");
  }
  return url.toString();
}
