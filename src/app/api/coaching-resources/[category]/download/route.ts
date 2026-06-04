import { getCoachingAccess } from "@/lib/coachingAccess";
import {
  buildResourcePackMarkdown,
  canViewCoachingResourceCategory,
  type CoachingResourceCategory,
  getCoachingResourceCategory,
} from "@/data/coachingResources";

type Params = {
  params: Promise<{ category: string }>;
};

type ResourceCategoryId = CoachingResourceCategory["id"];

export async function GET(_: Request, { params }: Params) {
  const access = await getCoachingAccess();
  const resolved = await params;
  const category = getCoachingResourceCategory(
    resolved.category as ResourceCategoryId,
  );

  if (access.status !== "approved" || !category) {
    return new Response("Not found", { status: 404 });
  }

  if (!canViewCoachingResourceCategory(category, access)) {
    return new Response("Access denied", { status: 403 });
  }

  const content = buildResourcePackMarkdown(category);

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${category.id}-pack.md"`,
      "Cache-Control": "no-store",
    },
  });
}
