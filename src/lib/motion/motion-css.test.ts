/**
 * Guards for src/components/motion/motion.css:
 *  1. only compositor-friendly properties are animated/transitioned (no layout thrash, CLS 0)
 *  2. CSS duration/easing tokens equal lib/motion/tokens.ts
 *  3. every design point id that needs CSS has a selector
 *  4. hero entrance fits KK-2-03 and the H1 never animates opacity (KK-0-19a)
 *  5. bounded ambient loops (WCAG 2.2.2)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { DURATION, EASE, HERO_INTRO, LIMITS, TRANSITION } from "./tokens.ts";
import { MOTION_POINTS, MOTION_PRIMITIVES, primitiveOf, primitivesOf } from "./ids.ts";

const css = readFileSync(fileURLToPath(new URL("../../components/motion/motion.css", import.meta.url)), "utf8");
const ALLOWED = new Set(["opacity", "translate", "scale", "rotate", "transform", "transform-origin", "stroke-dashoffset", "display", "overlay", "visibility"]);

function keyframeBlocks(): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  const re = /@keyframes\s+([\w-]+)\s*\{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css))) {
    let depth = 1;
    let i = re.lastIndex;
    while (depth > 0 && i < css.length) {
      if (css[i] === "{") depth++;
      else if (css[i] === "}") depth--;
      i++;
    }
    out.push([m[1]!, css.slice(re.lastIndex, i - 1)]);
  }
  return out;
}

test("keyframes animate only transform/opacity/stroke-dashoffset", () => {
  const blocks = keyframeBlocks();
  assert.ok(blocks.length >= 15);
  for (const [name, body] of blocks) {
    for (const [, prop] of body.matchAll(/([a-z-]+)\s*:/g)) {
      assert.ok(ALLOWED.has(prop!), `@keyframes ${name} animates "${prop}"`);
    }
  }
});

// K-231: paint-only properties may transition too (no layout); the shared lists are the two --motion-t-* tokens
const PAINT = new Set(["color", "background-color", "border-color", "text-decoration-color", "fill", "stroke", "box-shadow", "filter", "backdrop-filter"]);
const TOKEN_LISTS = new Set(["var(--motion-t-paint)", "var(--motion-t-move)"]);

/** splits a transition list on top-level commas (commas inside var(...) / cubic-bezier(...) stay) */
function splitTop(list: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of list) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  return [...out, cur];
}

test("transitions list only allowed properties", () => {
  for (const [, value] of css.matchAll(/transition\s*:\s*([^;]+);/g)) {
    for (const part of splitTop(value!)) {
      const prop = part.trim().split(/\s+/)[0]!;
      assert.ok(ALLOWED.has(prop) || PAINT.has(prop) || TOKEN_LISTS.has(prop), `transition on "${prop}"`);
    }
  }
  for (const list of ["--motion-t-paint", "--motion-t-move"]) {
    const body = css.slice(css.indexOf(`${list}:`) + list.length + 1, css.indexOf(";", css.indexOf(`${list}:`)));
    for (const part of splitTop(body)) {
      const prop = part.trim().split(/\s+/)[0]!;
      assert.ok(ALLOWED.has(prop) || PAINT.has(prop), `${list} lists "${prop}"`);
    }
  }
});

test("K-231: baseline transition exists, matches tokens.ts and nothing is switched off instantly", () => {
  assert.match(css, new RegExp(`--motion-hover:\\s*${TRANSITION.duration}ms;`));
  assert.match(css, new RegExp(`--motion-ease-hover:\\s*${TRANSITION.paintEase};`));
  assert.match(css, /@layer base\s*\{[\s\S]*?transition:\s*var\(--motion-t-paint\),\s*var\(--motion-t-move\);/);
  assert.doesNotMatch(css, /transition\s*:\s*none/);
  assert.doesNotMatch(css, /transition-duration\s*:\s*0(m?s)?\s*;/);
  assert.doesNotMatch(css, /transition-property\s*:\s*none/);
});

test("K-231: the gentle / off tiers never move, scale or turn anything", () => {
  const re = /html(?:\[data-motion="reduced"\]|:not\(\[data-motion="on"\]\))[^{]*\{([^}]*)\}/g;
  let n = 0;
  for (const [, body] of css.matchAll(re)) {
    n++;
    for (const [, prop, value] of body!.matchAll(/(?:^|;)\s*(translate|scale|rotate|transform)\s*:\s*([^;]+)/g)) {
      assert.equal(value!.trim(), "none", `gentle tier sets ${prop}: ${value}`);
    }
    for (const [, name] of body!.matchAll(/animation:\s*(gl-[\w-]+)/g)) {
      assert.ok(name === "gl-fade" || name === "gl-loader-pulse", `gentle tier plays ${name}`); // opacity-only keyframes
    }
  }
  assert.ok(n >= 10);
});

test("K-233: hero intro: logo rolls in, title fades after it, all within the hero budget", () => {
  const rule = (part: string) => {
    const i = css.indexOf(`html[data-motion="on"][data-intro] :is([data-motion~="hero-intro"], [data-motion~="M-24"]) [data-motion-part="${part}"]`);
    assert.ok(i > 0, `hero-intro ${part} rule`);
    return css.slice(i, css.indexOf("}", i));
  };
  const timing = (part: string) => {
    const m = /animation:\s*(gl-[\w-]+)\s+(\d+)ms\s+\S+\s+(?:var\([^,]+,\s*)?(\d+)ms/.exec(rule(part));
    assert.ok(m, `timing of ${part}`);
    return { name: m[1]!, d: Number(m[2]), delay: Number(m[3]) };
  };
  const logo = timing("logo");
  assert.equal(logo.name, "gl-logo-roll");
  assert.deepEqual([logo.d, logo.delay], [HERO_INTRO.logo.duration, HERO_INTRO.logo.delay]);
  const title = timing("title");
  assert.equal(title.name, "gl-fade");
  assert.deepEqual([title.d, title.delay], [HERO_INTRO.title.duration, HERO_INTRO.title.delay]);
  assert.ok(title.delay > logo.delay, "title starts after the logo");
  for (const part of ["logo", "title", "lead", "cta"] as const) {
    const t = timing(part);
    assert.ok(t.d + t.delay <= LIMITS.heroTotal, `${part} ends at ${t.d + t.delay}`);
  }
  assert.match(rule("media"), /gl-settle/); // the hero image is never hidden (LCP)
});

test("CSS tokens mirror tokens.ts", () => {
  for (const [k, v] of Object.entries(DURATION)) assert.match(css, new RegExp(`--motion-${k}:\\s*${v}ms;`), `--motion-${k}`);
  const easeName: Record<string, string> = { out: "out", outExpo: "out-expo", inOut: "in-out", in: "in", standard: "standard", spring: "spring" };
  for (const [k, v] of Object.entries(EASE)) {
    const esc = v.replace(/[()]/g, "\\$&").replace(/\./g, "\\.");
    assert.match(css, new RegExp(`--motion-ease-${easeName[k]}:\\s*${esc};`), `ease ${k}`);
  }
});

test("every CSS-driven point id has a selector in motion.css", () => {
  const runtimeOnly = new Set(["bump", "tick", "pop", "flow", "ticker", "nudge-note"]);
  for (const [id, prim] of Object.entries(MOTION_POINTS)) {
    if (prim === "recolor" || prim === "helper" || runtimeOnly.has(prim)) continue;
    assert.ok(css.includes(`[data-motion~="${id}"]`), `${id} (${prim}) has no selector`);
  }
  for (const p of MOTION_PRIMITIVES) {
    if (runtimeOnly.has(p)) continue;
    assert.ok(css.includes(`[data-motion~="${p}"]`), `primitive ${p} has no selector`);
  }
});

test("hero entrance ends within 1.2 s and the title gets transform only", () => {
  assert.ok(css.includes('[data-motion~="M-2"]'));
  // duration + delay of every hero part as written in motion.css (packshot: third item)
  const parts: Record<string, [number, number]> = {
    media: [1100, 0],
    panel: [700, 0],
    eyebrow: [DURATION.lg, 80],
    title: [700, 120],
    lead: [DURATION.lg, 280],
    cta: [DURATION.lg, 380],
    trust: [400, 480],
    packshot: [600, 300 + 2 * 90],
    leaf: [700, 200],
  };
  for (const [part, [d, delay]] of Object.entries(parts)) {
    assert.ok(d + delay <= LIMITS.heroTotal, `${part} ends at ${d + delay}`);
  }
  const titleRule = css.slice(css.indexOf('[data-motion-part="title"]'), css.indexOf('[data-motion-part="title"]') + 200);
  assert.match(titleRule, /gl-shift/);
  const shift = css.slice(css.indexOf("@keyframes gl-shift"), css.indexOf("@keyframes gl-settle"));
  assert.doesNotMatch(shift, /opacity/);
});

test("ambient loops are bounded (≤ 5 s) and only the marquee is infinite", () => {
  const infinite = [...css.matchAll(/animation:\s*(gl-[\w-]+)[^;]*infinite/g)].map((m) => m[1]);
  // loading indicators (gl-loader-*) loop only while content is loading (K-170)
  assert.deepEqual([...new Set(infinite)].filter((n) => !n!.startsWith("gl-loader-")).sort(), ["gl-marquee", "gl-shimmer"]);
  const float = /gl-float (\d+)ms[^;]* (\d+) alternate/.exec(css);
  assert.ok(float && Number(float[1]) * Number(float[2]) <= LIMITS.ambientMax);
  const sway = /gl-sway (\d+)ms/.exec(css);
  assert.ok(sway && Number(sway[1]) <= LIMITS.ambientMax);
});

test("id helpers", () => {
  assert.equal(primitiveOf("M-9"), "item");
  assert.equal(primitiveOf("fav-pop"), "pop");
  assert.equal(primitiveOf("lift"), "lift");
  assert.equal(primitiveOf("M-11"), null);
  assert.deepEqual(primitivesOf("M-9 lift M-7"), ["item", "lift"]);
});
