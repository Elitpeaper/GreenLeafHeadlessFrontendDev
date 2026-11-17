import type { Metadata } from "next";
import Image from "next/image";
import { LeafCluster } from "@/components/brand/LeafCluster";
import { Logo } from "@/components/brand/Logo";
import {
  Float,
  HoverLift,
  LeafSway,
  MagneticHover,
  Marquee,
  MotionRoot,
  NumberTicker,
  Parallax,
  RecolorZone,
  RevealScale,
  Stagger,
  StripeGrow,
  WordReveal,
} from "@/components/motion";
import { cssVars } from "@/lib/css";
import { getCollection, getBrands, type ProductSummary } from "@/lib/products";
import { accentTriggerProps } from "@/lib/theme/accent";
import { LabCart, LabHeart, LabTabs } from "./LabControls";

/**
 * MOTION LAB — hareket-tasarimcisi prototype (Faz 2, "küçük, izole prototip"). Shows every motion primitive on
 * real catalogue data so the user can judge motion in the Kapı 2 preview and QA can screenshot states.
 * Not linked, noindex, self-contained (mounts its own <MotionRoot/>). Remove before Kapı 3 or keep behind preview.
 */
export const metadata: Metadata = {
  title: "Hareket laboratuvarı",
  robots: { index: false, follow: false },
};

function Card({ p }: { p: ProductSummary }) {
  return (
    <a
      href={p.href}
      data-motion="card"
      {...(p.accent ? accentTriggerProps(p.accent) : { "data-accent-trigger": "" })}
      className="block rounded-lg bg-white p-card-pad ring-1 ring-line"
    >
      <span data-motion-part="band" aria-hidden="true" className="mb-3 block h-1 rounded-pill bg-accent-decor" style={{ background: "var(--stripe-1)" }} />
      <span className="relative block aspect-square overflow-hidden rounded-md bg-surface-muted">
        {p.image && (
          <span data-motion-part="media" className="absolute inset-0 block">
            <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 22vw, 70vw" className="object-contain p-3" />
          </span>
        )}
      </span>
      <span className="mt-3 block text-xs uppercase tracking-eyebrow text-ink-muted">{p.brand.title}</span>
      <span className="line-clamp-2 block font-medium">{p.name}</span>
      {p.pv != null && <span className="mt-1 block text-xs text-lime-700">{p.pv} PV</span>}
    </a>
  );
}

const ICON_PATHS = [
  "M12 3c4 4 6 8 0 18C6 11 8 7 12 3z",
  "M4 12l5 5L20 6",
  "M12 2l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 9l6-1z",
  "M3 12h18M12 3v18",
];

export default async function MotionLabPage() {
  const [collection, brands] = await Promise.all([getCollection("turkiyede-satista", { limit: 8 }), getBrands()]);
  const products = (collection?.products ?? []).filter((p) => p.image);
  const hero = products.slice(0, 3);
  const pvChips = products.filter((p) => p.pv != null).slice(0, 3);
  const pvTotal = pvChips.reduce((a, p) => a + (p.pv ?? 0), 0);

  return (
    <>
      <MotionRoot />
      {/* ---------------------------------------------------------------- header: H1, H2, H3, H4, H6, H7, H8, H9 */}
      <header id="header-accent" data-accent-zone="header" data-motion="H6" className="sticky top-0 z-(--z-header)">
        <div data-motion-part="main" className="bg-white">
          <div data-motion="H1" aria-hidden="true" className="grid grid-rows-[2px_1px_1px]">
            <span className="bg-stripe-1" />
            <span className="bg-stripe-2" />
            <span className="bg-stripe-3" />
          </div>
          <div className="mx-auto flex h-header-compact max-w-page items-center gap-4 px-gutter">
            <Logo height={30} />
            <details className="relative">
              <summary data-motion="H2" className="flex cursor-pointer list-none items-center gap-2 rounded-pill bg-accent-soft px-4 py-2 text-sm font-medium">
                <span data-motion-part="morph" aria-hidden="true">
                  <span data-motion-part="grid">▦</span>
                  <span data-motion-part="close">✕</span>
                </span>
                Kategoriler
              </summary>
              <div data-motion="megamenu" className="absolute left-0 top-full z-(--z-megamenu) mt-2 w-[min(92vw,52rem)] overflow-hidden rounded-lg bg-white shadow-overlay">
                <RecolorZone kind="menu" link={["header-accent"]} className="grid gap-4 p-5 md:grid-cols-[1fr_16rem]">
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {["Cilt Bakımı", "Saç Bakımı", "Vücut Bakımı", "Ağız ve Diş", "Ev ve Temizlik", "Setler"].map((t) => (
                      <li key={t} data-motion-part="tile" className="overflow-hidden rounded-md bg-surface-muted p-3 text-sm font-medium">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-md bg-accent-soft p-3">
                    <p className="mb-2 text-xs uppercase tracking-eyebrow text-accent-text">Öne çıkan</p>
                    <div className="grid gap-2">
                      {products.slice(0, 2).map((p) => (
                        <a key={p.id} href={p.href} {...accentTriggerProps(p.accent)} className="block rounded-sm bg-white p-2 text-sm ring-1 ring-line">
                          {p.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </RecolorZone>
                <StripeGrow trigger="load" variant="thin" />
              </div>
            </details>
            <div data-motion="H3" className="ml-auto hidden rounded-pill md:block">
              <label htmlFor="lab-q" className="sr-only">
                Ürün ara
              </label>
              <input id="lab-q" type="search" placeholder="Ürün, marka veya kod ara" className="h-10 w-64 rounded-pill border border-line-strong px-4 text-sm outline-none" />
            </div>
            <a href="#uye" data-motion="H8" className="rounded-pill bg-green-700 px-4 py-2 text-sm font-medium text-white">
              Üye ol <span data-motion-part="leaf" aria-hidden="true" className="inline-block">❦</span>
            </a>
          </div>
        </div>
        <nav data-motion-part="sub" aria-label="Öne çıkan bağlantılar" className="bg-white">
          <ul data-motion="H7" className="mx-auto flex max-w-page gap-6 px-gutter pb-2 text-sm">
            <li>
              <a href="#vitrin">Türkiye&apos;de satışta</a>
            </li>
            <li>
              <a href="#pv">PV nedir?</a>
            </li>
            <li>
              <a href="#kesfet">Setler</a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="icerik" tabIndex={-1} className="outline-none">
        {/* ---------------------------------------------------------------- hero: M-2 … M-6 */}
        <section data-motion="M-2" className="relative mx-auto grid max-w-wide gap-6 px-gutter pt-8 lg:grid-cols-12" aria-labelledby="lab-h1">
          <div data-motion-part="media" className="relative aspect-[4/5] overflow-hidden rounded-lg lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:aspect-[16/11]">
            <Parallax className="absolute inset-0" points={["M-4"]}>
              <Image src="/images/stock/hero-bright-leaves-sky.webp" alt="" fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            </Parallax>
            {hero.map((p, i) => (
              <div
                key={p.id}
                data-motion-part="packshot"
                className="absolute"
                style={{ ...cssVars({ "--motion-i": i }), right: `${8 + i * 22}%`, bottom: `${10 + (i % 2) * 16}%` }}
              >
                <Float points={["M-3"]} style={cssVars({ "--motion-ambient-delay": `${900 + i * 300}ms` })}>
                  <a href={p.href} className="grid size-28 place-items-center rounded-pill bg-accent-soft shadow-card">
                    <Image src={p.image!.src} alt={p.image!.alt} width={80} height={80} className="object-contain" />
                  </a>
                </Float>
              </div>
            ))}
          </div>
          <div data-motion-part="panel" className="relative z-10 self-center rounded-lg bg-white p-8 shadow-lift lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <div data-motion-part="leaf" className="pointer-events-none absolute -left-10 -top-14 w-40 opacity-70">
              <LeafSway points={["M-6"]}>
                <LeafCluster />
              </LeafSway>
            </div>
            <p data-motion-part="eyebrow" className="font-display text-sm font-bold uppercase tracking-eyebrow text-accent-text">
              Greenleaf artık Türkiye&apos;de
            </p>
            <h1 id="lab-h1" data-motion-part="title" className="mt-3 text-display">
              Doğadan ilham, her gün için bakım
            </h1>
            <p data-motion-part="lead" className="mt-4 text-lg text-ink-muted">
              Hareket laboratuvarı: tüm hareket noktaları gerçek veriyle, tek sayfada.
            </p>
            <div data-motion-part="cta" className="mt-6 flex flex-wrap items-center gap-4">
              <MagneticHover as="span" className="inline-block">
                <a href="#vitrin" className="inline-flex min-h-control-lg items-center rounded-pill bg-green-700 px-7 font-medium text-white">
                  Alışverişe başla
                </a>
              </MagneticHover>
              <a href="#pv" className="font-medium text-accent-text underline-offset-4 hover:underline">
                Cildine uygun ürünü bul →
              </a>
            </div>
            <p data-motion-part="trust" className="mt-5 text-xs text-ink-muted">
              Orijinal Greenleaf ürünleri · ISO 22716 ve GMP belgeli üretim
            </p>
          </div>
          <div className="lg:col-span-12">
            <StripeGrow trigger="load" point="M-5" />
          </div>
        </section>

        {/* ---------------------------------------------------------------- category strip: M-7, M-8 */}
        <section className="mx-auto mt-section-tight max-w-page px-gutter" aria-label="Kategoriler">
          <ul className="flex flex-wrap gap-6">
            {["cilt-bakimi", "sac-bakimi", "vucut-bakimi", "agiz-ve-dis-bakimi", "ev-ve-temizlik", "setler"].map((c) => (
              <li key={c} data-motion="M-7">
                <a href={`/kategori/${c}`} data-motion="M-8" className="grid w-28 justify-items-center gap-2 text-center text-sm font-medium">
                  <span className="relative grid size-28 place-items-center">
                    <span
                      data-motion-part="ring"
                      aria-hidden="true"
                      className="absolute -inset-1 rounded-pill"
                      style={{
                        background: "conic-gradient(var(--stripe-1) 0 33%, var(--stripe-2) 0 66%, var(--stripe-3) 0)",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                      }}
                    />
                    <span data-motion-part="media" className="relative block size-28 overflow-hidden rounded-pill bg-accent-soft">
                      <Image src={`/images/stock/cat-${c === "cilt-bakimi" ? "vucut-bakimi" : c}.webp`} alt="" fill sizes="112px" className="object-cover" />
                    </span>
                  </span>
                  {c.replace(/-/g, " ")}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------------- showcase 1: Z3 recolor, M-9, M-11 */}
        <RecolorZone
          kind="showcase"
          as="section"
          id="vitrin"
          aria-labelledby="lab-v1"
          className="relative mt-section-tight overflow-hidden bg-accent-soft py-section-tight"
        >
          <div className="pointer-events-none absolute -right-16 -top-10 w-72" data-motion-part="breathe">
            <LeafCluster />
          </div>
          <div className="relative mx-auto max-w-page px-gutter">
            <p className="font-display text-sm font-bold uppercase tracking-eyebrow text-accent-text">Hemen sepete</p>
            <StripeGrow trigger="none" variant="inline" className="mt-2" />
            <h2 id="lab-v1" className="mt-3 text-3xl">
              Türkiye&apos;de satışta
            </h2>
            <ul className="mt-8 grid gap-grid-gap sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 8).map((p) => (
                <li key={p.id} data-motion="M-9">
                  <Card p={p} />
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-4">
              <LabCart />
              <LabHeart />
            </div>
          </div>
        </RecolorZone>

        {/* ---------------------------------------------------------------- skin band: M-13, M-14 */}
        <section className="bg-blue-50 py-section-tight" aria-labelledby="lab-skin">
          <div className="mx-auto grid max-w-page items-center gap-10 px-gutter md:grid-cols-2">
            <div>
              <h2 id="lab-skin" className="text-3xl">
                Cildine uygun ürünü 1 dakikada bul
              </h2>
              <ul className="mt-4 space-y-2">
                <li data-motion="M-14">4 kısa soru</li>
                <li data-motion="M-14">Kişisel rutin önerisi</li>
                <li data-motion="M-14">Türkiye&apos;de satışta olanlar önce</li>
              </ul>
            </div>
            <ul data-motion="M-13" className="relative flex h-56 items-end justify-center">
              {["skin-texture-aloe", "skin-texture-dewy-leaf", "skin-leaf-water-drops", "texture-fern-macro", "pv-dewdrop-leaf"].map((img, i) => (
                <li
                  key={img}
                  className="relative -mx-6 h-48 w-32 overflow-hidden rounded-lg shadow-card ring-4 ring-white"
                  style={{ rotate: `${(i - 2) * 9}deg`, transformOrigin: "50% 120%" }}
                >
                  <Image src={`/images/stock/${img}.webp`} alt="" fill sizes="128px" className="object-cover" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------------- manifesto: M-15, M-16 */}
        <section className="mx-auto max-w-page px-gutter py-section text-center" aria-label="Marka mesajı">
          <WordReveal
            as="blockquote"
            className="mx-auto max-w-3xl font-display text-3xl"
            text="Suzhou'dan dünyaya: doğaya saygıyla geliştirilen, her gün güvenle kullanılan ürünler."
          />
          <ul className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {ICON_PATHS.map((d, i) => (
              <li key={d} data-motion="M-14">
                <svg data-motion="M-16" viewBox="0 0 24 24" className="mx-auto size-16 text-green-700" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle data-motion-part="fill" cx="12" cy="12" r="11" fill="var(--color-green-50, #f1f8ee)" stroke="none" />
                  <path d={d} />
                </svg>
                <p className="mt-3 font-medium">Kanıt {i + 1}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------------------- showcase 2: tabs M-17 + recolor */}
        <RecolorZone kind="showcase" as="section" id="kesfet" aria-labelledby="lab-v2" className="py-section-tight">
          <div className="mx-auto max-w-page px-gutter">
            <h2 id="lab-v2" className="mb-6 text-3xl">
              Keşfet
            </h2>
            <LabTabs
              tabs={[
                { key: "a", label: "Cilt", content: <Grid products={products.slice(0, 4)} /> },
                { key: "b", label: "Ev", content: <Grid products={products.slice(4, 8)} /> },
                { key: "c", label: "Setler", content: <Grid products={products.slice(2, 6)} /> },
              ]}
            />
          </div>
        </RecolorZone>

        {/* ---------------------------------------------------------------- PV + membership: M-18, M-19, M-20 */}
        <section id="pv" className="bg-lime-50 py-section-tight" aria-labelledby="lab-pv">
          <div className="mx-auto grid max-w-page items-center gap-10 px-gutter md:grid-cols-2">
            <div>
              <h2 id="lab-pv" className="text-3xl">
                Her ürünün bir puan değeri var: PV
              </h2>
              <div data-motion-part="total" className="mt-6 inline-flex items-baseline gap-2 rounded-lg bg-white px-6 py-4 shadow-card">
                <span className="text-sm text-ink-muted">Toplam PV</span>
                <NumberTicker value={Math.round(pvTotal * 10) / 10} decimals={1} className="font-display text-4xl text-lime-700" />
              </div>
            </div>
            <ul className="grid gap-3">
              {pvChips.map((p) => (
                <li key={p.id} data-motion="M-18" className="flex items-center justify-between rounded-md bg-white p-3 ring-1 ring-line">
                  <span className="line-clamp-1 text-sm">{p.name}</span>
                  <span data-motion-part="chip" className="rounded-pill bg-lime-100 px-3 py-1 text-sm font-medium text-lime-800">
                    {p.pv} PV
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section id="uye" className="mx-auto max-w-page px-gutter py-section-tight" aria-labelledby="lab-member">
          <RevealScale className="overflow-hidden rounded-xl bg-accent-deep text-on-accent-deep">
            <div className="p-10">
              <h2 id="lab-member" className="text-3xl">
                Üye ol, <span className="text-lime-200">üye fiyatıyla</span> al
              </h2>
              <p className="mt-3 max-w-xl opacity-90">Kayıt Greenleaf üzerinden yapılır; sepette üye fiyatı ayrıca görünür.</p>
            </div>
            <StripeGrow trigger="view" />
          </RevealScale>
        </section>

        {/* ---------------------------------------------------------------- story + certificates: M-21, M-22 */}
        <section className="mx-auto grid max-w-page items-center gap-10 px-gutter py-section-tight md:grid-cols-2" aria-labelledby="lab-story">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Parallax className="absolute inset-0" points={["M-22"]}>
              <Image src="/images/stock/story-sun-through-branches.webp" alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            </Parallax>
          </div>
          <div>
            <h2 id="lab-story" className="text-3xl">
              Hikâyemiz
            </h2>
            <ul className="mt-6 flex gap-4">
              {["ISO 22716", "GMP", "Helal"].map((c) => (
                <li key={c}>
                  <HoverLift as="a" href="#uye" points={["M-21"]} className="grid size-24 place-items-center rounded-pill bg-white text-center text-xs font-medium ring-1 ring-line">
                    {c}
                  </HoverLift>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------------- brands: M-23 */}
        <section className="py-section-tight" aria-label="Markalar">
          <Marquee
            className="mx-auto max-w-wide text-center"
            rows={[
              brands.slice(0, 8).map((b) => <span key={b.slug} className="font-display text-2xl tracking-eyebrow text-ink/70">{b.title}</span>),
              brands.slice(8, 16).map((b) => <span key={b.slug} className="font-display text-2xl tracking-eyebrow text-ink/70">{b.title}</span>),
            ]}
          />
        </section>
      </main>

      {/* ---------------------------------------------------------------- footer: F1 … F6 */}
      <footer className="relative mt-section-tight overflow-hidden bg-surface-muted">
        <div className="pointer-events-none absolute -bottom-8 right-0 w-64 opacity-30">
          <LeafSway points={["F2"]}>
            <LeafCluster />
          </LeafSway>
        </div>
        <div className="relative mx-auto grid max-w-page gap-8 px-gutter py-12 md:grid-cols-3">
          <details data-motion="F5" open className="md:pointer-events-none">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
              Alışveriş <span data-motion-part="chevron" aria-hidden="true">⌄</span>
            </summary>
            <ul data-motion="F3" className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#vitrin">Türkiye&apos;de satışta</a>
              </li>
              <li>
                <a href="#pv">PV nedir?</a>
              </li>
            </ul>
          </details>
          <ul className="flex gap-3">
            {["ISO", "GMP"].map((c) => (
              <li key={c}>
                <a href="#uye" data-motion="F4" className="grid size-16 place-items-center rounded-pill bg-white text-xs ring-1 ring-line">
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <StripeGrow trigger="view" point="F1" />
        <button type="button" data-motion="F6" className="fixed bottom-6 right-6 z-30 grid size-12 place-items-center rounded-pill bg-white shadow-card ring-1 ring-line" aria-label="Başa dön">
          ↑
        </button>
      </footer>
    </>
  );
}

function Grid({ products }: { products: ProductSummary[] }) {
  return (
    <Stagger as="ul" className="grid gap-grid-gap sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <li key={p.id}>
          <Card p={p} />
        </li>
      ))}
    </Stagger>
  );
}
