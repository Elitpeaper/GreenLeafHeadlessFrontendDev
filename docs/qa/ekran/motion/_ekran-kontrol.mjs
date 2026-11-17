// Motion screen check over Chrome DevTools Protocol (no extra deps). Usage: node shots.mjs <baseUrl> <outDir>
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

// ---------------------------------------------------------------- desktop, motion on
await viewport(1440, 900);
await media([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await goto(base + "/hareket-lab?motion=on");
await sleep(250);
await shot("01-desktop-hero-entrance-250ms");
await sleep(1300);
await shot("02-desktop-hero-settled");
report.htmlAttrs = await evaluate(`[...document.documentElement.attributes].map(a=>a.name+"="+a.value).join(" ")`);

// header band (H1) on 2nd view should not redraw: check attribute
await scrollTo("#vitrin", 80);
await sleep(900);
await shot("03-vitrin-revealed-brand");
const before = await zoneSoft("#vitrin");
const card = await center('#vitrin [data-motion~="M-9"]:nth-child(2) a');
await mouse(card.x, card.y);
const framesP = evaluate("window.__frames(900)");
await sleep(80);
const during = await zoneSoft("#vitrin");
await sleep(300);
await shot("04-vitrin-recolor-mid");
const frames = await framesP;
const after = await zoneSoft("#vitrin");
await shot("05-vitrin-recolor-settled");
// card -> card direct switch
const card2 = await center('#vitrin [data-motion~="M-9"]:nth-child(4) a');
await mouse(card2.x, card2.y);
await sleep(700);
const after2 = await zoneSoft("#vitrin");
await shot("06-vitrin-recolor-card-to-card");
// leave zone
await mouse(5, 5);
await sleep(1100);
const released = await zoneSoft("#vitrin");
report.recolor = { before, duringAt80ms: during, after, after2, released, frames };

// add to cart: counter bump + "Eklendi"
const add = await center('[data-motion~="M-12"]');
await click(add.x, add.y);
await sleep(140);
await shot("07-add-to-cart-eklendi-bump");
await sleep(1700);
// open drawer
const cart = await center("#lab-cart");
await click(cart.x, cart.y);
await sleep(120);
await shot("08-drawer-opening");
await sleep(500);
await shot("09-drawer-open");
const nudge = await center('[data-motion~="nudge-note"]');
await click(nudge.x, nudge.y);
await sleep(250);
await shot("10-drawer-disabled-checkout-note-highlight");
await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
await sleep(500);

// mega menu + Z1 -> Z2 header link
await evaluate("window.scrollTo({top:0,behavior:'instant'})");
await sleep(400);
const sum = await center('summary[data-motion~="H2"]');
await click(sum.x, sum.y);
await sleep(120);
await shot("11-megamenu-opening");
await sleep(500);
const feat = await center('[data-accent-zone="menu"] a[data-accent]');
await mouse(feat.x, feat.y);
await sleep(600);
report.megamenu = { headerSoft: await zoneSoft("#header-accent"), headerStripe1: await evaluate(`getComputedStyle(document.getElementById("header-accent")).getPropertyValue("--stripe-1").trim()`) };
await shot("12-megamenu-hover-recolor-header-linked");
await mouse(1400, 880);
await sleep(900);
report.megamenu.released = await zoneSoft("#header-accent");
await click(sum.x, sum.y);
await sleep(400);

// tabs
await scrollTo("#kesfet", 80);
await sleep(900);
const tab = await center('#kesfet [role="tab"]:nth-of-type(3)');
await click(tab.x, tab.y);
await sleep(140);
await shot("13-tabs-indicator-sliding");
await sleep(600);
await shot("14-tabs-settled");

// PV flow
await scrollTo("#pv", 140);
await sleep(900);
await shot("15-pv-flow-in-flight");
await sleep(1300);
await shot("16-pv-total-ticked");
report.pvTotal = await evaluate(`document.querySelector('#pv [data-motion~="M-19"]').textContent`);

// compact header + back to top + marquee
await scrollTo('[aria-label="Markalar"]', 300);
await sleep(900);
await shot("17-compact-header-backtop-marquee");
report.compact = await evaluate(`document.getElementById("header-accent").hasAttribute("data-compact")`);
report.backtop = await evaluate(`document.querySelector('[data-motion~="F6"]').hasAttribute("data-visible")`);
await evaluate("window.scrollTo({top:document.body.scrollHeight,behavior:'instant'})");
await sleep(1200);
await shot("18-footer-band-drawn");
report.clsMotionOn = await evaluate("window.__cls");

// ---------------------------------------------------------------- touch: no recolor
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
await goto(base + "/hareket-lab");
await scrollTo("#vitrin", 80);
await sleep(800);
const tc = await center('#vitrin [data-motion~="M-9"]:nth-child(2) a');
await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: tc.x, y: tc.y }] });
await sleep(700);
report.touch = { soft: await zoneSoft("#vitrin") };
await send("Input.dispatchTouchEvent", { type: "touchCancel", touchPoints: [] });
await send("Emulation.setTouchEmulationEnabled", { enabled: false });

// ---------------------------------------------------------------- prefers-contrast: more -> no recolor
await media([{ name: "prefers-contrast", value: "more" }]);
await goto(base + "/hareket-lab");
await scrollTo("#vitrin", 80);
await sleep(800);
const pc = await center('#vitrin [data-motion~="M-9"]:nth-child(2) a');
await mouse(pc.x, pc.y);
await sleep(700);
report.contrastMore = { soft: await zoneSoft("#vitrin") };
await mouse(5, 5);

// ---------------------------------------------------------------- reduced motion
await media([{ name: "prefers-reduced-motion", value: "reduce" }]);
await goto(base + "/hareket-lab");
await sleep(150);
await shot("19-reduced-hero-first-frame");
report.reducedAttrs = await evaluate(`[...document.documentElement.attributes].map(a=>a.name).join(" ")`);
await scrollTo("#vitrin", 80);
await sleep(300);
const rc = await center('#vitrin [data-motion~="M-9"]:nth-child(2) a');
await mouse(rc.x, rc.y);
await sleep(700);
report.reduced = { soft: await zoneSoft("#vitrin"), hiddenCount: await evaluate(`[...document.querySelectorAll("[data-motion]")].filter(e=>getComputedStyle(e).opacity==="0").length`) };
await shot("20-reduced-vitrin-hover-no-recolor");
await scrollTo('[aria-label="Markalar"]', 300);
await sleep(300);
await shot("21-reduced-marquee-static-grid");
// reduced + instant variant
await goto(base + "/hareket-lab?recolorReduced=instant");
await scrollTo("#vitrin", 80);
await sleep(300);
const ic = await center('#vitrin [data-motion~="M-9"]:nth-child(2) a');
await mouse(ic.x, ic.y);
await sleep(300);
report.reducedInstant = { soft: await zoneSoft("#vitrin") };
await shot("22-reduced-instant-variant");
await goto(base + "/hareket-lab?recolorReduced=off");

// ---------------------------------------------------------------- mobile 390
await media([{ name: "prefers-reduced-motion", value: "no-preference" }]);
await viewport(390, 844, true);
await goto(base + "/hareket-lab?motion=on");
await sleep(1500);
await shot("23-mobile-390-hero");
report.clsMobile = await evaluate("window.__cls");
report.consoleErrors = events.filter((e) => e.method === "Runtime.exceptionThrown" || (e.method === "Runtime.consoleAPICalled" && e.params.type === "error")).map((e) => JSON.stringify(e.params).slice(0, 300));

writeFileSync(join(out, "olcum.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
ws.close();
chrome.kill();
