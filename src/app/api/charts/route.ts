import { db } from "@/db";
import { charts } from "@/db/schema";
import { and, eq, desc } from "drizzle-orm";
import { requireUser, apiError, validOrigin } from "@/lib/api";
import { birthSchema } from "@/lib/validation";
import { calculateChart } from "@/lib/astrology";
export async function GET() {
  try {
    const u = await requireUser();
    return Response.json(
      await db()
        .select()
        .from(charts)
        .where(eq(charts.userId, u.id))
        .orderBy(desc(charts.createdAt)),
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
    const input = birthSchema.safeParse(await req.json());
    if (!input.success)
      return Response.json(
        { error: input.error.issues[0].message },
        { status: 400 },
      );
    calculateChart(input.data);
    const existing = await db()
      .select({ id: charts.id })
      .from(charts)
      .where(eq(charts.userId, u.id));
    if (existing.length >= 20)
      return Response.json(
        { error: "You can save up to 20 charts. Remove a chart to make room." },
        { status: 400 },
      );
    const result = await db()
      .insert(charts)
      .values({ id: crypto.randomUUID(), userId: u.id, input: input.data })
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
      return Response.json({ error: "Chart ID is required" }, { status: 400 });
    await db()
      .delete(charts)
      .where(and(eq(charts.id, id), eq(charts.userId, u.id)));
    return Response.json({ ok: true });
  } catch (e) {
    return apiError(e);
  }
}
