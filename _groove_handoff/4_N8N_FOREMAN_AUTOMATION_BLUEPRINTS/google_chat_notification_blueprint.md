# Google Chat Notification Blueprint

## Workflow purpose

When admin or the LO Development team publishes a launch update, training drop, system change, or important internal announcement, this workflow posts a formatted card to the relevant internal Google Chat space (e.g., "LO Floor", "LO Support", "Leadership"). It is the internal broadcast channel for the Loan Factory team. It never sends external email and never posts outside the configured Loan Factory Google Workspace spaces.

## Trigger

- **Type:** Manual button click in `/admin` OR Supabase row insert into the planned `platform_announcements` table
- Both triggers route through the same workflow

## Inputs

| Field | Type | Required | Source |
|-------|------|----------|--------|
| `announcement_id` | uuid | yes | `platform_announcements.id` |
| `title` | string (max 120) | yes | `platform_announcements.title` |
| `body_markdown` | string (max 4000) | yes | `platform_announcements.body_markdown` |
| `chat_space_id` | string | yes | `platform_announcements.chat_space_id` (must match an allow-listed space) |
| `audience` | enum (`all_los`, `los_249`, `los_449`, `admins`, `lo_support`) | yes | `platform_announcements.audience` |
| `dry_run` | boolean | yes (default true) | env `DRY_RUN` |

## Status field

- `platform_announcements.status` — enum: `draft`, `scheduled`, `sent`, `failed`, `skipped_dry_run`
- `platform_announcements.status_updated_at`

## Duplicate protection

- Unique constraint on `(announcement_id, chat_space_id)` in a small `platform_announcement_sends` log table
- Workflow checks for an existing `sent` send record per (announcement, space) and skips if already posted

## Dry-run mode

When `DRY_RUN=true`:
- Validates allow-list, audience, and credential
- Posts to a designated `#test-chat-space` instead of the production space
- Marks `platform_announcements.status = 'skipped_dry_run'`
- Notes the test post URL in `workflow_runs.affected_row_ids`

## Failure logging

- Run logged to `workflow_runs`
- Google Chat API non-2xx writes `platform_announcements.status = 'failed'` with `error_message`
- Admin dashboard shows recent failed announcements with a "retry" button (manual re-run only)

## Writeback fields

- `platform_announcements.status`, `status_updated_at`, `sent_at`, `last_workflow_run_id`
- `platform_announcement_sends` — insert one row per (announcement, space) post

## Credentials required

- Google Chat webhook URL per space (stored in n8n credentials store; allow-list lives in env or a `chat_spaces` config table)
- Supabase service role JWT (read `platform_announcements`, write `platform_announcement_sends`, `workflow_runs`)

## Safe test path

1. Create a `#test-loan-factory-chat` space and add only Jeremy + reviewers
2. Run with `DRY_RUN=true` — posts go to the test space only
3. Verify card formatting, audience metadata, and `workflow_runs` rows
4. Switch to `DRY_RUN=false` with a low-stakes announcement to one production space
5. Promote to all spaces only after Jeremy approval

## Disabled / manual-first rule

- Workflow ships disabled
- Manual button in `/admin` ships hidden behind an admin-only feature flag
- Supabase row-insert trigger NOT wired up until manual mode has been used in production for at least one week

## What must never happen automatically

- Never post to a space not on the allow-list
- Never send any external email
- Never @ everyone in a space (Google Chat global mentions are forbidden by this workflow)
- Never auto-post a draft — admin must click "send" in the UI, or insert the row with `status = 'scheduled'`
- Never repost on retry without admin confirmation
- Never include user PII (loan numbers, SSN fragments, borrower addresses) in the body — validator strips/rejects
- Never use a shared/service Google account that isn't the internal Loan Factory bot identity
- Never post outside the Loan Factory Google Workspace tenant
