"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getRoleLabel } from "@/lib/supabase/auth";

type UserOption = {
  email: string;
  name: string;
  role: string;
};

type Props = {
  roleOptions: string[];
  userOptions: UserOption[];
  isMasterAdmin: boolean;
};

export default function ViewAsControls({
  roleOptions,
  userOptions,
  isMasterAdmin,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        return;
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "View as role failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card">
        <h2 className="h-display text-xl">View as role</h2>
        <p className="prose-lf mt-2 text-sm text-lf-slate">
          Pick any role to preview how the platform looks for that group.
        </p>
        <div className="mt-4 grid gap-2">
          {roleOptions.map((role) => (
            <button
              key={role}
              type="button"
              disabled={loading}
              onClick={() => startViewAs({ role })}
              className="flex items-center justify-between rounded-lg border border-lf-line bg-white px-4 py-2.5 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange disabled:opacity-50"
            >
              <span>{getRoleLabel(role)}</span>
              <span aria-hidden className="text-lf-slate">&rarr;</span>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="h-display text-xl">View as user</h2>
        <p className="prose-lf mt-2 text-sm text-lf-slate">
          {isMasterAdmin
            ? "Pick any seeded approved user to preview as them."
            : "Master admin only."}
        </p>
        {isMasterAdmin && (
          <div className="mt-4 max-h-96 overflow-y-auto pr-1">
            <div className="grid gap-2">
              {userOptions.map((user) => (
                <button
                  key={user.email}
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    startViewAs({
                      role: user.role,
                      email: user.email,
                      name: user.name,
                    })
                  }
                  className="rounded-lg border border-lf-line bg-white px-4 py-2.5 text-left text-sm transition hover:border-lf-orange disabled:opacity-50"
                >
                  <div className="font-semibold text-lf-charcoal">
                    {user.name}
                  </div>
                  <div className="text-xs text-lf-slate">
                    {user.email} · {getRoleLabel(user.role)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="col-span-full rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
