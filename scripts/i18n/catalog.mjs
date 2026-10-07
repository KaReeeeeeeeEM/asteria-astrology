import fs from "node:fs";
const path = "src/i18n/sw.json";
const catalog = JSON.parse(fs.readFileSync(path));
const overrides = JSON.parse(fs.readFileSync("src/i18n/sw-overrides.json"));
Object.assign(catalog, overrides);
// Apply reviewed sentence translations to longer paragraphs as well.
for (const key of Object.keys(catalog)) {
  if (overrides[key]) continue;
  const parts = key.split(/(?<=[.!?])\s+/);
  if (parts.length > 1 && parts.some((p) => overrides[p]))
    catalog[key] = parts.map((p) => overrides[p] ?? catalog[p] ?? p).join(" ");
}
fs.writeFileSync(path, JSON.stringify(catalog, null, 2) + "\n");
const source = JSON.parse(fs.readFileSync("src/i18n/source.json"));
const missing = source.filter((s) => !(s in catalog));
if (missing.length)
  throw new Error(`Missing translations: ${missing.join("\n")}`);
console.log(
  `Checked ${source.length} catalogue entries; ${Object.keys(overrides).length} reviewed overrides.`,
);
