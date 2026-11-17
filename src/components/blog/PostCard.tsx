import Link from "next/link";
import { ArrowRight } from "@/components/ui/lucide";
import { t } from "@/lib/ui-text";
import { PostCover } from "./PostCover";
import { formatPostDate, postHref, type Post } from "./source";

/** Meta line: category · date · reading time. */
export function PostMeta({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted ${className}`}>
      <span className="font-medium text-green-700">{post.category}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{t("blog.readingTime", { count: post.readingMinutes })}</span>
    </p>
  );
}

/**
 * Grid card. Whole card is one link (title link + stretched ::after), so there is one tab stop per post.
 * Hover/focus lift = hareket primitive `lift`.
 */
export function PostCard({ post, headingLevel = 3, sizes }: { post: Post; headingLevel?: 2 | 3; sizes?: string }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <article data-motion="lift" className="group relative flex h-full flex-col overflow-hidden rounded-tile bg-surface ring-1 ring-line transition-shadow duration-[250ms] hover:shadow-tile">
      <PostCover
        post={post}
        className="aspect-[16/10]"
        sizes={sizes ?? "(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw"}
      />
      <div className="flex flex-1 flex-col p-card-pad pb-5">
        <PostMeta post={post} />
        <H className="mt-2 text-xl font-medium leading-snug text-ink">
          <Link
            href={postHref(post)}
            className="line-clamp-3 after:absolute after:inset-0 after:rounded-tile after:content-[''] transition-colors duration-[250ms] group-hover:text-green-800"
          >
            {post.title}
          </Link>
        </H>
        <p className="mt-2 line-clamp-3 text-base text-ink-muted">{post.excerpt}</p>
        <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-green-700">
          {t("blog.readMore")}
          <ArrowRight size={16} />
        </span>
      </div>
    </article>
  );
}

/** Large featured card (page 1, no filter). Image left / text right on desktop. */
export function FeaturedPost({ post }: { post: Post }) {
  return (
    <article
      data-motion="lift"
      className="group relative grid overflow-hidden rounded-tile bg-surface ring-1 ring-line transition-shadow duration-[250ms] hover:shadow-tile md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
    >
      <PostCover post={post} priority className="aspect-[16/10] md:aspect-auto md:min-h-[22rem]" sizes="(min-width: 768px) 56vw, 100vw" />
      <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
        <p className="inline-flex w-fit items-center rounded-pill bg-green-50 px-3 py-1 text-xs font-semibold text-green-800 ring-1 ring-inset ring-green-200">
          {t("blog.featured")}
        </p>
        <PostMeta post={post} />
        <h2 className="text-balance text-3xl text-ink">
          <Link href={postHref(post)} className="after:absolute after:inset-0 after:rounded-tile after:content-[''] transition-colors duration-[250ms] group-hover:text-green-800">
            {post.title}
          </Link>
        </h2>
        <p className="text-pretty text-lg text-ink-muted">{post.excerpt}</p>
        <span aria-hidden="true" className="inline-flex items-center gap-2 pt-2 font-medium text-green-700">
          {t("blog.readMore")}
          <ArrowRight size={18} />
        </span>
      </div>
    </article>
  );
}
