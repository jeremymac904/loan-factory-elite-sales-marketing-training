# HeyGen Missing / Rename Report — for true final production

Generated against the live HeyGen account on 2026-06-11. The platform is fully
functional today via the seed/legacy mappings below; this list is what must be
created or renamed in HeyGen so the sync is fully automatic and Alliance gets
its own weekly content. Rerun `node scripts/sync-heygen-videos.mjs` after any
change — convention titles win over seeds automatically.

## 1. Daily videos — RENAME (videos exist, titles are off-convention)

| Required HeyGen title | Current video |
|---|---|
| Daily LO Mastery Monday | `43849ae9…` "Monday - Edward - Edward Voice Clone" |
| Daily LO Mastery Tuesday | `690296bf…` "Tuesday - Edward …" |
| Daily LO Mastery Wednesday | `2d269223…` "Wed - Edward …" |
| Daily LO Mastery Thursday | `e9e9b6d4…` "Thursday - Edward …" |
| Daily LO Mastery Friday | `5fda9c4f…` "Friday - Edward …" |
| Daily LO Mastery Weekend | `c908b1b4…` "Weekend - Edward …" |
| Daily Alliance Monday | `8594f11c…` "Mon Alliance - Edward …" |
| Daily Alliance Tuesday | `065fac42…` "Tues - Edward …" |
| Daily Alliance Wednesday | `3d855963…` "Wed - Edward …" |
| Daily Alliance Thursday | `d72baeff…` "Thursday - Edward …" |
| Daily Alliance Friday | `d0865cbe…` "Friday - Edward …" |
| Daily Alliance Weekend | `c049167e…` "Weekend - Edward …" |

## 2. LO Mastery weeklies — RENAME (videos exist as "w<N> - <Coach>")

Rename the best landscape render of each to:

`LO Mastery Week 01 Edward` … `LO Mastery Week 12 Edward`
`LO Mastery Week 01 John` … `LO Mastery Week 12 John`
`LO Mastery Week 01 Craig` … `LO Mastery Week 12 Craig`

(36 titles. Also note: weeks 1–7 mostly only have VERTICAL originals — re-render
those landscape like w8–w12 before renaming, then rerun the sync.)

## 3. Alliance weeklies — CREATE (do not exist at all)

Alliance currently plays the SAME weekly videos as LO Mastery (temporary,
internal-only). For true Alliance content, create 36 new videos titled:

`Alliance Week 01 Edward` … `Alliance Week 12 Edward`
`Alliance Week 01 John` … `Alliance Week 12 John`
`Alliance Week 01 Craig` … `Alliance Week 12 Craig`

## 4. Housekeeping

- Duplicate landscape copies exist for several weeklies (w9–w12 have two each).
  The sync picks the newest completed one; delete the spares in HeyGen at will.
- Always render landscape (16:9) — the platform embeds in 16:9 containers.
