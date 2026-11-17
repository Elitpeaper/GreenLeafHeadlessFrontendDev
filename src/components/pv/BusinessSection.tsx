import { Info } from "@/components/ui/lucide";
import { t, tRawPlan } from "./plan";

/**
 * "Greenleaf iş fırsatı" (#is-firsati) — K-085, K-099. The ONLY place on the site with earnings content.
 * Opens AND closes with the "garanti değildir" disclaimer; every figure comes from the official marketing plan
 * with attribution. Rendered only when the plan is enabled (config businessPlan / ui pv.business.plan.enabled);
 * today: disabled (S-046, numbers pending) -> the page never shows this section.
 */
export function BusinessSection() {
  const plan = tRawPlan();
  if (!plan) return null;
  const groups: Array<{ key: string; title: string; summary: string; items: Array<{ title: string; text?: string }> }> = [
    { key: "rewards", title: t("pv.business.group.rewards"), summary: t("pv.business.rewards.summary"), items: plan.rewards },
    { key: "margin", title: t("pv.business.group.margin"), summary: plan.marginNote ?? t("pv.business.margin.summary"), items: [] },
    { key: "profit", title: t("pv.business.group.profitShare"), summary: plan.profitShareNote ?? t("pv.business.profitShare.summary"), items: [] },
    { key: "levels", title: t("pv.business.group.levels"), summary: t("pv.business.levels.summary"), items: plan.levels },
  ];
  const disclaimer = (
    <p role="note" className="flex gap-3 rounded-lg bg-blue-50 p-4 text-base text-ink ring-1 ring-blue-100">
      <Info size={22} className="shrink-0 text-blue-700" />
      <span>
        <strong className="font-semibold">{t("pv.business.disclaimer")}</strong> {t("pv.business.sourceLine")}
      </span>
    </p>
  );
  return (
    <section id="is-firsati" aria-labelledby="is-firsati-title" className="mx-auto max-w-page px-gutter pt-section">
      <h2 id="is-firsati-title" className="text-3xl text-ink">
        {t("pv.business.title")}
      </h2>
      <p className="mt-3 max-w-prose text-lg text-ink-muted">{t("pv.business.intro")}</p>
      <div className="mt-6">{disclaimer}</div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {groups.map((g) => (
          <details key={g.key} open className="group rounded-lg bg-surface p-5 ring-1 ring-line" data-motion="accordion">
            <summary className="flex min-h-tap cursor-pointer list-none items-center justify-between text-xl font-medium [&::-webkit-details-marker]:hidden">
              {g.title}
            </summary>
            <p className="mt-2 text-base text-ink-muted">{g.summary}</p>
            {g.items.length > 0 && (
              <ol className="mt-4 grid gap-2" data-motion="stagger">
                {g.items.map((it) => (
                  <li key={it.title} className="rounded-md bg-surface-muted p-3 text-sm">
                    <span className="font-semibold text-ink">{it.title}</span>
                    {it.text && <span className="block text-ink-muted">{it.text}</span>}
                  </li>
                ))}
              </ol>
            )}
          </details>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink-muted">{t("pv.business.pending")}</p>
      <div className="mt-6">{disclaimer}</div>
      <p className="mt-3 text-sm text-ink-muted">{t("pv.business.localNote")}</p>
    </section>
  );
}
