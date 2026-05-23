# Coaching Personality Quiz — Build Plan

**Working name:** Coaching Personality Quiz
**Audience:** Existing Loan Factory loan officers and team members.
**Status:** First working local version shipped 2026-05-22.

## Why this exists

Help Loan Factory coaches and team leaders quickly understand how each LO
naturally communicates, what motivates them, how they prefer coaching, and
where their blind spots are — so we can route training, scripts, and
support to the right place per person.

**This is a coaching and development tool only.** Not clinical, not
employment, not licensing, not underwriting, and not a substitute for human
coaching.

## Quiz shape

- **18 questions** across 10 categories:
  - Communication style
  - Motivation style
  - Learning style
  - Follow-through pattern
  - Sales comfort
  - Referral partner approach
  - Coaching preference
  - Content & marketing confidence
  - AI adoption readiness
  - Accountability needs
- Each question has 4 answer options.
- Each option weights toward one primary profile (3) and two cross profiles
  (1 each), so honest blended answers still register.
- Estimated time: ~5 minutes.

Source files:
- Quiz data: `src/data/personalityQuiz.ts`
- Profiles + coaching language: `src/data/coachingProfiles.ts`

## Output — LO Development Profile

The runner submits answers into a pure scoring function
(`src/lib/quizScoring.ts`) that returns:

- Primary coaching profile (Driver, Influencer, Steady, Conscientious)
- Secondary profile if the top two scores are within 10%
- Per-category leading profile (used in the breakdown table)
- Full profile scores
- A built-in plain-text Coaching Report ready for copy / print / download

## Report contents

Each Coaching Report includes:

1. Profile name + short plain English summary
2. Strengths
3. Blind spots
4. Coaching recommendations
5. Best training path (linked to 101–601 modules)
6. Best communication style from the coach
7. Suggested scripts/resources (linked into the existing platform routes)
8. Team Leader notes
9. Disclaimer

## UI routes

| Route | Purpose |
|---|---|
| `/assessments/` | Landing hub for both quizzes |
| `/personality-quiz/` | The Coaching Personality Quiz itself |
| `/quiz-results/` | Renders the LO Development Profile + Coaching Report |
| `/coach-reports/` | Sample completed reports for coaches/team leaders |
| `/admin/quiz-review/` | Role-based review queue (preview only) |

## Storage model (intentionally minimal)

- Answers live in `sessionStorage` under `lf-quiz:personality` while taking
  the quiz, and the submitted result lands in `lf-quiz:latest`.
- No database writes. No auth. No backend.
- Reports are generated client-side from the answer map.

## Open follow-up work

- Pull Jeremy's voice + notebook-specific phrasing once NotebookLM access is
  refreshed (see [NOTEBOOKLM_PERSONALITY_COACHING_SOURCE_SUMMARY.md](./NOTEBOOKLM_PERSONALITY_COACHING_SOURCE_SUMMARY.md)).
- Decide where the report should persist long-term (Supabase profile, GHL
  contact field, or LO Development profile only). All persistence is
  deliberately deferred for this batch.
- Consider lightweight share to coach (PDF or email) once persistence is
  agreed.
