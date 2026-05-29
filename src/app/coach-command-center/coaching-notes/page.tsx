import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import {
  peopleForScope,
  statusMeta,
  coachAiPrompts,
  type AssignedPerson,
} from "@/data/coachCommandCenter";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import CopyDraftButton from "@/components/coach/CopyDraftButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Coaching Notes · Coach Command Center" };

// The structured sections a coach fills in for each person. These save to the
// coaching_notes table once the coaching tables are connected; until then this
// renders the working template a coach uses inside a 1:1 or a review.
const noteSections: { key: string; label: string; hint: string }[] = [
  {
    key: "coaching_notes",
    label: "Coaching notes",
    hint: "What you covered this session — themes, observations, what's working.",
  },
  {
    key: "stuck_points",
    label: "Stuck points",
    hint: "Where this person is blocked or avoiding. The thing to coach next.",
  },
  {
    key: "wins",
    label: "Wins",
    hint: "Progress and momentum worth recognizing — stack the wins.",
  },
  {
    key: "next_action",
    label: "Next action",
    hint: "The single highest-leverage commitment for this person.",
  },
  {
    key: "follow_up_date",
    label: "Follow-up date",
    hint: "When you'll check back in on the committed next step.",
  },
  {
    key: "assigned_training",
    label: "Assigned training",
    hint: "Lessons or paths assigned from the Training Plan (101 → 601, AI Advantage).",
  },
  {
    key: "assigned_clips",
    label: "Assigned clips",
    hint: "Clips from the LO Development clip library to watch before next call.",
  },
  {
    key: "assigned_scripts",
    label: "Assigned scripts / prompts",
    hint: "Scripts and AI prompts assigned for practice and reps.",
  },
  {
    key: "scorecard_history",
    label: "Scorecard history",
    hint: "Trend across recent weekly execution scorecards — direction over numbers.",
  },
  {
    key: "private_coach_notes",
    label: "Private coach notes",
    hint: "Coach-only context. Coaching status, never compliance language.",
  },
];

function NoteCard({ person }: { person: AssignedPerson }) {
  return (
    <article className="card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-lf-charcoal">
            {person.name}
          </h3>
          <p className="mt-0.5 text-sm text-lf-slate">
            {person.program} · Coach: {person.coach}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusMeta[person.status].class}`}
        >
          {statusMeta[person.status].label}
        </span>
      </div>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {noteSections.map((section) => (
          <div
            key={section.key}
            className="rounded-lg border border-lf-line bg-lf-mist/40 px-4 py-3"
          >
            <dt className="text-sm font-semibold text-lf-charcoal">
              {section.label}
            </dt>
            <dd className="mt-1 text-xs text-lf-slate">{section.hint}</dd>
            <dd className="mt-2 text-sm text-lf-slate">—</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs text-lf-slate">
        These fields save to{" "}
        <span className="font-mono text-lf-charcoal">coaching_notes</span> once
        the coaching tables are connected. Today this is your working template
        for {person.name.replace(/^Sample LO — /, "")}.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={`/coach-command-center/scorecards/?person=${person.id}`}
          className="btn-secondary text-sm"
        >
          View scorecards
        </Link>
        <Link
          href={`/coach-command-center/training-plan/?person=${person.id}`}
          className="btn-secondary text-sm"
        >
          Assign training
        </Link>
        <Link
          href={`/coach-command-center/messages/?person=${person.id}`}
          className="btn-secondary text-sm"
        >
          Send a nudge
        </Link>
      </div>
    </article>
  );
}

export default async function CoachingNotesPage() {
  const access = await getCoachAccess();
  const people = peopleForScope(access.scope);
  // Show a sample subset when many people are assigned; the rest follow the
  // same template and are reachable from My People.
  const visiblePeople = people.slice(0, 6);
  const remaining = people.length - visiblePeople.length;

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
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
            Coaching Notes
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            One structured place to capture wins, stuck points, next actions,
            and what you&apos;ve assigned — for every person you coach.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              View-As preview: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/coaching-notes/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-10">
        <div className="card border-lf-orange/40 bg-lf-orangeSoft/30">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
                AI coaching assistant
              </p>
              <h2 className="h-display mt-1 text-2xl">
                Prompts to prep, summarize, and draft
              </h2>
              <p className="prose-lf mt-2 max-w-2xl text-sm">
                Copy any prompt and paste it into the{" "}
                <Link
                  href="/ai-assistants/"
                  className="font-semibold text-lf-orange hover:underline"
                >
                  AI Assistant
                </Link>
                . Once an AI provider is connected, these prompts run there
                directly against this person&apos;s coaching context.
              </p>
            </div>
            <Link href="/ai-assistants/" className="btn-secondary text-sm">
              Open AI Assistant
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {coachAiPrompts.map((p) => (
              <div
                key={p.title}
                className="flex flex-col gap-3 rounded-lg border border-lf-line bg-white px-4 py-3"
              >
                <div>
                  <h3 className="text-sm font-semibold text-lf-charcoal">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-lf-slate">{p.prompt}</p>
                </div>
                <div className="mt-auto">
                  <CopyDraftButton text={p.prompt} copyLabel="Copy prompt" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="h-display text-2xl">Notes by person</h2>
            <p className="prose-lf mt-1 text-sm">
              Manual tracking for now. Automation can be connected later. Each
              card is the template a coach fills in during a 1:1 or review.
            </p>
          </div>
          <Link href="/coach-command-center/team/" className="btn-secondary text-sm">
            View all my people
          </Link>
        </div>

        {visiblePeople.length === 0 ? (
          <div className="card mt-5">
            <p className="prose-lf text-sm">
              No people are assigned to your current view yet. Assignments show
              up here once they&apos;re set on{" "}
              <Link
                href="/coach-command-center/team/"
                className="font-semibold text-lf-orange hover:underline"
              >
                My People
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="mt-5 grid gap-6">
            {visiblePeople.map((person) => (
              <NoteCard key={person.id} person={person} />
            ))}
          </div>
        )}

        {remaining > 0 && (
          <p className="prose-lf mt-5 text-sm">
            Showing {visiblePeople.length} of {people.length} assigned people.
            The remaining {remaining} use the same notes template — open them
            from{" "}
            <Link
              href="/coach-command-center/team/"
              className="font-semibold text-lf-orange hover:underline"
            >
              My People
            </Link>
            .
          </p>
        )}
      </section>
    </>
  );
}
