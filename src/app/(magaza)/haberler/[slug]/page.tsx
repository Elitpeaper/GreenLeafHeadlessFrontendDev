import type { Metadata } from "next";
import { ArticlePage, articleMetadata, staticParams } from "@/components/blog/routes";

/** /haberler/{slug} — news detail (K-180). */
export function generateStaticParams() {
  return staticParams("haber");
}

export async function generateMetadata({ params }: PageProps<"/haberler/[slug]">): Promise<Metadata> {
  return articleMetadata("haber", (await params).slug);
}

export default async function NewsArticlePage({ params }: PageProps<"/haberler/[slug]">) {
  return <ArticlePage type="haber" slug={(await params).slug} />;
}
