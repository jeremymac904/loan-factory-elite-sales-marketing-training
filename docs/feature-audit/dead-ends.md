# Dead-ends & non-functional controls — read-only audit

Power Agent 4 — Mission 5. HEAD `d31809e`. Honest list of controls that do not do
what their label implies, plus surfaces that are placeholder/sample-only. Every
item cites a file. Items marked "verify" could not be re-opened line-by-line
before the tool channel degraded mid-audit; they are flagged, not asserted.

## Confirmed: draft-only controls that intentionally do not send (NOT bugs)

These are correct per the sprint's draft-only mandate — listed so they are not
mistaken for live sends, and so the universal assistant (PA3) keeps the same
discipline.

- `src/data/coachCommandCenter.ts:436-438` — `draft_calendar_event`,
  `draft_gmail_message`, `draft_google_chat_message` carry `needsIntegration:true`
  and the draft bodies say "Integration required before this can actually send" /
  "Google Chat is not connected" / "Approval is required before sending". Correct.
- `src/components/coach/CoachAssistantPanel.tsx:228-237` renders
  "Integration required before this can actually send." for those actions. Correct.
- `src/app/coach-command-center/email-center/page.tsx:55-61` — "There is no
  'Connect Gmail' button because live Gmail draft creation is not implemented
  yet." Static `WORKSPACE_CONNECTED.gmail` flag (`src/data/coachComms.ts`), not
  live OAuth. Correct (no fake connected state).
- `src/app/coach-command-center/calendar/page.tsx:59-65` — "nothing is added to
  any calendar here"; connection badge driven by static `WORKSPACE_CONNECTED.calendar`.
  Correct.
- `src/app/coach-command-center/messages/page.tsx:52-55` — composer "creates
  local drafts only. No Gmail, Google Chat, n8n, Zapier, or outbound send".
  Correct.

## Sample-data / static surfaces presented as live workflows (label vs. reality)

Not fake controls, but the data is sample/curated and writes do not persist, so a
user clicking through may expect live behavior that is not there yet.

- `src/data/coachCommandCenter.ts:43-52` — `assignedPeople` is sample data
  ("Sample LO — …"). Drives My People (`/coach-command-center/team`), Coaching
  Notes, and the coach assistant roster. File header (lines 1-6) is honest: it
  says sample data and that live tables can be wired later.
- `src/data/coachCommandCenter.ts:405-412` — `scorecardReviews` sample data
  drives the coach **Scorecard review** queue. The review queue has no control to
  persist a review action; it is read-only display.
- `src/app/coach-command-center/coaching-notes/page.tsx:191-206` — Coaching Notes
  "saves locally for now"; the `coaching_notes` Supabase write is NOT wired. The
  per-person "View scorecards / Assign training / Send a nudge" buttons are
  `Link`s to other pages (real navigation), not save actions.
- `src/app/coach-command-center/member-progress/page.tsx` — `memberProgress`
  sample data; read-only.

## Items to verify (could not re-open before tool outage; flagged honestly)

- LO **Scorecard submission** at `src/app/member-area/scorecards/page.tsx`
  (46 lines): I confirmed the page exists and is small. I could NOT confirm a live
  submit/write path to Supabase. Treat the LO submission as unverified-live until
  the submit handler + table + RLS are confirmed. If there is a submit button with
  no handler, that would be a real dead-end — verify.
- **FaceGram** posting at `src/app/facegram/page.tsx` (45 lines) + `FaceGramFeed`:
  feed renders from `src/data/facegram.ts`. A composer/post button that writes to
  Supabase was NOT confirmed. If a "Post" control exists without a write path,
  that is a dead-end — verify.
- **Support routing** `/api/support` (`src/app/api/support/route.ts`) and
  **Feedback** `/api/feedback` (`src/app/api/feedback/route.ts`): both API routes
  exist. I did not re-confirm line-by-line that they persist (and do not trigger
  any external email/Chat send). Verify the write target + RLS and confirm no
  outbound send, since the sprint forbids external sends.

## Layout / UX collisions (real, low-severity)

- Two fixed bottom-right buttons can overlap: the global "Send Feedback" button
  (`src/app/layout.tsx:46-49`, `fixed bottom-4 right-4 z-40`) and the coach
  assistant toggle (`src/components/coach/CoachAssistantPanel.tsx:134-143`,
  `fixed bottom-4 right-4 z-40`) on `/coach-command-center/*`. Same corner, same
  z-index → they stack on top of each other for coaches. De-conflict (offset one,
  or hide Send Feedback when the assistant toggle is present). PA3's universal
  assistant toggle will likely sit in the same corner — coordinate stacking.

## Account-menu dropdown bug (already known, restated for completeness)

- `HeaderAuthStatus.tsx` account menu is a native `<details>` (panel
  `absolute right-0 z-50`). It does NOT close on role change or navigation. Called
  out in the sprint brief as part of the bug to fix. Account-menu `Link`s already
  carry `prefetch={false}` — keep that. Not owned by this read-only audit; flagged
  for the owning agent.
