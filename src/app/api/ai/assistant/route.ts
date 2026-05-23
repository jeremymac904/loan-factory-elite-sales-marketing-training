import { NextRequest, NextResponse } from "next/server";
import { getAiSandboxAccess } from "@/lib/ai/access";
import { getAiSandboxConfig } from "@/lib/ai/config";
import {
  buildAssistantSystemPrompt,
  ensureDraftReviewNotice,
} from "@/lib/ai/guardrails";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type IncomingChatMessage = {
  role?: unknown;
  content?: unknown;
  text?: unknown;
};

type OpenRouterChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      content?: unknown;
    };
  }>;
  model?: unknown;
};

function jsonError(status: number, code: string, message: string) {
  return NextResponse.json({ error: code, message }, { status });
}

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeMessages(
  messages: unknown,
  maxInputChars: number,
): OpenRouterChatMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .slice(-12)
    .flatMap((message: IncomingChatMessage) => {
      const role = message.role === "assistant" ? "assistant" : "user";
      const rawContent = getString(message.content) || getString(message.text);
      const content = rawContent.slice(0, maxInputChars);

      if (!content) {
        return [];
      }

      return [{ role, content }];
    });
}

function latestUserPrompt(messages: OpenRouterChatMessage[]) {
  return [...messages].reverse().find((message) => message.role === "user")
    ?.content;
}

function getProviderMessage(status: number) {
  if (status === 401 || status === 403) {
    return "OpenRouter rejected the server API key or account permissions.";
  }

  if (status === 429) {
    return "OpenRouter rate limited the sandbox request.";
  }

  return "OpenRouter could not complete the sandbox request.";
}

export async function POST(request: NextRequest) {
  const config = getAiSandboxConfig();

  if (!config.sandboxEnabled) {
    return jsonError(
      403,
      "sandbox-disabled",
      "AI Assistant sandbox mode is not enabled in this environment.",
    );
  }

  const access = await getAiSandboxAccess();

  if (!access.allowed) {
    return jsonError(403, access.status, access.message);
  }

  if (!config.openRouterApiKey) {
    return jsonError(
      503,
      "openrouter-not-configured",
      "OpenRouter is not configured for the AI Assistant sandbox.",
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError(400, "invalid-json", "Request body must be valid JSON.");
  }

  const bodyRecord =
    body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const assistantName =
    getString(bodyRecord.assistantName) || "Loan Factory AI Assistant";
  const assistantDescription =
    getString(bodyRecord.assistantDescription) ||
    "Internal draft, coaching, and review support.";
  const attachmentName = getString(bodyRecord.attachmentName);
  const voiceTranscript = getString(bodyRecord.voiceTranscript);
  const messages = normalizeMessages(bodyRecord.messages, config.maxInputChars);
  const prompt = latestUserPrompt(messages);

  if (!prompt) {
    return jsonError(400, "missing-prompt", "Add a message before sending.");
  }

  const sourceNotes = [
    attachmentName
      ? `The user attached a file named "${attachmentName}". The file contents were not sent to the model unless the user pasted them into the chat.`
      : "",
    voiceTranscript ? `Voice transcript context: ${voiceTranscript}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const openRouterMessages: OpenRouterChatMessage[] = [
    {
      role: "system",
      content: buildAssistantSystemPrompt({
        assistantName,
        assistantDescription,
        sourceNotes,
      }),
    },
    ...messages,
  ];

  const openRouterResponse = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.openRouterApiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": config.openRouterSiteUrl,
        "X-OpenRouter-Title": config.openRouterAppTitle,
      },
      body: JSON.stringify({
        model: config.openRouterModel,
        messages: openRouterMessages,
        temperature: 0.4,
        max_tokens: 900,
        user: access.userId ?? access.email ?? "sandbox-beta-user",
      }),
    },
  );

  if (!openRouterResponse.ok) {
    return jsonError(
      openRouterResponse.status === 429 ? 429 : 502,
      "openrouter-request-failed",
      getProviderMessage(openRouterResponse.status),
    );
  }

  let providerPayload: OpenRouterResponse;

  try {
    providerPayload = (await openRouterResponse.json()) as OpenRouterResponse;
  } catch {
    return jsonError(
      502,
      "openrouter-invalid-response",
      "OpenRouter returned an unreadable response.",
    );
  }

  const providerText = getString(
    providerPayload.choices?.[0]?.message?.content,
  );

  if (!providerText) {
    return jsonError(
      502,
      "openrouter-empty-response",
      "OpenRouter returned an empty sandbox response.",
    );
  }

  return NextResponse.json({
    text: ensureDraftReviewNotice(providerText),
    model:
      typeof providerPayload.model === "string"
        ? providerPayload.model
        : config.openRouterModel,
    provider: "openrouter",
    sandbox: true,
    accessStatus: access.status,
    externalActionsEnabled: false,
  });
}
