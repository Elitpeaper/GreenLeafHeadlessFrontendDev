// K-184 Y-2 / O-6 proof: Kapılar bento with pin off + no infinite loops. Usage: node _kanit.mjs <baseUrl> <outDir>
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
const doors = async (name) => {
  await evaluate(`(async()=>{const s=document.getElementById('doors-title').closest('section');window.__lenis?.stop?.();s.scrollIntoView({block:'start'});await new Promise(r=>setTimeout(r,1500));})()`);
  const info = await evaluate(`(()=>{const t=document.querySelector('[data-hpin-track]');const r=t.getBoundingClientRect();return {motion:document.documentElement.dataset.motion,display:getComputedStyle(t).display,track:[Math.round(r.width),Math.round(r.height)],cells:[...t.children].map(c=>{const b=c.getBoundingClientRect();return [Math.round(b.left-r.left),Math.round(b.top-r.top),Math.round(b.width),Math.round(b.height)]})}})()`);
  console.log(name, JSON.stringify(info));
  await shot(name);
};
const loops = async (name) => {
  await sleep(5500);
  const r = await evaluate(`document.getAnimations().filter(a=>a.playState==='running'&&a.effect?.getTiming?.().iterations===Infinity).map(a=>(a.animationName||a.id||'anon')+' @ '+(a.effect.target?.closest?.('footer,[role=dialog],aside')?.tagName||a.effect.target?.className?.baseVal||a.effect.target?.className||'?'))`);
  console.log(name, "infinite running after 5.5s:", JSON.stringify(r));
};
try {
  // reduced (the default on this machine, S-060)
  await viewport(1440, 900);
  await media([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await goto(base + "/", 1200);
  await doors("y2-1440-reduced");
  await viewport(900, 1000);
  await sleep(600);
  await doors("y2-900-reduced");
  await viewport(1440, 900);
  // full tier
  await media([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await goto(base + "/?motion=full", 2500);
  await doors("y2-1440-full");
  await loops("home-full");
  await goto(base + "/urunler?motion=full", 1500);
  await evaluate("document.querySelector('footer')?.scrollIntoView()");
  await loops("urunler-full");
  await shot("o6-footer-1440-full");
} finally {
  ws.close();
  chrome.kill();
}
