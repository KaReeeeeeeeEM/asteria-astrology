import { skyAt } from "@/lib/astrology";
import { upcomingEvents } from "@/lib/sky-events";
export const revalidate = 3600;
export async function GET() {
  const now = new Date();
  return Response.json(
    {
      calculatedAt: now.toISOString(),
      source: "Astronomy Engine · calculated locally",
      sky: skyAt(now),
      events: upcomingEvents(now),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
      },
    },
  );
}
