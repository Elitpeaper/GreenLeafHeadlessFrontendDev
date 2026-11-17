import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { CLIENT_TEXT_PREFIXES } from "./fill.ts";

/**
 * Client components read copy through useT() from a server-picked subset (K-263). A key outside CLIENT_TEXT_PREFIXES
 * or missing from the dictionary would render as the raw key name; this test makes that a build-time failure.
 */
const root = path.resolve(import.meta.dirname, "../../..");
const dict: Record<string, unknown> = {
  ...JSON.parse(fs.readFileSync(path.join(root, "src/lib/ui-text/pending.tr.json"), "utf8")),
  ...JSON.parse(fs.readFileSync(path.join(root, "data/content/ui.tr.json"), "utf8")),
};

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(e.name)) out.push(p);
  }
  return out;
}

test("client components only use keys the server provides", () => {
  const files = walk(path.join(root, "src")).filter((f) => /ui-text\/client"/.test(fs.readFileSync(f, "utf8")) && !f.includes("ui-text"));
  assert.ok(files.length > 10);
  const problems: string[] = [];
  for (const f of files) {
    const src = fs.readFileSync(f, "utf8");
    // t("a.b"), tc("a.b", ...) and plain "ns.key" literals (e.g. SortSelect LABELS)
    const keys = new Set<string>();
    for (const m of src.matchAll(/\btc?\(\s*"([\w.]+)"/g)) keys.add(m[1]!);
    for (const m of src.matchAll(/:\s*"((?:listing|header|cart|megaMenu|search|common|favorites|product|blog|footer)\.[\w.]+)"/g)) keys.add(m[1]!);
    for (const k of keys) {
      const known = k in dict || `${k}_other` in dict;
      if (!known) problems.push(`${path.relative(root, f)}: missing key ${k}`);
      else if (!CLIENT_TEXT_PREFIXES.some((p) => k.startsWith(p))) problems.push(`${path.relative(root, f)}: key ${k} not in CLIENT_TEXT_PREFIXES`);
    }
  }
  assert.deepEqual(problems, []);
});
