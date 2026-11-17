// Runs the whole pipeline in order. Network steps (2, 6, 4b) are skipped with --no-fetch (cached files are still used by 4b/4c when present).
// Safe to re-run: everything is cached/resumable. Add --lock-slugs to freeze slugs into data/slug-lock.json (only when slugs are final).
import { spawnSync } from 'node:child_process';
import path from 'node:path'; import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const skipFetch = process.argv.includes('--no-fetch'); const lock = process.argv.includes('--lock-slugs');
const steps = [
  ['00-panel.mjs'], ['01-index.mjs'], ...(skipFetch ? [] : [['02-fetch-products.mjs'], ['02b-fetch-extra.mjs']]), ['03-parse-shop.mjs'], ['04-merge.mjs'],
  ...(skipFetch ? [] : [['06-fetch-thumbs.mjs']]), ['04b-images.mjs'], ['04c-palette.mjs'], ['04d-enrich.mjs'], ['04e-skin-tags.mjs'], ['05-validate.mjs', ...(lock ? ['--lock-slugs'] : [])],
];
for (const [s, ...args] of steps) {
  console.log(`\n=== ${s} ===`);
  const r = spawnSync(process.execPath, [path.join(dir, s), ...args], { stdio: 'inherit' });
  if (r.status !== 0) { console.error(`${s} failed (exit ${r.status})`); process.exit(r.status ?? 1); }
}
