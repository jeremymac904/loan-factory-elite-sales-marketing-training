"use client";

import { useState } from "react";
import { getRoleDashboardHref, getRoleLabel } from "@/lib/supabase/auth";

type UserOption = {
  email: string;
  name: string;
  role: string;
};

type Props = {
  roleOptions: string[];
  userOptions: UserOption[];
  isMasterAdmin: boolean;
  hasActiveViewAs: boolean;
  initialRole?: string;
};

export default function ViewAsPicker({
  roleOptions,
  userOptions,
  isMasterAdmin,
  hasActiveViewAs,
  initialRole,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState(
    initialRole && roleOptions.includes(initialRole)
      ? initialRole
      : roleOptions[0] ?? "",
  );
  const [userEmail, setUserEmail] = useState("");

  async function startViewAs(payload: {
    role: string;
    email?: string;
    name?: string;
  }) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/view-as", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setError(body.error ?? "Could not start view as role.");
        setLoading(false);
        return;
      }
      // Full reload (matches ViewAsExitButton) so the whole shell re-resolves
      // the new view-as role and any open account dropdown cannot persist.
      // Land on the previewed role's dashboard.
      window.location.assign(getRoleDashboardHref(payload.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : "View as role failed.");
      setLoading(false);
    }
  }

  async function exitViewAs() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/view-as", { method: "DELETE" });
      if (!response.ok) {
        setError("Could not exit view as role.");
        setLoading(false);
        return;
      }
      // Full reload back to Master Admin (matches ViewAsExitButton).
      window.location.assign("/admin/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Exit failed.");
      setLoading(false);
    }
  }

  function handleRoleStart() {
    if (role) startViewAs({ role });
  }

  function handleUserStart() {
    const user = userOptions.find((u) => u.email === userEmail);
    if (user) {
      startViewAs({ role: user.role, email: user.email, name: user.name });
    }
  }

  return (
    <div className="card">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Role dropdown */}
        <div>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              View as role
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
              className="mt-1 w-full rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal focus:border-lf-orange focus:outline-none focus:ring-1 focus:ring-lf-orange disabled:opacity-50"
            >
              {roleOptions.map((r) => (
                <option key={r} value={r}>
                  {getRoleLabel(r)}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={handleRoleStart}
            disabled={loading || !role}
            className="btn-primary mt-3 w-full text-sm disabled:opacity-50"
          >
            View this role
          </button>
        </div>

        {/* User dropdown (master admin only) */}
        <div>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              View as user
            </span>
            <select
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              disabled={loading || !isMasterAdmin}
              className="mt-1 w-full rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal focus:border-lf-orange focus:outline-none focus:ring-1 focus:ring-lf-orange disabled:opacity-50"
            >
              <option value="">
                {isMasterAdmin ? "Select a seeded user…" : "Master admin only"}
              </option>
              {isMasterAdmin &&
                userOptions.map((u) => (
                  <option key={u.email} value={u.email}>
                    {u.name} · {getRoleLabel(u.role)}
                  </option>
                ))}
            </select>
          </label>
          <button
            type="button"
            onClick={handleUserStart}
            disabled={loading || !isMasterAdmin || !userEmail}
            className="btn-secondary mt-3 w-full text-sm disabled:opacity-50"
          >
            View this user
          </button>
        </div>
      </div>

      {hasActiveViewAs && (
        <div className="mt-5 border-t border-lf-line pt-4">
          <button
            type="button"
            onClick={exitViewAs}
            disabled={loading}
            className="rounded-lg border border-lf-orange bg-lf-orangeSoft px-4 py-2 text-sm font-semibold text-lf-orangeDark transition hover:bg-lf-orange hover:text-white disabled:opacity-50"
          >
            Exit view as role
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
