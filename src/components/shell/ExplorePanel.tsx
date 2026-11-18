"use client";

/** Keşfet panel body (K-266, header-arama-kategori.md §4): 4 nav groups from getSiteNav() + photo tile. Lazy-loaded. */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/lucide";
import type { StockPhoto } from "@/components/listing/stock";
import type { SiteNavGroup } from "@/lib/site-nav";
import { useT } from "@/lib/ui-text/client";
import { useExplore } from "./explore-store";
import { SiteNavRow } from "./SiteNavRow";

export default function ExplorePanel({ nav, photo }: { nav: SiteNavGroup[]; photo: StockPhoto | null }) {
  const { t } = useT();
  const hide = useExplore((s) => s.hide);
  return (
    <>
      <nav aria-label={t("header.explore.aria")} className="mx-auto grid max-w-wide gap-8 px-gutter py-8 lg:grid-cols-[repeat(4,minmax(0,1fr))_17.5rem]">
        {nav.map((g) => (
          <div key={g.key}>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">{g.label}</h2>
            <ul className="mt-2">
              {g.items.map((it) => (
                <SiteNavRow key={it.id} item={it} onNavigate={() => hide()} />
              ))}
            </ul>
          </div>
        ))}
        {photo && (
          <Link
            href="/cilt-tipine-gore"
            onClick={() => hide()}
            className="group/photo relative block min-h-56 overflow-hidden rounded-tile bg-forest-900 shadow-card"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="280px"
              className="object-cover transition-transform duration-500 motion-safe:group-hover/photo:scale-105"
              placeholder={photo.blurDataURL ? "blur" : "empty"}
              blurDataURL={photo.blurDataURL}
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/40 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4 font-semibold text-white">
              {t("header.explore.photoCta")}
              <ArrowRight size={18} />
            </span>
          </Link>
        )}
      </nav>
      <div aria-hidden="true" className="grid h-1 grid-rows-[2px_1px_1px]">
        <span className="bg-stripe-1" />
        <span className="bg-stripe-2" />
        <span className="bg-stripe-3" />
      </div>
    </>
  );
}
