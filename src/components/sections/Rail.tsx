"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "@/components/ui/lucide";

/**
 * Horizontal rail (scroll-snap) with 48 px round arrows on fine pointers (≥ md). The list itself is a focusable
 * region so keyboard users scroll it with arrow keys (tasarim-kurallari §13). Motion hook: M-10.
 */
export function Rail({
  label,
  prevLabel,
  nextLabel,
  children,
  itemClass = "w-[78%] sm:w-[46%] lg:w-[calc((100%-3*var(--spacing-grid-gap))/4)]",
  arrowsClass = "",
}: {
  label: string;
  prevLabel: string;
  nextLabel: string;
  children: ReactNode[];
  itemClass?: string;
  arrowsClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = document.documentElement.dataset.motion !== "on"; // K-264: site motion tier
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "grid size-12 place-items-center rounded-full bg-white text-ink shadow-card ring-1 ring-line transition-[opacity,translate] " +
    "duration-250 motion-safe:hover:-translate-y-0.5 aria-disabled:opacity-40 motion-safe:aria-disabled:hover:translate-y-0";

  return (
    <div className="relative">
      <div className={`mb-3 hidden justify-end gap-2 md:flex ${arrowsClass}`}>
        <button type="button" className={arrow} aria-label={prevLabel} aria-disabled={edge.start || undefined} onClick={() => go(-1)}>
          <ChevronLeft size={22} />
        </button>
        <button type="button" className={arrow} aria-label={nextLabel} aria-disabled={edge.end || undefined} onClick={() => go(1)}>
          <ChevronRight size={22} />
        </button>
      </div>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        data-motion="M-10"
        className="-mx-gutter snap-x snap-mandatory scroll-px-gutter overflow-x-auto px-gutter pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex gap-grid-gap">
        {children.map((child, i) => (
          <li key={i} className={`shrink-0 snap-start ${itemClass}`}>
            {child}
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}
