import "server-only";

const DEFAULT_SITE_URL =
  "https://loan-factory-elite-sales-marketing-tr.netlify.app";
const DEFAULT_ASSISTANT_TIMEOUT_MS = 20_000;

function normalizeUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function normalizeProviderName(value: string) {
  const provider = value.trim().toLowerCase();

  if (provider === "deepseek" || provider === "openrouter") {
    return provider;
  }

  return provider;
}

function getProviderLabel(provider: string) {
  switch (provider) {
    case "deepseek":
      return "DeepSeek";
    case "openrouter":
      return "OpenRouter";
    default:
      return provider ? provider.replaceAll("_", " ") : "Not configured";
  }
}

function getBooleanEnv(name: string, defaultValue = false) {
  const value = process.env[name];

  if (value === undefined || value === "") {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
}

function getPositiveIntegerEnv(name: string, defaultValue: number) {
  const value = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(value) && value > 0 ? value : defaultValue;
}

export type AiSandboxConfig = {
  sandboxEnabled: boolean;
  requireAuth: boolean;
  allowUnsignedSandbox: boolean;
  primaryProvider: string;
  assistantModel: string;
  deepseekApiKey: string;
  deepseekBaseUrl: string;
  deepseekModel: string;
  assistantTimeoutMs: number;
  openRouterApiKey: string;
  openRouterModel: string;
  openRouterSiteUrl: string;
  openRouterAppTitle: string;
  groqApiKey: string;
  groqWhisperModel: string;
  maxInputChars: number;
  externalActionsEnabled: false;
};

export type PublicAiSandboxStatus = {
  sandboxEnabled: boolean;
  requireAuth: boolean;
  allowUnsignedSandbox: boolean;
  primaryProvider: string;
  primaryProviderLabel: string;
  assistantModel: string;
  primaryProviderConfigured: boolean;
  deepseekConfigured: boolean;
  deepseekBaseUrlConfigured: boolean;
  deepseekModel: string;
  openRouterConfigured: boolean;
  openRouterModel: string;
  groqConfigured: boolean;
  groqWhisperModel: string;
  maxInputChars: number;
  assistantTimeoutMs: number;
  safeMode: "draft-only";
  lastTestStatus: string;
  lastTestCheckedAt: string | null;
  externalActionsEnabled: false;
};

export function getAiSandboxConfig(): AiSandboxConfig {
  const siteUrl =
    process.env.OPENROUTER_SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    DEFAULT_SITE_URL;
  const primaryProvider = normalizeProviderName(
    process.env.AI_PRIMARY_PROVIDER || "deepseek",
  );
  const deepseekBaseUrl = process.env.DEEPSEEK_BASE_URL?.trim() ?? "";
  const deepseekModel = process.env.DEEPSEEK_MODEL?.trim() ?? "";
  const assistantModel =
    process.env.AI_ASSISTANT_MODEL?.trim() || deepseekModel || "";
  const openRouterModel = process.env.OPENROUTER_MODEL?.trim() ?? "";
  const groqWhisperModel = process.env.GROQ_WHISPER_MODEL?.trim() ?? "";

  return {
    sandboxEnabled: getBooleanEnv("AI_ASSISTANTS_SANDBOX_ENABLED"),
    requireAuth: getBooleanEnv("AI_ASSISTANTS_REQUIRE_AUTH", true),
    allowUnsignedSandbox: getBooleanEnv(
      "AI_ASSISTANTS_ALLOW_UNSIGNED_SANDBOX",
    ),
    primaryProvider,
    assistantModel,
    deepseekApiKey: process.env.DEEPSEEK_API_KEY ?? "",
    deepseekBaseUrl,
    deepseekModel,
    assistantTimeoutMs: getPositiveIntegerEnv(
      "AI_ASSISTANT_TIMEOUT_MS",
      DEFAULT_ASSISTANT_TIMEOUT_MS,
    ),
    openRouterApiKey: process.env.OPENROUTER_API_KEY ?? "",
    openRouterModel,
    openRouterSiteUrl: normalizeUrl(siteUrl),
    openRouterAppTitle:
      process.env.OPENROUTER_APP_TITLE?.trim() ||
      "Loan Factory LO Development",
    groqApiKey: process.env.GROQ_API_KEY ?? "",
    groqWhisperModel,
    maxInputChars: getPositiveIntegerEnv("AI_ASSISTANTS_MAX_INPUT_CHARS", 6000),
    externalActionsEnabled: false,
  };
}

export function getPublicAiSandboxStatus(
  config = getAiSandboxConfig(),
): PublicAiSandboxStatus {
  const deepseekConfigured = Boolean(
    config.deepseekApiKey && config.deepseekBaseUrl && config.deepseekModel,
  );
  const openRouterConfigured = Boolean(
    config.openRouterApiKey && config.openRouterModel,
  );
  const primaryProviderConfigured =
    config.primaryProvider === "openrouter"
      ? openRouterConfigured
      : deepseekConfigured && Boolean(config.assistantModel);

  return {
    sandboxEnabled: config.sandboxEnabled,
    requireAuth: config.requireAuth,
    allowUnsignedSandbox: config.allowUnsignedSandbox,
    primaryProvider: config.primaryProvider || "deepseek",
    primaryProviderLabel: getProviderLabel(
      config.primaryProvider || "deepseek",
    ),
    assistantModel: config.assistantModel || "not-configured",
    primaryProviderConfigured,
    deepseekConfigured,
    deepseekBaseUrlConfigured: Boolean(config.deepseekBaseUrl),
    deepseekModel: config.deepseekModel || "not-configured",
    openRouterConfigured,
    openRouterModel: config.openRouterModel || "not-configured",
    groqConfigured: Boolean(config.groqApiKey && config.groqWhisperModel),
    groqWhisperModel: config.groqWhisperModel || "not-configured",
    maxInputChars: config.maxInputChars,
    assistantTimeoutMs: config.assistantTimeoutMs,
    safeMode: "draft-only",
    lastTestStatus: primaryProviderConfigured
      ? `${getProviderLabel(config.primaryProvider || "deepseek")} ready`
      : `${getProviderLabel(config.primaryProvider || "deepseek")} not configured`,
    lastTestCheckedAt: new Date().toISOString(),
    externalActionsEnabled: false,
  };
}
