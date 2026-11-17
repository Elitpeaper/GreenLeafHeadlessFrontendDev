// Step 2: fetch every product page once (resumable, cached per product id). 1 request at a time, >=1.1 s apart.
// Usage: node 02-fetch-products.mjs [--limit N] [--ids 1,2,3]
// Re-running skips everything already in .cache/pipeline/product-html/<id>.html.
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
import { PATHS, SHOP } from './config.mjs';
import { readJson, politeFetch, parseRobots, robotsAllows, stats } from './lib.mjs';

const arg = (k) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : null; };
const limit = +(arg('--limit') ?? Infinity); const only = arg('--ids')?.split(',').map(Number);
const index = readJson(path.join(PATHS.cache, 'shop-index.json'));
const robots = parseRobots((await politeFetch(SHOP.base + '/robots.txt', { cacheFile: path.join(PATHS.cache, 'robots.txt') })).text);

// reuse Phase-0 HTML cache when present (same URL => same md5 name scheme)
const legacyPath = (url) => { const h = crypto.createHash('md5').update(url).digest('hex').slice(0, 12); const s = url.replace(/^https?:\/\/[^/]+\/?/, '').replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 60); return path.join(PATHS.legacyShop, 'html', `${s}_${h}.html`); };
fs.mkdirSync(PATHS.productHtml, { recursive: true });
let todo = index.filter((p) => !only || only.includes(p.id));
let reused = 0, done = 0; const failed = [];
for (const p of todo) {
  const f = path.join(PATHS.productHtml, p.id + '.html');
  if (fs.existsSync(f)) continue;
  const lp = legacyPath(`${SHOP.base}/index.php?route=product/product&product_id=${p.id}`);
  if (fs.existsSync(lp)) { fs.copyFileSync(lp, f); reused++; }
}
todo = todo.filter((p) => !fs.existsSync(path.join(PATHS.productHtml, p.id + '.html')));
console.log(`index ${index.length}; reused from phase-0 cache ${reused}; to fetch ${todo.length}`);
for (const p of todo) {
  if (done >= limit) break;
  const u = new URL(p.url, SHOP.base);
  if (!robotsAllows(robots, u.pathname + u.search)) { failed.push({ id: p.id, why: 'robots' }); continue; }
  try {
    const r = await politeFetch(p.url, { cacheFile: path.join(PATHS.productHtml, p.id + '.html') });
    if (r.status !== 200) failed.push({ id: p.id, status: r.status });
  } catch (e) { failed.push({ id: p.id, why: String(e.message ?? e) }); }
  done++; if (done % 50 === 0) console.log(`fetched ${done}/${todo.length} (failed ${failed.length})`);
}
fs.writeFileSync(path.join(PATHS.cache, 'fetch-failures.json'), JSON.stringify(failed, null, 1));
console.log(`done: requests ${stats.requests}, failed ${failed.length}, remaining ${todo.length - done}`);
