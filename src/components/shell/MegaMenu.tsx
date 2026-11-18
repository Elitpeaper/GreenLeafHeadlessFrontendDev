"use client";

/**
 * Desktop mega menu (≥ 1024px) — bilesenler/mega-menu.md §1, wireframe/mega-menu.md A0–A6, K-064, K-077, K-091.
 * K-290: there is no trigger button any more. The menu is CONTROLLED by the header search: focusing / clicking the
 * search input opens it (HeaderSearch owns `open`); typing 2+ characters hands the space to the instant results.
 * 4 zones: roots (left) · sub-category image tiles + text list (centre) · featured product + promo (right).
 * - Panels stay in the DOM once mounted (links crawlable); inactive roots are `hidden`, so lazy images load on demand.
 * - Hover-recolor zone Z1 on the panel, linked to header Z2 (#header-accent).
 * - Esc / pointerdown outside `containerRef` (capsule + panel) closes it.
 * Motion hooks: data-motion="mega-panel" | "mega-tiles" | "mega-root-bar", data-state on the panel.
 */
import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useRef, useState, type RefObject } from "react";
import { useAccentZone } from "@/lib/theme/useAccentZone";
import { useT } from "@/lib/ui-text/client";
import { useMenuRoots } from "./menu-media";
import type { MenuRootNav } from "./menu-model";

const loadPanel = () => import("./MegaMenuPanel");
const MegaMenuPanel = dynamic(loadPanel, { ssr: false });

const ROOT_INTENT_MS = 80;

export function MegaMenu({
  roots,
  open,
  onClose,
  containerRef,
}: {
  /** Text-only roots; images / featured / promo are fetched once the panel mounts (K-288, menu-media.ts). */
  roots: MenuRootNav[];
  open: boolean;
  onClose: (returnFocus?: boolean) => void;
  /** Wrapper of the search capsule + this panel: pointerdown inside it never closes the menu. */
  containerRef: RefObject<HTMLElement | null>;
}) {
  const { t } = useT();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(roots[0]?.root ?? "");
  const timers = useRef<{ root?: number }>({});
  const rootList = useRef<HTMLUListElement>(null);
  const panelId = useId();
  const { ref: zoneRef } = useAccentZone<HTMLDivElement>({ intentDelay: 120, releaseDelay: 200, linkedIds: ["header-accent"], disabled: !open });

  if (open && !mounted) setMounted(true); // lazy body mounts on first open (render-time derive, no effect)
  const fullRoots = useMenuRoots(roots, mounted);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2500));
    const id = idle(() => void loadPanel());
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(true);
    };
    const onDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) onClose();
    };
    const onFocusOut = (e: FocusEvent) => {
      const to = e.relatedTarget as Node | null;
      if (to && !containerRef.current?.contains(to)) onClose();
    };
    const box = containerRef.current;
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    box?.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      box?.removeEventListener("focusout", onFocusOut);
    };
  }, [open, onClose, containerRef]);

  useEffect(() => {
    const tm = timers.current;
    return () => window.clearTimeout(tm.root);
  }, []);

  const clear = useCallback((k: "open" | "root" | "close") => {
    if (k === "root") window.clearTimeout(timers.current.root);
  }, []);

  const selectRoot = (root: string, immediate = false) => {
    clear("root");
    if (immediate) setActive(root);
    else timers.current.root = window.setTimeout(() => setActive(root), ROOT_INTENT_MS);
  };

  return (
    <>
      {/* Scrim: ink 30% under the panel, below the sticky header */}
      {open && <div aria-hidden="true" className="absolute inset-x-0 top-full h-dvh bg-ink/30" data-motion="mega-scrim" />}

      <div
        ref={zoneRef}
        id={panelId}
        role="region"
        aria-label={t("megaMenu.title")}
        data-accent-zone=""
        data-motion="mega-panel"
        data-state={open ? "open" : "closed"}
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-line bg-surface shadow-overlay"
      >
        {mounted && (
          <MegaMenuPanel
            roots={fullRoots}
            active={active}
            setActive={setActive}
            selectRoot={selectRoot}
            clear={clear}
            close={(returnFocus) => onClose(returnFocus)}
            panelId={panelId}
            rootList={rootList}
            focusFirst={false}
          />
        )}
      </div>
    </>
  );
}
