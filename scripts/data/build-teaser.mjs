// Builds data/teaser.json for the "yakında" landing page from the local research cache.
// Sources (read-only, gitignored): .cache/yerel/xlsx-products.json (price = member price, PV, image URL)
//                                  .cache/yerel/catalog-products.json (clean TR name, volume, category)
// Run: node scripts/data/build-teaser.mjs   (output is committed; the app never reads .cache at runtime)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const read = (p) => JSON.parse(readFileSync(resolve(root, p), "utf8"));

const xlsx = read(".cache/yerel/xlsx-products.json");
const catalog = read(".cache/yerel/catalog-products.json");
const byCode = new Map(catalog.map((p) => [p.code, p]));

// K-036: list price = member price × LIST_PRICE_MULTIPLIER
const LIST_PRICE_MULTIPLIER = 2;

// Curated mix (images reviewed visually: clean packshots, green/yellow harmony): skin, hair, hand/body, kids, home.
// No health/supplement items (TİTCK caution). ASB044 excluded: its source PNG is 11.6 MB and times out in the optimizer.
const PICK = ["SAA069", "SBJ064", "CBF015", "FPA151", "CAA038", "DAA108", "EBB018", "ASA086"];

// Sub-brand names in source data are inconsistently cased; normalise for display.
const BRANDS = ["SEALUXE", "iLiFE", "CARICH", "YIBEILE", "pinkpoint", "Nilrich", "Greenleaf"];

const items = PICK.map((code) => {
  const x = xlsx.find((p) => p.code === code);
  const c = byCode.get(code);
  if (!x || !c) throw new Error(`Missing source row for ${code}`);
  const name = c.name_clean;
  const brand = BRANDS.find((b) => name.toLowerCase().startsWith(b.toLowerCase())) ?? null;
  return {
    code,
    brand,
    name: brand ? name.slice(brand.length).trim() : name,
    volume: c.volume && c.volume !== "—" ? c.volume : null,
    category: c.category,
    memberPrice: x.price,
    listPrice: x.price * LIST_PRICE_MULTIPLIER,
    pv: x.pv,
    image: x.imageUrl,
  };
});

const out = resolve(root, "data/teaser.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(
  out,
  JSON.stringify(
    { generatedAt: new Date().toISOString().slice(0, 10), currency: "TRY", listPriceMultiplier: LIST_PRICE_MULTIPLIER, items },
    null,
    2,
  ) + "\n",
);
console.log(`teaser: wrote ${items.length} products -> data/teaser.json`);
