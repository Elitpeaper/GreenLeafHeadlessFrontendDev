import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { SHOP } from './config.mjs';

export const readJson = (p, fallback = undefined) => {
  if (!fs.existsSync(p)) { if (fallback !== undefined) return fallback; throw new Error('Missing file: ' + p); }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
};
export const writeJson = (p, obj, indent = 1) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, JSON.stringify(obj, null, indent) + '\n', 'utf8'); };
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const md5 = (s) => crypto.createHash('md5').update(s).digest('hex');

// ---------- robots.txt (minimal matcher for Disallow with * and $) ----------
export function parseRobots(txt) {
  const rules = []; let applies = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.split('#')[0].trim(); if (!line) continue;
    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/); if (!m) continue;
    const k = m[1].toLowerCase(), v = m[2].trim();
    if (k === 'user-agent') applies = v === '*';
    else if (applies && k === 'disallow' && v) rules.push(v);
  }
  return rules;
}
export function robotsAllows(rules, urlPathAndQuery) {
  return !rules.some((r) => {
    const anchored = r.endsWith('$'); const body = anchored ? r.slice(0, -1) : r;
    const re = new RegExp('^' + body.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + (anchored ? '$' : ''));
    return re.test(urlPathAndQuery);
  });
}

// ---------- polite fetch ----------
let last = 0; export const stats = { requests: 0, cached: 0, failed: 0 };
export async function politeFetch(url, { cacheFile, force = false } = {}) {
  if (cacheFile && !force && fs.existsSync(cacheFile)) { stats.cached++; return { text: fs.readFileSync(cacheFile, 'utf8'), status: 200, cached: true }; }
  const wait = Math.max(0, last + SHOP.minDelayMs + Math.random() * SHOP.jitterMs - Date.now()); if (wait) await sleep(wait);
  last = Date.now(); stats.requests++;
  const res = await fetch(url, { headers: { 'User-Agent': SHOP.userAgent, 'Accept-Language': 'ru,en;q=0.8', Accept: 'text/html,*/*' } });
  const text = await res.text();
  if (cacheFile && res.status === 200) { fs.mkdirSync(path.dirname(cacheFile), { recursive: true }); fs.writeFileSync(cacheFile, `<!-- ${res.status} ${url} -->\n` + text); }
  return { text, status: res.status, cached: false };
}

export const decodeEntities = (s) => s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#039;|&apos;/g, "'");
export const stripTags = (s) => decodeEntities(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

// ---------- slug ----------
const TR_MAP = { 'İ': 'i', 'I': 'i', 'ı': 'i', 'Ş': 's', 'ş': 's', 'Ğ': 'g', 'ğ': 'g', 'Ü': 'u', 'ü': 'u', 'Ö': 'o', 'ö': 'o', 'Ç': 'c', 'ç': 'c' };
const RU_MAP = { 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya' };
export function slugify(input, max = 80) {
  let s = [...String(input)].map((ch) => TR_MAP[ch] ?? ch).join(''); // before lowercasing (dotted-I issue)
  s = s.replace(/&/g, ' ve ').replace(/\+/g, ' plus ');
  s = [...s.toLowerCase()].map((ch) => RU_MAP[ch] ?? ch).join('');
  s = s.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (s.length > max) { s = s.slice(0, max); const i = s.lastIndexOf('-'); if (i > 20) s = s.slice(0, i); s = s.replace(/-+$/, ''); }
  return s;
}
export const normCode = (c) => (c || '').toString().trim().toUpperCase();
