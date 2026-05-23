"use client";

import { useState } from "react";
import {
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
} from "@/lib/supabase/config";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  authNextStorageKey,
  mergeAuthDebugTrail,
  sanitizeAuthDebugMessage,
  writeAuthDebugTrail,
} from "@/lib/supabase/debug";

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configured = hasSupabasePublicConfig(getSupabasePublicConfig());

  async function signInWithGoogle() {
    setLoading(true);
    setError(null);

    if (!configured) {
      setLoading(false);
      setError("Supabase is not configured for this environment yet.");
      return;
    }

    const supabase = createBrowserSupabaseClient();

    if (!supabase) {
      setLoading(false);
      setError("Supabase is not configured for this environment yet.");
      return;
    }

    const redirectTo = new URL("/auth/callback", window.location.origin);

    window.sessionStorage.setItem(authNextStorageKey, "/");
    writeAuthDebugTrail({
      callbackStage: "oauth-start-clicked",
      hasCode: false,
      oauthStartAttempted: true,
      oauthStartSucceeded: false,
      browserExchangeAttempted: false,
      browserExchangeSucceeded: false,
      browserSessionExists: false,
      syncProfileAttempted: false,
      syncProfileReceivedSession: false,
      syncProfileSucceeded: false,
      syncProfileCookieWriteAttempted: false,
      syncProfileCookieCount: 0,
      serverSessionExists: false,
      profileEmail: null,
      profileRole: null,
      profileStatus: null,
      lastErrorCode: null,
      lastErrorMessage: null,
    });

    const { data, error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectTo.toString(),
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (signInError || !data.url) {
      mergeAuthDebugTrail({
        callbackStage: "oauth-start-failed",
        oauthStartSucceeded: false,
        lastErrorCode: signInError?.name ?? "MissingOAuthUrl",
        lastErrorMessage: sanitizeAuthDebugMessage(
          signInError?.message ?? "Missing Google OAuth redirect URL.",
        ),
      });
      setLoading(false);
      setError("Google sign-in could not start. Please try again.");
      return;
    }

    mergeAuthDebugTrail({
      callbackStage: "oauth-start-redirecting",
      oauthStartSucceeded: true,
    });
  }

  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={!configured || loading}
        className="btn-primary disabled:cursor-not-allowed disabled:opacity-55"
      >
        {loading ? "Opening Google..." : "Sign in with Google"}
      </button>
      {!configured && (
        <p className="rounded-lg border border-lf-orange/30 bg-lf-orangeSoft px-3 py-2 text-sm font-semibold text-lf-orangeDark">
          Supabase public env vars are not configured yet. Add
          NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable
          Google sign-in.
        </p>
      )}
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
