import PaidCoachingLanding from "@/components/coaching/PaidCoachingLanding";
import { redirect } from "next/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

type Props = {
  searchParams?: Promise<SearchParams>;
};

function buildCallbackQuery(params: SearchParams) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
      return;
    }

    if (typeof value === "string") {
      query.set(key, value);
    }
  });

  return query.toString();
}

export default async function HomePage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};

  if (typeof params.code === "string" && params.code) {
    const query = buildCallbackQuery(params);
    redirect(`/auth/callback/${query ? `?${query}` : ""}`);
  }

  return <PaidCoachingLanding />;
}
