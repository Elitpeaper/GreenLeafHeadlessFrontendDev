"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabDef {
  key: string;
  label: string;
  /** 24 px icon inside the pill (server-rendered, decorative). */
  icon?: ReactNode;
  /** Giant decorative icon beside the heading; swaps (key + fade-in) when the tab changes (V-1). */
  bigIcon?: ReactNode;
  panel: ReactNode;
}

/**
 * WAI-ARIA tabs (automatic activation, arrow/Home/End). Big pills: 56 px, selected = --accent fill + --on-accent (brief §7).
 * Panels are server-rendered and all present in the DOM (hidden attribute), so SEO/no-JS still see products.
 * `head` is the section heading; the active tab's giant icon sits at its right (V-1: re-keyed + data-motion="fade-in").
 * K-231: colour changes are transitioned (list below), no layout property animates.
 */
export function Tabs({ tabs, label, head }: { tabs: TabDef[]; label: string; head?: ReactNode }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (active + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div data-motion="M-17">
      <div className="relative">
        {head}
        <div key={tabs[active]?.key} aria-hidden="true" data-motion="fade-in" className="pointer-events-none absolute -top-4 right-0 hidden lg:block">
          {tabs[active]?.bigIcon}
        </div>
      </div>
      <div role="tablist" aria-label={label} onKeyDown={onKey} className="-mx-gutter mt-8 flex gap-2 overflow-x-auto px-gutter pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.key}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${base}-t-${i}`}
              aria-controls={`${base}-p-${i}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`inline-flex min-h-14 shrink-0 items-center gap-2.5 rounded-pill px-5 text-lg font-semibold transition-[color,background-color,box-shadow] duration-250 ${
                selected ? "bg-accent text-on-accent shadow-button" : "bg-surface text-ink ring-1 ring-line-strong hover:bg-accent-soft"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.key} role="tabpanel" id={`${base}-p-${i}`} aria-labelledby={`${base}-t-${i}`} hidden={i !== active} className="mt-6">
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
