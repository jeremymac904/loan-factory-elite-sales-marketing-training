"use client";

import Link from "next/link";
import { findRole } from "@/lib/roles";
import { useRolePreview } from "@/lib/useRolePreview";

export default function RoleBanner() {
  const role = useRolePreview();
  const r = findRole(role);
  if (!r) return null;

  return (
    <div className="border-b border-lf-orange/40 bg-lf-orangeSoft/60">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-2 text-xs text-lf-orangeDark">
        <p>
          <span className="font-semibold">Role preview:</span>{" "}
          {r.name} ({r.group})
        </p>
        <p className="flex items-center gap-3">
          <Link
            href="/login/"
            className="font-semibold underline decoration-lf-orange/50 underline-offset-2 hover:decoration-lf-orange"
          >
            Switch role
          </Link>
          <span className="hidden text-lf-orangeDark/70 md:inline">
            Browser role preview.
          </span>
        </p>
      </div>
    </div>
  );
}
