"use client";

import RowTracker, { type TrackerColumn, type TrackerRow } from "./RowTracker";
import type { ProgramKey } from "@/data/coachingPlatform";

const partnerColumns: TrackerColumn[] = [
  { key: "name", label: "Name", kind: "text", minWidth: "11rem" },
  { key: "type", label: "Partner type", kind: "select", options: ["Realtor", "CPA", "Builder", "Attorney", "Financial Planner", "Other"], minWidth: "10rem" },
  { key: "tier", label: "Tier", kind: "select", options: ["A", "B", "C"], minWidth: "5rem" },
  { key: "phone", label: "Phone", kind: "text", minWidth: "9rem" },
  { key: "email", label: "Email", kind: "text", minWidth: "12rem" },
  { key: "lastContact", label: "Last contact", kind: "date", minWidth: "9rem" },
  { key: "nextAction", label: "Next action", kind: "text", minWidth: "12rem" },
  { key: "notes", label: "Notes", kind: "long", minWidth: "13rem" },
  { key: "contactLog", label: "Contact log", kind: "long", minWidth: "13rem" },
  { key: "deals", label: "Related deals / borrowers", kind: "long", minWidth: "13rem" },
];

function summarizePartners(rows: TrackerRow[]): string {
  const cutoff = Date.now() - 14 * 24 * 3600 * 1000;
  const needsTouch = rows.filter(
    (r) => !r.lastContact || new Date(r.lastContact).getTime() < cutoff,
  );
  const recentNotes = rows
    .filter((r) => (r.contactLog ?? "").trim())
    .slice(-3)
    .map((r) => `  - ${r.name}: ${r.contactLog.slice(0, 80)}`);
  const nextActions = rows
    .filter((r) => (r.nextAction ?? "").trim())
    .map((r) => `  - ${r.name}: ${r.nextAction}`);
  return [
    "Realtor Relationship Tracker snapshot",
    `Total partners: ${rows.length}`,
    `A-tier partners: ${rows.filter((r) => r.tier === "A").length}`,
    `Needs touch (no contact in 14 days): ${needsTouch.length}`,
    recentNotes.length ? "Recent contact notes:\n" + recentNotes.join("\n") : "Recent contact notes: none",
    nextActions.length ? "Next actions:\n" + nextActions.join("\n") : "Next actions: none",
  ].join("\n");
}

const dealColumns: TrackerColumn[] = [
  { key: "borrower", label: "Borrower / client", kind: "text", minWidth: "11rem" },
  { key: "partner", label: "Realtor / referral partner", kind: "text", minWidth: "11rem" },
  { key: "lender", label: "Lender", kind: "text", minWidth: "9rem" },
  { key: "loanType", label: "Loan type", kind: "text", minWidth: "8rem" },
  { key: "status", label: "Status", kind: "select", options: ["Lead", "Application started", "Pre approved", "Under contract", "Refi disclosed", "Submitted to lender", "Conditional approval", "Clear to close", "Closed", "On hold", "Lost"], minWidth: "11rem" },
  { key: "closeDate", label: "Contract close date", kind: "date", minWidth: "9rem" },
  { key: "nextAction", label: "Next action", kind: "text", minWidth: "12rem" },
  { key: "notes", label: "Notes", kind: "long", minWidth: "13rem" },
];

function summarizeDeals(rows: TrackerRow[]): string {
  const byStatus: Record<string, number> = {};
  rows.forEach((r) => {
    const key = r.status || "No status";
    byStatus[key] = (byStatus[key] ?? 0) + 1;
  });
  const nextActions = rows
    .filter((r) => (r.nextAction ?? "").trim())
    .map((r) => `  - ${r.borrower}: ${r.nextAction}`);
  return [
    "Deal Flow Tracker snapshot",
    `Total deals: ${rows.length}`,
    ...Object.entries(byStatus).map(([k, v]) => `${k}: ${v}`),
    nextActions.length ? "Next actions:\n" + nextActions.join("\n") : "Next actions: none",
  ].join("\n");
}

/** The two live member tools — lightweight lists, not a CRM. */
export default function MemberTools({ program }: { program: ProgramKey }) {
  return (
    <>
      <RowTracker
        title="Realtor Relationship Tracker"
        subtitle="A lightweight partner list to keep open next to your LOS — not a CRM."
        storageKey={`lf-partners-${program}`}
        csvName="realtor-relationship-tracker.csv"
        addLabel="Add partner"
        columns={partnerColumns}
        summarize={summarizePartners}
      />
      <RowTracker
        title="Deal Flow Tracker"
        subtitle="Every active file with its status and next action — simple, not a CRM."
        storageKey={`lf-deals-${program}`}
        csvName="deal-flow-tracker.csv"
        addLabel="Add deal"
        columns={dealColumns}
        summarize={summarizeDeals}
      />
    </>
  );
}
