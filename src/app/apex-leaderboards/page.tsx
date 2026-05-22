import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";

export const metadata = { title: "Apex Leaderboards" };

type ProductionRow = {
  rank: number;
  member: string;
  volumeLoans: number;
};

type ActivityRow = {
  rank: number;
  member: string;
  lessonsCompleted: number;
  certifications: number;
};

const productionSample: ProductionRow[] = [
  { rank: 1, member: "Member A", volumeLoans: 28 },
  { rank: 2, member: "Member B", volumeLoans: 24 },
  { rank: 3, member: "Member C", volumeLoans: 21 },
  { rank: 4, member: "Member D", volumeLoans: 19 },
  { rank: 5, member: "Member E", volumeLoans: 17 },
  { rank: 6, member: "Member F", volumeLoans: 15 },
  { rank: 7, member: "Member G", volumeLoans: 14 },
  { rank: 8, member: "Member H", volumeLoans: 12 },
  { rank: 9, member: "Member I", volumeLoans: 11 },
  { rank: 10, member: "Member J", volumeLoans: 10 },
];

const activitySample: ActivityRow[] = [
  { rank: 1, member: "Member K", lessonsCompleted: 42, certifications: 3 },
  { rank: 2, member: "Member L", lessonsCompleted: 38, certifications: 3 },
  { rank: 3, member: "Member M", lessonsCompleted: 34, certifications: 2 },
  { rank: 4, member: "Member N", lessonsCompleted: 31, certifications: 2 },
  { rank: 5, member: "Member O", lessonsCompleted: 28, certifications: 2 },
  { rank: 6, member: "Member P", lessonsCompleted: 25, certifications: 1 },
  { rank: 7, member: "Member Q", lessonsCompleted: 22, certifications: 1 },
  { rank: 8, member: "Member R", lessonsCompleted: 20, certifications: 1 },
  { rank: 9, member: "Member S", lessonsCompleted: 18, certifications: 1 },
  { rank: 10, member: "Member T", lessonsCompleted: 15, certifications: 1 },
];

export default function ApexLeaderboardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Recognition"
        title="Apex Leaderboards."
        body={
          <p>
            See who is showing up and doing the work. Production rankings by
            loan count, plus an activity board for lessons completed and
            certifications earned.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      />

      <section className="container-page py-10">
        <ComplianceCallout title="Compliance note" variant="warning">
          <p>
            Production rankings are for motivational purposes only and do not
            constitute guarantees of results. Past production does not predict
            future production. Live data integration is a future build. The
            tables below show sample placeholder data.
          </p>
        </ComplianceCallout>
      </section>

      <section className="container-page pb-10">
        <SectionHeading
          eyebrow="Production"
          title="Volume leaderboard . loan count."
          description="Ranked by number of closed loans this period. Loan count only. No dollar amounts displayed here."
        />
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr className="border-b border-lf-line text-xs uppercase tracking-wide text-lf-slate">
                <th className="py-3 pr-4">Rank</th>
                <th className="py-3 pr-4">Member</th>
                <th className="py-3 pr-4">Closed Loans</th>
              </tr>
            </thead>
            <tbody>
              {productionSample.map((row) => (
                <tr key={row.rank} className="border-b border-lf-line text-sm">
                  <td className="py-3 pr-4 font-semibold text-lf-navy">
                    {row.rank}
                  </td>
                  <td className="py-3 pr-4">{row.member}</td>
                  <td className="py-3 pr-4">{row.volumeLoans}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-10">
          <SectionHeading
            eyebrow="Activity"
            title="Lessons and certifications leaderboard."
            description="Ranked by Apex Advisor Track lessons completed and Apex certifications earned."
          />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-lf-line text-xs uppercase tracking-wide text-lf-slate">
                  <th className="py-3 pr-4">Rank</th>
                  <th className="py-3 pr-4">Member</th>
                  <th className="py-3 pr-4">Lessons Completed</th>
                  <th className="py-3 pr-4">Certifications Earned</th>
                </tr>
              </thead>
              <tbody>
                {activitySample.map((row) => (
                  <tr key={row.rank} className="border-b border-lf-line text-sm">
                    <td className="py-3 pr-4 font-semibold text-lf-navy">
                      {row.rank}
                    </td>
                    <td className="py-3 pr-4">{row.member}</td>
                    <td className="py-3 pr-4">{row.lessonsCompleted}</td>
                    <td className="py-3 pr-4">{row.certifications}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="How the boards work"
          title="Recognition for the work, not the result."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="card">
            <h3 className="h-display text-lg">Production board</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Loan count, period over period. Loan count only, no dollar
              amounts. Display is illustrative only and is not a comparison or
              guarantee.
            </p>
          </div>
          <div className="card">
            <h3 className="h-display text-lg">Activity board</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Lessons completed and certifications earned. Rewards consistency
              and effort, not outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>
            Production rankings are for motivational purposes only and do not
            constitute guarantees of results. Apex Advisor is a training and
            development platform and does not promise any specific level of
            production, income, or business outcome.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
