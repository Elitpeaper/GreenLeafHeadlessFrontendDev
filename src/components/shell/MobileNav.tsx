"use client";

/**
 * Mobile/tablet navigation drawer (< 1024px) — mega-menu.md §2, wireframe B1–B3.
 * Native <dialog>: focus trap, Esc, inert background. The panel body (MobileNavPanel) loads lazily: on pointer/focus
 * intent, on first open, or at browser idle. No hover recolor on touch (K-066). Motion hooks: data-motion="mobile-nav".
 */
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Menu } from "@/components/ui/lucide";
import { useT } from "@/lib/ui-text/client";
import type { MenuRoot } from "./menu-data";

const loadPanel = () => import("./MobileNavPanel");
const MobileNavPanel = dynamic(loadPanel, { ssr: false });

export function MobileNav({ roots }: { roots: MenuRoot[] }) {
  const { t } = useT();
  const ref = useRef<HTMLDialogElement>(null);
  /** 0 = never opened (panel not mounted); each opening bumps the key so the panel starts at level 1. */
  const [openCount, setOpenCount] = useState(0);

  const open = () => {
    setOpenCount((n) => n + 1);
    ref.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const close = () => ref.current?.close();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === d) d.close(); // backdrop
    };
    d.addEventListener("close", onClose);
    d.addEventListener("click", onClick);
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2500));
    const id = idle(() => void loadPanel());
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("click", onClick);
      (window.cancelIdleCallback ?? window.clearTimeout)(id);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        onPointerEnter={() => void loadPanel()}
        onFocus={() => void loadPanel()}
        aria-haspopup="dialog"
        aria-label={t("header.menu.open")}
        className="grid size-12 place-items-center rounded-pill text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted lg:hidden"
      >
        <Menu size={26} />
      </button>
      <dialog
        ref={ref}
        aria-label={t("header.menu.title")}
        data-motion="mobile-nav"
        className="z-(--z-drawer) m-0 h-dvh max-h-dvh w-[min(88vw,400px)] max-w-none overflow-hidden bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40"
      >
        {openCount > 0 && <MobileNavPanel key={openCount} roots={roots} close={close} />}
      </dialog>
    </>
  );
}
