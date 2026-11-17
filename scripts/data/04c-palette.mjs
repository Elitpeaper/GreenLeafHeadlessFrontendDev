// Step 4c: dominant colour palette per product (K-065/K-066) -> .cache/pipeline/palette.json  { <id>: { primary, secondary, tertiary, onPrimary, contrast, swatches[], source } }
// Image source: TR products -> public/products/<slug>/main.webp (step 4b); "yakinda" -> cached 250px shop thumbnail (step 6a). Pure computation, no network.
// Method (sharp only): 48 px copy flattened on white -> drop near-white / light-grey background pixels -> bucket remaining pixels by hue (24 bins) + neutral dark bin,
// weight = saturation-biased pixel count -> primary = heaviest chromatic bucket (or neutral if packaging is dark/grey), secondary/tertiary = next buckets >= 35 deg apart.
// onPrimary = whichever of #FFFFFF / #333533 (brandbook text) / #000000 has the best WCAG contrast on primary (always >= 4.5:1 for one of white/black).
// Cached by file size+mtime so re-runs only compute new/changed images.
import fs from 'node:fs'; import path from 'node:path';
import sharp from 'sharp';
import { ROOT, PATHS } from './config.mjs';
import { readJson, writeJson } from './lib.mjs';

const merged = readJson(path.join(PATHS.cache, 'merged.json'));
const cacheFile = path.join(PATHS.cache, 'palette.json'); const cache = readJson(cacheFile, {});
const thumbDir = path.join(PATHS.cache, 'img-thumb');
const thumbs = fs.existsSync(thumbDir) ? Object.fromEntries(fs.readdirSync(thumbDir).map((f) => [f.split('.')[0], path.join(thumbDir, f)])) : {};

const hex = (r, g, b) => '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('').toUpperCase();
const rgbOf = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = (h) => { const [r, g, b] = rgbOf(h); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
export const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
function hsv(r, g, b) {
  r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0;
  if (d) h = mx === r ? ((g - b) / d + 6) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, mx ? d / mx : 0, mx];
}
const hueDist = (a, b) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };

async function paletteOf(file, relaxed = false) {
  const { data } = await sharp(file, { limitInputPixels: false }).flatten({ background: '#ffffff' }).resize(48, 48, { fit: 'inside' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const bins = new Map(); let kept = 0;
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i + 1], b = data[i + 2]; const [h, s, v] = hsv(r, g, b);
    if (v > (relaxed ? 0.985 : 0.9) && s < (relaxed ? 0.04 : 0.14)) continue; // white background
    if (!relaxed && s < 0.1 && v > 0.72) continue; // light grey / shadow (kept in the relaxed pass for white/silver products)
    const chroma = s >= 0.22 && v >= 0.18;
    const key = chroma ? 'h' + Math.floor(h / 15) : 'n' + (v < 0.35 ? 'dark' : 'mid');
    const w = chroma ? 0.4 + s : 0.35;
    const e = bins.get(key) ?? { w: 0, r: 0, g: 0, b: 0, h: 0, chroma }; e.w += w; e.r += r * w; e.g += g * w; e.b += b * w; e.h += h * w; bins.set(key, e); kept++;
  }
  if (!kept || kept < 12) return relaxed ? null : paletteOf(file, true); // white/silver packshots: second pass keeps light neutrals
  const list = [...bins.values()].map((e) => ({ ...e, rgb: [e.r / e.w, e.g / e.w, e.b / e.w], hue: e.h / e.w })).sort((a, b) => b.w - a.w);
  const total = list.reduce((a, e) => a + e.w, 0);
  // merge bins whose average colours are close (neighbouring hue bins of the same colour)
  const merged = [];
  for (const e of list) {
    const m = merged.find((x) => x.chroma === e.chroma && (!e.chroma || hueDist(x.hue, e.hue) < 25));
    if (m) { const w = m.w + e.w; m.rgb = m.rgb.map((c, i) => (c * m.w + e.rgb[i] * e.w) / w); m.hue = (m.hue * m.w + e.hue * e.w) / w; m.w = w; } else merged.push({ ...e });
  }
  merged.sort((a, b) => b.w - a.w);
  const chromatic = merged.filter((e) => e.chroma && e.w / total >= 0.06);
  const primary = chromatic[0] ?? merged[0];
  const rest = merged.filter((e) => e !== primary && e.w / total >= 0.04);
  const secondary = rest.find((e) => !e.chroma || !primary.chroma || hueDist(e.hue, primary.hue) >= 35) ?? null;
  const tertiary = rest.find((e) => e !== secondary && (!e.chroma || (hueDist(e.hue, primary.hue) >= 35 && (!secondary || hueDist(e.hue, secondary.hue) >= 35)))) ?? null;
  const p = hex(...primary.rgb);
  const sw = [primary, secondary, tertiary].filter(Boolean).map((e) => hex(...e.rgb));
  const cands = ['#FFFFFF', '#333533', '#000000'].map((c) => [c, contrast(p, c)]);
  const ok = cands.find(([, c]) => c >= 4.5) ?? cands.sort((a, b) => b[1] - a[1])[0];
  const [ph, ps, pv] = hsv(...primary.rgb);
  return { primary: p, secondary: sw[1] ?? null, tertiary: sw[2] ?? null, onPrimary: ok[0], contrast: Math.round(ok[1] * 100) / 100, swatches: sw, primaryHsv: [Math.round(ph), Math.round(ps * 100) / 100, Math.round(pv * 100) / 100], coverage: Math.round((kept / (48 * 48)) * 100) / 100 };
}

if (import.meta.url === new URL(process.argv[1], 'file:///').href || process.argv[1]?.endsWith('04c-palette.mjs')) {
  const images = readJson(path.join(PATHS.cache, 'images.json'), {});
  let computed = 0, reused = 0, noImage = 0, failed = 0; const out = {};
  for (const p of merged.products) {
    const local = images[p.id]?.files?.[0]?.file; let file = null, source = null;
    if (local) { file = path.join(ROOT, 'public', local.replace(/^\//, '')); source = 'local-800'; }
    else if (thumbs[p._source.shopId]) { file = thumbs[p._source.shopId]; source = 'shop-thumb-250'; }
    if (!file || !fs.existsSync(file)) { noImage++; continue; }
    const st = fs.statSync(file); const sig = `${source}:${st.size}:${Math.floor(st.mtimeMs)}`;
    const hit = cache[p.id];
    if (hit && hit.sig === sig) { out[p.id] = hit; reused++; continue; }
    try { const pal = await paletteOf(file); if (!pal) { failed++; continue; } out[p.id] = { ...pal, source, sig }; computed++; } catch (e) { failed++; console.log('palette failed', p.id, e.message); }
  }
  writeJson(cacheFile, out, 0);
  console.log(`palette: computed ${computed}, reused ${reused}, no image ${noImage}, failed/blank ${failed}; total ${Object.keys(out).length}`);
}
