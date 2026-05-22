"use client";

import Link from "next/link";
import { ReactNode } from "react";
import {
  GatedSurface,
  ROLE_PREVIEW_DISCLAIMER,
  findRole,
  isAllowed,
} from "@/lib/roles";
import { useRolePreview } from "@/lib/useRolePreview";

type Props = {
  gate: GatedSurface;
  children: ReactNode;
};

export default function RoleGate({ gate, children }: Props) {
  const role = useRolePreview();
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
            ? `You are previewing as ${r.name} (${r.group}). This view is limited to admin, corporate coach, team leader, and marketing roles.`
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
