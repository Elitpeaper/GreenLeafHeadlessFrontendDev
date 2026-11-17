import { test } from "node:test";
import assert from "node:assert/strict";
import {
  matchFinder,
  parseFinderParams,
  routineCartCodes,
  scoreCandidate,
  toFinderSearch,
  type FinderCandidate,
  type FinderSelection,
} from "./skin.ts";

const sel = (over: Partial<FinderSelection> = {}): FinderSelection => ({
  tip: "karma",
  unknown: false,
  hassas: false,
  ihtiyac: [],
  rutin: "sade",
  gorunum: "rutin",
  ...over,
});

const c = (over: Partial<FinderCandidate> & { id: string }): FinderCandidate => ({
  code: over.id.toUpperCase(),
  skinType: ["tum-ciltler"],
  concerns: [],
  routineStep: "temizleme",
  availability: "tr",
  price: 100,
  ...over,
});

test("parse: invalid values are ignored, tip=hassas forces hassas, max 3 concerns", () => {
  assert.equal(parseFinderParams({ tip: "xx" }).tip, null);
  const p = parseFinderParams({ tip: "hassas", ihtiyac: "nem,foo,isilti,nem,ince-cizgi,yatistirma", rutin: "bad" });
  assert.equal(p.hassas, true);
  assert.deepEqual(p.ihtiyac, ["nem", "isilti", "ince-cizgi"]);
  assert.equal(p.rutin, "sade");
  assert.equal(parseFinderParams({}, "kuru").tip, "kuru");
});

test("URL round-trip is stable (refresh / share gives the same result — §6)", () => {
  const s = sel({ hassas: true, ihtiyac: ["parlama-gozenek", "nem"], rutin: "dengeli" });
  const qs = toFinderSearch(s);
  assert.equal(qs, "?tip=karma&hassas=1&ihtiyac=parlama-gozenek,nem&rutin=dengeli");
  assert.deepEqual(parseFinderParams(new URLSearchParams(qs.slice(1))), s);
  assert.equal(toFinderSearch(sel({ tip: "normal", unknown: true })), "?tip=normal&bilinmiyor=1");
});

test("score table §4 Adım 3", () => {
  assert.equal(scoreCandidate(c({ id: "a", skinType: ["karma"] }), sel()), 13); // exact 3 + tr 10
  assert.equal(scoreCandidate(c({ id: "b", availability: "yakinda", price: null }), sel()), 1); // tum-ciltler only
  assert.equal(scoreCandidate(c({ id: "d", skinType: ["kuru"] }), sel()), null); // filtered
  assert.equal(scoreCandidate(c({ id: "e", skinType: [] }), sel()), null); // untagged -> excluded
  assert.equal(
    scoreCandidate(c({ id: "f", skinType: ["karma", "hassas"], concerns: ["nem", "isilti"] }), sel({ hassas: true, ihtiyac: ["nem", "isilti"] })),
    3 + 4 + 2 + 10,
  );
  // tip = hassas needs hassas or tum-ciltler; no extra +2 for hassas
  assert.equal(scoreCandidate(c({ id: "g", skinType: ["hassas"] }), sel({ tip: "hassas", hassas: true })), 13);
  assert.equal(scoreCandidate(c({ id: "h", notForSensitive: true }), sel({ hassas: true })), null);
});

test("CILT-TESTI §4 example: karma + [parlama-gozenek, nem], sade", () => {
  const cands = [
    c({ id: "sbj064", skinType: ["karma"], concerns: ["parlama-gozenek"], routineStep: "temizleme", price: 300 }),
    c({ id: "other-clean", skinType: ["tum-ciltler"], routineStep: "temizleme", price: 50 }),
    c({ id: "cream-ru", skinType: ["karma"], concerns: ["nem"], routineStep: "nemlendirme", availability: "yakinda", price: null }),
    c({ id: "spf-ru", skinType: ["tum-ciltler"], routineStep: "gunes-koruma", availability: "yakinda", price: null }),
    c({ id: "dry-only", skinType: ["kuru"], routineStep: "nemlendirme" }),
  ];
  const r = matchFinder(cands, sel({ ihtiyac: ["parlama-gozenek", "nem"] }));
  assert.deepEqual(
    r.routine.map((s) => [s.step, s.main?.id ?? null]),
    [
      ["temizleme", "sbj064"],
      ["nemlendirme", "cream-ru"],
      ["gunes-koruma", "spf-ru"],
    ],
  );
  assert.deepEqual(r.routine[0]!.alternatives.map((x) => x.id), ["other-clean"]);
  assert.equal(r.empty, false);
  const cart = routineCartCodes(r.routine);
  assert.deepEqual(cart.tr.map((x) => x.id), ["sbj064"]);
  assert.equal(cart.comingSoon.length, 2);
  assert.ok(!r.all.some((x) => x.id === "dry-only"));
});

test("deterministic tie-break: quizPriority desc, price asc (null last), code asc; no product in two steps", () => {
  const cands = [
    c({ id: "z", price: 100 }),
    c({ id: "a", price: 100 }),
    c({ id: "cheap", price: 10 }),
    c({ id: "prio", price: 999, quizPriority: 5 }),
    c({ id: "mk", routineStep: "makyaj-temizleme", price: 5 }),
  ];
  const r1 = matchFinder(cands, sel());
  const r2 = matchFinder([...cands].reverse(), sel());
  assert.equal(r1.routine[0]!.main!.id, "prio");
  assert.deepEqual(r1.routine[0]!.alternatives.map((x) => x.id), ["mk", "cheap"]);
  assert.deepEqual(r1.all.map((x) => x.id), r2.all.map((x) => x.id));
  const ids = r1.routine.flatMap((s) => (s.main ? [s.main.id] : []));
  assert.equal(new Set(ids).size, ids.length);
});

test("no result (§4 Adım 6) and set suggestion (Adım 5)", () => {
  assert.equal(matchFinder([c({ id: "x", skinType: ["kuru"] })], sel()).empty, true);
  assert.equal(matchFinder([], sel()).empty, true);
  const set = c({ id: "set", isSet: true, routineStep: null, quizRoutine: "sade" });
  const r = matchFinder([set, c({ id: "p" })], sel());
  assert.equal(r.set?.id, "set");
  assert.ok(!r.all.some((x) => x.id === "set"));
});
