# Lender Escalation Alert Blueprint

## Workflow purpose

When a row is inserted into `lender_escalations` (an LO has flagged a lender issue that needs LO Support attention), this workflow alerts the LO Support team in a designated internal Google Chat space and creates a `facegram_notifications` row for each assigned admin/reviewer. It never contacts the lender, never auto-replies to the LO, and never escalates externally. It guarantees the right Loan Factory humans see the escalation quickly.

## Trigger

- **Type:** Supabase row-insert webhook on `public.lender_escalations`
- Payload is HMAC-signed by Supabase and validated in the first node
- Manual trigger from n8n UI enabled for admin re-fire

## Inputs

| Field | Type | Required | Source |
|-------|------|----------|--------|
| `escalation_id` | uuid | yes | webhook payload `record.id` |
| `created_by_user_id` | uuid | yes | webhook payload |
| `lender_name` | string | yes | webhook payload |
| `severity` | enum (`low`, `medium`, `high`, `urgent`) | yes | webhook payload |
| `summary` | string (max 1000) | yes | webhook payload |
| `assigned_reviewer_ids` | uuid[] | no | webhook payload |
| `dry_run` | boolean | yes (default true) | env `DRY_RUN` |

## Status field

- `lender_escalations.notification_status` (new column) — `pending`, `notified`, `failed`, `skipped_dry_run`
- `lender_escalations.notification_status_updated_at`

## Duplicate protection

- Workflow checks `lender_escalations.notification_status` — if already `notified`, skips and logs
- Combined with `workflow_runs.inputs->>'escalation_id'` lookup for idempotency on re-fire

## Dry-run mode

When `DRY_RUN=true`:
- Resolves reviewer list and constructs the Chat card + notification payloads
- Posts the Chat card to a `#test-lo-support` space only
- Inserts NO `facegram_notifications`
- Sets `lender_escalations.notification_status = 'skipped_dry_run'`

## Failure logging

- Run logged to `workflow_runs`
- Per-channel delivery failure (Chat API, Supabase write) sets `lender_escalations.notification_status = 'failed'` with `error_message`
- Urgent severity failures trigger a second `workflow_runs` row tagged `requires_human` so the admin dashboard surfaces them at the top

## Writeback fields

- `lender_escalations` — `notification_status`, `notification_status_updated_at`, `last_workflow_run_id`
- `facegram_notifications` — one insert per assigned reviewer (`kind = 'lender_escalation'`, `link` to the escalation detail page)
- Google Chat post — content includes severity, lender_name, LO display name, link to the in-app escalation page (no PII beyond what is already on-platform)

## Credentials required

- Supabase service role JWT (read `lender_escalations`, `profiles`, `user_roles`; write `lender_escalations`, `facegram_notifications`, `workflow_runs`)
- Google Chat webhook URL for the LO Support space
- HMAC verification secret for the Supabase webhook payload

## Safe test path

1. Insert a test escalation in a Supabase branch with a test user as `created_by`
2. `DRY_RUN=true` — verify the `#test-lo-support` post
3. Verify `workflow_runs` row and that no `facegram_notifications` rows were written
4. Switch to `DRY_RUN=false` against the branch — verify reviewer notifications
5. Promote to production after Jeremy approval

## Disabled / manual-first rule

- Workflow ships disabled
- Supabase webhook target points at a paused endpoint during build
- Enabled by Jeremy after a clean dry-run round

## What must never happen automatically

- Never email the lender
- Never email the LO who created the escalation (auto-reply forbidden)
- Never post the escalation to any space other than the LO Support space and (in dry-run) the test space
- Never include borrower PII (name, loan number, SSN) in the Chat card or notification body — link to the in-app page where RLS controls visibility
- Never auto-close the escalation
- Never auto-assign reviewers if `assigned_reviewer_ids` is empty (escalate via admin dashboard banner instead)
- Never retry more than 3 times on transient failures
- Never bypass HMAC verification
