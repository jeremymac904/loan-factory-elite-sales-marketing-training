# Next Platform Tasks For Groove

Recommended next code tasks for the live platform, in priority order. These are independent of this staging package and reflect work Groove is best positioned to do.

## P0 — Confirm View-As fix is live
- Verify Netlify deployed commit `46d92bd` (fix: allow master admin view-as access)
- Test: sign in as Jeremy at the live site, open `/admin/view-as`, pick a role, confirm orange banner appears across pages, click Exit View-As

## P1 — Profile completion modal on first sign-in
- Trigger on first successful sign-in (use a `profile.completed_onboarding` boolean or detect missing required fields)
- Show a modal that walks the user through filling in: title, department, phone, NMLS if applicable, bio
- Save via existing `POST /api/profile`
- Skippable, but reappears on next sign-in until completed

## P2 — Avatar upload via Supabase Storage
- Add Supabase Storage bucket `avatars` with per-user RLS
- Profile edit page gets an avatar uploader
- `profiles.avatar_url` points to the uploaded path
- FaceGram and HeaderAuthStatus already read `avatar_url`

## P3 — FaceGram messaging Supabase persistence
- `facegram_messages` table already exists (migrated this week)
- Replace seed messages in `FaceGramMessagesView` with real Supabase select/insert
- Sender = auth.uid(), recipient = picked email → user id lookup
- Polling or realtime subscription for thread updates

## P4 — AI Twin record creation flow
- `ai_twins` table already exists with unique owner_user_id
- When a user opens `/ai-assistants/my-ai-twin/` for the first time, insert a row using their seeded persona from `src/data/aiTwinPersonas.ts` if available, else a default
- Persona edit page (`/ai-assistants/persona/`) becomes a real edit form that saves to ai_twins

## P5 — FaceGram saved/notifications/follows persistence
- Tables exist: `facegram_saved_posts`, `facegram_follows`, `facegram_notifications`, `facegram_group_members`
- Wire each existing in-app interaction to insert/select/delete
- Page `/facegram/saved/` and `/facegram/notifications/` swap seeded data for real Supabase reads

## P6 — Lender Escalation review queue
- `lender_escalations` table is live
- Add `/admin/lender-escalations/` for LO Support + admin moderators
- Status update form (new → reviewing → resolved)
- Filter by status, urgency, lender

## P7 — Coaching assignments admin UI
- `coaching_assignments` table is live
- Add `/admin/coaching/assignments/` for admin + corporate coaches
- Coach picks a member, assigns coaching tier, status
- Member sees their assigned coach in `/member-area/`

## P8 — Scheduled tasks runner
- `scheduled_tasks` table is live
- Build a server-side runner (could be a Netlify scheduled function or n8n cron later)
- For now, build the UI in `/ai-assistants/tasks/` to add/edit/disable tasks
- Activation gated behind Google Calendar scope approval

## P9 — Profile is loaded into FaceGramExperience
- `FaceGramExperience` already calls `getBetaUserSession()` for auth state but defaults `displayName` and `profileTitle` to "Loan Factory LO" / "Loan Officer"
- Initialize those from `session.profile.full_name` / `session.profile.title` so composer/comments/avatar carry the real identity from sign-in

## P10 — Cleanup tasks Jeremy noticed earlier
- Restore `.agents/skills/` directory if those deletions in the main worktree were unintentional
- Confirm `.gitignore` keeps `_groove_handoff/` out of main once merged or kept as-is on its own branch

## Notes
- Do not introduce compliance flags for internal training clips
- Do not change FaceGram, AI Assistants, or Member Area access rules without checking `/lib/supabase/adminAccess.ts`
- Do not push without Jeremy's review for tasks P3 and onward that touch user-facing behavior
- Always test View-As after any change to auth utilities
