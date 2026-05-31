import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Launch QA Checklist" };

const checklist = [
  {
    title: "Local validation",
    items: [
      "Run npm run lint.",
      "Run npm run typecheck.",
      "Run npm run build.",
      "Confirm no .env values or secrets were printed.",
    ],
  },
  {
    title: "Role walkthrough",
    items: [
      "Master Admin opens /admin and View-As.",
      "LO Development opens /lo-development.",
      "Training Academy opens /training-academy.",
      "Loan Officer Support opens /loan-officer-support.",
      "Corporate Coach opens /coach-command-center.",
      "LO Mastery opens /member-area/lo-mastery.",
      "Loan Factory Alliance opens /member-area/alliance.",
      "Normal LO opens /normal-lo.",
    ],
  },
  {
    title: "Content and compliance",
    items: [
      "No unsupported production, income, approval, or rate guarantees.",
      "No borrower-visible, Realtor-visible, or public send without human review.",
      "No old paid-coaching naming in launch-facing copy.",
      "Missing videos, handouts, and clips are labeled for review instead of hidden.",
    ],
  },
  {
    title: "External action lock",
    items: [
      "No GitHub push or merge without explicit Jeremy approval.",
      "No Netlify production deploy without explicit Jeremy approval.",
      "No Supabase migration or production write without explicit Jeremy approval.",
      "No n8n activation, webhook call, Google mutation, or outbound send without explicit Jeremy approval.",
    ],
  },
];

export default function AdminQaChecklistPage() {
  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Final launch QA checklist"
        body={
          <p>
            Use this page as the local proof checklist before approving any
            push, deploy, migration, automation, or external action.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/" className="btn-primary">
            Back to admin
          </Link>
          <Link
            href="/admin/view-as/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Start View-As
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-10">
        <SectionHeading
          eyebrow="Checklist"
          title="Do not call the sprint complete until these items are true."
          description="This checklist is intentionally local-first. It does not perform external actions."
        />
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {checklist.map((group, index) => (
            <details
              key={group.title}
              open={index < 2}
              className="card group p-0"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
                <span className="flex items-center gap-2">
                  <span className="h-display text-lg">{group.title}</span>
                  <span className="rounded-full bg-lf-mist px-2 py-0.5 text-xs font-semibold text-lf-slate">
                    {group.items.length} items
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-lf-slate transition group-open:rotate-180"
                >
                  ▾
                </span>
              </summary>
              <ul className="prose-lf list-disc space-y-1.5 px-5 pb-5 pl-9 text-sm">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
