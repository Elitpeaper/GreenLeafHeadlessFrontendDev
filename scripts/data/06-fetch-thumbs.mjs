// Step 6a: download the 250x250 shop thumbnails (used ONLY to compute colour palettes of "yakinda" products).
// Polite + resumable: 1 request at a time, >=1.1 s apart, robots.txt honoured, cached in .cache/pipeline/img-thumb/<shopId>.<ext>.
import fs from 'node:fs'; import path from 'node:path';
import { PATHS, SHOP } from './config.mjs';
import { readJson, writeJson, sleep, parseRobots, robotsAllows } from './lib.mjs';

const dir = path.join(PATHS.cache, 'img-thumb'); fs.mkdirSync(dir, { recursive: true });
const index = readJson(path.join(PATHS.cache, 'shop-index.json'));
const robots = parseRobots(fs.readFileSync(path.join(PATHS.cache, 'robots.txt'), 'utf8'));
const have = () => new Set(fs.readdirSync(dir).map((f) => f.split('.')[0]));
const done = have(); const failures = []; let n = 0, last = 0;
const todo = index.filter((p) => p.thumb && !done.has(String(p.id)));
console.log(`thumbs: ${done.size} cached, ${todo.length} to fetch`);
for (const p of todo) {
  const u = new URL(p.thumb);
  if (!robotsAllows(robots, u.pathname + u.search)) { failures.push({ id: p.id, why: 'robots' }); continue; }
  const wait = Math.max(0, last + SHOP.minDelayMs + Math.random() * SHOP.jitterMs - Date.now()); if (wait) await sleep(wait);
  last = Date.now();
  try {
    const res = await fetch(p.thumb, { headers: { 'User-Agent': SHOP.userAgent } });
    if (res.status !== 200) { failures.push({ id: p.id, why: res.status }); continue; }
    const ext = (path.extname(u.pathname) || '.png').toLowerCase();
    fs.writeFileSync(path.join(dir, `${p.id}${ext}`), Buffer.from(await res.arrayBuffer()));
  } catch (e) { failures.push({ id: p.id, why: String(e.message) }); }
  if (++n % 100 === 0) console.log(`fetched ${n}/${todo.length} (failed ${failures.length})`);
}
writeJson(path.join(PATHS.cache, 'thumb-failures.json'), failures);
console.log(`done: fetched ${n}, failed ${failures.length}`);
