import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_ACCENT,
  TARGET_RATIO,
  TRANSITION_MIN_RATIO,
  contrast,
  mixOklab,
  resolvePalette,
  transitionMinContrast,
} from "./palette.ts";

// tokens.json › paletteDerivation.examples
const EXAMPLES = {
  gold: { primary: "#C9A24B", onPrimary: "#1A1D1B" },
  pink: { primary: "#E85A9B" },
  sea: { primary: "#2BA3C9" },
  orange: { primary: "#F08A24" },
} as const;

test("contrast() matches known WCAG values", () => {
  assert.equal(Math.round(contrast("#2F7A22", "#FFFFFF") * 100) / 100, 5.35);
  assert.equal(Math.round(contrast("#000000", "#FFFFFF")), 21);
});

for (const [name, input] of Object.entries(EXAMPLES)) {
  test(`example palette "${name}" resolves with every text pair >= ${TARGET_RATIO}`, () => {
    const r = resolvePalette(input);
    assert.ok(r, "palette must resolve");
    for (const [pair, ratio] of Object.entries(r.checks)) {
      if (pair.startsWith("on-accent-deep")) assert.ok(ratio >= 10, `${pair} ${ratio}`);
      else assert.ok(ratio >= TARGET_RATIO, `${name} ${pair} = ${ratio}`);
    }
    assert.equal(r.vars["--accent-decor"], input.primary.toUpperCase());
    assert.equal(r.vars["--stripe-1"], input.primary.toUpperCase());
  });

  test(`example palette "${name}": hover transition from brand default keeps >= ${TRANSITION_MIN_RATIO} at t=0/.25/.5/.75/1`, () => {
    const r = resolvePalette(input);
    assert.ok(r);
    assert.ok(transitionMinContrast(DEFAULT_ACCENT, r.vars) >= TRANSITION_MIN_RATIO);
    assert.ok(transitionMinContrast(r.vars, DEFAULT_ACCENT) >= TRANSITION_MIN_RATIO);
  });
}

test("transition between two product palettes (direct switch, no reset) stays readable", () => {
  const names = Object.keys(EXAMPLES) as Array<keyof typeof EXAMPLES>;
  for (const a of names) {
    for (const b of names) {
      const ra = resolvePalette(EXAMPLES[a]);
      const rb = resolvePalette(EXAMPLES[b]);
      assert.ok(ra && rb);
      assert.ok(transitionMinContrast(ra.vars, rb.vars) >= TRANSITION_MIN_RATIO, `${a} -> ${b}`);
    }
  }
});

test("gold example keeps the given dark onPrimary", () => {
  const r = resolvePalette(EXAMPLES.gold);
  assert.ok(r);
  assert.equal(r.vars["--accent"], "#C9A24B");
  assert.equal(r.vars["--on-accent"], "#1A1D1B");
});

test("low-contrast onPrimary is ignored, white or darkened accent used instead", () => {
  const r = resolvePalette({ primary: "#E85A9B", onPrimary: "#F0F0F0" });
  assert.ok(r);
  assert.ok(contrast(r.vars["--on-accent"], r.vars["--accent"]) >= TARGET_RATIO);
});

test("very light and very dark primaries still resolve", () => {
  for (const primary of ["#FFF7D6", "#FFFFFF", "#000000", "#0A2A18", "#30A8D7", "#86B726"]) {
    const r = resolvePalette({ primary });
    assert.ok(r, primary);
    assert.ok(r.checks["accent-text/accent-soft"] >= TARGET_RATIO, primary);
  }
});

test("invalid input returns null", () => {
  assert.equal(resolvePalette(null), null);
  assert.equal(resolvePalette({ primary: "not-a-color" }), null);
});

test("impossible target returns null (guard)", () => {
  assert.equal(resolvePalette({ primary: "#4EAE36" }, 30), null);
});

test("oklab mix endpoints are identity", () => {
  assert.equal(mixOklab("#C9A24B", "#2F7A22", 0), "#C9A24B");
  assert.equal(mixOklab("#C9A24B", "#2F7A22", 1), "#2F7A22");
});
