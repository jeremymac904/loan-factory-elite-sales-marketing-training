"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import {
  GatedSurface,
  ROLE_PREVIEW_DISCLAIMER,
  ROLE_STORAGE_KEY,
  RoleId,
  findRole,
  isAllowed,
} from "@/lib/roles";

type Props = {
  gate: GatedSurface;
  children: ReactNode;
};

export default function RoleGate({ gate, children }: Props) {
  const [role, setRole] = useState<RoleId | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(ROLE_STORAGE_KEY);
      if (stored) setRole(stored as RoleId);
    } catch {
      // ignore
    }
    setHydrated(true);
    const handler = () => {
      try {
        const stored = window.localStorage.getItem(ROLE_STORAGE_KEY);
        setRole(stored as RoleId | null);
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", handler);
    window.addEventListener("lf-role-changed", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("lf-role-changed", handler);
    };
  }, []);

  // During hydration we render nothing to avoid a flash of either state.
  // The page hero and disclaimer below the gate still render via the parent.
  if (!hydrated) {
    return (
      <div className="container-page py-16">
        <div className="card animate-pulse h-32" />
      </div>
    );
  }

  const r = findRole(role);
  const allowed = isAllowed(gate, role);

  if (allowed) {
    return <>{children}</>;
  }

  // Friendly notice when an LO or anonymous visitor hits the page.
  return (
    <section className="container-page py-16">
      <div className="card max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          Role preview
        </span>
        <h2 className="h-display mt-1 text-2xl">
          This section is for team leaders, coaches, and approved internal users.
        </h2>
        <p className="prose-lf mt-3 text-base">
          {r
            ? `You are previewing as ${r.name} (${r.group}). This view is limited to leadership, LO Development, corporate coaches, team leaders, and Marketing Reviewer roles.`
            : `No role is currently selected. Pick a role to preview which sections you would see.`}
        </p>
        <p className="prose-lf mt-3 text-sm text-lf-slate">
          {ROLE_PREVIEW_DISCLAIMER}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/login/" className="btn-primary">
            {r ? "Switch role" : "Choose a role"}
          </Link>
          <Link href="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
