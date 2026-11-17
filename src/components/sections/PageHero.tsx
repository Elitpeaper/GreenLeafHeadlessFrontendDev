import Image from "next/image";
import type { ReactNode } from "react";
import { getStockImage } from "@/lib/images";
import { IconBadge, SceneHeroLeaves, TextureGrain, type BadgeGlyph } from "@/components/illustrations";
import { InlineStripe, SignatureStripe } from "./parts";

/**
 * Short forest hero for the promo pages (/pv-nedir, /uye-ol, /cilt-tipine-gore, /hakkimizda) — REFERANS-CIKARIM §6 + §7.7
 * (K-186/K-187). Layers back to front: forest-hero gradient → grain → text column (left) + visual column (right) →
 * signature stripe on the bottom edge (the one stripe on screen).
 * Text never sits on a photo or paper layer. Mobile: visual on top (order-first), text below on the flat ground.
 * Prices never appear on this dark ground; PV chips/values live in their own light plates.
 */
export function PageHero({
  id,
  eyebrow,
  title,
  body,
  actions,
  visual,
  note,
}: {
  id: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  note?: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,var(--color-forest-600)_0%,var(--color-forest-700)_48%,var(--color-forest-800)_100%)] text-cream-100"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <TextureGrain strength={0.12} />
      </div>
      <div className="mx-auto grid max-w-page grid-cols-[minmax(0,1fr)] items-center gap-8 px-gutter pb-14 pt-8 md:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:pb-20">
        <div className="relative z-10">
          {eyebrow && (
            <div>
              <p className="font-[family-name:var(--font-role-accent)] text-sm font-bold text-lime-200">{eyebrow}</p>
              <InlineStripe className="mt-2" />
            </div>
          )}
          <h1 id={id} className={`anim-rise text-balance text-4xl text-cream-200 ${eyebrow ? "mt-4" : ""}`}>
            {title}
          </h1>
          {body && <p className="mt-5 max-w-prose text-lg text-cream-100">{body}</p>}
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">{actions}</div>}
          {note && <div className="mt-4 text-sm text-cream-100">{note}</div>}
        </div>
        {visual && <div className="relative order-first h-48 sm:h-60 lg:order-none lg:h-80">{visual}</div>}
      </div>
      <SignatureStripe className="absolute inset-x-0 bottom-0" />
    </section>
  );
}

/**
 * Default visual column: paper-cut leaves (K-187 a) + one big cream medallion. Leaves sit BEHIND the medallion and
 * outside any text (B-9, §9.5). Pass `children` to replace the medallion (e.g. the PV coin).
 */
export function HeroArt({ glyph = "leaf", children }: { glyph?: BadgeGlyph; children?: ReactNode }) {
  return (
    <>
      <SceneHeroLeaves className="absolute inset-0 size-full" />
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {children ?? <IconBadge glyph={glyph} tone="cream" className="size-28 sm:size-36" />}
      </div>
    </>
  );
}

/** Cream pill CTA for forest grounds (K-186): forest-900 text, cream gradient, cream shadow. */
export const creamCta =
  "inline-flex min-h-control-lg items-center justify-center gap-2 rounded-pill bg-[linear-gradient(180deg,var(--color-cream-50),var(--color-cream-200))] px-8 text-lg font-semibold text-forest-900 shadow-cta-cream transition-[translate,scale,filter,box-shadow] duration-250 hover:brightness-105 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.97]";

/** Secondary text link on forest grounds. */
export const creamLink =
  "inline-flex min-h-tap items-center gap-2 font-medium text-cream-100 underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-250 hover:decoration-current";

/**
 * Photo visual column for PageHero (K-270): licensed stock photo (slot from stock-images.json) inside the leaf-cut
 * frame, filling the column. Never carries text; `children` = small corner element on its own light plate (e.g. the
 * PV coin) so prices/PV never sit directly on the photo. Unknown slot -> falls back to the paper-cut HeroArt.
 */
export function HeroPhoto({ slot, glyph = "leaf", children }: { slot: string; glyph?: BadgeGlyph; children?: ReactNode }) {
  const img = getStockImage(slot);
  if (!img) return <HeroArt glyph={glyph}>{children}</HeroArt>;
  return (
    <>
      <div className="absolute inset-0 overflow-hidden rounded-panel rounded-bl-2xl bg-forest-800 shadow-long">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover"
          placeholder={img.blurDataURL ? "blur" : "empty"}
          blurDataURL={img.blurDataURL}
        />
      </div>
      {children && <div className="absolute bottom-3 right-3 z-10 rounded-full bg-cream-50 p-1.5 shadow-long sm:bottom-4 sm:right-4">{children}</div>}
    </>
  );
}
