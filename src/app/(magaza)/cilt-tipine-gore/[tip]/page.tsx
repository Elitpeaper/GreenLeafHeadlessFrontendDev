import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinderPage } from "@/components/finder/FinderPage";
import { getSkinType, SKIN_TYPES } from "@/lib/catalog/skin";
import { t } from "@/components/sections/copy";

export function generateStaticParams() {
  return SKIN_TYPES.map((s) => ({ tip: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cilt-tipine-gore/[tip]">): Promise<Metadata> {
  const s = getSkinType((await params).tip);
  return s ? { title: t(`finder.typePage.${s.slug}.title`) } : {};
}

/** Pre-selected finder page (K-087, 5 indexed pages) with the 80–150 word type text. */
export default async function SkinTypePage({ params, searchParams }: PageProps<"/cilt-tipine-gore/[tip]">) {
  const s = getSkinType((await params).tip);
  if (!s) notFound();
  return <FinderPage tip={s.slug} searchParams={searchParams} />;
}
