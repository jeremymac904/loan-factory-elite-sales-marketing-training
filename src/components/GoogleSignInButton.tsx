"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  getAuthCallbackUrl,
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
} from "@/lib/supabase/config";

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configured = hasSupabasePublicConfig(getSupabasePublicConfig());

  async function signInWithGoogle() {
    setLoading(true);
    setError(null);

    const supabase = createBrowserSupabaseClient();

    if (!supabase) {
      setLoading(false);
      setError("Supabase is not configured for this environment yet.");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getAuthCallbackUrl(),
      },
    });

    if (signInError) {
      setLoading(false);
      setError(signInError.message);
    }
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
