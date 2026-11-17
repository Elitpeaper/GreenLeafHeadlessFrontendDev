/**
 * Text-free card parts: ProductImage, ProductCardMini, ProductCardSkeleton (split out of ProductCard.tsx, K-263).
 * ProductCard.tsx reads copy through the server-only `t()`; client components (search panel, mega menu, mobile nav,
 * favourites) import THESE parts directly so the whole UI dictionary never enters the client bundle.
 * Re-exported from ProductCard.tsx; the STABLE API documented there is unchanged.
 */
import Image from "next/image";
import Link from "next/link";
import { Leaf } from "@/components/ui/lucide";
import type { Availability, CatalogImage, ProductSummary } from "@/lib/catalog/types";
import { accentTriggerProps } from "@/lib/theme/accent";
import { accentStyle } from "@/lib/theme/palette";
import { Badge } from "./Badge";
import { PriceBlock } from "./Price";

export function MediaFallback({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
      <Leaf size={40} className="text-accent-decor" />
      <span className="line-clamp-2 text-sm text-ink-muted">{name}</span>
    </div>
  );
}

export function ProductImage({
  image,
  name,
  sizes,
  priority,
  className = "",
}: {
  image: CatalogImage;
  name: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt || name}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-contain mix-blend-multiply ${className}`}
    />
  );
}

// ------------------------------------------------------------------ mini

export interface MiniProduct {
  slug: string;
  href: string;
  name: string;
  nameIsFallback: boolean;
  brandTitle: string;
  image: CatalogImage | null;
  availability: Availability;
  price: number | null;
  memberPrice: number | null;
  pv: number | null;
  accent?: ProductSummary["accent"];
}

export function toMiniProduct(p: ProductSummary): MiniProduct {
  return {
    slug: p.slug,
    href: p.href,
    name: p.name,
    nameIsFallback: p.nameIsFallback,
    brandTitle: p.brand.title,
    image: p.image,
    availability: p.availability === "tr" && !p.sellable ? "yakinda" : p.availability,
    price: p.sellable ? p.price : null,
    memberPrice: p.sellable ? p.memberPrice : null,
    pv: p.pv,
    accent: p.accent,
  };
}

export function ProductCardMini({
  product,
  size = "md",
  showPrice = true,
  onNavigate,
  className = "",
}: {
  product: ProductSummary | MiniProduct;
  size?: "sm" | "md";
  showPrice?: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  const p: MiniProduct = "brand" in product ? toMiniProduct(product) : product;
  const box = size === "sm" ? "size-16" : "size-20";
  return (
    <Link
      href={p.href}
      onClick={onNavigate}
      {...accentTriggerProps(p.accent)}
      style={p.accent ? accentStyle(p.accent, ["--accent-soft", "--accent-decor", "--accent-line"]) : undefined}
      className={`group/mini flex min-h-tap items-center gap-3 rounded-md p-2 transition-colors duration-250 hover:bg-surface-muted ${className}`}
    >
      <span className={`relative shrink-0 overflow-hidden rounded-md bg-accent-soft ${box}`}>
        <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(closest-side,var(--color-surface),transparent)]" />
        {p.image ? (
          <span className="absolute inset-[10%] transition-[scale] duration-(--duration-slow) motion-safe:group-hover/mini:scale-105">
            <ProductImage image={p.image} name={p.name} sizes={size === "sm" ? "64px" : "80px"} />
          </span>
        ) : (
          <Leaf size={26} className="absolute inset-0 m-auto text-accent-decor" />
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">{p.brandTitle}</span>
        <span className="line-clamp-2 text-sm font-medium leading-snug text-ink transition-colors duration-250 group-hover/mini:text-green-800">{p.name}</span>
        {p.availability === "yakinda" && <Badge tone="comingSoon" className="mt-1 self-start" />}
        {showPrice && (
          <PriceBlock price={p.price} memberPrice={p.memberPrice} pv={p.pv} availability="tr" size="mini" pvInfo={false} className="mt-1" />
        )}
      </span>
    </Link>
  );
}

// ------------------------------------------------------------------ skeleton

export function ProductCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" data-motion="skeleton" className={`flex h-full flex-col ${className}`}>
      <div className="aspect-[4/5] rounded-lg bg-surface-muted" />
      <div className="flex flex-1 flex-col gap-2 px-0.5 pt-4">
        <span className="h-3 w-1/3 rounded-pill bg-surface-muted" />
        <span className="h-4 w-11/12 rounded-pill bg-surface-muted" />
        <span className="h-4 w-2/3 rounded-pill bg-surface-muted" />
        <span className="h-3 w-1/2 rounded-pill bg-surface-muted" />
        <span className="mt-3 h-12 w-full rounded-md bg-surface-muted" />
        <span className="h-7 w-20 rounded-pill bg-surface-muted" />
      </div>
    </div>
  );
}
