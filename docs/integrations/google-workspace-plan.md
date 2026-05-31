# Google Workspace Integration Plan — Gmail Drafts, Calendar Events, Google Chat

Owner: Power Agent 5 (Communications). Status as of this sprint: **NOT wired —
draft-only.** Every communication surface in the Coach Command Center
(Communication Center, Email Center, Training Scheduler) is honest about this:
they build local drafts only and show a "not connected — drafts only" status
via `ConnectionStatusBadge`. Nothing is sent, no real calendar events or Meet
links are created, and no Google Chat messages are posted.

This document is the exact plan + blockers to wire the real integrations
**later**, behind an approval-gated send. It deliberately does not include any
code that sends, because sending is out of scope for this sprint.

## Current state (what shipped this sprint)

- `src/data/coachComms.ts`
  - `WORKSPACE_CONNECTED` — single source of truth, currently
    `{ gmail: false, calendar: false, chat: false }`.
  - `workspaceServiceMeta` — labels + honest "not connected" copy per service.
  - `recipientOptions` — derived from PA4's `assignedPeople` (no invented data).
  - `fillTokens`, `buildEventDraft`, `buildMeetTrainingDraft`, `localDraftId` —
    pure helpers for local draft assembly.
  - `CommsDraft` / `DraftStatus` — the local draft record shape (React state only).
- `src/components/comms/`
  - `ConnectionStatusBadge.tsx` — presentational status badge (server-safe).
  - `DraftComposer.tsx` — message/email composer (template, recipient, channel,
    personalize, save-local, copy).
  - `DraftList.tsx` — saved-draft list with per-draft "Next action".
  - `EventDraftBuilder.tsx` — calendar event draft + Meet training draft builder.
  - `MessageWorkspace.tsx` / `EmailWorkspace.tsx` / `CalendarWorkspace.tsx` —
    local-state containers wiring composer + list per page.

All draft state lives in `useState` and is lost on reload by design — there is
no DB write and no network send this sprint (per the sprint DB-write policy).

## Target architecture (Phase 2 — when sending is approved)

```
Coach UI (composer)
   -> Next.js Server Action (approval-gated)
        -> read OAuth token from Supabase `google_connections` (existing table)
        -> call Google API (Gmail draft / Calendar event / Chat message)
        -> write an audit row (sent_by, sent_at, payload hash) to a new table
   -> UI shows "Draft created in Gmail" / "Event created" only on real success
```

Key principle: **never auto-send.** The UI always produces a draft first; a
human clicks an explicit, clearly-labeled approval control to perform the real
Google action. Bulk send stays disabled — one recipient at a time for email.

### 1. Gmail drafts (Findings #10 / #19)

- Scope: `https://www.googleapis.com/auth/gmail.compose` (create drafts; does
  NOT grant send). If a future "send" is approved, that is a separate, more
  sensitive scope (`gmail.send`) and a separate approval gate.
- API: `users.drafts.create` with a base64url-encoded RFC 822 message
  (To, Subject, body from the composer).
- Flow: composer payload -> server action -> look up the coach's Gmail token in
  `google_connections` -> create the draft -> return the Gmail draft URL so the
  coach opens it in Gmail and sends manually.
- Honest fallback (today): no token / not connected -> keep copy + "send it
  yourself from Gmail". This is already what the Email Center does.

### 2. Google Calendar events + Meet (Findings #11 / #20)

- Scope: `https://www.googleapis.com/auth/calendar.events`.
- API: `events.insert` with `conferenceDataVersion=1` and a
  `conferenceData.createRequest` to mint a Google Meet link automatically.
- Flow: `EventDraftBuilder` payload (title, date, time, duration, attendees,
  details) -> server action -> `events.insert` -> return the event + Meet link.
- Approval gate: the builder produces a draft; a single "Create this event"
  approval action performs the real insert. Until then, the page clearly states
  "Connection required — not connected to Google Calendar yet."

### 3. Google Chat (future)

- Scope: `https://www.googleapis.com/auth/chat.messages`.
- API: `spaces.messages.create` to post to a configured space.
- Lower priority than Gmail/Calendar; same approval-gated pattern. Until wired,
  group messaging stays on FaceGram (the Communication Center already routes
  group announcements there).

## Supabase

- The existing `google_connections` table holds per-user OAuth tokens. Phase 2
  reads (never weakens RLS on) that table from a server action only.
- A new `comms_sends` audit table would be added in Phase 2 (one migration,
  not this sprint) to record what was actually created/sent, by whom, and when.
- **No schema changes, migrations, RLS changes, or seed edits were made this
  sprint** (per sprint policy). The draft workflows are entirely client-side.

## Blockers to wiring real sends

1. **OAuth consent verification.** `gmail.compose`, `calendar.events`, and
   `chat.messages` are sensitive/restricted scopes. Google app verification
   (and possibly a security assessment for restricted scopes) is required before
   production use. Until verified, only test users can authorize.
2. **Token lifecycle.** Need refresh-token handling and revocation/error states
   surfaced in the UI (e.g. "reconnect Google") — not built this sprint.
3. **Approval queue.** The "approval-gated send" requires an approvals surface
   and the `comms_sends` audit table; both need product sign-off and a migration.
4. **Per-coach scoping.** Server actions must enforce that a coach can only act
   on their own assigned LOs (reuse `getCoachAccess()` scope on the server).
5. **Anti-bulk guardrail.** Email must remain one-recipient-at-a-time; no list
   upload, no merge-blast. This is a policy constraint to encode server-side.

## Definition of done for Phase 2 (future)

- `WORKSPACE_CONNECTED` becomes a live, per-user check (token present + valid).
- `ConnectionStatusBadge` flips to "connected" only when a real token exists.
- Each create action is explicit, single-target, audited, and reversible-by-hand
  (drafts in Gmail, events the coach can delete in Calendar).
- No surface ever auto-sends or bulk-sends.
