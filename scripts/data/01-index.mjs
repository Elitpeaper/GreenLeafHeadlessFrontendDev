// Step 1: build the shop product index (id, url, name, price, thumb, categories) + category tree.
// Default: seed from the Phase-0 snapshots (no network). If seed is missing: crawl category pages with the
// DEFAULT page size (16/page, ?page=N) -- never ?limit= (robots.txt forbids it). Use --recrawl to force the crawl.
import fs from 'node:fs'; import path from 'node:path';
import { PATHS, SHOP } from './config.mjs';
import { readJson, writeJson, politeFetch, parseRobots, robotsAllows, md5, decodeEntities, stripTags, stats } from './lib.mjs';

const out = path.join(PATHS.cache, 'shop-index.json');
const treeOut = path.join(PATHS.cache, 'shop-tree.json');
const recrawl = process.argv.includes('--recrawl');
const seedListing = path.join(PATHS.legacyShop, 'listing-products.json');
const seedCounts = path.join(PATHS.legacyShop, 'categories-counts.json');
const num = (s) => (s ? +String(s).replace(/[^\d.,]/g, '').replace(/\s/g, '').replace(',', '.') : null);
const canon = (u, id) => /product_id=/.test(u) ? `${SHOP.base}/index.php?route=product/product&product_id=${id}` : u.replace(/[?&](limit|page|path)=[^&]*/g, '').replace(/[?&]$/, '');
const BAD_NODE = /^(Раздел каталога)/;

if (!recrawl && fs.existsSync(seedListing) && fs.existsSync(seedCounts)) {
  const listing = readJson(seedListing); const counts = readJson(seedCounts);
  const nodes = counts.filter((n) => !n.path.some((p) => BAD_NODE.test(p)));
  const products = listing.map((p) => ({
    id: p.id, url: canon(p.url, p.id), name: p.name, priceRub: num(p.price), thumb: p.thumb,
    categories: [...new Set(p.cats.filter((c) => !BAD_NODE.test(c.split(' > ').pop())))],
  }));
  writeJson(out, products, 0); writeJson(treeOut, nodes.map((n) => ({ lvl: n.lvl, path: n.path, url: n.url, total: n.total })), 0);
  console.log(`seeded index: ${products.length} products, ${nodes.length} category nodes (no network)`);
} else {
  // ---- fallback crawl (standard pagination) ----
  const robots = parseRobots((await politeFetch(SHOP.base + '/robots.txt')).text);
  const get = async (url) => {
    const u = new URL(url); if (!robotsAllows(robots, u.pathname + u.search)) throw new Error('robots.txt disallows ' + url);
    return (await politeFetch(url, { cacheFile: path.join(PATHS.listingHtml, md5(url).slice(0, 16) + '.html') })).text;
  };
  const home = decodeEntities(await get(SHOP.base + '/'));
  const strip = (s) => stripTags(s);
  const nodes = [];
  for (const s of home.split(/<section id="gl-catalog-section-/).slice(1)) {
    const t1 = strip(s.match(/<h2>([\s\S]*?)<\/h2>/)[1]); nodes.push({ lvl: 1, path: [t1], url: s.match(/<h2>[\s\S]*?<a href="([^"]+)"/)[1] });
    for (const g of s.split('<div class="gl-shell-group">').slice(1)) {
      const t = g.match(/<a class="gl-shell-group__title" href="([^"]+)">([\s\S]*?)<\/a>/); if (!t) continue;
      const t2 = strip(t[2]); nodes.push({ lvl: 2, path: [t1, t2], url: t[1] });
      for (const li of g.matchAll(/<li><a href="([^"]+)">[\s\S]*?<span>([\s\S]*?)<\/span>/g)) nodes.push({ lvl: 3, path: [t1, t2, strip(li[2])], url: li[1] });
    }
  }
  const prods = new Map();
  for (const n of nodes.filter((x) => !x.path.some((p) => BAD_NODE.test(p)))) {
    let page = 1, pages = 1;
    do {
      const url = page === 1 ? n.url : n.url + (n.url.includes('?') ? '&' : '?') + 'page=' + page; // ?page=N (non-empty) is allowed
      const html = decodeEntities(await get(url));
      pages = +(html.match(/Страниц: (\d+)/)?.[1] ?? 1); n.total = +(html.match(/Показано с \d+ по \d+ из (\d+)/)?.[1] ?? 0);
      for (const a of html.split('<article class="gcp-card">').slice(1)) {
        const id = +a.match(/name="product_id" value="(\d+)"/)?.[1]; if (!id) continue;
        const e = prods.get(id) ?? { id, url: canon(a.match(/<h3><a href="([^"]+)"/)?.[1] ?? '', id), name: strip(a.match(/<h3><a [^>]*>([\s\S]*?)<\/a>/)?.[1] ?? ''), priceRub: num(a.match(/gcp-price">([^<]+)</)?.[1]), thumb: a.match(/<img src="([^"]+)"/)?.[1], categories: [] };
        e.categories.push(n.path.join(' > ')); prods.set(id, e);
      }
      page++;
    } while (page <= pages);
    console.log(n.path.join(' > '), n.total, 'req', stats.requests);
  }
  writeJson(out, [...prods.values()], 0); writeJson(treeOut, nodes, 0);
  console.log(`crawled index: ${prods.size} products, ${nodes.length} nodes`);
}
