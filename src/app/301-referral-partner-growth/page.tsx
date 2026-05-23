import StagedModulePage from "@/components/StagedModulePage";
import ComplianceCallout from "@/components/ComplianceCallout";
import { findModule } from "@/data/modules";

export const metadata = { title: "301 Referral Partner Growth" };

const moduleData = findModule("301-referral-partner-growth")!;

export default function Page() {
  return (
    <>
      <StagedModulePage
        module={moduleData}
        handoutTitle="301 Partner Playbook"
        handoutDescription="Realtor strategy, partner value prop, listing agent call, RESPA dos and don'ts."
        recordingDescription="Jeremy runs a Realtor first-meeting roleplay, then explains what worked and what to fix."
      />
      <section className="container-page pb-16">
        <ComplianceCallout title="RESPA Section 8 reminder" variant="warning">
          <p>
            No things of value tied to referrals. No gift cards, paid
            subscriptions, or paid event tickets for sending business. Co
            marketing requires both parties to pay pro rata, documented at fair
            market value. Any new MSA structure requires corporate approval.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
