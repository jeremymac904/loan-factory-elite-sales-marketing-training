"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useRef, useState } from "react";

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
    name: "Marketing Assistant",
    description: "Drafts internal marketing ideas, campaign outlines, and review-ready content notes.",
    starters: ["Rewrite this post for clarity", "Build a local event idea", "Create a referral partner email draft"],
  },
  {
    name: "Sales Coaching Assistant",
    description: "Helps LOs practice calls, objections, follow-ups, and weekly accountability.",
    starters: ["Roleplay a first call", "Coach my follow-up text", "Give me a Tuesday outreach plan"],
  },
  {
    name: "Referral Partner Assistant",
    description: "Helps shape Realtor and referral partner touchpoints for human review.",
    starters: ["Draft a partner coffee invite", "Create a weekly partner touch", "Improve this value prop"],
  },
  {
    name: "Borrower Conversation Assistant",
    description: "Helps practice borrower conversations without making approval, pricing, or loan decisions.",
    starters: ["Practice a first borrower call", "Explain next steps simply", "Rewrite this follow-up"],
  },
  {
    name: "Underwriting Support AI",
    description: "Organizes questions and checklists for human review. It does not make underwriting decisions.",
    starters: ["List documentation questions", "Summarize scenario facts", "Prepare a cleaner handoff"],
  },
  {
    name: "Scenario Structuring Assistant",
    description: "Turns messy notes into structured questions and options for qualified human review.",
    starters: ["Organize this scenario", "What facts are missing?", "Prepare a coaching question"],
  },
  {
    name: "TERA Workflow Helper",
    description: "Explains training workflow steps and terminology. It does not read from or write to TERA.",
    starters: ["Explain the next workflow step", "Make a checklist", "Turn this into a training note"],
  },
  {
    name: "AI Training Coach",
    description: "Teaches practical AI habits, prompt structure, and review discipline.",
    starters: ["Improve my prompt", "Create practice drills", "Build a 15-minute AI exercise"],
  },
  {
    name: "Content Repurposing Assistant",
    description: "Turns one approved idea into draft variations for internal review.",
    starters: ["Repurpose this into three formats", "Create a short video outline", "Turn this into a checklist"],
  },
  {
    name: "Team Leader Assistant",
    description: "Helps team leaders plan coaching rhythms, accountability notes, and meeting prompts.",
    starters: ["Build a team huddle agenda", "Create weekly accountability questions", "Summarize coaching themes"],
  },
  {
    name: "Compliance/Risk Review Assistant",
    description: "Flags language that should be reviewed before external use.",
    starters: ["Flag risk in this draft", "Make this more review-ready", "Find unsupported claims"],
  },
  {
    name: "Apex Advisor Coach",
    description: "Supports Apex Advisor coaching rhythm, trackers, scorecards, and member resources.",
    starters: ["Plan my Apex week", "Review my scorecard notes", "Prepare for Power Hour"],
  },
  {
    name: "Elite Sales & Marketing Coach",
    description: "Supports the 101 to 601 Sales & Marketing training series with scripts, prompts, and roleplays.",
    starters: ["Help with 101 practice", "Build a roleplay", "Summarize this module"],
  },
  {
    name: "1+1+1=5 Growth Assistant",
    description: "Helps shape team growth ideas, partner strategy, and content rhythm drafts.",
    starters: ["Plan a growth week", "Create a partner touch plan", "Draft a team content idea"],
  },
  {
    name: "Content Coach",
    description: "Turns rough internal ideas into clearer drafts for human review.",
    starters: ["Clean up this post", "Make this easier to read", "Suggest three hooks"],
  },
];

const sourceCards = [
  {
    title: "101 Foundation",
    type: "Training module",
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
    title: "Apex Advisor",
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
  "101 follow-up script",
  "Referral partner coffee invite",
  "Power Hour prep",
  "Content feedback request",
];

function responseFor(assistant: Assistant, prompt: string) {
  return [
    `${assistant.name} draft response:`,
    `I would turn "${prompt}" into a clearer next step, then point you to the most relevant Loan Factory training resource.`,
    "Draft only. Review before external use.",
  ].join("\n\n");
}

export default function AIAssistantHub() {
  const [selectedName, setSelectedName] = useState(assistants[0].name);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Choose an assistant, attach context if useful, then ask for a draft, roleplay, checklist, or review pass.",
    },
  ]);
  const [input, setInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<{
    name: string;
    previewUrl?: string;
  } | null>(null);
  const [voiceNote, setVoiceNote] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedAssistant = useMemo(
    () => assistants.find((assistant) => assistant.name === selectedName) ?? assistants[0],
    [selectedName],
  );

  function sendMessage(text = input) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const nextId = messages.length + 1;
    setMessages((current) => [
      ...current,
      { id: nextId, role: "user", text: trimmed },
      {
        id: nextId + 1,
        role: "assistant",
        text: responseFor(selectedAssistant, trimmed),
      },
    ]);
    setInput("");
  }

  function newChat() {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        text: `New ${selectedAssistant.name} chat ready. Ask for a draft, checklist, roleplay, or review pass.`,
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
    setAttachedFile({ name: file.name, previewUrl });
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
              Recent chats
            </p>
            <div className="mt-3 grid gap-1">
              {historyItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-lg px-3 py-2 text-left text-sm text-white/78 hover:bg-white/10"
                >
                  {item}
                </button>
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
          </div>

          <div className="flex-1 overflow-hidden px-5 py-6 md:px-8">
            <div className="mb-6 grid gap-3 md:grid-cols-3">
              {selectedAssistant.starters.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  className="rounded-xl border border-lf-line bg-lf-mist p-4 text-left text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
                  onClick={() => sendMessage(starter)}
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
                  onClick={() => setAttachedFile(null)}
                >
                  Remove
                </button>
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
                    sendMessage();
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
              >
                Mic
              </button>
              <button type="button" className="btn-primary min-h-11" onClick={() => sendMessage()}>
                Send
              </button>
            </div>
          </div>
        </main>

        <aside className="min-w-0 border-t border-lf-line bg-white p-5 lg:border-l lg:border-t-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Source previews
          </p>
          <h2 className="h-display mt-2 text-2xl">What this assistant would use</h2>
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
