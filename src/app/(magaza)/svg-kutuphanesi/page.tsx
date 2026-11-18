import type { Metadata } from "next";
import { ILLUSTRATION_GROUPS, type IllustrationEntry, type IllustrationGroup } from "@/components/illustrations";
import { DividerLeafDiamond, SceneHeroBotanical } from "@/components/illustrations";

/**
 * /svg-kutuphanesi — catalogue of the in-house SVG illustration library (K-175, K-179).
 * For the user's presentation and for developers: every component with its name, hover behaviour and placement.
 * noindex, not linked from navigation. Owner: ui-tasarimci.
 */
export const metadata: Metadata = {
  title: "SVG illüstrasyon kütüphanesi",
  description: "Greenleaf Türkiye için çizilmiş özgün botanik illüstrasyonlar, kategori ikonları, ayırıcılar ve desenler.",
  robots: { index: false, follow: false },
};

const INTERACT_LABEL: Record<IllustrationEntry["interact"], string> = {
  bloom: "açılır",
  sway: "salınır",
  draw: "çizilir",
  spin: "döner",
  parallax: "derinlik",
  scatter: "dağılır",
};

function Meta({ item }: { item: IllustrationEntry }) {
  return (
    <div className="mt-3">
      <p className="font-medium text-ink">{item.label}</p>
      <p className="mt-0.5 break-all font-mono text-xs text-ink-muted">{`<${item.name} />`}</p>
      <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
        <span className="rounded-full bg-lime-100 px-2 py-0.5 text-xs font-medium text-lime-700">{INTERACT_LABEL[item.interact]}</span>
        <span>{item.use}</span>
      </p>
    </div>
  );
}

function Stage({ group, item }: { group: IllustrationGroup; item: IllustrationEntry }) {
  const { Component } = item;
  switch (group.key) {
    case "kategori":
      return (
        <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-green-50">
          <Component className="h-20 w-20 text-ink" />
        </div>
      );
    case "ayirici":
      return (
        <div className="flex h-28 flex-col justify-end overflow-hidden rounded-lg bg-white ring-1 ring-line">
          <Component className="block h-14 w-full text-surface-muted" />
          <div className="h-6 bg-surface-muted" />
        </div>
      );
    case "desen":
      return (
        <div className="relative h-44 overflow-hidden rounded-lg bg-white ring-1 ring-line">
          <Component className="absolute inset-0 text-ink" />
        </div>
      );
    case "referans": {
      const layer = item.name === "PatternLeafVeinEmboss" || item.name === "TextureGrain" || item.name === "PanelLeafSegments";
      return (
        <div
          className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-tile p-4"
          style={{ background: "linear-gradient(135deg, #226E45 0%, #1A5A3A 48%, #14482F 100%)" }}
        >
          {layer ? <Component className="absolute inset-0 h-full w-full" /> : <Component className="h-full max-h-full w-full" />}
        </div>
      );
    }
    default: {
      const premium = item.name === "ScenePremiumFrame";
      return (
        <div
          data-theme={premium ? "premium-gold" : undefined}
          className={`flex aspect-[4/3] items-center justify-center rounded-lg p-4 ${premium ? "bg-forest-900" : "bg-white ring-1 ring-line"}`}
        >
          <Component className="h-full max-h-full w-full text-ink" />
        </div>
      );
    }
  }
}

const GRID: Record<string, string> = {
  kategori: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6",
  sahne: "sm:grid-cols-2 lg:grid-cols-3",
  ayirici: "sm:grid-cols-2 lg:grid-cols-3",
  desen: "sm:grid-cols-2 lg:grid-cols-4",
  bos: "grid-cols-2 lg:grid-cols-5",
  referans: "sm:grid-cols-2 lg:grid-cols-4",
};

export default function SvgLibraryPage() {
  const total = ILLUSTRATION_GROUPS.reduce((n, g) => n + g.items.length, 0);
  return (
    <div className="pb-section">
      <header className="relative overflow-hidden bg-green-50">
        <SceneHeroBotanical className="pointer-events-none absolute -right-24 top-0 hidden h-full w-auto opacity-90 md:block" />
        <div className="relative mx-auto max-w-wide px-gutter py-section-tight">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-green-700">Greenleaf Türkiye</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-balance text-ink">SVG illüstrasyon kütüphanesi</h1>
          <p className="mt-4 max-w-prose text-lg text-ink-muted">
            {total} özgün çizim: kategori ikonları, büyük sahneler, bölüm ayırıcılar, arka plan desenleri ve “Çok yakında”
            durumları. Fareyle üzerine geldiğinizde her çizim kendi hareketiyle tepki verir.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-wide px-gutter">
        {ILLUSTRATION_GROUPS.map((group) => (
          <section key={group.key} aria-labelledby={`svg-${group.key}`} className="mt-section">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id={`svg-${group.key}`} className="text-3xl font-semibold text-ink">
                {group.title}
              </h2>
              <p className="text-sm text-ink-muted">{group.note}</p>
            </div>
            <DividerLeafDiamond className="mt-4 h-6 w-48" />
            <ul className={`mt-stack grid gap-grid-gap ${GRID[group.key]}`}>
              {group.items.map((item) => (
                <li key={item.name} data-svg-host="" className="min-w-0 rounded-xl bg-white p-card-pad shadow-card ring-1 ring-line">
                  <Stage group={group} item={item} />
                  <Meta item={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
