// Raw (Russian) news/blog layer: .cache/blog/extracted.json -> data/content/news.raw.json + public/images/news/*.webp
// Idempotent; covers and inline images cached in .cache/blog/covers (never downloaded twice). Polite: 1.2 s between requests.
import fs from 'node:fs'; import path from 'node:path'; import sharp from 'sharp';
const UA = 'GreenleafTR-ContentBot/1.0 (content localisation for owner)';
const dec = s => (s || '').replace(/&#x([0-9A-F]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&amp;/g, '&');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ex = JSON.parse(fs.readFileSync('.cache/blog/extracted.json', 'utf8'));
fs.mkdirSync('.cache/blog/covers', { recursive: true }); fs.mkdirSync('public/images/news', { recursive: true });

// Classification (proposal). kind: haber = company news, blog = ECO guide (evergreen). usage: recommendation for editor.
const BUSINESS = /biznes|novye-vozmozhnosti-dlya-biznesa|avtopromoushen|puteshestvujte/;
const EVENT_SCHEDULE = /grafik-meropriyatiy|meropriyatiya-greenleaf|glavnoe-sobytie|zapisi-konferentsii|semiletie|7-let-greenleaf-rossiya/;
const CLUSTER = [ // same event, several posts -> merge into one TR article
  ['7-yil-konferansi', /greenleaf-7-letie-v-rossii|greenleaf-7-years-anniversary-moscow|konferentsiya-greenleaf-7-let|7-let-greenleaf-v-rossii|7-let-greenleaf-rossiya|semiletie|zapisi-konferentsii|glavnoe-sobytie/],
  ['kirgizistan-tacikistan', /3-letie-greenleaf-kyrgyzstan|greenleaf-2-years-tajikistan/],
  ['etkinlik-takvimi', /grafik-meropriyatiy|meropriyatiya-greenleaf/],
  ['ecolabel', /osoznannoe-potreblenie-i-eu-ecolabel/],
  ['ev-ekolojik', /ekologichnyy-dom(-2)?\.html/],
  ['ambalaj', /upakovka-i-menshe-plastika/],
];
function usage(o) {
  if (BUSINESS.test(o.file)) return ['business', 'Ortak/gelir içeriği: yalnız /pv-nedir#is-firsati bağlamında (K-085/K-099); haber akışında yayımlanmaz'];
  if (/novye-vozmozhnosti-dlya-pokupateley|global-green-leaf-ecological|novye-dostizheniya|ustoychivogo/.test(o.file)) return ['skip', 'Rus mağazasına özgü / doğrulanamayan genel iddia'];
  if (/osoznannoe-potreblenie-(avtomobilnaya|kruzhkovaya)|upakovka-i-menshe-plastika-3/.test(o.file)) return ['skip', 'AB düzenlemesine özgü, Türkiye okuru için düşük ilgi; kapaksız'];
  if (EVENT_SCHEDULE.test(o.file)) return ['merge', 'Bölgesel etkinlik/yinelenen duyuru: tek "yıl dönümü" haberinde birleştir veya atla'];
  return ['publish', 'Türkçe uyarlama adayı'];
}
async function img(url, key) {
  const raw = `.cache/blog/covers/${key}${path.extname(new URL(url).pathname) || '.jpg'}`;
  if (!fs.existsSync(raw)) {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!r.ok) { console.log('IMG FAIL', r.status, url); return null; }
    fs.writeFileSync(raw, Buffer.from(await r.arrayBuffer())); await sleep(1200);
  }
  const out = `public/images/news/${key}.webp`;
  const info = await sharp(raw).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  return { src: `/images/news/${key}.webp`, width: info.width, height: info.height };
}
const items = [];
for (const o of ex) {
  const key = o.file.replace(/\.html$/, '');
  const coverUrl = o.cover ? dec(o.cover) : null;
  const cover = coverUrl ? await img(coverUrl, key) : null;
  const inline = [];
  let i = 0;
  for (const m of o.body.matchAll(/<img[^>]*src="([^"]+)"/g)) {
    const u = new URL(dec(m[1]), 'https://global.green-leaf.shop/').href; if (u === coverUrl) continue;
    const r = await img(u, `${key}-body${++i}`); if (r) inline.push({ ...r, sourceUrl: u });
  }
  const [use, note] = usage(o);
  const [d, mo, y] = o.date.split('.');
  items.push({
    id: key, kind: o.section === 'eco' ? 'blog' : 'haber', section: o.section === 'eco' ? 'ЭКО газета' : 'Новости компании',
    category_ru: o.section === 'eco' ? 'ЭКО газета' : 'Новости компании',
    date: `${y}-${mo}-${d}`, title_ru: o.title, content_ru: o.body, text_ru: o.text,
    cover: cover && { ...cover, sourceUrl: coverUrl }, inlineImages: inline, sourceUrl: o.url,
    cluster: (CLUSTER.find(([, re]) => re.test(o.file)) || [null])[0],
    suggestedUsage: use, usageNote: note, translated: false,
  });
}
items.sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
fs.writeFileSync('data/content/news.raw.json', JSON.stringify({ _source: 'global.green-leaf.shop /articles?section=company_news|eco', fetchedAt: new Date().toISOString().slice(0, 10), count: items.length, items }, null, 1) + '\n');
console.log(items.length, 'items', items.filter(i => i.cover).length, 'covers');
