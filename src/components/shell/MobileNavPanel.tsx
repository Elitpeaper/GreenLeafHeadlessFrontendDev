"use client";

/**
 * Mobile navigation panel body (levels 1-2). Loaded lazily by MobileNav on first open / intent / idle so the drawer
 * markup, next/image and ProductCardMini stay off the first-load JS (K-263). Remounted per opening (key) = level reset.
 */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ProductCardMini } from "@/components/product/ProductCardParts";
import { CategoryIllustration } from "@/components/illustrations/category-icons";
import { Award, ChevronLeft, LayoutGrid, ChevronRight, Heart, Info, ShoppingBag, Sprout, User, X } from "@/components/ui/lucide";
import { useT } from "@/lib/ui-text/client";
import type { MenuRoot } from "./menu-data";
import { PromoTile } from "./PromoTile";
import { Thumb } from "./Thumb";

export default function MobileNavPanel({ roots, close }: { roots: MenuRoot[]; close: () => void }) {
  const { t } = useT();
  const rootEl = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState<string | null>(null);
  /** Level 1 re-enters from the left after "Geri" (hareket-tasarimcisi note, motion-v2 §3). */
  const [back, setBack] = useState(false);
  const lastRootButton = useRef<string | null>(null);

  // Focus management between levels
  useEffect(() => {
    const d = rootEl.current?.closest("dialog");
    if (!d?.open) return;
    if (level) d.querySelector<HTMLElement>("[data-level-back]")?.focus();
    else if (lastRootButton.current) d.querySelector<HTMLElement>(`[data-root-btn="${lastRootButton.current}"]`)?.focus();
  }, [level]);

  const current = roots.find((r) => r.root === level) ?? null;

  return (
    <div ref={rootEl} className="contents">
        <div aria-hidden="true" className="grid h-1 grid-rows-[2px_1px_1px]">
          <span className="bg-stripe-1" />
          <span className="bg-stripe-2" />
          <span className="bg-stripe-3" />
        </div>
        <div className="flex h-16 items-center justify-between border-b border-line px-4">
          <Logo height={28} />
          <button type="button" onClick={close} className="grid size-12 place-items-center rounded-pill transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted" aria-label={t("header.menu.close")}>
            <X size={24} />
          </button>
        </div>

        <div className="relative h-[calc(100dvh-4.25rem)] overflow-hidden">
          {/* Level 1 */}
          <div hidden={!!current} className="h-full overflow-y-auto px-4 pb-8 pt-4" data-motion="mobile-nav-level" data-motion-dir={back ? "back" : undefined}>
            <Link href="/cilt-tipine-gore" onClick={close} className="flex min-h-14 items-center gap-3 rounded-md bg-blue-50 px-4 font-medium text-ink">
              <span className="grid size-10 place-items-center rounded-full bg-surface text-blue-700">
                <Sprout size={22} />
              </span>
              <span className="flex-1">{t("megaMenu.finder.title")}</span>
              <ChevronRight size={20} className="text-ink-muted" />
            </Link>

            <p className="mt-6 px-1 text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">{t("megaMenu.title")}</p>
            <ul className="mt-2">
              {roots.map((r) => (
                <li key={r.root}>
                  <button
                    type="button"
                    data-root-btn={r.root}
                    onClick={() => {
                      lastRootButton.current = r.root;
                      setBack(false);
                      setLevel(r.root);
                    }}
                    className="flex min-h-16 w-full items-center gap-3 rounded-md px-1 text-left transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted"
                  >
                    <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-ink">
                      <CategoryIllustration slug={r.root} className="size-9" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col leading-tight">
                      <span className="text-base font-medium">{r.title}</span>
                      <span className="text-xs text-ink-muted">{t("megaMenu.rootCount", { count: r.count })}</span>
                    </span>
                    <ChevronRight size={20} className="text-ink-muted" />
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-6 px-1 text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">{t("megaMenu.quickLinks")}</p>
            <ul className="mt-2">
              {[
                { href: "/urunler", label: t("megaMenu.allProducts"), Icon: LayoutGrid },
                { href: "/koleksiyon/turkiyede-satista", label: t("header.nav.inStock"), Icon: ShoppingBag },
                { href: "/kategori/setler", label: t("header.nav.sets"), Icon: Award },
                { href: "/pv-nedir", label: t("header.nav.pv"), Icon: Info, pv: true },
                { href: "/favoriler", label: t("header.favorites"), Icon: Heart },
                { href: "/sertifikalar", label: t("footer.link.certificates"), Icon: Award },
                { href: "/hakkimizda", label: t("footer.link.about"), Icon: User },
              ].map(({ href, label, Icon, pv }) => (
                <li key={href}>
                  <Link href={href} onClick={close} className="flex min-h-13 items-center gap-3 rounded-md px-1 text-base transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted">
                    {pv ? (
                      <span className="grid h-7 min-w-10 place-items-center rounded-pill bg-lime-100 px-2 text-xs font-semibold text-lime-700">PV</span>
                    ) : (
                      <span className="grid w-10 place-items-center text-ink-muted">
                        <Icon size={22} />
                      </span>
                    )}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-line pt-6">
              <Link href="/uye-ol" onClick={close} className="flex min-h-control-lg w-full items-center justify-center rounded-pill bg-green-700 text-lg font-medium text-white shadow-button transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800">
                {t("header.cta.membership")}
              </Link>
              <p className="mt-3 text-center text-sm text-ink-muted">{t("header.account.note")}</p>
            </div>
          </div>

          {/* Level 2 */}
          {current && (
            <div className="h-full overflow-y-auto px-4 pb-8 pt-3" data-motion="mobile-nav-level">
              <button
                type="button"
                data-level-back=""
                onClick={() => {
                  setBack(true);
                  setLevel(null);
                }}
                className="-ml-1 inline-flex min-h-tap items-center gap-1 rounded-pill pr-3 text-base font-medium text-green-700"
                aria-label={t("header.menu.back")}
              >
                <ChevronLeft size={22} />
                {t("common.back")}
              </button>
              <p className="mt-1 font-display text-2xl">{current.title}</p>
              {current.cover ? (
                <span className="relative mt-3 block aspect-[16/7] w-full overflow-hidden rounded-md bg-accent-soft">
                  <Image src={current.cover.src} alt="" fill sizes="88vw" className="object-cover" placeholder={current.cover.blurDataURL ? "blur" : "empty"} blurDataURL={current.cover.blurDataURL} />
                </span>
              ) : (
                <Thumb image={current.image} className="mt-3 aspect-[16/7] w-full rounded-md" sizes="88vw" />
              )}
              <Link href={current.href} onClick={close} className="mt-3 flex min-h-14 items-center justify-between rounded-md bg-accent-soft px-4 font-medium">
                {t("megaMenu.allInRootCount", { kategori: current.title, count: current.count })}
                <ChevronRight size={20} />
              </Link>
              <ul className="mt-2">
                {current.children.map((c) => (
                  <li key={c.path}>
                    <Link href={c.href} onClick={close} className="flex min-h-14 items-center gap-3 rounded-md px-1 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted">
                      <Thumb image={c.image} className="size-12 rounded-md" sizes="48px" />
                      <span className="flex-1 text-base">{c.title}</span>
                      <span className="text-xs text-ink-muted tabular-nums">{c.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {current.featured && (
                <div className="mt-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">{t("megaMenu.featured")}</p>
                  <div className="rounded-lg bg-surface p-1 ring-1 ring-line">
                    <ProductCardMini product={current.featured} onNavigate={close} />
                  </div>
                </div>
              )}
              {current.promo && <PromoTile promo={current.promo} onNavigate={close} className="mt-4" />}
            </div>
          )}
        </div>
    </div>
  );
}
