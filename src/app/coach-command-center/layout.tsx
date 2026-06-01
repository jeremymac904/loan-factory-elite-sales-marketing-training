import { ReactNode } from "react";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachAssistantPanel from "@/components/coach/CoachAssistantPanel";
import { peopleForScope } from "@/data/coachCommandCenter";
import AccessNotice from "@/components/AccessNotice";

// Gate the whole /coach-command-center subtree to coaches, team leaders, and
// admins (View-As aware). Normal LOs without a coach/team-leader/admin role do
// not see the command center.
export default async function CoachCommandCenterLayout({
  children,
}: {
  children: ReactNode;
}) {
  const access = await getCoachAccess();

  if (!access.previewEnabled && !access.isCoach) {
    const status =
      access.status === "pending" ||
      access.status === "signed-out" ||
      access.status === "not-configured"
        ? access.status
        : "access-denied";
    return (
      <AccessNotice
        surfaceLabel="Coach Command Center"
        status={status}
        roleLabel={access.effectiveRoleLabel}
      >
        {status === "not-configured" &&
          "Sign-in setup is not ready in this environment yet."}
        {status === "signed-out" &&
          "The Coach Command Center is for approved Loan Factory coaches, team leaders, and LO Development."}
        {status === "pending" &&
          "Your account is signed in, but it is not approved for coach access yet."}
        {status === "access-denied" &&
          "Your current role does not include coach center access. Ask Jeremy or LO Development to review it."}
      </AccessNotice>
    );
  }

  const people = peopleForScope(access.scope);

  return (
    <>
      {children}
      <CoachAssistantPanel
        people={people}
        coachLabel={access.effectiveRoleLabel}
      />
    </>
  );
}
