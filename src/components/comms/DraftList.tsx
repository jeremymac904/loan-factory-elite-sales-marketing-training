"use client";

import { useState } from "react";
import { draftStatusMeta, type CommsDraft } from "@/data/coachComms";

// Renders the locally-saved drafts created in the current session. Drafts are
// React state only (nothing is persisted or sent). Each row shows a clear
// "Saved locally / Draft only" status, the next action a coach should take to
// actually send it themselves, copy, and remove.

export default function DraftList({
  drafts,
  onRemove,
}: {
  drafts: CommsDraft[];
  onRemove: (id: string) => void;
}) {
  const [copiedId, setCopiedId] = useState<string>("");

  if (drafts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-lf-line bg-lf-mist/40 px-4 py-6 text-center text-sm text-lf-slate">
        No saved drafts yet. Compose one above and click{" "}
        <span className="font-semibold text-lf-charcoal">Save as draft</span> —
        it will appear here for this session.
      </div>
    );
  }

  function composedText(d: CommsDraft): string {
    if (d.kind === "email") {
      return `Subject: ${d.subject ?? ""}\n\n${d.body}`;
    }
    if (d.kind === "event") {
      return d.body;
    }
    return d.body;
  }

  async function copy(d: CommsDraft) {
    try {
      await navigator.clipboard.writeText(composedText(d));
      setCopiedId(d.id);
      window.setTimeout(() => setCopiedId(""), 1800);
    } catch {
      setCopiedId("");
    }
  }

  function nextAction(d: CommsDraft): string {
    if (d.kind === "email") {
      return d.recipientEmail
        ? `Open Gmail, paste, and send to ${d.recipientEmail} yourself.`
        : "Open Gmail, choose the recipient, paste, and send it yourself.";
    }
    if (d.kind === "event") {
      return "Open Google Calendar, create the event, and paste these details.";
    }
    if (d.channelLabel?.startsWith("FaceGram")) {
      return "Open FaceGram and post this to the right group or DM.";
    }
    if (d.channelLabel?.startsWith("Text")) {
      return "Send this from your own phone.";
    }
    return "Keep this as a private coaching note.";
  }

  return (
    <ul className="flex flex-col gap-3">
      {drafts.map((d) => {
        const status = draftStatusMeta[d.status];
        return (
          <li
            key={d.id}
            className="rounded-lg border border-lf-line bg-white p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-lf-charcoal">
                  {d.title}
                  {d.recipientName ? (
                    <span className="font-normal text-lf-slate">
                      {" "}
                      · {d.recipientName}
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-lf-slate">
                  {d.kind === "email"
                    ? "Email"
                    : d.kind === "event"
                      ? "Calendar event"
                      : d.channelLabel ?? "Message"}{" "}
                  · {d.createdLabel}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.class}`}
              >
                {status.label}
              </span>
            </div>

            {d.kind === "email" && d.subject && (
              <p className="mt-2 text-sm font-medium text-lf-charcoal">
                {d.subject}
              </p>
            )}

            <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-lf-mist px-3 py-2 font-sans text-sm text-lf-charcoal">
              {d.body}
            </pre>

            <p className="mt-2 text-xs font-semibold text-lf-orangeDark">
              Next action: <span className="font-normal text-lf-slate">{nextAction(d)}</span>
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => copy(d)}
                className="text-sm font-semibold text-lf-orange"
              >
                {copiedId === d.id ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                onClick={() => onRemove(d.id)}
                className="text-sm font-semibold text-lf-slate hover:text-lf-charcoal"
              >
                Remove
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
