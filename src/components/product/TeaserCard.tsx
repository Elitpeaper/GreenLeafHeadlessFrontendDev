import Image from "next/image";
import type { TeaserProduct } from "@/lib/products";
import { formatPrice, formatPv } from "@/lib/format";

/**
 * LEGACY card for the K-046 "/yakinda" landing only (TeaserProduct data, frozen page). Do not use elsewhere —
 * the store uses ProductCard. Kept byte-identical in output to the launched landing.
 */
export function TeaserCard({ product, priority = false }: { product: TeaserProduct; priority?: boolean }) {
  const { brand, name, volume, category, image, listPrice, memberPrice, pv } = product;
  const fullName = brand ? `${brand} ${name}` : name;

  return (
    <article className="card-lift group flex h-full flex-col rounded-lg bg-white ring-1 ring-line">
      <div className="relative m-2 mb-0 aspect-square overflow-hidden rounded-md bg-[radial-gradient(circle_at_50%_55%,#fff_0%,#fff_38%,var(--color-green-50)_78%)]">
        <Image
          src={image}
          alt={fullName}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 72vw"
          priority={priority}
          className="object-contain p-[12%] mix-blend-multiply transition-transform duration-500 ease-out-expo motion-safe:group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-pill bg-white/90 px-2.5 py-0.5 text-xs text-ink-muted ring-1 ring-line">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 pt-3.5">
        {brand && <p className="text-xs font-medium tracking-wide text-ink-muted">{brand}</p>}
        <h3 className="mt-0.5 font-sans text-base font-medium leading-snug text-ink [letter-spacing:0]">
          {name}
        </h3>
        {volume && <p className="mt-1 text-xs text-ink-muted">{volume}</p>}

        <dl className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <dt className="text-xs text-ink-muted">Fiyat</dt>
            <dd className="text-base font-medium tabular-nums text-ink">{formatPrice(listPrice)}</dd>
          </div>
          <div className="rounded-sm bg-green-700 px-3 py-1.5 text-right text-white">
            <dt className="text-xs font-medium leading-tight">Üye fiyatı</dt>
            <dd className="text-lg font-semibold leading-tight tabular-nums">{formatPrice(memberPrice)}</dd>
          </div>
        </dl>
        <p className="mt-2.5 text-xs text-ink-muted">
          <abbr title="Puan değeri" className="no-underline">
            PV
          </abbr>{" "}
          {formatPv(pv)}
        </p>
      </div>
    </article>
  );
}
