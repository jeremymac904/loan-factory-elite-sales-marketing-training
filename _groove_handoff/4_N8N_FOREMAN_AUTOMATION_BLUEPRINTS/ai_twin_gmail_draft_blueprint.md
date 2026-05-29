# AI Twin Gmail Draft Blueprint

## Workflow purpose

When an approved Loan Factory user's AI Twin produces an email draft (subject + body + recipient + tone), this workflow writes the draft to that user's Gmail Drafts folder using the per-user `gmail.compose` OAuth scope held in `google_connections`. The user opens Gmail and decides whether to send. The workflow **never sends**, never bulk-sends, and never operates without the per-user OAuth row being present, valid, and non-revoked.

## Trigger

- **Type:** Authenticated internal API call from `/ai-assistants/email-drafts/` (Next.js route hits an n8n webhook with bearer token tied to the calling user)
- Manual trigger from n8n UI enabled for admin testing only

## Inputs

| Field | Type | Required | Source |
|-------|------|----------|--------|
| `user_id` | uuid | yes | bearer token claim |
| `ai_twin_id` | uuid | yes | request body |
| `subject` | string (max 200) | yes | request body |
| `body_html` | string (max 25k) | yes | request body |
| `recipient_email` | string (single address) | yes | request body |
| `idempotency_key` | string | yes | request body, generated client-side |
| `dry_run` | boolean | yes (default true) | env `DRY_RUN` or request override |

Recipient is a single address. Lists, cc, bcc not accepted in v1.

## Status field

- `ai_twin_email_drafts.status` — enum: `pending`, `created`, `failed`, `skipped_dry_run`, `requires_review`

## Duplicate protection

- Unique index on `(user_id, idempotency_key)` in `ai_twin_email_drafts`
- Workflow rejects duplicate idempotency_key with `status = 'skipped'` and references the existing row

## Dry-run mode

When `DRY_RUN=true`:
- Validates the user's `google_connections` row, scope, and refresh token freshness
- Does NOT call Gmail API
- Inserts an `ai_twin_email_drafts` row with `status = 'skipped_dry_run'` and a synthetic `gmail_draft_id = 'DRY_RUN'`
- Returns success to the caller

## Failure logging

- Workflow run logged to `workflow_runs`
- Per-draft failure (token expired, Gmail API error, scope revoked) writes to `ai_twin_email_drafts` with `status = 'failed'`, `error_message`
- If the user's `gmail.compose` scope is missing or revoked, workflow returns 403 to caller and never retries

## Writeback fields

Planned table `ai_twin_email_drafts`:

```
id uuid pk
user_id uuid fk profiles.id
ai_twin_id uuid fk ai_twins.id
idempotency_key text
subject text
body_html text
recipient_email text
gmail_draft_id text                -- returned by Gmail API
status text
status_updated_at timestamptz
error_message text
last_workflow_run_id uuid fk workflow_runs.id
created_at timestamptz
```

## Credentials required

- Per-user Google OAuth token loaded from `google_connections` (scope: `https://www.googleapis.com/auth/gmail.compose`)
- Supabase service role JWT (write to `ai_twin_email_drafts`, `workflow_runs`)
- Internal API bearer secret (HMAC validates the call originated from the Loan Factory app)

## Safe test path

1. Use a test user with their own Gmail account explicitly opted in via the standard `/settings/integrations` OAuth flow
2. `DRY_RUN=true` for first 5 invocations
3. Confirm `ai_twin_email_drafts` rows and `workflow_runs` entries
4. Switch to `DRY_RUN=false`, generate one draft, manually verify it appears in Gmail Drafts of the test user
5. Promote to general availability only after Jeremy approval

## Disabled / manual-first rule

- Workflow ships disabled
- Internal API route is feature-flagged off in the Loan Factory app (`AI_TWIN_GMAIL_DRAFTS_ENABLED=false`) until activation
- First production users are a hand-picked alpha group

## What must never happen automatically

- Never send the email — this workflow only creates drafts
- Never bulk-create drafts for multiple users in a single run
- Never accept more than one recipient per draft
- Never use a shared/service Gmail account — must be the user's own OAuth
- Never escalate the OAuth scope to `gmail.send` without explicit Jeremy approval and a separate blueprint
- Never log the body content beyond a length/hash for audit
- Never retry a draft creation after a 403 (scope revoked) — surface to user instead
- Never auto-confirm — the user must click send themselves in Gmail
