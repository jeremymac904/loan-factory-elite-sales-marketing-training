"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSafeNextPath } from "@/lib/supabase/auth";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

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

      const supabase = createBrowserSupabaseClient();

      if (!supabase) {
        router.replace("/login/?error=supabase-not-configured");
        return;
      }

      const { error: exchangeError } =
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

      setMessage("Syncing your approved beta profile.");

      const syncResponse = await fetch("/auth/sync-profile/", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ next }),
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

      router.replace(result.redirectTo);
    }

    void finishSignIn();

    return () => {
      active = false;
    };
  }, [router, searchParams]);

  return <p className="mt-4 text-lf-slate">{message}</p>;
}
