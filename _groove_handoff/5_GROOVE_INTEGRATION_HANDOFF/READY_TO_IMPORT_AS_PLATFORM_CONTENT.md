# Ready To Import As Platform Content

Concrete mapping of staging files → live platform surfaces.

## Becomes FaceGram seed content
- `_groove_handoff/2_CONTENTFORGE_LAUNCH_PACKAGE/facegram_seed_posts.md`
  - 10 attributed seed posts
  - Suggested implementation: hand to Groove as initial inserts into `facegram_posts` table, attributed to the seeded users in `src/data/approvedUsers.ts`
  - Or render as a one-time admin seeding script

## Becomes in-app banner / page copy
- `_groove_handoff/2_CONTENTFORGE_LAUNCH_PACKAGE/platform_status_update_copy.md`
  - "What's new this week" → top-of-page banner on `/admin/` and `/profile/`
  - 8-Q FAQ → drop into `/resources/` as a launch FAQ section
  - "Where to start" 4-step quick start → `/` home page or `/profile/`
- `_groove_handoff/2_CONTENTFORGE_LAUNCH_PACKAGE/ai_twin_rollout_copy.md`
  - Banner + headline → `/ai-assistants/` hero
  - 5-step callout → already mirrors `/ai-assistants/setup/`
  - Per-role rollout map → `/admin/ai-assistants/` reference
  - FAQ → AI Assistants page FAQ section
- `_groove_handoff/2_CONTENTFORGE_LAUNCH_PACKAGE/coaching_member_rollout_copy.md`
  - Tier section descriptions → `/member-area/lo-mastery/` and `/member-area/alliance/`
  - Coach intro template → coach guide page
- `_groove_handoff/2_CONTENTFORGE_LAUNCH_PACKAGE/training_library_update_copy.md`
  - Card descriptions → `/training-library/` and `/ai-training/video-library/`

## Becomes AI Twin knowledge
- `_groove_handoff/2_CONTENTFORGE_LAUNCH_PACKAGE/training_library_update_copy.md`
- `_groove_handoff/2_CONTENTFORGE_LAUNCH_PACKAGE/coaching_member_rollout_copy.md`
- `_groove_handoff/2_CONTENTFORGE_LAUNCH_PACKAGE/ai_twin_rollout_copy.md`
- Walkthrough files (Phase 1) — useful as ground-truth context for what each role sees

These can be added to AI Twin knowledge sources later (after Drive scope is configured) so each AI Twin understands the platform structure.

## Becomes n8n workflows (later, after approval)
- All 9 blueprint files in `_groove_handoff/4_N8N_FOREMAN_AUTOMATION_BLUEPRINTS/`
- Build order: AI Twin Gmail draft (P0) → Lender escalation alert → Coaching reminder → FaceGram digest → Google Chat notification → YouTube clip sync → Training library embed sync → AI Twin recurring task → YouTube upload sync
- Read `workflow_safety_gate_standard.md` first
- One workflow at a time, dry-run first, audit table on, disabled by default

## Becomes recorded video training
- All 8 walkthroughs in `_groove_handoff/1_WALKTHROUGH_DIRECTOR_PACKAGE/`
- Plus `screen_recording_checklist.md` as the recorder's reference card
- Output videos slot into `/ai-training/video-library/` once uploaded

## Stays as documentation
- Everything in `_groove_handoff/3_TUBESCOUT_MARKET_HAWK_INTEL_PACKAGE/` → research package, stays in `/docs/research/` or `_groove_handoff/`
- Everything in `_groove_handoff/5_GROOVE_INTEGRATION_HANDOFF/` → routing docs, stays in `_groove_handoff/` until archived

## Becomes Google Chat / email sends (only after approval)
- `_groove_handoff/2_CONTENTFORGE_LAUNCH_PACKAGE/google_chat_announcements.md`
- `_groove_handoff/2_CONTENTFORGE_LAUNCH_PACKAGE/internal_launch_emails.md`

Drafts only. Jeremy or Andre approves before any send.

## Should NOT become anything yet
- Anything in this `_groove_handoff/` folder that hasn't been explicitly mapped above. Default state is "documentation only."
