"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const authNextStorageKey = "loan-factory-auth-next";

type CallbackState =
  | { status: "working"; message: string }
  | { status: "error"; message: string; stage: string };

export default function BrowserAuthCallbackPage() {
  const [state, setState] = useState<CallbackState>({
    status: "working",
    message: "Finishing Google sign-in...",
  });

  useEffect(() => {
    let active = true;

    async function finishSignIn() {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      const fallbackNext =
        window.sessionStorage.getItem(authNextStorageKey) ?? "/";
      const next = searchParams.get("next") ?? fallbackNext;

      if (!code) {
        window.location.replace(
          "/login/?error=missing-code&stage=browser-callback-missing-code",
        );
        return;
      }

      const supabase = createBrowserSupabaseClient();

      if (!supabase) {
        window.location.replace(
          "/login/?error=supabase-not-configured&stage=browser-callback-config",
        );
        return;
      }

      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error || !data.session) {
        console.error("Supabase browser callback exchange failed", {
          message: error?.message ?? "Missing browser session after exchange",
          name: error?.name,
          status: error?.status,
          stage: "browser-callback-exchange",
        });

        window.location.replace(
          "/login/?error=auth-callback&stage=browser-callback-exchange",
        );
        return;
      }

      if (!data.session.access_token || !data.session.refresh_token) {
        window.location.replace(
          "/login/?error=auth-callback&stage=browser-session-missing",
        );
        return;
      }

      if (active) {
        setState({
          status: "working",
          message: "Checking beta access...",
        });
      }

      const response = await fetch("/auth/sync-profile/", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          next,
        }),
      });

      let body: { redirectTo?: string; reason?: string } | null = null;

      try {
        body = (await response.json()) as {
          redirectTo?: string;
          reason?: string;
        };
      } catch {
        body = null;
      }

      if (!response.ok || !body?.redirectTo) {
        const stage = body?.reason
          ? `browser-sync-${body.reason}`
          : "browser-sync-profile";

        console.error("Supabase browser token sync failed", {
          status: response.status,
          stage,
        });

        window.location.replace(
          `/login/?error=auth-callback&stage=${encodeURIComponent(stage)}`,
        );
        return;
      }

      window.sessionStorage.removeItem(authNextStorageKey);
      window.location.replace(body.redirectTo);
    }

    void finishSignIn();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="container-page py-16">
      <div className="card max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          Google sign-in
        </span>
        <h1 className="h-display mt-1 text-3xl">
          {state.status === "working" ? "Finishing sign in" : "Sign in issue"}
        </h1>
        <p className="prose-lf mt-3 text-base">{state.message}</p>
        {state.status === "error" && (
          <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            Stage: {state.stage}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/login/" className="btn-primary">
            Back to sign in
          </Link>
          <Link href="/auth/status/" className="btn-secondary">
            Check auth status
          </Link>
        </div>
      </div>
    </section>
  );
}
