"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  authNextStorageKey,
  type AuthDebugTrail,
  mergeAuthDebugTrail,
  sanitizeAuthDebugMessage,
} from "@/lib/supabase/debug";

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
      const callbackStage =
        searchParams.get("stage") ?? "browser-callback-loaded";
      const fallbackNext =
        window.sessionStorage.getItem(authNextStorageKey) ?? "/";
      const next = searchParams.get("next") ?? fallbackNext;

      mergeAuthDebugTrail({
        callbackStage,
        hasCode: Boolean(code),
      });

      if (!code) {
        mergeAuthDebugTrail({
          callbackStage: "browser-callback-missing-code",
          lastErrorCode: "MissingCode",
          lastErrorMessage: "The browser callback did not receive a code.",
        });
        window.location.replace(
          "/login/?error=missing-code&stage=browser-callback-missing-code",
        );
        return;
      }

      const supabase = createBrowserSupabaseClient();

      if (!supabase) {
        mergeAuthDebugTrail({
          callbackStage: "browser-callback-config",
          lastErrorCode: "SupabaseNotConfigured",
          lastErrorMessage: "Supabase public configuration is missing.",
        });
        window.location.replace(
          "/login/?error=supabase-not-configured&stage=browser-callback-config",
        );
        return;
      }

      mergeAuthDebugTrail({
        browserExchangeAttempted: true,
        browserExchangeSucceeded: false,
      });

      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error || !data.session) {
        mergeAuthDebugTrail({
          callbackStage: "browser-callback-exchange",
          browserExchangeSucceeded: false,
          browserSessionExists: false,
          lastErrorCode: error?.name ?? "MissingBrowserSession",
          lastErrorMessage: sanitizeAuthDebugMessage(
            error?.message ?? "Missing browser session after exchange.",
          ),
        });
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
        mergeAuthDebugTrail({
          callbackStage: "browser-session-missing",
          browserExchangeSucceeded: true,
          browserSessionExists: false,
          lastErrorCode: "BrowserSessionMissingTokens",
          lastErrorMessage: "Browser session did not include both token fields.",
        });
        window.location.replace(
          "/login/?error=auth-callback&stage=browser-session-missing",
        );
        return;
      }

      const {
        data: { session: browserSession },
      } = await supabase.auth.getSession();

      mergeAuthDebugTrail({
        browserExchangeSucceeded: true,
        browserSessionExists: Boolean(browserSession?.user),
        profileEmail: browserSession?.user.email ?? data.session.user.email,
      });

      if (active) {
        setState({
          status: "working",
          message: "Checking approved access...",
        });
      }

      mergeAuthDebugTrail({
        syncProfileAttempted: true,
        syncProfileReceivedSession: true,
        syncProfileSucceeded: false,
      });

      window.sessionStorage.removeItem(authNextStorageKey);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/auth/sync-profile/";
      form.style.display = "none";

      const fields: Record<string, string> = {
        accessToken: data.session.access_token,
        expiresAt: String(data.session.expires_at ?? ""),
        expiresIn: String(data.session.expires_in ?? ""),
        next,
        refreshToken: data.session.refresh_token,
        responseMode: "redirect",
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
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
