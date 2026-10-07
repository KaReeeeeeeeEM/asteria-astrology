import templates from "./templates.json";
export type Language = "en" | "sw";
export type Catalog = Record<string, string>;
export const normalize = (text: string) => text.replace(/\s+/g, " ").trim();
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const patterns = templates
  .map(normalize)
  .sort((a, b) => b.length - a.length)
  .map((source) => ({
    source,
    regex: new RegExp(
      "^" +
        source
          .split(/\{\d+\}/)
          .map(escape)
          .join("(.+?)") +
        "$",
    ),
  }));
const lowerCache = new WeakMap<Catalog, Catalog>();
function lookup(catalog: Catalog, key: string) {
  if (catalog[key]) return catalog[key];
  let lower = lowerCache.get(catalog);
  if (!lower) {
    lower = Object.fromEntries(
      Object.entries(catalog).map(([k, v]) => [k.toLowerCase(), v]),
    );
    lowerCache.set(catalog, lower);
  }
  return lower[key.toLowerCase()];
}
export function translate(
  text: string,
  language: Language,
  catalog: Catalog,
): string {
  if (language === "en" || !/[A-Za-z]/.test(text)) return text;
  const source = normalize(text),
    direct = lookup(catalog, source);
  if (direct && direct !== source)
    return text.match(/^\s*/)?.[0] + direct + (text.match(/\s*$/)?.[0] || "");
  for (const pattern of patterns) {
    const m = source.match(pattern.regex),
      target = lookup(catalog, pattern.source);
    if (m && target) {
      return target.replace(/\{(\d+)\}/g, (_, i) =>
        translate(m[Number(i) + 1] ?? "", language, catalog),
      );
    }
  }
  const decorated = source.match(/^([^A-Za-z]+)([A-Za-z].*)$/);
  if (decorated && lookup(catalog, decorated[2]))
    return decorated[1] + translate(decorated[2], language, catalog);
  const pieces = text.split(/(?<=[.!?])\s+/);
  if (pieces.length > 1)
    return pieces.map((p) => translate(p, language, catalog)).join(" ");
  // Composed display labels combine translated data with numeric values.
  const parts = text.split(/(\s*[·→:—]\s*|\n+)/);
  if (parts.length > 1)
    return parts
      .map((p) =>
        /^[\s·→:—\n]+$/.test(p) ? p : translate(p, language, catalog),
      )
      .join("");
  return direct || text;
}
let runtimeLanguage: Language = "en",
  runtimeCatalog: Catalog = {};
export function setRuntimeLanguage(language: Language, catalog: Catalog) {
  runtimeLanguage = language;
  runtimeCatalog = catalog;
}
export function runtimeTranslate(text: string) {
  return translate(text, runtimeLanguage, runtimeCatalog);
}
