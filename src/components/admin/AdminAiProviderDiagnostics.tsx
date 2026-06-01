"use client";

import { useEffect, useState } from "react";

type ProviderHealthState = {
  primaryProvider: string;
  primaryProviderLabel: string;
  assistantModel: string;
  primaryProviderConfigured: boolean;
  deepseekConfigured: boolean;
  deepseekBaseUrlConfigured: boolean;
  lastTestStatus: string;
  lastTestCheckedAt: string | null;
  safeMode: "draft-only";
};

type Props = {
  requiredRole: string;
};

export default function AdminAiProviderDiagnostics({ requiredRole }: Props) {
  const [state, setState] = useState<ProviderHealthState | null>(null);
  const [note, setNote] = useState("Checking provider status...");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch("/api/admin/ai/provider/status", {
          cache: "no-store",
        });
        const payload = (await response.json().catch(() => null)) as
          | Partial<ProviderHealthState & { message?: string }>
          | null;

        if (!active) return;

        if (!response.ok) {
          setNote(
            typeof payload?.message === "string" && payload.message.trim()
              ? payload.message
              : "AI provider status is unavailable.",
          );
          setState(null);
          return;
        }

        setState({
          primaryProvider: payload?.primaryProvider ?? "deepseek",
          primaryProviderLabel: payload?.primaryProviderLabel ?? "DeepSeek",
          assistantModel: payload?.assistantModel ?? "not-configured",
          primaryProviderConfigured: Boolean(
            payload?.primaryProviderConfigured,
          ),
          deepseekConfigured: Boolean(payload?.deepseekConfigured),
          deepseekBaseUrlConfigured: Boolean(
            payload?.deepseekBaseUrlConfigured,
          ),
          lastTestStatus: payload?.lastTestStatus ?? "not run",
          lastTestCheckedAt: payload?.lastTestCheckedAt ?? null,
          safeMode: payload?.safeMode ?? "draft-only",
        });
        setNote("");
      } catch {
        if (!active) return;
        setState(null);
        setNote("AI provider status is unavailable.");
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="container-page pb-10">
      <div className="card border-lf-orange/30 bg-lf-orangeSoft/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
              AI provider diagnostics
            </p>
            <h2 className="h-display text-xl">DeepSeek status</h2>
          </div>
          <span className="rounded-full border border-lf-orange/30 bg-white px-2.5 py-0.5 text-xs font-semibold text-lf-orangeDark">
            {requiredRole}
          </span>
        </div>

        {note && (
          <p className="mt-3 text-sm text-lf-slate">
            {note}
          </p>
        )}

        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-3">
          <Stat label="Primary provider" value={state?.primaryProviderLabel ?? "Loading"} />
          <Stat
            label="Primary provider configured"
            value={
              state === null
                ? "Loading"
                : state.primaryProviderConfigured
                  ? "Yes"
                  : "No"
            }
          />
          <Stat label="Assistant model" value={state?.assistantModel ?? "Loading"} />
          <Stat
            label="DeepSeek configured"
            value={
              state === null
                ? "Loading"
                : state.deepseekConfigured
                  ? "Yes"
                  : "No"
            }
          />
          <Stat
            label="Base URL present"
            value={
              state === null
                ? "Loading"
                : state.deepseekBaseUrlConfigured
                  ? "Yes"
                  : "No"
            }
          />
          <Stat label="Safe mode" value={state?.safeMode === "draft-only" ? "Draft-only" : "Loading"} />
          <Stat label="Last test status" value={state?.lastTestStatus ?? "Pending"} />
          <Stat label="Last test checked" value={state?.lastTestCheckedAt ?? "Pending"} />
        </dl>

        {!state?.primaryProviderConfigured && (
          <div className="mt-4 rounded-lg border border-lf-line bg-white p-4 text-sm">
            <p className="font-semibold text-lf-charcoal">
              Netlify env vars needed
            </p>
            <ul className="mt-2 grid gap-1 text-xs text-lf-slate">
              <li><code>DEEPSEEK_API_KEY</code></li>
              <li><code>DEEPSEEK_BASE_URL</code></li>
              <li><code>DEEPSEEK_MODEL</code></li>
              <li><code>AI_PRIMARY_PROVIDER=deepseek</code></li>
              <li><code>AI_ASSISTANT_MODEL=&lt;exact DeepSeek Flash v4 Chat model id&gt;</code></li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-lf-line bg-white px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
        {label}
      </dt>
      <dd className="mt-1 break-words font-semibold text-lf-charcoal">
        {value}
      </dd>
    </div>
  );
}
