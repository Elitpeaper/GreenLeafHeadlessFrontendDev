// Step 3: parse cached product pages -> .cache/pipeline/shop-parsed.json (model code, RU short description, images, stock, points).
// Pure function of the cache: idempotent, no network.
import fs from 'node:fs'; import path from 'node:path';
import { PATHS, SHOP_EXTRA_IDS } from './config.mjs';
import { readJson, writeJson, decodeEntities, stripTags } from './lib.mjs';

const cut = (h) => { const i = h.indexOf('id="product-info"'); const s = h.slice(i < 0 ? 0 : i); const j = s.indexOf('<footer'); return j < 0 ? s : s.slice(0, j); };

/** First meaningful paragraph of the RU description, trimmed to <= max chars on a sentence/word boundary. */
export function shortDescription(descHtml, max = 320) {
  const ps = [...descHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => stripTags(m[1])).filter((t) => t.length > 25);
  let t = ps[0] ?? '';
  if (!t) { t = stripTags(descHtml.replace(/<h2>[\s\S]*?<\/h2>/, '')); }
  if (t.length <= max) return t;
  const cutAt = t.slice(0, max); const sent = Math.max(cutAt.lastIndexOf('. '), cutAt.lastIndexOf('! '));
  if (sent > 120) return cutAt.slice(0, sent + 1);
  const sp = cutAt.lastIndexOf(' '); return cutAt.slice(0, sp > 0 ? sp : max).replace(/[,;:\s]+$/, '') + '…';
}

export function parseProduct(html) {
  const raw = cut(html); const main = decodeEntities(raw); const g = (re, s = main) => re.exec(s)?.[1];
  const descRaw = g(/id="tab-description"[^>]*>([\s\S]*?)<\/div>\s*(?:<div id="tab-|<\/div>)/, raw) ?? '';
  const crumbs = [...(main.match(/<ol class="gl-c-crumbs">([\s\S]*?)<\/ol>/)?.[1] ?? '').matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => stripTags(m[1])).filter(Boolean);
  const images = [...new Set([...main.matchAll(/(?:href|src)="(https?:\/\/[^"]*\/image\/[^"]+)"/g)].map((m) => m[1]).filter((u) => /\/product\//.test(u) && !/-(?:250x250|500x500)\./.test(u)))];
  const h1 = stripTags(g(/<h1>([\s\S]*?)<\/h1>/) ?? '');
  return {
    id: +g(/name="product_id" value="(\d+)"/) || null,
    h1,
    model: stripTags(g(/<li>Модель ([^<]*)<\/li>/) ?? '') || null,
    stock: stripTags(g(/greenleaf-stock">([\s\S]*?)<\/li>/) ?? '') || null,
    points: g(/Цена в бонусных баллах: (\d+)/) ? +g(/Цена в бонусных баллах: (\d+)/) : null,
    crumbs, images,
    descriptionHtml: descRaw.trim(),
    shortDescription_ru: shortDescription(descRaw),
  };
}

if (import.meta.url === new URL(process.argv[1], 'file:///').href || process.argv[1]?.endsWith('03-parse-shop.mjs')) {
  const index = readJson(path.join(PATHS.cache, 'shop-index.json'));
  const out = {}; let missing = 0, noModel = 0;
  for (const p of [...index, ...SHOP_EXTRA_IDS.map((id) => ({ id }))]) {
    const f = path.join(PATHS.productHtml, p.id + '.html');
    if (!fs.existsSync(f)) { missing++; continue; }
    const r = parseProduct(fs.readFileSync(f, 'utf8'));
    if (!r.model) noModel++;
    out[p.id] = r;
  }
  writeJson(path.join(PATHS.cache, 'shop-parsed.json'), out, 0);
  console.log(`parsed ${Object.keys(out).length}/${index.length + SHOP_EXTRA_IDS.length} pages (not yet fetched: ${missing}; parsed without model code: ${noModel})`);
}
