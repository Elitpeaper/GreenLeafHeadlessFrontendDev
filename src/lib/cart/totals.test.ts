import { test } from "node:test";
import assert from "node:assert/strict";
import { clampQty, computeCart } from "./totals.ts";

const product = (code: string, price: number, memberPrice: number, pv: number | null) => ({
  code,
  slug: code.toLowerCase(),
  href: `/urun/${code.toLowerCase()}`,
  name: code,
  brandTitle: "X",
  image: null,
  price,
  memberPrice,
  pv,
});

const catalog = {
  A: product("A", 176.4, 88.07, 0.5),
  B: product("B", 0.1, 0.2, null),
};

test("computeCart sums Toplam, Üye fiyatıyla toplam and PV", () => {
  const r = computeCart(
    [
      { code: "A", qty: 3 },
      { code: "B", qty: 1 },
    ],
    catalog,
  );
  assert.equal(r.count, 4);
  assert.equal(r.total, 529.3); // 529.2 + 0.1
  assert.equal(r.memberTotal, 264.41); // 264.21 + 0.2
  assert.equal(r.pv, 1.5);
  assert.equal(r.lines[1]?.linePv, null);
});

test("unknown codes are reported as missing and excluded", () => {
  const r = computeCart([{ code: "GONE", qty: 2 }], catalog);
  assert.deepEqual(r.missing, ["GONE"]);
  assert.equal(r.count, 0);
  assert.equal(r.total, 0);
});

test("clampQty keeps 1..max", () => {
  assert.equal(clampQty(0, 10), 1);
  assert.equal(clampQty(11, 10), 10);
  assert.equal(clampQty(Number.NaN, 10), 1);
  assert.equal(clampQty(3.7, 10), 3);
});
