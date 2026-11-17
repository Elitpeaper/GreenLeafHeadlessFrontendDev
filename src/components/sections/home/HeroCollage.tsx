import Image, { getImageProps } from "next/image";
import type { ReactNode } from "react";
import { PvChip } from "@/components/product/PvChip";
import { cssVars } from "@/lib/css";
import type { ProductSummary } from "@/lib/products";
import type { StockImage } from "../media";

/**
 * Collage building blocks for the home hero (ana-sayfa-maximalist.md §2.3, K-237). Server components, decorative
 * (aria-hidden by the caller). Layer order back -> front: dekor tipografi, renk bloğu, fotoğraf çerçevesi,
 * kâğıt yaprak, packshot çıkartması. Real text never sits on these layers (rules §15.2).
 *
 * Motion hooks (hareket.md §23/§24): pieces carry data-motion-part="layer" + --i (arkadan öne) + --from-x/-y/-r; the photo
 * carries data-motion-part="media" (never hidden: LCP). Only slide 1 passes `intro`; the other slides get no
 * entrance parts (the entrance is the page's, not the swiper's).
 */

type Pose = { rotate: string; from: [string, string, string] };

/** Final tilt (own `rotate`) + start offset/turn for the entrance. Hover eases the tilt toward 0 (motion-safe only). */
export const STICKER_POSES: Pose[] = [
  { rotate: "rotate-[4deg] motion-safe:hover:rotate-[1deg]", from: ["-70px", "40px", "-24deg"] },
  { rotate: "-rotate-[2deg] motion-safe:hover:rotate-0", from: ["60px", "60px", "20deg"] },
  { rotate: "rotate-[6deg] motion-safe:hover:rotate-[2deg]", from: ["40px", "-50px", "28deg"] },
  { rotate: "-rotate-[5deg] motion-safe:hover:-rotate-[1deg]", from: ["-50px", "-40px", "-30deg"] },
];

export function layerVars(i: number, from?: [string, string, string]) {
  return cssVars({
    "--i": i,
    ...(from ? { "--from-x": from[0], "--from-y": from[1], "--from-r": from[2] } : null),
  });
}

/**
 * Packshot "sticker": official packshot on a cream-50 podium disc, white plate with the PV chip underneath
 * (hero price exception, K-062: no price here). `size` = Tailwind size classes (responsive).
 */
export function Sticker({
  product,
  pose = 0,
  i = 1,
  size,
  className = "",
  intro = false,
}: {
  product: ProductSummary;
  pose?: number;
  i?: number;
  size: string;
  className?: string;
  intro?: boolean;
}) {
  const p = STICKER_POSES[pose % STICKER_POSES.length]!;
  if (!product.image) return null;
  return (
    <span
      {...(intro ? { "data-motion-part": "layer" } : null)}
      className={`absolute block transition-[translate,rotate] duration-250 motion-safe:hover:-translate-y-1 ${p.rotate} ${size} ${className}`}
      style={layerVars(i, p.from)}
    >
      <span className="absolute inset-0 rounded-full bg-cream-50 shadow-sticker ring-4 ring-white/70" />
      <Image
        src={product.image.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 200px, 120px"
        draggable={false}
        className="rounded-full object-contain p-[14%] mix-blend-multiply"
      />
      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-white p-0.5 shadow-card-on-forest">
        <PvChip value={product.pv} info={false} size="sm" />
      </span>
    </span>
  );
}

/**
 * Licensed stock photo in a leaf-cut frame (radius.panel, one 2xl corner), tilted, long shadow.
 * `mobile` = portrait art-direction crop below 640 px (one request per device).
 */
export function PhotoFrame({
  image,
  mobile = null,
  priority = false,
  media = false,
  sizes,
  className,
  children,
}: {
  image: StockImage | null;
  mobile?: StockImage | null;
  priority?: boolean;
  /** data-motion-part="media" (entrance settle; never hidden). */
  media?: boolean;
  sizes: string;
  /** Position + size + tilt + corner classes. */
  className: string;
  children?: ReactNode;
}) {
  if (!image) return null;
  return (
    <div {...(media ? { "data-motion-part": "media" } : null)} className={`absolute overflow-hidden bg-forest-700 shadow-long ${className}`}>
      {mobile ? <ArtDirected image={image} mobile={mobile} priority={priority} sizes={sizes} /> : <Photo image={image} priority={priority} sizes={sizes} />}
      {children}
    </div>
  );
}

function Photo({ image, priority, sizes }: { image: StockImage; priority: boolean; sizes: string }) {
  return (
    <Image
      src={image.src}
      alt=""
      fill
      priority={priority}
      sizes={sizes}
      placeholder={image.blurDataURL ? "blur" : "empty"}
      blurDataURL={image.blurDataURL}
      draggable={false}
      className="object-cover"
    />
  );
}

function ArtDirected({ image, mobile, priority, sizes }: { image: StockImage; mobile: StockImage; priority: boolean; sizes: string }) {
  const common = { alt: "", fill: true, sizes, priority } as const;
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: image.src });
  const {
    props: { srcSet: mobileSet, ...rest },
  } = getImageProps({ ...common, src: mobile.src, sizes: "80vw" });
  return (
    <picture>
      <source media="(min-width: 640px)" srcSet={desktopSet} sizes={sizes} />
      <source media="(max-width: 639px)" srcSet={mobileSet} sizes="80vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- decorative collage photo, alt="" comes from getImageProps rest */}
      <img {...rest} draggable={false} className="object-cover" />
    </picture>
  );
}
