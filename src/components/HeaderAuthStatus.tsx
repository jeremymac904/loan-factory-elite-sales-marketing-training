"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRoleLabel } from "@/lib/supabase/auth";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
} from "@/lib/supabase/config";

type Props = {
  variant?: "desktop" | "mobile";
};

type HeaderState =
  | { status: "loading" }
  | { status: "logged-out" }
  | {
      status: "logged-in";
      email: string;
      role: string | null;
      profileStatus: string | null;
    };

export default function HeaderAuthStatus({ variant = "desktop" }: Props) {
  const supabaseConfigured = hasSupabasePublicConfig(getSupabasePublicConfig());
  const [state, setState] = useState<HeaderState>(() =>
    supabaseConfigured ? { status: "loading" } : { status: "logged-out" },
  );

  useEffect(() => {
    if (!supabaseConfigured) return;

    const supabase = createBrowserSupabaseClient();

    if (!supabase) return;

    const client = supabase;
    let active = true;

    async function loadUser() {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!active) return;

      if (!user) {
        setState({ status: "logged-out" });
        return;
      }

      const { data: profile } = await client
        .from("profiles")
        .select("email,role,status")
        .eq("id", user.id)
        .maybeSingle<{ email: string; role: string | null; status: string | null }>();

      if (!active) return;

      setState({
        status: "logged-in",
        email: profile?.email ?? user.email ?? "Signed in",
        role: profile?.role ?? null,
        profileStatus: profile?.status ?? null,
      });
    }

    void loadUser();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(() => {
      void loadUser();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabaseConfigured]);

  if (state.status !== "logged-in") {
    return (
      <Link
        href="/login/"
        className={
          variant === "mobile"
            ? "rounded-lg bg-lf-navy px-3 py-3 text-center text-base font-semibold text-white hover:bg-lf-orange"
            : "inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-lf-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-lf-orange"
        }
      >
        Sign In
      </Link>
    );
  }

  const roleLabel =
    state.profileStatus === "approved" ? getRoleLabel(state.role) : "Pending";

  return (
    <div
      className={
        variant === "mobile"
          ? "grid gap-2 rounded-xl border border-lf-line bg-lf-mist p-3"
          : "flex items-center gap-2"
      }
    >
      <Link
        href={state.role === "admin" ? "/admin/" : "/resources/"}
        className={
          variant === "mobile"
            ? "rounded-lg bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal hover:text-lf-orange"
            : "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
        }
      >
        {variant === "mobile" ? `${state.email} · ${roleLabel}` : roleLabel}
      </Link>
      <Link
        href="/auth/sign-out/"
        className={
          variant === "mobile"
            ? "rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-slate hover:text-lf-orange"
            : "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-lf-slate transition hover:bg-lf-mist hover:text-lf-orange"
        }
      >
        Sign Out
      </Link>
    </div>
  );
}
