# N8N Automation Blueprint Index

**Status:** Blueprint-only. No workflows have been built, deployed, or executed in n8n. This package documents planned automations for the internal Loan Factory platform. Each must pass review and explicit Jeremy approval before any build work begins.

**Audience:** Approved Loan Factory loan officers and employees only. The platform is internal — not a public beta.

**Backend:** Supabase (project ref `ajitnzvbplyjrlzwzmwe`). Deployment: Netlify from `main`.

---

## Safety Gate Standard

| File | Purpose |
|------|---------|
| `workflow_safety_gate_standard.md` | The non-negotiable safety controls every blueprint below must inherit (trigger types, dry-run, failure logging, disabled-by-default, never-auto rules, approval workflow). |

All workflows below MUST implement every clause of the safety gate standard. Any deviation requires written approval from Jeremy.

---

## Workflow Blueprints

| # | File | Purpose (one line) | Trigger | Status | Priority | Key Dependencies |
|---|------|--------------------|---------|--------|----------|------------------|
| 1 | `youtube_clip_upload_sync_blueprint.md` | Sync metadata from new Loan Factory YouTube uploads back to `aiTrainingVideos.ts` (no auto-publish). | Manual or scheduled cron poll | Blueprint-only, not built | High | YouTube Data API v3 read scope; `aiTrainingVideos.ts`; seen-video-id index table; Jeremy approval before PR merge |
| 2 | `ai_twin_gmail_draft_blueprint.md` | Push AI Twin generated email content into the user's Gmail Drafts (never send). | API call from `/ai-assistants/email-drafts/` | Blueprint-only, not built | High | Per-user `gmail.compose` OAuth in `google_connections`; planned `ai_twin_email_drafts` table; Supabase service role |
| 3 | `google_chat_notification_blueprint.md` | Post launch/announcement updates to internal Google Chat spaces. | Manual admin button or `platform_announcements` row insert | Blueprint-only, not built | Medium | Google Chat webhook URLs (per space); planned `platform_announcements` table; Supabase service role |
| 4 | `coaching_reminder_workflow_blueprint.md` | Recurring nudges for $249 and $449 coaching members (in-app + scheduled task only). | Cron (daily 08:00, weekly Mon, biweekly Mastermind) | Blueprint-only, not built | High | `coaching_assignments`, `scheduled_tasks`, `facegram_notifications`; Supabase service role |
| 5 | `facegram_digest_workflow_blueprint.md` | Weekly internal FaceGram activity digest for approved Loan Factory users. | Cron (Sunday 18:00 local) | Blueprint-only, not built | Medium | `facegram_posts`, `facegram_comments`, `facegram_reactions`, `facegram_notifications`, optional Google Chat webhook |
| 6 | `lender_escalation_alert_blueprint.md` | Alert LO Support + admins when a lender escalation row is inserted. | Supabase row-insert webhook on `lender_escalations` | Blueprint-only, not built | High | `lender_escalations`, `facegram_notifications`, LO Support Google Chat space webhook |
| 7 | `ai_twin_recurring_task_blueprint.md` | Execute due `scheduled_tasks` rows by generating AI Twin drafts. | Cron poller every 15 min | Blueprint-only, not built | High | `scheduled_tasks`, `ai_twins`, `ai_chats`, `ai_messages`, planned `task_runs` audit table; AI provider key |
| 8 | `training_library_youtube_embed_sync_blueprint.md` | Update Training Library / AI Advantage video embeds when Jeremy approves a YouTube video. | Manual after approval | Blueprint-only, not built | Medium | `aiTrainingVideos.ts`; GitHub PR API; Jeremy approval gate |

---

## Cross-Cutting Dependencies

- **Supabase tables already present:** `profiles`, `approved_users`, `user_roles`, `role_permissions`, `suggestions`, `lender_escalations`, `facegram_posts`, `facegram_comments`, `facegram_reactions`, `facegram_messages`, `facegram_notifications`, `facegram_saved_posts`, `facegram_follows`, `facegram_group_members`, `ai_twins`, `ai_chats`, `ai_messages`, `training_progress`, `quiz_results`, `google_connections`, `coaching_assignments`, `scheduled_tasks`.
- **Supabase tables to be added (planned):** `ai_twin_email_drafts`, `platform_announcements`, `task_runs`, `workflow_runs`, `youtube_seen_video_ids`.
- **Google scopes (per-user, opt-in, revocable):** `gmail.compose` (drafts only), Google Chat webhook posting (space-level, not per-user), YouTube Data API read.
- **AI provider keys:** Held in Supabase Vault or n8n credentials store. Never inlined.
- **Deployment target:** Netlify from `main`. No Vercel.

---

## Build Order Recommendation

1. `workflow_safety_gate_standard.md` adopted and enforced first.
2. Workflow 6 (lender escalation alert) — highest user-protection value, simplest scope.
3. Workflow 7 (AI Twin recurring task runner) — unlocks scheduled AI Twin value.
4. Workflow 2 (Gmail draft writer) — unlocks AI Twin email loop, drafts only.
5. Workflow 4 (coaching reminders) — value for paying members.
6. Workflows 1 + 8 (YouTube sync + Training Library embed sync) — content pipeline.
7. Workflows 3 + 5 (Google Chat announcements + FaceGram digest) — communications layer.

No workflow ships enabled. Each requires Jeremy's explicit go-live approval after testing against a Supabase branch and a test user.
