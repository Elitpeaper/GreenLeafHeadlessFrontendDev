// Motion v2 proof: hover/recolor/tier/smooth-scroll/loader/svg checks over CDP. Usage: node proof.mjs <outDir>
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, sleep } from "./cdp.mjs";

const out = process.argv[2];
const BASE = "http://localhost:3201";
const b = await launch({ out, port: 9351 });
const log = {};
await b.viewport(1440, 900);

const state = `(() => { const h = document.documentElement; return { dataMotion: h.dataset.motion ?? null, runtime: h.hasAttribute('data-motion-runtime'), reducedMQ: matchMedia('(prefers-reduced-motion: reduce)').matches, hoverFine: matchMedia('(hover: hover) and (pointer: fine)').matches }; })()`;

const cardProbe = `(() => {
  const z = document.querySelector('[data-accent-zone="showcase"]');
  const card = z.querySelector('[data-product-card][data-accent]');
  const media = card.querySelector('[data-motion~="card-media"]');
  const band = card.querySelector('[data-motion~="card-band"]');
  const hdr = document.getElementById('header-accent');
  const cs = (el, p) => getComputedStyle(el, p);
  return {
    zoneAccentSoft: cs(z).getPropertyValue('--accent-soft').trim(),
    zoneAccentDecor: cs(z).getPropertyValue('--accent-decor').trim(),
    zoneBg: cs(z).backgroundColor,
    zoneActive: z.hasAttribute('data-accent-active'),
    zoneWashOpacity: cs(z, '::before').opacity,
    zoneStripeScale: cs(z, '::after').scale,
    headerActive: hdr.hasAttribute('data-accent-active'),
    headerStripe1: cs(hdr).getPropertyValue('--stripe-1').trim(),
    headerWashOpacity: cs(hdr, '::before').opacity,
    cardTranslate: cs(card).translate,
    cardGlowOpacity: cs(card.querySelector('[data-card-tile]') || card, '::after').opacity, revealOpacity: card.querySelector('[data-motion~="card-reveal"]') ? cs(card.querySelector('[data-motion~="card-reveal"]')).opacity : null,
    mediaScale: media ? cs(media).scale : null,
    mediaRotate: media ? cs(media).rotate : null,
    bandOpacity: band ? cs(band).opacity : null,
    bandScale: band ? cs(band).scale : null,
  };
})()`;

async function findCard() {
  await b.evaluate(`(() => { const z = document.querySelector('[data-accent-zone="showcase"]'); z.scrollIntoView({block: 'center', behavior: 'instant'}); })()`);
  await sleep(1200); // reveal finishes
  return b.evaluate(`(() => { const c = document.querySelector('[data-accent-zone="showcase"] [data-product-card][data-accent]'); const r = c.getBoundingClientRect(); const z = c.closest('[data-accent-zone]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height * 0.3, clip: { x: 0, y: Math.max(0, z.top - 10), width: 1440, height: Math.min(900 - Math.max(0, z.top - 10), z.height + 20) } }; })()`);
}

async function hoverRun(tag, url) {
  await b.mouse(5, 890);
  await b.goto(url, 1800);
  log[tag] = { state: await b.evaluate(state) };
  const { x, y, clip } = await findCard();
  await b.mouse(5, 890);
  await sleep(300);
  log[tag].before = await b.evaluate(cardProbe);
  await b.shot(`${tag}-1-before`);
  await b.mouse(x, y);
  await sleep(160);
  log[tag].t160 = await b.evaluate(cardProbe);
  await sleep(840);
  log[tag].after = await b.evaluate(cardProbe);
  await b.shot(`${tag}-2-hover`);
  // header band at the top of the viewport while the showcase card is hovered
  await b.shot(`${tag}-3-header-band`, { x: 0, y: 0, width: 1440, height: 140 });
  await b.mouse(720, 2);
  await sleep(1200);
  log[tag].released = await b.evaluate(cardProbe);
  await b.mouse(x, y);
  await sleep(900);
  await b.shot(`${tag}-4-card-closeup`, { x: Math.max(0, x - 220), y: Math.max(0, Math.min(y - 260, 900 - 620)), width: 440, height: 620 });
  await b.mouse(720, 2);
}

// 1) this PC as-is: Windows "Animation effects" off -> prefers-reduced-motion: reduce -> gentle tier
await hoverRun("A-os-reduced-gentle", BASE + "/?motion=on");
// 2) a machine with animations on -> full tier
await b.media([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await hoverRun("B-full", BASE + "/?motion=on");
// 3) full-motion preview override on a reduced-motion OS
await b.media([{ name: "prefers-reduced-motion", value: "reduce" }]);
await hoverRun("C-forced-full", BASE + "/?motion=full");
await b.goto(BASE + "/?motion=on", 500);
await b.media([{ name: "prefers-reduced-motion", value: "no-preference" }]);

// 4) buttons + header micro: hover the header CTA and a primary button
await b.goto(BASE + "/", 1800);
log.button = await b.evaluate(`(async () => {
  const cta = document.querySelector('[data-motion~="cta-member"]');
  return { ctaMotion: cta?.dataset.motion, ctaHasShine: cta?.dataset.motion?.includes('shine') };
})()`);
const ctaPos = await b.evaluate(`(() => { const r = document.querySelector('[data-motion~="cta-member"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
await b.mouse(ctaPos.x, ctaPos.y);
await sleep(330);
log.button.ctaHover = await b.evaluate(`(() => { const c = document.querySelector('[data-motion~="cta-member"]'); return { translate: getComputedStyle(c).translate, shineTranslate: getComputedStyle(c, '::after').translate }; })()`);
await b.shot("D-header-cta-hover-shine", { x: 0, y: 0, width: 1440, height: 140 });
await b.mouse(5, 890);

// 5) smooth scroll: one wheel notch, sample scrollY per frame
await b.goto(BASE + "/", 1500);
await b.evaluate(`window.__ys = []; (function s(){ window.__ys.push(Math.round(scrollY)); if (window.__ys.length < 60) requestAnimationFrame(s); })(); 0`);
await b.wheel(700, 500, 400);
await sleep(1200);
log.smooth = { wheel400: await b.evaluate("window.__ys") };
// keyboard still native
await b.evaluate("scrollTo({top:0,behavior:'instant'}); 0");
await sleep(200);
await b.click(700, 600);
await b.key("PageDown", "PageDown", 34);
await sleep(900);
log.smooth.afterPageDown = await b.evaluate("scrollY");
// scroll lock: open the cart drawer, wheel must not move the page
await b.evaluate("scrollTo({top:0,behavior:'instant'}); 0");
await b.goto(BASE + "/?sepet=ac", 1800);
const lockY0 = await b.evaluate("scrollY");
const dialogOpen = await b.evaluate("!!document.querySelector('dialog:modal')");
await b.wheel(300, 500, 600);
await sleep(800);
log.smooth.lock = { dialogOpen, before: lockY0, after: await b.evaluate("scrollY"), htmlOverflow: await b.evaluate("getComputedStyle(document.documentElement).overflowY") };
// anchor link glide (skip link "#icerik" exists on every page; add a test anchor to the footer)
await b.goto(BASE + "/", 1500);
await b.evaluate(`(() => { const a = document.createElement('a'); a.href = '#test-anchor'; a.id = 'proof-anchor'; a.textContent = 'anchor'; a.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:9999;background:#fff;padding:8px'; document.body.appendChild(a); const t = document.querySelector('footer'); t.id = 'test-anchor'; window.__ys = []; return 0; })()`);
await sleep(100);
await b.evaluate(`(function s(){ window.__ys.push(Math.round(scrollY)); if (window.__ys.length < 90) requestAnimationFrame(s); })(); 0`);
await b.click(30, 880);
await sleep(1800);
log.smooth.anchor = { samples: await b.evaluate("window.__ys.filter((v,i,a)=>i===0||v!==a[i-1])"), footerTop: await b.evaluate("Math.round(document.querySelector('footer').getBoundingClientRect().top)"), hash: await b.evaluate("location.hash"), focused: await b.evaluate("document.activeElement?.tagName") };

// 6) interactive SVG on the real illustration library (/svg-kutuphanesi): one sample per behaviour
await b.goto(BASE + "/svg-kutuphanesi", 2500);
log.svg = {};
for (const kind of ["bloom", "sway", "draw", "spin", "parallax"]) {
  const pos = await b.evaluate(`(() => { const s = [...document.querySelectorAll('main svg[data-svg-interact~="${kind}"]')].find(e => e.getClientRects().length && e.getBoundingClientRect().width > 40); if (!s) return null; s.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = s.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height, name: s.getAttribute('data-svg') }; })()`);
  if (!pos) { log.svg[kind] = "none on page"; continue; }
  await b.mouse(720, 2);
  await sleep(500);
  const probe = `(() => { const s = document.querySelector('svg[data-svg="${pos.name}"]'); const parts = [...s.querySelectorAll('[data-svg-part]')].slice(0, 4); const d = s.querySelector('[data-svg-drawable]'); return { hot: s.hasAttribute('data-svg-hot'), drawable: s.querySelectorAll('[data-svg-drawable]').length, dashoffset: d ? getComputedStyle(d).strokeDashoffset : null, parts: parts.map(p => p.getAttribute('data-svg-part') + ' t=' + getComputedStyle(p).translate + ' r=' + getComputedStyle(p).rotate + ' s=' + getComputedStyle(p).scale) }; })()`;
  const before = await b.evaluate(probe);
  const clip = { x: Math.max(0, pos.x - Math.max(pos.w, 160) / 2 - 20), y: Math.max(0, pos.y - Math.max(pos.h, 120) / 2 - 20), width: Math.min(1400, Math.max(pos.w, 160) + 40), height: Math.min(860, Math.max(pos.h, 120) + 40) };
  await b.shot(`E-svg-${kind}-1-before`, clip);
  await b.mouse(pos.x - pos.w * 0.3, pos.y - pos.h * 0.25);
  await sleep(kind === "draw" ? 450 : 380);
  const mid = await b.evaluate(probe);
  await b.shot(`E-svg-${kind}-2-hover`, clip);
  if (kind === "parallax") await b.mouse(pos.x + pos.w * 0.35, pos.y + pos.h * 0.3);
  await sleep(500);
  const late = await b.evaluate(probe);
  log.svg[kind] = { name: pos.name, before, mid, late };
}
await b.mouse(720, 2);

// 7) navigation loader: slow network, client navigation via a real link click
await b.goto(BASE + "/", 1500);
await b.send("Network.enable");
await b.send("Network.emulateNetworkConditions", { offline: false, latency: 1200, downloadThroughput: 25000, uploadThroughput: 25000 });
const link = await b.evaluate(`(() => { const a = [...document.querySelectorAll('main a[href^="/kategori/"], main a[href^="/urun/"]')].find(e => e.getBoundingClientRect().width > 20); if (!a) return null; a.scrollIntoView({block:"center",behavior:"instant"}); const r = a.getBoundingClientRect(); return { x: r.left + Math.min(r.width / 2, 40), y: r.top + Math.min(r.height / 2, 20), href: a.getAttribute('href') }; })()`);
log.loader = { link };
if (link) {
  await b.click(link.x, link.y);
  let seen = false;
  for (let i = 0; i < 60 && !seen; i++) {
    await sleep(60);
    seen = await b.evaluate("document.documentElement.hasAttribute('data-nav-pending')");
  }
  log.loader.pendingSeen = seen;
  if (seen) {
    await sleep(350);
    await b.shot("F-nav-loader");
    log.loader.pillOpacity = await b.evaluate("getComputedStyle(document.querySelector('[data-nav-loader]')).opacity");
    log.loader.turn = await b.evaluate("getComputedStyle(document.querySelector('[data-nav-loader] [data-loader-part=turn]')).animationName");
  }
  for (let i = 0; i < 150; i++) {
    await sleep(100);
    if (!(await b.evaluate("document.documentElement.hasAttribute('data-nav-pending')"))) break;
  }
  log.loader.clearedAt = await b.evaluate("location.pathname");
}
await b.send("Network.emulateNetworkConditions", { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });

// 8) layout shift during the hover runs
await b.goto(BASE + "/", 1500);
await b.evaluate(`window.__cls = 0; window.__clsSrc = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.__cls += e.value; window.__clsSrc.push(+e.value.toFixed(4) + ' ' + (e.sources||[]).map(x => x.node ? x.node.nodeName + '.' + String(x.node.className?.baseVal ?? x.node.className ?? '').slice(0,60) : '?').join('|')); } }).observe({ type: 'layout-shift', buffered: true }); 0`);
await findCard();
await b.wheel(700, 500, 1200);
await sleep(1500);
log.cls = await b.evaluate("window.__cls"); log.clsSources = await b.evaluate("window.__clsSrc");
log.consoleErrors = b.events.filter((e) => e.method === "Runtime.exceptionThrown" || (e.method === "Log.entryAdded" && e.params.entry.level === "error")).map((e) => JSON.stringify(e.params).slice(0, 300));

writeFileSync(join(out, "olcum.json"), JSON.stringify(log, null, 2));
console.log(JSON.stringify(log, null, 1));
b.close();
process.exit(0);
