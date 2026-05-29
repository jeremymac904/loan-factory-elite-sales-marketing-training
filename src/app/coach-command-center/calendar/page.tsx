import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import CopyDraftButton from "@/components/coach/CopyDraftButton";
import { calendarEventTypes } from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Training Scheduler · Coach Command Center" };

export default async function CoachCalendarPage() {
  const access = await getCoachAccess();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-12">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Coach Command Center
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Training Scheduler
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Plan one-on-ones, group calls, team training, and Power Hours — copy
            the invite details and create the event in your own Google Calendar.
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

      <section className="container-page py-10">
        <div className="card border-lf-orange/40 bg-lf-orangeSoft/40">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
            Connect Google Calendar to create events.
          </p>
          <h2 className="h-display mt-1 text-2xl">
            No events are created here yet.
          </h2>
          <p className="prose-lf mt-2 text-sm">
            This scheduler does not create any real calendar events. Connect
            Google Calendar, then create the event yourself — nothing is added to
            anyone&apos;s calendar until the integration is connected and you
            click create. For now, copy the invite details below and paste them
            into a new event.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/settings/google/" className="btn-primary">
              Connect Google Calendar
            </Link>
            <Link href="/ai-assistants/connections/" className="btn-secondary">
              Manage connections
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calendarEventTypes.map((event) => (
            <div key={event.type} className="card flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-lf-charcoal">
                  {event.title}
                </h3>
                <span className="shrink-0 rounded-full bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-slate">
                  {event.defaultDuration}
                </span>
              </div>
              <p className="text-sm text-lf-slate">{event.description}</p>
              <div className="mt-2 rounded-lg border border-lf-line bg-lf-mist/40 px-3 py-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                  Invite details
                </p>
                <p className="mt-1 text-sm text-lf-charcoal">
                  {event.inviteDetail}
                </p>
              </div>
              <div className="mt-auto pt-3">
                <CopyDraftButton
                  text={event.inviteDetail}
                  copyLabel="Copy invite details"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
