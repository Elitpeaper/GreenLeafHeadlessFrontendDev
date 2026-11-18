import Image from "next/image";
import Link from "next/link";
import { ComingSoonBadge } from "@/components/coming-soon/ComingSoonBadge";
import { PatternLeafVeinEmboss, ScenePremiumFrame } from "@/components/illustrations";
import { PinStage } from "@/components/motion/PinStage";
import { SwiperStrip } from "@/components/motion/SwiperStrip";
import { PvChip } from "@/components/product/PvChip";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/ui/lucide";
import { getStockImage, type StockImage } from "@/lib/images";
import type { ProductSummary } from "@/lib/products";
import { t } from "@/components/sections/copy";

export interface DoorDef {
  key: "pv" | "finder" | "premium" | "membership" | "news";
  href: string;
  title: string;
  body: string;
  /** Target page not built yet -> no link + "Çok yakında" pill (K-182). */
  soon?: boolean;
}

/**
 * Photo per door: first registered stock slot wins (K-270; ui-tasarimci's vertical pin photos "door.<key>.tall",
 * brief fotograf-ve-svg-yerlesim.md §2; later keys are fallbacks). Configure here, nowhere else.
 */
export const DOOR_PHOTO_SLOTS: Record<DoorDef["key"], string[]> = {
  pv: ["door.pv.tall", "door.pv", "pv.scene"],
  finder: ["door.finder.tall", "skinFinder.hero"],
  premium: ["door.premium.tall", "premium.gold.1"],
  membership: ["door.membership.tall", "door.membership", "membership.scene"],
  news: ["door.news.tall", "door.news", "brand.story.2"],
};
const CTA_KEY: Record<DoorDef["key"], string> = {
  pv: "home.v2.gates.pv.cta",
  finder: "home.v2.gates.finder.cta",
  premium: "home.v2.gates.premium.cta",
  membership: "home.v2.gates.member.cta",
  news: "home.v2.gates.news.cta",
};
const photoOf = (key: DoorDef["key"]): StockImage | null => {
  for (const slot of DOOR_PHOTO_SLOTS[key]) {
    const img = getStockImage(slot);
    if (img) return img;
  }
  return null;
};
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "Kapılar" (K-178 doors to PV / finder / premium / membership / news) as a Ravena pinned scene (K-265, K-257;
 * hareket.md §27): > 900 px + fine pointer + full motion tier: a 100vh forest stage is pinned, vertical scrolling scrubs
 * through the doors — the left bar's marker steps down, the middle text block swaps (fade + 30 px rise) and each next
 * photo opens from the bottom like a curtain over the previous one; a giant outline word draws itself behind.
 * Everywhere else (phones, tablets, "Hareketi azalt"): the same doors as a Swiper card strip. No prices (PV chips only).
 */
export function HomeDoors({
  items,
  premiumProduct,
  pvProducts,
}: {
  items: DoorDef[];
  premiumProduct: ProductSummary | null;
  pvProducts: ProductSummary[];
}) {
  const doors = items.map((d) => ({ ...d, photo: photoOf(d.key), cta: t(CTA_KEY[d.key]) }));
  const total = doors.length;
  const eyebrow = t("home.v2.gates.eyebrow");
  const title = t("home.v2.gates.title");

  return (
    <section className="relative isolate bg-forest-950 text-cream-100">
      <PinStage>
        {/* ------------------------------------------------ pinned stage (desktop, full tier) */}
        <div data-pin-stage="" className="relative isolate overflow-hidden bg-gradient-forest-deep">
          <span aria-hidden="true" data-stage-fill="" className="absolute inset-0 -z-10 origin-bottom bg-gradient-forest-radial" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <PatternLeafVeinEmboss strength={0.5} />
          </div>
          <svg
            data-stage-side=""
            aria-hidden="true"
            viewBox="0 0 1600 240"
            preserveAspectRatio="xMinYMax meet"
            className="pointer-events-none absolute inset-x-0 bottom-[-1.5rem] -z-10 h-auto w-full select-none"
          >
            <text x="12" y="222" fontSize="240" fontWeight="700" letterSpacing="-6" fill="none" stroke="var(--color-cream-100, #F6EEDF)" strokeOpacity="0.32" strokeWidth="1.6">
              {t("home.v2.gates.side")}
            </text>
          </svg>

          <div className="mx-auto grid h-full max-w-wide grid-cols-[3.25rem_minmax(0,15fr)_minmax(0,24fr)] items-center gap-[clamp(2rem,4vw,3.75rem)] px-gutter py-[clamp(4.5rem,11vh,7.5rem)]">
            {/* left bar: ticks + marker */}
            <div aria-hidden="true" data-stage-bar="" className="relative flex h-[58%] flex-col justify-between">
              <span data-stage-marker="" className="absolute left-0 top-0 -mt-[7px] block size-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-lime-200" />
              {doors.map((d, i) => (
                <span key={d.key} data-stage-point="" className="ml-5 flex items-center gap-2 text-xs font-semibold tabular-nums text-cream-100/60">
                  <span className="block h-0.5 w-6 rounded-pill bg-current" />
                  {pad(i + 1)}
                </span>
              ))}
            </div>

            {/* middle: section title + stacked door texts */}
            <div className="relative flex h-full flex-col justify-center">
              <p className="font-[family-name:var(--font-role-accent)] text-sm font-bold text-lime-200">{eyebrow}</p>
              <h2 id="doors-title" className="mt-3 text-4xl text-cream-200" data-no-split="">
                {title}
              </h2>
              <div className="relative mt-10 min-h-[19rem]">
                {doors.map((d, i) => (
                  <div key={d.key} data-stage-text="" className="absolute inset-x-0 top-0">
                    <p className="text-sm font-semibold tabular-nums tracking-eyebrow text-lime-200">
                      {pad(i + 1)} <span className="text-cream-100/50">/ {pad(total)}</span>
                    </p>
                    <h3 className="mt-3 text-balance text-[clamp(2rem,3.2vw,2.75rem)] font-semibold leading-[1.08] text-cream-50">
                      {d.title}
                    </h3>
                    <p className="mt-4 max-w-[34ch] text-lg text-cream-100">{d.body}</p>
                    <div className="mt-8">
                      {d.soon ? (
                        <ComingSoonBadge tone="onDark" size="md" />
                      ) : (
                        <Link
                          href={d.href}
                          data-magnetic=""
                          className="group/cta inline-flex min-h-control-lg items-center gap-3 rounded-pill bg-[linear-gradient(180deg,var(--color-cream-50),var(--color-cream-200))] py-2 pl-7 pr-2 text-lg font-semibold text-forest-900 shadow-cta-cream"
                        >
                          {d.cta}
                          <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-forest-900 text-cream-50">
                            <ArrowRight size={20} />
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* right: stacked photos, each next one opens like a curtain */}
            <div aria-hidden="true" className="relative h-full overflow-hidden rounded-tile bg-forest-900 shadow-long">
              {doors.map((d, i) => (
                <div key={d.key} data-stage-image="" className="absolute inset-0 overflow-hidden" style={{ zIndex: i + 1 }}>
                  <div data-stage-img="" className="absolute inset-0">
                    {d.photo && (
                      <Image src={d.photo.src} alt="" fill sizes="(min-width: 1440px) 820px, 56vw" draggable={false} className="object-cover" />
                    )}
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(10_42_24/0.55))]" />
                    <DoorArt doorKey={d.key} premiumProduct={premiumProduct} pvProducts={pvProducts} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------ Swiper strip (phones, tablets, "Hareketi azalt") */}
        <div data-stage-list="" className="relative isolate overflow-hidden bg-gradient-forest-radial py-section">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <PatternLeafVeinEmboss strength={0.6} />
          </div>
          <div className="mx-auto mb-8 max-w-wide px-gutter">
            <p className="font-[family-name:var(--font-role-accent)] text-sm font-bold text-lime-200">{eyebrow}</p>
            <h2 className="mt-3 text-display text-cream-200">{title}</h2>
          </div>
          <SwiperStrip
            label={title}
            className="mx-auto max-w-wide px-gutter"
            controls={
              <div className="mt-6 flex items-center justify-end gap-2">
                <button type="button" data-strip-prev="" aria-label={t("home.v2.gates.prev")} className="grid size-12 place-items-center rounded-full bg-cream-50 text-forest-900 shadow-cta-cream">
                  <ChevronLeft size={22} />
                </button>
                <button type="button" data-strip-next="" aria-label={t("home.v2.gates.next")} className="grid size-12 place-items-center rounded-full bg-cream-50 text-forest-900 shadow-cta-cream">
                  <ChevronRight size={22} />
                </button>
              </div>
            }
          >
            {doors.map((d, i) => (
              <div key={d.key} className="swiper-slide !h-auto">
                <DoorCard door={d} index={i} total={total} premiumProduct={premiumProduct} pvProducts={pvProducts} />
              </div>
            ))}
          </SwiperStrip>
        </div>
      </PinStage>
    </section>
  );
}

function DoorCard({
  door,
  index,
  total,
  premiumProduct,
  pvProducts,
}: {
  door: DoorDef & { photo: StockImage | null; cta: string };
  index: number;
  total: number;
  premiumProduct: ProductSummary | null;
  pvProducts: ProductSummary[];
}) {
  const inner = (
    <>
      <span aria-hidden="true" className="relative block aspect-[4/5] overflow-hidden rounded-t-tile bg-forest-900">
        {door.photo && (
          <Image src={door.photo.src} alt="" fill sizes="(min-width: 1025px) 30vw, (min-width: 769px) 46vw, 85vw" draggable={false} className="object-cover" data-door-photo="" />
        )}
        <DoorArt doorKey={door.key} premiumProduct={premiumProduct} pvProducts={pvProducts} compact />
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold tabular-nums tracking-eyebrow text-lime-200">
          {pad(index + 1)} / {pad(total)}
        </span>
        <span className="mt-2 flex flex-wrap items-center gap-2 text-2xl font-semibold leading-tight text-cream-50">
          {door.title}
          {door.soon && <ComingSoonBadge tone="onDark" />}
        </span>
        <span className="mt-2 block text-base text-cream-100">{door.body}</span>
        {!door.soon && (
          <span className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-cream-50">
            {door.cta}
            <ArrowRight size={20} />
          </span>
        )}
      </span>
    </>
  );
  const cls = "group/door flex h-full flex-col overflow-hidden rounded-tile bg-forest-800/70 shadow-tile ring-1 ring-cream-100/15";
  if (door.soon) return <div className={cls}>{inner}</div>;
  return (
    <Link href={door.href} data-door-card="" className={cls}>
      {inner}
    </Link>
  );
}

/* ---------- small decorative overlays on the door photos (no prices: PV chips only) ---------- */
function DoorArt({
  doorKey,
  premiumProduct,
  pvProducts,
  compact = false,
}: {
  doorKey: DoorDef["key"];
  premiumProduct: ProductSummary | null;
  pvProducts: ProductSummary[];
  compact?: boolean;
}) {
  const size = compact ? "size-20" : "size-36 lg:size-44";
  if (doorKey === "pv") {
    const p = pvProducts.find((x) => x.image);
    return (
      <>
        {p?.image && (
          <span className={`absolute bottom-[10%] right-[8%] block rotate-[5deg] ${size}`}>
            <span className="absolute inset-0 rounded-full bg-cream-50 shadow-sticker ring-4 ring-white/70" />
            <Image src={p.image.src} alt="" fill sizes="180px" draggable={false} className="rounded-full object-contain p-[14%] mix-blend-multiply" />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-white p-0.5 shadow-card-on-forest">
              <PvChip value={p.pv} info={false} size="sm" />
            </span>
          </span>
        )}
      </>
    );
  }
  if (doorKey === "premium" && premiumProduct?.image) {
    return (
      <>
      <ScenePremiumFrame className="absolute inset-[5%] h-[90%] w-[90%] opacity-60" />
      <span className={`absolute bottom-[10%] right-[8%] block ${size}`}>
        <span className="absolute -inset-6 rounded-full [background:var(--gradient-gold-glow)]" />
        <span className="absolute inset-0 rounded-full bg-gold-50 shadow-gold ring-1 ring-gold-300" />
        <Image src={premiumProduct.image.src} alt="" fill sizes="180px" draggable={false} className="rounded-full object-contain p-[14%] mix-blend-multiply" />
      </span>
      </>
    );
  }
  return null;
}
