# N8N Safe Automation Roadmap

**Last updated:** 2026-05-28
**Owner:** Jeremy McDonald (master_admin)
**Status:** Architecture / roadmap only. Every workflow below is disabled and manual-first by default.

## What this is

A safety-first architecture for the n8n workflows we may eventually run for the internal Loan Factory LO Development Platform (Next.js 16, deployed on Netlify from `main`, live at https://loan-factory-elite-sales-marketing-tr.netlify.app). It defines, for each candidate workflow, the trigger, the high-level node/step shape, status gates, duplicate protection, dry-run mode, and writeback/logging. It does not turn anything on.

This document covers six candidate workflows:

1. YouTube upload queue
2. Training clip embed sync
3. Gmail draft workflow
4. Google Chat notifications
5. Recurring coaching reminders
6. AI Twin task workflows

## Who it's for

Approved Loan Factory users who operate or review the platform's back-of-house automation: Jeremy (master_admin), admin, lo_development / lo_development_lead / lo_development_member, and marketing. It is internal and wholesale-focused. It is not borrower-facing and is not a public/consumer surface.

## How to use this doc

- Treat it as a blueprint, not an install guide. Read the **Safety model** first.
- When a workflow is being considered for activation, walk it through its **Status gates** and **Dry-run mode** sections and capture Jeremy's written approval before any live run.
- Where a fact is not yet confirmed, the doc says `SOURCE NEEDED: <what>`. Fill those in before building, not during a live run.
- This pairs with `docs/DO_NOT_BUILD_YET.md` (which currently lists "n8n workflow triggers", "Gmail / email send integration", "Webhooks", and "Scheduled notifications" as hold items), `docs/GOOGLE_GMAIL_DRIVE_TASKS_ROADMAP.md`, `docs/AI_TWIN_SYSTEM.md`, and `docs/AI_ADVANTAGE_YOUTUBE_EMBED_UPDATE.md`.

---

## Safety model

This is the non-negotiable contract for everything in this document.

- **Nothing runs live without explicit Jeremy approval.** Every workflow ships **inactive** in n8n. No active triggers, no cron schedules turned on, no production webhooks armed. Activation is a deliberate, per-workflow, written decision by Jeremy (master_admin).
- **No emails are sent.** Email-related workflows stop at **draft creation only** (Gmail `gmail.compose` scope). The `gmail.send` scope stays off by default. There is no bulk send and no automatic outbound email — consistent with `docs/GOOGLE_GMAIL_DRIVE_TASKS_ROADMAP.md` and `docs/AI_TWIN_SYSTEM.md`.
- **No YouTube uploads.** Nothing in this roadmap uploads, publishes, or changes the visibility of a video on YouTube. The upload queue produces a human checklist; a person uploads in the YouTube UI. We embed only YouTube IDs that a human has supplied and verified as already uploaded (unlisted).
- **No destructive Supabase ops.** Writeback is **append/insert and narrow status updates only**. No `DELETE`, no `DROP`, no `TRUNCATE`, no schema changes, no row removal. Workflows touch only the columns named in their writeback sections, and only with a Supabase key scoped to those tables. No bulk overwrites.
- **Manual-first by default.** Each workflow's default trigger is a **Manual Trigger** node ("Execute Workflow" in the n8n editor) operated by an approved user, not a schedule or live webhook. Scheduled/webhook triggers are documented as a *later* option and stay disabled until separately approved.
- **Dry-run is the default mode.** Every workflow has a `DRY_RUN` flag that defaults to `true`. In dry-run, the workflow performs reads and builds the intended output, but **does not** perform any external write, draft, send, upload, or Supabase write. It only logs what it *would* do.
- **No borrower-facing claims and no invented facts.** Workflows must not generate or send rate, APR, fee, program, "lowest", "best", or "guaranteed" content. Where a real fact or source is required, the workflow surfaces `SOURCE NEEDED: <what>` to a human rather than guessing.
- **PII discipline.** No borrower PII enters any AI node or log. Inputs are sanitized internal metadata only.
- **Auditability.** Every run (including dry-run) writes an entry to an automation run log (see **Shared logging conventions**) so we can always answer "what did automation do, when, in which mode, approved by whom."

If a request would break any bullet above, stop and confirm with Jeremy before proceeding.

---

## Shared conventions

These apply to all six workflows so each section can stay short.

### Environment flags (n8n credentials / variables)

| Flag | Default | Meaning |
|------|---------|---------|
| `DRY_RUN` | `true` | When true, no external writes/drafts/sends/uploads/Supabase writes occur. |
| `WORKFLOW_ENABLED` | `false` | Documentation/intent flag. n8n workflow itself also ships **inactive**. |
| `APPROVED_BY` | empty | Set to Jeremy's confirmation reference for the session a live run is authorized. |
| `WRITE_MODE` | `append_only` | Hard constraint; no other value is supported. |

### Shared logging conventions

Proposed append-only table `public.automation_runs` (additive, opt-in — `SOURCE NEEDED: confirm this table name/columns before creating it`):

- `id`, `workflow_key`, `run_id`
- `mode` — `dry_run` | `live`
- `trigger_type` — `manual` | `schedule` | `webhook`
- `status` — `started` | `completed` | `skipped_duplicate` | `gate_blocked` | `error`
- `items_considered`, `items_acted_on`, `items_skipped`
- `approved_by`, `started_at`, `finished_at`, `notes`

Every workflow's final node inserts one summary row here. This is the only write a dry-run is allowed to make, and it is insert-only.

### Duplicate protection pattern

The common pattern across workflows: derive a deterministic idempotency key, check whether that key already has a "done" record, and skip if so. No workflow relies on "did I already see this in memory" — it always re-checks the source of truth before acting.

---

## 1. YouTube upload queue

**Goal:** Turn the backlog of pending micro-lessons (e.g. the `AIADV-022`+ pending set noted in `docs/AI_ADVANTAGE_YOUTUBE_EMBED_UPDATE.md`, plus the 91 staged clips in `docs/LO_DEVELOPMENT_CUTDOWN_CLIP_LIBRARY.md`) into an ordered, human-actionable upload checklist. It **does not upload anything.**

- **Trigger (default):** Manual Trigger. Operated by lo_development or admin when they want a fresh checklist. (Later option, disabled: a daily Schedule Trigger to refresh the checklist doc — off until approved.)
- **Nodes / steps (high level):**
  1. Manual Trigger.
  2. Set node loads `DRY_RUN`, `WORKFLOW_ENABLED`, `APPROVED_BY`.
  3. Read pending items from the source map (`SOURCE NEEDED: confirm read source — Supabase table vs. the typed config in src/data/`). Pull title, `rowId`/slug, intended audience, path/section, and current video status.
  4. Filter to items where `youtube_id` is empty AND status is "ready to upload".
  5. IF node respects the daily-rate-limit reality from the embed doc: cap the checklist to a configurable batch size so we never imply more uploads than YouTube allows in a day.
  6. Code/Set node formats a human checklist: ordered list, one row per video, with the exact title and a blank field for the human to paste the resulting unlisted YouTube ID.
  7. Output: write the checklist to a Drive doc or return it in the n8n run output for a person to act on (`SOURCE NEEDED: confirm Drive destination folder`).
- **Status gates:** Only items explicitly marked ready advance. Anything missing a sanitized title or audience is held and surfaced as `SOURCE NEEDED: <field>`. The workflow refuses to mark anything "published."
- **Duplicate protection:** Idempotency key = `rowId`/slug. Any item that already has a real `youtube_id` is excluded — it has already been uploaded, so it never reappears in the queue.
- **Dry-run mode:** Default. Builds the checklist and logs counts; in dry-run it does not even write the Drive doc — it only returns the proposed checklist and the run-log summary.
- **Writeback / logging:** No write to YouTube, ever. No "published" flag flip by automation. Optional append-only insert to `automation_runs`. Any actual `youtube_id` is entered by a human after they upload (following the existing process of adding IDs to the published-video data with the same `AIADV-XXX`/slug pattern).

---

## 2. Training clip embed sync

**Goal:** Keep the platform's clip/video cards in sync with the YouTube IDs a human has already verified, so a card flips from "embed not added yet" to "embeddable" only when a real, verified ID exists. Targets the AI Advantage video library and the `/training-library/clips` library.

- **Trigger (default):** Manual Trigger, run by lo_development/admin after a verified-ID batch is ready. (Later option, disabled: a Schedule Trigger to reconcile nightly.)
- **Nodes / steps (high level):**
  1. Manual Trigger.
  2. Set node loads flags.
  3. Read the candidate ID list a human supplied (`SOURCE NEEDED: confirm input source — reviewed sheet/doc with rowId -> youtube_id pairs`).
  4. Read current platform state (clip/video records) to know which rows still lack an embed.
  5. Validation node: for each pair, confirm the `youtube_id` is non-empty and well-formed (11-char pattern), and that the row exists. Reject invented or malformed IDs. The workflow never generates a YouTube URL.
  6. Diff node: compute only the rows that genuinely need to change (currently empty -> now has a verified ID).
  7. IF `DRY_RUN`: report the diff and stop. ELSE: perform the narrow status update.
- **Status gates:** A row may flip to "embeddable" only if it has a human-verified, well-formed ID and the embed policy holds (unlisted YouTube only; no MP4s; no exposed Drive links — per the media policy in the embed doc). Pending items stay hidden from user-facing UI.
- **Duplicate protection:** Idempotency key = `rowId`. The diff step means re-running is a no-op for rows already set; it only acts on rows whose state actually differs.
- **Dry-run mode:** Default. Prints the would-change diff (row, old state, new ID) and writes only the run-log summary. No platform write.
- **Writeback / logging:** Live mode performs an **append/narrow-update only** Supabase write to the clip/video records: set `youtube_id` and the embed-status flag for the diffed rows. No deletes, no clearing of existing IDs, no bulk overwrite. Append a row to `automation_runs`. (`SOURCE NEEDED: confirm exact table and column names for clip/video embed status before enabling live mode.`)

---

## 3. Gmail draft workflow

**Goal:** Produce a Gmail **draft** (never a send) for an approved user — e.g. a coaching follow-up or an LO outreach note — so a human reviews and sends it themselves from Gmail.

- **Trigger (default):** Manual Trigger initiated by the owning user from inside the platform's AI Twin / email-draft surface (`/ai-assistants/email-drafts/`). No live webhook armed by default.
- **Nodes / steps (high level):**
  1. Manual Trigger with the user's chosen template + sanitized context (no borrower PII).
  2. Set node loads flags and the per-user Gmail connection state from `public.google_connections` (`gmail_connected`, scopes).
  3. Gate node: require `gmail.compose` scope present for this user. Hard-block if `gmail.send` is the only thing requested — send is off.
  4. AI node drafts copy (draft-only, human-review-required, no rate/APR/fee/program/guarantee claims; surfaces `SOURCE NEEDED: <fact>` instead of inventing).
  5. IF `DRY_RUN`: return the draft text for preview and stop. ELSE: Gmail node **Create Draft** only (`gmail.compose`). Never "Send".
  6. Final node logs the action.
- **Status gates:** Per-user opt-in and revocable (per `docs/GOOGLE_GMAIL_DRIVE_TASKS_ROADMAP.md`). Workflow runs only if that user has connected Gmail with `gmail.compose`. The Send path is disabled until a per-user `gmail.send` scope is explicitly approved — and even then it is out of scope for this automation, which stops at draft.
- **Duplicate protection:** Idempotency key = hash of (user, template, context, day). Before creating a draft, check whether an identical draft was already created today (via `automation_runs` and/or a Gmail draft lookup) and skip if so, to avoid duplicate drafts piling up.
- **Dry-run mode:** Default. Returns the proposed draft body and subject for human preview; creates no Gmail draft; writes only the run-log summary.
- **Writeback / logging:** Live mode creates exactly one Gmail **draft** in the user's own mailbox. No send. No CC/BCC to anyone. Append a row to `automation_runs` with `mode`, `approved_by`, and the idempotency key (not the draft body). An AI Twin send/draft audit log is "planned" per the Google roadmap — align with it when it lands.

---

## 4. Google Chat notifications

**Goal:** Post a short internal status note (e.g. "checklist refreshed", "embed diff ready for review") to a Google Chat space so the team has visibility — internal-only, never borrower-facing.

- **Trigger (default):** Called as a sub-step by another workflow's final node, or run via Manual Trigger for a one-off. No standalone live trigger armed.
- **Nodes / steps (high level):**
  1. Trigger receives a structured message payload (workflow_key, mode, counts, link to artifact).
  2. Set node loads flags and the target space/webhook config (`SOURCE NEEDED: confirm the internal Google Chat space and webhook/credential to use`).
  3. Template node builds a plain, internal message. No PII, no rates, no claims.
  4. IF `DRY_RUN`: log the message that would be posted and stop. ELSE: Google Chat node posts to the configured internal space.
  5. Final node logs the post.
- **Status gates:** Only fires for approved internal workflows and only posts to a pre-approved internal space. Messages are operational status only; the workflow refuses payloads that contain anything that looks like borrower PII or a rate/fee/guarantee claim (simple guard check).
- **Duplicate protection:** Idempotency key = (source workflow `run_id` + message stage). The same run posting the same stage twice is suppressed, so retries do not spam the space.
- **Dry-run mode:** Default. Renders and logs the message; posts nothing.
- **Writeback / logging:** No Supabase write beyond appending to `automation_runs`. The only external effect in live mode is a single message to one internal Google Chat space. No DMs, no external recipients.

---

## 5. Recurring coaching reminders

**Goal:** Prepare coaching nudges/reminders for paid coaching members — LO Mastery ($249) and Loan Factory Alliance ($449, premium/mastermind, biweekly Mastermind Meetings) — and for corporate_coach / coaching_member tiers, as a reviewable queue. It prepares; it does not auto-send.

- **Trigger (default):** Manual Trigger run by a coach/admin to generate the upcoming reminder batch. (Later option, **disabled**: a Schedule Trigger keyed off `public.scheduled_tasks.next_run_at` with `recurrence` of daily/weekly/bi-weekly. Scheduled notifications are on the `DO_NOT_BUILD_YET` hold list — keep the cron off until separately approved.)
- **Nodes / steps (high level):**
  1. Manual Trigger.
  2. Set node loads flags.
  3. Read due reminders from `public.scheduled_tasks` where `task_type` in (`reminder`, `coaching_nudge`, `follow_up`) and `next_run_at <= now` and `status = 'pending'`.
  4. Resolve recipient context by role/tier (e.g. `coaching_member_level_1` = LO Mastery, `coaching_member_level_2` = Alliance) without pulling borrower PII.
  5. Build each reminder's content (internal, coaching-focused, no rate/fee/guarantee claims; biweekly Mastermind cadence respected for Alliance).
  6. IF `DRY_RUN`: output the proposed reminder queue and stop. ELSE: hand each item to the **review queue** (and, only if a human later opts in per item, to the Gmail **draft** workflow in section 3 — still draft-only, still no send).
  7. Final node logs.
- **Status gates:** Tier/role gates the content (LO Mastery vs. Alliance vs. coach views). Sales & Marketing 101-601 is separate from paid coaching, so module reminders are tagged distinctly and never conflated with paid-tier reminders. No reminder is "sent" by this workflow — at most it produces a draft via section 3.
- **Duplicate protection:** Idempotency key = (`scheduled_task.id` + scheduled occurrence date). Before acting, confirm `last_run_at` is not already on this occurrence; skip if it is. This prevents double-nudging on a re-run.
- **Dry-run mode:** Default. Lists who would be reminded, with what, on what cadence — and writes nothing back except the run-log summary.
- **Writeback / logging:** Live mode performs a **narrow status update only** on `public.scheduled_tasks`: set `last_run_at` and advance `status`/`next_run_at` for the handled occurrence. No row deletion, no bulk rewrite. Append a row to `automation_runs`. No email send anywhere in this workflow.

---

## 6. AI Twin task workflows

**Goal:** Execute the **scheduled tasks** an approved user configured for their AI Twin (`/ai-assistants/tasks/`) — e.g. "draft my weekly check-in", "summarize my connected source folder" — as reviewable outputs and drafts only. Backed by `public.ai_twins` and the connection flags `task_scheduling_enabled`, `email_draft_enabled`, `gmail_connected`, `drive_connected`.

- **Trigger (default):** Manual Trigger initiated by the AI Twin owner. (Later option, **disabled**: Schedule Trigger reading `public.scheduled_tasks` for that user — kept off, same hold-list reasoning as section 5.)
- **Nodes / steps (high level):**
  1. Manual Trigger with the owning user's id and the task to run.
  2. Set node loads flags and the user's `ai_twins` row + connection flags.
  3. Gate node: require `task_scheduling_enabled = true` for this user; for any email-shaped task require `email_draft_enabled = true` and `gmail_connected = true` (compose scope) — otherwise stop with a clear "not enabled" result.
  4. Load persona/voice context (`persona_instructions`, `coaching_style`, `allowed_audiences`, `default_disclaimers`) and sanitized source material (no borrower PII).
  5. AI node produces the task output (draft-only, human-review-required, no rate/APR/fee/program/guarantee claims; attach the user's `default_disclaimers`; surface `SOURCE NEEDED: <fact>` instead of inventing).
  6. Routing IF: email-shaped output -> hand to section 3 (Gmail **draft** only). Content/summary output -> return to the user's task surface for review. Notification-shaped output -> optionally hand to section 4 (internal Google Chat).
  7. Final node logs.
- **Status gates:** Per-user, per-flag, and revocable. AI provider connection is checked (the AI Twin system documents an `/api/ai/status` check). No automatic outbound email, no bulk send (per `docs/AI_TWIN_SYSTEM.md`). Tasks for a tier/role only run with that tier's allowed audiences.
- **Duplicate protection:** Idempotency key = (`ai_twins.owner_user_id` + `scheduled_task.id` + occurrence date). Re-check `last_run_at`/`automation_runs` before acting; skip duplicates so a task is not run twice for the same occurrence.
- **Dry-run mode:** Default. Produces the task output for preview and routes nothing externally; writes only the run-log summary.
- **Writeback / logging:** Live mode writes only narrow, append/update-safe state: advance the handled `scheduled_tasks` occurrence (as in section 5) and, where the user enabled it, create a Gmail **draft** via section 3. No send, no upload, no destructive op. Append a row to `automation_runs`. Align with the planned AI Twin send/draft audit log.

---

## Activation checklist (per workflow, before any live run)

Run this before flipping `DRY_RUN` to `false` on any single workflow:

1. The workflow has been reviewed end-to-end in **dry-run** and the run-log output looks correct.
2. All `SOURCE NEEDED:` items in that workflow's section are filled in with confirmed facts/sources.
3. Status gates are verified (scopes/flags present, tier/role correct, no PII in inputs).
4. Duplicate-protection key has been validated against the real source of truth.
5. Writeback is confirmed append/narrow-update only — no destructive op possible with the credential in use.
6. Jeremy (master_admin) has given **written** approval for this specific workflow and run window; `APPROVED_BY` is set.
7. The n8n workflow is still **inactive** as a scheduled/webhook trigger unless that schedule was separately approved — manual execution only.

Until each box is checked, the workflow stays disabled and dry-run.

## Open items

- `SOURCE NEEDED:` confirm the `public.automation_runs` table name and columns before creating it (additive, opt-in).
- `SOURCE NEEDED:` confirm read source for the YouTube upload queue (Supabase table vs. typed config in `src/data/`) and the Drive destination folder for the generated checklist.
- `SOURCE NEEDED:` confirm exact table/column names for clip and AI Advantage video embed status before enabling the embed-sync live write.
- `SOURCE NEEDED:` confirm the input source (reviewed sheet/doc of `rowId -> youtube_id`) for the embed-sync workflow.
- `SOURCE NEEDED:` confirm the internal Google Chat space + credential/webhook to use for notifications.
- Reconcile with `docs/DO_NOT_BUILD_YET.md`: "n8n workflow triggers", "Gmail / email send integration", "Webhooks", and "Scheduled notifications" are current hold items — anything beyond manual, draft-only, dry-run execution needs an entry under that file's "Approved exceptions" with date and approver first.
