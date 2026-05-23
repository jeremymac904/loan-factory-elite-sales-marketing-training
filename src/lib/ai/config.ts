import "server-only";

const DEFAULT_SITE_URL =
  "https://loan-factory-elite-sales-marketing-tr.netlify.app";

function normalizeUrl(value: string) {
  return value.replace(/\/+$/, "");
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
  openRouterConfigured: boolean;
  openRouterModel: string;
  groqConfigured: boolean;
  groqWhisperModel: string;
  maxInputChars: number;
  externalActionsEnabled: false;
};

export function getAiSandboxConfig(): AiSandboxConfig {
  const siteUrl =
    process.env.OPENROUTER_SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    DEFAULT_SITE_URL;
  const openRouterModel = process.env.OPENROUTER_MODEL?.trim() ?? "";
  const groqWhisperModel = process.env.GROQ_WHISPER_MODEL?.trim() ?? "";

  return {
    sandboxEnabled: getBooleanEnv("AI_ASSISTANTS_SANDBOX_ENABLED"),
    requireAuth: getBooleanEnv("AI_ASSISTANTS_REQUIRE_AUTH", true),
    allowUnsignedSandbox: getBooleanEnv(
      "AI_ASSISTANTS_ALLOW_UNSIGNED_SANDBOX",
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
  return {
    sandboxEnabled: config.sandboxEnabled,
    requireAuth: config.requireAuth,
    allowUnsignedSandbox: config.allowUnsignedSandbox,
    openRouterConfigured: Boolean(
      config.openRouterApiKey && config.openRouterModel,
    ),
    openRouterModel: config.openRouterModel || "not-configured",
    groqConfigured: Boolean(config.groqApiKey && config.groqWhisperModel),
    groqWhisperModel: config.groqWhisperModel || "not-configured",
    maxInputChars: config.maxInputChars,
    externalActionsEnabled: false,
  };
}
