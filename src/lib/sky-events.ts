import * as Astronomy from "astronomy-engine";
import { placementsAt } from "./astrology";
export type SkyEvent = {
  name: string;
  date: string;
  kind: string;
  description: string;
};
export function upcomingEvents(start: Date, days = 14): SkyEvent[] {
  const events: SkyEvent[] = [];
  const end = start.getTime() + days * 86400000;
  let quarter = Astronomy.SearchMoonQuarter(start);
  while (quarter.time.date.getTime() <= end) {
    events.push({
      name: ["New moon", "First quarter", "Full moon", "Last quarter"][
        quarter.quarter
      ],
      date: quarter.time.date.toISOString(),
      kind: "Lunar phase",
      description:
        "A calculated quarter-phase moment shared worldwide. Local visibility depends on your location.",
    });
    quarter = Astronomy.NextMoonQuarter(quarter);
  }
  let previous = placementsAt(start);
  for (let t = start.getTime() + 21600000; t <= end; t += 21600000) {
    const current = placementsAt(new Date(t));
    for (let i = 0; i < current.length; i++) {
      const p = current[i],
        old = previous[i];
      if (p.sign !== old.sign || p.retrograde !== old.retrograde) {
        events.push({
          name:
            p.sign !== old.sign
              ? `${p.name} enters ${p.sign}`
              : `${p.name} stations ${p.retrograde ? "retrograde" : "direct"}`,
          date: new Date(t).toISOString(),
          kind: p.sign !== old.sign ? "Sign ingress" : "Station",
          description:
            "Estimated in six-hour sampling windows using tropical geocentric positions. This time is approximate.",
        });
      }
    }
    previous = current;
  }
  const lunar = Astronomy.SearchLunarEclipse(start),
    solar = Astronomy.SearchGlobalSolarEclipse(start);
  for (const [label, e] of [
    ["lunar", lunar],
    ["solar", solar],
  ] as const)
    events.push({
      name: `Next ${e.kind} ${label} eclipse`,
      date: e.peak.date.toISOString(),
      kind: "Global eclipse",
      description:
        "Global peak; this does not mean the eclipse is visible from your location. Never view the Sun without proper solar protection.",
    });
  const season = Astronomy.Seasons(start.getUTCFullYear());
  for (const [name, time] of [
    ["March equinox", season.mar_equinox],
    ["June solstice", season.jun_solstice],
    ["September equinox", season.sep_equinox],
    ["December solstice", season.dec_solstice],
  ] as const)
    if (time.date.getTime() > start.getTime() && time.date.getTime() <= end)
      events.push({
        name,
        date: time.date.toISOString(),
        kind: "Seasonal marker",
        description: "Calculated solar seasonal boundary.",
      });
  return events.sort((a, b) => a.date.localeCompare(b.date));
}
