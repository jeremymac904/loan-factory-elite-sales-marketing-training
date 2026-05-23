"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSafeNextPath } from "@/lib/supabase/auth";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type SyncResult = {
  redirectTo?: string;
  reason?: string;
};

type SessionTokens = {
  accessToken: string;
  refreshToken: string;
};

export default function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState(
    "Finishing your Google sign-in.",
  );

  useEffect(() => {
    let active = true;

    async function syncServerSession(tokens: SessionTokens, next: string) {
      const syncResponse = await fetch("/auth/sync-profile/", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: tokens.accessToken,
          next,
          refreshToken: tokens.refreshToken,
        }),
      });

      let result: SyncResult = {};

      try {
        result = (await syncResponse.json()) as SyncResult;
      } catch {
        result = {};
      }

      return { result, syncResponse };
    }

    async function finishSignIn() {
      const code = searchParams.get("code");
      const next = getSafeNextPath(searchParams.get("next"));

      if (!code) {
        router.replace("/login/?error=missing-code");
        return;
      }

      const supabase = createBrowserSupabaseClient();

      if (!supabase) {
        router.replace("/login/?error=supabase-not-configured");
        return;
      }

      const { data, error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (!active) return;

      let accessToken = data.session?.access_token;
      let refreshToken = data.session?.refresh_token;

      if (exchangeError || !accessToken || !refreshToken) {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!active) return;

        accessToken = session?.access_token;
        refreshToken = session?.refresh_token;

        if (!accessToken || !refreshToken) {
          console.error("Supabase browser auth callback failed", {
            hasCode: Boolean(code),
            hasExistingSession: Boolean(session),
            message:
              exchangeError?.message ??
              "Missing session after browser code exchange",
            name: exchangeError?.name,
            status: exchangeError?.status,
            step: "browser-exchange",
          });
          router.replace("/login/?error=auth-callback");
          return;
        }
      }

      setMessage("Syncing your approved beta profile.");

      const { result, syncResponse } = await syncServerSession(
        { accessToken, refreshToken },
        next,
      );

      if (!active) return;

      if (!syncResponse.ok || !result.redirectTo) {
        const reason = result.reason ?? "profile-sync";
        router.replace(`/access-pending/?reason=${encodeURIComponent(reason)}`);
        return;
      }

      window.localStorage.removeItem("lf-lo-dev-oauth");
      window.localStorage.removeItem("lf-lo-dev-oauth-code-verifier");

      window.location.replace(result.redirectTo);
    }

    void finishSignIn();

    return () => {
      active = false;
    };
  }, [router, searchParams]);

  return <p className="mt-4 text-lf-slate">{message}</p>;
}
