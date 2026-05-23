import AITwinNav from "@/components/AITwinNav";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "AI Twin Gmail Review" };

const steps = [
  "You choose whether Gmail access should be added for your account.",
  "You select one email thread or message.",
  "The Twin summarizes the thread and points out tone, clarity, action items, and risk.",
  "The Twin drafts a reply for you to review.",
  "You edit the draft. Nothing sends automatically.",
];

export default function GmailReviewPage() {
  return (
    <section className="container-page py-12">
      <AITwinNav />
      <SectionHeading
        eyebrow="Email review"
        title="Email review workflow"
        description="Use this workflow to see how a Twin should summarize a selected email, flag action items, and draft a reply for review."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="card">
          <h2 className="h-display text-2xl">Safety rules</h2>
          <p className="prose-lf mt-3 text-sm text-lf-slate">
            Email access must be chosen by the user, limited to what is
            needed, and draft-only unless Jeremy approves a send flow later.
          </p>
        </article>
        <article className="card">
          <h2 className="h-display text-2xl">Workflow</h2>
          <ol className="prose-lf mt-4 list-decimal space-y-2 pl-5 text-sm">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}
