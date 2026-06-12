# Video Style Guide

Five supported formats. Layout is auto-selected from speaker count in
`create-video-plan.mjs` (`--layout` overrides). Canvas: 1920×1080 @ 25 fps.

## A. Single coach (`single`)

```
┌──────────────────────────┐
│                          │
│        ONE AVATAR        │
│       (full screen)      │
│  ▸ name lower-third      │
└──────────────────────────┘
```
- **Best for:** daily coaching videos, 1–3 minute single-topic hits.
- 1 speaker → avatar from `defaults.singleCoach` (Jeremy).

## B. Two-person podcast (`split_2`)

```
┌────────────┬─────────────┐
│  SPEAKER A │  SPEAKER B  │
│   (left)   │   (right)   │
│  960×1080  │  960×1080   │
└────────────┴─────────────┘
```
- **Best for:** 10–20 minute podcast episodes (the Open Notebook / NotebookLM format).
- Active speaker's panel plays their clip; the other panel shows a dimmed
  freeze-frame (brightness −0.18, saturation 0.7) so it reads as "listening".
- Default pair: Jeremy (A, left) + Edward (B, right).

## C. Three-person roundtable (`roundtable_3`)

```
┌───────┬───────┬───────┐
│  SPK A│  SPK B│  SPK C│
│ 640px │ 640px │ 640px │
└───────┴───────┴───────┘
```
- **Best for:** mastermind-style episodes.
- Default: Jeremy + Edward + John.

## D. Four-person roundtable (`grid_4`)

```
┌───────────┬───────────┐
│   SPK A   │   SPK B   │
├───────────┼───────────┤
│   SPK C   │   SPK D   │
└───────────┴───────────┘   (960×540 each)
```
- **Best for:** coach panel / "AI boardroom" content.
- Default: Jeremy + Edward + John + Craig.

## E. Audio waveform fallback (`waveform`)

Always available; used when avatar generation fails or isn't configured.
Composition (see the rendered sample in `podcast/video_outputs/`):

- Dark hero background (`site_background_vids_and_images/dark-hero-background.png`)
  with a 45% black vignette
- Loan Factory logo top-left on a white plate
- Topic-lane kicker in brand orange: `LO DEVELOPMENT PODCAST · SALES MARKETING · EP 1`
- Episode title, white, 64 px, centered
- Animated orange waveform (1500×300, `showwaves` cline, sqrt scale)
- Bottom bar: `Loan Factory · Elite Sales & Marketing Training`
- Burned-in subtitles from the SRT when a *real* transcript exists (skipped for
  placeholder transcripts)

## Shared branding rules

- **Colors:** brand orange `#F97316`, background dark `#0B1220`, text white.
  (Defined once in `scripts/podcast/lib.mjs` → `BRAND`.)
- **Intro card** (3 s): "LO Development Podcast" kicker, episode title, coach names.
- **Outro card** (4 s): Loan Factory wordmark line + "Elite Sales & Marketing
  Training" + library CTA.
- **Lower-thirds:** every panel gets a black 60%-opacity bar with the coach's name.
- **Fonts:** DejaVu Sans Bold (Linux) / Arial Bold (macOS) — auto-detected.
- HeyGen clips are requested with the dark brand background (`#0B1220`) so panels
  blend with the canvas.

## Aspect-ratio variants (future)

Vertical 1080×1920 cutdowns for FaceGram/Reels are out of scope for the POC; the
layout rects live in one table in `create-video-plan.mjs` (`LAYOUT_PANELS`), so a
`vertical_single` variant is a small addition.
