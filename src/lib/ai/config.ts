import "server-only";

const DEFAULT_SITE_URL =
  "https://loan-factory-elite-sales-marketing-tr.netlify.app";
const DEFAULT_ASSISTANT_TIMEOUT_MS = 20_000;
const DEFAULT_GROQ_BASE_URL = "https://api.groq.com/openai/v1";

type BillingStatus = "free" | "paid" | "unknown" | "disabled";

function normalizeUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function normalizeProviderName(value: string) {
  return value.trim().toLowerCase();
}

function getProviderLabel(provider: string) {
  switch (provider) {
    case "deepseek":
      return "DeepSeek";
    case "openrouter":
      return "OpenRouter";
    case "openrouter/auto":
      return "OpenRouter auto";
    case "groq":
      return "Groq";
    default:
      return provider ? provider.replaceAll("_", " ") : "Not configured";
  }
}

function getBillingLabel(billing: BillingStatus) {
  switch (billing) {
    case "free":
      return "Free";
    case "paid":
      return "Paid";
    case "disabled":
      return "Disabled";
    default:
      return "Unknown";
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

function getStringEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

function isOpenRouterAutoModel(value: string) {
  return value.trim().toLowerCase() === "openrouter/auto";
}

function isOpenRouterModel(value: string) {
  return value.trim().toLowerCase().startsWith("openrouter/");
}

function isFreeOpenRouterModel(value: string) {
  const normalized = value.trim().toLowerCase();
  return (
    normalized === "openrouter/free" ||
    normalized.endsWith(":free") ||
    normalized.includes("/free")
  );
}

function isDeepSeekModel(value: string) {
  return value.trim().toLowerCase().startsWith("deepseek");
}

function isGroqWhisperModel(value: string) {
  return value.trim().toLowerCase().startsWith("whisper-");
}

function isQwenModel(value: string) {
  return value.trim().toLowerCase().startsWith("qwen/");
}

function resolveDeepSeekAssistantModel(...candidates: string[]) {
  return (
    candidates.find((candidate) => candidate && isDeepSeekModel(candidate)) ??
    ""
  );
}

function auditChatModel(model: string) {
  const normalized = model.trim().toLowerCase();

  if (!model) {
    return {
      configured: false,
      sourceLabel: "Not configured",
      billing: "unknown" as BillingStatus,
      allowed: false,
      usedByApp: false,
      warning: null as string | null,
    };
  }

  if (isOpenRouterAutoModel(model)) {
    return {
      configured: true,
      sourceLabel: "OpenRouter auto (blocked)",
      billing: "disabled" as BillingStatus,
      allowed: false,
      usedByApp: false,
      warning: "OpenRouter auto is blocked in this build.",
    };
  }

  if (isOpenRouterModel(model)) {
    return {
      configured: true,
      sourceLabel: isFreeOpenRouterModel(model)
        ? "OpenRouter free"
        : "OpenRouter",
      billing: (isFreeOpenRouterModel(model) ? "free" : "paid") as BillingStatus,
      allowed: isFreeOpenRouterModel(model),
      usedByApp: false,
      warning: isFreeOpenRouterModel(model)
        ? "Free OpenRouter model present, but the assistant route is DeepSeek-only."
        : "Paid OpenRouter models are blocked in this build.",
    };
  }

  if (isDeepSeekModel(model)) {
    return {
      configured: true,
      sourceLabel: "DeepSeek direct",
      billing: "paid" as BillingStatus,
      allowed: true,
      usedByApp: true,
      warning: null as string | null,
    };
  }

  return {
    configured: true,
    sourceLabel: normalized ? "Unknown" : "Not configured",
    billing: "unknown" as BillingStatus,
    allowed: false,
    usedByApp: false,
    warning: "Unrecognized chat model string.",
  };
}

function auditReasoningModel(model: string) {
  const normalized = model.trim().toLowerCase();

  if (!model) {
    return {
      configured: false,
      sourceLabel: "Not configured",
      billing: "unknown" as BillingStatus,
      allowed: false,
      usedByApp: false,
      warning: null as string | null,
    };
  }

  if (isOpenRouterAutoModel(model)) {
    return {
      configured: true,
      sourceLabel: "OpenRouter auto (blocked)",
      billing: "disabled" as BillingStatus,
      allowed: false,
      usedByApp: false,
      warning: "OpenRouter auto is blocked in this build.",
    };
  }

  if (isOpenRouterModel(model)) {
    return {
      configured: true,
      sourceLabel: isFreeOpenRouterModel(model)
        ? "OpenRouter free"
        : "OpenRouter",
      billing: (isFreeOpenRouterModel(model) ? "free" : "paid") as BillingStatus,
      allowed: isFreeOpenRouterModel(model),
      usedByApp: false,
      warning: isFreeOpenRouterModel(model)
        ? "Free OpenRouter reasoning model present, but it is not used by the assistant route."
        : "Paid OpenRouter models are blocked in this build.",
    };
  }

  if (isDeepSeekModel(model)) {
    return {
      configured: true,
      sourceLabel: "DeepSeek direct",
      billing: "paid" as BillingStatus,
      allowed: true,
      usedByApp: false,
      warning: null as string | null,
    };
  }

  return {
    configured: true,
    sourceLabel: normalized ? "Unknown" : "Not configured",
    billing: "unknown" as BillingStatus,
    allowed: false,
    usedByApp: false,
    warning: "Unrecognized reasoning model string.",
  };
}

function auditTranscriptionModel(model: string) {
  if (!model) {
    return {
      configured: false,
      sourceLabel: "Not configured",
      billing: "unknown" as BillingStatus,
      allowed: false,
      usedByApp: false,
      warning: null as string | null,
    };
  }

  if (isOpenRouterAutoModel(model)) {
    return {
      configured: true,
      sourceLabel: "OpenRouter auto (blocked)",
      billing: "disabled" as BillingStatus,
      allowed: false,
      usedByApp: false,
      warning: "OpenRouter auto is blocked in this build.",
    };
  }

  if (isGroqWhisperModel(model)) {
    return {
      configured: true,
      sourceLabel: "Groq transcription API",
      billing: "paid" as BillingStatus,
      allowed: true,
      usedByApp: true,
      warning: null as string | null,
    };
  }

  return {
    configured: true,
    sourceLabel: isOpenRouterModel(model)
      ? isFreeOpenRouterModel(model)
        ? "OpenRouter free"
        : "OpenRouter"
      : "Unknown",
    billing: isOpenRouterModel(model)
      ? (isFreeOpenRouterModel(model) ? "free" : "paid")
      : ("unknown" as BillingStatus),
    allowed: isOpenRouterModel(model) ? isFreeOpenRouterModel(model) : false,
    usedByApp: true,
    warning: isOpenRouterModel(model)
      ? "Transcription is wired to Groq in this build, so OpenRouter values are blocked."
      : "Unrecognized transcription model string.",
  };
}

function auditVisionModel(model: string) {
  if (!model) {
    return {
      configured: false,
      sourceLabel: "Not configured",
      billing: "unknown" as BillingStatus,
      allowed: false,
      usedByApp: false,
      warning: null as string | null,
    };
  }

  if (isOpenRouterAutoModel(model)) {
    return {
      configured: true,
      sourceLabel: "OpenRouter auto (blocked)",
      billing: "disabled" as BillingStatus,
      allowed: false,
      usedByApp: false,
      warning: "OpenRouter auto is blocked in this build.",
    };
  }

  if (isQwenModel(model) || isOpenRouterModel(model)) {
    return {
      configured: true,
      sourceLabel: "OpenRouter",
      billing: isFreeOpenRouterModel(model)
        ? ("free" as BillingStatus)
        : ("paid" as BillingStatus),
      allowed: isFreeOpenRouterModel(model),
      usedByApp: false,
      warning: "Vision is not wired in this build, so this model remains unused.",
    };
  }

  return {
    configured: true,
    sourceLabel: "Unknown",
    billing: "unknown" as BillingStatus,
    allowed: false,
    usedByApp: false,
    warning: "Unrecognized vision model string.",
  };
}

export type AiSandboxConfig = {
  sandboxEnabled: boolean;
  requireAuth: boolean;
  allowUnsignedSandbox: boolean;
  requestedPrimaryProvider: string;
  primaryProvider: string;
  defaultChatModel: string;
  reasoningModel: string;
  assistantModel: string;
  deepseekApiKey: string;
  deepseekBaseUrl: string;
  deepseekModel: string;
  assistantTimeoutMs: number;
  aiTranscriptionModel: string;
  groqApiKey: string;
  groqBaseUrl: string;
  groqWhisperModel: string;
  aiVisionModel: string;
  openRouterApiKey: string;
  openRouterBaseUrl: string;
  openRouterModel: string;
  openRouterSiteUrl: string;
  openRouterAppTitle: string;
  maxInputChars: number;
  externalActionsEnabled: false;
};

export type PublicAiSandboxStatus = {
  sandboxEnabled: boolean;
  requireAuth: boolean;
  allowUnsignedSandbox: boolean;
  requestedPrimaryProvider: string;
  requestedPrimaryProviderLabel: string;
  requestedPrimaryProviderConfigured: boolean;
  requestedPrimaryProviderAllowed: boolean;
  primaryProvider: string;
  primaryProviderLabel: string;
  primaryProviderConfigured: boolean;
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
  maxInputChars: number;
  assistantTimeoutMs: number;
  openRouterAutoDisabled: boolean;
  paidFallbackDisabled: boolean;
  safeMode: "draft-only";
  lastTestStatus: string;
  lastLiveProviderTestResult: string;
  lastTestCheckedAt: string | null;
  externalActionsEnabled: false;
  blockedEnvWarnings: string[];
};

export function getAiSandboxConfig(): AiSandboxConfig {
  const siteUrl =
    process.env.OPENROUTER_SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    DEFAULT_SITE_URL;
  const requestedPrimaryProvider = normalizeProviderName(
    getStringEnv("AI_PRIMARY_PROVIDER") || "deepseek",
  );
  const defaultChatModel = getStringEnv("AI_DEFAULT_CHAT_MODEL");
  const reasoningModel = getStringEnv("AI_REASONING_MODEL");
  const aiTranscriptionModel = getStringEnv("AI_TRANSCRIPTION_MODEL");
  const aiVisionModel = getStringEnv("AI_VISION_MODEL");
  const deepseekBaseUrl = getStringEnv("DEEPSEEK_BASE_URL");
  const deepseekModel = getStringEnv("DEEPSEEK_MODEL");
  const assistantModel = resolveDeepSeekAssistantModel(
    getStringEnv("AI_ASSISTANT_MODEL"),
    defaultChatModel,
    deepseekModel,
  );
  const groqWhisperModel =
    aiTranscriptionModel || getStringEnv("GROQ_WHISPER_MODEL");
  const openRouterBaseUrl = getStringEnv("OPENROUTER_BASE_URL");
  const openRouterModel = getStringEnv("OPENROUTER_MODEL");
  const groqBaseUrl = getStringEnv("GROQ_BASE_URL");

  return {
    sandboxEnabled: getBooleanEnv("AI_ASSISTANTS_SANDBOX_ENABLED"),
    requireAuth: getBooleanEnv("AI_ASSISTANTS_REQUIRE_AUTH", true),
    allowUnsignedSandbox: getBooleanEnv(
      "AI_ASSISTANTS_ALLOW_UNSIGNED_SANDBOX",
    ),
    requestedPrimaryProvider,
    primaryProvider: "deepseek",
    defaultChatModel,
    reasoningModel,
    assistantModel,
    deepseekApiKey: getStringEnv("DEEPSEEK_API_KEY"),
    deepseekBaseUrl,
    deepseekModel,
    assistantTimeoutMs: getPositiveIntegerEnv(
      "AI_ASSISTANT_TIMEOUT_MS",
      DEFAULT_ASSISTANT_TIMEOUT_MS,
    ),
    aiTranscriptionModel,
    groqApiKey: getStringEnv("GROQ_API_KEY"),
    groqBaseUrl,
    groqWhisperModel,
    aiVisionModel,
    openRouterApiKey: getStringEnv("OPENROUTER_API_KEY"),
    openRouterBaseUrl,
    openRouterModel,
    openRouterSiteUrl: normalizeUrl(siteUrl),
    openRouterAppTitle:
      getStringEnv("OPENROUTER_APP_TITLE") || "Loan Factory LO Development",
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
  const assistantAudit = auditChatModel(config.assistantModel);
  const defaultChatAudit = auditChatModel(config.defaultChatModel);
  const reasoningAudit = auditReasoningModel(config.reasoningModel);
  const transcriptionAudit = auditTranscriptionModel(config.groqWhisperModel);
  const visionAudit = auditVisionModel(config.aiVisionModel);
  const openRouterConfigured = Boolean(
    config.openRouterApiKey && config.openRouterModel,
  );
  const groqConfigured =
    Boolean(config.groqApiKey && config.groqWhisperModel) &&
    isGroqWhisperModel(config.groqWhisperModel);
  const primaryProviderConfigured =
    config.primaryProvider === "deepseek"
      ? deepseekConfigured && Boolean(config.assistantModel)
      : false;
  const requestedPrimaryProviderConfigured =
    config.requestedPrimaryProvider === "deepseek";
  const requestedPrimaryProviderAllowed =
    config.requestedPrimaryProvider === "deepseek";
  const blockedEnvWarnings = [
    isOpenRouterAutoModel(config.defaultChatModel)
      ? "AI_DEFAULT_CHAT_MODEL is set to openrouter/auto and is blocked."
      : "",
    isOpenRouterAutoModel(config.reasoningModel)
      ? "AI_REASONING_MODEL is set to openrouter/auto and is blocked."
      : "",
    isOpenRouterAutoModel(config.aiVisionModel)
      ? "AI_VISION_MODEL is set to openrouter/auto and is blocked."
      : "",
    isOpenRouterAutoModel(config.openRouterModel)
      ? "OPENROUTER_MODEL is set to openrouter/auto and is blocked."
      : "",
    isOpenRouterAutoModel(config.groqWhisperModel)
      ? "AI_TRANSCRIPTION_MODEL is set to openrouter/auto and is blocked."
      : "",
    isOpenRouterAutoModel(config.assistantModel)
      ? "AI_ASSISTANT_MODEL is set to openrouter/auto and is blocked."
      : "",
    config.requestedPrimaryProvider === "openrouter"
      ? "AI_PRIMARY_PROVIDER requested OpenRouter, but DeepSeek is enforced."
      : "",
  ].filter(Boolean) as string[];

  return {
    sandboxEnabled: config.sandboxEnabled,
    requireAuth: config.requireAuth,
    allowUnsignedSandbox: config.allowUnsignedSandbox,
    requestedPrimaryProvider: config.requestedPrimaryProvider || "deepseek",
    requestedPrimaryProviderLabel: getProviderLabel(
      config.requestedPrimaryProvider || "deepseek",
    ),
    requestedPrimaryProviderConfigured,
    requestedPrimaryProviderAllowed,
    primaryProvider: config.primaryProvider || "deepseek",
    primaryProviderLabel: getProviderLabel(config.primaryProvider || "deepseek"),
    primaryProviderConfigured,
    assistantModel: config.assistantModel || "not-configured",
    assistantModelSource: assistantAudit.sourceLabel,
    assistantModelBilling: getBillingLabel(assistantAudit.billing),
    assistantModelConfigured: assistantAudit.configured,
    assistantModelAllowed: assistantAudit.allowed,
    defaultChatModel: config.defaultChatModel || "not-configured",
    defaultChatModelSource: defaultChatAudit.sourceLabel,
    defaultChatModelBilling: getBillingLabel(defaultChatAudit.billing),
    defaultChatModelConfigured: defaultChatAudit.configured,
    defaultChatModelAllowed: defaultChatAudit.allowed,
    reasoningModel: config.reasoningModel || "not-configured",
    reasoningModelSource: reasoningAudit.sourceLabel,
    reasoningModelBilling: getBillingLabel(reasoningAudit.billing),
    reasoningModelConfigured: reasoningAudit.configured,
    reasoningModelAllowed: reasoningAudit.allowed,
    aiTranscriptionModel: config.aiTranscriptionModel || "not-configured",
    aiTranscriptionModelSource: transcriptionAudit.sourceLabel,
    aiTranscriptionModelBilling: getBillingLabel(transcriptionAudit.billing),
    aiTranscriptionModelConfigured: transcriptionAudit.configured,
    aiTranscriptionModelAllowed: transcriptionAudit.allowed,
    aiVisionModel: config.aiVisionModel || "not-configured",
    aiVisionModelSource: visionAudit.sourceLabel,
    aiVisionModelBilling: getBillingLabel(visionAudit.billing),
    aiVisionModelConfigured: visionAudit.configured,
    aiVisionModelAllowed: visionAudit.allowed,
    aiVisionModelUsed: visionAudit.usedByApp,
    deepseekConfigured,
    deepseekBaseUrlConfigured: Boolean(config.deepseekBaseUrl),
    deepseekModel: config.deepseekModel || "not-configured",
    openRouterConfigured,
    openRouterBaseUrlConfigured: Boolean(config.openRouterBaseUrl),
    openRouterModel: config.openRouterModel || "not-configured",
    groqConfigured,
    groqBaseUrlConfigured: Boolean(config.groqBaseUrl),
    groqWhisperModel: config.groqWhisperModel || "not-configured",
    maxInputChars: config.maxInputChars,
    assistantTimeoutMs: config.assistantTimeoutMs,
    openRouterAutoDisabled: true,
    paidFallbackDisabled: true,
    safeMode: "draft-only",
    lastTestStatus: primaryProviderConfigured
      ? `${assistantAudit.sourceLabel} ready`
      : `${getProviderLabel(config.primaryProvider || "deepseek")} not configured`,
    lastLiveProviderTestResult: primaryProviderConfigured
      ? `${assistantAudit.sourceLabel} ready`
      : `${getProviderLabel(config.primaryProvider || "deepseek")} not configured`,
    lastTestCheckedAt: new Date().toISOString(),
    externalActionsEnabled: false,
    blockedEnvWarnings,
  };
}
