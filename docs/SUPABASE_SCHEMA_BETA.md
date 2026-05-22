# Supabase Beta Schema

Run these SQL files in order through Supabase SQL Editor, the Supabase CLI, or
the authenticated Supabase MCP:

1. `supabase/migrations/20260522000000_beta_auth_foundation.sql`
2. `supabase/migrations/20260522220737_beta_auth_grants_and_seed.sql`
3. `supabase/seed.sql`

If the foundation migration has already been applied and users are landing on
`/access-pending/?reason=profile-sync`, run
`docs/SUPABASE_PROFILE_SYNC_FIX.sql`.

## Tables

- `profiles`: Auth user profile, beta role, department, title, avatar, approval status.
- `approved_users`: Email allowlist and beta role source of truth.
- `role_permissions`: Role capability flags for admin, coaching, FaceGram, AI, resources, moderation, and marketing review.
- `suggestions`: Signed-in platform suggestions with anonymous option.
- `facegram_groups`: Internal FaceGram group metadata.
- `facegram_posts`: Internal FaceGram posts.
- `facegram_comments`: Internal FaceGram comments.
- `facegram_reactions`: Internal FaceGram reactions.
- `ai_chats`: User-owned AI assistant chat sessions.
- `ai_messages`: Messages inside user-owned AI chats.
- `training_progress`: User training module progress.
- `quiz_results`: User quiz/profile report results.

## Role Seeds

The migration seeds baseline `role_permissions` for:

- `admin`
- `lo_development`
- `marketing`
- `corporate_coach`
- `team_leader`
- `loan_officer`
- `support_staff`

## Beta User Seeds

After the schema migration, run `supabase/seed.sql` or
`docs/SUPABASE_BETA_APPROVED_USERS.sql` to seed the confirmed beta users in
`approved_users`.
