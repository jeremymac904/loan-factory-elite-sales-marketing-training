# Google Calendar & Gmail Coaching Workflows

How the Coach Command Center handles email and scheduling **safely** — draft and
copy first, never auto-send or auto-create.

## Gmail (Email Center)
- Templates: weekly coaching recap, first-call follow-up, re-engagement (plus
  message/nudge/announcement templates in Messages).
- Each draft has a **CopyDraftButton**:
  - **Not connected (today):** label "Copy Email Draft" → copies the ready-to-use
    email to the clipboard. The coach pastes and sends from their own Gmail.
  - **Connected (later):** label "Create Draft" → creates a Gmail **draft** only.
- **No bulk send. No automated send. Ever** without explicit future approval.
- Connect Gmail at `/settings/google` (Gmail draft scope). Status is shown there
  and on `/ai-assistants/connections`.

## Google Calendar (Training Scheduler)
Event types: one-on-one, group coaching, team training, Power Hour, Breakfast
Club (Alliance), Mastermind (Alliance), follow-up reminder.
- **Not connected (today):** the page shows **"Connect Google Calendar to create
  events."** and provides **copy-ready invite details** (CopyDraftButton →
  "Copy invite details") the coach can paste into their own calendar.
- **Connected (later):** events are created **only** when Google Calendar is
  fully connected (Calendar scope) **and** the user explicitly clicks create.
- Connect at `/settings/google` or `/ai-assistants/connections`.

## FaceGram (recognition / reminders)
Quick actions provide suggested post text with a "Copy post" button + a link to
`/facegram/`. **No auto-posting** — the coach reviews and posts.

## AI assistant prompts
Coaching prompts (summarize activity, draft nudge, weekly check-in, 1:1 prep,
team summary, FaceGram recognition, Power Hour reminder, mastermind prompt)
render as copy cards. They run in the AI Assistant once a provider is connected;
until then they are copy-ready prompt text. No live send/generation is faked.

## Setup pointers
- `/settings/google` — Google scope management (sign-in, Gmail draft/read, Drive
  read, Calendar).
- `/ai-assistants/connections` — connection status overview.
- See also [GOOGLE_OAUTH_BRANDING_FIX.md](GOOGLE_OAUTH_BRANDING_FIX.md) for the
  sign-in branding fix.
