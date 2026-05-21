import StagedModulePage from "@/components/StagedModulePage";
import { findModule } from "@/data/modules";

export const metadata = { title: "501 Pipeline and Sales Systems" };

const moduleData = findModule("501-pipeline-and-sales-systems")!;

export default function Page() {
  return (
    <StagedModulePage
      module={moduleData}
      handoutTitle="501 Pipeline Review Template"
      handoutDescription="Friday pipeline review template, status definitions, past client routine by tenure."
      recordingDescription="Jeremy runs his own pipeline review live. Status calls, next steps, AI assisted follow up."
    />
  );
}
