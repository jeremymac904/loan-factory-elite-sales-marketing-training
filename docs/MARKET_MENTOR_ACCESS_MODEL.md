# Market Mentor Access Model

**Last updated:** 2026-05-28

## Access by role

| Role | Hub | Full toolset | Alliance tools |
|---|---|---|---|
| `master_admin` | yes | yes | yes |
| `admin` | yes | yes | yes |
| `lo_development_lead` | yes | yes | yes |
| `lo_development_member` | yes | yes | no |
| `corporate_coach` | yes | yes | yes |
| `marketing` | yes | yes | no |
| `team_leader` | yes | yes | no |
| `coaching_member_level_1` (LO Mastery $249) | yes | yes | no |
| `coaching_member_level_2` (Alliance $449) | yes | yes | yes |
| `loan_officer` (normal approved Loan Factory LO) | preview only | no | no |
| All other roles / signed-out | sign in required | no | no |

## Where access is enforced

- Hub page (`/market-mentor`) renders tool grid with tier-locked badges for users without full access
- Each tool page wraps content in `MarketMentorAccessGate` server component (`src/components/market-mentor/MarketMentorAccessGate.tsx`)
- Gate checks `getBetaUserSession()` against `hasMarketMentorFullAccess(role)` from `src/data/marketMentor.ts`
- Alliance-only roleplays and video templates additionally check `hasMarketMentorAlliance(role)`
- Beta preview cookie passes through for internal UI review

## Why this access model

- Paid coaching members get the practical tools they're paying for
- Internal leadership (admin, LO Development lead, corporate coach, marketing, team leader) need the same tools to coach, train, and review
- Normal approved Loan Factory LOs see the hub as an upgrade preview — the value of joining a coaching tier
- Vendor partner future role intentionally excluded

## Cross-references

- Roles defined in `src/lib/supabase/auth.ts`
- Master admin definitions in `src/lib/supabase/adminAccess.ts`
- Coaching tier model in `docs/COACHING_MEMBER_ACCESS_MODEL.md`
