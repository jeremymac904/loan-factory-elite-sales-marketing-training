import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import AccessNotice from "@/components/AccessNotice";
import { resolveProtectedAccess } from "@/lib/supabase/protectedAccess";
import {
  assignedPeople,
  statusMeta,
  type AssignedPerson,
  type RelationshipType,
} from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Coach Assignments" };

const relationshipSections: {
  relationship: RelationshipType;
  title: string;
  blurb: string;
  table: string;
}[] = [
  {
    relationship: "team_leader",
    title: "Team leaders",
    blurb: "Team leaders coaching the LOs on their own team.",
    table: "team_leader_assignments",
  },
  {
    relationship: "corporate_coach",
    title: "Corporate coaches",
    blurb: "Corporate coaches supporting new LO onboarding and development.",
    table: "coach_assignments",
  },
  {
    relationship: "paid_coaching",
    title: "Paid coaching programs",
    blurb: "LO Mastery and Loan Factory Alliance paid coaching members.",
    table: "coaching_member_assignments",
  },
];

function groupByCoach(people: AssignedPerson[]) {
  const byCoach = new Map<string, AssignedPerson[]>();
  for (const person of people) {
    const list = byCoach.get(person.coach) ?? [];
    list.push(person);
    byCoach.set(person.coach, list);
  }
  return [...byCoach.entries()].map(([coach, members]) => ({ coach, members }));
}

export default async function AdminCoachAssignmentsPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  const isAdmin =
    previewEnabled ||
    (session.status === "approved" &&
      (session.permissions?.can_access_admin ||
        isAdminRole(session.profile.role)));

  if (!isAdmin) {
    const access = resolveProtectedAccess(session, isAdmin);
    return (
      <AccessNotice
        surfaceLabel="Coach Assignments"
        status={access.status}
        roleLabel={access.roleLabel}
      >
        {access.status === "signed-out" &&
          "Admin access is required to review coach assignments."}
        {access.status === "pending" &&
          "Your account is signed in, but it is not approved for admin access yet."}
        {access.status === "access-denied" &&
          "Your current role does not include admin access."}
      </AccessNotice>
    );
  }

  const totalAssigned = assignedPeople.length;
  const uniqueCoaches = new Set(assignedPeople.map((p) => p.coach)).size;
  const needsAttention = assignedPeople.filter(
    (p) => p.status === "stuck" || p.status === "inactive",
  );

  const coverageCounts = relationshipSections.map((section) => ({
    ...section,
    count: assignedPeople.filter((p) => p.relationship === section.relationship)
      .length,
  }));

  // Safe read-only check of the live coaching_assignments table (no writes).
  const admin = createSupabaseAdminClient();
  let liveCount: number | null = null;
  let liveError = false;
  if (admin) {
    const { count, error } = await admin
      .from("coaching_assignments")
      .select("id", { count: "exact", head: true });
    if (error) liveError = true;
    else liveCount = count ?? 0;
  }

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
            <Link
              href="/admin/"
              className="text-sm font-semibold text-white/70 hover:text-white"
            >
              Admin
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">
              Coach Assignments
            </span>
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-lf-orange">
            Coach Command Center
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            Coaching coverage
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80">
            See who is coaching whom across team leaders, corporate coaches, and
            paid coaching programs — and spot anyone who needs coaching
            attention.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              People assigned
            </p>
            <p className="mt-2 text-3xl font-semibold text-lf-charcoal">
              {totalAssigned}
            </p>
          </div>
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Active coaches
            </p>
            <p className="mt-2 text-3xl font-semibold text-lf-charcoal">
              {uniqueCoaches}
            </p>
          </div>
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Needs coaching attention
            </p>
            <p className="mt-2 text-3xl font-semibold text-lf-orange">
              {needsAttention.length}
            </p>
          </div>
        </div>

        <div className="card mt-4">
          <h2 className="h-display text-xl">Coverage by relationship</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {coverageCounts.map((c) => (
              <div
                key={c.relationship}
                className="rounded-lg border border-lf-line bg-white p-3"
              >
                <p className="text-sm font-semibold text-lf-charcoal">
                  {c.title}
                </p>
                <p className="mt-1 text-xs text-lf-slate">{c.blurb}</p>
                <p className="mt-2 text-2xl font-semibold text-lf-charcoal">
                  {c.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-4">
        <div className="card border-lf-line bg-lf-mist">
          <h2 className="h-display text-xl">Live assignment persistence</h2>
          <p className="prose-lf mt-1 text-sm">
            {admin === null
              ? "Supabase admin is not configured in this environment — live coaching assignments will read here once connected."
              : liveError
                ? "Could not read live coaching assignments right now."
                : `${liveCount} live coaching assignment${liveCount === 1 ? "" : "s"} in Supabase (coaching_assignments).`}
          </p>
          <p className="prose-lf mt-2 text-xs text-lf-slate">
            The live <code>coaching_assignments</code> table keys on Supabase
            user IDs + coaching tier. Assignment editing here writes once the
            assignment model is reconciled (relationship column + email→user
            resolution). See <code>docs/COACH_ASSIGNMENT_MODEL.md</code> for the
            exact path. No assignment data is written from this view yet — the
            coverage below reflects sample data.
          </p>
        </div>
      </section>

      {needsAttention.length > 0 ? (
        <section className="container-page pb-4">
          <div className="card border-lf-orange/40 bg-lf-orangeSoft/40">
            <h2 className="h-display text-xl">Needs coaching attention</h2>
            <p className="prose-lf mt-1 text-sm">
              These LOs are stuck or inactive. A coaching nudge or check-in can
              re-engage them.
            </p>
            <div className="mt-4 grid gap-2">
              {needsAttention.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-lf-line bg-white px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-lf-charcoal">
                      {p.name}
                    </p>
                    <p className="text-xs text-lf-slate">
                      Coach: {p.coach} · {p.program} · Last activity:{" "}
                      {p.lastActivity}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusMeta[p.status].class}`}
                  >
                    {statusMeta[p.status].label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container-page pb-12">
        <div className="grid gap-6">
          {relationshipSections.map((section) => {
            const people = assignedPeople.filter(
              (p) => p.relationship === section.relationship,
            );
            const coaches = groupByCoach(people);
            return (
              <div key={section.relationship} className="card">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="h-display text-2xl">{section.title}</h2>
                  <span className="rounded-full bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-charcoal">
                    {people.length} assigned
                  </span>
                </div>
                <p className="prose-lf mt-1 text-sm">{section.blurb}</p>

                {coaches.length === 0 ? (
                  <p className="mt-4 text-sm text-lf-slate">
                    No assignments in this relationship yet.
                  </p>
                ) : (
                  <div className="mt-4 grid gap-4">
                    {coaches.map(({ coach, members }) => (
                      <div
                        key={coach}
                        className="rounded-lg border border-lf-line bg-white p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm font-semibold text-lf-charcoal">
                            Coach: {coach}
                          </h3>
                          <span className="text-xs text-lf-slate">
                            {members.length}{" "}
                            {members.length === 1 ? "person" : "people"}
                          </span>
                        </div>
                        <ul className="mt-3 grid gap-2">
                          {members.map((p) => {
                            const flagged =
                              p.status === "stuck" || p.status === "inactive";
                            return (
                              <li
                                key={p.id}
                                className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-lf-mist px-3 py-2"
                              >
                                <div>
                                  <p className="text-sm font-medium text-lf-charcoal">
                                    {p.name}
                                  </p>
                                  <p className="text-xs text-lf-slate">
                                    {p.program}
                                    {flagged
                                      ? " · Needs attention"
                                      : ""}
                                  </p>
                                </div>
                                <span
                                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusMeta[p.status].class}`}
                                >
                                  {statusMeta[p.status].label}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-xs text-lf-slate">
                  Managed in the <code>{section.table}</code> table when
                  connected.
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-lf-slate">
          Assignments are managed in the <code>coach_assignments</code>,{" "}
          <code>team_leader_assignments</code>, and{" "}
          <code>coaching_member_assignments</code> tables when connected. Manual
          tracking for now. Automation can be connected later.
        </p>
      </section>
    </>
  );
}
