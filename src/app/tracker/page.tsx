import SectionHeading from "@/components/SectionHeading";
import DownloadPlaceholder from "@/components/DownloadPlaceholder";
import { trackerSections, trackerCsvHeaders } from "@/data/trackerFields";

export const metadata = { title: "Weekly Tracker" };

export default function TrackerPage() {
  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Tracker
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Weekly Activity Tracker
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Log it every Friday. Activity, content, partner, follow up, AI
            workflow, and the three commitments for next week. The tracker is
            the system. The system creates production.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Form spec"
          title="What to log every Friday."
          description="In version one, paste these fields into a Google Sheet, an Airtable, or your team's shared tracker. Future versions will offer a built in form inside Loan Factory AI Advantage."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {trackerSections.map((s) => (
            <div key={s.name} className="card">
              <h3 className="h-display text-lg">{s.name}</h3>
              <p className="prose-lf mt-1 text-sm text-lf-slate">
                {s.description}
              </p>
              <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-sm">
                {s.fields.map((f) => (
                  <li key={f.label}>
                    {f.label}{" "}
                    <span className="text-xs text-lf-slate">({f.type})</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-6">
        <SectionHeading
          eyebrow="Downloads"
          title="CSV template and tracker form."
          description="CSV headers below match the form spec. A downloadable CSV will live here after compliance review."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <DownloadPlaceholder
            title="Weekly Tracker CSV"
            format="CSV"
            description="One row per LO per week. Drop into Google Sheets or Airtable."
          />
          <DownloadPlaceholder
            title="Weekly Tracker Google Form (template)"
            format="Google Form"
            description="A team leader can copy this into a Google Form and route results into a Sheet."
          />
        </div>
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wide text-lf-slate">CSV headers</p>
          <pre className="code-block">{trackerCsvHeaders.join(",")}</pre>
        </div>
      </section>
    </>
  );
}
