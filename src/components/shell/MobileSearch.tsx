"use client";

/**
 * Mobile search: icon -> full-screen sheet with the same SearchBox (arama.md A). <dialog> opened through the modal
 * layer (src/lib/a11y/modal-layer.ts, K-288/P-02) instead of showModal().
 */
import { useEffect, useRef, useState } from "react";
import { Search, X } from "@/components/ui/lucide";
import { closeLayer, openLayer } from "@/lib/a11y/modal-layer";
import { useT } from "@/lib/ui-text/client";
import { useSearchScope } from "./HeaderSearch";
import type { MenuRootNav } from "./menu-model";
import { SearchBox, type QuickLink } from "./SearchBox";

/** The mobile drawer asks for the search sheet with this window event (no shared state needed). */
export const OPEN_MOBILE_SEARCH = "gl:open-search";

export function MobileSearch({ quickLinks, roots }: { quickLinks: QuickLink[]; roots: MenuRootNav[] }) {
  const { t } = useT();
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [scope, setScope] = useSearchScope(roots);
  const scopes = roots.map((r) => ({ root: r.root, title: r.title, count: r.count }));
  const close = () => closeLayer(ref.current);
  const show = () => {
    const d = ref.current;
    if (!d || d.open) return;
    openLayer(d, { onClose: () => setOpen(false) });
    setOpen(true);
  };
  useEffect(() => {
    const onOpen = () => show();
    window.addEventListener(OPEN_MOBILE_SEARCH, onOpen);
    return () => window.removeEventListener(OPEN_MOBILE_SEARCH, onOpen);
  }, []);
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={t("header.search.open")}
        onClick={show}
        className="grid size-12 place-items-center rounded-pill text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted lg:hidden"
      >
        <Search size={24} />
      </button>
      <dialog
        ref={ref}
        popover="manual"
        aria-modal="true"
        tabIndex={-1}
        aria-label={t("header.search.label")}
        data-motion="search-sheet"
        className="z-(--z-drawer) fixed inset-0 m-0 h-dvh max-h-none outline-none w-full max-w-none bg-surface p-4 text-ink backdrop:bg-ink/40"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="font-display text-xl">{t("header.search.label")}</p>
          <button type="button" onClick={close} aria-label={t("common.close")} className="grid size-12 place-items-center rounded-pill transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted">
            <X size={24} />
          </button>
        </div>
        {open && (
          <div className="h-[calc(100%-4rem)]">
            <SearchBox quickLinks={quickLinks} variant="sheet" onDone={close} autoFocus scope={scope} scopes={scopes} onScopeChange={setScope} />
          </div>
        )}
      </dialog>
    </>
  );
}
