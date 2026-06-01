import "server-only";

export type DeepSeekChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type DeepSeekChatCompletionSuccess = {
  ok: true;
  provider: "deepseek";
  model: string;
  text: string;
  rawModel: string | null;
};

export type DeepSeekChatCompletionFailure = {
  ok: false;
  provider: "deepseek";
  status: number;
  code:
    | "deepseek-not-configured"
    | "deepseek-request-failed"
    | "deepseek-invalid-response"
    | "deepseek-empty-response";
  message: string;
};

export type DeepSeekChatCompletionResult =
  | DeepSeekChatCompletionSuccess
  | DeepSeekChatCompletionFailure;

type DeepSeekChatCompletionInput = {
  apiKey: string;
  baseUrl: string;
  model: string;
  messages: DeepSeekChatMessage[];
  user: string;
  timeoutMs: number;
};

type DeepSeekResponse = {
  choices?: Array<{
    message?: {
      content?: unknown;
    };
  }>;
  model?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function buildCompletionUrl(baseUrl: string) {
  const trimmed = baseUrl.trim().replace(/\/+$/, "");

  if (!trimmed) {
    return "";
  }

  if (trimmed.endsWith("/chat/completions")) {
    return trimmed;
  }

  return `${trimmed}/chat/completions`;
}

function getProviderMessage(status: number) {
  if (status === 401 || status === 403) {
    return "DeepSeek rejected the server API key or account permissions.";
  }

  if (status === 429) {
    return "DeepSeek rate limited the assistant request.";
  }

  return "DeepSeek could not complete the assistant request.";
}

export async function callDeepSeekChatCompletion({
  apiKey,
  baseUrl,
  model,
  messages,
  user,
  timeoutMs,
}: DeepSeekChatCompletionInput): Promise<DeepSeekChatCompletionResult> {
  if (!apiKey || !baseUrl || !model) {
    return {
      ok: false,
      provider: "deepseek",
      status: 503,
      code: "deepseek-not-configured",
      message:
        "DeepSeek key, base URL, and model must all be configured for the AI Assistant sandbox.",
    };
  }

  const url = buildCompletionUrl(baseUrl);

  if (!url) {
    return {
      ok: false,
      provider: "deepseek",
      status: 503,
      code: "deepseek-not-configured",
      message:
        "DeepSeek key, base URL, and model must all be configured for the AI Assistant sandbox.",
    };
  }

  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.4,
        max_tokens: 900,
        user,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        provider: "deepseek",
        status: response.status === 429 ? 429 : 502,
        code: "deepseek-request-failed",
        message: getProviderMessage(response.status),
      };
    }

    let payload: DeepSeekResponse;

    try {
      payload = (await response.json()) as DeepSeekResponse;
    } catch {
      return {
        ok: false,
        provider: "deepseek",
        status: 502,
        code: "deepseek-invalid-response",
        message: "DeepSeek returned an unreadable response.",
      };
    }

    const text = getString(payload.choices?.[0]?.message?.content);

    if (!text) {
      return {
        ok: false,
        provider: "deepseek",
        status: 502,
        code: "deepseek-empty-response",
        message: "DeepSeek returned an empty sandbox response.",
      };
    }

    return {
      ok: true,
      provider: "deepseek",
      model: getString(payload.model) || model,
      rawModel: getString(payload.model) || null,
      text,
    };
  } catch (error) {
    const isAbort =
      error instanceof DOMException && error.name === "AbortError";

    return {
      ok: false,
      provider: "deepseek",
      status: isAbort ? 504 : 502,
      code: "deepseek-request-failed",
      message: isAbort
        ? "DeepSeek request timed out."
        : "DeepSeek could not complete the assistant request.",
    };
  } finally {
    clearTimeout(timeoutHandle);
  }
}
