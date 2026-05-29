"use client";

import { useState } from "react";

type Recipient = {
  email: string;
  name: string;
  role: string;
  department: string | null;
};

type Message = {
  id: string;
  from: string;
  to: string;
  body: string;
  time: string;
  unread?: boolean;
};

// Seed inbox templates. The "to" address is filled in with the signed-in user
// so the demo thread reflects whoever is viewing it, not a hardcoded account.
const seedTemplates: Omit<Message, "to">[] = [
  {
    id: "msg-1",
    from: "andre.king@loanfactory.com",
    body: "Got a minute? Want to align on the next LO Development push.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "msg-2",
    from: "edward.arvizo@loanfactory.com",
    body: "Coaching session recap is ready — want me to share it in FaceGram?",
    time: "3h ago",
  },
  {
    id: "msg-3",
    from: "duyen@loanfactory.com",
    body: "Marketing review is clear for the next FaceGram batch.",
    time: "yesterday",
  },
];

// Fallback identity for internal review/preview when there is no signed-in user.
const PREVIEW_IDENTITY = "you@loanfactory.com";

type Props = {
  previewMode: boolean;
  currentEmail: string | null;
  recipients: Recipient[];
};

export default function FaceGramMessagesView({
  previewMode,
  currentEmail,
  recipients,
}: Props) {
  const me = currentEmail ?? PREVIEW_IDENTITY;
  const [activeRecipient, setActiveRecipient] = useState<string | null>(
    seedTemplates[0]?.from ?? null,
  );
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>(() =>
    seedTemplates.map((template) => ({ ...template, to: me })),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);

  const conversations = Array.from(
    new Set(messages.map((m) => m.from)),
  ).map((email) => {
    const last = messages.filter((m) => m.from === email).pop();
    const recipient = recipients.find((r) => r.email === email);
    return {
      email,
      name: recipient?.name ?? email,
      lastBody: last?.body ?? "",
      time: last?.time ?? "",
      unread: last?.unread ?? false,
    };
  });

  const activeThread = messages.filter(
    (m) => m.from === activeRecipient || m.to === activeRecipient,
  );

  function sendDraft() {
    if (!activeRecipient || !draft.trim()) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      from: me,
      to: activeRecipient,
      body: draft.trim(),
      time: "just now",
    };
    setMessages([...messages, newMessage]);
    setDraft("");
  }

  function startConversation(email: string) {
    setActiveRecipient(email);
    setComposeOpen(false);
  }

  const filteredRecipients = searchTerm.trim()
    ? recipients.filter(
        (r) =>
          r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : recipients;

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="card">
        <div className="flex items-center justify-between">
          <h2 className="h-display text-lg">Conversations</h2>
          <button
            type="button"
            onClick={() => setComposeOpen(!composeOpen)}
            className="rounded-md bg-lf-orange px-2.5 py-1 text-xs font-bold text-white hover:bg-lf-orangeDark"
          >
            New
          </button>
        </div>

        {composeOpen && (
          <div className="mt-3 rounded-lg border border-lf-line bg-lf-mist p-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email"
              className="w-full rounded-md border border-lf-line bg-white px-2.5 py-1.5 text-xs"
            />
            <div className="mt-2 max-h-48 overflow-y-auto">
              {filteredRecipients.slice(0, 12).map((r) => (
                <button
                  key={r.email}
                  type="button"
                  onClick={() => startConversation(r.email)}
                  className="block w-full rounded-md px-2 py-1.5 text-left text-xs hover:bg-white"
                >
                  <div className="font-semibold text-lf-charcoal">{r.name}</div>
                  <div className="text-lf-slate">{r.email}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3 grid gap-1">
          {conversations.map((c) => (
            <button
              key={c.email}
              type="button"
              onClick={() => setActiveRecipient(c.email)}
              className={`rounded-lg px-3 py-2.5 text-left transition ${
                activeRecipient === c.email
                  ? "bg-lf-navy text-white"
                  : "hover:bg-lf-mist"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-semibold">{c.name}</span>
                {c.unread && (
                  <span className="h-2 w-2 rounded-full bg-lf-orange" />
                )}
              </div>
              <p className="mt-0.5 truncate text-xs opacity-70">{c.lastBody}</p>
              <p className="mt-0.5 text-[10px] opacity-50">{c.time}</p>
            </button>
          ))}
        </div>
      </aside>

      <div className="card flex flex-col">
        {activeRecipient ? (
          <>
            <header className="flex items-center justify-between border-b border-lf-line pb-3">
              <div>
                <h2 className="h-display text-lg">
                  {conversations.find((c) => c.email === activeRecipient)?.name ??
                    activeRecipient}
                </h2>
                <p className="text-xs text-lf-slate">{activeRecipient}</p>
              </div>
              <span className="rounded-full bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-charcoal">
                Internal
              </span>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto py-4">
              {activeThread.map((m) => {
                const fromMe = m.from === me;
                return (
                  <div
                    key={m.id}
                    className={`flex ${fromMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-md rounded-2xl px-3.5 py-2 text-sm ${
                        fromMe
                          ? "bg-lf-navy text-white"
                          : "bg-lf-mist text-lf-charcoal"
                      }`}
                    >
                      <p>{m.body}</p>
                      <p
                        className={`mt-1 text-[10px] ${
                          fromMe ? "text-white/60" : "text-lf-slate"
                        }`}
                      >
                        {m.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-end gap-2 border-t border-lf-line pt-3">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={
                  previewMode
                    ? "Preview mode — messages are not saved."
                    : "Write a message..."
                }
                rows={2}
                className="flex-1 resize-none rounded-lg border border-lf-line bg-white px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={sendDraft}
                disabled={!draft.trim()}
                className="btn-primary disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="grid h-full place-items-center text-sm text-lf-slate">
            Select a conversation or start a new one.
          </div>
        )}
      </div>
    </div>
  );
}
