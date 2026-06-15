import Link from "next/link";
import type { AssignedPerson } from "@/data/coachCommandCenter";

const personActions = [
  { label: "View profile", href: "/coach-command-center/team/" },
  { label: "Send coach note", href: "/coach-command-center/coaching-notes/" },
  { label: "Weekly follow-up", href: "/coach-command-center/coaching-notes/" },
  { label: "Draft message", href: "/coach-command-center/coaching-notes/" },
  { label: "Review scorecard", href: "/coach-command-center/scorecards/" },
  { label: "Add to weekly coaching call", href: "/coach-command-center/calendar/" },
  { label: "Training assignment review", href: "/coach-command-center/resources/" },
  { label: "Mark action complete", href: "/coach-command-center/team/" },
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
