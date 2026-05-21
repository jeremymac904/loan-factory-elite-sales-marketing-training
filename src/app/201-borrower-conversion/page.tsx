import StagedModulePage from "@/components/StagedModulePage";
import { findModule } from "@/data/modules";

export const metadata = { title: "201 Borrower Conversion" };

const moduleData = findModule("201-borrower-conversion")!;

export default function Page() {
  return (
    <StagedModulePage
      module={moduleData}
      handoutTitle="201 First Call Rubric"
      handoutDescription="Score sheet for the first borrower call. Open, questions, talk ratio, plan summary, next step."
      recordingDescription="Jeremy runs a full live first call, end to end. Then walks through the rubric live."
    />
  );
}
