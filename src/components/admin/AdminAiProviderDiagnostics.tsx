"use client";

import { useEffect, useState } from "react";

type ProviderHealthState = {
  requestedPrimaryProvider: string;
  requestedPrimaryProviderLabel: string;
  requestedPrimaryProviderConfigured: boolean;
  requestedPrimaryProviderAllowed: boolean;
  primaryProvider: string;
  primaryProviderLabel: string;
  assistantModel: string;
  assistantModelSource: string;
  assistantModelBilling: string;
  assistantModelConfigured: boolean;
  assistantModelAllowed: boolean;
  defaultChatModel: string;
  defaultChatModelSource: string;
  defaultChatModelBilling: string;
  defaultChatModelConfigured: boolean;
  defaultChatModelAllowed: boolean;
  reasoningModel: string;
  reasoningModelSource: string;
  reasoningModelBilling: string;
  reasoningModelConfigured: boolean;
  reasoningModelAllowed: boolean;
  aiTranscriptionModel: string;
  aiTranscriptionModelSource: string;
  aiTranscriptionModelBilling: string;
  aiTranscriptionModelConfigured: boolean;
  aiTranscriptionModelAllowed: boolean;
  aiVisionModel: string;
  aiVisionModelSource: string;
  aiVisionModelBilling: string;
  aiVisionModelConfigured: boolean;
  aiVisionModelAllowed: boolean;
  aiVisionModelUsed: boolean;
  deepseekConfigured: boolean;
  deepseekBaseUrlConfigured: boolean;
  deepseekModel: string;
  openRouterConfigured: boolean;
  openRouterBaseUrlConfigured: boolean;
  openRouterModel: string;
  groqConfigured: boolean;
  groqBaseUrlConfigured: boolean;
  groqWhisperModel: string;
  openRouterAutoDisabled: boolean;
  paidFallbackDisabled: boolean;
  lastTestStatus: string;
  lastLiveProviderTestResult: string;
  lastTestCheckedAt: string | null;
  safeMode: "draft-only";
  blockedEnvWarnings: string[];
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

        const payloadWarnings = payload?.blockedEnvWarnings;
        const blockedEnvWarnings = Array.isArray(payloadWarnings)
          ? payloadWarnings.filter(
              (item): item is string => typeof item === "string",
            )
          : [];

        setState({
          requestedPrimaryProvider: payload?.requestedPrimaryProvider ?? "deepseek",
          requestedPrimaryProviderLabel:
            payload?.requestedPrimaryProviderLabel ?? "DeepSeek",
          requestedPrimaryProviderConfigured: Boolean(
            payload?.requestedPrimaryProviderConfigured,
          ),
          requestedPrimaryProviderAllowed: Boolean(
            payload?.requestedPrimaryProviderAllowed,
          ),
          primaryProvider: payload?.primaryProvider ?? "deepseek",
          primaryProviderLabel: payload?.primaryProviderLabel ?? "DeepSeek",
          assistantModel: payload?.assistantModel ?? "not-configured",
          assistantModelSource: payload?.assistantModelSource ?? "Not configured",
          assistantModelBilling: payload?.assistantModelBilling ?? "Unknown",
          assistantModelConfigured: Boolean(payload?.assistantModelConfigured),
          assistantModelAllowed: Boolean(payload?.assistantModelAllowed),
          defaultChatModel: payload?.defaultChatModel ?? "not-configured",
          defaultChatModelSource:
            payload?.defaultChatModelSource ?? "Not configured",
          defaultChatModelBilling: payload?.defaultChatModelBilling ?? "Unknown",
          defaultChatModelConfigured: Boolean(
            payload?.defaultChatModelConfigured,
          ),
          defaultChatModelAllowed: Boolean(payload?.defaultChatModelAllowed),
          reasoningModel: payload?.reasoningModel ?? "not-configured",
          reasoningModelSource:
            payload?.reasoningModelSource ?? "Not configured",
          reasoningModelBilling: payload?.reasoningModelBilling ?? "Unknown",
          reasoningModelConfigured: Boolean(payload?.reasoningModelConfigured),
          reasoningModelAllowed: Boolean(payload?.reasoningModelAllowed),
          aiTranscriptionModel:
            payload?.aiTranscriptionModel ?? "not-configured",
          aiTranscriptionModelSource:
            payload?.aiTranscriptionModelSource ?? "Not configured",
          aiTranscriptionModelBilling:
            payload?.aiTranscriptionModelBilling ?? "Unknown",
          aiTranscriptionModelConfigured: Boolean(
            payload?.aiTranscriptionModelConfigured,
          ),
          aiTranscriptionModelAllowed: Boolean(
            payload?.aiTranscriptionModelAllowed,
          ),
          aiVisionModel: payload?.aiVisionModel ?? "not-configured",
          aiVisionModelSource: payload?.aiVisionModelSource ?? "Not configured",
          aiVisionModelBilling: payload?.aiVisionModelBilling ?? "Unknown",
          aiVisionModelConfigured: Boolean(payload?.aiVisionModelConfigured),
          aiVisionModelAllowed: Boolean(payload?.aiVisionModelAllowed),
          aiVisionModelUsed: Boolean(payload?.aiVisionModelUsed),
          deepseekConfigured: Boolean(payload?.deepseekConfigured),
          deepseekBaseUrlConfigured: Boolean(
            payload?.deepseekBaseUrlConfigured,
          ),
          deepseekModel: payload?.deepseekModel ?? "not-configured",
          openRouterConfigured: Boolean(payload?.openRouterConfigured),
          openRouterBaseUrlConfigured: Boolean(
            payload?.openRouterBaseUrlConfigured,
          ),
          openRouterModel: payload?.openRouterModel ?? "not-configured",
          groqConfigured: Boolean(payload?.groqConfigured),
          groqBaseUrlConfigured: Boolean(payload?.groqBaseUrlConfigured),
          groqWhisperModel: payload?.groqWhisperModel ?? "not-configured",
          openRouterAutoDisabled: Boolean(payload?.openRouterAutoDisabled),
          paidFallbackDisabled: Boolean(payload?.paidFallbackDisabled),
          lastTestStatus: payload?.lastTestStatus ?? "not run",
          lastLiveProviderTestResult:
            payload?.lastLiveProviderTestResult ?? "not run",
          lastTestCheckedAt: payload?.lastTestCheckedAt ?? null,
          safeMode: payload?.safeMode ?? "draft-only",
          blockedEnvWarnings,
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
            <h2 className="h-display text-xl">Provider inventory</h2>
          </div>
          <span className="rounded-full border border-lf-orange/30 bg-white px-2.5 py-0.5 text-xs font-semibold text-lf-orangeDark">
            {requiredRole}
          </span>
        </div>

        {note && <p className="mt-3 text-sm text-lf-slate">{note}</p>}

        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-3">
          <Stat label="Primary provider" value={state?.primaryProviderLabel ?? "Loading"} />
          <Stat
            label="Requested provider env"
            value={state?.requestedPrimaryProviderLabel ?? "Loading"}
          />
          <Stat
            label="OpenRouter auto"
            value={
              state === null
                ? "Loading"
                : state.openRouterAutoDisabled
                  ? "Disabled"
                  : "Enabled"
            }
          />
          <Stat
            label="Paid fallback"
            value={
              state === null
                ? "Loading"
                : state.paidFallbackDisabled
                  ? "Disabled"
                  : "Enabled"
            }
          />
          <Stat
            label="Last live test"
            value={state?.lastLiveProviderTestResult ?? "Pending"}
          />
          <Stat
            label="Safe mode"
            value={state?.safeMode === "draft-only" ? "Draft-only" : "Loading"}
          />
        </dl>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <ModelCard
            label="Actual chat model"
            model={state?.assistantModel ?? "Loading"}
            source={state?.assistantModelSource ?? "Loading"}
            billing={state?.assistantModelBilling ?? "Unknown"}
            configured={state?.assistantModelConfigured}
            allowed={state?.assistantModelAllowed}
            usedByApp={true}
          />
          <ModelCard
            label="Legacy chat env"
            model={state?.defaultChatModel ?? "Loading"}
            source={state?.defaultChatModelSource ?? "Loading"}
            billing={state?.defaultChatModelBilling ?? "Unknown"}
            configured={state?.defaultChatModelConfigured}
            allowed={state?.defaultChatModelAllowed}
            usedByApp={false}
          />
          <ModelCard
            label="Reasoning model"
            model={state?.reasoningModel ?? "Loading"}
            source={state?.reasoningModelSource ?? "Loading"}
            billing={state?.reasoningModelBilling ?? "Unknown"}
            configured={state?.reasoningModelConfigured}
            allowed={state?.reasoningModelAllowed}
            usedByApp={false}
          />
          <ModelCard
            label="Transcription model"
            model={state?.aiTranscriptionModel ?? "Loading"}
            source={state?.aiTranscriptionModelSource ?? "Loading"}
            billing={state?.aiTranscriptionModelBilling ?? "Unknown"}
            configured={state?.aiTranscriptionModelConfigured}
            allowed={state?.aiTranscriptionModelAllowed}
            usedByApp={Boolean(state?.groqConfigured)}
          />
          <ModelCard
            label="Vision model"
            model={state?.aiVisionModel ?? "Loading"}
            source={state?.aiVisionModelSource ?? "Loading"}
            billing={state?.aiVisionModelBilling ?? "Unknown"}
            configured={state?.aiVisionModelConfigured}
            allowed={state?.aiVisionModelAllowed}
            usedByApp={Boolean(state?.aiVisionModelUsed)}
          />
          <ModelCard
            label="DeepSeek model"
            model={state?.deepseekModel ?? "Loading"}
            source={state?.deepseekConfigured ? "DeepSeek direct" : "Not configured"}
            billing={state?.deepseekConfigured ? "Paid" : "Unknown"}
            configured={state?.deepseekConfigured}
            allowed={state?.deepseekConfigured}
            usedByApp={Boolean(state?.assistantModelConfigured)}
          />
          <ModelCard
            label="OpenRouter model"
            model={state?.openRouterModel ?? "Loading"}
            source={
              (state?.openRouterModel ?? "").toLowerCase() ===
              "openrouter/auto"
                ? "OpenRouter auto (blocked)"
                : (state?.openRouterModel ?? "").trim()
                  ? "OpenRouter"
                  : "Not configured"
            }
            billing={
              (state?.openRouterModel ?? "").trim()
                ? (state?.openRouterModel ?? "").toLowerCase() ===
                    "openrouter/auto"
                  ? "Disabled"
                  : (state?.openRouterModel ?? "").toLowerCase().includes("free")
                    ? "Free"
                    : "Paid"
                : "Unknown"
            }
            configured={state?.openRouterConfigured}
            allowed={
              Boolean(
                (state?.openRouterModel ?? "").trim() &&
                  (state?.openRouterModel ?? "").toLowerCase() !==
                    "openrouter/auto" &&
                  (state?.openRouterModel ?? "").toLowerCase().includes("free"),
              )
            }
            usedByApp={false}
          />
          <ModelCard
            label="Groq whisper model"
            model={state?.groqWhisperModel ?? "Loading"}
            source={state?.groqConfigured ? "Groq transcription API" : "Not configured"}
            billing={state?.groqConfigured ? "Paid" : "Unknown"}
            configured={state?.groqConfigured}
            allowed={state?.groqConfigured}
            usedByApp={Boolean(state?.groqConfigured)}
          />
        </div>

        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-3">
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
            label="DeepSeek base URL"
            value={
              state === null
                ? "Loading"
                : state.deepseekBaseUrlConfigured
                  ? "Present"
                  : "Missing"
            }
          />
          <Stat
            label="Requested provider allowed"
            value={
              state === null
                ? "Loading"
                : state.requestedPrimaryProviderAllowed
                  ? "Yes"
                  : "No"
            }
          />
          <Stat
            label="OpenRouter configured"
            value={
              state === null
                ? "Loading"
                : state.openRouterConfigured
                  ? "Yes"
                  : "No"
            }
          />
          <Stat
            label="OpenRouter base URL"
            value={
              state === null
                ? "Loading"
                : state.openRouterBaseUrlConfigured
                  ? "Present"
                  : "Missing"
            }
          />
          <Stat
            label="Groq base URL"
            value={
              state === null
                ? "Loading"
                : state.groqBaseUrlConfigured
                  ? "Present"
                  : "Missing"
            }
          />
        </dl>

        <div className="mt-5 rounded-lg border border-lf-line bg-white p-4 text-sm">
          <p className="font-semibold text-lf-charcoal">
            Netlify env vars needed
          </p>
          <ul className="mt-2 grid gap-1 text-xs text-lf-slate">
            <li><code>AI_PRIMARY_PROVIDER=deepseek</code></li>
            <li><code>AI_DEFAULT_CHAT_MODEL=deepseek-chat</code></li>
            <li><code>AI_ASSISTANT_MODEL=deepseek-chat</code></li>
            <li><code>AI_REASONING_MODEL=deepseek-chat</code></li>
            <li><code>AI_TRANSCRIPTION_MODEL=whisper-large-v3-turbo</code></li>
            <li><code>DEEPSEEK_API_KEY</code></li>
            <li><code>DEEPSEEK_BASE_URL</code></li>
            <li><code>DEEPSEEK_MODEL=deepseek-chat</code></li>
            <li><code>GROQ_API_KEY</code></li>
            <li><code>GROQ_BASE_URL</code></li>
          </ul>
        </div>

        {state ? (
          state.blockedEnvWarnings.length ? (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
              <p className="font-semibold">Blocked env values detected</p>
              <ul className="mt-2 grid gap-1 text-xs">
                {state.blockedEnvWarnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-4 text-xs text-lf-slate">
              No blocked OpenRouter auto values detected in the current runtime.
            </p>
          )
        ) : null}
      </div>
    </section>
  );
}

function ModelCard({
  label,
  model,
  source,
  billing,
  configured,
  allowed,
  usedByApp,
}: {
  label: string;
  model: string;
  source: string;
  billing: string;
  configured?: boolean;
  allowed?: boolean;
  usedByApp: boolean;
}) {
  return (
    <div className="rounded-lg border border-lf-line bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
        {label}
      </p>
      <p className="mt-1 break-words font-semibold text-lf-charcoal">{model}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
        <Badge value={source} tone="neutral" />
        <Badge value={billing} tone={billingTone(billing)} />
        <Badge value={configured ? "Configured" : "Missing"} tone={configured ? "success" : "warning"} />
        <Badge value={allowed ? "Allowed" : "Blocked"} tone={allowed ? "success" : "danger"} />
        <Badge value={usedByApp ? "Used by app" : "Unused"} tone={usedByApp ? "success" : "neutral"} />
      </div>
    </div>
  );
}

function Badge({
  value,
  tone,
}: {
  value: string;
  tone: "neutral" | "success" | "warning" | "danger";
}) {
  const toneClass =
    tone === "success"
      ? "bg-green-100 text-green-800"
      : tone === "warning"
        ? "bg-yellow-100 text-yellow-800"
        : tone === "danger"
          ? "bg-red-100 text-red-800"
          : "bg-lf-mist text-lf-slate";

  return (
    <span className={`rounded-full px-2.5 py-0.5 ${toneClass}`}>
      {value}
    </span>
  );
}

function billingTone(
  value: string,
): "neutral" | "success" | "warning" | "danger" {
  const normalized = value.toLowerCase();

  if (normalized === "free") return "success";
  if (normalized === "paid") return "warning";
  if (normalized === "disabled") return "danger";
  return "neutral";
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
