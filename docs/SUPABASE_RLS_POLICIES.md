# Supabase RLS Policies

The beta migration enables Row Level Security on every app table.

## Baseline

- App tables explicitly grant Data API access to `authenticated` and
  `service_role`; RLS remains the row-level enforcement layer.
- Authenticated users can read their own `profiles` row.
- Users can update limited profile fields only; a trigger preserves protected
  fields such as email, role, department, title, and status for non-admin self
  updates.
- Approved active users are detected through `approved_users`.
- Role capabilities are resolved through `role_permissions`.
- Service role use is server-only and bypasses RLS only for OAuth profile sync.

## Table Rules

- `approved_users`: users can read their own approval row; admins can manage all.
- `role_permissions`: approved users can read role capabilities; admins can manage.
- `suggestions`: approved users can create own or anonymous suggestions; users
  can read their own non-anonymous suggestions; admins/moderators can review.
- `facegram_groups`: approved users can read; admins/moderators can manage.
- `facegram_posts`: approved users can read internal posts; users can create and
  update their own posts; admins/moderators can moderate.
- `facegram_comments`: approved users can read internal comments; users can
  create and update their own comments; admins/moderators can moderate.
- `facegram_reactions`: approved users can read; users can create/delete their
  own reactions; admins/moderators can delete.
- `ai_chats`: users can read/create/update their own chats.
- `ai_messages`: users can read/create messages only inside their own chats.
- `training_progress`: users can manage their own progress; admins/coaches can read.
- `quiz_results`: users can create/read their own results; admins/coaches can read.

## Helper Functions

The migration creates helper functions for:

- Current auth email
- Approved user check
- Current profile role
- Generic role permission lookup
- Admin access
- FaceGram moderation access
- Coaching access

These functions support policies without exposing the service role key to the
browser.
