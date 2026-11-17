// Step 5: validate merged data, write data/*.json + docs/veri reports.
// Errors block the write of data/*.json; warnings never do. Run: node 05-validate.mjs [--no-write]
import fs from 'node:fs'; import path from 'node:path';
import { ROOT, SHOP_EXTRA_IDS } from './config.mjs';
import { PATHS, LIST_PRICE_MULTIPLIER, CLAIM_WORDS_TR, CLAIM_WORDS_RU } from './config.mjs';
import { readJson, writeJson } from './lib.mjs';
import { CONSUMER, RULES } from './category-map.mjs';

const M = readJson(path.join(PATHS.cache, 'final.json')); // merged + images + palette + themeHint (04 -> 04b -> 04c -> 04d)
const { excludedNonProduct = [], products, categories, brands, toTranslate, slugLock, unknownHeads, trMatch, logs, panelCounts, panelExcluded, themeStats } = M;
const shopIndex = readJson(path.join(PATHS.cache, 'shop-index.json'));
const noWrite = process.argv.includes('--no-write'); const lockSlugs = process.argv.includes('--lock-slugs');
const errors = [], warnings = [];
const lum = (h) => { const l = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); return 0.2126 * l(r) + 0.7152 * l(g) + 0.0722 * l(b); };
const contrastOf = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const err = (m) => errors.push(m), warn = (m) => warnings.push(m);

// ---- required fields / basic shape
const parents = new Set(CONSUMER.map((c) => c[0])); const childOf = new Set(CONSUMER.flatMap((c) => c[2].map((k) => c[0] + '/' + k[0])));
const trWarn = { noTitle: [], noPv: [], noImage: [], listOff: [] };
for (const p of products) {
  for (const k of ['id', 'slug', 'availability', 'brand']) if (!p[k]) err(`${p.id}: missing ${k}`);
  if (!p.title_ru && !p.title_tr) err(`${p.id}: no title`);
  if (!parents.has(p.consumerCategory.parent)) err(`${p.id} (${p.code}): consumerCategory unmapped; source=${p.sourceCategories.join(' | ')}`);
  else if (p.consumerCategory.child && !childOf.has(p.consumerCategory.parent + '/' + p.consumerCategory.child)) err(`${p.id}: unknown child ${p.consumerCategory.child}`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) err(`${p.id}: bad slug "${p.slug}"`);
  if (p.availability === 'tr') {
    if (!(p.memberPrice > 0)) err(`${p.id} ${p.code}: TR product without memberPrice`);
    if (!(p.price > p.memberPrice)) err(`${p.id} ${p.code}: price (${p.price}) must be > memberPrice (${p.memberPrice})`);
    const exp = p.memberPrice * LIST_PRICE_MULTIPLIER, dev = Math.abs(p.price - exp) / exp;
    if (dev > (p.priceSource === 'derived-x' + LIST_PRICE_MULTIPLIER ? 0.0001 : 0.01)) trWarn.listOff.push(`${p.code || p.id} (list ${p.price} vs member ${p.memberPrice}, ${p.priceSource})`);
    if (p.pv == null) trWarn.noPv.push(p.code || p.id); else if (!(p.pv >= 0)) err(`${p.id}: invalid pv`);
    if (!p.title_tr) trWarn.noTitle.push(p.code || p.id);
    if (!p.images.length) trWarn.noImage.push(p.code || p.id);
  } else if (p.price !== null || p.memberPrice !== null) err(`${p.id}: non-TR product has a price (K-036/K-038 violation)`);
  if (p.pvSource === 'shop-points' && p.pv != null && Math.abs(p.pv - p._source.pointsRu / 100) > 1e-9) err(`${p.id}: pv != shop points / 100`);
  if (p.palette && contrastOf(p.palette.primary, p.palette.onPrimary) < 4.5) err(`${p.id}: palette onPrimary contrast < 4.5`);
}

// ---- uniqueness
const dupBy = (key, arr = products) => { const m = new Map(); for (const p of arr) { const v = key(p); if (!v) continue; (m.get(v) ?? m.set(v, []).get(v)).push(p); } return [...m].filter(([, v]) => v.length > 1); };
const dupSlugs = dupBy((p) => p.slug), dupIds = dupBy((p) => p.id), dupCodes = dupBy((p) => p.code), dupBarcodes = dupBy((p) => p.barcode);
for (const [s, v] of dupSlugs) err(`duplicate slug "${s}": ${v.map((p) => p.id).join(', ')}`);
for (const [s, v] of dupIds) err(`duplicate id "${s}"`);
for (const [s, v] of dupBarcodes) err(`duplicate barcode ${s}`);
// ---- barcodes (EAN-13)
const ean = (b) => /^\d{13}$/.test(b) && ((10 - [...b.slice(0, 12)].reduce((a, d, i) => a + +d * (i % 2 ? 3 : 1), 0) % 10) % 10) === +b[12];
for (const p of products) if (p.barcode && !ean(p.barcode)) err(`${p.code}: invalid EAN-13 ${p.barcode}`);
// ---- images
const noImage = products.filter((p) => !p.images.length || !p.images[0].src);
const brokenLocal = products.filter((p) => p.images.some((i) => i.src.startsWith('/products/') && !fs.existsSync(path.join(ROOT, 'public', i.src))));
const derivedImg = products.filter((p) => p.needsReview.includes('image-derived-from-thumb'));
const badUrl = products.filter((p) => p.images.some((i) => !/^https?:/.test(i.src) && !i.src.startsWith('/products/')));
const trRemoteOnly = products.filter((p) => p.availability === 'tr' && p.images.length && p.images.every((i) => !i.src.startsWith('/products/')));
for (const p of brokenLocal) err(`${p.id}: local image file missing`);
for (const p of badUrl) err(`${p.id}: image url neither absolute nor a /products/ path`);
// ---- other checks (warnings)
const pageNotFetched = products.filter((p) => p.needsReview.includes('page-not-fetched'));
const noCode = products.filter((p) => !p.code), corrupt = products.filter((p) => p.needsReview.includes('name-corrupt'));
// ---- quiz tags (K-056): vocabulary + limits are errors; emptiness is a warning (rules leave ambiguous products untagged)
{
  const S = new Set(['kuru', 'yagli', 'karma', 'normal', 'hassas', 'tum-ciltler']), C = new Set(['nem', 'parlama-gozenek', 'tikali-gozenek', 'isilti', 'ton-esitsizligi', 'ince-cizgi', 'yatistirma', 'goz-cevresi']), R = new Set(['temizleme', 'tonik', 'serum', 'nemlendirme', 'gunes-koruma', 'maske', 'peeling', 'goz-bakimi', 'dudak-bakimi', 'makyaj-temizleme']);
  for (const p of products) {
    for (const k of p.skinType) if (!S.has(k)) err(`${p.id}: unknown skinType "${k}"`);
    for (const k of p.concerns) if (!C.has(k)) err(`${p.id}: unknown concern "${k}"`);
    if (p.concerns.length > 3) err(`${p.id}: more than 3 concerns`);
    if (p.routineStep && !R.has(p.routineStep)) err(`${p.id}: unknown routineStep "${p.routineStep}"`);
    if (p.consumerCategory.parent !== 'cilt-bakimi' && p.routineStep) err(`${p.id}: routineStep set outside cilt-bakimi`);
  }
  const face = products.filter((p) => p.consumerCategory.parent === 'cilt-bakimi' && !p.isSet);
  const trFace = face.filter((p) => p.availability === 'tr');
  warn(`quiz tags: cilt-bakimi ${face.length} (TR ${trFace.length}); without skinType ${face.filter((p) => !p.skinType.length).length} (TR ${trFace.filter((p) => !p.skinType.length).length}), without routineStep ${face.filter((p) => !p.routineStep).length} (TR ${trFace.filter((p) => !p.routineStep).length}); TR without skinType: ${trFace.filter((p) => !p.skinType.length).map((p) => p.code || p.id).join(', ') || '-'}`);
}
const noShort = products.filter((p) => !p.shortDescription_ru && p.availability === 'yakinda');
const boxMention = products.filter((p) => p.boxQty == null && /короб|корбок/i.test(p._source.titleRawRu ?? ''));
const boxLeft = products.filter((p) => /короб/i.test(p.title_ru));
const claimTr = products.filter((p) => CLAIM_WORDS_TR.some((w) => `${p.title_tr} ${p.shortDescription_tr} ${p.description_tr ?? ''}`.toLowerCase().includes(w)));
const claimRu = products.filter((p) => CLAIM_WORDS_RU.some((w) => `${p.title_ru} ${p.shortDescription_ru}`.toLowerCase().includes(w)));
const unmappedNodes = categories.source.filter((n) => !n.consumerCategory);
const emptyNodes = categories.source.filter((n) => n.productCount === 0);
const trProducts = products.filter((p) => p.availability === 'tr');
// TR matches vs Phase-0 match-tr.json
const legacyMatch = readJson(path.join(PATHS.legacyShop, 'match-tr.json'), null);
const matchDiff = [];
if (legacyMatch) for (const m of legacyMatch.matches) { const mine = trMatch.find((t) => t.code === m.tr.code); const was = m.matched ? m.site.id : null; if ((mine?.shopId ?? null) !== was) matchDiff.push(`${m.tr.code}: phase-0 ${was ?? '-'} vs now ${mine?.shopId ?? '-'}`); }
const trUnmatched = trMatch.filter((t) => !t.shopId).map((t) => t.code);
// PV/price outliers (TR)
const ratios = trProducts.filter((p) => p.pv > 0).map((p) => p.memberPrice / p.pv).sort((a, b) => a - b); const med = ratios[Math.floor(ratios.length / 2)];
const ratioOut = trProducts.filter((p) => p.pv > 0 && (p.memberPrice / p.pv > med * 5 || p.memberPrice / p.pv < med / 5)).map((p) => p.code);
const sourceCount = new Set(products.map((p) => p._source.shopId).filter(Boolean)).size;
if (sourceCount + excludedNonProduct.length !== shopIndex.length + SHOP_EXTRA_IDS.length) err(`shop products in output (${sourceCount}) != index + extras (${shopIndex.length + SHOP_EXTRA_IDS.length})`);
const dupNames = dupBy((p) => p.title_ru.toLowerCase());

const yNoPv = products.filter((p) => p.availability === 'yakinda' && p.pv == null);
if (trWarn.noTitle.length) warn(`${trWarn.noTitle.length} TR products without Turkish title (K-024: not publishable until icerik-editoru): ${trWarn.noTitle.join(', ')}`);
if (trWarn.noPv.length) warn(`${trWarn.noPv.length} TR products without PV: ${trWarn.noPv.join(', ')}`);
if (trWarn.noImage.length) warn(`${trWarn.noImage.length} TR products without any image: ${trWarn.noImage.join(', ')}`);
if (trRemoteOnly.length) warn(`${trRemoteOnly.length} TR products whose images could not be downloaded (remote URL only): ${trRemoteOnly.map((p) => p.code || p.id).join(', ')}`);
if (trWarn.listOff.length) warn(`list price deviates from member x ${LIST_PRICE_MULTIPLIER}: ${trWarn.listOff.join('; ')}`);
const yNoTitle = products.filter((p) => p.availability === 'yakinda' && !p.title_tr);
if (yNoTitle.length) warn(`${yNoTitle.length} yakinda products still without Turkish title (not publishReady; icerik-editoru backlog)`);
const withReview = products.filter((p) => p.contentReview), regulatedP = products.filter((p) => p.regulated);
warn(`content layer (EL): ${products.filter((p) => p.contentSource === 'EL').length} products with Turkish content; contentReview set on ${withReview.length}; regulated=true on ${regulatedP.length} (editor gate before publishing, K-024/R-08)`);
if (excludedNonProduct.length) warn(`excluded nonProduct (catalog/marketing material): ${excludedNonProduct.map((e) => e.code).join(', ')}`);
const catNoImg = categories.consumer.filter((c) => c.productCount && !c.image);
if (catNoImg.length) warn(`${catNoImg.length} categories with products but no image: ${catNoImg.map((c) => c.slug).join(', ')}`);
if (yNoPv.length) warn(`${yNoPv.length} yakinda products without PV (shop page shows no bonus points) - K-062 cannot be met for them without a rule`);

if (pageNotFetched.length) warn(`${pageNotFetched.length} product pages not fetched yet (crawl incomplete) -> model code / description / images may be missing for them`);
if (noCode.length) warn(`${noCode.length} products without model code`);
if (corrupt.length) warn(`${corrupt.length} products with corrupted name ("???")`);
if (noImage.length) warn(`${noImage.length} products without image`);
if (derivedImg.length) warn(`${derivedImg.length} images derived from thumbnail URL (-250x250 -> -800x800)`);
if (dupCodes.length) warn(`${dupCodes.length} duplicate model codes`);
if (claimTr.length) warn(`${claimTr.length} TR texts contain claim-risk words: ${claimTr.map((p) => p.code).join(', ')}`);
if (claimRu.length) warn(`${claimRu.length} RU short descriptions contain medical-claim words (icerik-editoru must neutralise during localisation)`);
if (unmappedNodes.length) warn(`${unmappedNodes.length} source category nodes without consumer mapping`);
if (matchDiff.length) warn(`TR<->shop match differs from phase-0 search match: ${matchDiff.join('; ')}`);
if (ratioOut.length) warn(`TRY/PV outliers: ${ratioOut.join(', ')}`);

const fetchFail = readJson(path.join(PATHS.cache, 'fetch-failures.json'), []);
const complete = pageNotFetched.length === 0;

// ---------------- write data ----------------
const wrote = [];
if (!errors.length && !noWrite) {
  const contentRu = {}; const outProducts = products.map(({ _content, ...rest }) => { if (_content) contentRu[rest.id] = _content; return rest; });
  writeJson(path.join(PATHS.data, 'products.json'), outProducts, 0);
  writeJson(path.join(PATHS.data, 'content', 'content-ru.json'), contentRu, 0);
  writeJson(path.join(PATHS.data, 'categories.json'), categories, 1);
  writeJson(path.join(PATHS.data, 'brands.json'), brands, 1);
  writeJson(path.join(PATHS.data, 'content', 'to-translate.json'), toTranslate, 0);
  if (complete && lockSlugs) writeJson(path.join(PATHS.data, 'slug-lock.json'), slugLock, 0); // lock slugs only on request, from a complete dataset
  wrote.push('data/products.json', 'data/content/content-ru.json', 'data/categories.json', 'data/brands.json', 'data/content/to-translate.json', complete && lockSlugs ? 'data/slug-lock.json' : '(slug-lock NOT written; run with --lock-slugs when slugs are final)');
}

// ---------------- reports ----------------
const n = (a) => a.length;
const by = (arr, f) => arr.reduce((a, x) => { const k = f(x); a[k] = (a[k] ?? 0) + 1; return a; }, {});
const tbl = (rows, head) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n` + rows.map((r) => `| ${r.join(' | ')} |`).join('\n');
const flagCounts = by(products.flatMap((p) => p.needsReview), (f) => f);
const pvCheck = logs.pvShopCheck; const yak = products.filter((p) => p.availability === 'yakinda');
const withPal = products.filter((p) => p.palette);
const imgLocal = trProducts.filter((p) => p.images.some((i) => i.src.startsWith('/products/')));
const extraSections = [
  '## 6. Panel dışa aktarımı (`kaynaklar/panel/goods.json`)', '',
  tbl([
    ['Panel kaydı', panelCounts.total], ['Dışlanan (test / etkinlik bileti / tabansız `/A`)', n(panelExcluded)], ['`/A` kopyası tabana birleştirilen', panelCounts.dupMerged], ['Panelden ürün (birleşik)', panelCounts.products],
    ['TR kümesi (panel ∪ xlsx)', n(trProducts)], ['— yalnız panelde (yeni, xlsx\'te yok)', n(trProducts.filter((p) => p.needsReview.includes('not-in-xlsx')))], ['— yalnız xlsx\'te (panelde yok)', n(trProducts.filter((p) => p.needsReview.includes('panel-missing')))],
  ], ['Metrik', 'Değer']), '',
  '**Dışlananlar:** ' + panelExcluded.map((e) => `${e.id} (${e.why}${e.code ? ', ' + e.code : ''})`).join('; '), '',
  '**Panel–xlsx üye fiyatı farkı:** ' + (n(logs.xlsxPriceDiff) ? logs.xlsxPriceDiff.map((d) => `${d.code}: panel ${d.panel} / xlsx ${d.xlsx}`).join('; ') : 'yok (ortak 37 kodun hepsinde aynı)') + ' · **Panel–xlsx PV farkı:** ' + (n(logs.pvXlsxDiff) ? logs.pvXlsxDiff.map((d) => `${d.code}`).join(', ') : 'yok'), '',
  '### Fiyat kademesi tutarsızlıkları (`client` ≠ 2 × `base`)', '',
  n(logs.priceMismatch) ? tbl(logs.priceMismatch.map((m) => { const p = products.find((x) => (x.code || `panel-${x._source.panelId}`) === m.code || x.code === m.code); return [m.code, m.member, m.client, m.flag === 'client-not-above-base' ? 'client ≤ base → liste = üye × 2 kullanıldı' : 'client > base ama 2× değil → panel client kademesi kullanıldı', p ? p.price : '-']; }), ['Kod', 'Üye (base)', 'Müşteri (client)', 'Durum', 'Kullanılan liste']) : '_Yok._', '',
  '### PV doğrulaması (K-062)', '',
  `- Panel PV × 100 = mağaza bonus puanı: **${pvCheck.equal}/${pvCheck.compared}** eşleşen TR üründe tam eşit (${pvCheck.diffs.length} fark${pvCheck.noShopPoints.length ? `; mağaza sayfasında puan yok: ${pvCheck.noShopPoints.join(', ')}` : ''}). Yani "yakında" ürünlerde \`PV = mağaza puanı / 100\` kuralı geçerli.`,
  `- Yakında ürünler: ${n(yak)} · PV türetilen: ${n(yak.filter((p) => p.pv != null))} · **PV bulunamayan (mağaza sayfasında puan satırı yok): ${n(yak.filter((p) => p.pv == null))}** (`+'`pv-missing`'+`).`,
  `- TR ürünlerde PV yok: ${trWarn.noPv.join(', ') || '-'}`, '',
  '## 7. Görsel, palet ve tema', '',
  tbl([
    ['TR ürün, yerel webp görseli olan', `${n(imgLocal)} / ${n(trProducts)}`], ['TR ürün, hiç görseli olmayan', trWarn.noImage.join(', ') || '-'],
    ['Palet hesaplanan ürün', `${n(withPal)} / ${n(products)}`], ['themeHint = gold', n(products.filter((p) => p.themeHint === 'gold'))], ['themeHint = premium', n(products.filter((p) => p.themeHint === 'premium'))],
    ['… kaynağı anahtar sözcük', n(products.filter((p) => p.themeHintSource?.startsWith('keyword')))], ['… kaynağı palet (yalnız set)', n(products.filter((p) => p.themeHintSource === 'palette'))], ['Altın tonlu palet, anahtar sözcüksüz (uygulanmadı)', themeStats.paletteGoldCandidatesNotApplied],
    ['publishReady = true', `${n(products.filter((p) => p.publishReady))} (TR: ${n(trProducts.filter((p) => p.publishReady))}, yakında: ${n(yak.filter((p) => p.publishReady))})`],
  ], ['Metrik', 'Değer']), '',
  '**gold / premium işaretli ürünler:** ' + (products.filter((p) => p.themeHint).map((p) => `${p.code || p.id} (${p.themeHint}, ${p.themeHintSource})`).join('; ') || '-'), '',
  '## 8. Kategori eşleme notu (K-050)', '',
  `- 12 kök / ${CONSUMER.reduce((a, c) => a + c[2].length, 0)} alt kategori. BILGI-MIMARISI'nda olmayan, **veri hattının eklediği** alt kategoriler (ÖNERİ): \`saglik-ve-takviye/bant-ve-yamalar\`, \`saglik-ve-takviye/diger-saglik-urunleri\` (K-067: RU "Лечебные пластыри", "Мази, спреи", erkek "Для здоровья" artık yayınlanıyor).`,
  `- Alt kategorisi boş (yalnız kök) kalan ürün: ${n(products.filter((p) => !p.consumerCategory.child))} (hepsi RU kaynakta yalnız kök düğümde duruyor; ağaçta kök sayfasında görünür).`,
  `- Ürünsüz alt kategori (menüde gizlenir): ${categories.consumer.filter((c) => c.parent && !c.productCount).map((c) => c.slug).join(', ') || '-'}`,
  `- TR ürünlerinde \`category-guess\` (ad tabanlı tahmin, gözden geçirilmeli): ${products.filter((p) => p.needsReview.includes('category-guess')).map((p) => p.code || p.id).join(', ') || '-'}`, '',
];

const R = [];
R.push('# Veri Doğrulama Raporu', '', `> Üretici: \`scripts/data/05-validate.mjs\` (otomatik, her çalıştırmada yeniden yazılır). Bu dosyayı elle düzenlemeyin.`, '',
  `**Durum:** ${errors.length ? `HATA VAR (${errors.length}) — data/*.json yazılmadı` : 'Hata yok — data/*.json yazıldı'} · Uyarı: ${warnings.length} · Tarama: ${complete ? 'TAMAM' : `EKSİK (${pageNotFetched.length} ürün sayfası henüz çekilmedi; \`02-fetch-products.mjs\` yeniden çalıştırılırsa kaldığı yerden devam eder)`}`, '',
  '## 1. Sayılar', '',
  tbl([
    ['Toplam ürün kaydı', n(products)], ['Satışta (availability=tr)', n(trProducts)], ['Yakında (availability=yakinda)', n(products.filter((p) => p.availability === 'yakinda'))],
    ['Kaynak mağaza ürünü (index + SHOP_EXTRA_IDS)', shopIndex.length + SHOP_EXTRA_IDS.length], ['TR kaydı (panel ∪ xlsx)', n(trProducts)], ['TR kaydı mağaza eşleşmeli', n(trMatch.filter((t) => t.shopId))], ['TR kaydı mağazada bulunamayan', `${n(trUnmatched)} (${trUnmatched.join(', ')})`],
    ['Marka (tanımlı)', n(brands)], ['Tüketici kategorisi (ana/alt)', `${n(CONSUMER)} / ${CONSUMER.reduce((a, c) => a + c[2].length, 0)}`], ['Kaynak kategori düğümü', n(categories.source)],
    ['boxQty ayrıştırılan', n(products.filter((p) => p.boxQty != null))], ['to-translate.json kayıt', n(toTranslate)], ['LIST_PRICE_MULTIPLIER', LIST_PRICE_MULTIPLIER],
  ], ['Metrik', 'Değer']), '',
  '### Tüketici ana kategorilerine göre', '', tbl(categories.consumer.filter((c) => !c.parent).map((c) => [c.title_tr, c.productCount, c.trCount]), ['Kategori', 'Ürün', 'Satışta (TR)']), '',
  '### Markalara göre', '', tbl(brands.filter((b) => b.productCount).sort((a, b) => b.productCount - a.productCount).map((b) => [b.title, b.productCount, b.trCount]), ['Marka', 'Ürün', 'TR']), '',
  '## 2. Hatalar (yazımı engeller)', '', errors.length ? errors.map((e) => `- ${e}`).join('\n') : '_Yok._', '',
  '## 3. Uyarılar', '', warnings.length ? warnings.map((e) => `- ${e}`).join('\n') : '_Yok._', '',
  '## 4. Ayrıntılar', '',
  `- **Görseli olmayan:** ${n(noImage)}${n(noImage) ? ' → ' + noImage.slice(0, 40).map((p) => p.code || p.id).join(', ') : ''}`,
  `- **Görsel küçük resimden türetilen (ürün sayfası çekilemeyen):** ${n(derivedImg)}`,
  `- **Model kodu olmayan:** ${n(noCode)}${n(noCode) ? ' → ' + noCode.slice(0, 40).map((p) => p.id).join(', ') : ''}`,
  `- **Ad bozuk ("???") olan:** ${n(corrupt)}${n(corrupt) ? ' → ' + corrupt.map((p) => p.id).join(', ') : ''}`,
  `- **Tekrar eden slug:** ${n(dupSlugs)} · **tekrar eden id:** ${n(dupIds)} · **tekrar eden barkod:** ${n(dupBarcodes)}`,
  `- **Tekrar eden model kodu:** ${n(dupCodes)}${n(dupCodes) ? '\n' + dupCodes.slice(0, 60).map(([c, v]) => `  - \`${c}\`: ${v.map((p) => p.id + (p.availability === 'tr' ? ' (TR)' : '')).join(', ')}`).join('\n') : ''}`,
  `- **Aynı Rusça başlığa sahip kayıt grubu:** ${n(dupNames)} (farklı kod/varyant olabilir; sorun değil, bilgi amaçlı)`,
  `- **Koli ifadesi addan çıkarılamadı (boxQty yok ama addan "коробк" geçiyor):** ${n(boxMention)}${n(boxMention) ? ' → ' + boxMention.map((p) => `${p.id}: ${p._source.titleRawRu}`).join(' ; ') : ''}`,
  `- **Temiz addan "коробк" geçmeye devam eden:** ${n(boxLeft)}`,
  `- **Kısa açıklaması boş (yakında):** ${n(noShort)}`,
  `- **Eşleşmeyen / boş kaynak kategori düğümü:** eşlenmeyen ${n(unmappedNodes)}, ürünsüz ${n(emptyNodes)}${n(emptyNodes) ? ' → ' + emptyNodes.map((x) => x.path_ru.join(' > ')).join(' ; ') : ''}`,
  `- **Tanınmayan Latin marka adayı (ilk kelime, markasız "greenleaf" altında):** ${Object.entries(unknownHeads).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}:${v}`).join(' ') || '-'}`,
  `- **Mağazadan ürün sayfası alınamayan (HTTP/robots):** ${fetchFail.length}`,
  '', '### needsReview bayrakları', '', tbl(Object.entries(flagCounts).sort((a, b) => b[1] - a[1]), ['Bayrak', 'Adet']), '',
  '### TR kayıtları — eşleşme ve ad çatışması', '', tbl(trMatch.map((t) => [t.code, t.shopId ?? '-', (t.shopTitle ?? '-').slice(0, 70)]), ['Kod', 'Mağaza id', 'Mağaza (RU) adı']), '',
  '## 5. Kurallar (doğrulanan)', '',
  '- Fiyat yalnız TR kayıtlarında; üye = panel `base`, liste = panel `client` (üye kademesinden büyükse) yoksa üye × LIST_PRICE_MULTIPLIER (K-036); RUB yalnız `_source.rubPrice` içinde.',
  '- PV tüm ürünlerde (K-062): TR = panel/xlsx; yakında = mağaza bonus puanı / 100 (`pvSource`). Puanı olmayan yakında ürünlerde `pv` null.',
  '- Yakında ürünlerde `price`, `memberPrice` = null (K-038). TR ürün görselleri `public/products/` altında webp (≤ 800 px); yakında görselleri uzak URL. Link canlılığı (HEAD) bu hatta toplu kontrol edilmez.', '',
  ...extraSections);
fs.writeFileSync(path.join(PATHS.docs, 'DOGRULAMA-RAPORU.md'), R.join('\n'), 'utf8');

// mapping proposal doc
const L = ['# Kategori Eşleme (kaynak -> tüketici, K-050)', '', '> Üretici: `scripts/data/05-validate.mjs` (kaynak: `scripts/data/category-map.mjs`). Ağaç K-050 ile ONAYLI; kaynak düğüm eşlemesi veri hattının önerisidir, değişiklik yalnız `category-map.mjs` içinde yapılır.', '',
  '## Tüketici taksonomisi (2 seviye)', '', tbl(categories.consumer.map((c) => [c.parent ? '  ↳ ' + c.title_tr : '**' + c.title_tr + '**', '`' + c.slug + '`', c.productCount, c.trCount]), ['Ad', 'Slug', 'Ürün', 'TR']), '',
  '## Kaynak düğüm eşlemesi', '', tbl(categories.source.map((x) => [x.path_ru.join(' > '), x.productCount, x.consumerCategory ? `${x.consumerCategory.parent}${x.consumerCategory.child ? '/' + x.consumerCategory.child : ''}` : '**EŞLENMEDİ**']), ['Kaynak yolu (RU)', 'Ürün', 'Tüketici kategorisi']), '',
  '## Notlar', '', '- Bir ürün birden çok kaynak kategoride olabilir; birincil kategori en derin eşleşen yoldur.', '- TR kayıtlarında ana kategori Ağustos kataloğundan, alt kategori mağaza eşleşmesinden gelir (ana kategoriler çelişirse alt kategori boş kalır).', '- Ağaç = K-050 (ONAYLI, `docs/plan/BILGI-MIMARISI.md`): 12 kök, 2 seviye. Eski "Erkek" kökü yoktur: erkek bakım → Cilt Bakımı/Erkek Cilt Bakımı, tıraş → Vücut Bakımı/Tıraş ve Tüy Alma, erkek sağlık → Sağlık ve Takviye/Diğer Sağlık Ürünleri.'];
fs.writeFileSync(path.join(PATHS.docs, 'KATEGORI-ESLEME-ONERISI.md'), L.join('\n'), 'utf8');

console.log(errors.length ? `ERRORS ${errors.length}` : 'no errors', `warnings ${warnings.length}`, complete ? 'crawl complete' : `crawl incomplete (${pageNotFetched.length} missing)`);
for (const e of errors.slice(0, 15)) console.log(' E:', e);
for (const w of warnings) console.log(' W:', w.slice(0, 200));
console.log('wrote:', wrote.join(', ') || 'nothing');
