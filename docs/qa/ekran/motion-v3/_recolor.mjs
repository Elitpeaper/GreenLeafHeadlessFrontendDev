// Recolor zone enter/leave sampling (K-231 on the home showcase). Usage: node _recolor.mjs <outDir> [baseUrl]
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, sleep } from "../motion-v2/cdp.mjs";

const out = process.argv[2];
const BASE = process.argv[3] ?? "http://localhost:3311";
const b = await launch({ out, port: 9362 });
await b.viewport(1440, 900);
const res = {};
const sample = `(() => { const z = document.querySelector('[data-accent-zone="showcase"]'); window.__s = []; const t0 = performance.now();
  const tick = () => { const cs = getComputedStyle(z); window.__s.push([Math.round(performance.now() - t0), cs.getPropertyValue('--accent-soft').trim(), cs.backgroundColor, getComputedStyle(z, '::before').opacity, getComputedStyle(z, '::after').opacity + '/' + getComputedStyle(z, '::after').scale, z.hasAttribute('data-accent-active')]); if (window.__s.length < 150) requestAnimationFrame(tick); };
  requestAnimationFrame(tick); const cs = getComputedStyle(z); return { tp: cs.transitionProperty.slice(0, 120), td: cs.transitionDuration.slice(0, 60), inline: z.getAttribute('style') }; })()`;
const summary = (s) => {
  const pick = (i) => {
    const v = s.map((x) => x[i]);
    const inter = new Set(v.filter((x) => x !== v[0] && x !== v.at(-1)));
    const ch = s.filter((x, k) => k > 0 && x[i] !== s[k - 1][i]);
    return { from: v[0], to: v.at(-1), intermediate: inter.size, firstChangeMs: ch[0]?.[0] ?? null, settledMs: ch.at(-1)?.[0] ?? null };
  };
  return { accentSoft: pick(1), background: pick(2), wash: pick(3), stripe: pick(4) };
};
for (const tier of ["reduced", "full"]) {
  await b.media([{ name: "prefers-reduced-motion", value: tier === "full" ? "no-preference" : "reduce" }]);
  await b.mouse(720, 890);
  await b.goto(BASE + "/?motion=on", 1800);
  // zone bottom at y = 700 so there is page outside the zone below it (gaps inside a zone keep the colour by design)
  await b.evaluate(`(() => { const z = document.querySelector('[data-accent-zone="showcase"]'); z.scrollIntoView({ block: 'center', behavior: 'instant' }); window.scrollBy({ top: z.getBoundingClientRect().bottom - 700, behavior: 'instant' }); })()`);
  await sleep(1500);
  const c = await b.evaluate(`(() => { const c = [...document.querySelectorAll('[data-accent-zone="showcase"] [data-product-card][data-accent]')].find((e) => { const r = e.getBoundingClientRect(); return r.top > 0 && r.top + r.height * 0.3 < 690; }); const r = c.getBoundingClientRect(); const z = c.closest('[data-accent-zone]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height * 0.3, below: Math.min(898, z.bottom + 30) }; })()`);
  // a point on the page that is in no recolor zone and not in the header
  const outside = await b.evaluate(`(() => { for (let y = 890; y > 140; y -= 20) for (let x = 20; x < 1440; x += 100) { const el = document.elementFromPoint(x, y); if (el && !el.closest("[data-accent-zone], header, #header-accent")) return { x, y }; } return { x: 1435, y: 895 }; })()`);
  await b.mouse(outside.x, outside.y);
  await sleep(500);
  const css = await b.evaluate(sample);
  await b.mouse(c.x, c.y);
  await sleep(2600);
  const enter = summary(await b.evaluate("window.__s"));
  await b.shot(`recolor-${tier}-hover`);
  await b.evaluate(sample);
  await b.mouse(outside.x, outside.y);
  await sleep(400);
  await b.shot(`recolor-${tier}-leave-400ms`);
  await sleep(2200);
  const leave = summary(await b.evaluate("window.__s"));
  await b.shot(`recolor-${tier}-rest`);
  res[tier] = { dataMotion: await b.evaluate("document.documentElement.dataset.motion"), css, enter, leave };
}
writeFileSync(join(out, "olcum-recolor.json"), JSON.stringify(res, null, 2));
console.log(JSON.stringify(res, null, 1));
b.close();
