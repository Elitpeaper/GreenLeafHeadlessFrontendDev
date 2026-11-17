"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Money, PriceBlock } from "@/components/product/Price";
import { Badge } from "@/components/product/Badge";
import { ProductCard } from "@/components/product/ProductCard";
import { Check, ShoppingBag, X } from "@/components/ui/lucide";
import { emailCapture } from "@/config/storefront";
import { useAddToCart } from "@/lib/cart";
import {
  CONCERNS,
  MAX_CONCERNS,
  ROUTINE_LEVELS,
  SKIN_TYPES,
  matchFinder,
  parseFinderParams,
  routineCartCodes,
  toFinderSearch,
  type Concern,
  type FinderSelection,
  type SkinTypeSlug,
} from "@/lib/catalog/skin";
import { formatPv } from "@/lib/format";
import { t, tc } from "@/components/sections/copy";
import type { FinderProduct } from "./candidates";
import { EmailCard, SaveCard } from "./EmailCard";
import { SkinTexture } from "./SkinTexture";

const typeName = (s: string) => t(`finder.skinType.${s}.name`);
const concernName = (c: string) => t(`finder.concern.${c}`);

/**
 * Skin-type finder (wireframe/cilt-tipine-gore.md, CILT-TESTI.md, skin-finder.md visuals). One page: selection
 * panel (sticky on desktop) + live result. Every choice is written to the URL (tip change = history entry, the
 * rest replace). Results use the pure matcher in lib/catalog/skin.ts. No hover-recolor here.
 */
export function FinderApp({
  candidates,
  pathTip,
  initial,
}: {
  candidates: FinderProduct[];
  pathTip?: SkinTypeSlug;
  /** parsed on the server from the request URL */
  initial: FinderSelection;
}) {
  // Selection lives in the URL; updates use the History API directly (no server round trip, result ≤ 100 ms).
  const [sel, setSel] = useState<FinderSelection>(initial);
  useEffect(() => {
    const onPop = () => {
      const m = location.pathname.match(/\/cilt-tipine-gore\/([a-z]+)/);
      setSel(parseFinderParams(new URLSearchParams(location.search), m?.[1] ?? null));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const [limitMsg, setLimitMsg] = useState(false);
  const [shown, setShown] = useState(24);

  const go = (next: FinderSelection, push = false) => {
    const onTypePage = pathTip != null;
    const base = onTypePage && next.tip === pathTip ? `/cilt-tipine-gore/${pathTip}` : "/cilt-tipine-gore";
    const url = `${base}${toFinderSearch(next, !(onTypePage && next.tip === pathTip))}`;
    setSel(next);
    if (push) window.history.pushState(null, "", url);
    else window.history.replaceState(null, "", url);
  };
  const setTip = (tip: SkinTypeSlug, unknown = false) =>
    go({ ...sel, tip, unknown, hassas: tip === "hassas" ? true : sel.tip === "hassas" ? false : sel.hassas }, true);
  const toggleConcern = (c: Concern) => {
    const has = sel.ihtiyac.includes(c);
    if (!has && sel.ihtiyac.length >= MAX_CONCERNS) {
      setLimitMsg(true);
      return;
    }
    setLimitMsg(false);
    go({ ...sel, ihtiyac: has ? sel.ihtiyac.filter((x) => x !== c) : [...sel.ihtiyac, c] });
  };

  const result = useMemo(() => matchFinder(candidates, sel), [candidates, sel]);

  return (
    <div className="mx-auto grid max-w-page gap-8 px-gutter pb-section pt-8 lg:grid-cols-12 lg:pt-10 lg:gap-10">
      {/* Selection panel */}
      <aside aria-label={t("finder.panel.aria")} className="lg:col-span-4">
        <div className="grid gap-6 rounded-xl bg-blue-50 p-5 sm:p-6 lg:sticky lg:top-28">
          {/* B-13: the same type choice is never offered twice - before a pick, the big cards on the right are the only selector. */}
          {sel.tip && (
          <fieldset>
            <legend className="flex items-center gap-2 text-lg font-semibold text-ink">
              {t("finder.step.type")}
              <span className="rounded-sm bg-surface px-2 py-0.5 text-xs font-medium text-ink-muted">{t("finder.step.type.required")}</span>
            </legend>
            {/* B-13: after a pick the panel is a SUMMARY (chosen type) + a closed "change" disclosure, never a second selector. */}
            <div className="mt-3 flex items-center gap-3 rounded-lg bg-surface p-3 shadow-card ring-2 ring-green-700">
              <SkinTexture type={sel.tip} className="size-12 shrink-0" />
              <p className="min-w-0 text-lg font-semibold text-ink">{typeName(sel.tip)}</p>
            </div>
            <details key={sel.tip} className="group mt-2">
              <summary className="inline-flex min-h-tap-min cursor-pointer list-none items-center gap-1.5 font-medium text-green-700 underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-250 hover:decoration-current [&::-webkit-details-marker]:hidden">
                {t("finder.step.type.change")}
              </summary>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {SKIN_TYPES.map((s, i) => {
                  const checked = sel.tip === s.slug;
                  return (
                    <label
                      key={s.slug}
                      className={`relative flex min-h-14 cursor-pointer items-center gap-3 rounded-lg bg-surface p-2.5 pr-3 ring-1 transition-shadow duration-250 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue-700 ${
                        checked ? "shadow-card ring-2 ring-green-700" : "ring-line-strong transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:shadow-card"
                      } ${i === SKIN_TYPES.length - 1 ? "col-span-2" : ""}`}
                    >
                      <input type="radio" name="tip" value={s.slug} checked={checked} onChange={() => setTip(s.slug)} className="sr-only" />
                      <SkinTexture type={s.slug} className="size-10 shrink-0" />
                      <span className="text-base font-medium text-ink">{typeName(s.slug)}</span>
                      {checked && (
                        <span aria-hidden="true" className="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-green-700 text-white" data-motion="pop">
                          <Check size={14} />
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </details>
            <details className="group mt-3">
              <summary className="inline-flex min-h-tap-min cursor-pointer list-none items-center gap-1.5 font-medium text-green-700 underline-offset-4 underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current [&::-webkit-details-marker]:hidden">
                {t("finder.skinType.unknown")}?
              </summary>
              <div className="mt-2 grid gap-2 rounded-md bg-surface p-4 text-sm">
                <p className="text-ink-muted">{t("finder.skinType.unknownHelp")}</p>
                <dl className="grid gap-1.5">
                  {SKIN_TYPES.map((s) => (
                    <div key={s.slug}>
                      <dt className="inline font-semibold text-ink">{typeName(s.slug)}: </dt>
                      <dd className="inline text-ink-muted">{t(`finder.skinType.${s.slug}.help`)}</dd>
                    </div>
                  ))}
                </dl>
                <button
                  type="button"
                  onClick={() => setTip("normal", true)}
                  className="mt-1 inline-flex min-h-tap-min items-center justify-self-start rounded-pill bg-surface px-4 font-medium text-green-700 ring-1 ring-green-700 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-50"
                >
                  {t("finder.skinType.assumeNormal")}
                </button>
              </div>
            </details>
          </fieldset>
          )}

          {sel.tip && sel.tip !== "hassas" && (
            <label className="flex min-h-tap cursor-pointer items-center justify-between gap-4 rounded-lg bg-surface px-4 ring-1 ring-line">
              <span className="text-base font-medium text-ink">{t("finder.sensitive.toggle")}</span>
              <input
                type="checkbox"
                role="switch"
                checked={sel.hassas}
                onChange={(e) => go({ ...sel, hassas: e.target.checked })}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="relative h-7 w-12 shrink-0 rounded-pill bg-line-strong transition-colors duration-250 peer-checked:bg-green-700 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-700 after:absolute after:left-1 after:top-1 after:size-5 after:rounded-full after:bg-white after:transition-transform duration-250 peer-checked:after:translate-x-5"
              />
            </label>
          )}

          <fieldset>
            <legend className="text-lg font-semibold text-ink">{t("finder.concerns.title")}</legend>
            <p className="mt-1 text-sm text-ink-muted">{t("finder.concerns.hint")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONCERNS.map((c) => {
                const on = sel.ihtiyac.includes(c);
                const blocked = !on && sel.ihtiyac.length >= MAX_CONCERNS;
                return (
                  <label
                    key={c}
                    className={`inline-flex min-h-tap-min cursor-pointer items-center gap-1.5 rounded-pill px-4 py-2 text-sm font-medium ring-1 transition-colors duration-250 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue-700 ${
                      on ? "bg-green-700 text-white ring-green-700" : "bg-surface text-ink ring-line-strong transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-50"
                    } ${blocked ? "opacity-60" : ""}`}
                  >
                    <input type="checkbox" className="sr-only" checked={on} aria-disabled={blocked || undefined} onChange={() => toggleConcern(c)} />
                    {on && <Check size={16} />}
                    {concernName(c)}
                  </label>
                );
              })}
            </div>
            <p aria-live="polite" className="mt-2 min-h-5 text-sm text-ink">
              {limitMsg ? t("finder.concerns.max") : null}
            </p>
          </fieldset>

          {(sel.tip || sel.ihtiyac.length > 0) && (
            <button type="button" onClick={() => go({ tip: null, unknown: false, hassas: false, ihtiyac: [], rutin: "sade", gorunum: "rutin" }, true)} className="inline-flex min-h-tap-min items-center gap-1.5 justify-self-start font-medium text-green-700 underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
              <X size={18} /> {t("finder.clear")}
            </button>
          )}
        </div>
      </aside>

      {/* Result area */}
      <div className={`lg:col-span-8 ${sel.tip ? "" : "max-lg:order-first"}`} aria-live="polite">
        {!sel.tip ? (
          <StartState onPick={setTip} />
        ) : result.empty ? (
          <div className="rounded-xl bg-surface-muted p-8 text-center">
            <h2 className="text-2xl text-ink">{t("finder.empty.title")}</h2>
            <p className="mt-2 text-ink-muted">{t("finder.empty.body")}</p>
            <Link
              href={`/kategori/cilt-bakimi?tip=${sel.tip}`}
              className="mt-6 inline-flex min-h-control items-center rounded-pill bg-green-700 px-6 font-medium text-white transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800"
            >
              {t("finder.empty.cta")}
            </Link>
          </div>
        ) : (
          <Results sel={sel} result={result} go={go} shown={shown} setShown={setShown} />
        )}
        <p className="mt-10 text-sm text-ink-muted">{t("finder.patchTest")}</p>
      </div>
    </div>
  );
}

function StartState({ onPick }: { onPick: (t: SkinTypeSlug) => void }) {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-grid-gap md:grid-cols-3" data-motion="stagger">
        {SKIN_TYPES.map((s) => (
          <li key={s.slug}>
            <button
              type="button"
              onClick={() => onPick(s.slug)}
              className="group flex h-full w-full flex-col items-start gap-3 rounded-xl bg-surface p-5 text-left shadow-card ring-1 ring-line transition-[translate,box-shadow] duration-250 motion-safe:hover:-translate-y-1 hover:shadow-lift"
            >
              <SkinTexture type={s.slug} className="size-16" />
              <span className="text-xl font-medium text-ink">{typeName(s.slug)}</span>
              <span className="text-sm text-ink-muted">{t(`finder.skinType.${s.slug}.help`)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Results({
  sel,
  result,
  go,
  shown,
  setShown,
}: {
  sel: FinderSelection;
  result: ReturnType<typeof matchFinder<FinderProduct>>;
  go: (s: FinderSelection, push?: boolean) => void;
  shown: number;
  setShown: (n: number) => void;
}) {
  const add = useAddToCart();
  const [added, setAdded] = useState(false);
  const split = routineCartCodes(result.routine);
  const tr = split.tr.filter((p) => p.product.sellable); // only items that can really go into the cart
  const comingSoon = split.comingSoon;
  const sum = (f: (p: FinderProduct) => number | null) => tr.reduce((a, p) => a + (f(p) ?? 0), 0);
  const total = sum((p) => p.product.price);
  const member = sum((p) => p.product.memberPrice);
  const pv = Math.round(sum((p) => p.product.pv) * 100) / 100;

  const profile = [
    `${typeName(sel.tip ?? "normal")} ${t("finder.profile.skin")}`,
    ...(sel.hassas && sel.tip !== "hassas" ? [t("finder.profile.sensitive")] : []),
    ...sel.ihtiyac.map(concernName),
  ];
  const why = (p: FinderProduct) => {
    const shared = p.concerns.filter((c) => (sel.ihtiyac as readonly string[]).includes(c));
    if (p.skinType.includes(sel.tip ?? "")) {
      return shared.length
        ? t("finder.why.template", { tip: typeName(sel.tip ?? ""), ihtiyac: shared.map(concernName).join(", ").toLocaleLowerCase("tr") })
        : t("finder.why.templateTypeOnly", { tip: typeName(sel.tip ?? "") });
    }
    return t("finder.why.templateAllSkin");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" data-motion="reveal">
        {profile.map((p) => (
          <span key={p} className="rounded-pill bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-800">
            {p}
          </span>
        ))}
        {sel.unknown && <span className="text-sm text-ink-muted">{t("finder.skinType.assumedNote")}</span>}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-line">
        <div role="tablist" aria-label={t("finder.view.aria")} className="flex gap-1">
          {(["rutin", "tumu"] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={sel.gorunum === v}
              onClick={() => go({ ...sel, gorunum: v })}
              className={`-mb-px min-h-tap border-b-[3px] px-4 font-medium ${sel.gorunum === v ? "border-green-700 text-ink" : "border-transparent text-ink-muted transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-ink"}`}
            >
              {v === "rutin" ? t("finder.view.routine") : t("finder.view.all", { count: result.all.length })}
            </button>
          ))}
        </div>
      </div>

      {sel.gorunum === "rutin" ? (
        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_17rem]">
          <div>
            <div role="radiogroup" aria-label={t("finder.level.label")} className="inline-flex flex-wrap rounded-pill bg-surface-muted p-1">
              {ROUTINE_LEVELS.map((lv) => (
                <button
                  key={lv}
                  role="radio"
                  aria-checked={sel.rutin === lv}
                  onClick={() => go({ ...sel, rutin: lv })}
                  className={`min-h-tap-min rounded-pill px-4 text-sm font-medium transition-colors duration-250 ${sel.rutin === lv ? "bg-surface text-ink shadow-xs" : "text-ink-muted hover:text-ink"}`}
                >
                  {t(`finder.level.${lv}`)}
                </button>
              ))}
            </div>

            {result.set && (
              <div className="mt-6">
                <h2 className="text-xl text-ink">{t("finder.set.title")}</h2>
                <div className="mt-3 max-w-xs">
                  <ProductCard product={result.set.product} />
                </div>
              </div>
            )}

            <ol className="mt-6 grid gap-4" data-motion="stagger">
              {result.routine.map((slot, i) => (
                <li key={slot.step} className="rounded-xl bg-surface p-4 ring-1 ring-line sm:p-5">
                  <h3 className="flex flex-wrap items-baseline gap-x-3 text-lg text-ink">
                    <span aria-hidden="true" className="font-[family-name:var(--font-role-accent)] text-3xl font-bold text-accent-text">
                      {i + 1}
                    </span>
                    <span className="sr-only">{i + 1}. </span>
                    {t(`finder.routineStep.${slot.step}`)}
                    <span className="text-sm font-normal text-ink-muted">{t(`finder.routineStep.when.${slot.step}`)}</span>
                  </h3>
                  {slot.main ? (
                    <>
                      <RoutineCard p={slot.main} why={why(slot.main)} />
                      {slot.alternatives.length > 0 && (
                        <details className="group mt-2">
                          <summary className="inline-flex min-h-tap-min cursor-pointer list-none items-center font-medium text-green-700 underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current [&::-webkit-details-marker]:hidden">
                            <span className="group-open:hidden">{t("finder.alternatives", { count: slot.alternatives.length })}</span>
                            <span className="hidden group-open:inline">{t("finder.alternatives.hide")}</span>
                          </summary>
                          <div className="mt-2 grid gap-2">
                            {slot.alternatives.map((a) => (
                              <RoutineCard key={a.id} p={a} why={why(a)} compact />
                            ))}
                          </div>
                        </details>
                      )}
                    </>
                  ) : (
                    <p className="mt-2 text-ink-muted">{t("finder.step.empty")}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Bulk CTA — sticky (bottom bar on phones) */}
          <div className="max-xl:fixed max-xl:inset-x-0 max-xl:bottom-0 max-xl:z-20 max-xl:border-t max-xl:border-line max-xl:bg-surface/95 max-xl:px-gutter max-xl:pb-[max(0.75rem,env(safe-area-inset-bottom))] max-xl:pt-3 max-xl:backdrop-blur xl:sticky xl:top-28 xl:self-start">
            <div className="xl:rounded-xl xl:bg-surface xl:p-5 xl:shadow-lift xl:ring-1 xl:ring-line">
              {tr.length > 0 ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      tr.forEach((p) => add(p.code, 1));
                      setAdded(true);
                    }}
                    data-motion="added"
                    className="inline-flex min-h-control w-full items-center justify-center gap-2 rounded-pill bg-green-700 px-5 font-medium text-white shadow-button transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800"
                  >
                    {added ? <Check size={20} /> : <ShoppingBag size={20} />}
                    {added ? t("finder.added") : t("finder.cta.addAll", { count: tr.length })}
                  </button>
                  <dl className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <div className="flex gap-1">
                      <dt className="text-ink-muted">{t("pv.example.total")}</dt>
                      <dd className="font-semibold text-ink">
                        <Money value={total} />
                      </dd>
                    </div>
                    <div className="flex gap-1 rounded-sm bg-green-700 px-2 py-0.5 text-white">
                      <dt>{t("pv.example.memberTotal")}</dt>
                      <dd className="font-semibold">
                        <Money value={member} />
                      </dd>
                    </div>
                    <div className="flex gap-1 rounded-pill bg-lime-100 px-2 py-0.5 font-semibold text-lime-700">
                      <dt>{t("pv.example.pv")}</dt>
                      <dd>{formatPv(pv)}</dd>
                    </div>
                  </dl>
                  {comingSoon.length > 0 && <p className="mt-2 text-sm text-ink-muted">{tc("finder.cta.comingSoonNote", comingSoon.length)}</p>}
                </>
              ) : (
                <Link
                  href="/kategori/cilt-bakimi?stok=tr"
                  className="inline-flex min-h-control w-full items-center justify-center rounded-pill bg-green-700 px-5 text-center font-medium text-white transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800"
                >
                  {t("finder.cta.none")}
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <ul className="grid grid-cols-2 gap-grid-gap md:grid-cols-3">
            {result.all.slice(0, shown).map((p) => (
              <li key={p.id}>
                <ProductCard product={p.product} />
              </li>
            ))}
          </ul>
          {result.all.length > shown && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShown(shown + 24)}
                className="inline-flex min-h-control items-center rounded-pill px-6 font-medium text-green-700 ring-1 ring-green-700 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-50"
              >
                {t("common.loadMore")}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <EmailCard enabled={emailCapture.enabled} />
        <SaveCard />
      </div>
      <Link href="/uye-ol" className="mt-6 inline-flex min-h-tap items-center gap-1.5 font-medium text-green-700 underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
        {t("finder.membership.line")} <span aria-hidden="true">→</span>
      </Link>
      <div className="h-28 xl:hidden" aria-hidden="true" />
    </div>
  );
}

/** Horizontal routine card (wireframe §3c): no separate add button; TR = two prices + PV, yakında = badge + PV. */
function RoutineCard({ p, why, compact = false }: { p: FinderProduct; why: string; compact?: boolean }): ReactNode {
  const s = p.product;
  return (
    <article className={`relative mt-3 flex gap-4 rounded-lg ${compact ? "bg-surface-muted p-3" : "bg-accent-soft p-3 sm:p-4"}`}>
      <span className={`relative shrink-0 overflow-hidden rounded-md bg-surface ${compact ? "size-16" : "size-24 sm:size-28"}`}>
        {s.image && <Image src={s.image.src} alt="" fill sizes="112px" className="object-contain p-2 mix-blend-multiply" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-ink-muted">{s.brand.title}</p>
        <h4 className="line-clamp-2 text-base font-medium text-ink">
          <Link href={s.href} className="after:absolute after:inset-0 underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
            {s.name}
          </Link>
        </h4>
        {!compact && <p className="mt-1 text-sm text-ink-muted">{why}</p>}
        <div className="relative mt-2 flex flex-wrap items-center gap-2">
          {s.availability === "yakinda" && <Badge tone="comingSoon" />}
          <PriceBlock price={s.price} memberPrice={s.memberPrice} pv={s.pv} availability={s.availability} size="line" pvInfo={false} />
        </div>
      </div>
    </article>
  );
}
