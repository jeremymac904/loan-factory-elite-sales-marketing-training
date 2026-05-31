import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import CalendarWorkspace from "@/components/comms/CalendarWorkspace";
import ConnectionStatusBadge from "@/components/comms/ConnectionStatusBadge";
import { calendarEventTypes } from "@/data/coachCommandCenter";
import { WORKSPACE_CONNECTED, workspaceServiceMeta } from "@/data/coachComms";

export const dynamic = "force-dynamic";
export const metadata = { title: "Training Scheduler · Coach Command Center" };

export default async function CoachCalendarPage() {
  const access = await getCoachAccess();
  const calendarConnected = WORKSPACE_CONNECTED.calendar;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-10">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Coach Command Center
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Training Scheduler
          </h1>
          <p className="mt-2 max-w-2xl text-base text-white/85">
            Plan one-on-ones, group calls, team training, and Power Hours. Build
            a Google Calendar event draft and a Google Meet training draft, then
            create the event yourself — nothing is added to any calendar here.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              View-As preview: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/calendar/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-8">
        <div className="card border-lf-orange/40 bg-lf-orangeSoft/40">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-lf-charcoal">
              Google Calendar status
            </h2>
            <ConnectionStatusBadge
              service="calendar"
              connected={calendarConnected}
            />
          </div>
          <p className="prose-lf mt-2 text-sm">
            {workspaceServiceMeta.calendar.connectHint} Use the builder below to
            assemble the event details and a Google Meet training draft, copy
            them, and create the real event yourself in Google Calendar. When the
            integration is connected later, event creation must stay behind an
            approval step.
          </p>
        </div>
      </section>

      <section className="container-page pb-8">
        <CalendarWorkspace eventTypes={calendarEventTypes} />
      </section>

      <section className="container-page pb-12">
        <details className="card">
          <summary className="cursor-pointer text-base font-semibold text-lf-charcoal">
            Browse all training event types
          </summary>
          <p className="prose-lf mt-2 text-sm">
            The same event types power the builder above. Pick one there to fill
            in a date, time, and attendees and generate a draft.
          </p>
          <ul className="mt-4 divide-y divide-lf-line">
            {calendarEventTypes.map((event) => (
              <li
                key={event.type}
                className="flex flex-wrap items-start justify-between gap-2 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-lf-charcoal">
                    {event.title}
                  </p>
                  <p className="mt-1 text-sm text-lf-slate">
                    {event.description}
                  </p>
                  <p className="mt-1 text-sm text-lf-charcoal">
                    {event.inviteDetail}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-slate">
                  {event.defaultDuration}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </section>
    </>
  );
}
