// Step 4: clean + merge panel (TR commercial truth) + xlsx + August catalog + RU shop -> .cache/pipeline/merged.json
// Inputs : .cache/pipeline/panel.json (step 0), shop-index/tree/parsed (steps 1-3),
//          .cache/yerel/xlsx-products.json + catalog-products.json (Phase-0 snapshots of the local xlsx / catalog; "Bilgi" sheet never read)
// Priority: commercial fields (price, PV, boxQty)  panel > xlsx.  TR name: catalog (curated, verified vs RU) > panel title.tr > xlsx > "".
//           wide catalog (K-038) = RU shop.  "yakinda" products: no price (K-036); PV = shop bonus points / 100 (K-062, ratio verified below).
// RUB is stored ONLY in _source.rubPrice.
import path from 'node:path';
import { PATHS, SHOP, SHOP_EXTRA_IDS, LIST_PRICE_MULTIPLIER, NAME_CONFLICT_CODES, PRICE_REVIEW_CODES, TR_CATEGORY_GUESS } from './config.mjs';
import { readJson, writeJson, slugify, normCode } from './lib.mjs';
import { CONSUMER, TR_CATALOG_TO_PARENT, TR_CODE_OVERRIDES, primaryConsumer, mapPath, CONSUMER_PARENT_TITLE, CONSUMER_CHILD_TITLE } from './category-map.mjs';
import { shortDescription } from './03-parse-shop.mjs';

const index0 = readJson(path.join(PATHS.cache, 'shop-index.json'));
const tree = readJson(path.join(PATHS.cache, 'shop-tree.json'));
const parsed = readJson(path.join(PATHS.cache, 'shop-parsed.json'));
const panel = readJson(path.join(PATHS.cache, 'panel.json'));
const xlsx = readJson(path.join(PATHS.legacyLocal, 'xlsx-products.json'));
const catalog = readJson(path.join(PATHS.legacyLocal, 'catalog-products.json'));
// products missing from the category listings (config.SHOP_EXTRA_IDS): synthetic index entries from the parsed product page
const index = [...index0, ...SHOP_EXTRA_IDS.filter((id) => parsed[id] && !index0.some((x) => x.id === id)).map((id) => {
  const pg = parsed[id]; const crumbs = pg.crumbs.slice(0, -1); const categories = crumbs.map((_, i) => crumbs.slice(0, i + 1).join(' > '));
  return { id, url: `${SHOP.base}/index.php?route=product/product&product_id=${id}`, name: pg.h1, priceRub: null, thumb: null, categories, extra: true };
})];
const slugLock = readJson(path.join(PATHS.data, 'slug-lock.json'), {});
const panelContent = readJson(path.join(PATHS.cache, 'panel-content-ru.json'), {}); // { panelId: html } written by step 0

// ---------------- brands ----------------
const BRANDS = [
  ['carich', 'CARICH', ['CARICH']], ['sealuxe', 'SEALUXE', ['SEALUXE']], ['kardli', 'KARDLI', ['KARDLI']], ['ilife', 'iLiFE', ['ILIFE']],
  ['greenleaf', 'Greenleaf', ['GREENLEAF']], ['nilrich', 'Nilrich', ['NILRICH', 'NIRLICH', 'NLIRICH']], ['marvisia', 'MARVISIA', ['MARVISIA']],
  ['yibeile', 'YIBEILE', ['YIBEILE', 'YIBEIL', 'YIBELLE']], ['maiweis', 'MAIWEIS', ['MAIWEIS']], ['pinkpoint', 'Pink Point', ['PINK POINT', 'PINKPOINT']],
  ['okfad', 'OKFAD', ['OKFAD']], ['jiadeli', 'JIADELI', ['JIADELI']], ['berclean', 'BERCLEAN', ['BERCLEAN']], ['yuezhonggui', 'YUE ZHONGGUI', ['YUE ZHONGGUI', 'YUEZHONGGUI']],
  ['suting', 'SUTING', ['SUTING']], ['yijian', 'YIJIAN', ['YIJIAN']], ['newitz', 'NEWITZ', ['NEWITZ']], ['morefuture', 'MOREFUTURE', ['MOREFUTURE']], ['limancy', 'LIMANCY', ['LIMANCY']],
  ['kailanduo', 'KAILANDUO', ['KAILANDUO']], ['zhengai', 'ZHENGAI', ['ZHENGAI']], ['miaorou', 'MIAOROU', ['MIAOROU']], ['moonflore', 'MOON FLORE', ['MOON FLORE']],
  ['marion', 'MARION', ['MARION']], ['easylove', 'EASYLOVE', ['EASYLOVE']], ['surefire', 'SUREFIRE', ['SUREFIRE']],
  ['bluepoint', 'BLUE POINT', ['BLUE POINT', 'BLUEPOINT']], ['jinghuxi', 'JINGHUXI', ['JINGHUXI']],
];
const ALIAS = BRANDS.flatMap(([slug, , al]) => al.map((a) => [a, slug])).sort((a, b) => b[0].length - a[0].length);
const normHead = (t) => t.replace(/^\([^)]*\)\s*/, '').toUpperCase().replace(/[^A-ZА-Я0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
function detectBrand(title) {
  const h = normHead(title);
  for (const [a, slug] of ALIAS) if (h === a || h.startsWith(a + ' ')) return slug;
  return null;
}

// ---------------- RU name cleaning ----------------
const BOX_PAREN = /\(\s*(?:Кол-?во\s+в\s+коробк[еа]|в\s+коробк[еа]|в\s+корбока|коробка|корбока)\s*[:\-]?\s*(\d+)\s*(?:шт|ст|пар|штук)?\.?\s*\)\s*/i;
const BOX_NOOPEN = /^\s*Кол-?во\s+в\s+коробке\s+(\d+)\s*шт\.?\s*\)\s*/i; // source typo: missing "("
const BOX_LOOSE = /(?:^|[\s,(])(?:в\s+коробке|коробка)\s*[:\-]?\s*(\d+)\s*(?:шт|штук|пар)\.?\)?/i;
function cleanRu(name) {
  let n = name.trim(); let box = null;
  let m = n.match(BOX_PAREN);
  if (m) { box = +m[1]; n = n.replace(BOX_PAREN, ''); }
  else if ((m = n.match(BOX_NOOPEN))) { box = +m[1]; n = n.replace(BOX_NOOPEN, ''); }
  else if ((m = n.match(BOX_LOOSE))) { box = +m[1]; n = n.replace(m[0], ' '); }
  n = n.replace(/\(\s*\)/g, '').replace(/\s{2,}/g, ' ').replace(/^[\s,.;:-]+|[\s,;:-]+$/g, '').trim();
  return { title: n, boxQty: box };
}
const normTitle = (t) => cleanRu(t ?? '').title.toLowerCase().replace(/[^a-zа-я0-9]+/g, ' ').trim();
const volumeOf = (t) => { const m = /(\d+(?:[.,]\d+)?)\s*(мл|г|кг|л)(?![а-я])/i.exec(t ?? ''); return m ? `${m[1].replace(',', '.')} ${{ мл: 'ml', г: 'g', кг: 'kg', л: 'L' }[m[2].toLowerCase()]}` : null; };

// ---------------- shop records ----------------
const fixThumb = (u) => u?.replace(/-250x250(\.\w+)$/, '-800x800$1');
const shopRecs = index.map((p) => {
  const pg = parsed[p.id]; const { title, boxQty } = cleanRu(p.name);
  const needs = [];
  if (/\?{3,}/.test(p.name)) needs.push('name-corrupt');
  if (!pg) needs.push('page-not-fetched');
  const model = pg?.model ? normCode(pg.model) : null;
  if (pg && !model) needs.push('no-model-code');
  let images = (pg?.images ?? []).map((src) => ({ src, thumb: p.thumb ?? null, source: 'RU' }));
  if (!images.length && p.thumb) { images = [{ src: fixThumb(p.thumb), thumb: p.thumb, source: 'RU' }]; needs.push('image-derived-from-thumb'); }
  const cons = primaryConsumer(p.categories);
  return {
    shopId: p.id, url: p.url, rawName: p.name, title_ru: title, boxQty, model, rubPrice: p.priceRub, pointsRu: pg?.points ?? null, stockRu: pg?.stock ?? null,
    shortDescription_ru: pg?.shortDescription_ru ?? '', descriptionHtml: pg?.descriptionHtml ?? '', images, categories: p.categories, cons, brand: detectBrand(title), needs,
  };
});
const byModel = new Map();
for (const r of shopRecs) if (r.model) { if (!byModel.has(r.model)) byModel.set(r.model, []); byModel.get(r.model).push(r); }
const byTitle = new Map(); for (const r of shopRecs) { const k = normTitle(r.title_ru); if (k) (byTitle.get(k) ?? byTitle.set(k, []).get(k)).push(r); }
const shopFor = (code, titleRu) => {
  for (const c of code ? [code, ...code.split('/')] : []) { const m = byModel.get(c); if (m) return { shop: m.slice().sort((a, b) => a.shopId - b.shopId)[0], multi: m.length > 1, how: 'code' }; }
  const t = byTitle.get(normTitle(titleRu)); if (t?.length === 1) return { shop: t[0], multi: false, how: 'title' };
  return { shop: null, multi: false, how: null };
};

// ---------------- TR records: panel (top) ∪ xlsx ∪ catalog ----------------
const xl = new Map(xlsx.map((x) => [normCode(x.code), x]));
const cat = new Map(catalog.map((c) => [normCode(c.code), c]));
const trRecs = panel.records.map((p) => ({ p, code: p.code, x: xl.get(p.code) ?? null }));
const panelCodes = new Set(panel.records.map((p) => p.code));
for (const x of xlsx) if (!panelCodes.has(normCode(x.code))) trRecs.push({ p: null, code: normCode(x.code), x });
for (const t of trRecs) { t.c = cat.get(t.code) ?? null; Object.assign(t, shopFor(t.code, t.p?.title_ru_raw ?? '')); }
const usedShop = new Set(trRecs.filter((t) => t.shop).map((t) => t.shop.shopId));

// ---------------- build products ----------------
const warnings = []; const logs = { priceMismatch: [], xlsxPriceDiff: [], pvXlsxDiff: [], pvShopCheck: { compared: 0, equal: 0, diffs: [], noShopPoints: [] } };
const products = [];
const FLAG_FROM_PANEL = { 'client-not-above-base': 'price-client-not-above-member', 'client-not-2x-base': 'price-client-not-2x' };
const r2 = (n) => Math.round(n * 100) / 100;

for (const t of trRecs) {
  const { p, x, c, shop } = t; const needs = [];
  if (!p) needs.push('panel-missing');
  if (!x) needs.push('not-in-xlsx');
  if (NAME_CONFLICT_CODES.includes(t.code)) needs.push('name-conflict');
  if (!c) needs.push('no-catalog-text');
  if (!shop) needs.push('no-shop-match'); else if (t.how === 'title') needs.push('shop-matched-by-title');
  if (t.multi) needs.push('shop-multi-match');
  if (!t.code) needs.push('no-code');
  const rawRu = p?.title_ru_raw ?? '';
  const cleaned = shop ? { title: shop.title_ru, boxQty: shop.boxQty } : cleanRu(rawRu);
  const title_tr = (c?.name_clean ?? p?.title_tr_usable ?? x?.name_clean ?? '').trim();
  if (!title_tr) needs.push('title-tr-missing');
  // --- price (K-036): member = panel base; list = panel client when it is a real higher tier, else member x LIST_PRICE_MULTIPLIER
  const member = p?.memberPrice ?? x?.price ?? null;
  let list = member != null ? r2(member * LIST_PRICE_MULTIPLIER) : null; let priceSource = 'derived-x' + LIST_PRICE_MULTIPLIER;
  if (p) {
    for (const f of p.flags) { needs.push(FLAG_FROM_PANEL[f]); logs.priceMismatch.push({ code: t.code || `panel-${p.panelId}`, member: p.memberPrice, client: p.clientPrice, flag: f }); }
    if (p.clientPrice != null && p.clientPrice > p.memberPrice) { list = r2(p.clientPrice); priceSource = 'panel-client'; }
  }
  if (x && p && Math.abs(x.price - p.memberPrice) > 0.005) { needs.push('price-xlsx-mismatch'); logs.xlsxPriceDiff.push({ code: t.code, panel: p.memberPrice, xlsx: x.price }); }
  if (PRICE_REVIEW_CODES.includes(t.code)) needs.push('price-implausible');
  // --- PV (K-062): panel > xlsx > shop points / 100
  let pv = null, pvSource = null;
  if (p?.pv != null) { pv = p.pv; pvSource = 'panel'; } else if (x?.pv != null) { pv = x.pv; pvSource = 'xlsx'; } else if (shop?.pointsRu != null) { pv = shop.pointsRu / 100; pvSource = 'shop-points'; }
  if (pv == null) needs.push('pv-missing');
  if (p && x && x.pv != null && p.pv != null && Math.abs(x.pv - p.pv) > 1e-9) logs.pvXlsxDiff.push({ code: t.code, panel: p.pv, xlsx: x.pv });
  if (p?.pv != null && shop) {
    if (shop.pointsRu == null) logs.pvShopCheck.noShopPoints.push(t.code);
    else { logs.pvShopCheck.compared++; if (Math.abs(shop.pointsRu / 100 - p.pv) < 1e-9) logs.pvShopCheck.equal++; else logs.pvShopCheck.diffs.push({ code: t.code, panelPv: p.pv, shopPoints: shop.pointsRu }); }
  }
  // --- category
  let parent = TR_CATALOG_TO_PARENT[c?.category] ?? null, child = null;
  if (shop?.cons && shop.cons.parent === parent) child = shop.cons.child;
  if (!parent && shop?.cons) { parent = shop.cons.parent; child = shop.cons.child; needs.push('category-from-shop'); }
  const guessKey = t.code || `panel-${p?.panelId}`;
  if (TR_CODE_OVERRIDES[t.code]) [parent, child] = TR_CODE_OVERRIDES[t.code];
  else if (!parent && TR_CATEGORY_GUESS[guessKey]) { [parent, child] = TR_CATEGORY_GUESS[guessKey]; needs.push('category-guess'); }
  const brandSlug = detectBrand(title_tr) ?? detectBrand(cleaned.title) ?? shop?.brand ?? 'greenleaf';
  // --- images: xlsx URL (XL) first, then RU shop gallery
  const images = [];
  if (x?.imageUrl) images.push({ src: x.imageUrl, thumb: null, source: 'XL' });
  for (const im of shop?.images ?? []) images.push({ ...im });
  if (!images.length) needs.push('no-image');
  const vol = c?.volume && c.volume !== '—' ? c.volume : (x?.volume ?? volumeOf(cleaned.title));
  const content = p ? (panelContent[p.panelId] ?? '') : '';
  const sd_ru = shop?.shortDescription_ru ?? (content ? shortDescription(content) : '');
  const isSet = !!x?.isSet || /^T\d{3}$/.test(t.code);
  products.push({
    id: shop ? `gl-${shop.shopId}` : `tr-${p?.panelId ?? x.id}`, slug: '', code: t.code, barcode: x?.barcode ?? null,
    title_ru: cleaned.title, title_tr, shortDescription_ru: sd_ru, shortDescription_tr: c?.description ?? '',
    brand: brandSlug, sourceCategory: shop?.cons ? shop.cons.path.split(' > ') : [], sourceCategories: shop?.categories ?? [],
    consumerCategory: { parent, child }, availability: 'tr',
    price: list, memberPrice: member, currency: 'TRY', priceSource, pv, pvSource, boxQty: p?.boxQty ?? cleaned.boxQty ?? x?.boxQty ?? null, volume: vol,
    images, concerns: [], skinType: [], routineStep: null, certificates: [], needsReview: [...new Set(needs.filter(Boolean))], isSet,
    description_tr: c?.description ?? null, features_tr: c?.properties && !isSet ? c.properties : [], usage_tr: c?.usage ?? null, setContents_tr: isSet && c?.properties ? c.properties : [],
    _source: {
      shopId: shop?.shopId ?? null, shopUrl: shop?.url ?? null, rubPrice: shop?.rubPrice ?? null, pointsRu: shop?.pointsRu ?? null, panelId: p?.panelId ?? x?.id ?? null,
      panelMergedIds: p?.mergedIds ?? [], panelPriceTiers: p?.priceTiers ?? null, panelPointsTiers: p?.pointsTiers ?? null, panelCategory: p?.category ?? null, titlePanelTr: p?.title_tr_raw ?? null,
      catalogImage: c?.imageFile ?? null, catalogCategory: c?.category ?? null, xlsxCategory: x?.category ?? null, titleRawXlsx: x?.name_raw ?? null, titleRawPanel: rawRu || null,
      stockRu: shop?.stockRu ?? null, shopMatch: t.how, sources: [p ? 'panel' : null, x ? 'xlsx' : null, c ? 'catalog' : null, shop ? 'shop' : null].filter(Boolean),
    },
    _content: content, // moved to data/content/content-ru.json in step 5, never written to products.json
  });
}
for (const r of shopRecs) {
  if (usedShop.has(r.shopId)) continue;
  const needs = [...r.needs];
  if (!r.cons) needs.push('category-unmapped');
  if (!r.shortDescription_ru) needs.push('no-short-description');
  const pv = r.pointsRu != null ? r.pointsRu / 100 : null;
  if (pv == null) needs.push('pv-missing');
  products.push({
    id: `gl-${r.shopId}`, slug: '', code: r.model ?? '', barcode: null,
    title_ru: r.title_ru, title_tr: '', shortDescription_ru: r.shortDescription_ru, shortDescription_tr: '',
    brand: r.brand ?? 'greenleaf', sourceCategory: r.cons ? r.cons.path.split(' > ') : [], sourceCategories: r.categories,
    consumerCategory: { parent: r.cons?.parent ?? null, child: r.cons?.child ?? null }, availability: 'yakinda',
    price: null, memberPrice: null, currency: 'TRY', priceSource: null, pv, pvSource: pv != null ? 'shop-points' : null, boxQty: r.boxQty, volume: volumeOf(r.title_ru),
    images: r.images, concerns: [], skinType: [], routineStep: null, certificates: [], needsReview: needs, isSet: false,
    description_tr: null, features_tr: [], usage_tr: null, setContents_tr: [],
    _source: { shopId: r.shopId, shopUrl: r.url, rubPrice: r.rubPrice, pointsRu: r.pointsRu, panelId: null, titleRawRu: r.rawName, stockRu: r.stockRu, sources: ['shop'] },
    _content: r.descriptionHtml,
  });
}

// ---------------- Turkish content layer (EL, icerik-editoru; K-105: EL title wins over the catalog title) ----------------
// data/content/products.tr.json (TR products, key = code or id) + products.tr.yakinda.json (key = id). nonProduct records are dropped (catalogs / marketing material).
const contentTr = readJson(path.join(PATHS.data, 'content', 'products.tr.json'), {});
const contentYk = readJson(path.join(PATHS.data, 'content', 'products.tr.yakinda.json'), {});
const excludedNonProduct = [];
const joinReview = (r) => (Array.isArray(r) ? r.join(' | ') : r) || null;
for (let i = products.length - 1; i >= 0; i--) {
  const p = products[i];
  if (p.availability === 'tr') {
    const e = contentTr[p.code] ?? contentTr[p.id];
    if (!e || typeof e !== 'object') continue;
    if (e.title_tr) p.title_tr = e.title_tr.trim();
    if (e.shortDescription_tr) p.shortDescription_tr = e.shortDescription_tr;
    if (e.description_tr) p.description_tr = e.description_tr;
    if (e.features_tr?.length && !p.isSet) p.features_tr = e.features_tr;
    if (e.usage_tr) p.usage_tr = e.usage_tr;
    p.ingredientsHighlight = e.ingredients_highlight ?? [];
    p.notices = e.notices ?? [];
    p.contentReview = joinReview(e.needsReview);
    p.regulated = (e.notices ?? []).includes('regulated');
    p.contentSource = 'EL';
  } else {
    const e = contentYk[p.id];
    if (!e || typeof e !== 'object') continue;
    if (e.nonProduct) { excludedNonProduct.push({ id: p.id, code: p.code, why: e.review ?? 'nonProduct' }); products.splice(i, 1); continue; }
    if (e.title_tr) p.title_tr = e.title_tr.trim();
    if (e.shortDescription_tr) p.shortDescription_tr = e.shortDescription_tr;
    p.contentReview = joinReview(e.review);
    p.regulated = /^regulated/i.test(e.review ?? '');
    p.contentSource = 'EL';
  }
  if (p.title_tr) p.needsReview = p.needsReview.filter((f) => f !== 'title-tr-missing');
}
for (const p of products) { p.ingredientsHighlight ??= []; p.notices ??= []; p.contentReview ??= null; p.regulated ??= false; }

// duplicate codes (non-empty) among all products -> flag
const codeCount = {}; for (const p of products) if (p.code) codeCount[p.code] = (codeCount[p.code] ?? 0) + 1;
for (const p of products) if (p.code && codeCount[p.code] > 1) p.needsReview.push('dup-code');

// ---------------- slugs (stable via slug-lock.json when present) ----------------
const used = new Set(Object.values(slugLock));
const newLock = { ...slugLock };
const wanted = (p) => {
  if (p.title_tr) return slugify(p.title_tr, 80);
  const base = slugify(p.title_ru || p.id, 64); const suffix = p.code ? slugify(p.code) : p.id.replace('gl-', 'gl');
  return base.endsWith('-' + suffix) ? base : (base ? base + '-' + suffix : suffix);
};
for (const p of products) {
  if (newLock[p.id]) { p.slug = newLock[p.id]; continue; }
  let s = wanted(p) || p.id;
  if (used.has(s)) s = (s + '-' + (p.code ? slugify(p.code) : p.id.replace('gl-', 'gl'))).replace(/(-[a-z0-9]+)\1$/, '$1');
  if (used.has(s)) s = s + '-' + p.id.replace(/\W/g, '');
  used.add(s); newLock[p.id] = s; p.slug = s;
}

// stable order: consumer category order, then code, then id
const parentOrder = Object.fromEntries(CONSUMER.map((c, i) => [c[0], i]));
products.sort((a, b) => (parentOrder[a.consumerCategory.parent] ?? 99) - (parentOrder[b.consumerCategory.parent] ?? 99) || a.availability.localeCompare(b.availability) || (a.code || '~').localeCompare(b.code || '~') || a.id.localeCompare(b.id));

// ---------------- categories ----------------
const counts = {}; const trCounts = {};
for (const p of products) {
  const k = p.consumerCategory.parent; const kc = k && p.consumerCategory.child ? `${k}/${p.consumerCategory.child}` : null;
  for (const key of [k, kc]) if (key) { counts[key] = (counts[key] ?? 0) + 1; if (p.availability === 'tr') trCounts[key] = (trCounts[key] ?? 0) + 1; }
}
const consumer = [];
CONSUMER.forEach(([slug, title, kids], i) => {
  consumer.push({ slug, title_tr: title, parent: null, order: i + 1, productCount: counts[slug] ?? 0, trCount: trCounts[slug] ?? 0, icon: null, image: null, description_tr: null });
  kids.forEach(([ks, kt], j) => consumer.push({ slug: `${slug}/${ks}`, title_tr: kt, parent: slug, order: j + 1, productCount: counts[`${slug}/${ks}`] ?? 0, trCount: trCounts[`${slug}/${ks}`] ?? 0, icon: null, image: null, description_tr: null }));
});
const idOf = (pathArr) => pathArr.map((s) => slugify(s, 40)).join('/');
const source = tree.map((n) => {
  const m = mapPath(n.path);
  return { id: idOf(n.path), level: n.lvl, parent: n.path.length > 1 ? idOf(n.path.slice(0, -1)) : null, title_ru: n.path[n.path.length - 1], path_ru: n.path, url: n.url, productCount: n.total ?? 0, consumerCategory: m ? { parent: m.parent, child: m.child } : null };
});
const categories = { consumer, source };

// ---------------- brands ----------------
const bc = {}; const btr = {};
for (const p of products) { bc[p.brand] = (bc[p.brand] ?? 0) + 1; if (p.availability === 'tr') btr[p.brand] = (btr[p.brand] ?? 0) + 1; }
const brands = BRANDS.map(([slug, title, al]) => ({ slug, title, aliases: al, parent: slug === 'greenleaf' ? null : 'greenleaf', logo: null, description_tr: null, productCount: bc[slug] ?? 0, trCount: btr[slug] ?? 0 }));

// ---------------- to-translate (title + short description; TR-satista first) ----------------
const catTitle = (p) => [CONSUMER_PARENT_TITLE[p.consumerCategory.parent], CONSUMER_CHILD_TITLE[p.consumerCategory.child]].filter(Boolean).join(' > ');
const toTranslate = products.filter((p) => !p.title_tr || (p.availability === 'tr' && !p.shortDescription_tr))
  .map((p) => ({ id: p.id, code: p.code, availability: p.availability, priority: p.availability === 'tr' ? 1 : 2, needs: p.availability === 'tr' ? ['title_tr', 'description_tr', 'features_tr', 'usage_tr'].filter((k) => !p[k] || (Array.isArray(p[k]) && !p[k].length)) : ['title_tr', 'shortDescription_tr'], title_ru: p.title_ru, shortDescription_ru: p.shortDescription_ru, category: catTitle(p), category_ru: p.sourceCategory.join(' > '), brand: p.brand, volume: p.volume, hasLongRu: !!p._content }))
  .sort((a, b) => a.priority - b.priority);

const unknownHeads = {};
for (const p of products) if (p.brand === 'greenleaf' && p.title_ru) { const h = normHead(p.title_ru).split(' ')[0]; if (/^[A-Z]{4,}$/.test(h) && h !== 'GREENLEAF') unknownHeads[h] = (unknownHeads[h] ?? 0) + 1; }

writeJson(path.join(PATHS.cache, 'merged.json'), { excludedNonProduct, products, categories, brands, toTranslate, slugLock: newLock, unknownHeads, logs, panelCounts: panel.counts, panelExcluded: panel.excluded, trMatch: trRecs.map((t) => ({ code: t.code, shopId: t.shop?.shopId ?? null, how: t.how, multi: t.multi, shopTitle: t.shop?.title_ru ?? null, inPanel: !!t.p, inXlsx: !!t.x })) }, 0);
console.log(`merged: ${products.length} products (tr ${products.filter((p) => p.availability === 'tr').length}, yakinda ${products.filter((p) => p.availability === 'yakinda').length}), brands ${brands.length}; PV shop-vs-panel ${logs.pvShopCheck.equal}/${logs.pvShopCheck.compared}`);
