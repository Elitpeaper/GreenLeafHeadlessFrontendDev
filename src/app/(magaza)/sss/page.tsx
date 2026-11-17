import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/faq/Faq";
import type { FaqCategory, FaqData } from "@/components/faq/types";
import { ComingSoonBadge } from "@/components/coming-soon/ComingSoonBadge";
import { HeroPhoto, PageHero, creamCta } from "@/components/sections/PageHero";
import { t } from "@/components/sections/copy";

export const metadata: Metadata = { title: t("sss.title"), description: t("sss.intro"), alternates: { canonical: "/sss" } };

/** data/content/sss.tr.json (icerik-editoru). Missing / malformed / empty file -> empty list, never a build error. */
function loadFaq(): FaqCategory[] {
  try {
    const raw = readFileSync(path.join(process.cwd(), "data", "content", "sss.tr.json"), "utf8");
    const data = JSON.parse(raw) as FaqData;
    return (data.categories ?? [])
      .map((c) => ({ ...c, items: (c.items ?? []).filter((i) => i?.q && i?.a) }))
      .filter((c) => c.title && c.items.length > 0);
  } catch {
    return [];
  }
}

const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\n{2,}/g, " ");

/** /sss (K-269): FAQ with category anchors, client-side search, accordions and FAQPage JSON-LD. */
export default function FaqPage() {
  const categories = loadFaq();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((c) =>
      c.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: plain(i.a) } })),
    ),
  };

  return (
    <>
      <PageHero
        id="sss-title"
        eyebrow={t("sss.eyebrow")}
        title={t("sss.title")}
        body={t("sss.intro")}
        visual={<HeroPhoto slot="page.sss.hero" />}
      />

      <div className="mx-auto max-w-page px-gutter py-section-tight">
        {categories.length > 0 ? (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
            <Faq
              categories={categories}
              labels={{
                searchLabel: t("sss.search.label"),
                placeholder: t("sss.search.placeholder"),
                empty: t("sss.search.empty"),
                clear: t("sss.search.clear"),
                count: t("sss.search.count", { count: "{count}" }),
                tabsAria: t("sss.tabs.aria"),
              }}
            />
          </>
        ) : (
          <p className="flex items-center gap-3 text-lg text-ink">
            {t("sss.soon")} <ComingSoonBadge />
          </p>
        )}

        <section aria-labelledby="sss-more" className="mt-16 rounded-panel bg-forest-800 p-8 text-cream-100 sm:p-10">
          <h2 id="sss-more" className="text-3xl text-cream-200">
            {t("sss.notFound.title")}
          </h2>
          <p className="mt-3 max-w-prose text-lg">{t("sss.notFound.body")}</p>
          <Link href="/hakkimizda#iletisim" className={`${creamCta} mt-6`}>
            {t("sss.notFound.cta")}
          </Link>
        </section>
      </div>
    </>
  );
}
