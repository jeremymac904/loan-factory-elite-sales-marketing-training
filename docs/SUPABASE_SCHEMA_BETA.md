# Supabase Beta Schema

Run `supabase/migrations/20260522000000_beta_auth_foundation.sql` in Supabase
SQL Editor or through the Supabase CLI.

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

After the schema migration, run `docs/SUPABASE_BETA_APPROVED_USERS.sql` to seed
the confirmed beta users in `approved_users`.
