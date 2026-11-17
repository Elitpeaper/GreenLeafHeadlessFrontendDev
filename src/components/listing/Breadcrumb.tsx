/** Breadcrumb (kategori.md §1). Desktop: full trail; mobile: only "‹ parent". JSON-LD belongs to seo-uzmani. */
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@/components/ui/lucide";
import { t } from "@/lib/ui-text";

export interface Crumb {
  href: string;
  label: string;
}

export function Breadcrumb({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ href: "/", label: t("product.breadcrumb.home") }, ...items];
  const parent = trail[trail.length - 2];
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      {parent && (
        <Link href={parent.href} className="inline-flex min-h-tap-min items-center gap-1 font-medium text-green-700 sm:hidden">
          <ChevronLeft size={18} />
          {parent.label}
        </Link>
      )}
      <ol className="hidden flex-wrap items-center gap-1 text-ink-muted sm:flex">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.href} className="inline-flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.label}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="inline-flex min-h-tap-min items-center underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-green-800 hover:underline">
                    {c.label}
                  </Link>
                  <ChevronRight size={16} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
