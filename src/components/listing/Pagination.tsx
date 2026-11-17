/**
 * Numbered pagination (K-173): ‹ 1 … 4 5 6 … N ›. Server component, plain links (works without JS, crawlable).
 * - Current page: aria-current="page", not a link.
 * - Prev/next at the ends render as aria-disabled spans (no empty/"#" links, K-182).
 * - < 640px a narrower window is used (‹ 1 … 5 … N ›) so it fits 360px.
 */
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@/components/ui/lucide";
import { t } from "@/lib/ui-text";

type Item = { kind: "page"; n: number } | { kind: "gap"; key: string };

/** Pages within `radius` of the current one + first/last, gaps as "…". Small ranges are shown in full. */
export function pageItems(page: number, pageCount: number, radius = 1): Item[] {
  const full = 5 + radius * 2;
  if (pageCount <= full) return Array.from({ length: pageCount }, (_, i) => ({ kind: "page", n: i + 1 }));
  const set = new Set<number>([1, pageCount]);
  for (let n = page - radius; n <= page + radius; n++) set.add(n);
  // Keep the window the same width at the edges (1 2 3 … N rather than 1 2 … N).
  if (page <= radius + 2) for (let n = 2; n <= 2 + radius * 2; n++) set.add(n);
  if (page >= pageCount - radius - 1) for (let n = pageCount - 1 - radius * 2; n < pageCount; n++) set.add(n);
  const nums = [...set].filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b);
  const out: Item[] = [];
  nums.forEach((n, i) => {
    const prev = nums[i - 1];
    if (prev !== undefined && n - prev === 2) out.push({ kind: "page", n: n - 1 });
    else if (prev !== undefined && n - prev > 2) out.push({ kind: "gap", key: `gap-${prev}` });
    out.push({ kind: "page", n });
  });
  return out;
}

const box = "inline-flex size-10 items-center justify-center rounded-pill text-sm font-semibold tabular-nums sm:size-11";

export function Pagination({ page, pageCount, hrefFor, className = "" }: { page: number; pageCount: number; hrefFor: (n: number) => string; className?: string }) {
  if (pageCount <= 1) return null;

  const arrow = (dir: "prev" | "next") => {
    const target = dir === "prev" ? page - 1 : page + 1;
    const label = t(dir === "prev" ? "listing.pagination.prev" : "listing.pagination.next");
    const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
    const inner = (
      <>
        <Icon size={20} />
        <span className="sr-only sm:not-sr-only sm:px-1">{label}</span>
      </>
    );
    const cls = `inline-flex h-10 min-w-10 items-center justify-center gap-0.5 rounded-pill px-2 text-sm font-semibold sm:h-11 sm:px-4 ${dir === "next" ? "flex-row-reverse" : ""}`;
    if (target < 1 || target > pageCount) {
      return (
        <span aria-disabled="true" className={`${cls} text-line-strong`}>
          {inner}
        </span>
      );
    }
    return (
      <Link href={hrefFor(target)} rel={dir} className={`${cls} text-ink ring-1 ring-line transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-50 hover:text-green-800 hover:ring-green-700`}>
        {inner}
      </Link>
    );
  };

  const list = (items: Item[], cls: string) => (
    <ul className={`items-center justify-center gap-1 sm:gap-1.5 ${cls}`}>
      <li className="mr-1 sm:mr-2">{arrow("prev")}</li>
      {items.map((it) =>
        it.kind === "gap" ? (
          <li key={it.key} aria-hidden="true" className="inline-flex w-5 justify-center text-ink-muted sm:w-6">
            …
          </li>
        ) : (
          <li key={it.n}>
            {it.n === page ? (
              <span aria-current="page" aria-label={t("listing.pagination.current", { n: it.n })} className={`${box} bg-green-700 text-white shadow-button`}>
                {it.n}
              </span>
            ) : (
              <Link href={hrefFor(it.n)} aria-label={t("listing.pagination.page", { n: it.n })} className={`${box} text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-50 hover:text-green-800`}>
                {it.n}
              </Link>
            )}
          </li>
        ),
      )}
      <li className="ml-1 sm:ml-2">{arrow("next")}</li>
    </ul>
  );

  return (
    <nav aria-label={t("listing.pagination.aria")} className={className}>
      {list(pageItems(page, pageCount, 0), "flex sm:hidden")}
      {list(pageItems(page, pageCount, 1), "hidden sm:flex")}
    </nav>
  );
}
