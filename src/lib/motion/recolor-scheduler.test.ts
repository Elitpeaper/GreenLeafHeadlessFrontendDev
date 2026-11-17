import { test } from "node:test";
import assert from "node:assert/strict";
import { decideRecolor, decideRecolorFocus, type RecolorZoneState } from "./recolor-scheduler.ts";
import { RECOLOR } from "./tokens.ts";

const T = { intent: RECOLOR.intent, switch: RECOLOR.switch, release: RECOLOR.release };
const A = '{"--accent-soft":"#FDEEEF"}';
const B = '{"--accent-soft":"#EEF7FB"}';
const idle: RecolorZoneState = { active: null, pending: undefined };

test("first card from the brand theme waits for intent", () => {
  assert.deepEqual(decideRecolor(idle, A, T), { type: "schedule", target: A, delay: RECOLOR.intent });
});

test("card -> card while coloured switches directly with the short delay (no reset to brand)", () => {
  assert.deepEqual(decideRecolor({ active: A, pending: undefined }, B, T), { type: "schedule", target: B, delay: RECOLOR.switch });
});

test("pointerover on child elements of the same pending card keeps the running timer", () => {
  assert.deepEqual(decideRecolor({ active: null, pending: A }, A, T), { type: "keep" });
});

test("returning to the active palette cancels a pending change (no flicker)", () => {
  assert.deepEqual(decideRecolor({ active: A, pending: B }, A, T), { type: "cancel" });
  assert.deepEqual(decideRecolor({ active: A, pending: null }, A, T), { type: "cancel" });
});

test("leaving the zone or a paletteless card releases after the grace period", () => {
  assert.deepEqual(decideRecolor({ active: A, pending: undefined }, null, T), { type: "schedule", target: null, delay: RECOLOR.release });
});

test("leaving while nothing is coloured is a no-op", () => {
  assert.deepEqual(decideRecolor(idle, null, T), { type: "keep" });
});

test("fast sweep across 4 cards: only the last one is pending (last entered wins)", () => {
  let s: RecolorZoneState = { ...idle };
  for (const k of [A, B, A, B]) {
    const d = decideRecolor(s, k, T);
    if (d.type === "schedule") s = { ...s, pending: d.target };
  }
  assert.equal(s.pending, B);
  assert.equal(s.active, null);
});

test("keyboard focus applies immediately, release keeps the grace period", () => {
  assert.deepEqual(decideRecolorFocus(idle, A, T), { type: "schedule", target: A, delay: 0 });
  assert.deepEqual(decideRecolorFocus({ active: A, pending: undefined }, null, T), {
    type: "schedule",
    target: null,
    delay: RECOLOR.release,
  });
});

test("recolor timings stay inside the plan ranges (premium-tema §B4)", () => {
  assert.ok(RECOLOR.intent >= 80 && RECOLOR.intent <= 200);
  assert.ok(RECOLOR.release >= 150 && RECOLOR.release <= 300);
  for (const z of Object.values(RECOLOR.zones)) {
    assert.ok(z.in >= 250 && z.in <= 600, `in ${z.in}`);
    assert.ok(z.out >= z.in && z.out <= 800, `out ${z.out}`);
  }
});
