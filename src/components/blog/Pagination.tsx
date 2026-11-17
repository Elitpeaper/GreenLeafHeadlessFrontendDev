import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@/components/ui/lucide";
import { t } from "@/lib/ui-text";

/**
 * Numbered pagination (links, works without JS). Disabled prev/next are plain spans (never href="#", K-182).
 * Window: 1 … p-1 p p+1 … last.
 */
export function Pagination({ page, pageCount, hrefFor }: { page: number; pageCount: number; hrefFor: (page: number) => string }) {
  if (pageCount <= 1) return null;
  const pages = new Set([1, pageCount, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pageCount));
  const list = [...pages].sort((a, b) => a - b);
  const items: (number | "gap")[] = [];
  list.forEach((n, i) => {
    if (i > 0 && n - list[i - 1]! > 1) items.push("gap");
    items.push(n);
  });

  const box = "inline-flex size-12 items-center justify-center rounded-pill text-base font-medium";
  const arrow = (dir: "prev" | "next") => {
    const target = dir === "prev" ? page - 1 : page + 1;
    const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
    const label = t(dir === "prev" ? "blog.pagination.prev" : "blog.pagination.next");
    if (target < 1 || target > pageCount)
      return (
        <span className={`${box} text-ink-muted/50`} aria-hidden="true">
          <Icon size={20} />
        </span>
      );
    return (
      <Link href={hrefFor(target)} rel={dir} aria-label={label} className={`${box} text-ink ring-1 ring-inset ring-line transition-colors duration-[250ms] hover:bg-green-50`}>
        <Icon size={20} />
      </Link>
    );
  };

  return (
    <nav aria-label={t("blog.pagination.aria")} className="mt-stack flex flex-col items-center gap-3">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>{arrow("prev")}</li>
        {items.map((n, i) =>
          n === "gap" ? (
            <li key={`g${i}`} aria-hidden="true" className="px-1 text-ink-muted">
              …
            </li>
          ) : (
            <li key={n}>
              {n === page ? (
                <span aria-current="page" className={`${box} bg-green-700 text-white`}>
                  <span className="sr-only">{t("blog.pagination.page", { page: n })}</span>
                  <span aria-hidden="true">{n}</span>
                </span>
              ) : (
                <Link href={hrefFor(n)} className={`${box} text-ink ring-1 ring-inset ring-line transition-colors duration-[250ms] hover:bg-green-50`}>
                  <span className="sr-only">{t("blog.pagination.page", { page: n })}</span>
                  <span aria-hidden="true">{n}</span>
                </Link>
              )}
            </li>
          ),
        )}
        <li>{arrow("next")}</li>
      </ul>
      <p className="text-sm text-ink-muted">{t("blog.pagination.status", { page, total: pageCount })}</p>
    </nav>
  );
}
