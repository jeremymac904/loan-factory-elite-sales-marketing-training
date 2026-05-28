# Profile and FaceGram Integration

**Last updated:** 2026-05-27

## Single source of truth

`public.profiles` is the single source of truth for user identity. Both the
main profile page and FaceGram use this row:

- `full_name` — shown as the user's display name
- `title` — shown next to the name
- `role` — drives badge color and FaceGram permissions
- `team_brand` — shown in FaceGram identity card
- `bio` — shown on profile and in FaceGram about
- `avatar_url` — used as the FaceGram avatar
- `coaching_tier` — drives Member Area access

## Edit flow

1. User signs in
2. Goes to `/profile/`
3. Clicks "Edit profile"
4. `/profile/edit/` submits to `POST /api/profile`
5. API route updates `public.profiles` via service-role client (RLS still enforced)
6. `router.refresh()` reloads server state

## FaceGram identity

`FaceGramExperience` reads the signed-in profile from `getBetaUserSession()`,
falling back to seeded/demo identities only in beta preview mode. Posts,
comments, likes, saves, and follows are tied to `auth.uid()`.

## Future work

- Avatar upload via Supabase Storage
- Profile completion modal on first sign-in
- Mutual follows surface in FaceGram right rail
