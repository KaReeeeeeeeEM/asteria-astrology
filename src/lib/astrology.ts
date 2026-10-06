import * as Astronomy from "astronomy-engine";
import { fromZonedTime, formatInTimeZone } from "date-fns-tz";
import {
  signs,
  planets,
  signAt,
  aspectDefinitions,
  planetKeywords,
} from "./knowledge";
export type Placement = {
  name: string;
  symbol: string;
  longitude: number;
  sign: string;
  signSymbol: string;
  degree: number;
  retrograde: boolean;
  house?: number;
  theme: string;
};
export type Aspect = {
  a: string;
  b: string;
  name: string;
  angle: number;
  orb: number;
  tone: string;
  symbol: string;
};
export type BirthInput = {
  name: string;
  date: string;
  time: string;
  timezone: string;
  latitude: number;
  longitude: number;
  place: string;
  unknownTime: boolean;
};
export type Chart = {
  input: BirthInput;
  utc: string;
  placements: Placement[];
  aspects: Aspect[];
  ascendant: number | null;
  midheaven: number | null;
  elements: Record<string, number>;
  method: string;
};
export const normalize = (n: number) => ((n % 360) + 360) % 360;
export const separation = (a: number, b: number) =>
  Math.abs(((a - b + 540) % 360) - 180);
function longitude(body: Astronomy.Body, date: Date) {
  return Astronomy.Ecliptic(Astronomy.GeoVector(body, date, true)).elon;
}
export function placementsAt(date: Date): Placement[] {
  return planets.map((p) => {
    const body = p.name as Astronomy.Body;
    const lon = longitude(body, date);
    const before = longitude(body, new Date(date.getTime() - 43200000));
    const after = longitude(body, new Date(date.getTime() + 43200000));
    const s = signAt(lon);
    return {
      name: p.name,
      symbol: p.symbol,
      longitude: lon,
      sign: s.name,
      signSymbol: s.symbol,
      degree: lon % 30,
      retrograde:
        p.name !== "Sun" &&
        p.name !== "Moon" &&
        ((after - before + 540) % 360) - 180 < 0,
      theme: p.theme,
    };
  });
}
export function aspectsBetween(
  a: Placement[],
  b?: Placement[],
  maxOrb?: number,
): Aspect[] {
  const result: Aspect[] = [];
  a.forEach((p, i) =>
    (b || a).forEach((q, j) => {
      if (!b && j <= i) return;
      const d = separation(p.longitude, q.longitude);
      const def = aspectDefinitions.find(
        (x) => Math.abs(d - x.angle) <= (maxOrb ?? x.orb),
      );
      if (def)
        result.push({
          a: p.name,
          b: q.name,
          name: def.name,
          angle: def.angle,
          orb: Math.abs(d - def.angle),
          tone: def.tone,
          symbol: def.symbol,
        });
    }),
  );
  return result.sort((x, y) => x.orb - y.orb);
}
export function birthUTC(input: BirthInput) {
  const wall = `${input.date}T${input.unknownTime ? "12:00" : input.time}:00`;
  const d = fromZonedTime(wall, input.timezone);
  if (
    !Number.isFinite(d.getTime()) ||
    formatInTimeZone(d, input.timezone, "yyyy-MM-dd'T'HH:mm:ss") !== wall
  )
    throw new Error(
      "This local time does not exist in the chosen time zone (a daylight-saving change). Choose a valid time.",
    );
  return d;
}
export function calculateChart(input: BirthInput): Chart {
  const d = birthUTC(input);
  const placements = placementsAt(d);
  let ascendant: number | null = null,
    midheaven: number | null = null;
  if (!input.unknownTime && Math.abs(input.latitude) < 66) {
    const rad = Math.PI / 180;
    const lst =
      normalize(Astronomy.SiderealTime(d) * 15 + input.longitude) * rad;
    const jd = d.getTime() / 86400000 + 2440587.5;
    const t = (jd - 2451545) / 36525;
    const eps = (23.439291111 - 0.013004167 * t) * rad;
    ascendant = normalize(
      Math.atan2(
        -Math.cos(lst),
        Math.sin(eps) * Math.tan(input.latitude * rad) +
          Math.cos(eps) * Math.sin(lst),
      ) /
        rad +
        180,
    );
    midheaven = normalize(
      Math.atan2(Math.sin(lst), Math.cos(lst) * Math.cos(eps)) / rad,
    );
    const start = Math.floor(ascendant / 30);
    placements.forEach(
      (p) => (p.house = ((Math.floor(p.longitude / 30) - start + 12) % 12) + 1),
    );
  }
  const elements: Record<string, number> = {
    Fire: 0,
    Earth: 0,
    Air: 0,
    Water: 0,
  };
  placements.forEach((p) => elements[signAt(p.longitude).element]++);
  return {
    input,
    utc: d.toISOString(),
    placements,
    aspects: aspectsBetween(placements),
    ascendant,
    midheaven,
    elements,
    method: "Tropical zodiac · whole-sign houses · geocentric longitudes",
  };
}
export function skyAt(date: Date) {
  const placements = placementsAt(date);
  const phase = Astronomy.MoonPhase(date);
  const names = [
    "New moon",
    "Waxing crescent",
    "First quarter",
    "Waxing gibbous",
    "Full moon",
    "Waning gibbous",
    "Last quarter",
    "Waning crescent",
  ];
  const phaseName = names[Math.floor(normalize(phase + 22.5) / 45)];
  const illumination = Astronomy.Illumination(
    Astronomy.Body.Moon,
    date,
  ).phase_fraction;
  const next = [0, 90, 180, 270]
    .map((angle, i) => ({
      name: ["New moon", "First quarter", "Full moon", "Last quarter"][i],
      date:
        Astronomy.SearchMoonPhase(angle, date, 40)?.date.toISOString() || "",
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
  return {
    placements,
    phase,
    phaseName,
    illumination,
    next,
    aspects: aspectsBetween(placements).slice(0, 6),
  };
}
export function dailyReading(signName: string, date: Date) {
  const s =
    signs.find((x) => x.name.toLowerCase() === signName.toLowerCase()) ||
    signs[0];
  const sky = skyAt(date);
  const moon = sky.placements.find((x) => x.name === "Moon")!;
  const monthSeed = Math.floor(date.getTime() / 86400000) % 5;
  const actions: Record<string, string[]> = {
    Fire: [
      "Give one promising idea a small, concrete start.",
      "Turn enthusiasm into a conversation that leaves room for someone else.",
      "Choose a challenge you can finish today.",
      "Pause before committing, then act with intention.",
      "Make time for something that feels creatively alive.",
    ],
    Earth: [
      "Make one routine a little more supportive.",
      "Notice what is working before adding another obligation.",
      "Take a practical step toward a long-term intention.",
      "Let enough be enough for one task today.",
      "Return to a grounding activity you enjoy.",
    ],
    Air: [
      "Ask a question you have been quietly carrying.",
      "Write down an idea before opening another tab.",
      "Give a conversation your undivided attention.",
      "Explore a perspective different from your own.",
      "Make one clear decision instead of keeping every option open.",
    ],
    Water: [
      "Name a feeling without rushing to fix it.",
      "Build a little quiet into your day.",
      "Offer care in a way that respects your own limits.",
      "Let a personal reflection become a gentle conversation.",
      "Return to a place or practice that helps you feel settled.",
    ],
  };
  return {
    sign: s,
    moon,
    phaseName: sky.phaseName,
    title: `A little space for ${s.gift.toLowerCase()}.`,
    text: `With the Moon in ${moon.sign}, today’s symbolic lens turns toward ${signAt(moon.longitude).gift.toLowerCase()} and ${signAt(moon.longitude).growth.toLowerCase()}. For ${s.name}, let ${s.gift.toLowerCase()} guide your next small step. ${actions[s.element][monthSeed]}`,
    prompt: `Where could ${s.growth.toLowerCase()} make room for your ${s.gift.toLowerCase()} today?`,
    connection: `Bring ${s.gift.toLowerCase()} to a conversation, and practice ${s.growth.toLowerCase()} when you listen.`,
    focus: actions[s.element][(monthSeed + 2) % 5],
  };
}
export function aspectReading(a: Aspect) {
  return `${a.a} ${a.name.toLowerCase()} ${a.b} invites you to notice the relationship between ${planetKeywords[a.a] || a.a} and ${planetKeywords[a.b] || a.b}. ${aspectDefinitions.find((x) => x.name === a.name)?.text || ""}`;
}
export function degreeText(n: number) {
  const degrees = Math.floor(n % 30);
  const minutes = Math.floor((n % 1) * 60);
  return `${degrees}° ${String(minutes).padStart(2, "0")}′`;
}
