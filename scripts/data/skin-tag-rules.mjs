// Deterministic keyword rules for quiz tags (K-056 vocabulary). Documented in docs/veri/ETIKET-KURALLARI.md.
// Principle: explicit evidence only; ambiguous -> empty. No network, no randomness.

export const SKIN_TYPES = ['kuru', 'yagli', 'karma', 'normal', 'hassas', 'tum-ciltler'];
export const CONCERNS = ['nem', 'parlama-gozenek', 'tikali-gozenek', 'isilti', 'ton-esitsizligi', 'ince-cizgi', 'yatistirma', 'goz-cevresi'];
export const ROUTINE_STEPS = ['temizleme', 'tonik', 'serum', 'nemlendirme', 'gunes-koruma', 'maske', 'peeling', 'goz-bakimi', 'dudak-bakimi', 'makyaj-temizleme'];

export const norm = (s) => String(s ?? '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/İ/g, 'i').toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ');

// ---- skinType: stems (ru) / words (tr) per type, matched inside a "for ... skin" phrase
const E = '(?:ой|ую|ая|ых|ые|ому|ого|ым|им|ыми|ие|ий|ей)'; // adjective endings only: "сухости" (noun, dryness) must not count as "dry skin"
const TYPE_STEMS = [
  ['kuru', new RegExp(String.raw`сух${E}|\bkuru|\bdry\b`)],
  ['yagli', new RegExp(String.raw`жирн${E}|маслян${E}|\byağlı|\boily\b`)],
  ['karma', new RegExp(String.raw`комбинированн${E}|\bkarma\b|combination`)],
  ['normal', new RegExp(String.raw`нормальн${E}|\bnormal\b`)],
  ['hassas', new RegExp(String.raw`чувствительн${E}|гипоаллергенн[а-я]*|\bhassas|sensitive`)],
  ['tum-ciltler', /всех типов|любого типа|любой тип|все типы|\btüm\b|универсальн|\bher cilt|all skin/],
];
// phrase extractors: group 1 = the qualifier list in front of "кожа"/"cilt"
const PHRASES_RU = [
  /для\s+([а-я,\s\-]{3,70}?)\s*(?:тип[а-я]*\s+)?кож[а-я]*/g,
  new RegExp(String.raw`((?:сух|жирн|комбинированн|чувствительн|нормальн)${E}(?:\s*(?:,|и|или)\s*[а-я]+){0,3})\s+(?:тип[а-я]*\s+)?кож[а-я]*`, 'g'),
  /((?:всех типов|любого типа|любой тип|все типы)\s+кож)/g,
];
const PHRASES_TR = [
  /((?:kuru|yağlı|karma|normal|hassas|tüm|her)(?:\s*(?:,|ve|ile|veya)\s*[a-zçğıöşü]+){0,3})\s+(?:cilt|ten)\w*/g,
  /(tüm cilt tipleri\w*|her cilt tipi\w*|tüm cilt)/g,
];
const NEGATION = /(?:не\s+(?:подходит|рекоменд\w+|предназнач\w+)|противопоказ\w*|uygun değil|önerilmez)\s*[^.]{0,40}$/;

export function skinTypes(text) {
  const t = norm(text); const found = new Set();
  const scan = (phrases) => {
    for (const re of phrases) {
      re.lastIndex = 0; let m;
      while ((m = re.exec(t))) {
        const before = t.slice(Math.max(0, m.index - 45), m.index);
        if (NEGATION.test(before)) continue;
        // "suitable for all types, including sensitive" is an inclusion, not a positioning: keep tum-ciltler only
        const inclusion = /включая|в том числе|dahil/.test(before.slice(-25) + m[0]);
        if (inclusion) { if (/(?:всех типов|любого типа|любой тип|все типы|tüm cilt)/.test(m[1])) found.add('tum-ciltler'); continue; }
        // drop sentence fragments that carry another subject: only the qualifier words themselves count
        for (const [key, stem] of TYPE_STEMS) if (stem.test(m[1])) found.add(key);
      }
    }
  };
  scan(PHRASES_RU); scan(PHRASES_TR);
  // oil-control positioning (explicit sebum control) = oily/combination positioning
  return found;
}

// ---- concerns: [key, regex] over title + short description (ru+tr); long RU marketing text is NOT used (too noisy)
export const CONCERN_RULES = [
  ['nem', /увлажн|сухост|шелуш|kuruluk|pul pul|гиалурон|hyaluron|hiyaluron|\bnem\b|nemli|nemlend|nemle\b|hidrat|moistur|hydra|гидро(?!фильн)/],
  ['parlama-gozenek',/себум|матирующ|матовост|контрол\w+ жирност|жирн\w+ блеск|сужен\w+ пор|сужа\w+ пор|сужающ\w+ пор|\bматов\w+ эффект|sebum|yağ dengesi|yağ kontrol|parlama|gözenek (?:sıkılaş|görünüm|küçült)|mat görünüm|matlaş/],
  ['tikali-gozenek', /черн\w+ точ|комедон|очищ\w+ пор|очищени\w+ пор|глубок\w+ очищени\w+ пор|siyah nokta|tıkalı|gözenek (?:temizl|derin)|gözenekleri temizl/],
  ['isilti', /сияни|придае\w+ сия|тускл|осветля|осветл|\bблеск\w* кож|\bглоу\b|glow|aydınlat|ışıltı|ışıl|canlılık|parlaklık|мерцан|шиммер/],
  ['ton-esitsizligi', /отбел|пигмент|пятн|выравнива\w+ тон|тон кож|ровн\w+ тон|веснушк|осветля\w+ пятн|leke|ton eşitsiz|ton eşitleme|ton düzgün|beyazlat|arbutin|ниацинамид|niacinamide|niasinamid/],
  ['ince-cizgi', /морщин|антивозраст|антиэйдж|anti-?age|омолаж|лифтинг|подтяж|подтягива|упруг|эластичност|укрепля\w+ кож|firming|kırışık|ince çizgi|sıkılaş|sıkılık|yaşlanma|elastikiyet|kolajen|коллаген|пептид|peptit|peptid/],
  ['yatistirma', /успокаива|успокоительн|успокоени|покраснен|раздражен|цент[еэ]лл|\bцика\b|\bcica\b|centella|calming|yatıştır|kızarıklı|rahatlat|умиротвор/],
  ['goz-cevresi', /вокруг глаз|для глаз|для век|кожи век|круги под|под глаз|мешки под|глаз\w* патч|патчи для глаз|göz çevres|göz altı|göz kremi|göz serumu|göz maskesi|eye\b/],
];

// ---- routineStep
const STEP_OVERRIDES = [
  // order matters; title-level evidence only
  ['makyaj-temizleme', /снятия макияжа|для снятия макияж|мицеллярн|гидрофильн\w* масл|makyaj temizl|makyaj çıkar|demakiyaj|micellar|misel/],
  ['peeling', /скраб|пилинг|гоммаж|эксфол|peeling|scrub|\bpiling\b|ölü deri/],
  ['gunes-koruma', /\bspf\b|солнцезащит|от солнца|güneş koru|güneş kremi|sun ?screen|\buv\b/],
  ['maske', /маска|маски|маск\b|\bmaske|\bmask\b|патч.{0,6}маск|sheet mask/],
];
const STEP_TEXT = [
  ['serum', /сыворотк|эссенци|ампул|концентрат|serum|essence|esans|ampul|konsantre/],
  ['tonik', /тоник|тонер|toner|tonik|гидролат|мист\b|спрей для лица/],
  ['temizleme', /умыван|очищающ|пенк[аи]|cleanser|temizley|temizleme|köpüğü|köpük|yıkama|гель для лица|мыло для лица/],
  ['nemlendirme', /\bкрем|\bcream|\bkrem|emulsi|эмульси|лосьон|молочко|\bsüt|nemlend|увлажня|\bбальзам|\bгель\b|\bjel/],
];
// category (child slug) defaults, spec §3.3
const CHILD_DEFAULT = {
  'yuz-temizleyiciler': 'temizleme', 'tonik-ve-losyonlar': 'tonik', serumlar: 'serum', nemlendiriciler: 'nemlendirme',
  'yuz-maskeleri': 'maske', 'goz-cevresi': 'goz-bakimi', 'gunes-koruma': 'gunes-koruma', 'dudak-bakimi': 'dudak-bakimi',
};
const MAKEUP_PRODUCT = /для макияжа|makyaj kremi|праймер|основа под|тональ|bb\b|cc\b|помад|румян|тени\b|консилер|пудр/; // makeup, not skin care: no routineStep

export function routineStep(p, title) {
  const t = norm(title); const child = p.consumerCategory.child;
  if (MAKEUP_PRODUCT.test(t) && !/снятия|temizl/.test(t)) return { step: null, why: 'makeup-product' };
  const eyeTitle = /вокруг глаз|для глаз|для век|под глаз|глаз\w* патч|göz/.test(t);
  if (child === 'goz-cevresi' || (eyeTitle && child !== 'yuz-maskeleri')) {
    if (STEP_OVERRIDES[0][1].test(t)) return { step: 'makyaj-temizleme', why: 'title:makyaj-temizleme' };
    return { step: 'goz-bakimi', why: child === 'goz-cevresi' ? 'category:goz-cevresi' : 'title:eye' };
  }
  for (const [step, re] of STEP_OVERRIDES) if (re.test(t)) {
    if (step === 'maske' && child === 'dudak-bakimi') continue; // lip mask stays lip care
    return { step, why: `title:${step}` };
  }
  if (child === 'serumlar' && /\bкрем\b|молочко|\bsüt|\bkrem|эмульси|лосьон/.test(t) && !/сыворотк|serum|эссенци|ампул/.test(t)) return { step: 'nemlendirme', why: 'title:cream-in-serum-category' };
  if (child === 'tonik-ve-losyonlar' && /\bкрем\b|\bkrem|\bcream/.test(t) && !/тоник|toner|tonik/.test(t)) return { step: 'nemlendirme', why: 'title:cream-in-tonic-category' };
  if (child && CHILD_DEFAULT[child]) return { step: CHILD_DEFAULT[child], why: `category:${child}` };
  // child null / erkek-cilt-bakimi: text only
  for (const [step, re] of STEP_TEXT) if (re.test(t)) return { step, why: `title:${step}` };
  return { step: null, why: 'ambiguous' };
}

export function concernTags(shortText, title, categoryDefaultEye) {
  const tTitle = norm(title), tShort = norm(shortText); const scored = [];
  CONCERN_RULES.forEach(([key, re], i) => {
    let s = 0;
    if (re.test(tTitle)) s += 3;
    if (re.test(tShort)) s += 2;
    if (key === 'goz-cevresi' && categoryDefaultEye) s += 3;
    if (s) scored.push([key, s, i]);
  });
  scored.sort((a, b) => b[1] - a[1] || a[2] - b[2]);
  return scored.slice(0, 3).map(([k]) => k);
}
