"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ROLE_STORAGE_KEY,
  RoleId,
  findRole,
} from "@/lib/roles";

export default function RoleBanner() {
  const [role, setRole] = useState<RoleId | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(ROLE_STORAGE_KEY);
      if (stored) setRole(stored as RoleId);
    } catch {
      // localStorage may be unavailable. Ignore.
    }
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
            Local preview only. Not real authentication.
          </span>
        </p>
      </div>
    </div>
  );
}
