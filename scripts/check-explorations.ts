import assert from "node:assert/strict";
import { numerology, zodiacMatch, reduceNumber } from "../src/lib/explorations";
import { upcomingEvents } from "../src/lib/sky-events";
import { dailyReading } from "../src/lib/astrology";
import { signs } from "../src/lib/knowledge";
assert.equal(numerology("1990-07-17", 2026).lifePath, 7);
assert.equal(numerology("1990-07-17", 2026).birthday, 8);
assert.equal(numerology("1990-07-17", 2026).personalYear, 7);
assert.equal(reduceNumber(29), 11);
assert.equal(reduceNumber(22), 22);
assert.equal(reduceNumber(33), 33);
assert.equal(reduceNumber(33, false), 6);
assert.throws(() => numerology("2000-02-30"));
assert.throws(() => numerology("2099-01-01"));
for (const a of signs)
  for (const b of signs) {
    const m = zodiacMatch(a.name, b.name);
    assert.equal(m.percentage, zodiacMatch(b.name, a.name).percentage);
    assert.ok(m.percentage >= 0 && m.percentage <= 100);
    assert.equal(
      m.scores.reduce((n, x) => n + x.weight, 0),
      100,
    );
  }
assert.notEqual(
  zodiacMatch("Aries", "Leo").percentage,
  zodiacMatch("Aries", "Cancer").percentage,
);
const start = new Date("2026-10-06T12:00:00Z"),
  events = upcomingEvents(start);
assert.ok(events.length > 4);
assert.ok(events.some((e) => e.kind === "Global eclipse"));
assert.ok(events.some((e) => e.kind === "Sign ingress"));
for (const e of events) {
  assert.ok(new Date(e.date) >= start);
}
assert.deepEqual(
  events.map((e) => e.date),
  events.map((e) => e.date).sort(),
);
assert.notEqual(
  dailyReading("Aries", start).text,
  dailyReading("Aries", new Date("2026-10-12T12:00:00Z")).text,
);
console.log(
  "Exploration checks passed: numerology conventions, all 144 zodiac pair scores, future events, and changing sky-based readings.",
);
