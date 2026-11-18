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
const click = async (x, y) => {
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
};
const key = async (k, code) => {
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: k, code: code ?? k, windowsVirtualKeyCode: k === "Escape" ? 27 : 0 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: k, code: code ?? k });
};
const state = () => evaluate(`(()=>{const h=document.getElementById('header-accent').getBoundingClientRect();const m=document.querySelector('[data-motion=mega-panel][role=region]');const c=document.querySelector('button[data-explore-trigger]:not([hidden])');const st=document.querySelector('[data-pin-stage]');const s=st&&getComputedStyle(st).display!=='none'?st.getBoundingClientRect():null;return {y:Math.round(scrollY),headerTop:Math.round(h.top),headerH:Math.round(h.height),megaOpen:m?!m.hidden:null,exploreTriggerVisible:!!c&&c.offsetParent!==null,stageTop:s?Math.round(s.top):null,stageH:s?Math.round(s.height):null,active:document.activeElement?.tagName+':'+(document.activeElement?.getAttribute('name')||''),hiddenAttr:document.documentElement.hasAttribute('data-header-hidden')}})()`);
const log = async (n) => console.log(n, JSON.stringify(await state()));
try {
  await media([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await viewport(1440, 900);
  await goto(base + "/", 2500);
  await log("1-top");
  const box = await evaluate(`(()=>{const r=document.querySelector('input[role=combobox]').getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]})()`);
  await click(box[0], box[1]);
  await sleep(900);
  await log("2-after-click-input");
  await shot("1440-01-arama-odak-mega-acik");
  await key("Escape");
  await sleep(500);
  await log("3-after-esc");
  await click(box[0], box[1]);
  await sleep(500);
  await send("Input.insertText", { text: "krem" });
  await sleep(1500);
  await log("4-typed-krem");
  await shot("1440-02-yazinca-sonuclar");
  await key("Escape"); await key("Escape");
  await sleep(300);
  await click(200, 600); // outside
  await sleep(400);
  await log("5-outside-click");
  for (const y of [2200, 4200]) {
    await evaluate(`window.__lenis?.stop?.(); window.scrollTo({top:${y},behavior:'instant'})`);
    await sleep(1000);
    await log("6-scroll-" + y);
    await shot("1440-03-scroll-" + y);
  }
  // header search + explore at depth
  await evaluate(`window.scrollTo({top:4200,behavior:'instant'})`);
  const cb = await evaluate(`(()=>{const r=document.querySelector('button[data-explore-trigger]:not([hidden])').getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]})()`);
  await click(cb[0], cb[1]);
  await sleep(900);
  await log("7-explore-open-deep");
  await shot("1440-04-kesfet-derinde");
  await key("Escape");
  const sb = await evaluate(`(()=>{const r=document.querySelector('input[role=combobox]').getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]})()`);
  await click(sb[0], sb[1]);
  await sleep(900);
  await log("8-mega-deep");
  await shot("1440-05-mega-derinde");
  await key("Escape");
  // pin stage
  await evaluate(`(()=>{window.__lenis?.stop?.();const s=document.querySelector('[data-pin-host]');if(s)window.scrollTo({top:s.getBoundingClientRect().top+scrollY,behavior:'instant'})})()`);
  await sleep(1500);
  await log("9-pin-host");
  for (const f of [0.25, 0.6, 1.0]) {
    await evaluate(`(()=>{const s=document.querySelector('[data-pin-host]');const top=s.getBoundingClientRect().top+scrollY;window.scrollTo({top:top+${f}*innerHeight*0.85*3,behavior:'instant'})})()`);
    await sleep(2200);
    await log("10-pin-" + f);
    await shot("1440-06-pin-" + f);
  }
  // mobile
  await viewport(390, 844, true);
  await goto(base + "/", 2000);
  await evaluate(`window.scrollTo({top:2500,behavior:'instant'})`);
  await sleep(700);
  await log("11-mobile-deep");
  await shot("390-01-header-derinde");
  await click(300, 36);
  const s390 = await evaluate(`(()=>{const b=document.querySelector('button[aria-label][aria-haspopup=dialog]');return !!b})()`);
  console.log("mobile search btn", s390);
} finally {
  ws.close();
  chrome.kill();
}
