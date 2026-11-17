import { test } from "node:test";
import assert from "node:assert/strict";
import { formatPrice, formatPvLabel } from "./format.ts";
import { foldTurkish, scoreDoc, tokenize } from "./search.ts";

// Intl may use a narrow no-break space in some locales; normalise for comparison.
const norm = (s: string) => s.replace(/\s/g, " ");

test("formatPrice follows K-059", () => {
  assert.equal(norm(formatPrice(1299.9)), "₺1.299,90");
  assert.equal(norm(formatPrice(1300)), "₺1.300");
  assert.equal(norm(formatPrice(123.3)), "₺123,30");
  assert.equal(norm(formatPrice(0.1 + 0.2)), "₺0,30");
});

test("formatPvLabel", () => {
  assert.equal(formatPvLabel(0.5), "PV 0,5");
  assert.equal(formatPvLabel(12), "PV 12");
});

test("foldTurkish equates Turkish letters", () => {
  assert.equal(foldTurkish("ŞAMPUAN İpek Yüz Kremi"), "sampuan ipek yuz kremi");
  assert.equal(foldTurkish("ılık ÇİÇEK ğ ö ü"), "ilik cicek g o u");
});

test("scoreDoc: folding, prefix, typo, code", () => {
  const doc = { tokens: tokenize("CARICH Çiçek Kokulu Şampuan Saç Bakımı"), keys: ["caa039"] };
  assert.ok(scoreDoc(tokenize("sampuan"), doc) > 0);
  assert.ok(scoreDoc(tokenize("cice"), doc) > 0);
  assert.ok(scoreDoc(tokenize("sampuon"), doc) > 0, "1 typo tolerated");
  assert.equal(scoreDoc(tokenize("diş macunu"), doc), 0);
  assert.equal(scoreDoc(tokenize("CAA039"), doc), 1000);
  assert.ok(scoreDoc(tokenize("caa0"), doc) > 0);
});
