import type { Metadata } from "next";
import { ArticlePage, articleMetadata, staticParams } from "@/components/blog/routes";

/** /blog/{slug} — article detail (K-180). */
export function generateStaticParams() {
  return staticParams("blog");
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  return articleMetadata("blog", (await params).slug);
}

export default async function BlogArticlePage({ params }: PageProps<"/blog/[slug]">) {
  return <ArticlePage type="blog" slug={(await params).slug} />;
}
