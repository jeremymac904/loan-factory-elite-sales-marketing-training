"use client";

import { useState } from "react";
import EventDraftBuilder from "@/components/comms/EventDraftBuilder";
import DraftList from "@/components/comms/DraftList";
import type { CommsDraft } from "@/data/coachComms";

// Training Scheduler workspace: build a calendar event draft + Meet training
// draft, save locally, review saved event drafts with next actions. No real
// events or Meet links are created (Google Calendar is not connected).

type EventType = {
  type: string;
  title: string;
  description: string;
  defaultDuration: string;
  inviteDetail: string;
};

export default function CalendarWorkspace({
  eventTypes,
}: {
  eventTypes: EventType[];
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
      <EventDraftBuilder eventTypes={eventTypes} onSaveDraft={addDraft} />
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-lf-charcoal">
            Saved event drafts {drafts.length > 0 ? `(${drafts.length})` : ""}
          </h3>
          <span className="text-xs text-lf-slate">This session only</span>
        </div>
        <DraftList drafts={drafts} onRemove={removeDraft} />
      </div>
    </div>
  );
}
