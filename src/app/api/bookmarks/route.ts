import { db } from "@/db";
import { bookmarks } from "@/db/schema";
import { and, eq, desc } from "drizzle-orm";
import { requireUser, apiError, validOrigin } from "@/lib/api";
import { articles } from "@/lib/knowledge";
export async function GET() {
  try {
    const u = await requireUser();
    return Response.json(
      await db()
        .select()
        .from(bookmarks)
        .where(eq(bookmarks.userId, u.id))
        .orderBy(desc(bookmarks.createdAt)),
    );
  } catch (e) {
    return apiError(e);
  }
}
export async function POST(req: Request) {
  try {
    if (!validOrigin(req))
      return Response.json(
        { error: "Invalid request origin" },
        { status: 403 },
      );
    const u = await requireUser();
    const { slug } = await req.json();
    if (!articles.some((a) => a.slug === slug))
      return Response.json({ error: "Article not found" }, { status: 400 });
    const existing = await db()
      .select()
      .from(bookmarks)
      .where(and(eq(bookmarks.userId, u.id), eq(bookmarks.slug, slug)));
    if (existing.length) {
      await db().delete(bookmarks).where(eq(bookmarks.id, existing[0].id));
      return Response.json({ saved: false });
    }
    await db()
      .insert(bookmarks)
      .values({ id: crypto.randomUUID(), userId: u.id, slug });
    return Response.json({ saved: true });
  } catch (e) {
    return apiError(e);
  }
}
