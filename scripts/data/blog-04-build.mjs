// Builds data/content/blog.json, public/blog/<slug>/cover.webp and docs/icerik/BLOG-KAYNAKLARI.md
import fs from 'node:fs'; import path from 'node:path';
import sharp from 'sharp';
import { articles } from './blog-03-articles.mjs';

const BASE = 'https://global.green-leaf.shop/';
const UA = 'GreenleafTR-ContentBot/1.0 (content localisation for owner)';
const ex = JSON.parse(fs.readFileSync('.cache/blog/extracted.json', 'utf8'));
const dec = s => s.replace(/&#x([0-9A-F]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&amp;/g, '&');
const sleep = ms => new Promise(r => setTimeout(r, ms));
fs.mkdirSync('.cache/blog/covers', { recursive: true });

const ALLOWED = new Set(['p', 'h2', 'h3', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'img', 'blockquote']);
function check(html, slug) {
  for (const m of html.matchAll(/<\/?([a-z0-9]+)/gi)) if (!ALLOWED.has(m[1].toLowerCase())) throw new Error(`${slug}: tag ${m[1]}`);
  if (/<a\b|<img\b/i.test(html)) throw new Error(`${slug}: unexpected link/img`);
  if (/[А-Яа-яЁё]/.test(html)) throw new Error(`${slug}: Cyrillic left`);
  if (/\b(Rus markası|Rusya)/.test(html)) throw new Error(`${slug}: Russia mention`);
}

const out = [];
for (const a of articles) {
  check(a.body, a.slug);
  if (a.excerpt.length > 180) throw new Error(a.slug + ' excerpt too long');
  const srcRec = ex.find(o => o.url === BASE + a.src);
  if (!srcRec) throw new Error('source not found ' + a.src);
  let cover = null;
  if (a.coverFile) {
    const rec = ex.find(o => o.file === a.coverFile + '.html');
    const url = dec(rec.cover);
    const raw = `.cache/blog/covers/${a.coverFile}${path.extname(url)}`;
    if (!fs.existsSync(raw)) {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (!r.ok) throw new Error('cover ' + r.status + ' ' + url);
      fs.writeFileSync(raw, Buffer.from(await r.arrayBuffer())); await sleep(1200);
    }
    const dir = `public/blog/${a.slug}`; fs.mkdirSync(dir, { recursive: true });
    const info = await sharp(raw).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${dir}/cover.webp`);
    cover = { src: `/blog/${a.slug}/cover.webp`, alt: a.coverAlt, width: info.width, height: info.height };
  }
  const words = a.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  out.push({
    slug: a.slug, type: a.type, title: a.title, excerpt: a.excerpt, date: a.date, category: a.category, cover,
    body_html: a.body.replace(/\n/g, ''), sourceUrl: BASE + a.src, readingMinutes: Math.max(1, Math.round(words / 200)),
  });
}
out.sort((x, y) => y.date.localeCompare(x.date) || x.slug.localeCompare(y.slug));
fs.mkdirSync('data/content', { recursive: true });
fs.writeFileSync('data/content/blog.json', JSON.stringify(out, null, 2) + '\n');

let md = `# Blog kaynakları\n\nKaynak: global.green-leaf.shop (kullanım izni: K-180). Çekim: ${new Date().toISOString().slice(0, 10)}, UA \`${UA}\`, istekler arası >=1 sn, robots.txt'e uyuldu, önbellek \`.cache/blog/\`. Metinler çeviri değil, Türkçe uyarlamadır (tedavi edici iddia, bölgesel/Rusya'ya özgü ayrıntılar, yapay zeka danışmanı tanıtımı ve kişi adları çıkarıldı).\n\n## Yayınlananlar (${out.length})\n\n| Slug | Tür | Tarih | Kaynak URL | Birleştirilen ek kaynaklar |\n|---|---|---|---|---|\n`;
for (const a of articles) md += `| ${a.slug} | ${a.type} | ${a.date} | ${BASE + a.src} | ${(a.srcAlso || []).map(s => BASE + s).join('<br>') || '-'} |\n`;
const used = new Set(articles.flatMap(a => [a.src, ...(a.srcAlso || [])]).map(s => BASE + s));
md += `\n## Taranıp alınmayanlar\n\n| Kaynak URL | Gerekçe |\n|---|---|\n`;
const reasons = (o) => {
  const f = o.file;
  if (/biznes|novye-vozmozhnosti-dlya-biznesa|avtopromoushen|puteshestvujte/.test(f)) return 'Ortak/gelir teşviki içeriği (K-015)';
  if (/grafik-meropriyatiy|meropriyatiya|glavnoe-sobytie|zapisi-konferentsii|semiletie|7-let-greenleaf/.test(f)) return 'Bölgesel etkinlik duyurusu/takvimi veya yineleyen içerik';
  if (/novye-vozmozhnosti-dlya-pokupateley|global-green-leaf-ecological|novye-dostizheniya|ustoychivogo/.test(f)) return 'Rus mağazasına özgü ya da doğrulanamayan genel iddialar';
  if (/osoznannoe-potreblenie-(avtomobilnaya|kruzhkovaya)|upakovka-i-menshe-plastika-3/.test(f)) return 'AB düzenlemesine özgü, Türkiye okuru için ilgisiz; görseli yok';
  if (/ekologichnyy-dom\.html/.test(f)) return 'Ekologichnyy-dom-2 ile yinelenen; tek yazıda birleştirildi';
  return 'Seçim dışı';
};
for (const o of ex) if (!used.has(o.url)) md += `| ${o.url} | ${reasons(o)} |\n`;
md += `\n## Notlar\n- Kaynakta sayfalama yok (\`/articles?section=company_news\` 22, \`section=eco\` 12 yazı).\n- Kapaksız kaynak yazılar (${out.filter(o => !o.cover).length} adet) \`cover: null\` ile yayınlanır; arayüz marka yer tutucusu göstermelidir.\n- Eko rehber yazılarının atıf bağlantıları (AB Komisyonu, EPA) gövdeye bağlantı olarak değil, "Kaynak:" satırı olarak eklendi.\n`;
fs.writeFileSync('docs/icerik/BLOG-KAYNAKLARI.md', md);
console.log(out.length, 'articles;', out.filter(o => o.cover).length, 'covers');
