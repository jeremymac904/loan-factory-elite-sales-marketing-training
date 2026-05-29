# Groove Integration Handoff — Index

**Branch:** `support/groove-staging-packages`
**Worktree path:** `~/LoanFactoryProjects/lo-dev-groove-staging`
**Status:** Local-only staging branch. NOT pushed. NOT merged to main.

This folder is the handoff package for Groove. Everything Terminal Claude built lives in `_groove_handoff/` and is staged on this branch. Groove can cherry-pick, copy, or import individual files into the live platform when ready.

## Files in this folder

| File | Purpose |
|------|---------|
| `GROOVE_HANDOFF_INDEX.md` | This index. Start here. |
| `WHAT_WAS_BUILT.md` | High-level summary of all 5 phases and 45 files. |
| `FILES_BY_PHASE.md` | Full file tree with one-line descriptions. |
| `INTEGRATION_PRIORITY.md` | What Groove should integrate first, second, third. |
| `NEXT_PLATFORM_TASKS_FOR_GROOVE.md` | Recommended next code tasks for the live platform. |
| `DO_NOT_DO_GUARDRAILS.md` | Hard rules Groove must respect when integrating. |
| `READY_TO_IMPORT_AS_PLATFORM_CONTENT.md` | Files that can become real platform content (FaceGram seeds, AI Twin knowledge, in-app copy). |

## Branch state

```
Branch: support/groove-staging-packages
Base: origin/main @ 46d92bd (fix: allow master admin view-as access)
Worktree: ~/LoanFactoryProjects/lo-dev-groove-staging
Push status: NOT PUSHED
Merge status: NOT MERGED
```

## How Groove uses this

1. Switch into the staging worktree: `cd ~/LoanFactoryProjects/lo-dev-groove-staging`
2. Browse `_groove_handoff/` for the package you need.
3. Copy files into the active branch as appropriate (docs into `/docs`, seed copy into `/src/data` or content files, etc.).
4. Use `INTEGRATION_PRIORITY.md` to decide order.
5. Use `DO_NOT_DO_GUARDRAILS.md` before any push or send.
6. Keep this staging branch untouched until everything is migrated, then archive.
