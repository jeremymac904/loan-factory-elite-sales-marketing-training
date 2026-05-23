# Quiz Report Outputs

This doc lists exactly what each report contains, where the text comes
from, and how export / copy / print / download works.

## Reports produced

| Report | Driven by | Where it renders |
|---|---|---|
| LO Development Profile (Coaching) | Coaching Personality Quiz | `/quiz-results/` |
| LO Development Profile (New LO) | New LO Aptitude Quiz | `/quiz-results/` |
| Coaching Report (text/Markdown) | `buildPersonalityReport` / `buildNewLoReport` | Copy / Download / Print |
| Team Leader Report | Embedded section inside Coaching Report | Same page |

## Coaching Report — Coaching Personality Quiz

1. Profile name (primary)
2. Tagline
3. Plain English summary (~2-3 sentences)
4. Secondary lean note (only if applicable)
5. Strengths
6. Blind spots
7. Coaching recommendations
8. Best training path
9. Best communication style from the coach
10. Suggested resources (linked to platform routes)
11. Category breakdown table — per-category leading profile
12. Score totals
13. Team Leader notes
14. Disclaimer

## Coaching Report — New LO Aptitude Quiz

1. Development stage profile name
2. Tagline
3. Development stage label
4. Plain English summary
5. Personality lean (if any)
6. First 30-day coaching focus
7. First scripts to practice (linked)
8. AI Training recommendations
9. Support routing
10. Category readiness breakdown with labels (Early, Building, On track, Strong)
11. Team Leader notes
12. Disclaimer

## Export controls on `/quiz-results/`

- **Copy report** — `navigator.clipboard.writeText(report)`. Toast on
  success / failure.
- **Download as Markdown** — Blob + temporary `<a download>` link. Saves
  as `coaching-personality-report.md` or `new-lo-coaching-report.md`.
- **Print** — `window.print()`. The action bar is hidden in print via the
  `print:hidden` Tailwind class.
- **Start over** — Wipes the relevant `sessionStorage` keys and resets the
  results view.

## Disclaimer language used everywhere

> This is a coaching and development tool, not a clinical, employment,
> underwriting, compliance, or licensing assessment.

Lives in `src/lib/quizScoring.ts` as `quizDisclaimer` and is referenced in
every text export and on every quiz page.

## What is intentionally NOT in the report (yet)

- No borrower or customer data.
- No real LO identifying data — local UI only.
- No PDF export (Markdown + print is enough for this batch).
- No email or share-to-coach flow.
- No persistent storage.
- No AI generation — all text is from the typed `coachingProfiles` data.

These are the right next-batch items once persistence, auth, and a
coach-side review flow are agreed.
