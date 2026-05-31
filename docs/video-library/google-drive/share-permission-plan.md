# Share & Permission Plan — LO Development Platform Drive Library

> **Status:** PLAN ONLY. No sharing has been configured (nothing is uploaded yet).
> Default posture is **Restricted**. Public/link-wide sharing is explicitly
> forbidden for this library.

This plan governs who can access the Google Drive folder tree from
`drive-folder-plan.md` once it exists. It is intentionally conservative: the LO
Development Platform training media is internal product content and must not be
publicly discoverable.

---

## Default posture: RESTRICTED

- The root folder **Loan Factory LO Development Platform Videos** and every
  subfolder are created **Restricted** ("Only people with access can open").
- **No "Anyone with the link"** sharing — not for the root, not for any subfolder,
  not for any individual file.
- **No public publishing** and **no "Published to web."**
- **No domain-wide** ("anyone at the organization") sharing unless Jeremy explicitly
  approves it in writing for a named domain.

---

## Owning account (must be fixed before any sharing)

- The owning account must be the **Loan Factory** Google account
  (`jeremy.mcdonald@loanfactory.com`).
- The read-only identity check for this sprint found the connected Drive account is
  **`jeremy@mcdonald-mtg.com`** (personal). Sharing/ownership must not be configured
  under the personal account unless Jeremy explicitly decides otherwise. Correct the
  account first (see `upload-runbook.md` Step 1).

---

## Who gets access (least privilege)

| Principal | Folder scope | Role | Notes |
| --------- | ------------ | ---- | ----- |
| Jeremy McDonald (Loan Factory account) | Root (owner) | Owner | Owns the tree; verified account only |
| Named LO Development reviewers (added individually by email) | Root | Viewer / Commenter | Added one email at a time, no link sharing |
| Editors who fill Drive IDs back into the manifest | Root | Editor | Only if they must upload/replace files |
| Public / "anyone with link" | — | — | Never |

- Grant access **per person, per email** — never via a shareable link.
- Prefer **Viewer**; grant **Editor** only to whoever runs uploads or backfills
  `drive_file_url` into `local-to-drive-mapping.csv`.

---

## Link handling (important)

- Files **may** have a `webViewLink` captured into `local-to-drive-mapping.csv` for
  record-keeping. A captured link is **not** the same as public access — with
  Restricted sharing the link only works for people who were individually granted
  access.
- These Drive links are an **internal staging record**, not the public delivery
  mechanism. Public delivery for learners goes through the platform's YouTube
  (unlisted) embeds later — handled by a different agent/sprint, and only after
  Jeremy approves YouTube.

---

## Relationship to hosting status (cross-agent)

- While files are Restricted in Drive and not embedded, clips remain
  `hostingStatus: "google_drive_ready"` in `src/data/loDevelopmentVideoLibrary.ts`
  (PA2). They only become `"google_drive_live"` once a **real** `googleDriveUrl`
  exists for them.
- A Restricted Drive file is **not** a public video URL. Do not point public player
  embeds at Drive links; that is reserved for unlisted YouTube embeds in a later
  step.

---

## Verification checklist (run after any sharing change)

1. Root folder sharing = **Restricted** (no "anyone with link").
2. No subfolder or file has been individually set to public or link-wide.
3. The connected/owning account is the **Loan Factory** account, not the personal
   `mcdonald-mtg.com` account.
4. The access list contains only named, approved people.
5. No file is "Published to web."

Any deviation is a STOP condition — revert to Restricted and re-confirm with Jeremy.
