# Next Quiz Build Steps

The first working version of the Coaching Personality Quiz and the New LO
Aptitude & Personality Quiz is live locally. This is the queue for the
next pass.

## 1. Pull the real NotebookLM source

- Refresh local NotebookLM session: `notebooklm login`.
- Run the workflow in `NOTEBOOKLM_PERSONALITY_COACHING_SOURCE_SUMMARY.md`.
- Update profile copy in `src/data/coachingProfiles.ts` with Jeremy's
  voice and notebook-specific phrasing.
- Re-export this doc with verified source titles.

## 2. Rewrite the copy in Jeremy's voice

The first version uses neutral coaching language. Once the notebook is
read in, replace the generic phrasing in:

- `src/data/coachingProfiles.ts`
- `src/data/personalityQuiz.ts` (prompts only — option weights stay)
- `src/data/newLoAptitudeQuiz.ts` (prompts only — readiness stays)

Keep the data shape unchanged so the scoring engine and UI stay stable.

## 3. Add the LO Development Profile to the Apex member area

Once persistence is agreed, attach the latest Coaching Report to the LO's
profile in `/apex-member-area/`. Until then, the quiz is take-anytime and
results live on-device.

## 4. Decide on a persistence layer

Three options to discuss with Jeremy:

1. **Supabase row keyed by user_id** — easiest, plays with the existing
   Supabase auth. Need a clean coaching/quizzes table with row-level
   security.
2. **GHL contact custom field** — useful if coaching wants to surface
   inside GHL.
3. **No persistence** — quizzes are take-anytime, report is copy/download
   only. Lowest risk; this is the current state.

Whichever lands, the typed report shape in `quizScoring.ts` is ready.

## 5. Add a coach-side review flow

Convert `/coach-reports/` from sample data to live data once persistence is
in. Add filter by team, by profile, by readiness band, by status. Wire the
disabled buttons (Review with coach, Assign next training path) into
real routing.

## 6. Add an LO-side recommended training queue

On a completed report, expose a short list of recommended modules and
scripts directly inside the LO's view of `/apex-member-area/` or
`/training-library/`. Use the existing `suggestedResources` array on each
profile.

## 7. Mobile QA

Quick mobile QA pass on:

- `/assessments/`
- `/personality-quiz/`
- `/new-lo-aptitude-quiz/`
- `/quiz-results/`

Card spacing, button stack, and the progress sidebar all need to look
clean on a 360–414px viewport.

## 8. Run the NotebookLM-driven update again

After Jeremy reviews the report copy live, run the doc-driven pass one
more time and lock in the wording. Then commit a frozen `v1` of the
quiz data files.

## 9. Decide on report sharing

Likely the right next step is a "Share with coach" CTA that drafts an
email or Slack message from the existing text report. Built only after
persistence is in.

## 10. Do NOT do in this batch

- Push to GitHub or deploy.
- Trigger Netlify, n8n, or Google Workspace APIs.
- Email reports.
- Touch TERA, live databases, borrower data, or licensing data.
- Add real auth or production database writes.
- Make medical, legal, underwriting, employment, or compliance
  determinations.
- Edit `.env` or expose secrets.
- Use paid API calls.

Those guardrails are intentional. They stay on until Jeremy says
otherwise.
