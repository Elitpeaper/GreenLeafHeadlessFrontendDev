// Step 2b: fetch the few shop products that exist but are not listed in any category page (config.SHOP_EXTRA_IDS). Cached, polite, robots-checked.
import fs from 'node:fs'; import path from 'node:path';
import { PATHS, SHOP, SHOP_EXTRA_IDS } from './config.mjs';
import { politeFetch, parseRobots, robotsAllows } from './lib.mjs';
const robots = parseRobots(fs.readFileSync(path.join(PATHS.cache, 'robots.txt'), 'utf8'));
fs.mkdirSync(PATHS.productHtml, { recursive: true });
for (const id of SHOP_EXTRA_IDS) {
  const url = `${SHOP.base}/index.php?route=product/product&product_id=${id}`;
  if (!robotsAllows(robots, '/index.php?route=product/product&product_id=' + id)) { console.log('robots disallows', id); continue; }
  const r = await politeFetch(url, { cacheFile: path.join(PATHS.productHtml, id + '.html') });
  console.log(`extra ${id}: HTTP ${r.status}${r.cached ? ' (cached)' : ''}`);
}
