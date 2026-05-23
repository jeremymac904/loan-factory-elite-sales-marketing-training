# NotebookLM Source Summary — Personality & Coaching Quiz

**Notebook:** https://notebooklm.google.com/notebook/1b1f116c-50f2-4f59-bc1c-61533ad917f7/preview
**Pulled by:** Loan Factory LO Development build automation
**Date:** 2026-05-22

## Access status

- Local NotebookLM CLI is installed and the storage cookie exists.
- Authenticated GET against the target notebook returned a redirect to
  `accounts.google.com` for interactive re-login.
- Per project safety rules (no interactive browser auth, no production API
  side-effects in this build), the source notebook was **not** fetched
  programmatically this run.

When Jeremy refreshes the NotebookLM session locally (`notebooklm login`),
this doc should be re-run to pull the actual source titles, key themes, and
non-copyrighted summary lines into the build.

## Working source themes used in this build

In the absence of fresh notebook excerpts, the quiz copy and coaching
profiles draw from two safe, well-established sources already in the Loan
Factory LO Development platform:

1. **Existing Loan Factory Personality Workshop** — references DISC-style
   communication and Strengths-style language at a high level. The workshop
   already lives at `/personality-workshop/` and ships with the right
   disclaimers (not clinical, not employment, not affiliated with the
   underlying frameworks).
2. **Standard mortgage LO coaching language** — communication style,
   motivation, learning style, follow-through, sales comfort, referral
   partner approach, content/marketing confidence, AI adoption, and
   accountability are all coaching categories Jeremy and the Loan Factory
   coaches already use in 1:1s and Power Hour.

## Themes mapped into the build

| Theme | Where it shows up |
|---|---|
| DISC-style profiles | `src/data/coachingProfiles.ts` — Driver, Influencer, Steady, Conscientious |
| Coaching style | Per-profile `bestCommunicationStyle` and team leader notes |
| Sales behavior | Per-profile `strengths`, `blindSpots`, `coachingRecommendations` |
| Motivation patterns | `personalityQuiz.ts` motivation category and matching profile copy |
| Communication preferences | `personalityQuiz.ts` communication category |
| Training recommendations | Per-profile `bestTrainingPath` + `suggestedResources` |
| Team leader coaching language | Per-profile `teamLeaderNotes` |
| New LO development pathways | `coachingProfiles.ts` New LO Readiness profiles |
| Referral partner communication | Quiz categories + per-profile partner notes |

## Source gap note

The target NotebookLM was not opened programmatically in this run, so the
quiz copy is **not yet** verified against direct source excerpts. The
existing Loan Factory Personality Workshop language remains the closest
verified Loan Factory source, and the quiz copy is intentionally generic
DISC-style language so a follow-up pass can swap in Jeremy's voice and
notebook-specific phrasing without rewriting the data model.

## Next steps to close the gap

1. Run `notebooklm login` to refresh the local session.
2. Run:
   ```bash
   notebooklm use 1b1f116c-50f2-4f59-bc1c-61533ad917f7
   notebooklm source list --json
   notebooklm ask "List the key coaching, sales, personality, and motivation themes covered in this notebook. Output a clean bullet list of themes and one-line summaries. Do not copy long passages."
   ```
3. Update `coachingProfiles.ts` and quiz copy with Jeremy's voice where the
   notebook language is stronger or more specific.
4. Re-publish this doc with verified source titles and theme summaries.
