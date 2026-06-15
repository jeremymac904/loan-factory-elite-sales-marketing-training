import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import CoachingEventManager from "@/components/coach/CoachingEventManager";
import CalendarWorkspace from "@/components/comms/CalendarWorkspace";
import ConnectionStatusBadge from "@/components/comms/ConnectionStatusBadge";
import { calendarEventTypes } from "@/data/coachCommandCenter";
import { WORKSPACE_CONNECTED, workspaceServiceMeta } from "@/data/coachComms";

export const dynamic = "force-dynamic";
export const metadata = { title: "Coaching Calendar · Coach Command Center" };

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
            Coaching Calendar
          </h1>
          <p className="mt-2 max-w-2xl text-base text-white/85">
            Plan group coaching calls, team coaching, and Power Hours. Create the
            meeting in Google Meet or Zoom, paste the link, and publish it to the
            program&apos;s platform calendar — members get a Join button. No
            mailbox or email account required.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Viewing as: {access.viewingAsLabel}
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
            {workspaceServiceMeta.calendar.connectHint} Automatic two-way Google
            Calendar sync is not connected yet — but you don&apos;t need it: use
            the publisher below to post a coaching event with your own Meet or
            Zoom link, and it appears on the program&apos;s platform calendar for
            members right away.
          </p>
        </div>
      </section>

      <section className="container-page pb-8">
        <div className="mb-3">
          <h2 className="h-display text-xl">Publish a coaching event</h2>
          <p className="text-sm text-lf-slate">
            Create the meeting in Google Meet or Zoom, paste the link, and it appears on the
            program&apos;s platform calendar with a Join button. Members see it immediately — no
            mailbox or email account required.
          </p>
        </div>
        <CoachingEventManager />
      </section>

      <section className="container-page pb-8">
        <details className="card">
          <summary className="cursor-pointer text-base font-semibold text-lf-charcoal">
            Optional: build an invite text draft to copy
          </summary>
          <div className="mt-4">
            <CalendarWorkspace eventTypes={calendarEventTypes} />
          </div>
        </details>
      </section>

      <section className="container-page pb-12">
        <details className="card">
          <summary className="cursor-pointer text-base font-semibold text-lf-charcoal">
            Browse all coaching event types
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
