import Link from "next/link";
import { PanelLeafSegments } from "@/components/illustrations";
import { t } from "@/components/sections/copy";
import { REASONS } from "../WhyGreenleaf";
import { InlineStripe } from "../parts";

/**
 * Brand message + "Neden Greenleaf" (brief §6, wireframe §8). Comfortaa quote (≤ one accent cluster per section),
 * faint giant leaf silhouette behind (6 %). Reasons reuse the approved /yakinda copy (no medical/income claims).
 * Motion: M-15 words (once), M-16 icon draw.
 */
export function Manifesto({ showStoryLink = true, panel = false }: { showStoryLink?: boolean; panel?: boolean }) {
  return (
    <section aria-labelledby="manifesto-title" className="relative mx-auto max-w-page overflow-hidden px-gutter py-section">
      <svg viewBox="0 0 100 100" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-4 h-[28rem] -translate-x-1/2 text-brand-green opacity-[0.06]">
        <path d="M50 98 C 10 72 6 30 50 2 C 94 30 90 72 50 98 Z" fill="currentColor" />
      </svg>
      <div className="relative mx-auto max-w-3xl text-center">
        <InlineStripe center />
        <h2 id="manifesto-title" className="sr-only">
          {t("home.manifesto.heading")}
        </h2>
        <p className="mt-6 font-[family-name:var(--font-role-accent)] text-3xl font-bold leading-snug text-ink" data-motion="M-15">
          {t("home.manifesto.quote")}
        </p>
        <p className="mx-auto mt-5 max-w-prose text-lg text-ink-muted">{t("home.story.body")}</p>
      </div>
      {panel ? (
        <div className="relative mt-stack overflow-hidden rounded-panel shadow-long">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <PanelLeafSegments segments={3} className="size-full" />
          </div>
          <ul className="relative grid sm:grid-cols-3">
            {REASONS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex flex-col items-center px-6 py-8 text-center md:px-8 md:py-12" data-motion="M-14">
                <Icon className="size-10 text-cream-100" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold text-cream-100">{title}</h3>
                <p className="mt-2 max-w-xs text-base text-cream-100">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
      <ul className="relative mt-stack grid grid-cols-1 gap-grid-gap sm:grid-cols-3">
        {REASONS.map(({ icon: Icon, title, body, band, tint }) => (
          <li key={title} className="relative overflow-hidden rounded-lg bg-surface p-6 shadow-card ring-1 ring-line" data-motion="M-14">
            <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${band}`} />
            <span className={`grid size-16 place-items-center rounded-full ${tint}`}>
              <Icon className="size-8 text-green-700" data-motion="M-16" />
            </span>
            <h3 className="mt-5 text-xl text-ink">{title}</h3>
            <p className="mt-2 text-base text-ink-muted">{body}</p>
          </li>
        ))}
      </ul>
      )}
      {showStoryLink && (
      <div className="mt-8 text-center">
        <Link href="/hakkimizda" className="inline-flex min-h-tap items-center gap-2 font-medium text-green-700 underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
          {t("home.story.cta")} <span aria-hidden="true">→</span>
        </Link>
      </div>
      )}
    </section>
  );
}
