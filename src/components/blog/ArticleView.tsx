import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHead } from "@/components/sections/parts";
import { ArrowRight, ChevronLeft } from "@/components/ui/lucide";
import { getProducts } from "@/lib/products";
import { t } from "@/lib/ui-text";
import { PostCard, PostMeta } from "./PostCard";
import { PostCover } from "./PostCover";
import { ShareButtons } from "./ShareButtons";
import { basePath, getRelatedPosts, type Post } from "./source";

/**
 * Article detail (K-180): breadcrumb, header (category, title, lead, meta, share), cover, body typography,
 * source note, related TR products (4) and related posts (3). Body HTML comes from the content pipeline
 * (h2/h3/p/ul/ol/li/strong/em only), styled here with token classes — no typography plugin.
 */
const PROSE =
  "text-base text-ink " +
  "[&>*:first-child]:mt-0 [&_p]:mt-5 [&_p]:text-pretty " +
  "[&>p:first-child]:text-lg [&>p:first-child]:text-ink " +
  "[&_h2]:mt-stack [&_h2]:text-balance [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink " +
  "[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink " +
  "[&_ul]:mt-5 [&_ul]:space-y-2 [&_ul]:pl-1 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 " +
  "[&_ul>li]:relative [&_ul>li]:pl-7 [&_ul>li]:before:absolute [&_ul>li]:before:left-1 [&_ul>li]:before:top-[0.7em] " +
  "[&_ul>li]:before:size-2 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-brand-green [&_ul>li]:before:content-[''] " +
  "[&_ol>li]:pl-1 [&_ol>li]:marker:font-semibold [&_ol>li]:marker:text-green-700 " +
  "[&_strong]:font-semibold [&_em]:italic " +
  "[&_a]:font-medium [&_a]:text-green-700 [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:duration-[250ms] hover:[&_a]:text-green-800";

/** Deterministic pick so each article shows a stable but different set of in-stock products. */
async function relatedProducts(slug: string, n = 4) {
  const { items } = await getProducts({ availability: "tr", pageSize: 24 });
  if (items.length <= n) return items;
  const start = [...slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % items.length;
  return Array.from({ length: n }, (_, i) => items[(start + i * 5) % items.length]!).filter(
    (p, i, arr) => arr.findIndex((q) => q.id === p.id) === i,
  );
}

export async function ArticleView({ post }: { post: Post }) {
  const [products, related] = await Promise.all([relatedProducts(post.slug), getRelatedPosts(post, 3)]);
  const listHref = basePath(post.type);
  const listTitle = t(post.type === "haber" ? "news.title" : "blog.title");

  return (
    <article className="pb-section">
      <div className="mx-auto max-w-page px-gutter pt-6">
        <nav aria-label={t("blog.breadcrumb.aria")} className="text-sm">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-muted">
            <li>
              <Link href="/" className="inline-flex min-h-tap-min items-center transition-colors duration-[250ms] hover:text-green-800 hover:underline">
                {t("comingSoon.secondary")}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={listHref} className="inline-flex min-h-tap-min items-center transition-colors duration-[250ms] hover:text-green-800 hover:underline">
                {listTitle}
              </Link>
            </li>
            <li aria-hidden="true" className="hidden sm:block">
              /
            </li>
            <li aria-current="page" className="hidden max-w-[28ch] truncate text-ink sm:block">
              {post.title}
            </li>
          </ol>
        </nav>
      </div>

      <header className="mx-auto max-w-3xl px-gutter pt-section-tight text-center" data-motion="reveal">
        <Link
          href={`${listHref}?kategori=${post.categorySlug}`}
          className="inline-flex min-h-8 items-center rounded-pill bg-green-50 px-3.5 text-sm font-semibold text-green-800 ring-1 ring-inset ring-green-200 transition-colors duration-[250ms] hover:bg-green-100"
        >
          {post.category}
        </Link>
        <h1 className="mt-5 text-balance text-4xl text-ink">{post.title}</h1>
        {post.excerpt && <p className="mx-auto mt-5 max-w-prose text-pretty text-lg text-ink-muted">{post.excerpt}</p>}
        <PostMeta post={post} className="mt-5 justify-center" />
      </header>

      <div className="mx-auto mt-stack max-w-5xl px-gutter" data-motion="reveal-scale">
        <PostCover post={post} priority className="aspect-[16/9] rounded-tile" sizes="(min-width: 1024px) 1024px, 100vw" />
      </div>

      <div className="mx-auto mt-stack max-w-prose px-gutter">
        <div className={PROSE} dangerouslySetInnerHTML={{ __html: post.body_html }} />

        {post.sourceUrl && (
          <p className="mt-stack border-l-4 border-brand-lime bg-lime-50 px-4 py-3 text-sm text-ink-muted">
            {t("blog.source")}{" "}
            <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-green-700 underline underline-offset-4 transition-colors duration-[250ms] hover:text-green-800">
              {t("blog.source.link")}
              <span className="sr-only"> ({t("common.opensNewTab")})</span>
            </a>
          </p>
        )}

        <div className="mt-stack flex flex-col items-start gap-3 border-y border-line py-5">
          <ShareButtons title={post.title} />
          <Link href={listHref} className="inline-flex min-h-tap items-center gap-1.5 text-sm font-medium text-green-700 transition-colors duration-[250ms] hover:text-green-800 hover:underline">
            <ChevronLeft size={18} />
            {t(post.type === "haber" ? "news.backToList" : "blog.backToList")}
          </Link>
        </div>
      </div>

      {products.length > 0 && (
        <section aria-labelledby="article-products" className="mx-auto mt-section max-w-page px-gutter">
          <SectionHead
            id="article-products"
            title={t("blog.relatedProducts")}
            action={
              <Link href="/koleksiyon/turkiyede-satista" className="inline-flex min-h-tap items-center gap-2 font-medium text-green-700 transition-colors duration-[250ms] hover:underline">
                {t("blog.relatedProducts.cta")}
                <ArrowRight size={18} />
              </Link>
            }
          />
          <ul className="mt-stack grid grid-cols-2 gap-grid-gap lg:grid-cols-4">
            {products.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} headingLevel={3} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="article-related" className="mx-auto mt-section max-w-page px-gutter">
          <SectionHead id="article-related" title={t("blog.relatedPosts")} />
          <ul data-motion="stagger" className="mt-stack grid gap-grid-gap sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
