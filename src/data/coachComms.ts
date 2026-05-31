// Local draft data + helpers for the Coach Command Center communication
// surfaces (Communication Center, Email Center, Training Scheduler).
//
// HONESTY CONTRACT: nothing in this file sends anything. These are local,
// draft-only building blocks. Drafts created in the UI live in React state
// only ("Saved locally" / "Draft only"). No Gmail send, no Google Calendar
// event creation, no Google Chat, no outbound network calls happen here.
// When the Google Workspace integration is wired (see
// docs/integrations/google-workspace-plan.md), these same shapes can be
// posted to an approval-gated server action — but only then.
//
// The message/email/event source content is owned by PA4 in
// src/data/coachCommandCenter.ts. This file only adds the draft-workflow
// scaffolding (recipients, channels, statuses, token fill, and the draft
// record shape) on top of that source — it does not duplicate templates.

import { assignedPeople, type AssignedPerson } from "@/data/coachCommandCenter";

// ---------------------------------------------------------------------------
// Connection status — drives the "Not connected" badges across all three pages.
// This is intentionally a const, not a feature flag: live sending is NOT
// implemented this sprint, so every surface honestly reports "draft only".
// ---------------------------------------------------------------------------

export type ConnectionState = "not_connected" | "connected";

export type WorkspaceService = "gmail" | "calendar" | "chat";

export const workspaceServiceMeta: Record<
  WorkspaceService,
  { label: string; draftVerb: string; connectHint: string }
> = {
  gmail: {
    label: "Gmail",
    draftVerb: "create a draft in Gmail",
    connectHint: "Sending and Gmail drafts are not connected yet — drafts only.",
  },
  calendar: {
    label: "Google Calendar",
    draftVerb: "create the event in Google Calendar",
    connectHint:
      "Connection required — not connected to Google Calendar yet. No events are created.",
  },
  chat: {
    label: "Google Chat",
    draftVerb: "post to Google Chat",
    connectHint: "Google Chat is not connected yet — drafts only.",
  },
};

// Single source of truth for whether live Workspace sending is wired. It is
// not, this sprint. Keep this `false` until the server-side OAuth + approval
// flow in docs/integrations/google-workspace-plan.md is shipped.
export const WORKSPACE_CONNECTED: Record<WorkspaceService, boolean> = {
  gmail: false,
  calendar: false,
  chat: false,
};

// ---------------------------------------------------------------------------
// Recipients — derived from PA4's assignedPeople roster so the composer can
// pick a real LO without inventing data. We expose a lightweight option shape
// for <select> menus.
// ---------------------------------------------------------------------------

export type RecipientOption = {
  id: string;
  name: string;
  email: string;
  coach: string;
  program: string;
  status: AssignedPerson["status"];
};

export const recipientOptions: RecipientOption[] = assignedPeople.map((p) => ({
  id: p.id,
  name: p.name,
  email: p.email,
  coach: p.coach,
  program: p.program,
  status: p.status,
}));

// ---------------------------------------------------------------------------
// Channels for the Communication Center (internal message planning).
// ---------------------------------------------------------------------------

export type MessageChannel = "facegram" | "google_chat" | "sms" | "internal_note";

export const messageChannels: { id: MessageChannel; label: string; hint: string }[] = [
  {
    id: "facegram",
    label: "FaceGram (group or DM)",
    hint: "Post to the team or coaching group on FaceGram.",
  },
  {
    id: "google_chat",
    label: "Google Chat draft",
    hint: "Google Chat is not connected. Copy the draft only; nothing is posted.",
  },
  {
    id: "sms",
    label: "Text message (your phone)",
    hint: "Copy the draft and send it from your own phone.",
  },
  {
    id: "internal_note",
    label: "Coaching note (just for me)",
    hint: "Keep this as a private planning note.",
  },
];

// ---------------------------------------------------------------------------
// Draft record — the shape stored in React state on each page. id/created are
// generated client-side; status is always local this sprint.
// ---------------------------------------------------------------------------

export type DraftStatus = "draft" | "ready_to_send" | "queued_local";

export type DraftKind = "message" | "email" | "event";

export type CommsDraft = {
  id: string;
  kind: DraftKind;
  title: string;
  // recipient is optional (group announcements / open events have none)
  recipientName?: string;
  recipientEmail?: string;
  // email-only
  subject?: string;
  // event-only
  date?: string;
  time?: string;
  duration?: string;
  attendees?: string;
  meetDraft?: string;
  // shared
  channelLabel?: string;
  body: string;
  status: DraftStatus;
  createdLabel: string;
};

export const draftStatusMeta: Record<
  DraftStatus,
  { label: string; class: string }
> = {
  draft: { label: "Draft only", class: "bg-lf-mist text-lf-slate" },
  ready_to_send: {
    label: "Ready to send (manual)",
    class: "bg-lf-orangeSoft text-lf-orangeDark",
  },
  queued_local: {
    label: "Saved locally",
    class: "bg-green-100 text-green-800",
  },
};

// ---------------------------------------------------------------------------
// Token fill — replaces [Name], [Coach], [resource], etc. with provided
// values. Unknown tokens are left intact so the coach can still see what to
// personalize. Pure string helper, no side effects.
// ---------------------------------------------------------------------------

export function fillTokens(
  text: string,
  values: Record<string, string | undefined>,
): string {
  let out = text;
  for (const [key, value] of Object.entries(values)) {
    if (!value) continue;
    // [Name] -> value, case-insensitive on the bracket token
    const token = new RegExp(`\\[${escapeForRegex(key)}\\]`, "gi");
    out = out.replace(token, value);
  }
  return out;
}

function escapeForRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Build a Google Meet "training draft" block. This is DRAFT TEXT ONLY — it
// does not create a real Meet link. The placeholder makes clear no real link
// exists yet.
export function buildMeetTrainingDraft(input: {
  title: string;
  date?: string;
  time?: string;
  duration?: string;
  attendees?: string;
}): string {
  const lines = [
    `Google Meet training draft — ${input.title || "Untitled session"}`,
    "(Draft only — no real Meet link is created until Google Calendar is connected.)",
    "",
    `When: ${[input.date, input.time].filter(Boolean).join(" ") || "[date / time]"}`,
    `Duration: ${input.duration || "[duration]"}`,
    `Attendees: ${input.attendees || "[add attendee emails]"}`,
    "Meet link: [generated automatically once Google Calendar is connected]",
  ];
  return lines.join("\n");
}

// Build the copy/paste invite block a coach can paste into a new Google
// Calendar event by hand today (draft only).
export function buildEventDraft(input: {
  title: string;
  date?: string;
  time?: string;
  duration?: string;
  attendees?: string;
  details: string;
}): string {
  const lines = [
    `Title: ${input.title || "[event title]"}`,
    `Date: ${input.date || "[date]"}`,
    `Time: ${input.time || "[time]"}`,
    `Duration: ${input.duration || "[duration]"}`,
    `Attendees: ${input.attendees || "[attendee emails]"}`,
    "",
    "Details:",
    input.details,
  ];
  return lines.join("\n");
}

// Tiny id generator for local drafts (no crypto dependency, stable enough for
// a client-only list keyed during a session).
export function localDraftId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}
