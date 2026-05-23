# Quiz Scoring Model

This document explains how both Loan Factory LO Development quizzes are
scored. Source of truth: `src/lib/quizScoring.ts`.

## Shared answer shape

Both quizzes use a flat answer map:

```ts
type QuizAnswerMap = Record<string, string>;
// { questionId: optionId }
```

Persistence is client-side `sessionStorage` only — no database writes, no
auth, no backend in this batch.

## Coaching Personality Quiz scoring

### Profile scoring

For each answered question, the selected option contributes a 4-key weight
vector to the running totals:

```ts
type Weights = {
  driver: number;        // 0..3
  influencer: number;    // 0..3
  steady: number;        // 0..3
  conscientious: number; // 0..3
};
```

The leading profile gets 3, two soft cross-profiles get 1 each, the
opposite gets 0. That keeps the math honest when an LO is a real blend.

### Per-category leads

Per question category (communication, motivation, learning, follow-through,
sales comfort, referral partner, coaching preference, content/marketing, AI
adoption, accountability) we also keep a running profile total — the top
profile for that category becomes the "leading profile" in the report
breakdown table.

### Primary + secondary

After summing, the profiles are sorted descending. The top profile is
**primary**. If `(top - second) / top <= 0.10` the report also surfaces the
second profile as a **secondary lean**.

### Disclaimer

Profiles are coaching/development archetypes. They are not clinical,
employment, licensing, or underwriting decisions.

## New LO Aptitude & Personality Quiz scoring

### Readiness average

For each answered question, the selected option contributes:

```ts
type Option = {
  readiness: 0 | 1 | 2 | 3;
  personalityLean?: ProfileId; // optional
};
```

`readinessAverage = sum(readiness) / answeredCount`.

### Development stage bands

The readiness average is mapped to a band:

| Avg | Profile |
|---|---|
| 0.00 – 0.99 | Foundation Builder |
| 1.00 – 1.74 | Coachable Climber |
| 1.75 – 2.34 | Confident Starter |
| 2.35 – 3.00 | Ready Producer |

Bands are intentionally conservative.

### Personality lean

Personality leans are counted per option. The profile with the most leans
across the whole quiz becomes the `personalityLean` carried into the
report (purely a tone hint, not used to pick the development stage).

### Per-category readiness

Each of the 11 categories carries an average 0–3 score for the breakdown
chart on the report page. We label it as:

| Avg | Label |
|---|---|
| 0.00 – 0.99 | Early |
| 1.00 – 1.74 | Building |
| 1.75 – 2.34 | On track |
| 2.35 – 3.00 | Strong |

## Why no "right answer"

The scoring model intentionally does not have a single right answer. Every
honest answer maps to a profile and a useful coaching plan. That keeps the
quizzes from feeling like a test and protects against gaming.

## Re-tuning the scoring later

The whole model is pure data + pure functions:

- Edit option weights in `src/data/personalityQuiz.ts`.
- Edit readiness scores in `src/data/newLoAptitudeQuiz.ts`.
- Edit bands in `src/data/newLoAptitudeQuiz.ts` (`aptitudeReadinessBands`).
- The scoring engine in `src/lib/quizScoring.ts` does not need to change.

No build or schema migration is required to re-tune.
