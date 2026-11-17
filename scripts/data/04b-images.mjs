// Step 4b: download + optimise images of TR (availability=tr) products -> public/products/<slug>/main.webp (+ gallery-2.webp ...), max 800 px.
// "yakinda" products keep their remote URLs (K-038/K-039). Polite (1 req / >=1.1 s), cached originals in .cache/pipeline/img-orig/, resumable.
// Writes .cache/pipeline/images.json : { <productId>: { slug, files: [{ file, remote, source, width, height, bytes }], failed: [...] } }
// Originals are NOT copied to public/ (xlsx PNGs are up to 11 MB); they stay in .cache/pipeline/img-orig/ (re-downloadable from the remote URL).
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
import sharp from 'sharp';
import { ROOT, PATHS, SHOP } from './config.mjs';
import { readJson, writeJson, sleep, parseRobots, robotsAllows } from './lib.mjs';

const MAX = 800, QUALITY = 82, MAX_GALLERY = 4;
const merged = readJson(path.join(PATHS.cache, 'merged.json'));
const outRoot = path.join(ROOT, 'public', 'products'); const origDir = path.join(PATHS.cache, 'img-orig');
fs.mkdirSync(origDir, { recursive: true }); fs.mkdirSync(outRoot, { recursive: true });
const robots = parseRobots(fs.readFileSync(path.join(PATHS.cache, 'robots.txt'), 'utf8')); // shop robots; panel host serves static files under /data/files
const prev = readJson(path.join(PATHS.cache, 'images.json'), {});
let last = 0;
const hash = (u) => crypto.createHash('md5').update(u).digest('hex').slice(0, 12);

async function download(url) {
  const ext = (path.extname(new URL(url).pathname) || '.img').toLowerCase();
  const f = path.join(origDir, hash(url) + ext);
  if (fs.existsSync(f)) return f;
  if (url.includes('global.green-leaf.shop')) { const u = new URL(url); if (!robotsAllows(robots, u.pathname + u.search)) throw new Error('robots'); }
  const wait = Math.max(0, last + SHOP.minDelayMs + Math.random() * SHOP.jitterMs - Date.now()); if (wait) await sleep(wait);
  last = Date.now();
  const res = await fetch(url, { headers: { 'User-Agent': SHOP.userAgent } });
  if (res.status !== 200) throw new Error('HTTP ' + res.status);
  fs.writeFileSync(f, Buffer.from(await res.arrayBuffer()));
  return f;
}
// 9x8 difference hash to drop gallery images that are the same picture as one already kept
async function dhash(file) {
  const px = await sharp(file, { limitInputPixels: false }).flatten({ background: '#fff' }).resize(9, 8, { fit: 'fill' }).greyscale().raw().toBuffer();
  let h = ''; for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) h += px[y * 9 + x] > px[y * 9 + x + 1] ? '1' : '0'; return h;
}
const ham = (a, b) => [...a].reduce((n, c, i) => n + (c !== b[i] ? 1 : 0), 0);

const result = {};
const tr = merged.products.filter((p) => p.availability === 'tr');
for (const p of tr) {
  const dir = path.join(outRoot, p.slug); fs.mkdirSync(dir, { recursive: true });
  const files = [], failed = [], hashes = [];
  let n = 0;
  for (const im of p.images) {
    if (files.length >= 1 + MAX_GALLERY) break;
    try {
      const orig = await download(im.src);
      const hh = await dhash(orig);
      if (hashes.some((x) => ham(x, hh) <= 6)) { failed.push({ remote: im.src, why: 'duplicate-of-earlier-image' }); continue; }
      hashes.push(hh); n++;
      const name = n === 1 ? 'main.webp' : `gallery-${n}.webp`;
      const info = await sharp(orig, { limitInputPixels: false }).rotate().resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true }).webp({ quality: QUALITY, effort: 5 }).toFile(path.join(dir, name));
      files.push({ file: `/products/${p.slug}/${name}`, remote: im.src, source: im.source, width: info.width, height: info.height, bytes: info.size });
    } catch (e) { failed.push({ remote: im.src, why: String(e.message) }); }
  }
  // remove stale files of this product dir that are no longer produced
  for (const f of fs.readdirSync(dir)) if (!files.some((x) => x.file.endsWith('/' + f))) fs.rmSync(path.join(dir, f));
  if (!files.length) fs.rmSync(dir, { recursive: true, force: true });
  result[p.id] = { slug: p.slug, files, failed };
  console.log(`${p.code || p.id}: ${files.length} image(s)${failed.length ? ` (${failed.length} skipped/failed)` : ''}`);
}
// prune product dirs left from earlier runs (slug changed / product gone) — only dirs this script previously created
for (const [id, r] of Object.entries(prev)) if (r.slug && result[id]?.slug !== r.slug) fs.rmSync(path.join(outRoot, r.slug), { recursive: true, force: true });
writeJson(path.join(PATHS.cache, 'images.json'), result, 1);
const total = Object.values(result).reduce((a, r) => a + r.files.length, 0);
console.log(`images: ${total} files for ${Object.values(result).filter((r) => r.files.length).length}/${tr.length} TR products`);
