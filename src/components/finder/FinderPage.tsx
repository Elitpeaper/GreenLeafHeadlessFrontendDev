import { Suspense } from "react";
import { BadgeDrop } from "@/components/illustrations";
import { HeroPhoto, PageHero } from "@/components/sections/PageHero";
import { Check } from "@/components/ui/lucide";
import { getSkinType, parseFinderParams, type SkinTypeSlug } from "@/lib/catalog/skin";
import { cssVars } from "@/lib/css";
import type { FinderProduct } from "./candidates";
import { t } from "@/components/sections/copy";
import { getFinderCandidates } from "./candidates";
import { FinderApp } from "./FinderApp";

/**
 * Shared page body for /cilt-tipine-gore and /cilt-tipine-gore/{tip}. Static shell (title, intro, type text for
 * SEO) + the interactive finder inside <Suspense> (it reads the URL — cacheComponents).
 * The hero carries the blue "texture fan" band that used to sit on the home page (K-178): photo, botanical scene,
 * five skin-type tiles fanning out (M-13), "how it works" bullets (M-14).
 */
export async function FinderPage({ tip, searchParams }: { tip?: SkinTypeSlug; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const candidates = await getFinderCandidates();
  const type = tip ? getSkinType(tip) : null;
  const points = [t("finder.how.1"), t("finder.how.2"), t("finder.how.3")];
  return (
    <>
      <PageHero
        id="finder-title"
        eyebrow={t("listing.skinTypeChips.title")}
        title={type ? t(`finder.typePage.${type.slug}.title`) : t("finder.title")}
        body={t("finder.intro")}
        actions={
          <ul className="grid gap-2">
            {points.map((p, i) => (
              <li key={p} className="flex items-center gap-3 text-base text-cream-100" data-motion="M-14" style={cssVars({ "--i": i })}>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-cream-100 text-forest-800">
                  <Check size={16} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        }
        note={t("finder.disclaimer")}
        visual={
          <HeroPhoto slot="skinFinder.hero" glyph="drop">
            <BadgeDrop className="size-16 sm:size-20" />
          </HeroPhoto>
        }
      />      <Suspense fallback={<div className="mx-auto h-96 max-w-page px-gutter" aria-busy="true" />}>
        <FinderWithParams candidates={candidates} tip={tip} searchParams={searchParams} />
      </Suspense>
      {type && (
        <section aria-labelledby="type-about" className="mx-auto max-w-prose px-gutter pb-section">
          <h2 id="type-about" className="text-2xl text-ink">
            {t(`finder.typePage.${type.slug}.title`)}
          </h2>
          <p className="mt-3 text-base text-ink-muted">{t(`finder.typePage.${type.slug}.body`)}</p>
        </section>
      )}
    </>
  );
}

/** Request-time hole: reads the URL so a shared/refreshed link renders the same result on first paint (§6). */
async function FinderWithParams({
  candidates,
  tip,
  searchParams,
}: {
  candidates: FinderProduct[];
  tip?: SkinTypeSlug;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initial = parseFinderParams(await searchParams, tip ?? null);
  return <FinderApp candidates={candidates} pathTip={tip} initial={initial} />;
}
