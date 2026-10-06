import { db } from "@/db";
import { sql } from "drizzle-orm";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    await db().execute(sql`select 1`);
    return Response.json({
      status: "ok",
      database: "connected",
      emailConfigured: !!process.env.EASYMAIL_API_KEY,
    });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503 });
  }
}
