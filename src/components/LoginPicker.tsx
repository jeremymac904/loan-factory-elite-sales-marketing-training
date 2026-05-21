"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ROLE_PREVIEW_DISCLAIMER,
  ROLE_STORAGE_KEY,
  RoleId,
  findRole,
  roles,
} from "@/lib/roles";

export default function LoginPicker() {
  const [active, setActive] = useState<RoleId | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(ROLE_STORAGE_KEY);
      if (stored) setActive(stored as RoleId);
    } catch {
      // ignore
    }
  }, []);

  function pick(id: RoleId) {
    try {
      window.localStorage.setItem(ROLE_STORAGE_KEY, id);
      setActive(id);
      window.dispatchEvent(new Event("lf-role-changed"));
    } catch {
      // ignore
    }
  }

  function clear() {
    try {
      window.localStorage.removeItem(ROLE_STORAGE_KEY);
      setActive(null);
      window.dispatchEvent(new Event("lf-role-changed"));
    } catch {
      // ignore
    }
  }

  const current = findRole(active);

  return (
    <>
      <section className="container-page py-10">
        <div className="card flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Current preview
            </p>
            <p className="prose-lf mt-1 text-base">
              {current
                ? `Previewing as ${current.name} (${current.group}).`
                : "No role selected. Pick one below."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {current && (
              <button
                type="button"
                onClick={clear}
                className="btn-secondary"
              >
                Clear preview
              </button>
            )}
            <Link href="/" className="btn-primary">
              Go to home
            </Link>
          </div>
        </div>

        <p className="mt-4 text-xs text-lf-slate">{ROLE_PREVIEW_DISCLAIMER}</p>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => {
            const isActive = active === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => pick(r.id)}
                className={`card flex h-full flex-col gap-2 text-left transition hover:shadow-lift ${
                  isActive ? "ring-2 ring-lf-orange ring-offset-2" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {r.group}
                  </span>
                  {isActive && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-lf-orange/40 bg-lf-orangeSoft px-2.5 py-0.5 text-xs font-semibold text-lf-orangeDark">
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-lf-orange"
                      />
                      Active
                    </span>
                  )}
                </div>
                <h3 className="h-display text-lg">{r.name}</h3>
                <p className="prose-lf text-sm text-lf-slate">{r.description}</p>
                <span className="mt-auto text-sm font-semibold text-lf-navy">
                  {isActive ? "Selected" : "Preview as this role"}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}
