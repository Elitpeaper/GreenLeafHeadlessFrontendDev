"use client";

/** Mobile search: icon -> full-screen sheet (native <dialog>) with the same SearchBox (arama.md A). */
import { useRef, useState } from "react";
import { Search, X } from "@/components/ui/lucide";
import { useT } from "@/lib/ui-text/client";
import { SearchBox, type QuickLink } from "./SearchBox";

export function MobileSearch({ quickLinks }: { quickLinks: QuickLink[] }) {
  const { t } = useT();
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => ref.current?.close();
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={t("header.search.open")}
        onClick={() => {
          ref.current?.showModal();
          setOpen(true);
        }}
        className="grid size-12 place-items-center rounded-pill text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted lg:hidden"
      >
        <Search size={24} />
      </button>
      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        aria-label={t("header.search.label")}
        data-motion="search-sheet"
        className="z-(--z-drawer) m-0 h-dvh max-h-none w-full max-w-none bg-surface p-4 text-ink backdrop:bg-ink/40"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="font-display text-xl">{t("header.search.label")}</p>
          <button type="button" onClick={close} aria-label={t("common.close")} className="grid size-12 place-items-center rounded-pill transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted">
            <X size={24} />
          </button>
        </div>
        {open && (
          <div className="h-[calc(100%-4rem)]">
            <SearchBox quickLinks={quickLinks} variant="sheet" onDone={close} autoFocus />
          </div>
        )}
      </dialog>
    </>
  );
}
