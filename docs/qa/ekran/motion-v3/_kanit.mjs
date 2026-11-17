// Motion v3 proof (K-231 smooth enter/leave, K-233 hero intro). Usage: node _kanit.mjs <outDir> [baseUrl]
// Needs a preview production build (NEXT_PUBLIC_PREVIEW_ALL=1) so /hareket-lab/v3 exists.
// Method: a rAF sampler inside the page records computed styles every frame while CDP moves the real mouse in/out;
// filmstrips are taken deterministically by pausing all running animations/transitions at fixed currentTime values.
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, sleep } from "../motion-v2/cdp.mjs";

const out = process.argv[2];
const BASE = process.argv[3] ?? "http://localhost:3311";
const b = await launch({ out, port: 9361 });
const log = { base: BASE, date: new Date().toISOString() };
await b.viewport(1440, 900);

const IDS = { "lab-btn": "backgroundColor", "lab-chip": "backgroundColor", "lab-link": "color", "lab-tile": "boxShadow", "lab-fade": "opacity" };

const sampler = (id, prop) => `(() => {
  const el = document.getElementById(${JSON.stringify(id)});
  window.__s = []; const t0 = performance.now();
  const tick = () => { window.__s.push([Math.round(performance.now() - t0), getComputedStyle(el)[${JSON.stringify(prop)}]]); if (window.__s.length < 90) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  const cs = getComputedStyle(el);
  return { transitionProperty: cs.transitionProperty.slice(0, 200), transitionDuration: cs.transitionDuration.slice(0, 80), transitionTimingFunction: cs.transitionTimingFunction.slice(0, 60) };
})()`;
const centre = (id) => b.evaluate(`(() => { const r = document.getElementById(${JSON.stringify(id)}).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, r: { x: Math.max(0, r.left - 24), y: Math.max(0, r.top + scrollY - 24), width: r.width + 48, height: r.height + 48 } }; })()`);

/** distinct values between the two end states = the change was spread over frames (not a snap) */
function analyse(samples) {
  const vals = samples.map((s) => s[1]);
  const first = vals[0];
  const last = vals[vals.length - 1];
  const changes = samples.filter((s, i) => i > 0 && s[1] !== samples[i - 1][1]);
  const inter = new Set(vals.filter((v) => v !== first && v !== last));
  return {
    from: first,
    to: last,
    framesWithChange: changes.length,
    intermediateValues: inter.size,
    firstChangeMs: changes[0]?.[0] ?? null,
    settledMs: changes.at(-1)?.[0] ?? null,
    smooth: inter.size >= 3,
  };
}

async function k231(tier) {
  const url = BASE + "/hareket-lab/v3" + (tier === "full" ? "?motion=on" : "?motion=on");
  await b.media([{ name: "prefers-reduced-motion", value: tier === "full" ? "no-preference" : "reduce" }]);
  await b.mouse(5, 5);
  await b.goto(url, 1500);
  await b.evaluate(`document.getElementById('k231').scrollIntoView({ block: 'center', behavior: 'instant' })`);
  await sleep(600);
  log[tier] = { dataMotion: await b.evaluate("document.documentElement.dataset.motion ?? null"), elements: {} };
  for (const [id, prop] of Object.entries(IDS)) {
    const { x, y } = await centre(id);
    await b.mouse(x, 860);
    await sleep(400);
    const css = await b.evaluate(sampler(id, prop));
    await b.mouse(x, y); // enter
    await sleep(900);
    const enter = analyse(await b.evaluate("window.__s"));
    await b.evaluate(sampler(id, prop));
    await b.mouse(x, 860); // leave
    await sleep(900);
    const leave = analyse(await b.evaluate("window.__s"));
    log[tier].elements[id] = { prop, css, enter, leave };
  }
}

// filmstrip of a hover LEAVE: hover, settle, leave, then freeze the running transitions at fixed times
async function leaveFilm(tier, id, times) {
  const { x, y, r } = await centre(id);
  await b.mouse(x, y);
  await sleep(700);
  await b.shot(`${tier}-${id}-0-hover`, r);
  for (const t of times) {
    await b.mouse(x, y);
    await sleep(700);
    await b.mouse(x, 860);
    await b.evaluate(`(() => { for (const a of document.getAnimations()) { if (!(a instanceof CSSTransition)) continue; try { a.pause(); a.currentTime = ${t}; } catch {} } })()`);
    await sleep(60);
    await b.shot(`${tier}-${id}-leave-${String(t).padStart(3, "0")}ms`, r);
    await b.evaluate("document.getAnimations().forEach((a) => { if (a instanceof CSSTransition) try { a.finish(); } catch {} })");
  }
  await sleep(400);
  await b.shot(`${tier}-${id}-9-rest`, r);
}

await k231("full");
await leaveFilm("full", "lab-chip", [0, 60, 125, 190, 250]);
await leaveFilm("full", "lab-tile", [0, 125, 250]);
await k231("reduced");
await leaveFilm("reduced", "lab-chip", [0, 60, 125, 190, 250]);

// real site: pill buttons keep their colour transition in the full tier (v2 bug: unlayered press rule dropped it)
await b.media([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await b.goto(BASE + "/?motion=on", 1500);
log.sitePills = await b.evaluate(`[...document.querySelectorAll('a[class*="rounded-pill"],button[class*="rounded-pill"]')].slice(0, 6).map((el) => ({ text: el.textContent.trim().slice(0, 30), transitionProperty: getComputedStyle(el).transitionProperty.slice(0, 160), duration: getComputedStyle(el).transitionDuration.slice(0, 40) }))`);

// recolor LEAVE on the home showcase in the gentle tier: smooth (v2 was instant)
async function recolorLeave(tier) {
  await b.media([{ name: "prefers-reduced-motion", value: tier === "full" ? "no-preference" : "reduce" }]);
  await b.goto(BASE + "/?motion=on", 1800);
  const pos = await b.evaluate(`(() => { const z = document.querySelector('[data-accent-zone="showcase"]'); if (!z) return null; z.scrollIntoView({ block: 'center', behavior: 'instant' }); return true; })()`);
  if (!pos) return (log["recolor-" + tier] = "no showcase zone on /");
  await sleep(1200);
  const c = await b.evaluate(`(() => { const c = document.querySelector('[data-accent-zone="showcase"] [data-product-card][data-accent]'); const r = c.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height * 0.3 }; })()`);
  await b.mouse(c.x, c.y);
  await sleep(1200);
  await b.evaluate(`(() => { const z = document.querySelector('[data-accent-zone="showcase"]'); window.__s = []; const t0 = performance.now(); const tick = () => { window.__s.push([Math.round(performance.now() - t0), getComputedStyle(z).getPropertyValue('--accent-soft').trim()]); if (window.__s.length < 90) requestAnimationFrame(tick); }; requestAnimationFrame(tick); })()`);
  await b.mouse(720, 4);
  await sleep(1600);
  log["recolor-" + tier] = { dataMotion: await b.evaluate("document.documentElement.dataset.motion"), leave: analyse(await b.evaluate("window.__s")) };
}
await recolorLeave("reduced");
await recolorLeave("full");

// K-233 hero intro: timeline values + deterministic filmstrip + LCP/CLS
async function heroIntro(tier) {
  await b.media([{ name: "prefers-reduced-motion", value: tier === "full" ? "no-preference" : "reduce" }]);
  await b.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `window.__lcp = []; window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp.push({ t: Math.round(e.startTime), el: e.element ? e.element.tagName + (e.element.dataset.motionPart ? '[' + e.element.dataset.motionPart + ']' : '') : null, size: e.size }); }).observe({ type: 'largest-contentful-paint', buffered: true }); new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });`,
  });
  await b.goto(BASE + "/hareket-lab/v3?motion=on", 2000);
  const rec = { dataMotion: await b.evaluate("document.documentElement.dataset.motion"), lcp: await b.evaluate("window.__lcp"), cls: await b.evaluate("window.__cls"), fcp: await b.evaluate("Math.round(performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? -1)") };
  // replay deterministically: restart the CSS animations and freeze them at fixed times
  const times = [0, 150, 300, 450, 600, 800, 1200];
  rec.frames = [];
  for (const t of times) {
    const v = await b.evaluate(`(() => {
      const hero = document.getElementById('lab-hero');
      hero.style.display = 'none'; void hero.offsetHeight; hero.style.display = ''; // restart the CSS animations
      const anims = hero.getAnimations({ subtree: true });
      for (const a of anims) { try { a.pause(); a.currentTime = ${t}; } catch {} }
      const q = (p) => hero.querySelector('[data-motion-part="' + p + '"]');
      const cs = (p) => getComputedStyle(q(p));
      const lw = q('logo').offsetWidth, tx = parseFloat(cs('logo').translate) || 0;
      return { t: ${t}, animations: anims.length, logoWidth: lw, rollDegFromDistance: Math.round(tx / 100 / Math.PI * 360 * 10) / 10 /* translate is in % of the logo width (= diameter) */, logoTranslate: cs('logo').translate, logoRotate: cs('logo').rotate, logoOpacity: cs('logo').opacity, titleOpacity: cs('title').opacity, leadOpacity: cs('lead').opacity, mediaOpacity: cs('media').opacity, mediaScale: cs('media').scale, layer0Opacity: cs('layer').opacity };
    })()`);
    rec.frames.push(v);
    await b.shot(`hero-${tier}-${String(t).padStart(4, "0")}ms`, { x: 0, y: 0, width: 1440, height: 900 });
  }
  await b.evaluate("document.getElementById('lab-hero').getAnimations({ subtree: true }).forEach((a) => { try { a.finish(); } catch {} })");
  log["hero-" + tier] = rec;
}
await heroIntro("full");
await heroIntro("reduced");

// mobile 390 x 844, full tier: logo 88 px rolls the same number of turns over a shorter distance
await b.media([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await b.viewport(390, 844, true);
await b.goto(BASE + "/hareket-lab/v3?motion=on", 1800);
log["hero-mobile"] = await b.evaluate(`(() => { const hero = document.getElementById('lab-hero'); hero.style.display = 'none'; void hero.offsetHeight; hero.style.display = ''; const a = hero.getAnimations({ subtree: true }); for (const x of a) { try { x.pause(); x.currentTime = 300; } catch {} } const l = hero.querySelector('[data-motion-part="logo"]'); const cs = getComputedStyle(l); return { logoWidth: l.offsetWidth, translate: cs.translate, rotate: cs.rotate, rollDegFromDistance: Math.round(parseFloat(cs.translate) / 100 / Math.PI * 3600) / 10 }; })()`);
await b.shot("hero-mobile-0300ms", { x: 0, y: 0, width: 390, height: 844 });
await b.evaluate("document.getElementById('lab-hero').getAnimations({ subtree: true }).forEach((a) => { try { a.finish(); } catch {} })");
await b.shot("hero-mobile-final", { x: 0, y: 0, width: 390, height: 844 });
await b.viewport(1440, 900);

// S-067 b: client-side navigation away and back -> data-intro removed, the entrance does not replay
await b.goto(BASE + "/hareket-lab/v3?motion=on", 1800);
const before = await b.evaluate("document.documentElement.hasAttribute('data-intro')");
const link = await b.evaluate(`(() => { const r = document.getElementById('lab-v1').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
await b.click(link.x, link.y);
await sleep(2500);
const afterNav = await b.evaluate("[location.pathname, document.documentElement.hasAttribute('data-intro')]");
await b.evaluate("history.back()");
await sleep(2500);
log["intro-no-replay"] = {
  fullLoadHasIntro: before,
  afterClientNav: afterNav,
  backOnV3: await b.evaluate("[location.pathname, document.documentElement.hasAttribute('data-intro'), document.getElementById('lab-hero').getAnimations({ subtree: true }).filter((a) => a.animationName && a.animationName.startsWith('gl-logo')).length, getComputedStyle(document.querySelector('[data-motion-part=\"title\"]')).opacity]"),
};

// JS disabled: everything in its final pose
await b.send("Emulation.setScriptExecutionDisabled", { value: true });
await b.goto(BASE + "/hareket-lab/v3", 1500);
await b.shot("hero-js-kapali", { x: 0, y: 0, width: 1440, height: 900 });
log["hero-js-off"] = await b.evaluate("(() => { const q = (p) => getComputedStyle(document.querySelector('[data-motion-part=\"' + p + '\"]')); return { dataMotion: document.documentElement.dataset.motion ?? null, logoOpacity: q('logo').opacity, logoRotate: q('logo').rotate, titleOpacity: q('title').opacity }; })()").catch((e) => String(e));
await b.send("Emulation.setScriptExecutionDisabled", { value: false });

writeFileSync(join(out, "olcum.json"), JSON.stringify(log, null, 2));
b.close();
console.log("done");
