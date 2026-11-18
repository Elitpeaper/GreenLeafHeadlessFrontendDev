import Link from "next/link";
import { BlogHero } from "./BlogHero";
import { Suspense } from "react";
import { ComingSoonPage } from "@/components/coming-soon";
import { SceneBlog } from "@/components/illustrations/scenes";
import { ScrollSvg } from "@/components/motion";
import { t, tc } from "@/lib/ui-text";
import { Pagination } from "./Pagination";
import { FeaturedPost, PostCard } from "./PostCard";
import { basePath, countPosts, getPostCategories, getPosts, type PostType } from "./source";

type RawParams = Record<string, string | string[] | undefined>;

const COPY = {
  haber: { eyebrow: "news.eyebrow", title: "news.title", lead: "news.lead", empty: "news.empty.title", cross: "blog.toBlog" },
  blog: { eyebrow: "blog.eyebrow", title: "blog.title", lead: "blog.lead", empty: "blog.empty.title", cross: "blog.toNews" },
} as const;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/**
 * /haberler and /blog index (K-180). Static shell (heading + category chips) + request-time list in <Suspense>
 * (reads ?kategori= and ?sayfa=). No posts at all → K-181 ComingSoonPage.
 */
export async function BlogIndex({ type, searchParams }: { type: PostType; searchParams: Promise<RawParams> }) {
  const copy = COPY[type];
  const total = await countPosts(type);
  const otherType: PostType = type === "haber" ? "blog" : "haber";
  const otherCount = await countPosts(otherType);

  if (total === 0) {
    return (
      <ComingSoonPage
        title={t(copy.empty)}
        body={t("blog.empty.body")}
        illustration="news"
        secondary={otherCount > 0 ? { href: basePath(otherType), label: t(copy.cross) } : undefined}
      />
    );
  }

  return (
    <>
      <BlogHero
        slot={type === "haber" ? "page.haberler.hero" : "page.blog.hero"}
        eyebrow={t(copy.eyebrow)}
        title={t(copy.title)}
        lead={t(copy.lead)}
        cross={
          otherCount > 0
            ? { href: basePath(otherType), label: t(copy.cross) }
            : undefined
        }
      />
      <div className="mx-auto max-w-page px-gutter pb-section pt-stack">
      <Suspense fallback={<ListSkeleton />}>
        <PostList type={type} searchParams={searchParams} />
      </Suspense>
      </div>
    </>
  );
}

async function PostList({ type, searchParams }: { type: PostType; searchParams: Promise<RawParams> }) {
  const sp = await searchParams;
  const categories = await getPostCategories(type);
  const requested = first(sp.kategori) ?? null;
  const category = categories.some((c) => c.slug === requested) ? requested : null;
  const pageNum = Number.parseInt(first(sp.sayfa) ?? "1", 10) || 1;
  const { items, page, pageCount, total } = await getPosts(type, { category, page: pageNum });
  const base = basePath(type);

  const hrefFor = (p: number, cat: string | null = category) => {
    const q = new URLSearchParams();
    if (cat) q.set("kategori", cat);
    if (p > 1) q.set("sayfa", String(p));
    const s = q.toString();
    return s ? `${base}?${s}` : base;
  };

  const showFeatured = page === 1 && !category && items.length > 1;
  const [featured, ...rest] = items;
  const grid = showFeatured ? rest : items;
  const chip = "inline-flex min-h-tap-min items-center gap-2 rounded-pill px-4 text-sm font-medium transition-colors duration-[250ms]";

  return (
    <>
      {categories.length > 1 && (
        <nav aria-label={t("blog.categoriesAria")} className="-mx-gutter mt-6 overflow-x-auto px-gutter">
          <ul className="flex w-max gap-2 pb-1">
            {[{ slug: null, title: t("blog.allCategories"), count: null as number | null }, ...categories].map((c) => {
              const active = c.slug === category;
              return (
                <li key={c.slug ?? "all"}>
                  <Link
                    href={hrefFor(1, c.slug)}
                    aria-current={active ? "page" : undefined}
                    className={`${chip} ${active ? "bg-green-700 text-white" : "bg-surface text-ink ring-1 ring-inset ring-line hover:bg-green-50"}`}
                  >
                    {c.title}
                    {c.count !== null && <span className={active ? "text-white/80" : "text-ink-muted"}>{c.count}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <p className="mt-4 text-sm text-ink-muted" aria-live="polite">
        {tc("blog.count", total)}
      </p>

      {items.length === 0 ? (
        <p className="mt-stack text-lg text-ink-muted">{t("blog.emptyCategory")}</p>
      ) : (
        <>
          {showFeatured && featured && (
            <div className="mt-6" data-motion="reveal">
              <FeaturedPost post={featured} />
            </div>
          )}
          {grid.length > 0 && (
            <ul data-motion="stagger" className="mt-grid-gap grid gap-grid-gap sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} headingLevel={2} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <Pagination page={page} pageCount={pageCount} hrefFor={(p) => hrefFor(p)} />

      <ScrollSvg mode="view" className="pointer-events-none mx-auto mt-stack hidden w-64 lg:block">
        <SceneBlog className="h-auto w-full" />
      </ScrollSvg>
    </>
  );
}

function ListSkeleton() {
  return (
    <div aria-hidden="true" className="mt-6 grid gap-grid-gap sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} data-motion="skeleton" className="overflow-hidden rounded-tile bg-surface ring-1 ring-line">
          <div className="aspect-[16/10] bg-surface-muted" />
          <div className="space-y-3 p-card-pad">
            <div className="h-4 w-1/2 rounded-pill bg-surface-muted" />
            <div className="h-6 w-5/6 rounded-pill bg-surface-muted" />
            <div className="h-4 w-full rounded-pill bg-surface-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
