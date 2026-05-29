import Link from "next/link";

export const metadata = { title: "AI Twin Tasks" };

const taskTemplates = [
  {
    title: "Daily Power Hour reminder",
    description: "9:00am M-F — focus block for prospecting, follow-up, and coaching prep.",
    cadence: "Daily",
  },
  {
    title: "Weekly coaching nudge",
    description: "Monday 8:00am — review last week, set this week's commitments.",
    cadence: "Weekly",
  },
  {
    title: "Bi-weekly mastermind prep",
    description: "Two days before mastermind — pull recent wins, blockers, and asks.",
    cadence: "Bi-weekly",
  },
  {
    title: "First-call follow-up prompt",
    description: "1 hour after a first call — generate a follow-up draft.",
    cadence: "Triggered",
  },
  {
    title: "Realtor partner reach-out",
    description: "Pick 5 priority Realtors weekly and draft a touch.",
    cadence: "Weekly",
  },
  {
    title: "Coaching member check-in",
    description: "Weekly draft to coached LO with their last commitments.",
    cadence: "Weekly",
  },
];

export default function AiTwinTasksPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-12">
          <div className="flex items-center gap-3">
            <Link href="/ai-assistants/" className="text-sm font-semibold text-white/70 hover:text-white">
              AI Assistants
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">Tasks</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Scheduled Tasks
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Recurring AI Twin reminders for coaching, follow-up, and daily
            rhythm. Tasks generate drafts — you decide whether to send.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-3">
          {taskTemplates.map((task) => (
            <div key={task.title} className="card flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-lf-charcoal">
                  {task.title}
                </h2>
                <p className="mt-1 text-sm text-lf-slate">{task.description}</p>
                <span className="mt-2 inline-block rounded-full bg-lf-mist px-2 py-0.5 text-xs font-semibold text-lf-charcoal">
                  {task.cadence}
                </span>
              </div>
              <Link
                href="/settings/google/"
                className="btn-secondary text-sm"
                title="Task scheduling activates once your Google Calendar connection is approved."
              >
                Connect Calendar
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-lf-line bg-lf-mist p-5 text-sm text-lf-slate">
          <p className="font-semibold text-lf-charcoal">How tasks work</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Tasks are stored in the <code>scheduled_tasks</code> Supabase table.</li>
            <li>The AI Twin generates drafts at the scheduled time.</li>
            <li>Drafts always require your review before sending.</li>
            <li>Send-enabled tasks need explicit Gmail scope approval.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
