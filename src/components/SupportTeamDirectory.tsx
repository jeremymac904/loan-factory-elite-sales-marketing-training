import Image from "next/image";
import {
  loDevelopmentDepartmentContact,
  loDevelopmentGroups,
  loDevelopmentPeople,
  LoDevelopmentGroup,
} from "@/data/loDevelopmentPeople";

const groupDescriptions: Record<LoDevelopmentGroup, string> = {
  "LO Development":
    "Training ownership, LO development questions, and platform support direction.",
  "Corporate Coaches":
    "Loan officer coaches who reinforce training, review execution, and support behavior change.",
  Marketing:
    "Approved marketing support contacts for content, campaign, and adaptation review.",
};

const groupIds: Record<LoDevelopmentGroup, string> = {
  "LO Development": "lo-development",
  "Corporate Coaches": "corporate-coaches",
  Marketing: "marketing",
};

export default function SupportTeamDirectory() {
  return (
    <section id="lo-development-support-team" className="container-page py-14">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          LO Development Support Team
        </p>
        <h2 className="h-display mt-2 text-3xl">
          Who supports this platform
        </h2>
        <p className="prose-lf mt-3 text-lf-slate">
          Use this directory to find the right internal support path for LO
          development, corporate coaching, and approved marketing review.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-lf-line bg-lf-navy p-5 text-white shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Department contact
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold">
              {loDevelopmentDepartmentContact.name}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
              {loDevelopmentDepartmentContact.description}
            </p>
          </div>
          <a
            href={`mailto:${loDevelopmentDepartmentContact.email}`}
            className="inline-flex w-fit items-center rounded-lg bg-lf-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-lf-orangeDark"
          >
            {loDevelopmentDepartmentContact.email}
          </a>
        </div>
      </div>

      <div className="mt-10 space-y-10">
        {loDevelopmentGroups.map((group) => {
          const people = loDevelopmentPeople
            .filter((person) => person.group === group)
            .sort((a, b) => a.sortOrder - b.sortOrder);

          return (
            <div key={group} id={groupIds[group]}>
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="h-display text-2xl">{group}</h3>
                  <p className="prose-lf mt-1 max-w-2xl text-sm text-lf-slate">
                    {groupDescriptions[group]}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {people.map((person) => (
                  <article
                    key={person.id}
                    className="card flex h-full flex-col gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={person.image}
                        alt={`${person.name} headshot`}
                        width={96}
                        height={96}
                        className="h-20 w-20 shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <h4 className="h-display text-lg">{person.name}</h4>
                        <p className="mt-1 text-sm leading-5 text-lf-slate">
                          {person.role}
                        </p>
                      </div>
                    </div>

                    <a
                      href={`mailto:${person.email}`}
                      className="mt-auto inline-flex w-fit items-center rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-navy transition hover:border-lf-orange hover:text-lf-orange"
                    >
                      {person.email}
                    </a>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
