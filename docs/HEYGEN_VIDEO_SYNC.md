# HeyGen Daily Video Sync — Admin Notes

## Naming convention (use this in HeyGen for every coaching video)

Daily videos:

```
Daily <Program> <Day>
```

- `Daily LO Mastery Monday` … `Daily LO Mastery Weekend`
- `Daily Alliance Monday` … `Daily Alliance Weekend`

Weekly curriculum videos:

```
<Program> Week <NN> <Coach>
```

- `LO Mastery Week 01 Edward` … `LO Mastery Week 12 Craig`
- `Alliance Week 01 Edward` … `Alliance Week 12 Craig`

Full create/rename list: `docs/HEYGEN_MISSING_VIDEOS.md`.

Why: today several videos share identical titles (two different videos are
both named "Wed - Edward - Edward Voice Clone"), so the sync script cannot
tell the Mastery Wednesday video from the Alliance one. With this convention
(or one HeyGen folder per program) the program/day assignment becomes fully
auto-discoverable and the hand-maintained seed list in the sync script can be
deleted.

The 12 current daily videos stay mapped exactly as they are — re-title them at
your leisure; the sync keys on video ID, not title.

## How to rerun the sync

```bash
cd loan-factory-elite-live
node scripts/sync-heygen-videos.mjs
```

Requires the authenticated HeyGen CLI (`heygen auth status` should show your
account). The script fails loudly if any mapped video is missing or not
`completed` — a non-zero exit means do not ship the JSON.

## Where the data lives

- Seed (hand-maintained, 12 lines): `scripts/sync-heygen-videos.mjs` → `SEED`
- Generated output (do not hand-edit): `src/data/dailyVideos.generated.json`
- Typed accessor used by the app: `getDailyVideo(program, day)` in
  `src/data/todaySystem.ts`
- Consumer: the Today page (`src/components/TodayWorkspace.tsx`)

## URL rules

- **Embeds must use `https://app.heygen.com/embeds/<video_id>`.** This is the
  stable iframe URL tied to the video ID; it keeps working as long as the
  video exists and sharing is enabled.
- **Never hardcode `video_url` MP4 links.** Those are signed storage URLs that
  HeyGen expires after a few days — a hardcoded one will 403 in production.
  The sync stores the current one as `fallbackDownloadUrl` only; rerun the
  sync whenever you need a fresh download link.
- `playbackUrl` (`app.heygen.com/videos/<id>`) is the stable dashboard/share
  page — fine for "open in HeyGen" links, not for embedding.

## Out of scope for now

The 12-week library (the pending `w2`–`w12` Edward/John/Craig videos in the
account) is intentionally NOT mapped yet. Same script pattern will handle it
once those renders finish and the naming convention is applied.
