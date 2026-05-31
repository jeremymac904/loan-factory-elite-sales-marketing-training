# Recommended Categories

> Platform categories from category_index.json (source of truth), with verified clip counts, priority mix, and naming-rule compliance.
>
> Generated 2026-05-31 by Power Agent 1 (Local Video Inventory). Source-grounded from read-only manifests + actual source-folder file listings. No values invented; nothing uploaded. Regenerate via `node docs/video-library/inventory/_generate-inventory.js`.

category_index.json is the source of truth for platform categorization. It defines **17 unique categories** (verified: no duplicate keys). Counts below are cross-checked against the actual `platform_category` distribution in master_clip_manifest.json.

| Category | category_index count | Manifest primary count | Match |
|---|---:|---:|:---:|
| AI Support | 1 | 1 | yes |
| First File Survival Guide | 3 | 3 | yes |
| 1003 and Application Setup | 5 | 5 | yes |
| Loan Submission | 6 | 6 | yes |
| Compensation and Fees | 11 | 11 | yes |
| Compliance and Process Reminders | 6 | 6 | yes |
| Marketplace | 6 | 6 | yes |
| Troubleshooting | 3 | 3 | yes |
| Pricing Loans | 17 | 17 | yes |
| TERA and System Navigation | 5 | 5 | yes |
| Training Academy | 1 | 1 | yes |
| Leads and Marketing | 16 | 16 | yes |
| Getting Started | 1 | 1 | yes |
| Corporate Coach | 1 | 1 | yes |
| Commission Questions | 1 | 1 | yes |
| DPA | 4 | 4 | yes |
| Pylon | 4 | 4 | yes |
| **Total** | **91** | **91** | yes |

## Priority mix per category (from master_clip_manifest)

| Category | High | Medium | Low | Total |
|---|---:|---:|---:|---:|
| AI Support | 1 | 0 | 0 | 1 |
| First File Survival Guide | 3 | 0 | 0 | 3 |
| 1003 and Application Setup | 4 | 1 | 0 | 5 |
| Loan Submission | 6 | 0 | 0 | 6 |
| Compensation and Fees | 11 | 0 | 0 | 11 |
| Compliance and Process Reminders | 6 | 0 | 0 | 6 |
| Marketplace | 4 | 2 | 0 | 6 |
| Troubleshooting | 3 | 0 | 0 | 3 |
| Pricing Loans | 16 | 1 | 0 | 17 |
| TERA and System Navigation | 3 | 2 | 0 | 5 |
| Training Academy | 1 | 0 | 0 | 1 |
| Leads and Marketing | 8 | 7 | 1 | 16 |
| Getting Started | 1 | 0 | 0 | 1 |
| Corporate Coach | 1 | 0 | 0 | 1 |
| Commission Questions | 1 | 0 | 0 | 1 |
| DPA | 3 | 1 | 0 | 4 |
| Pylon | 4 | 0 | 0 | 4 |
| **All** | **76** | **14** | **1** | **91** |

## Mapping to platform pricing tiers

These 17 categories are the internal subject taxonomy for the cutdown clips (the LO Development training corpus). Per platform naming rules:

- **Sales and Marketing 101-601** is FREE internal training (never paid, never "Elite").
- **AI Advantage** is its own track.
- Paid tiers are exactly **LO Mastery ($249)** and **Loan Factory Alliance ($449)**.
- The subject categories above (Pricing Loans, Compensation and Fees, DPA, etc.) are not themselves price tiers; they are how downstream agents should group clips inside whichever surface hosts them.

## Naming compliance check (against manifest + category data)

- "Thuan" not "Tuan": PASS (no 'Tuan' in clip/category data).
- No "Apex Advisor": PASS.
- No paid "Elite" tier: PASS.
- Paid tiers limited to LO Mastery ($249) + Loan Factory Alliance ($449): PASS (no other paid-tier names appear in this data).
