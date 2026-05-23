export const authDebugStorageKey = "loan-factory-auth-debug";
export const authNextStorageKey = "loan-factory-auth-next";

export type AuthDebugTrail = {
  callbackStage?: string;
  hasCode?: boolean;
  oauthStartAttempted?: boolean;
  oauthStartSucceeded?: boolean;
  browserExchangeAttempted?: boolean;
  browserExchangeSucceeded?: boolean;
  browserSessionExists?: boolean;
  syncProfileAttempted?: boolean;
  syncProfileReceivedSession?: boolean;
  syncProfileSucceeded?: boolean;
  syncProfileCookieWriteAttempted?: boolean;
  syncProfileCookieCount?: number;
  serverSessionExists?: boolean;
  profileEmail?: string | null;
  profileRole?: string | null;
  profileStatus?: string | null;
  lastErrorCode?: string | null;
  lastErrorMessage?: string | null;
  updatedAt?: string;
};

export function sanitizeAuthDebugMessage(message: unknown) {
  if (typeof message !== "string" || !message.trim()) {
    return null;
  }

  return message
    .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, "Bearer [redacted]")
    .replace(/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "[redacted]")
    .replace(/(access|refresh|service)[_-]?token/gi, "$1 token")
    .slice(0, 220);
}

export function readAuthDebugTrail(): AuthDebugTrail {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(authDebugStorageKey);
    return raw ? (JSON.parse(raw) as AuthDebugTrail) : {};
  } catch {
    return {};
  }
}

export function writeAuthDebugTrail(nextTrail: AuthDebugTrail) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    authDebugStorageKey,
    JSON.stringify({
      ...nextTrail,
      updatedAt: new Date().toISOString(),
    }),
  );
}

export function mergeAuthDebugTrail(patch: AuthDebugTrail) {
  writeAuthDebugTrail({
    ...readAuthDebugTrail(),
    ...patch,
  });
}
