import Link from "next/link";

const items = [
  { href: "/coach-command-center/", label: "Overview" },
  { href: "/coach-command-center/team/", label: "My People" },
  { href: "/coach-command-center/activity/", label: "Activity" },
  { href: "/coach-command-center/scorecards/", label: "Scorecards" },
  { href: "/coach-command-center/member-progress/", label: "Progress" },
  { href: "/coach-command-center/coaching-notes/", label: "Notes" },
  { href: "/coach-command-center/training-plan/", label: "Training" },
  { href: "/coach-command-center/messages/", label: "Messages" },
  { href: "/coach-command-center/email-center/", label: "Email" },
  { href: "/coach-command-center/calendar/", label: "Calendar" },
];

type Props = {
  current: string;
  showAdmin?: boolean;
};

export default function CoachCommandNav({ current, showAdmin = false }: Props) {
  const links = showAdmin
    ? [...items, { href: "/admin/coach-assignments/", label: "Assignments" }]
    : items;

  return (
    <nav
      aria-label="Coach Command Center sections"
      className="border-b border-lf-line bg-white"
    >
      <div className="container-page flex flex-wrap gap-1 py-3">
        {links.map((item) => {
          const active =
            current === item.href ||
            (item.href !== "/coach-command-center/" &&
              current.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                active
                  ? "bg-lf-orangeSoft text-lf-orangeDark"
                  : "text-lf-slate hover:bg-lf-mist hover:text-lf-orange"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
