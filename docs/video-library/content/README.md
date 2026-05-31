# LO Development Video Library — Editorial Content Layer (Power Agent 7)

This directory documents the **editorial content layer** for the Loan Factory LO
Development Platform video library: short, source-grounded "lesson" copy that sits
on top of the raw video catalog.

## What this layer is

- **Data file:** `src/data/loDevelopmentVideoContent.ts` (auto-generated)
- **Generator:** `scripts/build-video-content.mjs` (Node, run with `node scripts/build-video-content.mjs`)
- **Keyed by:** `LoVideo.id` from PA2's `src/data/loDevelopmentVideoLibrary.ts`
  - clips: `lo-dev-001 … lo-dev-0NN` (the manifest `id` column)
  - long-form: `lo-longform-01 … lo-longform-07` (build_summary source roster order)

It is a **companion** to PA2's catalog, not a replacement. PA2 owns hosting/status
metadata (`hostingStatus`, `youtubeEmbedUrl`, `routeSlug`, …). This layer owns the
human-facing teaching copy.

## Type contract

```ts
export type LoVideoContent = {
  id: string;                  // matches LoVideo.id exactly
  lessonTitle: string;         // = manifest title
  summary: string;             // manifest description (markdown first-sentence fallback)
  audience: string;            // manifest audience
  module: string | null;       // = platform_category (clips) / "Long-Form Training"
  whatThisHelpsWith: string;   // = manifest problem_solved
  watchTime: string;           // mm:ss from duration_seconds ("" for long-form / missing)
  keyTopics: string[];         // tags + secondary_categories (deduped, capped 8)
  relatedResources: string[];  // faq_questions + category label (capped 6)
  nextAction: string;          // concrete grounded next step
  sourceMissing: boolean;      // true when no usable manifest/markdown content
};

export const loDevelopmentVideoContent: LoVideoContent[];          // 91 clips + 7 long-form
export function getLoVideoContent(id: string): LoVideoContent | undefined;
```

## How to consume (other agents / page components)

Join this layer to PA2's catalog by `id`:

```ts
import { getLoVideoBySlug } from "@/data/loDevelopmentVideoLibrary";
import { getLoVideoContent } from "@/data/loDevelopmentVideoContent";

const video = getLoVideoBySlug(slug);
const content = video ? getLoVideoContent(video.id) : undefined;
```

`getLoVideoContent` returns `undefined` for unknown ids — always guard.

## Source mapping (grounding)

| Field               | Source of truth                                                        |
| ------------------- | --------------------------------------------------------------------- |
| `lessonTitle`       | `master_clip_manifest.csv` → `title`                                   |
| `summary`           | `description` (fallback: first sentence of per-clip markdown body)     |
| `audience`          | `audience`                                                             |
| `module`            | `platform_category` (clips) / `"Long-Form Training"` (long-form)       |
| `whatThisHelpsWith` | `problem_solved`                                                       |
| `watchTime`         | `duration_seconds` → `mm:ss`                                           |
| `keyTopics`         | `tags` + `secondary_categories`                                        |
| `relatedResources`  | `faq_questions` + platform-category label                             |
| `nextAction`        | derived from category/title/FAQ (grounded template, no invented facts) |
| long-form fields    | `build_summary.json` roster + `.video-source/longform-reports/*.md`    |

**No fabrication:** if a clip has no usable manifest/markdown content, the generator
sets `sourceMissing: true` and emits only the minimal fields it can ground. No
Google Drive or YouTube URLs are produced by this layer (that is PA2's domain, and
nothing has been uploaded).

## Regenerating

```bash
node scripts/build-video-content.mjs
```

The script is read-only against all sources (`.video-source/**`, the long-form
report folder) and writes only `src/data/loDevelopmentVideoContent.ts`. It is safe
to re-run; output is deterministic for a given source set.
