#!/usr/bin/env node
/*
 * upload-to-drive.mjs
 * Power Agent 3 — Google Drive Staging Runbook (Loan Factory LO Development Platform)
 *
 * WHAT THIS IS
 *   A GUARDED uploader for the 98 LO Development Platform videos + their thumbnails,
 *   captions, markdown notes, and planning manifests (387 file objects total) to a
 *   single restricted Google Drive folder tree.
 *
 * WHAT THIS IS NOT
 *   It does NOT upload by default. Running it with no flags performs a DRY RUN that
 *   prints exactly what WOULD be uploaded and where, then exits 0 without touching
 *   the network. A real upload requires multiple independent gates (see below).
 *
 * SAFETY GATES (ALL required for a real upload)
 *   1. --confirm                          explicit operator intent on the command line
 *   2. DRIVE_UPLOAD_ACCOUNT env var       must equal the verified Loan Factory account
 *                                         AND match --account on the command line
 *   3. LO_DEV_DRIVE_UPLOAD_APPROVED=yes   Jeremy's documented approval gate (env)
 *   Plus: the connected Google Drive account must already be VERIFIED as Jeremy's
 *   Loan Factory account. The read-only identity check for this sprint found the
 *   connected Drive account is "jeremy@mcdonald-mtg.com" — that is NOT the Loan
 *   Factory account (jeremy.mcdonald@loanfactory.com). So uploads are BLOCKED until
 *   the account is corrected. This script fails closed.
 *
 * UPLOAD POLICY (enforced here and in the runbook)
 *   - Privacy: every file is created in a RESTRICTED folder. No "anyone with link",
 *     no public links, no domain-wide sharing. Sharing is configured manually later
 *     per share-permission-plan.md.
 *   - No YouTube. No n8n. No emails. This script only writes files into Drive.
 *
 * USAGE
 *   node scripts/drive-upload/upload-to-drive.mjs                  # DRY RUN (default)
 *   node scripts/drive-upload/upload-to-drive.mjs --dry-run        # explicit dry run
 *   node scripts/drive-upload/upload-to-drive.mjs --confirm \
 *        --account "jeremy.mcdonald@loanfactory.com"               # guarded real run
 *
 * The real-run path is intentionally left as an explicit, reviewed integration point
 * (performUpload). It throws unless a Drive client is wired in, so an accidental
 * --confirm cannot silently upload.
 */

import process from "node:process";
import { existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildPlan,
  DRIVE_ROOT_FOLDER,
  DRIVE_FOLDERS,
} from "./build-drive-manifest.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..", "..");
const PROJECTS_ROOT = resolve(REPO_ROOT, ".."); // LoanFactory-Thuan/

// The account that the upload is allowed to run under. Per project memory, Jeremy
// logs into the LIVE platform as jeremy.mcdonald@loanfactory.com. The same Loan
// Factory Google account must own the Drive folder. This is the REQUIRED value;
// it is not a default that triggers anything.
const REQUIRED_ACCOUNT = "jeremy.mcdonald@loanfactory.com";

// What the read-only Drive identity check actually returned during this sprint.
// Surfaced so a real run is impossible until the account is corrected.
const OBSERVED_CONNECTED_ACCOUNT = "jeremy@mcdonald-mtg.com";

function parseArgs(argv) {
  const args = { confirm: false, dryRun: false, account: "" };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--confirm") args.confirm = true;
    else if (a === "--dry-run") args.dryRun = true;
    else if (a === "--account") args.account = argv[++i] || "";
    else if (a.startsWith("--account=")) args.account = a.slice("--account=".length);
  }
  return args;
}

function header(title) {
  console.log("\n" + "=".repeat(72));
  console.log(title);
  console.log("=".repeat(72));
}

function localCheck(entry) {
  // Source files live under LoanFactory-Thuan/<sourceRelPath>. In this staging
  // environment they may be 0-byte stubs; we report presence + size so the
  // operator can confirm the REAL media is mounted before a real run.
  const abs = resolve(PROJECTS_ROOT, entry.sourceRelPath);
  if (!existsSync(abs)) return { exists: false, bytes: 0, abs };
  let bytes = 0;
  try {
    bytes = statSync(abs).size;
  } catch {
    bytes = 0;
  }
  return { exists: true, bytes, abs };
}

function fmtBytes(n) {
  if (n <= 0) return "0 B";
  const u = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < u.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(1)} ${u[i]}`;
}

function printPlan(plan) {
  header(`PLANNED DRIVE TREE: "${DRIVE_ROOT_FOLDER}"`);
  for (const key of Object.keys(DRIVE_FOLDERS)) {
    const folder = DRIVE_FOLDERS[key];
    const count = plan.entries.filter((e) => e.driveFolder === folder).length;
    console.log(`  - ${folder}  (${count} files)`);
  }

  header("FILE LIST (what WOULD be uploaded)");
  let present = 0;
  let missing = 0;
  let stub = 0;
  let totalBytes = 0;
  for (const e of plan.entries) {
    const chk = localCheck(e);
    if (!chk.exists) missing++;
    else if (chk.bytes === 0) stub++;
    else present++;
    totalBytes += chk.bytes;
    const flag = !chk.exists ? "MISSING" : chk.bytes === 0 ? "0-BYTE STUB" : fmtBytes(chk.bytes);
    console.log(`  [${e.driveFolder}] ${e.localFileName}  <-  ${e.sourceRelPath}  (${flag})`);
  }

  header("SUMMARY");
  console.log(JSON.stringify(plan.counts, null, 2));
  console.log(`  local present (with bytes): ${present}`);
  console.log(`  local 0-byte stubs:         ${stub}`);
  console.log(`  local MISSING:              ${missing}`);
  console.log(`  measured local total:       ${fmtBytes(totalBytes)}`);
  console.log("  NOTE: documented full-media payload is ~7.7 GB and MUST be re-measured");
  console.log("        against the real media before any real upload.");
}

// Real upload integration point. Intentionally unwired: it throws so that an
// accidental --confirm cannot upload. Wiring this requires an authenticated Drive
// client for the verified Loan Factory account and is gated by the runbook.
async function performUpload(/* plan */) {
  throw new Error(
    "performUpload() is intentionally not wired. A real upload must be enabled " +
      "explicitly after: (1) Jeremy confirms the connected Google account is the Loan " +
      "Factory account (the sprint check found " +
      OBSERVED_CONNECTED_ACCOUNT +
      ", which is NOT it), (2) the ~7.7 GB real media is mounted (not 0-byte stubs), " +
      "and (3) a reviewer wires an authenticated Drive client here. See " +
      "docs/video-library/google-drive/upload-runbook.md."
  );
}

async function main() {
  const args = parseArgs(process.argv);
  const plan = buildPlan();

  header("Loan Factory LO Development Platform — Google Drive uploader (GUARDED)");
  console.log("Mode requested:", args.confirm ? "REAL UPLOAD (--confirm)" : "DRY RUN (default)");
  console.log("Required account:", REQUIRED_ACCOUNT);
  console.log("Observed connected account (sprint check):", OBSERVED_CONNECTED_ACCOUNT);

  // Always show the plan first.
  printPlan(plan);

  if (!args.confirm || args.dryRun) {
    header("DRY RUN COMPLETE — nothing was uploaded");
    console.log("To attempt a real upload you must pass --confirm AND satisfy all gates.");
    process.exit(0);
  }

  // --- Gate checks for a real run (fail closed) ---
  const errors = [];
  const envAccount = process.env.DRIVE_UPLOAD_ACCOUNT || "";
  const approved = (process.env.LO_DEV_DRIVE_UPLOAD_APPROVED || "").toLowerCase();

  if (envAccount !== REQUIRED_ACCOUNT) {
    errors.push(
      `DRIVE_UPLOAD_ACCOUNT must equal "${REQUIRED_ACCOUNT}" (got "${envAccount || "<unset>"}").`
    );
  }
  if (args.account !== REQUIRED_ACCOUNT) {
    errors.push(`--account must equal "${REQUIRED_ACCOUNT}" (got "${args.account || "<unset>"}").`);
  }
  if (approved !== "yes") {
    errors.push('LO_DEV_DRIVE_UPLOAD_APPROVED must equal "yes" (Jeremy\'s documented approval gate).');
  }

  if (errors.length) {
    header("REFUSING TO UPLOAD — safety gates not satisfied");
    for (const e of errors) console.log("  x " + e);
    console.log("\nNo files were uploaded. Resolve every gate above, then re-run. See the runbook.");
    process.exit(2);
  }

  header("ALL CLI/ENV GATES PASSED — handing off to performUpload()");
  console.log("performUpload() is deliberately unwired and will throw. This prevents accidental upload.");
  await performUpload(plan); // throws by design
}

main().catch((err) => {
  console.error("\nFATAL (no upload performed):", err.message);
  process.exit(1);
});
