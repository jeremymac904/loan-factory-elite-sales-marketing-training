"use client";

import { useState } from "react";
import DraftComposer from "@/components/comms/DraftComposer";
import DraftList from "@/components/comms/DraftList";
import type { CommsDraft } from "@/data/coachComms";

// Email Center workspace: honest draft-only composer + saved-draft list.
// Never sends. Gmail "create draft" is not wired this sprint — see the
// ConnectionStatusBadge rendered above this on the page.

type EmailTemplate = { title: string; subject: string; body: string };

export default function EmailWorkspace({
  templates,
  coachName,
}: {
  templates: EmailTemplate[];
  coachName?: string;
}) {
  const [drafts, setDrafts] = useState<CommsDraft[]>([]);

  function addDraft(draft: CommsDraft) {
    setDrafts((prev) => [draft, ...prev]);
  }
  function removeDraft(id: string) {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DraftComposer
        kind="email"
        templates={templates}
        coachName={coachName}
        onSaveDraft={addDraft}
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-lf-charcoal">
            Saved email drafts {drafts.length > 0 ? `(${drafts.length})` : ""}
          </h3>
          <span className="text-xs text-lf-slate">This session only</span>
        </div>
        <DraftList drafts={drafts} onRemove={removeDraft} />
      </div>
    </div>
  );
}
