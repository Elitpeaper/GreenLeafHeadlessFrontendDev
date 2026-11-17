// motion-v4 proof (K-256 Lenis + Swiper, K-257 pin) over Chrome DevTools Protocol, no extra deps. Usage: node _kanit.mjs <baseUrl> <outDir>
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [base, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const profile = mkdtempSync(join(tmpdir(), "gl-chrome-"));
const port = 9333;
const chrome = spawn(CHROME, [`--remote-debugging-port=${port}`, "--headless=new", `--user-data-dir=${profile}`, "--no-first-run", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    wsUrl = list.find((t) => t.type === "page")?.webSocketDebuggerUrl;
  } catch {}
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
const events = [];
ws.addEventListener("message", (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  } else if (msg.method) events.push(msg);
});
const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const i = ++id;
    pending.set(i, (m) => (m.error ? rej(new Error(method + ": " + m.error.message)) : res(m.result)));
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const evaluate = async (expr) => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result.value;
const shot = async (name) => {
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(out, name + ".png"), Buffer.from(data, "base64"));
  console.log("shot", name);
};
const viewport = (w, h, mobile = false) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
const media = (features) => send("Emulation.setEmulatedMedia", { features });
const goto = async (url, wait = 0) => {
  await send("Page.navigate", { url });
  for (let i = 0; i < 100; i++) {
    await sleep(100);
    if ((await evaluate("document.readyState")) === "complete") break;
  }
  if (wait) await sleep(wait);
};
const mouse = (x, y) => send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
const click = async (x, y) => {
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
};
const center = (sel) =>
  evaluate(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
const scrollTo = async (sel, offset = 120) => {
  await evaluate(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); window.scrollTo({ top: e.getBoundingClientRect().top + scrollY - ${offset}, behavior: "instant" }); })()`);
  await sleep(150);
};
const zoneSoft = (sel) => evaluate(`getComputedStyle(document.querySelector(${JSON.stringify(sel)})).getPropertyValue("--accent-soft").trim()`);
const report = {};

await send("Page.enable");
await send("Runtime.enable");
// CLS + long frames recorder
await send("Page.addScriptToEvaluateOnNewDocument", {
  source: `window.__cls=0;new PerformanceObserver(l=>{for(const e of l.getEntries()){if(!e.hadRecentInput)window.__cls+=e.value}}).observe({type:"layout-shift",buffered:true});
window.__frames=(ms)=>new Promise(r=>{const d=[];let last=performance.now();const end=last+ms;function f(t){d.push(t-last);last=t;if(t<end)requestAnimationFrame(f);else{d.sort((a,b)=>a-b);r({n:d.length,p50:d[Math.floor(d.length*.5)],p95:d[Math.floor(d.length*.95)],max:d[d.length-1]})}}requestAnimationFrame(f)});`,
});

// ---------------------------------------------------------------- motion-v4 (K-256 Lenis + Swiper, K-257 pin)
const errors = () =>
  events
    .filter((e) => e.method === "Runtime.exceptionThrown" || (e.method === "Runtime.consoleAPICalled" && e.params.type === "error"))
    .map((e) => JSON.stringify(e.params).slice(0, 300));
const pinInfo = `(() => { const sec = document.querySelector('[data-hpin]'); const sp = sec?.closest('.pin-spacer'); const h = document.getElementById('header-accent').offsetHeight;
  if (!sp) return { pinned: !!sec?.hasAttribute('data-pinned'), hasSpacer: false };
  const start = sp.getBoundingClientRect().top + scrollY - h; const dist = sp.offsetHeight - sec.offsetHeight;
  return { pinned: sec.hasAttribute('data-pinned'), hasSpacer: true, header: h, start: Math.round(start), end: Math.round(start + dist), dist: Math.round(dist) }; })()`;
const trackX = `new DOMMatrix(getComputedStyle(document.querySelector('[data-hpin-track]')).transform).m41`;
const htmlClass = `document.documentElement.className`;
const swiperState = `(() => { const s = document.querySelector('.swiper')?.swiper; return s ? { init: true, active: s.activeIndex, running: s.autoplay.running, paused: s.autoplay.paused } : { init: false }; })()`;

// ================================================================ desktop 1440, full tier
await media([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await viewport(1440, 900);
await goto(base + "/?motion=on");
report.desktop = {};
report.desktop.t0 = { swiper: await evaluate(swiperState), html: await evaluate(htmlClass) };
await sleep(1200);
report.desktop.afterIntro = { swiper: await evaluate(swiperState), html: await evaluate(htmlClass), cls: await evaluate("window.__cls") };
await shot("d01-hero-1440");
await mouse(700, 400);
await sleep(400);
report.desktop.hover = await evaluate(swiperState);
await mouse(5, 5);
await sleep(300);
report.desktop.leave = await evaluate(swiperState);
const tAuto = Date.now();
for (let i = 0; i < 120; i++) {
  if ((await evaluate(swiperState)).active === 1) break;
  await sleep(100);
}
report.desktop.firstAutoAdvanceAfterLeaveMs = Date.now() - tAuto;
await sleep(700);
await shot("d02-hero-slide2-1440");
report.desktop.inertInactive = await evaluate("[...document.querySelectorAll('.swiper-slide')].map(s => s.inert)");
report.desktop.liveRegion = await evaluate("document.querySelector('.swiper-wrapper').getAttribute('aria-live')");

// Lenis: one wheel notch glides over several frames
await evaluate("window.scrollTo(0,0)");
await sleep(400);
const ys = [];
await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: 700, y: 500, deltaX: 0, deltaY: 400 });
for (let i = 0; i < 25; i++) {
  ys.push(Math.round(await evaluate("scrollY")));
  await sleep(30);
}
report.desktop.lenisWheel = { html: await evaluate(htmlClass), ys };

// lock: overflow hidden on html (cart drawer / mobile nav) -> lenis-stopped
await evaluate("document.documentElement.style.overflow='hidden'");
await sleep(150);
report.desktop.lockedClass = await evaluate(htmlClass);
await evaluate("document.documentElement.style.overflow=''");
await sleep(150);
report.desktop.unlockedClass = await evaluate(htmlClass);
// mega menu open -> stopped, page does not move under the wheel
await evaluate("window.scrollTo(0,0)");
await sleep(300);
const megaBtn = await center("#header-accent button[aria-expanded]");
if (megaBtn) {
  await click(megaBtn.x, megaBtn.y);
  await sleep(500);
  report.desktop.megaOpenClass = await evaluate(htmlClass);
  await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: 1400, y: 880, deltaX: 0, deltaY: 400 });
  await sleep(600);
  report.desktop.megaWheelScrollY = await evaluate("scrollY");
  await shot("d03-mega-open-lenis-stopped");
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await sleep(500);
  report.desktop.megaClosedClass = await evaluate(htmlClass);
}

// K-257 pin
await evaluate("window.scrollTo(0,0)");
await sleep(300);
const pin = await evaluate(pinInfo);
report.desktop.pin = pin;
if (pin.hasSpacer) {
  report.desktop.pinFrames = [];
  for (const p of [0, 0.25, 0.5, 0.75, 1]) {
    await evaluate(`window.scrollTo(0, ${Math.round(pin.start + p * pin.dist)})`);
    await sleep(500);
    report.desktop.pinFrames.push({
      p,
      sectionTop: await evaluate("Math.round(document.querySelector('[data-hpin]').getBoundingClientRect().top)"),
      trackX: Math.round(await evaluate(trackX)),
      bar: +(await evaluate("new DOMMatrix(getComputedStyle(document.querySelector('[data-hpin-bar]')).transform).a")).toFixed(3),
    });
    await shot(`d1${Math.round(p * 4)}-pin-${String(Math.round(p * 100)).padStart(3, "0")}`);
  }
  await evaluate(`window.scrollTo(0, ${pin.end + 400})`);
  await sleep(500);
  await shot("d15-pin-after");
  // keyboard: focusing the last door link brings its panel into view
  await evaluate(`window.scrollTo(0, ${pin.start})`);
  await sleep(400);
  await evaluate("[...document.querySelectorAll('[data-hpin-track] a')].pop().focus({ focusVisible: true })");
  await sleep(400);
  report.desktop.focusLast = await evaluate(
    "(() => { const a = [...document.querySelectorAll('[data-hpin-track] a')].pop(); const r = a.getBoundingClientRect(); return { left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), vw: innerWidth, scrollY: Math.round(scrollY) }; })()",
  );
  await shot("d16-pin-focus-last");
}
// same-page anchor glides, updates the hash and moves focus
await evaluate("window.scrollTo(0, 1500)");
await sleep(400);
await evaluate("(() => { const a = document.createElement('a'); a.href = '#icerik'; a.id = '__anchor'; a.textContent = 'x'; document.body.prepend(a); a.click(); })()");
const anchorYs = [];
for (let i = 0; i < 8; i++) {
  anchorYs.push(Math.round(await evaluate("scrollY")));
  await sleep(60);
}
await sleep(1200);
report.desktop.anchor = { ys: anchorYs, ...(await evaluate("({ hash: location.hash, scrollY: Math.round(scrollY), focus: document.activeElement?.id })")) };
report.desktop.cls = await evaluate("window.__cls");
report.desktop.jsLoaded = await evaluate("performance.getEntriesByType('resource').filter(r => r.name.endsWith('.js')).map(r => r.name.split('/').pop())");
report.desktop.errors = errors();

// ================================================================ laptop 1366x768: pinned panels still fit
await viewport(1366, 768);
await goto(base + '/?motion=on');
await sleep(1500);
const pinL = await evaluate(pinInfo);
if (pinL.hasSpacer) {
  await evaluate('window.scrollTo(0, ' + Math.round(pinL.start + pinL.dist * 0.5) + ')');
  await sleep(600);
  await shot('d20-pin-050-1366x768');
}
report.laptop = { pin: pinL, panelHeight: await evaluate("Math.round(document.querySelector('[data-hpin-track] > li').getBoundingClientRect().height)") };
await viewport(1440, 900);

// ================================================================ desktop 1440, gentle tier (OS reduced motion)
await media([{ name: "prefers-reduced-motion", value: "reduce" }]);
await goto(base + "/?motion=on");
await sleep(2500);
report.reduced = {
  html: await evaluate(htmlClass),
  motion: await evaluate("document.documentElement.dataset.motion"),
  swiper: await evaluate(swiperState),
  pin: await evaluate(pinInfo),
};
await shot("r00-hero-reduced-1440");
await evaluate("document.querySelector('[data-hpin]').scrollIntoView({ block: 'start' })");
await sleep(600);
await shot("r01-doors-grid-reduced-1440");
report.reduced.cls = await evaluate("window.__cls");

// ================================================================ mobile 390 (touch), full tier
await media([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
await viewport(390, 844, true);
await goto(base + "/?motion=on");
await sleep(1800);
report.mobile = { html: await evaluate(htmlClass), swiper: await evaluate(swiperState), pin: await evaluate(pinInfo) };
await shot("m01-hero-390");
await evaluate("document.querySelector('[data-hpin]').scrollIntoView({ block: 'start' })");
await sleep(700);
await shot("m02-doors-strip-390");
await evaluate("(() => { const v = document.querySelector('[data-hpin-viewport]'); v.scrollTo({ left: v.scrollWidth, behavior: 'instant' }); })()");
await sleep(700);
await shot("m03-doors-strip-end-390");
report.mobile.stripScroll = await evaluate(
  "(() => { const v = document.querySelector('[data-hpin-viewport]'); return { scrollLeft: Math.round(v.scrollLeft), max: v.scrollWidth - v.clientWidth }; })()",
);
report.mobile.cls = await evaluate("window.__cls");
report.mobile.jsLoaded = await evaluate("performance.getEntriesByType('resource').filter(r => r.name.endsWith('.js')).map(r => r.name.split('/').pop())");
report.mobile.errors = errors();

writeFileSync(join(out, "olcum.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
ws.close();
chrome.kill();
process.exit(0);
