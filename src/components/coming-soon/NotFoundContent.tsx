import Link from "next/link";
import { ComingSoonIllustration } from "./ComingSoonIllustration";
import { ForestPanel, creamCtaClass, creamCtaStyle, ghostOnForestClass } from "./ForestPanel";
import { ArrowRight, Search } from "@/components/ui/lucide";
import { getCategoryTree } from "@/lib/products";
import { t } from "@/lib/ui-text";

/**
 * 404 body (SAYFA-HARITASI §2.5): short message, search box, 4 root categories, "Ana sayfaya dön". Chrome-free: the
 * root src/app/not-found.tsx wraps it in StoreChrome, src/app/(magaza)/not-found.tsx renders it inside the store layout.
 */
export async function NotFoundContent() {
  const roots = (await getCategoryTree()).slice(0, 4);

  return (
    <ForestPanel labelledBy="nf-title">
      <div className="order-2 md:order-1" data-motion="reveal">
        <p className="text-sm font-medium text-cream-100">
          {t("error.notFound.eyebrow")}
        </p>
        <h1 id="nf-title" className="mt-3 text-balance text-4xl text-cream-200 md:text-5xl">
          {t("error.notFound.title")}
        </h1>
        <p className="mt-4 max-w-prose text-pretty text-lg text-cream-100">
          {t("error.notFound.body")}
        </p>

        <form
          action="/arama"
          role="search"
          className="mt-stack flex max-w-lg gap-2"
        >
          <label htmlFor="nf-q" className="sr-only">
            {t("header.search.label")}
          </label>
          <span className="relative flex-1">
            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              id="nf-q"
              name="q"
              type="search"
              placeholder={t("header.search.placeholder")}
              className="h-control-lg w-full rounded-pill border border-line-strong bg-surface pl-12 pr-4 text-base text-ink transition-colors duration-[250ms] focus:border-green-700"
            />
          </span>
          <button
            type="submit"
            className={`${creamCtaClass} px-6`}
            style={creamCtaStyle}
          >
            {t("header.search.submit")}
          </button>
        </form>

        {roots.length > 0 && (
          <nav aria-labelledby="nf-cats" className="mt-stack">
            <h2 id="nf-cats" className="text-xl text-cream-200">
              {t("error.notFound.categories")}
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {roots.map((r) => (
                <li key={r.root}>
                  <Link
                    href={r.href}
                    className="flex min-h-control items-center justify-between gap-3 rounded-md bg-white/10 px-4 text-base font-medium text-cream-50 ring-1 ring-inset ring-cream-100/25 transition-colors duration-[250ms] hover:bg-white/20 hover:ring-cream-100/60"
                  >
                    {r.title}
                    <ArrowRight size={18} className="shrink-0 text-cream-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="mt-stack flex flex-wrap gap-3">
          <Link
            href="/"
            className={creamCtaClass}
            style={creamCtaStyle}
          >
            {t("error.notFound.cta")}
          </Link>
          <Link
            href="/koleksiyon/turkiyede-satista"
            className={ghostOnForestClass}
          >
            {t("error.notFound.secondary")}
          </Link>
        </div>
      </div>
      <div
        className="order-1 mx-auto w-full max-w-xs text-cream-100 md:order-2 md:max-w-none"
        data-motion="reveal-scale"
      >
        <ComingSoonIllustration kind="signpost" className="h-auto w-full" />
      </div>
    </ForestPanel>
  );
}
