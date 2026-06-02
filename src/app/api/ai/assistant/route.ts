import { NextRequest, NextResponse } from "next/server";
import { getAiSandboxAccess } from "@/lib/ai/access";
import { getAiSandboxConfig } from "@/lib/ai/config";
import {
  buildAssistantSystemPrompt,
  ensureDraftReviewNotice,
} from "@/lib/ai/guardrails";
import { callDeepSeekChatCompletion } from "@/lib/ai/deepseek";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type IncomingChatMessage = {
  role?: unknown;
  content?: unknown;
  text?: unknown;
};

type AssistantChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
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
): AssistantChatMessage[] {
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

function latestUserPrompt(messages: AssistantChatMessage[]) {
  return [...messages].reverse().find((message) => message.role === "user")
    ?.content;
}

function logProviderFailure(
  status: number,
  code: string,
  model: string,
  timeoutMs: number,
) {
  console.error("[ai:assistant] DeepSeek request failed", {
    status,
    code,
    model,
    timeoutMs,
  });
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

  if (!config.deepseekApiKey || !config.deepseekBaseUrl || !config.assistantModel) {
    return jsonError(
      503,
      "deepseek-not-configured",
      "DeepSeek key, base URL, and model must all be configured for the AI Assistant sandbox.",
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

  const assistantMessages: AssistantChatMessage[] = [
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

  const completion = await callDeepSeekChatCompletion({
    apiKey: config.deepseekApiKey,
    baseUrl: config.deepseekBaseUrl,
    model: config.assistantModel,
    messages: assistantMessages,
    user: access.userId ?? access.email ?? "sandbox-beta-user",
    timeoutMs: config.assistantTimeoutMs,
  });

  if (!completion.ok) {
    logProviderFailure(
      completion.status,
      completion.code,
      config.assistantModel,
      config.assistantTimeoutMs,
    );
    return jsonError(completion.status, completion.code, completion.message);
  }

  return NextResponse.json({
    text: ensureDraftReviewNotice(completion.text),
    model: completion.model,
    provider: "deepseek",
    sandbox: true,
    accessStatus: access.status,
    externalActionsEnabled: false,
  });
}
