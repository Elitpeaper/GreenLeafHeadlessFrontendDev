import { test } from "node:test";
import assert from "node:assert/strict";
import { isListed, isSellable, type GateInput } from "./gate.ts";

const base: GateInput = { availability: "tr", publishReady: true, price: 200, memberPrice: 100, code: "AB001", needsReview: [] };

test("ready TR product is listed and sellable in both modes", () => {
  assert.equal(isListed(base, false), true);
  assert.equal(isListed(base, true), true);
  assert.equal(isSellable(base), true);
});

test("price-implausible product is hidden even on preview builds (M-1, LGD012)", () => {
  const p = { ...base, publishReady: false, price: 89910, memberPrice: 44955, needsReview: ["price-implausible"] };
  assert.equal(isListed(p, true), false);
  assert.equal(isListed(p, false), false);
  assert.equal(isSellable(p), false);
  assert.equal(isSellable({ ...p, publishReady: true }), false);
});

test("publishReady=false is preview-only and never sellable", () => {
  const p = { ...base, publishReady: false };
  assert.equal(isListed(p, false), false);
  assert.equal(isListed(p, true), true);
  assert.equal(isSellable(p), false);
});

test("yakında and code-less products are not sellable", () => {
  assert.equal(isSellable({ ...base, availability: "yakinda" }), false);
  assert.equal(isSellable({ ...base, code: "" }), false);
  assert.equal(isSellable({ ...base, memberPrice: null }), false);
});
