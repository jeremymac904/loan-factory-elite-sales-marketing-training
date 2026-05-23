import AITwinNav from "@/components/AITwinNav";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "AI Twin Gmail Review" };

const steps = [
  "User authorizes Gmail read-only in a future OAuth flow.",
  "User selects one email thread or message.",
  "AI summarizes the thread and flags tone, clarity, action items, and risk.",
  "AI drafts a reply for human review.",
  "User edits the draft. No auto-send by default.",
];

export default function GmailReviewPage() {
  return (
    <section className="container-page py-12">
      <AITwinNav />
      <SectionHeading
        eyebrow="Gmail review"
        title="Future email review workflow"
        description="This is a static workflow shell only. No Gmail API, OAuth scope, inbox read, compose action, or email send is wired."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="card">
          <h2 className="h-display text-2xl">Safety status</h2>
          <p className="prose-lf mt-3 text-sm text-lf-slate">
            Gmail is not connected. The future flow must be user-authorized,
            least-privilege, role-scoped, and draft-only unless Jeremy approves
            a send flow later.
          </p>
        </article>
        <article className="card">
          <h2 className="h-display text-2xl">Workflow preview</h2>
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
