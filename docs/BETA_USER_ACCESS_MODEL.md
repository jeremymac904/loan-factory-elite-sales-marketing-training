# Beta User Access Model

## Access Source Of Truth

Beta access is controlled by Supabase:

1. Google Auth identifies the user.
2. The email must end in `@loanfactory.com`.
3. The email must exist in `approved_users` with `active = true`.
4. The OAuth callback syncs `approved_users` into `profiles`.
5. The app reads `profiles.role` and `role_permissions` for role-based access.

## Roles

- `admin`: can access admin-lite and all beta areas.
- `lo_development`: can access coaching, FaceGram, AI Assistants, and Resources.
- `marketing`: can access FaceGram moderation/review concepts, AI Assistants,
  and Resources.
- `corporate_coach`: can access coaching, FaceGram, AI Assistants, and Resources.
- `team_leader`: can access coaching/team leader areas, FaceGram, AI Assistants,
  and Resources.
- `loan_officer`: can access FaceGram, AI Assistants, and Resources.
- `support_staff`: can access Resources.

## Pending Users

Users who pass Google Auth but do not pass the approved user check land on
`/access-pending/`. Add them to `approved_users` and ask them to sign in again.

## TERA Boundary

This beta platform is separate from TERA. It does not write to TERA, does not
read TERA data, and does not claim TERA integration.
