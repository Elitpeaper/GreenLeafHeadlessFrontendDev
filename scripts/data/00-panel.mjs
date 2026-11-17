// Step 0: normalise the panel export (kaynaklar/panel/goods.json, read-only) -> .cache/pipeline/panel.json
// Rules: price tiers are in KURUS (/100). base = member price, client = customer price (expected 2x base), points.base/100 = PV.
// Excluded: test records, KGZ event tickets, code-less "/A" records without a base twin. "/A" duplicates are merged into the base code.
// No credentials are involved: the export is a local file.
import fs from 'node:fs'; import path from 'node:path';
import { ROOT, PATHS } from './config.mjs';
import { readJson, writeJson, normCode } from './lib.mjs';

const src = path.join(ROOT, 'kaynaklar', 'panel');
const goods = Object.values(readJson(path.join(src, 'goods.json')));
const cats = readJson(path.join(src, 'category.json'));
const catName = Object.fromEntries(cats.map((c) => [c.id, { name: c.name, ru: c.title?.ru, parent: c.parent }]));

const TEST = /(^|[^а-яё])тест/i, TICKET = /^KGZ\d+/i;
const BOX = /(?:Кол-?во\s+в\s+коробк[еа]|в\s+коробке)\s*[:\-]?\s*(\d+)\s*(?:шт|ст|пар)?/i;
const normTitle = (t) => (t ?? '').toLowerCase().replace(/\(?\s*кол-?во\s+в\s+коробке\s*\d+\s*шт\.?\s*\)?/g, '').replace(/[^a-zа-я0-9]+/g, ' ').trim();
const hasCyr = (s) => /[А-Яа-яЁё]/.test(s ?? '');

const excluded = [], valid = [];
for (const g of goods) {
  const code = g.code == null ? '' : String(g.code).trim();
  const ru = g.title?.ru ?? '';
  if (TEST.test(ru)) { excluded.push({ id: g.id, code, title: ru, why: 'test-record' }); continue; }
  if (TICKET.test(code)) { excluded.push({ id: g.id, code, title: ru, why: 'event-ticket' }); continue; }
  valid.push({ g, code, ru });
}
const isDup = (v) => /\/A$/.test(v.code);
const bases = valid.filter((v) => !isDup(v)); const dups = valid.filter(isDup);
const merged = new Map(); // base index -> panel ids merged
const recs = bases.map((v) => ({ v, mergedIds: [], mergedFrom: [] }));
for (const d of dups) {
  const baseCode = d.code.replace(/\/A$/, '');
  let tgt = baseCode ? recs.find((r) => r.v.code === baseCode) : null;
  if (!tgt) tgt = recs.find((r) => normTitle(r.v.ru) && normTitle(r.v.ru) === normTitle(d.ru));
  if (tgt) { tgt.mergedIds.push(d.g.id); tgt.mergedFrom.push(d.code || '/A'); }
  else excluded.push({ id: d.g.id, code: d.code, title: d.ru, why: 'dup-without-base' });
}
const t = (o, k) => (o && typeof o[k] === 'number' ? o[k] / 100 : null);
const out = recs.map(({ v, mergedIds, mergedFrom }) => {
  const g = v.g; const trTitle = (g.title?.tr ?? '').trim();
  const box = BOX.exec(g.description?.ru ?? '') ?? BOX.exec(v.ru);
  const base = t(g.price?.base, 'try'), client = t(g.price?.client, 'try');
  const flags = [];
  if (base != null && client != null && Math.abs(client - base * 2) > 0.011) flags.push(client <= base ? 'client-not-above-base' : 'client-not-2x-base');
  const pb = g.points?.base;
  return {
    panelId: g.id, code: v.code ? normCode(v.code) : '', mergedIds, mergedFrom,
    title_ru_raw: v.ru, title_tr_raw: trTitle || null, title_tr_usable: trTitle && !hasCyr(trTitle) ? trTitle : null,
    boxQty: box ? +box[1] : null, memberPrice: base, clientPrice: client,
    pv: typeof pb === 'number' ? pb / 100 : null, pointsBase: pb ?? null,
    category: g.category, categoryName: catName[g.category]?.name ?? null,
    priceTiers: Object.fromEntries(Object.entries(g.price ?? {}).filter(([, x]) => x && typeof x.try === 'number').map(([k, x]) => [k, x.try / 100])),
    pointsTiers: g.points ?? null, contentRuLen: (g.content?.ru ?? '').length, contentTrEqualsRu: (g.content?.tr ?? '') === (g.content?.ru ?? ''), flags,
  };
});
// long RU marketing HTML kept separately (raw, untranslated); merged into data/content/content-ru.json by step 5
writeJson(path.join(PATHS.cache, 'panel-content-ru.json'), Object.fromEntries(recs.map(({ v }) => [v.g.id, v.g.content?.ru ?? '']).filter(([, c]) => c)), 0);
writeJson(path.join(PATHS.cache, 'panel.json'), { records: out, excluded, counts: { total: goods.length, valid: valid.length, products: out.length, dupMerged: out.reduce((a, r) => a + r.mergedIds.length, 0), excluded: excluded.length } }, 1);
console.log(`panel: ${goods.length} records -> ${out.length} products (+${out.reduce((a, r) => a + r.mergedIds.length, 0)} "/A" duplicates merged), excluded ${excluded.length}: ${excluded.map((e) => e.why).join(',')}`);
