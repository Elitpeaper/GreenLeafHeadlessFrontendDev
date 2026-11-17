import Link from "next/link";
import { ChevronDown } from "@/components/ui/lucide";

export interface FaqEntry {
  q: string;
  a: string;
  link?: { label: string; href: string };
}

/**
 * FAQ accordion (native details/summary: keyboard + no JS). 56 px headers (pv-explainer.md §2.6).
 * Shared by /uye-ol and /pv-nedir. Structured data: seo-uzmani.
 */
export function Faq({ id, title, items }: { id: string; title: string; items: FaqEntry[] }) {
  return (
    <section aria-labelledby={id} className="mx-auto max-w-3xl px-gutter pt-section">
      <h2 id={id} className="text-center text-3xl text-ink">
        {title}
      </h2>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.q} className="group" data-motion="accordion">
            <summary className="flex min-h-control-lg cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown size={24} className="shrink-0 text-green-700 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="pb-5 text-base text-ink-muted">
              <p>{item.a}</p>
              {item.link && (
                <Link href={item.link.href} className="mt-2 inline-flex min-h-tap-min items-center gap-1.5 font-medium text-green-700 underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
                  {item.link.label} <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
