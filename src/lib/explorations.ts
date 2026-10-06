import { signs } from "./knowledge";
export function reduceNumber(n: number, masters = true): number {
  while (n > 9 && !(masters && [11, 22, 33].includes(n)))
    n = String(n)
      .split("")
      .reduce((s, d) => s + Number(d), 0);
  return n;
}
export function numerology(date: string, year = new Date().getUTCFullYear()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
    throw Error("Enter a valid birth date.");
  const parsed = new Date(date + "T12:00:00Z");
  if (
    !Number.isFinite(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== date ||
    date < "1900-01-01" ||
    date > new Date().toISOString().slice(0, 10)
  )
    throw Error("Choose a real birth date between 1900 and today.");
  const [y, m, d] = date.split("-").map(Number);
  const parts = [reduceNumber(m), reduceNumber(d), reduceNumber(y)];
  const sum = parts.reduce((s, n) => s + n, 0);
  return {
    lifePath: reduceNumber(sum),
    birthday: reduceNumber(d),
    personalYear: reduceNumber(
      reduceNumber(m, false) +
        reduceNumber(d, false) +
        reduceNumber(year, false),
      false,
    ),
    year,
    steps: `Month ${m} → ${parts[0]} · Day ${d} → ${parts[1]} · Year ${y} → ${parts[2]} · Total ${sum} → ${reduceNumber(sum)}`,
  };
}
export const numberMeanings: Record<number, { title: string; text: string }> = {
  1: {
    title: "The initiator",
    text: "Explore independence, fresh starts, and the courage to act. Make space for collaboration alongside your own direction.",
  },
  2: {
    title: "The connector",
    text: "Explore cooperation, sensitivity, and patient listening. Connection works best when your own needs also have a voice.",
  },
  3: {
    title: "The storyteller",
    text: "Explore creativity, expression, and play. Give one idea a form you can share.",
  },
  4: {
    title: "The builder",
    text: "Explore structure, consistency, and practical care. Leave a little room for flexibility inside your plans.",
  },
  5: {
    title: "The explorer",
    text: "Explore freedom, curiosity, and change. Let a grounding routine support your next adventure.",
  },
  6: {
    title: "The nurturer",
    text: "Explore responsibility, beauty, and care. Support others without forgetting to replenish yourself.",
  },
  7: {
    title: "The seeker",
    text: "Explore reflection, study, and inner understanding. Balance private discovery with connection to the world.",
  },
  8: {
    title: "The organizer",
    text: "Explore stewardship, ambition, and resourcefulness. Define success in a way that includes your values.",
  },
  9: {
    title: "The humanitarian",
    text: "Explore compassion, perspective, and completion. Consider what you can release as a new chapter begins.",
  },
  11: {
    title: "The intuitive messenger",
    text: "A master-number convention associated with inspiration and sensitivity. Ground big ideas in small, workable actions.",
  },
  22: {
    title: "The visionary builder",
    text: "A master-number convention associated with bringing large visions into practical form. Build with patience and shared responsibility.",
  },
  33: {
    title: "The compassionate guide",
    text: "A master-number convention associated with creative service and care. Healthy boundaries help compassion remain sustainable.",
  },
};
export function zodiacMatch(a: string, b: string) {
  const i = signs.findIndex((s) => s.name === a),
    j = signs.findIndex((s) => s.name === b);
  if (i < 0 || j < 0) throw Error("Unknown zodiac sign");
  const one = signs[i],
    two = signs[j];
  const distance = Math.min(Math.abs(i - j), 12 - Math.abs(i - j));
  const complementary =
    [one.element, two.element].every((e) => ["Fire", "Air"].includes(e)) ||
    [one.element, two.element].every((e) => ["Earth", "Water"].includes(e));
  const element = one.element === two.element ? 92 : complementary ? 88 : 62;
  const aspect = [80, 64, 88, 60, 94, 55, 78][distance];
  const modality = one.modality === two.modality ? 72 : 86;
  const scores = [
    { label: "Elemental flow", value: element, weight: 55 },
    { label: "Sign geometry", value: aspect, weight: 30 },
    { label: "Shared rhythm", value: modality, weight: 15 },
  ];
  return {
    percentage: Math.round(
      scores.reduce((s, x) => s + (x.value * x.weight) / 100, 0),
    ),
    scores,
    angle: distance * 30,
  };
}
