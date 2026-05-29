# Integration Priority

Recommended order for pulling content from this staging package into the live platform.

## Tier 1 — Integrate this week

These have the highest leverage and lowest risk.

1. **Walkthrough Director package → record walkthroughs**
   - Hand all 8 walkthrough files + screen recording checklist to whoever records training
   - Master Admin and Normal LO walkthroughs first
   - 40–55 min total finished footage

2. **ContentForge platform_status_update_copy.md → in-app banner**
   - The "What's new this week" recap is paste-ready for a top-of-page banner on `/admin/` and `/profile/`
   - The 8-Q FAQ can drop into `/resources/` as a launch FAQ section

3. **ContentForge facegram_seed_posts.md → FaceGram seed**
   - 10 posts ready to populate the internal feed at launch
   - Attribute each to the seeded user listed in the file

4. **Walkthrough Director ROLE_WALKTHROUGH_MASTER_INDEX.md → /admin or /resources**
   - Useful as a training index page once walkthroughs are recorded and embedded

## Tier 2 — Integrate next week

5. **ContentForge google_chat_announcements.md + internal_launch_emails.md**
   - Send after walkthroughs are recorded so links can include video embeds
   - Each message reminds you "Jeremy / Andre approves before send"

6. **ContentForge ai_twin_rollout_copy.md → /ai-assistants/setup/ + /ai-assistants/my-ai-twin/**
   - In-app banner copy
   - 5-step callout (matches existing setup page)
   - Per-role rollout notes for admin AI settings page

7. **ContentForge coaching_member_rollout_copy.md → /member-area/lo-mastery/ + /member-area/alliance/**
   - Headlines, section descriptions, cross-sell line, coach intro template
   - Can be pulled into the existing tier page card descriptions

8. **ContentForge training_library_update_copy.md → /training-library/ + /ai-training/video-library/**
   - Outcome-first card descriptions
   - Subgroup callouts

## Tier 3 — Background research, ongoing

9. **TubeScout intel package → research playlist**
   - Hand `first_wave_research_priorities.md` to whoever runs research
   - Use the CSV templates to log findings
   - Live data already collected for mortgage coaching channels, motivation/mindset channels, AI for LO sources, competitor targets

10. **Market Hawk intel package → recruiting / strategy doc**
    - 26 competitors mapped across 5 segments with public-source citations
    - Use the 17-column competitor intel CSV and 19-column platform feature CSV to build the comparison sheet
    - 3 quick-win one-pagers listed for Market Hawk to return next

## Tier 4 — Defer until automation approved

11. **N8N Foreman blueprints → DO NOT BUILD YET**
    - All 9 workflow blueprints ship disabled and require Jeremy's written approval per workflow
    - Read `workflow_safety_gate_standard.md` first
    - When approved, build one workflow at a time, test in dry-run, log to audit table, then enable

## Tier 5 — Documentation, not platform routes

12. **All blueprint files + Tier 3/4 research files** belong under `/docs/` or stay in `_groove_handoff/`. Do not turn them into navigation entries.

## What absolutely first

If you only do one thing today: **record the Master Admin + Normal LO walkthroughs using the Walkthrough Director package**, then post `platform_status_update_copy.md` as an in-app banner on `/admin/`.
