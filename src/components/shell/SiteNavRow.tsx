"use client";

/**
 * One row of the K-266 all-pages menu (Keşfet panel + mobile drawer). Data comes from getSiteNav() (server) as props.
 * soon -> "Çok yakında" pill, link still works; href === null (external, not supplied) -> passive row, never a link.
 */
import Link from "next/link";
import { useFavoritesCount, useFavoritesHydration } from "@/components/product/favorites";
import { ArrowUpRight } from "@/components/ui/lucide";
import type { SiteNavItem } from "@/lib/site-nav";
import { useT } from "@/lib/ui-text/client";

export function SoonPill() {
  const { t } = useT();
  return (
    <span className="inline-flex min-h-6 shrink-0 items-center whitespace-nowrap rounded-pill bg-blue-50 px-2.5 text-xs font-semibold leading-none text-blue-800 ring-1 ring-inset ring-blue-100">
      {t("header.soon")}
    </span>
  );
}

function FavCount() {
  useFavoritesHydration();
  const n = useFavoritesCount();
  if (n <= 0) return null;
  return (
    <span aria-hidden="true" className="grid h-5 min-w-5 place-items-center rounded-pill bg-green-700 px-1 text-xs font-semibold leading-none text-white">
      {n}
    </span>
  );
}

export function SiteNavRow({ item, onNavigate, className = "" }: { item: SiteNavItem; onNavigate?: () => void; className?: string }) {
  const base = `flex min-h-11 items-center gap-2 rounded-md text-base font-medium text-ink ${className}`;
  const inner = (
    <>
      <span>{item.label}</span>
      {item.external && <ArrowUpRight size={16} className="text-ink-muted" />}
      {item.count === "favorites" && <FavCount />}
      {item.soon && <SoonPill />}
    </>
  );
  return (
    <li>
      {item.href === null ? (
        <span className={`${base} text-ink-muted`}>{inner}</span>
      ) : item.external ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={`${base} hover:text-green-800`}>
          {inner}
        </a>
      ) : (
        <Link href={item.href} onClick={onNavigate} className={`${base} hover:text-green-800`}>
          {inner}
        </Link>
      )}
      {item.children && (
        <ul className="mb-1 flex flex-wrap gap-1.5">
          {item.children.map((c) => (
            <li key={c.id}>
              <Link
                href={c.href}
                onClick={onNavigate}
                className="inline-flex min-h-9 items-center rounded-pill bg-surface-muted px-3 text-sm text-ink ring-1 ring-line transition-colors duration-250 hover:bg-accent-soft"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
