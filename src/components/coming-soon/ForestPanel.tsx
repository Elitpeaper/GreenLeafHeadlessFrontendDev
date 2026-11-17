import type { ReactNode } from "react";
import { TextureGrain } from "@/components/illustrations";

/**
 * Forest panel shared by "Çok yakında" pages and 404 (TASARIM-INCELEME-1 C-5, K-186/K-188, REFERANS-CIKARIM §7.7):
 * cream-50 page ground + centred `rounded-panel shadow-long` panel on `gradient.forest-deep` with grain.
 * Values are tokens.json › gradient literals (emitted as CSS vars later; the var() is picked up when it exists).
 * `layout="inline"` = compact block inside another page (no full-page ground / min height).
 */
const FOREST_DEEP = "var(--gradient-forest-deep, linear-gradient(160deg, #14482F 0%, #0F3B22 60%, #0A2A18 100%))";
const CTA_CREAM = "var(--gradient-cta-cream, linear-gradient(180deg, #EFDFC3 0%, #E2C49E 100%))";

/** Cream pill CTA on forest (forest-900 text 7.56:1). Enter/leave = 250 ms (K-231). */
export const creamCtaClass =
  "group inline-flex min-h-control-lg items-center justify-center gap-2 rounded-pill px-7 text-base font-semibold text-forest-900 shadow-[var(--shadow-cta-cream)] transition-[transform,filter] duration-[250ms] hover:-translate-y-0.5 hover:brightness-105 motion-reduce:hover:translate-y-0";
export const creamCtaStyle = { backgroundImage: CTA_CREAM } as const;

/** Quiet outlined pill on forest. */
export const ghostOnForestClass =
  "inline-flex min-h-control-lg items-center justify-center rounded-pill px-6 text-base font-medium text-cream-100 ring-1 ring-inset ring-cream-100/40 transition-colors duration-[250ms] hover:bg-white/10 hover:text-cream-50";

export function ForestPanel({
  children,
  labelledBy,
  layout = "page",
}: {
  children: ReactNode;
  labelledBy: string;
  layout?: "page" | "inline";
}) {
  const page = layout === "page";
  return (
    <section aria-labelledby={labelledBy} className={page ? "bg-cream-50 px-gutter py-section-tight md:py-section" : "py-stack"}>
      <div
        className="relative mx-auto max-w-page overflow-hidden rounded-panel text-cream-100 shadow-long"
        style={{ backgroundImage: FOREST_DEEP }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <TextureGrain strength={0.12} />
        </div>
        <div className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-stack p-6 sm:p-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-section-tight md:p-14 lg:min-h-[28rem]">
          {children}
        </div>
      </div>
    </section>
  );
}
