"use client";

import { useEffect, useState } from "react";
import { getRoleLabel } from "@/lib/supabase/auth";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
} from "@/lib/supabase/config";

type ClientStatus =
  | { status: "loading" }
  | { status: "not-configured" }
  | { status: "signed-out" }
  | {
      status: "signed-in";
      email: string;
      profileStatus: string | null;
      role: string | null;
      profileError: string | null;
    };

export default function AuthClientStatus() {
  const supabaseConfigured = hasSupabasePublicConfig(getSupabasePublicConfig());
  const [status, setStatus] = useState<ClientStatus>(() =>
    supabaseConfigured ? { status: "loading" } : { status: "not-configured" },
  );

  useEffect(() => {
    if (!supabaseConfigured) return;

    const supabase = createBrowserSupabaseClient();

    if (!supabase) return;

    const client = supabase;
    let active = true;

    async function loadStatus() {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!active) return;

      if (!user?.email) {
        setStatus({ status: "signed-out" });
        return;
      }

      const { data: profile, error: profileError } = await client
        .from("profiles")
        .select("status,role")
        .eq("id", user.id)
        .maybeSingle<{ status: string | null; role: string | null }>();

      if (!active) return;

      setStatus({
        status: "signed-in",
        email: user.email,
        profileStatus: profile?.status ?? null,
        role: profile?.role ?? null,
        profileError: profileError?.message ?? null,
      });
    }

    void loadStatus();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(() => {
      void loadStatus();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabaseConfigured]);

  return (
    <div className="card">
      <h2 className="h-display text-2xl">Browser session</h2>
      <dl className="mt-5 grid gap-3 text-sm">
        <StatusLine label="Client status" value={formatStatus(status.status)} />
        {status.status === "signed-in" && (
          <>
            <StatusLine label="Email" value={status.email} />
            <StatusLine
              label="Profile status"
              value={status.profileStatus ?? "No profile row visible"}
            />
            <StatusLine label="Role" value={getRoleLabel(status.role)} />
            <StatusLine
              label="Profile query"
              value={status.profileError ?? "OK"}
            />
          </>
        )}
      </dl>
    </div>
  );
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-lf-slate">{label}</dt>
      <dd className="mt-1 break-words text-lf-charcoal">{value}</dd>
    </div>
  );
}

function formatStatus(status: ClientStatus["status"]) {
  return status.replaceAll("-", " ");
}
