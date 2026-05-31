# Missing Asset Report

> Everything expected-by-manifest-or-build-summary that is NOT present on disk, plus the manual-review publishing gate list.
>
> Generated 2026-05-31 by Power Agent 1 (Local Video Inventory). Source-grounded from read-only manifests + actual source-folder file listings. No values invented; nothing uploaded. Regenerate via `node docs/video-library/inventory/_generate-inventory.js`.

## Cutdown clip assets

No missing cutdown assets. All 91 clips have all four asset files (video, thumbnail, caption, markdown) on disk.

## Long-form source recordings & transcripts

All 7 recordings are present as real .mp4 masters and all 7 paired transcript .md files are present. Nothing missing on the long-form side.

## Publishing gate — manual_review flagged clips (build_summary.manual_review_count = 56)

56 of 91 clips are flagged for manual business/compliance review before publishing. These cover compensation, pricing, DPA, Pylon, and program-guideline (FHA/VA/USDA) topics. Each must be approved by Jeremy / compliance before its clip goes live. (This is the real publishing blocker, not missing files.)

| id | title | reason |
|---|---|---|
| lo-dev-002 | Why Loans Die: Appraised Value Mistake | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: VA |
| lo-dev-004 | Converting the Loan | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Compensation, Correspondent, Disclosure |
| lo-dev-005 | Borrower Paid versus Lender Paid | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Borrower Paid, Compensation, Lender Paid Category requires business/compliance confirmation before publishing. |
| lo-dev-006 | No Self Processing Requirement | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Compliance Category requires business/compliance confirmation before publishing. |
| lo-dev-007 | Community Property States | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Community Property, FHA, VA |
| lo-dev-008 | Self Employed 1099 Income and Underwriting Help | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: 1099 |
| lo-dev-009 | Student Loan Payments | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: EPO, FHA, Student Loan |
| lo-dev-010 | How to Change Compensation Defaults | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Compensation Category requires business/compliance confirmation before publishing. |
| lo-dev-014 | Pricing Engine Overview | Category requires business/compliance confirmation before publishing. |
| lo-dev-016 | Life of a Loan: Roles and Responsibilities | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Disclosure |
| lo-dev-025 | Initial Compensation Settings | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Compensation, Correspondent Category requires business/compliance confirmation before publishing. |
| lo-dev-026 | Comp Minimum and Maximum Logic | Category requires business/compliance confirmation before publishing. |
| lo-dev-027 | Wholesale Compensation Breakdown | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Compensation Category requires business/compliance confirmation before publishing. |
| lo-dev-028 | Lender Paid Case Study | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Lender Paid Category requires business/compliance confirmation before publishing. |
| lo-dev-029 | Borrower Paid Mechanics: Reducing Comp | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Borrower Paid Category requires business/compliance confirmation before publishing. |
| lo-dev-030 | Borrower Paid Mechanics: Winning Shopped Deals | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Borrower Paid, Compensation Category requires business/compliance confirmation before publishing. |
| lo-dev-031 | Correspondent Channel Overview: Flexibility | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Correspondent Category requires business/compliance confirmation before publishing. |
| lo-dev-032 | Correspondent Channel Overview: Processing and Fees | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Correspondent Category requires business/compliance confirmation before publishing. |
| lo-dev-033 | Non Target Compensation Strategy: Built In Rates | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Compensation, Non-Target, VA Category requires business/compliance confirmation before publishing. |
| lo-dev-034 | Non Target Compensation Strategy: Manual Overage | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Compensation Category requires business/compliance confirmation before publishing. |
| lo-dev-035 | Loan Factory Fee Schedule | Category requires business/compliance confirmation before publishing. |
| lo-dev-036 | Admin Fee Rules | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Admin Fee, Compensation, Compliance, Disclosure Category requires business/compliance confirmation before publishing. |
| lo-dev-037 | EPO Risks | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Compensation, EPO Category requires business/compliance confirmation before publishing. |
| lo-dev-041 | Rate Alerts Intro | Category requires business/compliance confirmation before publishing. |
| lo-dev-042 | Setting Rate Alerts: Setup Flow | Category requires business/compliance confirmation before publishing. |
| lo-dev-043 | Setting Rate Alerts: Target Fields and Notifications | Category requires business/compliance confirmation before publishing. |
| lo-dev-045 | Loan Factory IQ: Setup and Reports | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: EPO |
| lo-dev-058 | Convert to Loan Form: Submission Details | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Disclosure |
| lo-dev-059 | Changing Compensation Rules | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Borrower Paid, Compensation, Lender Paid Category requires business/compliance confirmation before publishing. |
| lo-dev-060 | Disclosure Selection | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Disclosure |
| lo-dev-062 | TRID and Address Entry | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Compliance, TRID Category requires business/compliance confirmation before publishing. |
| lo-dev-065 | Tolerance Cures | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Compliance, Tolerance Category requires business/compliance confirmation before publishing. |
| lo-dev-066 | Locking the Rate | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Rate Lock Category requires business/compliance confirmation before publishing. |
| lo-dev-067 | Orion DPA Intro | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: DPA Category requires business/compliance confirmation before publishing. |
| lo-dev-068 | Forgivable DPA Economics | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: DPA, VA Category requires business/compliance confirmation before publishing. |
| lo-dev-069 | FHA DPA Exit Strategies | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: DPA, FHA Category requires business/compliance confirmation before publishing. |
| lo-dev-070 | Mortgage One TPO Grant | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: DPA |
| lo-dev-071 | High Cost and Seller Concessions | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: DPA, High Cost, Seller Concessions Category requires business/compliance confirmation before publishing. |
| lo-dev-072 | Pylon Beta Guidelines | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Pylon Category requires business/compliance confirmation before publishing. |
| lo-dev-073 | Marketplace DPA Tab | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: DPA, VA |
| lo-dev-074 | DPA Rate Structures | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: DPA Category requires business/compliance confirmation before publishing. |
| lo-dev-075 | Pylon Product Restrictions | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Pylon Category requires business/compliance confirmation before publishing. |
| lo-dev-076 | Website Pricing Settings | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Pylon |
| lo-dev-077 | Pricing Engine Limitations | Category requires business/compliance confirmation before publishing. |
| lo-dev-079 | Adding New Lenders by Ticket | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: VA |
| lo-dev-080 | Reverse Mortgage Basics | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Reverse Mortgage |
| lo-dev-081 | Marketing versus Reality with Pylon | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Pylon, VA Category requires business/compliance confirmation before publishing. |
| lo-dev-082 | Manual Comp Overrides | Category requires business/compliance confirmation before publishing. |
| lo-dev-083 | Lender Selection Nuance | Category requires business/compliance confirmation before publishing. |
| lo-dev-084 | Fannie versus Freddie Rules | Category requires business/compliance confirmation before publishing. |
| lo-dev-085 | Payment Benefit versus Cash Benefit | Category requires business/compliance confirmation before publishing. |
| lo-dev-086 | Strategic Debt Payoff | Category requires business/compliance confirmation before publishing. |
| lo-dev-087 | Pylon Program Limits | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: FHA, Pylon, USDA, VA Category requires business/compliance confirmation before publishing. |
| lo-dev-089 | Refi Escrow Trap | Category requires business/compliance confirmation before publishing. |
| lo-dev-090 | Borrower Paid versus Lender Paid Optics: Explaining the Tradeoff | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Borrower Paid, Lender Paid Category requires business/compliance confirmation before publishing. |
| lo-dev-091 | Borrower Paid versus Lender Paid Optics: Client Conversation | Contains policy, compliance, product guideline, pricing, or compensation-sensitive topic: Borrower Paid, Compensation, Lender Paid Category requires business/compliance confirmation before publishing. |

Count on disk = 56 (matches build_summary.manual_review_count = 56).

## Impact / handoff

- Cutdown clip assets are **complete** — nothing blocks the 91 clips on an asset-availability basis.
- Long-form recordings are **complete** (7/7 real masters + transcripts) — re-cut/re-export is possible from source if needed.
- The real publishing blocker is **business/compliance sign-off on the 56 manual_review clips**, not missing files.
- No invented files or URLs were substituted for any asset.
