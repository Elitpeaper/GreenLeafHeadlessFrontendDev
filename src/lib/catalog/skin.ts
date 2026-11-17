/**
 * Skin-type finder (K-056, K-069, K-089; rules: docs/plan/CILT-TESTI.md §2–§4).
 * Pure, deterministic, dependency-free and client-safe: the page passes slim candidates, the browser re-ranks on
 * every selection change. Same input -> same output (CILT-TESTI §1.3). Unit tests: skin.test.ts.
 *
 * Vocabulary (K-056) + URL slugs of the 5 pre-selected pages /cilt-tipine-gore/{tip} (K-087).
 * Matcher implemented by frontend-gelistirici on frontend-mimar's stub (orchestrator assignment, 2026-11-16).
 */
export const SKIN_TYPES = [
  { slug: "kuru", label: "Kuru cilt" },
  { slug: "yagli", label: "Yağlı cilt" },
  { slug: "karma", label: "Karma cilt" },
  { slug: "normal", label: "Normal cilt" },
  { slug: "hassas", label: "Hassas cilt" },
] as const;

export type SkinTypeSlug = (typeof SKIN_TYPES)[number]["slug"];

export const getSkinType = (slug: string) => SKIN_TYPES.find((t) => t.slug === slug) ?? null;

export const CONCERNS = [
  "nem",
  "parlama-gozenek",
  "tikali-gozenek",
  "isilti",
  "ton-esitsizligi",
  "ince-cizgi",
  "yatistirma",
  "goz-cevresi",
] as const;
export type Concern = (typeof CONCERNS)[number];

export const ROUTINE_STEPS = [
  "temizleme",
  "tonik",
  "serum",
  "nemlendirme",
  "gunes-koruma",
  "maske",
  "peeling",
  "goz-bakimi",
  "dudak-bakimi",
  "makyaj-temizleme",
] as const;
export type RoutineStep = (typeof ROUTINE_STEPS)[number];

export const ROUTINE_LEVELS = ["sade", "dengeli", "kapsamli"] as const;
export type RoutineLevel = (typeof ROUTINE_LEVELS)[number];

/** CILT-TESTI §3.5 */
export const LEVEL_STEPS: Record<RoutineLevel, RoutineStep[]> = {
  sade: ["temizleme", "nemlendirme", "gunes-koruma"],
  dengeli: ["temizleme", "tonik", "serum", "nemlendirme", "gunes-koruma"],
  kapsamli: ["temizleme", "tonik", "serum", "nemlendirme", "gunes-koruma", "maske", "peeling", "goz-bakimi"],
};

/** §3.3: `makyaj-temizleme` counts as an alternative for the `temizleme` step. */
const STEP_ALIASES: Partial<Record<RoutineStep, RoutineStep[]>> = { temizleme: ["temizleme", "makyaj-temizleme"] };

/** §3.3 category default (used for "yakında" items whose routineStep is not set by an editor). */
export const CATEGORY_DEFAULT_STEP: Record<string, RoutineStep> = {
  "cilt-bakimi/yuz-temizleyiciler": "temizleme",
  "cilt-bakimi/tonik-ve-losyonlar": "tonik",
  "cilt-bakimi/serumlar": "serum",
  "cilt-bakimi/nemlendiriciler": "nemlendirme",
  "cilt-bakimi/yuz-maskeleri": "maske",
  "cilt-bakimi/goz-cevresi": "goz-bakimi",
  "cilt-bakimi/gunes-koruma": "gunes-koruma",
  "cilt-bakimi/dudak-bakimi": "dudak-bakimi",
};

const isSkinType = (v: string): v is SkinTypeSlug => SKIN_TYPES.some((t) => t.slug === v);
const isConcern = (v: string): v is Concern => (CONCERNS as readonly string[]).includes(v);
const isLevel = (v: string): v is RoutineLevel => (ROUTINE_LEVELS as readonly string[]).includes(v);

// ------------------------------------------------------------------ selection <-> URL (CILT-TESTI §2)

export interface FinderSelection {
  /** null = nothing chosen yet (start state) */
  tip: SkinTypeSlug | null;
  /** "Bilmiyorum" -> tip normal + note */
  unknown: boolean;
  /** "Cildim ayrıca hassas"; forced true when tip = hassas */
  hassas: boolean;
  /** 0–3 */
  ihtiyac: Concern[];
  rutin: RoutineLevel;
  gorunum: "rutin" | "tumu";
}

export const MAX_CONCERNS = 3;

type Raw = Record<string, string | string[] | undefined> | URLSearchParams;
const one = (sp: Raw, key: string): string | undefined => {
  if (sp instanceof URLSearchParams) return sp.get(key) ?? undefined;
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
};

/** Invalid values are ignored silently; invalid `tip` -> start state (§2). `pathTip` = /cilt-tipine-gore/{tip}. */
export function parseFinderParams(sp: Raw, pathTip?: string | null): FinderSelection {
  const rawTip = pathTip ?? one(sp, "tip") ?? "";
  const tip = isSkinType(rawTip) ? rawTip : null;
  const ihtiyac = [
    ...new Set(
      (one(sp, "ihtiyac") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(isConcern),
    ),
  ].slice(0, MAX_CONCERNS);
  const rutin = one(sp, "rutin") ?? "";
  return {
    tip,
    unknown: tip === "normal" && one(sp, "bilinmiyor") === "1",
    hassas: tip === "hassas" || one(sp, "hassas") === "1",
    ihtiyac,
    rutin: isLevel(rutin) ? rutin : "sade",
    gorunum: one(sp, "gorunum") === "tumu" ? "tumu" : "rutin",
  };
}

/** Canonical query string (defaults omitted). `includeTip=false` on /cilt-tipine-gore/{tip}. */
export function toFinderSearch(sel: FinderSelection, includeTip = true): string {
  const q = new URLSearchParams();
  if (includeTip && sel.tip) q.set("tip", sel.tip);
  if (sel.unknown && sel.tip === "normal") q.set("bilinmiyor", "1");
  if (sel.hassas && sel.tip !== "hassas") q.set("hassas", "1");
  if (sel.ihtiyac.length) q.set("ihtiyac", sel.ihtiyac.join(","));
  if (sel.rutin !== "sade") q.set("rutin", sel.rutin);
  if (sel.gorunum !== "rutin") q.set("gorunum", sel.gorunum);
  const s = q.toString().replace(/%2C/g, ",");
  return s ? `?${s}` : "";
}

// ------------------------------------------------------------------ matching (CILT-TESTI §4)

export interface FinderCandidate {
  id: string;
  code: string;
  skinType: readonly string[];
  concerns: readonly string[];
  routineStep: string | null;
  availability: "tr" | "yakinda";
  /** "Fiyat"; null = no price (yakında) -> sorts last */
  price: number | null;
  isSet?: boolean;
  /** Optional editor tie-breaker (§3.4) */
  quizPriority?: number | null;
  /** Optional flag `hassas-uygun-degil` (§3.4) */
  notForSensitive?: boolean;
  /** Sets only (§3.4) */
  quizRoutine?: RoutineLevel | null;
}

/** null = eliminated by the eligibility filter (§4 Adım 2), otherwise the score (§4 Adım 3). */
export function scoreCandidate(c: FinderCandidate, sel: FinderSelection): number | null {
  if (!sel.tip || c.skinType.length === 0) return null;
  const exact = c.skinType.includes(sel.tip);
  const all = c.skinType.includes("tum-ciltler");
  if (!exact && !all) return null;
  if (sel.hassas && c.notForSensitive) return null;
  let score = exact ? 3 : 1;
  const shared = c.concerns.filter((x) => (sel.ihtiyac as readonly string[]).includes(x)).length;
  score += 2 * Math.min(shared, MAX_CONCERNS);
  if (sel.hassas && sel.tip !== "hassas" && c.skinType.includes("hassas")) score += 2;
  if (c.availability === "tr") score += 10;
  return score;
}

function compare(a: { c: FinderCandidate; s: number }, b: { c: FinderCandidate; s: number }): number {
  return (
    b.s - a.s ||
    (b.c.quizPriority ?? 0) - (a.c.quizPriority ?? 0) ||
    (a.c.price ?? Number.POSITIVE_INFINITY) - (b.c.price ?? Number.POSITIVE_INFINITY) ||
    (a.c.code < b.c.code ? -1 : a.c.code > b.c.code ? 1 : 0)
  );
}

export interface RoutineSlot<T> {
  step: RoutineStep;
  main: T | null;
  /** next best, at most 2 */
  alternatives: T[];
}

export interface FinderResult<T> {
  /** Every eligible candidate, best first (view "Tüm uygun ürünler"). Sets excluded. */
  all: T[];
  routine: RoutineSlot<T>[];
  /** §4 Adım 5 */
  set: T | null;
  /** §4 Adım 6 */
  empty: boolean;
  scores: Map<string, number>;
}

export function matchFinder<T extends FinderCandidate>(candidates: readonly T[], sel: FinderSelection): FinderResult<T> {
  const scores = new Map<string, number>();
  const ranked: Array<{ c: T; s: number }> = [];
  for (const c of candidates) {
    if (!c.routineStep && !c.isSet) continue; // §4 Adım 1
    const s = scoreCandidate(c, sel);
    if (s === null) continue;
    scores.set(c.id, s);
    ranked.push({ c, s });
  }
  ranked.sort(compare);

  const products = ranked.filter((r) => !r.c.isSet);
  const used = new Set<string>();
  const routine: RoutineSlot<T>[] = LEVEL_STEPS[sel.rutin].map((step) => {
    const accepted = STEP_ALIASES[step] ?? [step];
    const pool = products.filter((r) => !used.has(r.c.id) && accepted.includes(r.c.routineStep as RoutineStep));
    const [main, ...rest] = pool;
    if (main) used.add(main.c.id);
    return { step, main: main?.c ?? null, alternatives: rest.slice(0, 2).map((r) => r.c) };
  });

  const set =
    ranked.find((r) => r.c.isSet && r.c.availability === "tr" && r.c.quizRoutine === sel.rutin)?.c ?? null;

  const all = products.map((r) => r.c);
  return { all, routine, set, empty: all.length === 0 || routine.every((r) => r.main === null), scores };
}

/** "Rutindeki ürünleri sepete ekle (N)": only TR main picks (§5.4). */
export function routineCartCodes<T extends FinderCandidate>(routine: RoutineSlot<T>[]): { tr: T[]; comingSoon: T[] } {
  const mains = routine.flatMap((r) => (r.main ? [r.main] : []));
  return { tr: mains.filter((m) => m.availability === "tr"), comingSoon: mains.filter((m) => m.availability !== "tr") };
}
