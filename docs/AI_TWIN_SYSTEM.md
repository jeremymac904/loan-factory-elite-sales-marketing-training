# AI Twin System

**Last updated:** 2026-05-27

## Overview

Each approved Loan Factory user can have a personal AI Twin — an assistant
tuned to their voice, role, and coaching responsibilities. AI Twin records
live in `public.ai_twins` in Supabase.

## Access by role

| Role | AI Twin level |
|------|--------------|
| master_admin | Full AI Twin + admin AI controls |
| admin | Full AI Twin |
| lo_development_lead | LO Development AI Twin |
| lo_development_member | LO Development Assistant |
| loan_officer_support | Support assistant |
| corporate_coach | Corporate Coach AI Twin |
| marketing | Marketing AI Twin |
| team_leader | Team Leader AI Twin |
| coaching_member_level_1 | LO Mastery Coaching Assistant |
| coaching_member_level_2 | Loan Factory Alliance Coaching Assistant |
| loan_officer | Basic LO Support + Marketing Support |

## Seeded personas

See `src/data/aiTwinPersonas.ts`:
- Jeremy AI Twin — master_admin
- Andre AI Twin — lo_development_lead
- Edward Coaching AI Twin — corporate_coach
- Default Corporate Coach template
- Default LO Development template
- LO Mastery Coaching Assistant template
- Loan Factory Alliance Coaching Assistant template

## Data model

`public.ai_twins`:
- `owner_user_id` (unique)
- `display_name`, `assistant_name`, `role`
- `bio`, `persona_instructions`, `coaching_style`
- `specialties[]`, `allowed_audiences[]`, `default_disclaimers[]`
- Connection flags: `source_folders_connected`, `gmail_connected`, `drive_connected`, `task_scheduling_enabled`, `email_draft_enabled`

## Routes
- `/ai-assistants/` — main hub
- `/ai-assistants/my-ai-twin/` — your AI Twin
- `/ai-assistants/setup/` — 5-step setup
- `/ai-assistants/persona/` — voice and tone
- `/ai-assistants/knowledge/` — knowledge sources
- `/ai-assistants/tasks/` — scheduled tasks
- `/ai-assistants/email-drafts/` — email draft templates
- `/admin/ai-assistants/` — admin AI settings

## AI provider safety
- Drafts only by default
- No bulk send
- No automatic outbound email
- Send buttons disabled until per-user Gmail scope is explicitly approved
- AI provider connection check at `/api/ai/status`
