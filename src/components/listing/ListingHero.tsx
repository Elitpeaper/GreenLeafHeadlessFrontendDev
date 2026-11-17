/**
 * ListingHero — the forest header band of category, /urunler and search pages (K-230, K-186, K-187, A-1, A-4).
 * 160–220 px (md), forest gradient built from forest-600/700/800 tokens + felt grain, H1 in cream-200, lead in cream-100.
 * Full-width atmosphere photo (K-161, K-270) under a forest-950 scrim (>= 70% behind the text); without a photo a cropped
 * botanical scene fills the right side. Signature stripe = three stacked bands (§9.1), drawn at the bottom edge.
 * The grid below stays on a light ground (commerce mode, K-186).
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { SceneHeroBotanical } from "@/components/illustrations/scenes";
import { TextureGrain } from "@/components/illustrations/textures";
import type { StockPhoto } from "./stock";

/** Three horizontal stacked bands (green → lime → blue), thin variant for header bands. */
export function ThinStripe({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`grid grid-rows-[3px_2px_2px] ${className}`}>
      <span className="bg-stripe-1" />
      <span className="bg-stripe-2" />
      <span className="bg-stripe-3" />
    </div>
  );
}

export interface ListingHeroProps {
  title: string;
  /** Muted line under the H1 (counts). */
  lead?: ReactNode;
  /** Optional extra block under the lead (description, notes). */
  children?: ReactNode;
  /** K-161 category photo; without it a botanical scene fills the right side. */
  photo?: StockPhoto | null;
  /** Round icon disk before the H1 (category icon). */
  icon?: ReactNode;
  className?: string;
}

export function ListingHero({ title, lead, children, photo, icon, className = "" }: ListingHeroProps) {
  return (
    <header
      data-listing-hero=""
      className={`relative isolate overflow-hidden rounded-tile bg-[linear-gradient(135deg,var(--color-forest-600),var(--color-forest-700)_48%,var(--color-forest-800))] shadow-long ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <TextureGrain strength={0.12} />
      </div>

      {photo ? (
        <>
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(min-width: 1440px) 1440px, 100vw"
              className="object-cover"
              placeholder={photo.blurDataURL ? "blur" : "empty"}
              blurDataURL={photo.blurDataURL}
              priority
            />
          </div>
          {/* K-270 scrim: forest-950 >= 70% under the text zone (5.85:1 worst case), lighter over the photo-only right side */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-forest-950/80 md:bg-transparent md:bg-linear-to-r md:from-forest-950/90 md:via-forest-950/78 md:via-60% md:to-forest-950/40" />
        </>
      ) : (
        <div aria-hidden="true" className="absolute -bottom-6 -right-8 hidden w-[26rem] text-cream-100/90 md:block lg:right-6">
          <SceneHeroBotanical className="h-auto w-full" />
        </div>
      )}

      <div className="relative flex min-h-40 max-w-2xl items-center gap-4 px-5 py-7 pb-9 sm:px-10 sm:py-9 sm:pb-11 md:min-h-52 md:max-w-[58%]">
        {icon && (
          <span aria-hidden="true" className="hidden size-16 shrink-0 place-items-center rounded-full bg-cream-50 text-forest-800 shadow-badge sm:grid">
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <h1 className="text-balance text-4xl text-cream-200">{title}</h1>
          {lead && <p className="mt-2 text-base text-cream-100">{lead}</p>}
          {children}
        </div>
      </div>

      <ThinStripe className="absolute inset-x-0 bottom-0 z-[1]" />
    </header>
  );
}
