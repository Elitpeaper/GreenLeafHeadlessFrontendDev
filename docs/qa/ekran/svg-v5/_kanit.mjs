// svg-v5 proof: reducedMotion "reduce" emulation (site runs full tier, K-264). Samples [data-scroll-svg] visual state.
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const out = path.dirname(fileURLToPath(import.meta.url)) + path.sep;
mkdirSync(out, { recursive: true });
const base = "http://localhost:3001";
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

const sig = (page, i) =>
  page.evaluate((i) => {
    const el = document.querySelectorAll("[data-scroll-svg]")[i];
    if (!el) return null;
    const parts = [...el.querySelectorAll("[data-svg-part], path, g")].slice(0, 80);
    const s = [getComputedStyle(el).transform, ...parts.map((p) => getComputedStyle(p).transform + "|" + getComputedStyle(p).strokeDashoffset + "|" + getComputedStyle(p).opacity)].join(";");
    let h = 0;
    for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return { hash: h, tier: document.documentElement.dataset.motion, rect: el.getBoundingClientRect().toJSON() };
  }, i);

const report = {};
for (const [name, p] of [["home", "/"], ["blog", "/blog"], ["haberler", "/haberler"], ["sss", "/sss"]]) {
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  await page.goto(base + p, { waitUntil: "load" });
  await page.waitForTimeout(3500);
  const modes = await page.evaluate(() => [...document.querySelectorAll("[data-scroll-svg]")].map((e) => e.dataset.scrollSvg + ":" + e.getBoundingClientRect().width));
  report[name] = { count: modes.length, modes, errs, items: [] };
  for (let i = 0; i < modes.length; i++) {
    if (!(Number(modes[i].split(":")[1]) > 0)) {
      report[name].items.push({ i, visible: false });
      continue;
    }
    await page.evaluate((i) => {
      const e = document.querySelectorAll("[data-scroll-svg]")[i];
      window.scrollTo(0, window.scrollY + e.getBoundingClientRect().top - 350);
    }, i);
    await page.waitForTimeout(1500);
    const a = await sig(page, i);
    await page.screenshot({ path: `${out}${name}-${i}-a.png` });
    const r = a.rect;
    await page.mouse.move(Math.max(5, r.x - 500), r.y + r.height / 2);
    await page.waitForTimeout(400);
    const b0 = await sig(page, i);
    await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2, { steps: 8 });
    await page.waitForTimeout(700);
    const b = await sig(page, i);
    await page.screenshot({ path: `${out}${name}-${i}-b-cursor.png` });
    await page.mouse.move(5, 5);
    await page.evaluate(() => window.scrollBy(0, 250));
    await page.waitForTimeout(1000);
    const c = await sig(page, i);
    await page.screenshot({ path: `${out}${name}-${i}-c-scrolled.png` });
    report[name].items.push({ i, mode: modes[i], visible: true, tier: a.tier, cursorChanged: b0.hash !== b.hash, scrollChanged: a.hash !== c.hash });
  }
  await page.close();
}
writeFileSync(out + "rapor.json", JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
await browser.close();
