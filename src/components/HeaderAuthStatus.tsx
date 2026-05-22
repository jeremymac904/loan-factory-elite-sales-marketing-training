"use client";

import Link from "next/link";
import { findRole } from "@/lib/roles";
import { setRolePreview, useRolePreview } from "@/lib/useRolePreview";

type Props = {
  variant?: "desktop" | "mobile";
};

export default function HeaderAuthStatus({ variant = "desktop" }: Props) {
  const role = useRolePreview();
  const currentRole = findRole(role);

  if (!currentRole) {
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

  return (
    <div
      className={
        variant === "mobile"
          ? "grid gap-2 rounded-xl border border-lf-line bg-lf-mist p-3"
          : "flex items-center gap-2"
      }
    >
      <Link
        href={currentRole.dashboardHref}
        className={
          variant === "mobile"
            ? "rounded-lg bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal hover:text-lf-orange"
            : "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
        }
      >
        {variant === "mobile"
          ? `Signed in as ${currentRole.name}`
          : currentRole.name}
      </Link>
      <button
        type="button"
        onClick={() => setRolePreview(null)}
        className={
          variant === "mobile"
            ? "rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-slate hover:text-lf-orange"
            : "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-lf-slate transition hover:bg-lf-mist hover:text-lf-orange"
        }
      >
        Sign Out
      </button>
    </div>
  );
}
