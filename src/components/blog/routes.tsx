import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { t } from "@/lib/ui-text";
import { ArticleView } from "./ArticleView";
import { BlogIndex } from "./BlogIndex";
import { basePath, getPost, getPostSlugs, type PostType } from "./source";

/**
 * Route helpers shared by /haberler and /blog (pages stay 3-line files). Metadata is plain Next Metadata;
 * JSON-LD (Article/BreadcrumbList) and canonical strategy → seo-uzmani (src/lib/seo/, devir note).
 */
type RawParams = Record<string, string | string[] | undefined>;

/** Sentinel so Cache Components always gets ≥ 1 static param even if a type has no posts; it 404s. */
const NONE = "__yok";

export function indexMetadata(type: PostType): Metadata {
  return {
    title: t(type === "haber" ? "news.title" : "blog.title"),
    description: t(type === "haber" ? "blog.metaDescription.news" : "blog.metaDescription.blog"),
    alternates: { canonical: basePath(type) },
  };
}

export function IndexPage({ type, searchParams }: { type: PostType; searchParams: Promise<RawParams> }) {
  return <BlogIndex type={type} searchParams={searchParams} />;
}

export async function staticParams(type: PostType) {
  const slugs = await getPostSlugs(type);
  return (slugs.length ? slugs : [NONE]).map((slug) => ({ slug }));
}

export async function articleMetadata(type: PostType, slug: string): Promise<Metadata> {
  const post = await getPost(type, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${basePath(type)}/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      ...(post.cover ? { images: [{ url: post.cover.src, width: post.cover.width, height: post.cover.height, alt: post.cover.alt }] } : {}),
    },
  };
}

export async function ArticlePage({ type, slug }: { type: PostType; slug: string }) {
  const post = await getPost(type, slug);
  if (!post) notFound();
  return <ArticleView post={post} />;
}
