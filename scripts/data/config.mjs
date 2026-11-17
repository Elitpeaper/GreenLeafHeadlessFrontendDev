// Central configuration for the data pipeline. Raw sources (PARENT) are READ-ONLY.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const PARENT = path.resolve(ROOT, '..');

export const PATHS = {
  cache: path.join(ROOT, '.cache', 'pipeline'),
  productHtml: path.join(ROOT, '.cache', 'pipeline', 'product-html'),
  listingHtml: path.join(ROOT, '.cache', 'pipeline', 'listing-html'),
  // Phase-0 snapshots (produced by the discovery scripts in .cache/scripts). Used as seed so we never re-crawl.
  legacyShop: path.join(ROOT, '.cache', 'greenleaf-shop'),
  legacyLocal: path.join(ROOT, '.cache', 'yerel'),
  data: path.join(ROOT, 'data'),
  docs: path.join(ROOT, 'docs', 'veri'),
};

/** Single source of truth for the list-price rule (K-036): list price = member price x this constant. */
export const LIST_PRICE_MULTIPLIER = 2;
/** Rounding of the derived list price (whole lira, half up). */
export const roundList = (n) => Math.floor(n + 0.5);

export const SHOP = {
  base: 'https://global.green-leaf.shop',
  // Honest, generic client name. No personal data.
  userAgent: 'GreenLeafCatalogBot/1.0 (catalog data pipeline; polite, cached, max 1 req/s)',
  minDelayMs: 1100,
  jitterMs: 400,
};

/** Codes whose xlsx name and catalog name disagree in meaning (ENVANTER C-1): kept flagged until verified. */
export const NAME_CONFLICT_CODES = ['NWA052', 'CCA016', 'ASB046', 'SAA069', 'EBB018', 'ASA017', 'ASA086', 'LGI019', 'DAB089', 'CBB017'];

/** Words that should not appear in consumer copy (TITCK); used by validation as warnings only. */
export const CLAIM_WORDS_TR = ['tedavi', 'iyileştirir', 'geçirir', 'şifa', 'ilaç', 'kanser', 'hastalık'];
export const CLAIM_WORDS_RU = ['лечит', 'лечени', 'излечи', 'болезн', 'от рака', 'терапевт'];

/** TR records whose price looks implausible (kept, flagged `price-implausible`, listed in ACIK-SORULAR). */
export const PRICE_REVIEW_CODES = ['LGD012'];

/** Consumer category (K-050 slugs) for the new panel-only TR products that have no catalog/shop mapping. Key = code, or "panel-<id>" when the record has no code.
 *  Decided from the Russian product name; flagged `category-guess` so it is reviewed. */
export const TR_CATEGORY_GUESS = {
  XNA038: ['makyaj', 'goz-makyaji'],                         // gel eyeliner
  CBA034: ['sac-bakimi', 'sac-maskesi-ve-yaglari'],           // hair essential-oil capsules
  'LPA025/CDA025': ['sac-bakimi', 'sekillendiriciler'],       // leave-in volume spray
  SCA016: ['makyaj', 'yuz-makyaji'],                          // cream powder
  MAI223: ['giyim-ve-aksesuar', 'gozlukler'],                 // sunglasses
  MAH723: ['giyim-ve-aksesuar', 'gozlukler'],                 // sunglasses
  SBE042: ['setler', 'bakim-setleri'],                        // "fullerene set" (content unknown)
  LGZ042: ['hijyen-ve-kagit', 'kadin-hijyeni'],               // night pads
  LGD012: ['cilt-bakimi', 'nemlendiriciler'],                 // smoothing cream 50 g
  'panel-3857': ['cilt-bakimi', 'yuz-temizleyiciler'],        // makeup-remover wipes (no code in panel)
};

/** Shop product ids that are reachable by direct URL / site search but missing from the category listings (found by the Phase-0 code search). */
export const SHOP_EXTRA_IDS = [988]; // CBE034 (TR product)
