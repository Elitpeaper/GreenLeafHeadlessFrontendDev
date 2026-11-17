#!/usr/bin/env node
/**
 * First-load JS budget check (K-097 / K-263). Run after `next build`:
 *   node scripts/perf/first-load-js.mjs [route-html ...]
 * Reads the prerendered HTML in .next/server/app, gzips (level 9) every <script>/<link> chunk it references and
 * prints per-chunk sizes plus the total. Lazy chunks (import()) are not in the HTML, so they are excluded by design.
 * Next 16 + Turbopack no longer prints First Load JS in the build output; this script replaces that column.
 * Default routes: "/" and one content page. Exit code 1 when a total exceeds BUDGET_KB.
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const BUDGET_KB = { default: 220 }; // K-263 (ÖNERİ): store pages; framework alone is 167.6
const APP = ".next/server/app";
const files = process.argv.slice(2).length ? process.argv.slice(2) : ["index.html", "hakkimizda.html"];

let failed = false;
for (const file of files) {
  const html = fs.readFileSync(path.join(APP, file), "utf8");
  const srcs = [...new Set([...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1]))];
  const rows = srcs
    .map((s) => {
      const buf = fs.readFileSync(path.join(".next", s.replace("/_next/", "")));
      return { s, raw: buf.length, gz: zlib.gzipSync(buf, { level: 9 }).length };
    })
    .sort((a, b) => b.gz - a.gz);
  const total = rows.reduce((n, r) => n + r.gz, 0) / 1024;
  const budget = BUDGET_KB.default;
  console.log(`\n${file}`);
  for (const r of rows) console.log(`${(r.gz / 1024).toFixed(1).padStart(7)} KB gz ${(r.raw / 1024).toFixed(1).padStart(8)} KB  ${r.s}`);
  console.log(`  total ${total.toFixed(1)} KB gz in ${rows.length} scripts (budget ${budget})`);
  if (total > budget) failed = true;
}
process.exit(failed ? 1 : 0);
