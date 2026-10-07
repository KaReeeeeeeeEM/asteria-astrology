import assert from "node:assert/strict";
import catalog from "../src/i18n/sw.json";
import templates from "../src/i18n/templates.json";
import { translate, normalize } from "../src/i18n/translation";
import { articles, signs } from "../src/lib/knowledge";
import { numerology, zodiacMatch } from "../src/lib/explorations";
import { dailyReading } from "../src/lib/astrology";
import {
  buildNumerologyReading,
  numerologyReportMarkdown,
} from "../src/lib/numerology-readings";
const t = (text: string) => translate(text, "sw", catalog);
const prose: string[] = [];
for (const article of articles) {
  prose.push(
    article.title,
    article.intro,
    ...article.sections.flatMap((s) => [s.title, s.text]),
  );
}
for (const sign of signs) {
  prose.push(sign.archetype, sign.description, sign.gift, sign.growth);
  const reading = dailyReading(sign.name, new Date("2026-10-07T12:00:00Z"));
  prose.push(reading.title, reading.text, reading.connection, reading.focus);
}
for (let day = 1; day <= 28; day++) {
  const date = `1990-07-${String(day).padStart(2, "0")}`;
  for (let year = 2026; year <= 2034; year++) {
    const result = numerology(date, year),
      report = buildNumerologyReading(result);
    for (const section of report.sections) {
      prose.push(
        section.label,
        section.title,
        section.introduction,
        ...section.paragraphs,
        ...section.details.flatMap((d) => [d.title, d.text]),
      );
    }
    prose.push(...report.synthesis, result.steps);
    const download = numerologyReportMarkdown(
      date,
      result,
      "My private note",
      t,
    );
    assert(download.includes("My private note"));
    assert(download.includes("https://www.numerology.com/"));
    assert(!download.includes("## Calculation"));
  }
}
for (const a of signs)
  for (const b of signs) {
    const match = zodiacMatch(a.name, b.name);
    prose.push(...match.scores.map((s) => s.label));
  }
const fallback = [...new Set(prose)].filter((text) => text && t(text) === text);
assert.deepEqual(
  fallback,
  [],
  `Untranslated reading content: ${fallback.join("\n")}`,
);
for (const pattern of templates) {
  const source = normalize(pattern);
  if (
    /(Bearer|class|art-|zodiac-|typewriter|wheel-|path=|https:|max-width|asteria_language)/.test(
      source,
    )
  )
    continue;
  const output = t(source);
  assert(
    !/88[78]\d{3}|987\d{3}/.test(output),
    `Corrupted placeholders: ${source}`,
  );
}
assert.equal(t("  Birth date  "), "  Tarehe ya kuzaliwa  ");
assert.equal(t("♌︎ Leo"), "♌︎ Simba (Leo)");
assert.match(
  t("Month 7 → 7 · Day 17 → 8 · Year 1990 → 1 · Total 16 → 7"),
  /^Mwezi 7/,
);
assert.equal(translate("Birth date", "en", catalog), "Birth date");
console.log(
  `English/Swahili coverage passed for ${articles.length} articles, ${signs.length} signs, 252 numerology readings, daily readings and all zodiac pairs.`,
);
