// motion-v5 proof: Playwright (playwright-core + installed Chrome) with reducedMotion: "reduce" (the user's real setting).
// Usage: node kanit.mjs <baseUrl> <outDir>
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";

const [base = "http://localhost:3001", out = "./out"] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const report = {};
const shot = (page, name, opts = {}) => page.screenshot({ path: `${out}/${name}.png`, ...opts });
const wait = (page, ms) => page.waitForTimeout(ms);

async function open(path) {
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.addInitScript(() => {
    window.__cls = 0;
    window.__lcp = 0;
    new PerformanceObserver((l) => l.getEntries().forEach((e) => !e.hadRecentInput && (window.__cls += e.value))).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__lcp = e.startTime))).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await page.goto(base + path, { waitUntil: "load" });
  await wait(page, 3500); // runtime starts at load + idle; GSAP / Lenis lazy chunks
  return { page, errors };
}
const state = (page) =>
  page.evaluate(() => ({
    osReduce: matchMedia("(prefers-reduced-motion: reduce)").matches,
    tier: document.documentElement.dataset.motion,
    lenis: document.documentElement.classList.contains("lenis"),
    lenisSmooth: document.documentElement.classList.contains("lenis-smooth"),
    cls: Math.round(window.__cls * 1000) / 1000,
    lcp: Math.round(window.__lcp),
  }));

/** wheel once, sample scrollY over time: Lenis glides (many intermediate values), native jumps */
async function wheelSamples(page) {
  await page.mouse.move(700, 500);
  const y0 = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 600);
  const s = [];
  for (let i = 0; i < 12; i++) {
    await wait(page, 90);
    s.push(await page.evaluate(() => Math.round(scrollY)));
  }
  return [y0, ...s];
}

async function hoverCard(page, prefix, selector) {
  const card = page.locator(selector).first();
  let box;
  for (let k = 0; k < 4; k++) {
    await card.evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 250));
    await wait(page, 1800);
    box = await card.locator("[data-card-tile]").boundingBox();
    if (box && box.y > 0 && box.y < 600) break;
  }
  await page.mouse.move(box.x - 40, box.y + box.height / 2);
  await wait(page, 400);
  const y0 = Math.max(0, box.y - 30);
  const clip = { x: Math.max(0, box.x - 30), y: y0, width: box.width + 60, height: Math.min(900 - y0, box.height + 140) };
  await shot(page, `${prefix}-0-rest`, { clip });
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.25, { steps: 6 });
  await wait(page, 150);
  await shot(page, `${prefix}-1-enter-150ms`, { clip });
  await wait(page, 350);
  await shot(page, `${prefix}-2-500ms`, { clip });
  await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.8, { steps: 10 });
  await wait(page, 900);
  await shot(page, `${prefix}-3-tilt-other-corner`, { clip });
  return page.evaluate((sel) => {
    const c = document.querySelector(sel);
    const tile = c.querySelector("[data-card-tile]");
    const pill = c.querySelector("[data-qa-pill]");
    const inner = pill?.firstElementChild;
    return {
      tileTransform: getComputedStyle(tile).transform,
      pillOpacity: pill && getComputedStyle(pill).opacity,
      pillTranslate: inner && getComputedStyle(inner).translate,
      pillText: inner?.textContent,
      cardTranslate: getComputedStyle(c).translate,
    };
  }, selector);
}

// ------------------------------------------------------------------ home
{
  const { page, errors } = await open("/");
  const r = (report["/"] = { state: await state(page) });
  await shot(page, "01-home-top");
  r.wheel = await wheelSamples(page);
  // pin stage
  const geo = await page.evaluate(() => {
    const sp = document.querySelector("[data-pin-host] .pin-spacer");
    if (!sp) return null;
    const top = sp.getBoundingClientRect().top + scrollY;
    return { top, h: sp.offsetHeight };
  });
  r.pin = geo;
  if (geo) {
    for (const [i, p] of [0, 0.25, 0.5, 0.75, 1].entries()) {
      await page.evaluate((y) => window.scrollTo(0, y), Math.round(geo.top + p * (geo.h - 900)) + 2);
      await wait(page, 2800);
      await shot(page, `1${i}-pin-${String(Math.round(p * 100)).padStart(3, "0")}`);
      (r.pinFrames ??= []).push(
        await page.evaluate(() => ({
          active: [...document.querySelectorAll("[data-stage-text]")].findIndex((t) => t.hasAttribute("data-active")),
          stageTop: Math.round(document.querySelector("[data-pin-stage]").getBoundingClientRect().top),
          headerHidden: document.documentElement.hasAttribute("data-header-hidden"),
        })),
      );
    }
  }
  // showcase card hover on home
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(page, 3000);
  r.afterTopScroll = await page.evaluate(() => scrollY);
  r.cardHover = await hoverCard(page, "20-home-card", "#icerik [data-product-card][data-availability='tr']");
  // smart header: scroll down then up
  await page.mouse.wheel(0, 900);
  await wait(page, 1600);
  r.headerAfterDown = await page.evaluate(() => document.documentElement.hasAttribute("data-header-hidden"));
  await shot(page, "30-header-hidden-after-scroll-down", { clip: { x: 0, y: 0, width: 1440, height: 220 } });
  await page.mouse.wheel(0, -300);
  await wait(page, 1200);
  r.headerAfterUp = await page.evaluate(() => document.documentElement.hasAttribute("data-header-hidden"));
  await shot(page, "31-header-back-after-scroll-up", { clip: { x: 0, y: 0, width: 1440, height: 220 } });
  r.ring = await page.evaluate(() => {
    const a = document.querySelector("[data-scroll-ring]");
    const c = a.querySelector("[data-scroll-ring-bar]");
    return { visible: a.hasAttribute("data-visible"), dash: getComputedStyle(c).strokeDasharray };
  });
  await shot(page, "32-scroll-top-ring", { clip: { x: 1440 - 160, y: 900 - 160, width: 160, height: 160 } });
  r.final = await state(page);
  r.errors = errors;
  await page.close();
}

// ------------------------------------------------------------------ /urunler
{
  const { page, errors } = await open("/urunler");
  const r = (report["/urunler"] = { state: await state(page) });
  await shot(page, "40-urunler-top");
  r.wheel = await wheelSamples(page);
  r.cardHover = await hoverCard(page, "41-urunler-card-tr", "#icerik [data-product-card][data-availability='tr']");
  r.pdpHref = await page.evaluate(() => document.querySelector("#icerik [data-product-card][data-availability='tr'] a[data-card-link]")?.getAttribute("href"));
  const hasSoon = await page.locator("#icerik [data-product-card][data-availability='yakinda']").count();
  if (!hasSoon) {
    await page.goto(base + "/urunler?sayfa=3", { waitUntil: "load" });
    await wait(page, 3000);
  }
  if (await page.locator("#icerik [data-product-card][data-availability='yakinda']").count()) {
    r.soonHover = await hoverCard(page, "42-urunler-card-yakinda", "#icerik [data-product-card][data-availability='yakinda']");
  }
  r.final = await state(page);
  r.errors = errors;
  await page.close();
}

// ------------------------------------------------------------------ PDP
{
  const href = report["/urunler"].pdpHref;
  const { page, errors } = await open(href);
  const r = (report[href] = { state: await state(page) });
  await shot(page, "50-pdp-top");
  r.wheel = await wheelSamples(page);
  if (await page.locator("#icerik [data-product-card]").count()) {
    r.cardHover = await hoverCard(page, "51-pdp-related-card", "#icerik [data-product-card]");
  }
  r.final = await state(page);
  r.errors = errors;
  await page.close();
}

// ------------------------------------------------------------------ /sss: SplitText heading entrance
{
  const { page, errors } = await open("/sss");
  const r = (report["/sss"] = { state: await state(page) });
  await shot(page, "60-sss-top");
  r.waiting = await page.evaluate(() => document.querySelectorAll("[data-split-wait]").length);
  r.wheel = await wheelSamples(page);
  const h = page.locator("#icerik h2").nth(2);
  const y = await h.evaluate((el) => el.getBoundingClientRect().top + scrollY - 700);
  await page.evaluate((v) => window.scrollTo(0, v), y);
  for (const [i, ms] of [100, 250, 450, 900].entries()) {
    await wait(page, i ? ms - [100, 250, 450, 900][i - 1] : ms);
    await shot(page, `6${i + 1}-sss-split-${ms}ms`);
  }
  r.afterSplit = await page.evaluate(() => document.querySelectorAll("[data-split-wait]").length);
  r.final = await state(page);
  r.errors = errors;
  await page.close();
}

writeFileSync(`${out}/rapor.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));
await browser.close();
