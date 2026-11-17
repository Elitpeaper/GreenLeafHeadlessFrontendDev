"use client";

/**
 * Mobile filter panel (kategori.md §6): bottom sheet (≤ 90% height), focus trap via <dialog>, Esc, sticky footer
 * "N ürünü göster" + "Temizle". Filters are links, so they apply immediately; "göster" closes the sheet.
 */
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { SlidersHorizontal, X } from "@/components/ui/lucide";
import { useT } from "@/lib/ui-text/client";

export function MobileFilterSheet({ activeCount, total, clearHref, children }: { activeCount: number; total: number; clearHref: string; children: ReactNode }) {
  const { t } = useT();
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => ref.current?.showModal()}
        className="inline-flex min-h-control shrink-0 items-center gap-2 rounded-pill border border-line-strong bg-surface px-4 font-medium text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:border-green-700 lg:hidden"
      >
        <SlidersHorizontal size={20} />
        {t("listing.filter.open")}
        {activeCount > 0 && <span className="grid h-6 min-w-6 place-items-center rounded-pill bg-green-700 px-1.5 text-xs font-semibold text-white">{activeCount}</span>}
      </button>
      <dialog
        ref={ref}
        aria-label={t("listing.filter.title")}
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
        data-motion="filter-sheet"
        className="z-(--z-drawer) m-0 mt-auto max-h-[90dvh] w-full max-w-none rounded-t-xl bg-surface p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="flex max-h-[90dvh] flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
            <p className="font-display text-xl">{t("listing.filter.title")}</p>
            <button type="button" onClick={close} aria-label={t("common.close")} className="grid size-12 place-items-center rounded-pill transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-2" onClick={(e) => (e.target as HTMLElement).closest("a") && close()}>
            {children}
          </div>
          <div className="grid shrink-0 grid-cols-[auto_1fr] gap-3 border-t border-line px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
            <Link href={clearHref} scroll={false} onClick={close} className="inline-flex min-h-control items-center rounded-pill px-4 font-medium text-ink underline underline-offset-4">
              {t("common.clear")}
            </Link>
            <button type="button" onClick={close} className="min-h-control rounded-pill bg-green-700 px-5 font-medium text-white shadow-button transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800">
              {t("listing.filter.showResults", { count: total })}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
