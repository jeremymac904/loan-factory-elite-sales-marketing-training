"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState } from "react";

type Assistant = {
  name: string;
  description: string;
  starters: string[];
};

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

type AssistantApiMessage = {
  role: "user" | "assistant";
  content: string;
};

type AssistantBackendStatus = {
  sandboxEnabled: boolean;
  openRouterConfigured: boolean;
  openRouterModel: string;
  groqConfigured: boolean;
  groqWhisperModel: string;
  maxInputChars: number;
  externalActionsEnabled: false;
};

type AttachedFile = {
  file: File;
  name: string;
  type: string;
  previewUrl?: string;
};

type SpeechRecognitionEventLike = {
  results?: {
    0?: {
      0?: {
        transcript?: string;
      };
    };
  };
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  start: () => void;
};

type SpeechRecognitionWindow = Window &
  typeof globalThis & {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };

const assistants: Assistant[] = [
  {
    name: "LO Support Assistant",
    description:
      "Helps with training questions, next-step checklists, roleplay practice, and simple follow-up plans.",
    starters: ["Build my next-step checklist", "Practice a first call", "Summarize this training note"],
  },
  {
    name: "Marketing Support Assistant",
    description:
      "Helps clean up marketing ideas, post outlines, and content drafts before human review.",
    starters: ["Rewrite this post clearly", "Build a local event idea", "Create a review-ready outline"],
  },
];

const sourceCards = [
  {
    title: "101 Foundation",
    type: "Training lesson",
    excerpt: "Daily rhythm, first conversations, scripts, prompts, and tracker habits.",
    href: "/101-foundation/",
  },
  {
    title: "Sales & Marketing 101-601",
    type: "Curriculum",
    excerpt: "Six-part training path for conversations, partners, content, pipeline, and execution.",
    href: "/sales-training/",
  },
  {
    title: "LO Mastery",
    type: "Coaching resources",
    excerpt: "Coaching rhythm, scorecards, trackers, leaderboards, and member resources.",
    href: "/apex-advisor/",
  },
  {
    title: "Audience Quality Panel",
    type: "Review layer",
    excerpt: "Content quality scoring model for borrower, partner, risk, marketing, and peer review.",
    href: "/audience-quality-panel/",
  },
  {
    title: "AI LO Training Drive",
    type: "Drive folder",
    excerpt: "Custom GPTs, Google Workspace Automation, NotebookLM, Gemini setup, and AI Takeoff resources.",
    href: "https://drive.google.com/drive/folders/133w74YcUtK4w8g2Xa8Ttp7j2W7RVw1vz?usp=sharing",
  },
];

const historyItems = [
  "First-call practice",
  "Marketing draft review",
  "Training next steps",
];

const initialAssistantMessage =
  "Choose one assistant, add helpful context, then ask for a draft, roleplay, checklist, or review. Outputs are draft-only.";

let messageIdCounter = 1;

function nextMessageId() {
  messageIdCounter += 1;
  return messageIdCounter;
}

function toApiMessages(messages: Message[]): AssistantApiMessage[] {
  return messages
    .filter((message) => message.text.trim())
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.text,
    }));
}

function isAudioAttachment(file: AttachedFile | null) {
  if (!file) return false;
  return (
    file.type.startsWith("audio/") ||
    /\.(flac|mp3|mp4|mpeg|mpga|m4a|ogg|wav|webm)$/i.test(file.name)
  );
}

function apiErrorMessage(
  status: number,
  payload: { message?: unknown; error?: unknown } | null,
) {
  if (typeof payload?.message === "string" && payload.message.trim()) {
    return payload.message;
  }

  if (status === 401 || status === 403) {
    return "Sign in with an approved Loan Factory account to use the AI Assistant preview.";
  }

  if (status === 503) {
    return "The AI Assistant preview needs to be turned on before it can run.";
  }

  return "The AI Assistant preview could not complete that request.";
}

function buildDemoResponse(assistant: Assistant, prompt: string) {
  return [
    `${assistant.name} draft:`,
    "",
    `I would help with: ${prompt}`,
    "",
    "Next step: paste only the context needed, remove borrower/private data, then ask for one draft, checklist, or rewrite.",
    "",
    "Draft only. Review before external use. No rates, fees, APR, approvals, underwriting, public posts, email sends, file access, automations, or system changes were triggered.",
  ].join("\n");
}

export default function AIAssistantHub({
  previewMode = false,
}: {
  previewMode?: boolean;
}) {
  const [selectedName, setSelectedName] = useState(assistants[0].name);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: initialAssistantMessage,
    },
  ]);
  const [input, setInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const [voiceNote, setVoiceNote] = useState("");
  const [backendStatus, setBackendStatus] =
    useState<AssistantBackendStatus | null>(null);
  const [backendStatusNote, setBackendStatusNote] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedAssistant = useMemo(
    () => assistants.find((assistant) => assistant.name === selectedName) ?? assistants[0],
    [selectedName],
  );
  const demoResponseMode =
    previewMode ||
    backendStatus?.sandboxEnabled === false ||
    backendStatus?.openRouterConfigured === false;

  useEffect(() => {
    let cancelled = false;

    async function loadStatus() {
      try {
        const response = await fetch("/api/ai/status", { cache: "no-store" });
        const data = (await response.json()) as AssistantBackendStatus;

        if (!cancelled) {
          setBackendStatus(data);
          setBackendStatusNote("");
        }
      } catch {
        if (!cancelled) {
          setBackendStatusNote("AI backend status is unavailable.");
        }
      }
    }

    void loadStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (attachedFile?.previewUrl) {
        URL.revokeObjectURL(attachedFile.previewUrl);
      }
    };
  }, [attachedFile]);

  async function sendMessage(text = input) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const assistant = selectedAssistant;
    const userMessage: Message = {
      id: nextMessageId(),
      role: "user",
      text: trimmed,
    };
    const nextMessages = [...messages, userMessage];

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsSending(true);

    if (demoResponseMode) {
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId(),
          role: "assistant",
          text: buildDemoResponse(assistant, trimmed),
        },
      ]);
      setIsSending(false);
      return;
    }

    try {
      const response = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assistantName: assistant.name,
          assistantDescription: assistant.description,
          messages: toApiMessages(nextMessages),
          attachmentName: attachedFile?.name,
          voiceTranscript: voiceNote,
        }),
      });
      const payload = (await response.json().catch(() => null)) as {
        text?: unknown;
        model?: unknown;
        message?: unknown;
        error?: unknown;
      } | null;

      const responseText =
        response.ok && typeof payload?.text === "string"
          ? payload.text
          : apiErrorMessage(response.status, payload);
      const modelLabel =
        response.ok && typeof payload?.model === "string"
          ? `\n\nModel: ${payload.model}`
          : "";

      setMessages((current) => [
        ...current,
        {
          id: nextMessageId(),
          role: "assistant",
          text: `${responseText}${modelLabel}`,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId(),
          role: "assistant",
          text: "The AI Assistant sandbox could not reach the server route.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function newChat() {
    setMessages([
      {
        id: nextMessageId(),
        role: "assistant",
        text: `New ${selectedAssistant.name} chat ready. Ask for a draft, checklist, roleplay, or review.`,
      },
    ]);
    setInput("");
    setAttachedFile(null);
    setVoiceNote("");
  }

  function handleFile(file: File | undefined) {
    if (!file) return;
    const previewUrl = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined;
    setAttachedFile((current) => {
      if (current?.previewUrl) {
        URL.revokeObjectURL(current.previewUrl);
      }

      return {
        file,
        name: file.name,
        type: file.type,
        previewUrl,
      };
    });
    setVoiceNote(
      isAudioAttachment({ file, name: file.name, type: file.type, previewUrl })
        ? "Audio attached. Use Transcribe audio to add it to the message."
        : "",
    );
  }

  function removeAttachedFile() {
    setAttachedFile((current) => {
      if (current?.previewUrl) {
        URL.revokeObjectURL(current.previewUrl);
      }

      return null;
    });
  }

  async function transcribeAttachedFile() {
    if (!attachedFile || !isAudioAttachment(attachedFile) || isTranscribing) {
      return;
    }

    if (previewMode || backendStatus?.sandboxEnabled === false) {
      setVoiceNote("Audio transcription is not turned on in preview mode.");
      return;
    }

    setIsTranscribing(true);
    setVoiceNote("Transcribing audio in sandbox...");

    const formData = new FormData();
    formData.append("file", attachedFile.file, attachedFile.name);

    try {
      const response = await fetch("/api/ai/transcribe", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json().catch(() => null)) as {
        text?: unknown;
        message?: unknown;
        error?: unknown;
      } | null;

      const transcript =
        typeof payload?.text === "string" ? payload.text.trim() : "";

      if (!response.ok || !transcript) {
        setVoiceNote(apiErrorMessage(response.status, payload));
        return;
      }

      setInput((current) => `${current.trim()} ${transcript}`.trim());
      setVoiceNote("Transcript added to the message.");
    } catch {
      setVoiceNote("The transcription route could not be reached.");
    } finally {
      setIsTranscribing(false);
    }
  }

  function startVoiceInput() {
    const speechWindow = window as SpeechRecognitionWindow;
    const SpeechRecognitionConstructor =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      setVoiceNote("Voice input not available in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) {
        setInput((current) => `${current} ${transcript}`.trim());
      }
    };
    recognition.onerror = () => {
      setVoiceNote("Voice input could not start. Try typing the message.");
    };
    recognition.start();
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] overflow-x-hidden bg-lf-mist">
      <div className="grid min-h-[calc(100vh-5rem)] min-w-0 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
        <aside className="min-w-0 border-b border-lf-line bg-lf-navy p-4 text-white lg:border-b-0 lg:border-r">
          <button type="button" className="btn-primary w-full" onClick={newChat}>
            New chat
          </button>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/55">
              Assistants
            </p>
            <div className="mt-3 grid gap-1">
              {assistants.map((assistant) => (
                <button
                  key={assistant.name}
                  type="button"
                  className={`rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                    selectedAssistant.name === assistant.name
                      ? "bg-lf-orange text-white"
                      : "text-white/82 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedName(assistant.name)}
                >
                  {assistant.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/55">
              Example chat topics
            </p>
            <div className="mt-3 grid gap-2">
              {historyItems.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/78"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex min-h-[720px] min-w-0 flex-col bg-white">
          <div className="border-b border-lf-line px-5 py-5 md:px-8">
            <h1 className="h-display text-3xl">{selectedAssistant.name}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-lf-slate">
              {selectedAssistant.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
              <span
                className={`rounded-full border px-3 py-1 ${
                  previewMode
                    ? "border-lf-orange bg-lf-orangeSoft text-lf-orangeDark"
                    : backendStatus?.sandboxEnabled
                    ? "border-lf-orange bg-lf-orangeSoft text-lf-orangeDark"
                    : "border-lf-line bg-lf-mist text-lf-slate"
                }`}
              >
                {previewMode
                    ? "Preview mode"
                    : backendStatus?.sandboxEnabled
                    ? "Draft mode"
                    : "Draft mode off"}
              </span>
              <span className="rounded-full border border-lf-line bg-white px-3 py-1 text-lf-charcoal">
                Approved users only
              </span>
              <span className="rounded-full border border-lf-line bg-white px-3 py-1 text-lf-charcoal">
                No external sends
              </span>
            </div>
            {backendStatusNote && (
              <p className="mt-2 text-sm font-semibold text-lf-orangeDark">
                {backendStatusNote}
              </p>
            )}
          </div>

          <div className="flex-1 overflow-hidden px-5 py-6 md:px-8">
            <div className="mb-6 grid gap-3 md:grid-cols-3">
              {selectedAssistant.starters.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  className="rounded-xl border border-lf-line bg-lf-mist p-4 text-left text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
                  onClick={() => void sendMessage(starter)}
                  disabled={isSending}
                >
                  {starter}
                </button>
              ))}
            </div>

            <div className="space-y-4 pb-36">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-2xl whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-lf-navy text-white"
                        : "border border-lf-line bg-lf-mist text-lf-charcoal"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="max-w-2xl rounded-2xl border border-lf-line bg-lf-mist px-4 py-3 text-sm font-semibold leading-6 text-lf-slate">
                    {demoResponseMode ? "Preparing draft..." : "Preparing draft..."}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="sticky bottom-0 min-w-0 border-t border-lf-line bg-white/95 p-4 backdrop-blur md:p-5">
            {attachedFile && (
              <div className="mb-3 flex items-center gap-3 rounded-xl border border-lf-line bg-lf-mist p-3 text-sm text-lf-charcoal">
                {attachedFile.previewUrl && (
                  <img
                    src={attachedFile.previewUrl}
                    alt={attachedFile.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                )}
                <span className="font-semibold">{attachedFile.name}</span>
                <button
                  type="button"
                  className="ml-auto text-lf-slate hover:text-lf-orange"
                  onClick={removeAttachedFile}
                >
                  Remove
                </button>
                {isAudioAttachment(attachedFile) && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => void transcribeAttachedFile()}
                    disabled={isTranscribing}
                  >
                    {isTranscribing ? "Transcribing" : "Transcribe audio"}
                  </button>
                )}
              </div>
            )}
            {voiceNote && (
              <p className="mb-2 text-sm font-semibold text-lf-orangeDark">
                {voiceNote}
              </p>
            )}
            <div className="flex min-w-0 items-end gap-2 rounded-2xl border border-lf-line bg-lf-mist p-2 shadow-card">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(event) => handleFile(event.target.files?.[0])}
              />
              <button
                type="button"
                className="rounded-xl border border-lf-line bg-white px-3 py-3 text-sm font-bold text-lf-charcoal hover:border-lf-orange hover:text-lf-orange"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Attach file"
              >
                +
              </button>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                rows={1}
                placeholder={`Message ${selectedAssistant.name}`}
                className="max-h-32 min-h-11 min-w-0 flex-1 resize-none bg-transparent px-2 py-3 text-sm outline-none"
              />
              <button
                type="button"
                className="rounded-xl border border-lf-line bg-white px-3 py-3 text-sm font-bold text-lf-charcoal hover:border-lf-orange hover:text-lf-orange"
                onClick={startVoiceInput}
                aria-label="Use microphone"
                disabled={isSending}
              >
                Mic
              </button>
              <button
                type="button"
                className="btn-primary min-h-11"
                onClick={() => void sendMessage()}
                disabled={isSending}
              >
                {isSending ? "Sending" : "Send"}
              </button>
            </div>
          </div>
        </main>

        <aside className="min-w-0 border-t border-lf-line bg-white p-5 lg:border-l lg:border-t-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Helpful sources
          </p>
          <h2 className="h-display mt-2 text-2xl">Where to look next</h2>
          <div className="mt-5 grid gap-4">
            {sourceCards.map((source) => (
              <a
                key={source.title}
                href={source.href}
                className="rounded-xl border border-lf-line bg-lf-mist p-4 transition hover:border-lf-orange hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                      {source.type}
                    </p>
                    <h3 className="h-display mt-1 text-base">{source.title}</h3>
                  </div>
                  <span aria-hidden className="text-lf-orange">
                    ↗
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  {source.excerpt}
                </p>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
