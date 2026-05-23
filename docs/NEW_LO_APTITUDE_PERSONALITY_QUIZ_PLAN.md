# New LO Aptitude & Personality Quiz — Build Plan

**Working name:** New LO Aptitude & Personality Quiz
**Audience:** New and developing Loan Factory loan officers (typically the
first 0–180 days in the role).
**Status:** First working local version shipped 2026-05-22.

## Why this exists

Match new LOs to the right onboarding path, the right first scripts, the
right AI training cadence, and the right team-leader support — based on
their current readiness, not on assumption or seniority.

**This is a coaching and development tool only.** Not clinical, not
employment, not licensing, not underwriting, and not a substitute for human
coaching.

## Quiz shape

- **15 questions** across 11 categories:
  - Sales readiness
  - Learning speed
  - Script comfort
  - Phone comfort
  - Referral partner mindset
  - Process discipline
  - Tech comfort
  - AI readiness
  - Marketing confidence
  - Compliance awareness
  - Accountability
- Each question has 4 options.
- Each option has a readiness score (0–3) for the category.
- Many options also carry a light personality lean (Driver, Influencer,
  Steady, Conscientious) that is used as a tiebreaker on report tone.
- Estimated time: ~6 minutes.

Source files:
- Quiz data: `src/data/newLoAptitudeQuiz.ts`
- Profiles + coaching language: `src/data/coachingProfiles.ts`

## Output — LO Development Profile (new LO layer)

A pure scoring function in `src/lib/quizScoring.ts` returns:

- **Development stage profile**:
  - Foundation Builder — Stage 1 Onboarding
  - Coachable Climber — Stage 2 Building Rhythm
  - Confident Starter — Stage 2 Building Rhythm
  - Ready Producer — Stage 3 Scaling
- Personality lean (optional)
- Per-category readiness average (0–3) with a label (Early, Building, On
  track, Strong)
- A built-in plain-text Coaching Report

## Report contents

1. Development stage profile + short summary
2. Personality lean (optional)
3. First 30-day coaching focus
4. First scripts to practice (linked to module routes)
5. AI Training recommendations
6. Support routing
7. Team Leader notes
8. Category readiness breakdown
9. Disclaimer

## UI routes

| Route | Purpose |
|---|---|
| `/assessments/` | Landing hub for both quizzes |
| `/new-lo-aptitude-quiz/` | The New LO quiz itself |
| `/quiz-results/` | Renders the development profile + Coaching Report |
| `/coach-reports/` | Sample completed reports |
| `/admin/quiz-review/` | Role-based review queue (preview only) |

## Storage model

- Answers live in `sessionStorage` under `lf-quiz:new-lo` while taking the
  quiz, and the submitted result lands in `lf-quiz:latest`.
- No database writes. No auth. No backend.
- Reports are generated client-side.

## Readiness bands

Readiness average is `sum(readiness) / answered`. Bands map to development
stage profiles:

| Avg | Profile |
|---|---|
| 0.00 – 0.99 | Foundation Builder |
| 1.00 – 1.74 | Coachable Climber |
| 1.75 – 2.34 | Confident Starter |
| 2.35 – 3.00 | Ready Producer |

The bands are kept conservative to make sure no LO is over-ranked on the
first attempt.

## Open follow-up work

- Pull Jeremy's voice + notebook-specific phrasing once NotebookLM access is
  refreshed.
- Decide if the new LO quiz should automatically prefill the onboarding
  tracker once persistence is added.
- Add a coach-side "review with LO" CTA when persistence + auth are wired.
