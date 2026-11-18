#!/usr/bin/env node
/**
 * First-load JS budget check (K-097 / K-263). Run after `next build`:
 *   node scripts/perf/first-load-js.mjs [route-html ...]
 * Reads the prerendered HTML in .next/server/app, gzips (level 9) every <script>/<link> chunk it references and
 * prints per-chunk sizes plus the total. Lazy chunks (import()) are not in the HTML, so they are excluded by design.
 * Next 16 + Turbopack no longer prints First Load JS in the build output; this script replaces that column.
 * Default routes: "/", /urunler, one PDP, /sss, /hakkimizda. Exit code 1 when a total exceeds BUDGET_KB or a route is missing.
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const BUDGET_KB = { default: 220 }; // K-263 (ÖNERİ): store pages; framework alone is 167.6
const APP = ".next/server/app";
// One prerendered product page (PDP): first concrete urun/<slug>.html, skipping the [slug] fallback shell.
function firstPdp() {
  const dir = path.join(APP, "urun");
  if (!fs.existsSync(dir)) return null;
  const f = fs.readdirSync(dir).filter((n) => n.endsWith(".html") && !n.startsWith("[")).sort()[0];
  return f ? `urun/${f}` : null;
}
const DEFAULT_ROUTES = ["index.html", "urunler.html", firstPdp(), "sss.html", "hakkimizda.html"].filter(Boolean);
const files = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_ROUTES;

let failed = false;
const summary = [];
for (const file of files) {
  if (!fs.existsSync(path.join(APP, file))) {
    console.error(`\n${file}: not found in ${APP} (run \`npm run build\` first)`);
    failed = true;
    continue;
  }
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
  summary.push({ file, total, budget });
  if (total > budget) failed = true;
}
console.log("\nsummary (KB gz, first load)");
for (const r of summary) console.log(`${r.total.toFixed(1).padStart(7)} / ${r.budget}  ${r.total > r.budget ? "OVER" : "ok  "}  ${r.file}`);
process.exit(failed ? 1 : 0);
