import { NextRequest, NextResponse } from "next/server";
import { getAiSandboxAccess } from "@/lib/ai/access";
import { getAiSandboxConfig } from "@/lib/ai/config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_AUDIO_BYTES = 25 * 1024 * 1024;
const AUDIO_EXTENSION_PATTERN = /\.(flac|mp3|mp4|mpeg|mpga|m4a|ogg|wav|webm)$/i;

type GroqTranscriptionResponse = {
  text?: unknown;
};

function jsonError(status: number, code: string, message: string) {
  return NextResponse.json({ error: code, message }, { status });
}

function getProviderMessage(status: number) {
  if (status === 401 || status === 403) {
    return "Groq rejected the server API key or account permissions.";
  }

  if (status === 429) {
    return "Groq rate limited the sandbox transcription request.";
  }

  return "Groq could not transcribe this sandbox audio file.";
}

function isSupportedAudioFile(file: File) {
  return file.type.startsWith("audio/") || AUDIO_EXTENSION_PATTERN.test(file.name);
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

  if (!config.groqApiKey || !config.groqWhisperModel) {
    return jsonError(
      503,
      "groq-not-configured",
      "Groq key and transcription model must both be configured for sandbox transcription.",
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return jsonError(400, "invalid-form", "Upload an audio file to transcribe.");
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return jsonError(400, "missing-file", "Upload an audio file to transcribe.");
  }

  if (!isSupportedAudioFile(file)) {
    return jsonError(
      400,
      "unsupported-file",
      "Supported audio formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm.",
    );
  }

  if (file.size > MAX_AUDIO_BYTES) {
    return jsonError(
      413,
      "file-too-large",
      "Audio files must be 25 MB or smaller for sandbox transcription.",
    );
  }

  const groqFormData = new FormData();
  groqFormData.append("file", file, file.name || "audio.webm");
  groqFormData.append("model", config.groqWhisperModel);
  groqFormData.append("response_format", "json");
  groqFormData.append("language", "en");
  groqFormData.append("temperature", "0");

  const groqResponse = await fetch(
    "https://api.groq.com/openai/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.groqApiKey}`,
      },
      body: groqFormData,
    },
  );

  if (!groqResponse.ok) {
    return jsonError(
      groqResponse.status === 429 ? 429 : 502,
      "groq-transcription-failed",
      getProviderMessage(groqResponse.status),
    );
  }

  let payload: GroqTranscriptionResponse;

  try {
    payload = (await groqResponse.json()) as GroqTranscriptionResponse;
  } catch {
    return jsonError(
      502,
      "groq-invalid-response",
      "Groq returned an unreadable transcription response.",
    );
  }

  const text = typeof payload.text === "string" ? payload.text.trim() : "";

  if (!text) {
    return jsonError(
      502,
      "groq-empty-response",
      "Groq returned an empty transcription.",
    );
  }

  return NextResponse.json({
    text,
    model: config.groqWhisperModel,
    provider: "groq",
    sandbox: true,
    accessStatus: access.status,
    externalActionsEnabled: false,
  });
}
