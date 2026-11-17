"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Money } from "@/components/product/Price";
import { PvChip } from "@/components/product/PvChip";
import { Minus, Plus } from "@/components/ui/lucide";
import { formatPv } from "@/lib/format";

export interface CalcItem {
  code: string;
  name: string;
  href: string;
  image: string | null;
  price: number;
  memberPrice: number;
  pv: number;
}

export interface CalcLabels {
  total: string;
  memberTotal: string;
  pvTotal: string;
  formula: string;
  increase: string;
  decrease: string;
  qty: string;
}

/**
 * Live PV example basket (pv-explainer.md §2.3): three real TR products with steppers, totals update live
 * (aria-live). No add-to-cart here — single CTA rule; it is a calculator. Totals: Toplam · Üye fiyatıyla · PV.
 */
export function PvCalculator({ items, labels }: { items: CalcItem[]; labels: CalcLabels }) {
  const [qty, setQty] = useState<number[]>(() => items.map(() => 1));
  const sum = (f: (i: CalcItem) => number) => items.reduce((a, it, i) => a + f(it) * (qty[i] ?? 0), 0);
  const total = sum((i) => i.price);
  const member = sum((i) => i.memberPrice);
  const pv = Math.round(sum((i) => i.pv) * 100) / 100;
  const set = (i: number, d: number) => setQty((q) => q.map((v, j) => (j === i ? Math.min(10, Math.max(0, v + d)) : v)));
  const btn = "grid size-11 place-items-center rounded-pill text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-lime-100 aria-disabled:opacity-40";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <ul className="grid gap-3">
        {items.map((it, i) => (
          <li key={it.code} className="flex flex-wrap items-center gap-4 rounded-lg bg-surface p-3 pr-4 shadow-xs ring-1 ring-line sm:flex-nowrap">
            {it.image && (
              <span className="relative size-16 shrink-0 overflow-hidden rounded-md bg-green-50">
                <Image src={it.image} alt="" fill sizes="64px" className="object-contain p-1.5 mix-blend-multiply" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <Link href={it.href} className="line-clamp-2 font-medium text-ink underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
                {it.name}
              </Link>
              <PvChip value={it.pv} info={false} size="sm" className="mt-1" />
            </div>
            <div role="group" aria-label={`${labels.qty}: ${it.name}`} className="inline-flex items-center rounded-pill ring-1 ring-line-strong">
              <button type="button" className={btn} aria-label={`${it.name} ${labels.decrease}`} aria-disabled={(qty[i] ?? 0) <= 0 || undefined} onClick={() => set(i, -1)}>
                <Minus size={18} />
              </button>
              <span className="w-8 text-center font-semibold tabular-nums">{qty[i]}</span>
              <button type="button" className={btn} aria-label={`${it.name} ${labels.increase}`} aria-disabled={(qty[i] ?? 0) >= 10 || undefined} onClick={() => set(i, 1)}>
                <Plus size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="sticky bottom-3 self-start rounded-xl bg-surface p-6 shadow-lift ring-1 ring-line lg:top-28" aria-live="polite">
        <p className="text-sm text-ink-muted">{labels.formula}</p>
        <dl className="mt-4 grid gap-3">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-ink-muted">{labels.total}</dt>
            <dd className="text-lg font-semibold text-ink">
              <Money value={total} />
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 rounded-md bg-green-700 px-3 py-2 text-white">
            <dt className="text-sm font-medium">{labels.memberTotal}</dt>
            <dd className="text-lg font-bold">
              <Money value={member} />
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-md bg-lime-100 px-3 py-3 text-lime-700">
            <dt className="text-sm font-semibold">{labels.pvTotal}</dt>
            <dd className="text-3xl font-semibold tabular-nums" data-motion="M-19">
              {formatPv(pv)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
