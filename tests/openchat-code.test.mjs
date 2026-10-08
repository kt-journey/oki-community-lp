import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../lib/membership/openchat-code.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { generateOpenChatCode, openChatCodeHash, openChatInviteUrl } =
  await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

test("OpenChat codes are random, 20 characters, and easy to transcribe", () => {
  const codes = new Set(Array.from({ length: 100 }, () => generateOpenChatCode()));
  assert.equal(codes.size, 100);
  for (const code of codes) assert.match(code, /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{20}$/);
});

test("Only a keyed digest is stored, and the key must be long enough", () => {
  const code = "ABCDEFGHJKLMNPQRST23";
  const secret = "a".repeat(32);
  const hash = openChatCodeHash(code, secret);
  assert.match(hash, /^\\x[0-9a-f]{64}$/);
  assert.equal(hash, openChatCodeHash(code, secret));
  assert.notEqual(hash, openChatCodeHash(code, "b".repeat(32)));
  assert.ok(!hash.includes(code));
  assert.throws(() => openChatCodeHash(code, "short"));
});

test("The invite URL is limited to HTTPS LINE hosts", () => {
  process.env.OPENCHAT_INVITE_URL = "https://line.me/ti/g2/example";
  assert.equal(openChatInviteUrl(), process.env.OPENCHAT_INVITE_URL);
  process.env.OPENCHAT_INVITE_URL = "https://line.me.example.com/ti/g2/example";
  assert.throws(openChatInviteUrl);
  process.env.OPENCHAT_INVITE_URL = "http://line.me/ti/g2/example";
  assert.throws(openChatInviteUrl);
  delete process.env.OPENCHAT_INVITE_URL;
});
