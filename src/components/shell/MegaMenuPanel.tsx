"use client";

/**
 * Mega menu panel body (roots · sub-category tiles · featured + promo). Loaded lazily by MegaMenu on first hover /
 * focus / click intent (or browser idle) so its markup, next/image and ProductCardMini stay off the first-load JS (K-263).
 */
import Link from "next/link";
import { useEffect, type RefObject } from "react";
import { ProductCardMini } from "@/components/product/ProductCardParts";
import { CategoryIllustration } from "@/components/illustrations/category-icons";
import { ArrowRight, ChevronRight, Search } from "@/components/ui/lucide";
import { useExplore } from "./explore-store";
import { useT } from "@/lib/ui-text/client";
import type { MenuRoot } from "./menu-model";
import { PromoTile } from "./PromoTile";
import { Thumb } from "./Thumb";

const MAX_TILES = 8;

/** The mega panel closes first, so return focus goes to the explore trigger of the header row (compass/subnav) if any. */
function openExploreFrom(trigger: HTMLElement) {
  const target = document.querySelector<HTMLElement>("[data-explore-trigger]:not([hidden])") ?? trigger;
  useExplore.getState().show(target);
}

export default function MegaMenuPanel({
  roots,
  active,
  setActive,
  selectRoot,
  clear,
  close,
  panelId,
  rootList,
  focusFirst,
  onSearchInCategory,
}: {
  roots: MenuRoot[];
  active: string;
  setActive: (root: string) => void;
  selectRoot: (root: string, immediate?: boolean) => void;
  clear: (k: "open" | "root" | "close") => void;
  close: (returnFocus?: boolean) => void;
  panelId: string;
  rootList: RefObject<HTMLUListElement | null>;
  /** True when opened by click: focus the first root once the lazy panel has mounted. */
  focusFirst: boolean;
  /** K-268: "Bu kategoride ara" — sets the search scope to the active root and focuses the input. */
  onSearchInCategory?: (root: string) => void;
}) {
  const { t } = useT();
  useEffect(() => {
    if (focusFirst) {
        rootList.current?.querySelector<HTMLElement>("a[data-root-link]")?.focus();
    }
    // mount-only: later focus moves belong to the user
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRootKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const links = [...(rootList.current?.querySelectorAll<HTMLAnchorElement>("a[data-root-link]") ?? [])];
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (i < 0) return;
    let next = -1;
    if (e.key === "ArrowDown") next = (i + 1) % links.length;
    else if (e.key === "ArrowUp") next = (i - 1 + links.length) % links.length;
    else if (e.key === "ArrowRight") {
      e.preventDefault();
      document.getElementById(`${panelId}-${active}`)?.querySelector<HTMLElement>("a")?.focus();
      return;
    }
    if (next >= 0) {
      e.preventDefault();
      const el = links[next];
      el?.focus();
      if (el?.dataset.root) setActive(el.dataset.root);
    }
  };

  return (
    <>
        <nav aria-label={t("megaMenu.title")} className="mx-auto grid h-[min(calc(100dvh-10rem),45rem)] max-w-wide grid-cols-[17.5rem_1fr_20rem] grid-rows-[minmax(0,1fr)] px-gutter">
          {/* Zone 1 — roots */}
          <ul ref={rootList} onKeyDown={onRootKey} className="overflow-y-auto border-r border-line py-4 pr-3">
            {roots.map((r) => {
              const selected = r.root === active;
              return (
                <li key={r.root}>
                  <Link
                    href={r.href}
                    data-root-link=""
                    data-root={r.root}
                    aria-current={selected ? "true" : undefined}
                    onPointerEnter={() => selectRoot(r.root)}
                    onPointerLeave={() => clear("root")}
                    onFocus={() => selectRoot(r.root, true)}
                    onClick={() => close()}
                    className={`relative flex min-h-14 items-center gap-3 rounded-md py-1.5 pl-3 pr-2 ${selected ? "bg-accent-soft font-semibold" : "transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted"}`}
                  >
                    {selected && <span aria-hidden="true" data-motion="mega-root-bar" className="absolute inset-y-2 left-0 w-[3px] rounded-pill bg-accent-decor" />}
                    <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-ink">
                      <CategoryIllustration slug={r.root} className="size-8" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col leading-tight">
                      <span className="truncate text-base text-ink">{r.title}</span>
                      <span className="text-xs font-normal text-ink-muted">
                        {t("megaMenu.rootCount", { count: r.count })}
                        {r.trCount > 0 && <> · {t("megaMenu.rootTrCount", { count: r.trCount })}</>}
                      </span>
                    </span>
                    <ChevronRight size={18} className="shrink-0 text-ink-muted" />
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 border-t border-line pt-2">
              <Link
                href="/urunler"
                onClick={() => close()}
                className="flex min-h-12 items-center justify-between gap-3 rounded-md px-3 font-semibold text-green-700 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-50 hover:text-green-800"
              >
                {t("megaMenu.allProducts")}
                <ArrowRight size={18} />
              </Link>
            </li>
          </ul>

          {/* Zone 2 — sub-categories */}
          {roots.map((r) => {
            const sorted = [...r.children].sort((a, b) => b.count - a.count);
            const tiles = sorted.slice(0, MAX_TILES);
            const rest = r.children.filter((c) => !tiles.includes(c));
            return (
              <div key={r.root} id={`${panelId}-${r.root}`} hidden={r.root !== active} className="overflow-y-auto px-8 py-6" data-motion="mega-tiles">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-2xl text-ink">{r.title}</p>
                  <Link href={r.href} onClick={() => close()} className="inline-flex min-h-tap-min items-center gap-1.5 text-sm font-medium text-accent-text underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:underline">
                    {t("megaMenu.allInRootCount", { kategori: r.title, count: r.count })}
                    <ArrowRight size={16} />
                  </Link>
                </div>
                {tiles.length > 0 && (
                  <ul className="mt-4 grid grid-cols-4 gap-4">
                    {tiles.map((c) => (
                      <li key={c.path}>
                        <Link href={c.href} onClick={() => close()} className="group/tile block rounded-md">
                          <Thumb image={c.image} className="aspect-[4/3] w-full rounded-md" sizes="160px" zoom />
                          <span className="mt-2 line-clamp-2 block text-sm font-medium leading-snug text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 group-hover/tile:text-green-800">{c.title}</span>
                          <CountLine count={c.count} trCount={c.trCount} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {rest.length > 0 && (
                  <ul className="mt-5 grid grid-cols-2 gap-x-6 border-t border-line pt-4">
                    {rest.map((c) => (
                      <li key={c.path}>
                        <Link href={c.href} onClick={() => close()} className="flex min-h-tap-min items-center justify-between gap-3 rounded-sm text-sm text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-green-800">
                          <span className="truncate">{c.title}</span>
                          <CountLine count={c.count} trCount={c.trCount} inline />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {/* Zones 3 + 4 — featured + promo (recolor surface: --accent-soft) */}
          {roots.map((r) => (
            <div key={r.root} hidden={r.root !== active} className="flex flex-col gap-4 overflow-y-auto bg-accent-soft p-5">
              {r.featured && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-eyebrow text-accent-text">{t("megaMenu.featured")}</p>
                  <div className="rounded-lg bg-surface p-2 shadow-card">
                    <ProductCardMini product={r.featured} onNavigate={() => close()} />
                  </div>
                </div>
              )}
              {r.promo && <PromoTile promo={r.promo} onNavigate={() => close()} />}
            </div>
          ))}
        </nav>
        {/* Footer strip: scope bridge (K-268) + all-pages panel (K-266) */}
        <div className="flex items-center justify-between gap-4 border-t border-line bg-surface px-gutter py-2">
          {onSearchInCategory ? (
            <button
              type="button"
              onClick={() => {
                close();
                onSearchInCategory(active);
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-pill px-3 text-sm font-medium text-green-700 transition-colors duration-250 hover:bg-green-50"
            >
              <Search size={18} />
              {t("header.search.inCategory")}
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={(e) => {
              const trigger = e.currentTarget;
              close();
              openExploreFrom(trigger);
            }}
            className="inline-flex min-h-11 items-center gap-2 rounded-pill px-3 text-sm font-medium text-ink transition-colors duration-250 hover:bg-surface-muted"
          >
            {t("header.explore.allPages")}
            <ArrowRight size={16} />
          </button>
        </div>
        {/* Thin stripe — bottom edge (recolor) */}
        <div aria-hidden="true" className="grid h-1 grid-rows-[2px_1px_1px]" data-motion="mega-stripe">
          <span className="bg-stripe-1" />
          <span className="bg-stripe-2" />
          <span className="bg-stripe-3" />
        </div>
    </>
  );
}

function CountLine({ count, trCount, inline = false }: { count: number; trCount: number; inline?: boolean }) {
  const { t } = useT();
  return (
    <span className={`${inline ? "inline-flex shrink-0" : "mt-0.5 flex"} items-center gap-1.5 text-xs text-ink-muted`}>
      <span className="tabular-nums">{t("megaMenu.rootCount", { count })}</span>
      {trCount === 0 && <span className="font-medium text-blue-800">· {t("megaMenu.comingSoonTag")}</span>}
    </span>
  );
}

