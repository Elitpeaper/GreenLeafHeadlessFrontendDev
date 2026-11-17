import Image from "next/image";
import Link from "next/link";
import { PvChip } from "@/components/product/PvChip";
import type { ProductSummary } from "@/lib/products";
import { formatPv } from "@/lib/format";
import { cssVars } from "@/lib/css";
import { t } from "@/components/sections/copy";
import { AccentLeaves, Eyebrow } from "../parts";

/**
 * PV band / scene (wireframe §5 variant A as its own band; brief §8a variant B as the membership opener).
 * Left: the big lime "PV chip" signature (pv-explainer.md §1). Right: three real TR products whose PV chips
 * "flow" into a Toplam PV box (M-18 flow, M-19 count-up — hareket-tasarimcisi). No earnings language (K-099).
 * Products here show name + PV only (not cards) so Vitrin 1 is not repeated (K-008).
 */
export function PvScene({
  id,
  products,
  eyebrow = t("home.pvBand.eyebrow"),
  title = t("home.pvBand.title"),
  body = t("home.pvBand.body"),
  cta = true,
}: {
  id: string;
  products: ProductSummary[];
  eyebrow?: string;
  title?: string;
  body?: string;
  /** Link to /pv-nedir (off on the PV page itself). */
  cta?: boolean;
}) {
  const sample = products.filter((p) => p.pv != null && p.image).slice(0, 3);
  const total = sample.reduce((a, p) => a + (p.pv ?? 0), 0);
  const big = sample.length ? formatPv(Math.round(total * 100) / 100) : null;

  return (
    <div className={`relative mx-auto grid max-w-page items-center gap-10 px-gutter lg:grid-cols-12`}>
      <div className="relative lg:col-span-5">
        <div className="relative mx-auto aspect-square w-full max-w-[18rem] sm:max-w-[22rem]" aria-hidden="true" data-motion="reveal-scale">
          <AccentLeaves className="absolute -left-[12%] -top-[14%] w-[124%]" opacity={0.35} />
          <div className="absolute inset-[12%] grid place-items-center rounded-full bg-lime-100 shadow-card ring-8 ring-white">
            <div className="text-center text-lime-700">
              <span className="block font-[family-name:var(--font-role-accent)] text-2xl font-bold tracking-eyebrow">PV</span>
              {big && (
                <span className="block text-4xl font-semibold leading-none sm:text-display tabular-nums" data-motion="M-19" data-count-to={total}>
                  {big}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="mt-4 text-3xl text-ink">
          {title}
        </h2>
        <p className="mt-3 max-w-prose text-lg text-ink-muted">{body}</p>

        {sample.length > 0 && (
          <div className="mt-8 grid gap-3">
            <ul className="grid gap-2.5">
              {sample.map((p, i) => (
                <li key={p.id} data-motion="M-18" style={cssVars({ "--i": i })}>
                  <Link
                    href={p.href}
                    className="group flex items-center gap-3 rounded-md bg-surface p-2 pr-4 shadow-xs ring-1 ring-line transition-shadow duration-250 hover:shadow-card"
                  >
                    {p.image && (
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-sm bg-green-50">
                        <Image src={p.image.src} alt="" fill sizes="48px" className="object-contain p-1 mix-blend-multiply" />
                      </span>
                    )}
                    <span className="line-clamp-1 flex-1 text-sm font-medium text-ink group-hover:underline">{p.name}</span>
                    <PvChip value={p.pv} info={false} size="sm" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-3 border-t border-lime-200 px-2 pt-3 text-lime-700">
              <span className="text-sm font-semibold">{t("pv.example.pv")}</span>
              <span className="text-xl font-semibold tabular-nums">{big}</span>
            </div>
          </div>
        )}

        {cta && (
        <Link href="/pv-nedir" className="mt-6 inline-flex min-h-tap items-center gap-2 font-medium text-green-700 underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
          {t("home.pvBand.cta")} <span aria-hidden="true">→</span>
        </Link>
        )}
      </div>
    </div>
  );
}
