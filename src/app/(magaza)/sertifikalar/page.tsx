import type { Metadata } from "next";
import { ComingSoonBadge } from "@/components/coming-soon/ComingSoonBadge";
import { HeroPhoto, PageHero } from "@/components/sections/PageHero";
import { ShieldCheck } from "@/components/ui/lucide";
import { t } from "@/components/sections/copy";

export const metadata: Metadata = { title: t("certificates.title"), description: t("certificates.intro") };

/**
 * Manufacturer certificates (K-045, K-058). A badge is a link ONLY when its PDF exists; until the documents are
 * delivered each certificate shows as a card with the "Çok yakında" pill (K-181/K-182 — no dead links, no
 * internal notes). To publish: set `pdf` below (files under public/belgeler/).
 */
const CERTIFICATES: Array<{ type: "iso22716" | "gmp" | "halal"; pdf: string | null }> = [
  { type: "iso22716", pdf: null },
  { type: "gmp", pdf: null },
  { type: "halal", pdf: null },
];

export default function CertificatesPage() {
  return (
    <>
      <PageHero
        id="cert-title"
        eyebrow={t("brand.name")}
        title={t("certificates.title")}
        body={CERTIFICATES.some((c) => c.pdf) ? t("certificates.intro") : t("certificates.soonIntro")}
        visual={<HeroPhoto slot="page.sertifikalar.hero" glyph="certificate" />}
      />
    <div className="mx-auto max-w-page px-gutter py-section-tight">
      <ul className=" grid gap-grid-gap sm:grid-cols-3">
          {CERTIFICATES.map((c) => (
            <li key={c.type}>
              {c.pdf ? (
              <a
                href={c.pdf}
                target="_blank"
                rel="noopener noreferrer"
                data-motion="M-21"
                className="flex flex-col items-center gap-3 rounded-xl bg-surface p-8 text-center shadow-card ring-1 ring-line transition-shadow duration-250 hover:shadow-lift"
              >
                <span className="grid size-24 place-items-center rounded-full bg-green-50 ring-1 ring-line">
                  <ShieldCheck size={44} className="text-green-700" />
                </span>
                <span className="text-xl font-medium text-ink">{t(`certificates.badge.${c.type}`)}</span>
                <span className="text-sm text-green-700">
                  PDF ↗<span className="sr-only"> ({t("common.opensNewTab")})</span>
                </span>
              </a>
              ) : (
                <div className="flex h-full flex-col items-center gap-3 rounded-xl bg-surface p-8 text-center shadow-card ring-1 ring-line">
                  <span className="grid size-24 place-items-center rounded-full bg-green-50 ring-1 ring-line">
                    <ShieldCheck size={44} className="text-green-700" />
                  </span>
                  <span className="text-xl font-medium text-ink">{t(`certificates.badge.${c.type}`)}</span>
                  <ComingSoonBadge />
                </div>
              )}
            </li>
          ))}
        </ul>
      <p className="mt-6 max-w-prose text-sm text-ink-muted">{t("certificates.note")}</p>
    </div>
    </>
  );
}
