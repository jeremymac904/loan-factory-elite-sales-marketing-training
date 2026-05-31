"use client";

import { useMemo, useState } from "react";
import {
  recipientOptions,
  messageChannels,
  fillTokens,
  localDraftId,
  type CommsDraft,
  type DraftKind,
  type MessageChannel,
} from "@/data/coachComms";

// Shared draft composer for the Communication Center (messages) and Email
// Center (emails). Local React state only — "Save as draft" pushes onto an
// in-memory list rendered by DraftList. Nothing is sent.
//
// kind="message": recipient + channel + body, token fill for [Name]/[Coach].
// kind="email":   recipient + subject + body, token fill for [Name]/[Coach].
//
// Templates are passed in from the page (sourced from PA4's
// messageTemplates / emailTemplates) — this component does not own copy.

type MessageTemplate = { title: string; body: string };
type EmailTemplate = { title: string; subject: string; body: string };

type CommonProps = {
  coachName?: string;
  onSaveDraft: (draft: CommsDraft) => void;
};

type MessageProps = CommonProps & {
  kind: "message";
  templates: MessageTemplate[];
};

type EmailProps = CommonProps & {
  kind: "email";
  templates: EmailTemplate[];
};

type Props = MessageProps | EmailProps;

export default function DraftComposer(props: Props) {
  const { kind, coachName, onSaveDraft } = props;
  const isEmail = kind === "email";

  const [templateIndex, setTemplateIndex] = useState(0);
  const [recipientId, setRecipientId] = useState<string>("");
  const [channel, setChannel] = useState<MessageChannel>("facegram");
  const [subject, setSubject] = useState<string>(
    props.kind === "email" ? (props.templates[0]?.subject ?? "") : "",
  );
  const [body, setBody] = useState<string>(props.templates[0]?.body ?? "");
  const [savedNote, setSavedNote] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const recipient = useMemo(
    () => recipientOptions.find((r) => r.id === recipientId),
    [recipientId],
  );

  function applyTemplate(index: number) {
    setTemplateIndex(index);
    const t = props.templates[index];
    if (!t) return;
    setBody(t.body);
    if (isEmail) setSubject((t as EmailTemplate).subject);
    setSavedNote("");
  }

  // Personalize fills [Name] and [Coach] without overwriting the coach's edits
  // to other tokens. Operates on the current editable fields.
  function personalize() {
    const values = {
      Name: recipient?.name,
      Coach: coachName,
    };
    setBody((prev) => fillTokens(prev, values));
    if (isEmail) setSubject((prev) => fillTokens(prev, values));
    setSavedNote("");
  }

  const composedText = isEmail
    ? `Subject: ${subject}\n\n${body}`
    : body;

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(composedText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function saveDraft() {
    const template = props.templates[templateIndex];
    const draft: CommsDraft = {
      id: localDraftId(kind),
      kind: kind as DraftKind,
      title: template?.title ?? (isEmail ? "Email draft" : "Message draft"),
      recipientName: recipient?.name,
      recipientEmail: recipient?.email,
      subject: isEmail ? subject : undefined,
      channelLabel: isEmail
        ? undefined
        : messageChannels.find((c) => c.id === channel)?.label,
      body,
      status: "queued_local",
      createdLabel: "Just now",
    };
    onSaveDraft(draft);
    setSavedNote(
      isEmail
        ? "Saved locally as a draft. Send it yourself from Gmail."
        : "Saved locally as a draft. Send it yourself from your messaging tool.",
    );
  }

  const channelHint = messageChannels.find((c) => c.id === channel)?.hint;

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-lf-charcoal">
          {isEmail ? "Compose an email draft" : "Compose a message draft"}
        </h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-slate">
          Draft only — not sent
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Template
          </span>
          <select
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
            value={templateIndex}
            onChange={(e) => applyTemplate(Number(e.target.value))}
          >
            {props.templates.map((t, i) => (
              <option key={t.title} value={i}>
                {t.title}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            {isEmail ? "Recipient (one LO)" : "Recipient / LO"}
          </span>
          <select
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
            value={recipientId}
            onChange={(e) => {
              setRecipientId(e.target.value);
              setSavedNote("");
            }}
          >
            <option value="">— Choose a recipient —</option>
            {recipientOptions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} · {r.coach}
              </option>
            ))}
          </select>
        </label>

        {!isEmail && (
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Channel
            </span>
            <select
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
              value={channel}
              onChange={(e) => {
                setChannel(e.target.value as MessageChannel);
                setSavedNote("");
              }}
            >
              {messageChannels.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
        )}

        {recipient && (
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Sending to
            </span>
            <p className="rounded-lg bg-lf-mist px-3 py-2 text-sm text-lf-charcoal">
              {recipient.email}
              <span className="block text-xs text-lf-slate">
                {recipient.program}
              </span>
            </p>
          </div>
        )}
      </div>

      {isEmail && (
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Subject
          </span>
          <input
            type="text"
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setSavedNote("");
            }}
          />
        </label>
      )}

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          {isEmail ? "Body" : "Message"}
        </span>
        <textarea
          className="min-h-[180px] rounded-lg border border-lf-line bg-white px-3 py-2 font-sans text-sm text-lf-charcoal"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            setSavedNote("");
          }}
        />
      </label>

      {!isEmail && channelHint && (
        <p className="text-xs text-lf-slate">{channelHint}</p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={personalize}
          className="btn-secondary"
        >
          Personalize ([Name], [Coach])
        </button>
        <button type="button" onClick={saveDraft} className="btn-primary">
          Save as draft
        </button>
        <button
          type="button"
          onClick={copyDraft}
          className="text-sm font-semibold text-lf-orange"
        >
          {copied ? "Copied" : isEmail ? "Copy email draft" : "Copy message"}
        </button>
      </div>

      {savedNote && (
        <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
          {savedNote}
        </p>
      )}
    </div>
  );
}
