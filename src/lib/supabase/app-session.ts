import { createHmac, timingSafeEqual } from "crypto";
import type { User } from "@supabase/supabase-js";

export const appSessionCookieName = "lf-beta-session";
export const appSessionMaxAge = 60 * 60 * 24 * 7;

type AppSessionPayload = {
  email: string;
  exp: number;
  iat: number;
  userId: string;
};

function getSigningSecret() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? null;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(encodedPayload: string, secret: string) {
  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

function signaturesMatch(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function createAppSessionCookieValue(user: User) {
  const secret = getSigningSecret();
  const email = user.email?.toLowerCase().trim();

  if (!secret || !email) {
    return null;
  }

  const issuedAt = Math.floor(Date.now() / 1000);
  const payload: AppSessionPayload = {
    email,
    exp: issuedAt + appSessionMaxAge,
    iat: issuedAt,
    userId: user.id,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signPayload(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export function parseAppSessionCookieValue(value: string | undefined) {
  const secret = getSigningSecret();

  if (!secret || !value) {
    return null;
  }

  const [encodedPayload, signature] = value.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload, secret);

  if (!signaturesMatch(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as Partial<AppSessionPayload>;
    const now = Math.floor(Date.now() / 1000);

    if (
      typeof payload.userId !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.exp !== "number" ||
      payload.exp <= now
    ) {
      return null;
    }

    return payload as AppSessionPayload;
  } catch {
    return null;
  }
}
