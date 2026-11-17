"use client";

import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import { foldTurkish } from "@/lib/search";
import type { FaqCategory } from "./types";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** "text [label](/path) text" -> nodes. */
function Inline({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      <Link key={at} href={m[2]!} className="font-medium text-green-700 underline underline-offset-4 hover:text-green-800">
        {m[1]}
      </Link>,
    );
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return (
    <>
      {out.map((n, i) => (
        <Fragment key={i}>{n}</Fragment>
      ))}
    </>
  );
}

export interface FaqLabels {
  searchLabel: string;
  placeholder: string;
  empty: string;
  clear: string;
  /** contains {count} */
  count: string;
  tabsAria: string;
}

/** Accessible FAQ: category anchors + client-side search (Turkish folding) + native <details> accordions. */
export function Faq({ categories, labels }: { categories: FaqCategory[]; labels: FaqLabels }) {
  const [q, setQ] = useState("");

  const indexed = useMemo(
    () =>
      categories.map((c) => ({
        ...c,
        items: c.items.map((i) => ({ ...i, hay: foldTurkish(`${i.q} ${i.a.replace(LINK, "$1")}`) })),
      })),
    [categories],
  );

  const tokens = foldTurkish(q).split(" ").filter(Boolean);
  const filtered = indexed
    .map((c) => ({ ...c, items: tokens.length ? c.items.filter((i) => tokens.every((t) => i.hay.includes(t))) : c.items }))
    .filter((c) => c.items.length > 0);
  const total = filtered.reduce((n, c) => n + c.items.length, 0);

  return (
    <div>
      <div className="relative">
        <label htmlFor="faq-search" className="sr-only">
          {labels.searchLabel}
        </label>
        <input
          id="faq-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={labels.placeholder}
          autoComplete="off"
          className="h-control-lg w-full rounded-pill border border-border bg-white px-6 text-lg text-ink shadow-sm transition-[border-color,box-shadow] duration-250 placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="absolute right-3 top-1/2 min-h-tap -translate-y-1/2 rounded-pill px-3 text-sm font-medium text-green-700 hover:underline"
          >
            {labels.clear}
          </button>
        )}
      </div>
      <p role="status" className="mt-3 min-h-6 text-sm text-ink-muted">
        {tokens.length ? (total ? labels.count.replace("{count}", String(total)) : labels.empty) : ""}
      </p>

      {!tokens.length && (
        <nav aria-label={labels.tabsAria} className="mt-2">
          <ul className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.key}>
                <a
                  href={`#sss-${c.key}`}
                  className="inline-flex min-h-tap items-center rounded-pill border border-border bg-white px-5 text-sm font-semibold text-ink transition-[background-color,color,border-color] duration-250 hover:border-green-700 hover:bg-green-50 hover:text-green-800"
                >
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="mt-8 space-y-12">
        {filtered.map((c) => (
          <section key={c.key} id={`sss-${c.key}`} aria-labelledby={`sss-h-${c.key}`} className="scroll-mt-32">
            <h2 id={`sss-h-${c.key}`} className="text-2xl text-ink">
              {c.title}
            </h2>
            {c.intro && <p className="mt-2 max-w-prose text-ink-muted">{c.intro}</p>}
            <div className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border bg-white">
              {c.items.map((i) => (
                <details key={i.id} id={`sss-${i.id}`} className="group" open={tokens.length > 0 && total <= 3 ? true : undefined}>
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold text-ink transition-colors duration-250 hover:bg-surface-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-700 [&::-webkit-details-marker]:hidden">
                    <span>{i.q}</span>
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-green-50 text-xl leading-none text-green-800 transition-transform duration-250 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="space-y-3 px-5 pb-5 text-ink">
                    {i.a.split(/\n{2,}/).map((para, k) => (
                      <p key={k} className="max-w-prose">
                        <Inline text={para} />
                      </p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
