import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BadgeBook, LeafOvalSpecimen, SceneBlog, TextureGrain } from "@/components/illustrations";
import { Eyebrow } from "@/components/sections/parts";
import { ArrowRight } from "@/components/ui/lucide";
import { getStockImage } from "@/lib/images";

/**
 * /blog and /haberler short forest hero (TASARIM-INCELEME-1 C-3, K-186 vitrin surface, REFERANS-CIKARIM §7.7).
 * `gradient.forest-hero` + grain, H1 cream-200, lead cream-100, right: SceneBlog (cream line work) + paper leaf + badge.
 * Mobile: illustration on top, text below. The only signature stripe on the page is the eyebrow's inline stripe.
 */
const FOREST_HERO = "var(--gradient-forest-hero, linear-gradient(135deg, #226E45 0%, #1A5A3A 48%, #14482F 100%))";

export function BlogHero({
  eyebrow,
  title,
  lead,
  cross,
  slot,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  cross?: { href: string; label: ReactNode };
  /** stock-images.json slot for the visual column (page.blog.hero / page.haberler.hero, K-270) */
  slot?: string;
}) {
  const photo = slot ? getStockImage(slot) : null;
  return (
    <header data-page-hero="" className="relative overflow-hidden text-cream-100" style={{ backgroundImage: FOREST_HERO }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <TextureGrain strength={0.12} />
      </div>
      <div className="relative mx-auto grid max-w-page items-center gap-6 px-gutter py-10 md:min-h-[22rem] md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-section-tight md:py-14 lg:min-h-[26rem]">
        <div className="order-2 md:order-1" data-motion="reveal">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-balance text-4xl text-cream-200 md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-pretty text-lg text-cream-100">{lead}</p>
          {cross && (
            <Link
              href={cross.href}
              className="group mt-6 inline-flex min-h-tap items-center gap-2 rounded-pill px-1 font-medium text-cream-100 underline-offset-4 transition-colors duration-[250ms] hover:text-cream-50 hover:underline"
            >
              {cross.label}
              <ArrowRight size={18} className="transition-transform duration-[250ms] group-hover:translate-x-1" />
            </Link>
          )}
        </div>
        {photo ? (
          <div className="relative order-1 h-44 w-full overflow-hidden rounded-panel rounded-bl-2xl bg-forest-800 shadow-long sm:h-52 md:order-2 md:h-72 lg:h-80">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 1024px) 520px, (min-width: 768px) 45vw, 100vw"
              className="object-cover"
              placeholder={photo.blurDataURL ? "blur" : "empty"}
              blurDataURL={photo.blurDataURL}
            />
          </div>
        ) : (
          <div className="relative order-1 mx-auto h-44 w-full max-w-xs sm:h-52 md:order-2 md:h-72 md:max-w-md lg:h-80" aria-hidden="true" data-motion="reveal-scale" data-svg-host>
            <SceneBlog className="absolute inset-0 size-full text-cream-100" />
            <LeafOvalSpecimen tone="forest" className="absolute -right-2 bottom-0 h-3/4 w-auto" />
            <BadgeBook className="absolute left-0 top-0 size-16 md:size-20" />
          </div>
        )}
      </div>
    </header>
  );
}
