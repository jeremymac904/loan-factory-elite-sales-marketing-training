# Coaching Member Access Model

**Last updated:** 2026-05-27

## Tiers

| Tier | Price | DB role | Member Area |
|------|-------|---------|-------------|
| LO Mastery Coaching | $249/mo | `coaching_member_level_1` | `/member-area/lo-mastery/` |
| Loan Factory Alliance | $449/mo | `coaching_member_level_2` | `/member-area/alliance/` |

## $249 LO Mastery — includes

- Daily Power Hour
- Biweekly group coaching
- Daily coaching email
- Certified Mortgage Advisor track
- Scripts library
- Trackers
- Resource library
- Leaderboard
- LO Mastery Coaching AI Assistant

## $449 Alliance — includes

Everything in LO Mastery, plus:
- Daily Breakfast Club
- Weekly coaching
- Biweekly Mastermind sessions
- Advanced certifications
- Priority coaching
- Leadership / Team Builder track
- Mastermind resources
- Alliance AI Coaching Assistant

## Tier storage

Member tier lives in `profiles.coaching_tier`. AI Twin tier mapping lives
in `src/data/aiTwinPersonas.ts`. Per-coach assignments live in
`coaching_assignments`.
