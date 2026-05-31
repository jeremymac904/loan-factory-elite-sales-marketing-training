import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Department Routing" };

const departments = [
  {
    name: "LO Development",
    owner: "Andre / Jeremy",
    href: "/lo-development/",
    owns:
      "Program direction, launch QA, role dashboards, content prioritization, and final handoff decisions.",
    escalates:
      "Production actions, external sends, migrations, deploys, or unclear source-of-truth conflicts.",
  },
  {
    name: "Training Academy",
    owner: "Training Academy",
    href: "/training-academy/",
    owns:
      "Lesson packs, 101-601 sequencing, quizzes, video library, clips, handouts, and recommended next training.",
    escalates:
      "Missing source content, asset upload approval, or public-facing lesson claims.",
  },
  {
    name: "Loan Officer Support",
    owner: "Support team",
    href: "/loan-officer-support/",
    owns:
      "System access, common issues, first-file guidance, support triage, and human escalation routing.",
    escalates:
      "Borrower-visible, partner-visible, production, lender, or compliance-sensitive issues.",
  },
  {
    name: "Corporate Coaches",
    owner: "Coach team",
    href: "/coach-command-center/",
    owns:
      "Member progress, scorecards, coach notes, coaching action items, and training recommendations.",
    escalates:
      "Membership changes, unsupported public claims, or anything that needs admin/user access changes.",
  },
  {
    name: "Marketing",
    owner: "Marketing team",
    href: "/marketing/",
    owns:
      "FaceGram review, brand-safe content, draft marketing checks, Audience Quality Panel prep, and approved examples.",
    escalates:
      "Compliance review, real social posting, brand channel mutations, or borrower/Realtor-facing send approval.",
  },
  {
    name: "Master Admin",
    owner: "Jeremy / Thuan",
    href: "/admin/",
    owns:
      "Supabase role control, View-As, platform status, user access, final QA, and deploy approval path.",
    escalates:
      "Credentials, MFA, production data writes, GitHub push/merge, Netlify deploy, or n8n activation.",
  },
];

export default function DepartmentRoutingPage() {
  return (
    <>
      <PageHero
        eyebrow="Operating Layer"
        title="Department routing for the LO Development Platform"
        body={
          <p>
            This is the handoff map for deciding who owns each platform
            question. It keeps support, training, coaching, marketing, and admin
            work from blending together.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      />

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Ownership map"
          title="Every request should land with one accountable lane."
          description="Use this page before assigning work, escalating an issue, or asking an agent to produce a new asset."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {departments.map((department) => (
            <article key={department.name} className="card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {department.owner}
                  </span>
                  <h2 className="h-display mt-2 text-xl">
                    {department.name}
                  </h2>
                </div>
                <Link href={department.href} className="btn-secondary text-sm">
                  Open lane
                </Link>
              </div>
              <div className="mt-5 grid gap-3">
                <div className="rounded-xl border border-lf-line bg-lf-mist p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-lf-slate">
                    Owns
                  </p>
                  <p className="prose-lf mt-1 text-sm">{department.owns}</p>
                </div>
                <div className="rounded-xl border border-lf-orange/30 bg-lf-orangeSoft/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-lf-orangeDark">
                    Escalates
                  </p>
                  <p className="prose-lf mt-1 text-sm">
                    {department.escalates}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
