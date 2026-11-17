import { test } from "node:test";
import assert from "node:assert/strict";
import { parseListingParams, toListingSearch } from "./query-params.ts";

test("K-268: ?kok= round-trips as scope; malformed values are dropped", () => {
  const q = parseListingParams({ q: "krem", kok: "cilt-bakimi" });
  assert.equal(q.scope, "cilt-bakimi");
  assert.equal(toListingSearch(q), "?q=krem&kok=cilt-bakimi");
  assert.equal(parseListingParams({ q: "krem", kok: "../x" }).scope, undefined);
  assert.equal(parseListingParams({ q: "krem", kok: "" }).scope, undefined);
});
