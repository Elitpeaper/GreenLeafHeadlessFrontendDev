"use client";

/**
 * Desktop mega menu (≥ 1024px) — bilesenler/mega-menu.md §1, wireframe/mega-menu.md A0–A6, K-064, K-077, K-091.
 * 4 zones: roots (left) · sub-category image tiles + text list (centre) · featured product + promo (right).
 * - All panels are in the DOM (links crawlable); inactive panels are `hidden`, so their lazy images never load
 *   until that root is shown (A6 / KK-1-06).
 * - Hover-recolor zone Z1 on the panel, linked to header Z2 (#header-accent). Trigger = featured card (data-accent).
 * Motion hooks: data-motion="mega-panel" | "mega-tiles" | "mega-root-bar", data-state on the trigger.
 */
import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LayoutGrid, X } from "@/components/ui/lucide";
import { useAccentZone } from "@/lib/theme/useAccentZone";
import { useT } from "@/lib/ui-text/client";
import type { MenuRoot } from "./menu-data";

const loadPanel = () => import("./MegaMenuPanel");
const MegaMenuPanel = dynamic(loadPanel, { ssr: false });

const OPEN_INTENT_MS = 150;
const ROOT_INTENT_MS = 80;
const HOVER_CLOSE_MS = 300;

export function MegaMenu({ roots }: { roots: MenuRoot[] }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  /** Panel body is mounted on first intent (hover/focus/click) or browser idle; see MegaMenuPanel. */
  const [mounted, setMounted] = useState(false);
  const [focusFirst, setFocusFirst] = useState(false);
  const [active, setActive] = useState(roots[0]?.root ?? "");
  const openedBy = useRef<"hover" | "click">("click");
  const timers = useRef<{ open?: number; root?: number; close?: number }>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootList = useRef<HTMLUListElement>(null);
  const panelId = useId();
  const { ref: zoneRef } = useAccentZone<HTMLDivElement>({ intentDelay: 120, releaseDelay: 200, linkedIds: ["header-accent"], disabled: !open });

  const mount = useCallback(() => setMounted(true), []);
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2500));
    const id = idle(() => void loadPanel());
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id);
  }, []);

  const clear = (k: "open" | "root" | "close") => window.clearTimeout(timers.current[k]);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Esc + outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!zoneRef.current?.contains(target) && !buttonRef.current?.contains(target)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, close, zoneRef]);

  useEffect(() => {
    const tm = timers.current;
    return () => {
      window.clearTimeout(tm.open);
      window.clearTimeout(tm.root);
      window.clearTimeout(tm.close);
    };
  }, []);

  const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const onTriggerClick = () => {
    clear("open");
    if (open && openedBy.current === "hover") {
      openedBy.current = "click";
      return;
    }
    openedBy.current = "click";
    setOpen((o) => !o);
    mount();
    if (!open) setFocusFirst(true);
    if (!open) requestAnimationFrame(() => rootList.current?.querySelector<HTMLElement>("a[data-root-link]")?.focus());
  };

  const onEnterArea = () => {
    clear("close");
    if (!finePointer()) return;
    mount();
    if (open) return;
    clear("open");
    timers.current.open = window.setTimeout(() => {
      openedBy.current = "hover";
      setOpen(true);
    }, OPEN_INTENT_MS);
  };
  const onLeaveArea = () => {
    clear("open");
    if (!open || openedBy.current !== "hover") return;
    clear("close");
    timers.current.close = window.setTimeout(() => setOpen(false), HOVER_CLOSE_MS);
  };

  const selectRoot = (root: string, immediate = false) => {
    clear("root");
    if (immediate) setActive(root);
    else timers.current.root = window.setTimeout(() => setActive(root), ROOT_INTENT_MS);
  };

  return (
    <div className="hidden lg:block" onFocusCapture={mount} onPointerEnter={onEnterArea} onPointerLeave={onLeaveArea}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onTriggerClick}
        data-state={open ? "open" : "closed"}
        className={`inline-flex min-h-control items-center gap-2 rounded-pill border px-5 font-medium text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:border-green-700 ${
          open ? "border-accent-line bg-accent-soft" : "border-line-strong bg-surface"
        }`}
      >
        {open ? <X size={20} /> : <LayoutGrid size={20} />}
        {t("megaMenu.title")}
      </button>

      {/* Scrim: ink 30% under the panel, below the sticky header */}
      {open && <div aria-hidden="true" className="absolute inset-x-0 top-full h-dvh bg-ink/30" data-motion="mega-scrim" />}

      <div
        ref={zoneRef}
        id={panelId}
        data-accent-zone=""
        data-motion="mega-panel"
        data-state={open ? "open" : "closed"}
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-line bg-surface shadow-overlay"
      >
        {mounted && (
          <MegaMenuPanel
            roots={roots}
            active={active}
            setActive={setActive}
            selectRoot={selectRoot}
            clear={clear}
            close={close}
            panelId={panelId}
            rootList={rootList}
            focusFirst={focusFirst}
          />
        )}
      </div>
    </div>
  );
}
