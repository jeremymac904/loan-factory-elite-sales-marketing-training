"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSafeNextPath } from "@/lib/supabase/auth";
import {
  createBrowserOAuthSupabaseClient,
  createBrowserSupabaseClient,
} from "@/lib/supabase/client";

type SyncResult = {
  redirectTo?: string;
  reason?: string;
};

export default function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState(
    "Exchanging your Google sign-in code.",
  );

  useEffect(() => {
    let active = true;

    async function finishSignIn() {
      const code = searchParams.get("code");
      const next = getSafeNextPath(searchParams.get("next"));

      if (!code) {
        router.replace("/login/?error=missing-code");
        return;
      }

      const supabase = createBrowserOAuthSupabaseClient();

      if (!supabase) {
        router.replace("/login/?error=supabase-not-configured");
        return;
      }

      const { data, error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (!active) return;

      if (exchangeError) {
        console.error("Supabase browser auth code exchange failed", {
          message: exchangeError.message,
          name: exchangeError.name,
          status: exchangeError.status,
        });
        router.replace("/login/?error=auth-callback");
        return;
      }

      const accessToken = data.session?.access_token;
      const refreshToken = data.session?.refresh_token;

      if (!accessToken || !refreshToken) {
        router.replace("/login/?error=missing-session");
        return;
      }

      const appSupabase = createBrowserSupabaseClient();

      if (!appSupabase) {
        router.replace("/login/?error=supabase-not-configured");
        return;
      }

      const { error: appSessionError } = await appSupabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (!active) return;

      if (appSessionError) {
        console.error("Supabase browser session persistence failed", {
          message: appSessionError.message,
          name: appSessionError.name,
          status: appSessionError.status,
        });
        router.replace("/login/?error=session-persistence");
        return;
      }

      setMessage("Syncing your approved beta profile.");

      const syncResponse = await fetch("/auth/sync-profile/", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, next, refreshToken }),
      });

      if (!active) return;

      let result: SyncResult = {};

      try {
        result = (await syncResponse.json()) as SyncResult;
      } catch {
        result = {};
      }

      if (!syncResponse.ok || !result.redirectTo) {
        const reason = result.reason ?? "profile-sync";
        router.replace(`/access-pending/?reason=${encodeURIComponent(reason)}`);
        return;
      }

      await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);

      router.replace(result.redirectTo);
    }

    void finishSignIn();

    return () => {
      active = false;
    };
  }, [router, searchParams]);

  return <p className="mt-4 text-lf-slate">{message}</p>;
}
