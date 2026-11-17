// Step 4e: quiz tags (K-056). Derives skinType[] / concerns[] / routineStep with deterministic keyword rules (skin-tag-rules.mjs),
// writes the editorial layer data/content/skin-tags.json (EL-style, key = product id), then merges it onto final.json (input of step 5).
// Entries with "locked": true in skin-tags.json are never regenerated (manual/editor corrections win). Idempotent, no network.
import path from 'node:path';
import { PATHS } from './config.mjs';
import { readJson, writeJson } from './lib.mjs';
import { skinTypes, concernTags, routineStep, SKIN_TYPES, CONCERNS, ROUTINE_STEPS } from './skin-tag-rules.mjs';

const F = path.join(PATHS.cache, 'final.json');
const M = readJson(F);
const TAGS_FILE = path.join(PATHS.data, 'content', 'skin-tags.json');
const prev = readJson(TAGS_FILE, { tags: {} }).tags ?? {};

const BODY_CHILDREN = new Set(['vucut-kremleri', 'el-bakimi', 'ayak-bakimi', 'dus-jelleri', 'sivi-sabunlar', 'kati-sabunlar']);
const scope = (p) => {
  const { parent, child } = p.consumerCategory;
  if (parent === 'cilt-bakimi') return 'face'; // routineStep + skinType + concerns
  if (parent === 'setler') return 'set'; // skinType + concerns only
  if (parent === 'vucut-bakimi' && BODY_CHILDREN.has(child)) return 'body'; // skinType + concerns only
  return null;
};

const tags = {}; const stats = { face: 0, set: 0, body: 0, locked: 0 };
for (const p of M.products) {
  const sc = scope(p); if (!sc) continue;
  stats[sc]++;
  if (prev[p.id]?.locked) { tags[p.id] = prev[p.id]; stats.locked++; continue; }
  const title = `${p.title_ru} ${p.title_tr}`;
  const short = `${p.shortDescription_ru ?? ''} ${p.shortDescription_tr ?? ''} ${p.description_tr ?? ''}`;
  const long = typeof p._content === 'string' ? p._content : '';
  const st = skinTypes(`${title}. ${short}. ${long}`);
  const skinType = SKIN_TYPES.filter((k) => st.has(k)); // explicit statements only; "tum-ciltler" may coexist with a specific type ("all skin types, especially sensitive")
  const concerns = concernTags(short, title, p.consumerCategory.child === 'goz-cevresi');
  let step = null, why = null;
  if (sc === 'face') ({ step, why } = routineStep(p, title));
  if (sc === 'face' && why === 'makeup-product') { tags[p.id] = { code: p.code || null, title: p.title_tr, availability: p.availability, skinType: [], concerns: [], routineStep: null, rule: why }; continue; }
  tags[p.id] = { code: p.code || null, title: p.title_tr, availability: p.availability, skinType, concerns, routineStep: step, rule: why };
}
const out = {
  _meta: { owner: 'veri-muhendisi', kind: 'K-056 quiz tags (skinType/concerns/routineStep), deterministic keyword rules', rules: 'docs/veri/ETIKET-KURALLARI.md', generator: 'scripts/data/04e-skin-tags.mjs', lock: 'set "locked": true on an entry to keep a manual correction across re-runs', scope: stats },
  tags,
};
writeJson(TAGS_FILE, out, 1);

// ---- merge onto products (EL-style overlay)
const okS = new Set(SKIN_TYPES), okC = new Set(CONCERNS), okR = new Set(ROUTINE_STEPS);
let applied = 0;
for (const p of M.products) {
  const t = tags[p.id]; if (!t) continue;
  p.skinType = (t.skinType ?? []).filter((k) => okS.has(k));
  p.concerns = (t.concerns ?? []).filter((k) => okC.has(k)).slice(0, 3);
  p.routineStep = okR.has(t.routineStep) ? t.routineStep : null;
  if (p.skinType.length || p.concerns.length || p.routineStep) applied++;
}
writeJson(F, M, 0);
console.log(`skin tags: scope ${JSON.stringify(stats)}, products with >=1 tag ${applied}`);
