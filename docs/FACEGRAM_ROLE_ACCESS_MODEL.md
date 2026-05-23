# FaceGram Role Access Model

## Status

Planning source of truth for FaceGram roles. This updates the older Creator Network access model. It does not authorize RLS changes or migrations by itself.

## Baseline Rules

- FaceGram is internal to Loan Factory.
- All access requires Supabase authentication and an approved profile.
- Group creation is restricted in beta.
- Sponsored and vendor content requires approval.
- Vendor access is future-only unless explicitly approved.
- No anonymous or public access.

## Roles

| Role | Summary |
|---|---|
| Admin | Full platform and moderation control |
| LO Development | Official groups, training groups, featured posts, moderation support |
| Marketing/Admin | Marketing/resource groups, sponsored review, compliance-sensitive moderation |
| Corporate Coach | Coaching groups, coaching posts, training events, moderation notes |
| Team Leader | Team-scoped groups and team posts |
| Loan Officer | Read, post, comment, react, save, join approved groups |
| Approved Vendor | Future restricted vendor profile and approved participation |
| Paid Vendor | Future paid vendor-owned group and sponsored content, still approval-gated |

## Capability Matrix

| Capability | Admin | LO Dev | Marketing/Admin | Coach | Team Leader | LO | Approved Vendor | Paid Vendor |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Browse feed | Yes | Yes | Yes | Yes | Yes | Yes | Limited future | Limited future |
| Create text/image/video posts | Yes | Yes | Yes | Yes | Yes | Yes | Review only | Review only |
| Create stories/reels | Yes | Yes | Yes | Yes | Yes | Yes | No beta | Review only future |
| Comment/react/save | Yes | Yes | Yes | Yes | Yes | Yes | Limited future | Limited future |
| Create official groups | Yes | Yes | Marketing groups only | Coaching groups only | No | No | No | No |
| Create team groups | Yes | By approval | No | No | Yes, by approval | No | No | No |
| Create vendor groups | Yes | No | Review | No | No | No | No | Future paid only |
| Create sponsored posts | Yes | No | Review/admin | No | No | No | No | Future review only |
| Approve sponsored posts | Yes | No | Yes | No | No | No | No | No |
| Moderate posts | Yes | Support | Yes | Notes/support | Team scope flag | Own posts only | No | Own submitted content only |
| Access review queue | Yes | Support/read if approved | Yes | Notes/read if approved | Team flag status | No | No | Own submissions only future |
| Manage vendor profiles | Yes | No | Yes | No | No | No | No | Own profile future |

## Beta Group Creation Rule

Beta group creation should be limited to:

- Admin
- LO Development
- Marketing/Admin
- Corporate Coach
- Approved Team Leaders

Do not allow every LO to create groups during beta.

## Loan Officer Beta Permissions

Loan officers should be able to:

- View internal posts
- View groups
- Join allowed groups if membership is implemented
- Create basic internal posts after auth is stable
- Comment
- React
- Save
- Report or flag a post

The current beta preview supports local/demo text posts, comments, reactions,
and saves. These actions are for UI review only until Supabase persistence and
RLS policies are approved.

Loan officers should not be able to:

- Create groups
- Create sponsored posts
- Publish externally
- Invite vendors
- Message vendors directly
- View vendor analytics
- Access moderation queues

## Team Leader Permissions

Team Leaders should eventually be able to:

- Create team groups by approval
- Manage team group membership
- Pin team resources
- Create team training events
- Feature team posts
- Flag team content for review

They should not be able to approve sponsored content or publish vendor promotions.

## Marketing/Admin Permissions

Marketing/Admin should own:

- Sponsored content review
- Marketing/resource groups
- Resource approval
- Compliance-sensitive moderation
- Right rail sponsored placements
- Vendor profile review

Marketing/Admin approval does not mean external publication. It only controls internal FaceGram visibility.

## Vendor Permissions

Vendor permissions are future-only.

Approved vendors may eventually:

- Maintain a vendor profile
- Appear in the partner directory
- Participate in approved groups
- Submit resources or events for review

Paid vendors may eventually:

- Request a vendor-owned group
- Submit sponsored posts
- Submit sponsored training classes
- Submit featured resources
- View future analytics

Vendors must never:

- Publish freely
- Access borrower data
- Send email from FaceGram
- Direct-message LOs without approved rules
- Make unreviewed rate, fee, APR, approval, or underwriting claims

## RLS Direction

Future RLS should enforce:

- Authenticated approved users only
- Own-profile updates only
- Own-post edits unless moderator/admin
- Group creation by role
- Sponsored content read only after approval
- Sponsored content write by approved vendor/admin roles only
- Review queues limited to Admin and Marketing/Admin
- Vendor records scoped to the vendor owner and reviewers

Do not implement these policies until the migration sprint is explicitly approved.
