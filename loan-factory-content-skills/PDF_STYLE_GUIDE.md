# PDF Style Guide

**Format standard for all Loan Factory PDFs** (LO Mastery PDFs, Alliance PDFs, 101–601 PDFs, AI Advantage PDFs, handouts, worksheets, scorecards, trackers, workflow/handoff docs).
**Inherits:** `LOAN_FACTORY_BRAND_OUTPUT_RULES.md` (colors, language, required structure). Read that first.
**Internal Loan Factory use only.**

---

## 1. Page setup
- **Size:** US Letter (8.5" × 11"), portrait default. Landscape allowed for scorecards/trackers/wide tables.
- **Margins:** 0.75"–1" all sides.
- **Background:** white `#FFFFFF`. Optional black `#000000` cover page.
- **Font:** Arial / Helvetica Neue (system sans). Body 10–11pt, line height ~1.4.

## 2. Cover / header (page 1)
```
[Loan Factory logo — top left]
TITLE (24–32pt bold, #111111)
Subtitle — the outcome in one line (13–15pt, #5F6368)
For: Approved Loan Factory users — <program/audience>   (11pt)
Internal Loan Factory use only                            (9pt, #5F6368)
[thin orange rule #F26A1F under the header]
```

## 3. Type hierarchy
| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Title | 24–32pt | Bold | `#111111` |
| Section heading (H2) | 16–18pt | Bold | `#111111` with orange underline/marker |
| Sub-heading (H3) | 12–13pt | Bold | `#2B2B2B` |
| Body | 10–11pt | Regular | `#111111` |
| Caption/label | 8–9pt | Regular | `#5F6368` |
| Emphasis/stat | inherit | Bold | `#F26A1F` |

## 4. Components
- **Section markers:** orange `#F26A1F` square/bar or underline before each H2.
- **Callout box:** light grey `#E5E7EB` fill or 1px border, orange left border (3px). For key takeaways, scripts, "do this."
- **Tables:** 1px `#E5E7EB` borders, bold header row on charcoal `#2B2B2B`/white text or light grey fill. Keep ≤5 columns.
- **Checklists / trackers:** open checkboxes `☐`, one action per line.
- **Bullets:** orange marker; short, parallel phrasing; max ~6 per group.
- **Pull quote / principle:** large, with orange accent, attributed to Jeremy / LO Development.

## 5. Footer (every page)
```
Loan Factory — LO Development · Jeremy McDonald, The Mortgage Mentor
Internal Loan Factory use only · <Program> · <Doc type> · Page X of Y
```

## 6. Content rules
- Lead with the outcome; one idea per section.
- Scannable: headings, bullets, tables, callouts — minimal walls of text.
- End every PDF with **Your next step** (1 primary CTA) + **Next steps** (2–4 actions).
- Worksheets/scorecards: leave fill-in space; label every field; include a scoring key or instructions.
- Obey all language rules: LO / TERA / Netlify / approved Loan Factory users; no deprecated paid-coaching names; no hype/guarantees/manifestation/borrow-to-join.

## 7. Production note
Generate via the **pdf** skill (or **docx** → export). Keep a white-background body + optional black cover. Always run the Pre-Send Brand Checklist from the brand rules file.
