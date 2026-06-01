"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
} from "@/lib/supabase/config";

type BrowserAuthState = {
  sessionDetected: boolean;
  userEmail: string | null;
  approvedUserStatus: string | null;
  resolvedRole: string | null;
  cookieReadStatus: string;
  clientAuthReadStatus: string;
  lastAuthCheckTime: string | null;
};

type Props = {
  serverAuthReadStatus: string;
  serverUserEmail?: string | null;
  serverResolvedRole?: string | null;
  requiredRole: string;
};

export default function AdminAuthDiagnostics({
  serverAuthReadStatus,
  serverUserEmail = null,
  serverResolvedRole = null,
  requiredRole,
}: Props) {
  const [browser, setBrowser] = useState<BrowserAuthState>({
    sessionDetected: false,
    userEmail: null,
    approvedUserStatus: null,
    resolvedRole: null,
    cookieReadStatus: "unknown",
    clientAuthReadStatus: "checking",
    lastAuthCheckTime: null,
  });

  useEffect(() => {
    let active = true;

    async function load() {
      const hasConfig = hasSupabasePublicConfig(getSupabasePublicConfig());
      const supabase = createBrowserSupabaseClient();
      const cookies = typeof document !== "undefined" ? document.cookie : "";
      const cookieReadStatus =
        cookies.includes("sb-") || cookies.includes("lf-beta-session=")
          ? "present"
          : "missing";

      if (!supabase || !hasConfig) {
        if (active) {
          setBrowser({
            sessionDetected: false,
            userEmail: null,
            approvedUserStatus: null,
            resolvedRole: null,
            cookieReadStatus,
            clientAuthReadStatus: hasConfig ? "client unavailable" : "not configured",
            lastAuthCheckTime: new Date().toISOString(),
          });
        }
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      let approvedUserStatus: string | null = null;
      let resolvedRole: string | null = null;

      if (user?.id) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("status,role")
          .eq("id", user.id)
          .maybeSingle<{ status: string | null; role: string | null }>();

        approvedUserStatus = profile?.status ?? null;
        resolvedRole = profile?.role ?? null;
      }

      if (!active) return;

      setBrowser({
        sessionDetected: Boolean(user?.id),
        userEmail: user?.email ?? null,
        approvedUserStatus,
        resolvedRole,
        cookieReadStatus,
        clientAuthReadStatus: user?.id ? "signed-in" : "signed-out",
        lastAuthCheckTime: new Date().toISOString(),
      });
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="container-page pb-10">
      <div className="card border-lf-orange/30 bg-lf-orangeSoft/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
              Admin diagnostics
            </p>
            <h2 className="h-display text-xl">Auth read comparison</h2>
          </div>
          <span className="rounded-full border border-lf-orange/30 bg-white px-2.5 py-0.5 text-xs font-semibold text-lf-orangeDark">
            {requiredRole}
          </span>
        </div>

        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-3">
          <Stat label="Server auth read status" value={serverAuthReadStatus} />
          <Stat label="Server user email" value={serverUserEmail ?? "—"} />
          <Stat label="Server resolved role" value={serverResolvedRole ?? "—"} />
          <Stat label="Client auth read status" value={browser.clientAuthReadStatus} />
          <Stat label="Client session detected" value={browser.sessionDetected ? "Yes" : "No"} />
          <Stat label="Client user email" value={browser.userEmail ?? "—"} />
          <Stat
            label="Approved user status"
            value={browser.approvedUserStatus ?? "—"}
          />
          <Stat label="Resolved role" value={browser.resolvedRole ?? "—"} />
          <Stat label="Cookie read status" value={browser.cookieReadStatus} />
          <Stat
            label="Last auth check"
            value={browser.lastAuthCheckTime ?? "Pending"}
          />
        </dl>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-lf-line bg-white px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
        {label}
      </dt>
      <dd className="mt-1 break-words font-semibold text-lf-charcoal">
        {value}
      </dd>
    </div>
  );
}
