"use client";

/**
 * Mobile/tablet navigation drawer (< 1024px) — mega-menu.md §2, wireframe B1–B3.
 * <dialog> opened through the modal layer (src/lib/a11y/modal-layer.ts, K-288/P-02): top layer, focus trap, Esc,
 * deferred inert background, scroll lock — without showModal()'s full-document style pass.
 * The panel body (MobileNavPanel) loads lazily: on pointer/focus intent, on first open, or at browser idle; its images,
 * featured products and promos come from /api/menu on the same intent (menu-media.ts, P-08).
 * No hover recolor on touch (K-066). Motion hooks: data-motion="mobile-nav".
 */
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "@/components/ui/lucide";
import { closeLayer, openLayer } from "@/lib/a11y/modal-layer";
import { useT } from "@/lib/ui-text/client";
import type { SiteNavGroup } from "@/lib/site-nav";
import { loadMenuMedia, useMenuRoots } from "./menu-media";
import type { MenuRootNav } from "./menu-model";

const loadPanel = () => import("./MobileNavPanel");
const MobileNavPanel = dynamic(loadPanel, { ssr: false });

const intent = () => {
  void loadPanel();
  void loadMenuMedia();
};

export function MobileNav({ roots, siteNav }: { roots: MenuRootNav[]; siteNav: SiteNavGroup[] }) {
  const { t } = useT();
  const ref = useRef<HTMLDialogElement>(null);
  /** 0 = never opened (panel not mounted); each opening bumps the key so the panel starts at level 1. */
  const [openCount, setOpenCount] = useState(0);
  const fullRoots = useMenuRoots(roots, openCount > 0);

  const open = () => {
    const d = ref.current;
    if (!d) return;
    setOpenCount((n) => n + 1);
    openLayer(d);
  };
  const close = useCallback(() => closeLayer(ref.current), []);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2500));
    const id = idle(() => void loadPanel());
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        onPointerEnter={intent}
        onPointerDown={intent}
        onFocus={intent}
        aria-haspopup="dialog"
        aria-label={t("header.menu.open")}
        className="grid size-12 place-items-center rounded-pill text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted lg:hidden"
      >
        <Menu size={26} />
      </button>
      <dialog
        ref={ref}
        popover="manual"
        aria-modal="true"
        tabIndex={-1}
        onClick={(e) => {
          if (e.target === ref.current) close(); // ::backdrop
        }}
        aria-label={t("header.menu.title")}
        data-motion="mobile-nav"
        className="z-(--z-drawer) fixed inset-0 m-0 h-dvh max-h-dvh w-[min(88vw,400px)] max-w-none overflow-hidden bg-surface p-0 text-ink shadow-overlay outline-none backdrop:bg-ink/40"
      >
        {openCount > 0 && <MobileNavPanel key={openCount} roots={fullRoots} siteNav={siteNav} close={close} />}
      </dialog>
    </>
  );
}
