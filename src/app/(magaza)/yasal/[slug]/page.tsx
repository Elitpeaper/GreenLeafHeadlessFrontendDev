import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonPage, type IllustrationKind } from "@/components/coming-soon";
import { t } from "@/lib/ui-text";

/**
 * SAYFA-HARITASI #15–18 + #22. Until the reviewed texts arrive (icerik-editoru, K-019) every legal page is a
 * K-181 "Çok yakında" page — no draft/expert notes in the UI. When a text lands, render it here per §2.4
 * (title, last updated, table of contents, prose) and keep ComingSoonPage for slugs without text.
 */
const LEGAL_SLUGS = [
  "kvkk-aydinlatma-metni",
  "cerez-politikasi",
  "kullanim-kosullari",
  "e-posta-acik-riza",
  "mesafeli-satis-sozlesmesi",
  "on-bilgilendirme-formu",
  "iade-ve-cayma",
] as const;

type LegalSlug = (typeof LEGAL_SLUGS)[number];

/** Custom drawing per page (ui-tasarimci library via ComingSoonIllustration). */
const ILLUSTRATION: Record<LegalSlug, IllustrationKind> = {
  "kvkk-aydinlatma-metni": "shield",
  "cerez-politikasi": "cookie",
  "kullanim-kosullari": "document",
  "e-posta-acik-riza": "mail",
  "mesafeli-satis-sozlesmesi": "document",
  "on-bilgilendirme-formu": "document",
  "iade-ve-cayma": "document",
};
const isLegal = (s: string): s is LegalSlug => (LEGAL_SLUGS as readonly string[]).includes(s);

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/yasal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  // No text yet → nothing to index (seo-uzmani may flip this per page once texts exist).
  return isLegal(slug) ? { title: t(`legal.title.${slug}`), robots: { index: false, follow: true } } : {};
}

export default async function LegalPage({ params }: PageProps<"/yasal/[slug]">) {
  const { slug } = await params;
  if (!isLegal(slug)) notFound();
  return (
    <ComingSoonPage eyebrow={t("legal.eyebrow")} title={t(`legal.title.${slug}`)} body={t("comingSoon.legal.body")} illustration={ILLUSTRATION[slug]} />
  );
}
