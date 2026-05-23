# FaceGram Sponsored Content Review Flow

## Status

Planning only. This document defines the intended review flow for sponsored lender/vendor content in FaceGram. It does not authorize vendor publishing, payment wiring, emails, webhooks, n8n, or database migrations.

## Review Principle

Sponsored content can be useful, but it must never feel like uncontrolled advertising inside the LO platform.

Every sponsored item must be:

- Clearly labeled
- Internally approved
- Safe for loan officers to view
- Free of borrower data
- Free of unreviewed rate, fee, APR, approval, or underwriting claims

## Sponsored Placements

Potential placements:

- Right rail promotion
- Upcoming sponsored training class
- Vendor resource card
- Featured partner event
- Vendor group post
- Partner directory entry

No sponsored content should appear until it has been approved.

## Status Flow

```
Draft
  -> Submitted for Review
  -> Needs Changes
  -> Approved for Internal Display
  -> Scheduled
  -> Live Internally
  -> Archived
```

Rejected content should move to `Rejected` or `Archived` with a reviewer note.

## Required Review Checks

Marketing/Admin should check:

- Is the sponsor clearly identified?
- Is the item clearly labeled Sponsored?
- Does it avoid borrower data?
- Does it avoid specific rate, fee, APR, approval, or underwriting claims?
- Does it avoid implying preferred status unless approved?
- Does it avoid implying TERA integration or TERA data access?
- Is the copy plain English?
- Is the call to action internal and safe?
- Is the placement appropriate for FaceGram?

## Reviewer Outcomes

| Outcome | Meaning |
|---|---|
| Approve | Item can appear internally in the selected placement |
| Request changes | Vendor/admin must edit and resubmit |
| Reject | Item should not appear |
| Archive | Item is retained for history but not active |
| Escalate | Jeremy/Admin or Marketing leadership must decide |

All outcomes should create a moderation/review note.

## Right Rail Rules

Right rail sponsored items should be sparse and useful.

Recommended order:

1. Upcoming sponsored training classes
2. Approved vendor resources
3. Featured partner events
4. Sponsored lender/vendor promotions
5. Trending internal posts

Avoid showing more than two sponsored items at once in the beta UI.

## Plain-English Labels

Use these labels:

- Sponsored
- Sponsored Training
- Sponsored Event
- Vendor Resource
- Approved Partner

Do not hide sponsored content behind vague labels like "Featured" or "Recommended."

## Prohibited Content

Sponsored items must not include:

- Borrower names, loan numbers, addresses, income, credit, or other PII
- Guaranteed approval language
- Unreviewed APR, rate, payment, or fee claims
- "Lowest rate" or "best rate" claims
- Underwriting decision language
- Claims that a vendor can access TERA
- Claims that Loan Factory has an open API
- Instructions to send borrower files outside approved systems
- External publishing promises

## Beta Recommendation

In beta, show the concept but keep it locked down:

- Display a simple right rail section called "Approved Partner Resources"
- Label sample items as Sponsored only if they represent a paid placement concept
- Disable vendor submission buttons
- Avoid payment language beyond roadmap docs
- Do not show fake vendor messaging or fake analytics

## Future Data Model

Planning-only fields for `facegram_sponsored_items`:

| Field | Purpose |
|---|---|
| `id` | Primary key |
| `vendor_profile_id` | Sponsor/vendor owner |
| `submitted_by` | User who submitted |
| `placement_type` | right_rail, event, resource, group_post, directory |
| `title` | Display title |
| `body` | Main copy |
| `cta_label` | Optional internal CTA |
| `cta_url` | Optional approved link |
| `sponsored_label` | Required label |
| `status` | Draft, Submitted, Needs Changes, Approved, Scheduled, Live, Archived |
| `reviewed_by` | Reviewer |
| `reviewed_at` | Review timestamp |
| `starts_at` | Optional schedule start |
| `ends_at` | Optional schedule end |
| `created_at` | Created timestamp |

Do not implement until explicitly approved.
