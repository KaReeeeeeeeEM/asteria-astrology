import { db } from "@/db";
import { journal } from "@/db/schema";
import { and, eq, desc } from "drizzle-orm";
import { requireUser, apiError, validOrigin } from "@/lib/api";
import { journalSchema } from "@/lib/validation";
export async function GET() {
  try {
    const u = await requireUser();
    return Response.json(
      await db()
        .select()
        .from(journal)
        .where(eq(journal.userId, u.id))
        .orderBy(desc(journal.createdAt))
        .limit(200),
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
    const input = journalSchema.safeParse(await req.json());
    if (!input.success)
      return Response.json(
        { error: input.error.issues[0].message },
        { status: 400 },
      );
    const result = await db()
      .insert(journal)
      .values({ id: crypto.randomUUID(), userId: u.id, ...input.data })
      .returning();
    return Response.json(result[0], { status: 201 });
  } catch (e) {
    return apiError(e);
  }
}
export async function DELETE(req: Request) {
  try {
    if (!validOrigin(req))
      return Response.json(
        { error: "Invalid request origin" },
        { status: 403 },
      );
    const u = await requireUser();
    const id = new URL(req.url).searchParams.get("id");
    if (!id)
      return Response.json({ error: "Entry ID is required" }, { status: 400 });
    await db()
      .delete(journal)
      .where(and(eq(journal.id, id), eq(journal.userId, u.id)));
    return Response.json({ ok: true });
  } catch (e) {
    return apiError(e);
  }
}
