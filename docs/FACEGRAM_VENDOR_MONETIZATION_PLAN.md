# FaceGram Vendor Monetization Plan

## Status

Planning only. Do not wire payments, Stripe, billing, vendor publishing, email sends, n8n workflows, or external APIs from this document.

## Goal

Build FaceGram toward an internal vendor and wholesale partner program that lets approved partners participate in Loan Factory training and resources without exposing borrower data or allowing uncontrolled publishing.

Vendor monetization should be useful, controlled, and easy to understand:

- Free approved vendor profile and directory listing
- Paid sponsored education and promotion opportunities later
- Clear review before anything appears in FaceGram
- No self-service public publishing

## Vendor / Wholesale Partner Landing Page

Create a future landing page for approved vendor and wholesale partner participation.

Suggested route:

- `/partners/`
- or `/vendor-partners/`

The page should explain:

- Who can apply
- What free participation includes
- What paid participation may include later
- That sponsored items require review
- That participation does not grant access to borrower data
- That FaceGram is internal to Loan Factory

## Free Vendor Tier

Free vendor participation should be approval-based.

Includes:

- Vendor profile
- Partner directory listing
- Approved participation in selected internal groups
- Ability to provide resource links or training ideas for review

Does not include:

- Vendor-owned group
- Sponsored posts
- Featured right rail placement
- Sponsored training events
- Analytics
- Direct messaging to loan officers
- Access to borrower or loan data

## Paid Vendor Tier

Paid vendor participation is a future phase.

Possible features:

- Vendor-owned approved group
- Sponsored posts
- Sponsored training classes
- Live events
- Featured promotions/resources
- Right rail placement
- Future analytics

Every paid feature must be gated by admin/marketing review. Paid status does not mean a vendor can publish freely.

## Sponsored Content Types

| Type | Description | Review required |
|---|---|---|
| Sponsored post | Internal promotion or education post | Yes |
| Sponsored training class | Vendor/lender training event | Yes |
| Sponsored event | Live event, webinar, or office hours | Yes |
| Sponsored resource | Download, guide, checklist, or landing resource | Yes |
| Featured promotion | Right rail promotion | Yes |
| Vendor group post | Post inside a vendor-owned group | Yes or post-approval queue, depending on policy |

## Labels

Sponsored items must use plain labels:

- Sponsored
- Sponsored Training
- Sponsored Event
- Vendor Resource
- Approved Partner

Avoid vague labels like "Featured" when the item is paid or sponsored.

## Required Approval Flow

Before a sponsored item appears:

1. Vendor submits item.
2. System marks it as pending review.
3. Marketing/Admin reviews.
4. Reviewer approves, requests changes, rejects, or archives.
5. Approved item appears in the selected placement.
6. All review actions are logged.

No automatic publishing.

## Prohibited Vendor Behavior

Vendors must not:

- Publish directly to the feed without approval
- Send direct messages to LOs without approval
- Upload borrower data
- Request borrower data
- Make rate, APR, fee, approval, or underwriting claims without review
- Claim preferred status unless approved
- Claim TERA access or integration
- Export LO contact lists
- Trigger emails, texts, calls, or social posts from FaceGram

## Future Data Model

Planning-only entities:

- `facegram_vendor_profiles`
- `facegram_vendor_tiers`
- `facegram_vendor_group_requests`
- `facegram_sponsored_items`
- `facegram_sponsored_reviews`
- `facegram_sponsored_placements`
- `facegram_partner_directory_entries`

Do not create these tables until a migration sprint is approved.

## Payment Boundary

No payment system is authorized yet.

Do not add:

- Stripe
- Billing plans
- Checkout
- Invoices
- Webhooks
- Paid entitlement checks
- Subscription logic

For beta, represent paid vendor tier only as roadmap copy or admin-only planning notes.

## Beta Recommendation

For beta testers, show sponsored/vendor concepts only as controlled examples:

- One right rail section labeled "Approved Partner Resources"
- One event card labeled "Sponsored Training"
- No vendor posting buttons
- No vendor self-service signup
- No payment UI

Current beta UI shows the concept as "Sponsored lender/vendor placements" and
"Vendor/Lender Partner Preview." Vendor posting, payment, analytics, directory
management, and content submission remain unwired.

The beta should teach the concept without opening the publishing or billing surface.
