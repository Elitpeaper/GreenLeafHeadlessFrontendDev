"use client";

/**
 * Keşfet all-pages panel host + triggers (K-266, K-269). Panel lives inside #header-accent so Lenis locks while open
 * (data-state="open") and the hover-recolor header zone stays the same. Triggers:
 *   <ExploreTrigger />  sub-nav "Keşfet ▾"      <ExploreCompass />  compact-header icon (shown once the sub-nav scrolled away)
 *   <ExploreHost nav photo />  once, inside the header's relative row.
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ChevronDown, Compass } from "@/components/ui/lucide";
import type { StockPhoto } from "@/components/listing/stock";
import type { SiteNavGroup } from "@/lib/site-nav";
import { useT } from "@/lib/ui-text/client";
import { useExplore } from "./explore-store";

const loadPanel = () => import("./ExplorePanel");
const ExplorePanel = dynamic(loadPanel, { ssr: false });
const PANEL_ID = "explore-panel";

export function ExploreHost({ nav, photo }: { nav: SiteNavGroup[]; photo: StockPhoto | null }) {
  const open = useExplore((s) => s.open);
  const hide = useExplore((s) => s.hide);
  const [mounted, setMounted] = useState(false);
  if (open && !mounted) setMounted(true); // mount the lazy body on first open (render-time derive, no effect)

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide(true);
    };
    const onDown = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      if (!el.closest(`#${PANEL_ID}, [data-explore-trigger]`)) hide();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, hide]);

  return (
    <>
      {open && <div aria-hidden="true" className="absolute inset-x-0 top-full h-dvh bg-ink/30 max-lg:hidden" data-motion="mega-scrim" />}
      <div
        id={PANEL_ID}
        data-motion="mega-panel"
        data-state={open ? "open" : "closed"}
        hidden={!open}
        className="absolute inset-x-0 top-full z-(--z-overlay) border-t border-line bg-surface shadow-overlay max-lg:hidden"
      >
        {mounted && <ExplorePanel nav={nav} photo={photo} />}
      </div>
    </>
  );
}

export function ExploreTrigger({ className = "" }: { className?: string }) {
  const { t } = useT();
  const open = useExplore((s) => s.open);
  const toggle = useExplore((s) => s.toggle);
  return (
    <button
      type="button"
      data-explore-trigger=""
      aria-expanded={open}
      aria-controls={PANEL_ID}
      onPointerEnter={() => void loadPanel()}
      onFocus={() => void loadPanel()}
      onClick={(e) => toggle(e.currentTarget)}
      className={`subnav-link inline-flex items-center gap-1.5 ${className}`}
    >
      {t("header.explore")}
      <ChevronDown size={16} className={`transition-transform duration-250 ${open ? "rotate-180" : ""}`} />
    </button>
  );
}

/** Compass button in the main row; visible only while the (non-sticky) sub-nav is out of view, so there is no duplicate. */
export function ExploreCompass() {
  const { t } = useT();
  const open = useExplore((s) => s.open);
  const toggle = useExplore((s) => s.toggle);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const sub = document.getElementById("header-subnav");
    if (!sub) return;
    const io = new IntersectionObserver(([e]) => setCompact(!!e && !e.isIntersecting), { rootMargin: "-80px 0px 0px 0px" });
    io.observe(sub);
    return () => io.disconnect();
  }, []);
  return (
    <button
      type="button"
      data-explore-trigger=""
      aria-expanded={open}
      aria-controls={PANEL_ID}
      aria-label={t("header.explore.aria")}
      hidden={!compact}
      onPointerEnter={() => void loadPanel()}
      onFocus={() => void loadPanel()}
      onClick={(e) => toggle(e.currentTarget)}
      className="min-h-12 min-w-12 items-center justify-center rounded-md text-ink transition-[color,background-color] duration-250 hover:bg-surface-muted max-lg:hidden [&:not([hidden])]:lg:inline-flex"
    >
      <Compass size={24} />
    </button>
  );
}
