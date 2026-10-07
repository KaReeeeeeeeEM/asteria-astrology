import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
const strings = new Set(),
  templates = new Set();
function add(s) {
  s = s.replace(/\s+/g, " ").trim();
  if (
    !/[A-Za-z]/.test(s) ||
    s.startsWith("/") ||
    /^(https?:|@\/|\.\/|\.\.\/)/.test(s) ||
    s.length < 2
  )
    return;
  if (s.length > 20 && !s.includes(" ") && s.includes("-")) return;
  strings.add(s);
  for (const x of s.split(/(?<=[.!?])\s+/)) if (x.length > 18) strings.add(x);
}
function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!["i18n", "fonts"].includes(f)) scan(p);
      continue;
    }
    if (!/\.tsx?$/.test(p)) continue;
    const text = fs.readFileSync(p, "utf8");
    const file = ts.createSourceFile(
      p,
      text,
      ts.ScriptTarget.Latest,
      true,
      p.endsWith("tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    function walk(n) {
      if (ts.isJsxText(n)) add(n.getText(file));
      if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
        if (
          !ts.isImportDeclaration(n.parent) &&
          !ts.isImportSpecifier(n.parent) &&
          !(
            ts.isJsxAttribute(n.parent) &&
            [
              "className",
              "href",
              "src",
              "id",
              "value",
              "name",
              "type",
              "variant",
              "size",
              "data-slot",
            ].includes(n.parent.name.text)
          )
        )
          add(n.text);
      }
      if (ts.isTemplateExpression(n)) {
        let s = n.head.text;
        n.templateSpans.forEach((x, i) => (s += `{${i}}` + x.literal.text));
        if (/[A-Za-z]/.test(s) && s.includes(" ")) {
          add(s);
          templates.add(s);
        }
      }
      ts.forEachChild(n, walk);
    }
    walk(file);
  }
}
scan("src");
const entries = [...strings].sort();
fs.writeFileSync(
  "src/i18n/source.json",
  JSON.stringify(entries, null, 2) + "\n",
);
fs.writeFileSync(
  "src/i18n/templates.json",
  JSON.stringify([...templates].sort(), null, 2) + "\n",
);
console.log({
  entries: entries.length,
  templates: templates.size,
  characters: entries.join("").length,
});
