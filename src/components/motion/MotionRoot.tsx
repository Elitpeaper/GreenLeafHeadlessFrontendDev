import { motionBootScript } from "@/lib/motion/boot";
import { t } from "@/lib/ui-text";
import { BrandLoader } from "./BrandLoader";
import { MotionRuntime } from "./MotionRuntime";

/**
 * Mount ONCE, as the first child of <body> in the root layout (frontend-mimar):
 *   <body><MotionRoot />…</body>
 * - inline boot script: html[data-motion] before first paint (K-264: full by default / visitor's "Hareketi azalt" / off)
 * - runtime island: reveals, counters, tabs, smart header, hover recolor, interactive SVG, Lenis, GSAP scenes (fx.ts)
 * - navigation loader (K-170): branded overlay shown only while a client navigation takes longer than 150 ms
 * - scroll-top ring (Penta): appears after half a viewport, its ring fills with the page progress (GSAP scrub in fx.ts);
 *   a plain link to #icerik, so it works without JS; the runtime glides it with Lenis and moves focus.
 */
export function MotionRoot() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      <MotionRuntime />
      <div data-nav-loader="" aria-hidden="true">
        <span data-nav-loader-part="bar">
          <span className="bg-brand-green" />
          <span className="bg-brand-lime" />
          <span className="bg-brand-blue" />
        </span>
        <span data-nav-loader-part="pill">
          <BrandLoader size="sm" />
        </span>
      </div>
      <a
        href="#icerik"
        data-motion="backtop"
        data-target="icerik"
        data-scroll-ring=""
        aria-label={t("motion.backTop")}
        className="fixed bottom-5 right-5 z-(--z-header) grid size-14 place-items-center rounded-full bg-surface text-green-800 shadow-lift ring-1 ring-line"
      >
        <svg viewBox="0 0 56 56" aria-hidden="true" className="absolute inset-0 size-full -rotate-90">
          <circle cx="28" cy="28" r="25" fill="none" stroke="var(--color-line, #E3E7E1)" strokeWidth="3" />
          <circle data-scroll-ring-bar="" cx="28" cy="28" r="25" fill="none" stroke="var(--color-green-700, #2F7A22)" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="relative size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>
    </>
  );
}
