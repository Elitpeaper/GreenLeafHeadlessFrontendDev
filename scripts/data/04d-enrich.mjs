// Step 4d: overlay images (step 4b), palette (4c), themeHint and publishReady onto merged.json -> .cache/pipeline/final.json (input of step 5).
// Pure function of its inputs (idempotent). No network.
import path from 'node:path';
import { PATHS } from './config.mjs';
import { readJson, writeJson } from './lib.mjs';

const merged = readJson(path.join(PATHS.cache, 'merged.json'));
const images = readJson(path.join(PATHS.cache, 'images.json'), {});
const palette = readJson(path.join(PATHS.cache, 'palette.json'), {});

// K-065 theme keywords, matched on titles only (descriptions proved too noisy: generic marketing words).
const GOLD = /золот(?!исто)|\bgold\b|24\s?k\b|\baltın|\baltin/i;
// themeHint gold only for genuine gold/24K COSMETICS (K-065): not for colour names ("altın bej", золотисто-бежевый), perfume names ("Altın Rüzgar") or non-cosmetic roots.
const GOLD_ROOTS = new Set(['cilt-bakimi', 'makyaj', 'sac-bakimi', 'vucut-bakimi', 'agiz-ve-dis-bakimi', 'setler']);
const GOLD_FALSE_FRIEND = /золотисто|золотой ветер|цвет|altın rüzgar|renk|altın bej/i;
const PREMIUM = /премиум|премиальн|люкс|\bluxury\b|\bluxe\b|\bpremium\b/i;
const isGoldHue = ([h, s, v]) => h >= 36 && h <= 54 && s >= 0.45 && v >= 0.55;

let gold = 0, premium = 0, goldPalette = 0; const candidates = [];
for (const p of merged.products) {
  // ---- images
  const im = images[p.id];
  if (p.availability === 'tr' && im?.files?.length) {
    p.images = im.files.map((f) => ({ src: f.file, thumb: null, source: f.source, remote: f.remote, width: f.width, height: f.height }));
  }
  // ---- palette
  const pal = palette[p.id];
  p.palette = pal ? { primary: pal.primary, secondary: pal.secondary, tertiary: pal.tertiary, onPrimary: pal.onPrimary } : null;
  // ---- theme hint
  const titleText = `${p.title_ru} ${p.title_tr}`;
  let hint = null, hintSource = null;
  if (GOLD.test(titleText) && GOLD_ROOTS.has(p.consumerCategory.parent) && !GOLD_FALSE_FRIEND.test(titleText)) { hint = 'gold'; hintSource = 'keyword'; }
  else if (PREMIUM.test(titleText)) { hint = 'premium'; hintSource = 'keyword'; }
  else if (pal && isGoldHue(pal.primaryHsv) && p.isSet) { hint = 'gold'; hintSource = 'palette'; }
  else if (pal && isGoldHue(pal.primaryHsv)) candidates.push(p.id);
  p.themeHint = hint; p.themeHintSource = hintSource;
  if (hint === 'gold') gold++; if (hint === 'premium') premium++; if (hintSource === 'palette') goldPalette++;
  // ---- publish rule (K-024, mechanical part): Turkish title + (price if tr) + >= 1 image. Claim review is a separate human gate (icerik-editoru).
  p.publishReady = !!p.title_tr && p.images.length > 0 && (p.availability !== 'tr' || (p.price > 0 && p.memberPrice > 0)) && !p.needsReview.includes('price-implausible'); // price-implausible (S-025, K-096) is never sellable/published // yakinda: no price required (K-052)
}
// ---- category images (mega menu, K-064): 1 representative packshot per root / sub-category.
// Preference: TR products (local webp, known size) > yakinda (remote; resolution unknown -> prefer non-thumbnail-derived URLs). Only publishReady, non-set (except Setler), deterministic order by code.
const rank = (p) => (p.availability === 'tr' ? 0 : 2) + (p.needsReview.includes('image-derived-from-thumb') ? 1 : 0);
const pickFor = (key) => {
  const [root, child] = key.split('/');
  const c = merged.products.filter((p) => p.publishReady && p.consumerCategory.parent === root && (!child || p.consumerCategory.child === child) && (root === 'setler' || !p.isSet) && p.images[0]?.src);
  c.sort((a, b) => rank(a) - rank(b) || (b.images[0].width ?? 0) - (a.images[0].width ?? 0) || (a.code || '~').localeCompare(b.code || '~') || a.id.localeCompare(b.id));
  return c[0] ?? null;
};
let catImg = 0, catImgTr = 0;
for (const cat of merged.categories.consumer) {
  const p = pickFor(cat.slug);
  cat.image = p ? p.images[0].src : null; cat.imageProduct = p ? (p.code || p.id) : null;
  if (p) { catImg++; if (p.availability === 'tr') catImgTr++; }
}
console.log(`category images: ${catImg}/${merged.categories.consumer.length} (from TR products: ${catImgTr})`);
writeJson(path.join(PATHS.cache, 'final.json'), { ...merged, themeStats: { gold, premium, goldFromPalette: goldPalette, paletteGoldCandidatesNotApplied: candidates.length, withPalette: merged.products.filter((p) => p.palette).length } }, 0);
console.log(`enrich: palette ${merged.products.filter((p) => p.palette).length}/${merged.products.length}, themeHint gold ${gold} (palette ${goldPalette}) premium ${premium}, palette-gold candidates not applied ${candidates.length}`);
