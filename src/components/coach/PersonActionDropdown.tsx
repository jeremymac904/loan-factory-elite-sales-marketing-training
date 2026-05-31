import Link from "next/link";
import type { AssignedPerson } from "@/data/coachCommandCenter";

const personActions = [
  { label: "View profile", href: "/coach-command-center/team/" },
  { label: "Add note", href: "/coach-command-center/coaching-notes/" },
  { label: "Create follow up", href: "/coach-command-center/messages/" },
  { label: "Draft message", href: "/coach-command-center/messages/" },
  { label: "View LO scorecard", href: "/coach-command-center/scorecards/" },
  { label: "Schedule coaching call draft", href: "/coach-command-center/calendar/" },
  { label: "Assign resource", href: "/coach-command-center/training-plan/" },
  { label: "Mark action complete", href: "/coach-command-center/activity/" },
];

export default function PersonActionDropdown({
  person,
}: {
  person: AssignedPerson;
}) {
  return (
    <details className="relative">
      <summary className="list-none rounded-lg border border-lf-line px-3 py-1.5 text-xs font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange">
        Actions
      </summary>
      <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-lf-line bg-white p-2 shadow-lift">
        {personActions.map((action) => (
          <Link
            key={action.label}
            href={`${action.href}?person=${person.id}`}
            className="block rounded-lg px-3 py-2 text-xs font-semibold text-lf-slate hover:bg-lf-mist hover:text-lf-orange"
          >
            {action.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
