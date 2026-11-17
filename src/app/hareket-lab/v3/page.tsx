import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Collage, Drift, HeroIntro, IntroLogo } from "@/components/motion";
import { getCollection } from "@/lib/products";

/**
 * MOTION LAB v3 (hareket-tasarimcisi prototype): K-231 baseline transitions, K-233 hero intro, K-234 collage/drift.
 * Not linked, noindex. The root layout already mounts <MotionRoot/>. Proof scripts: docs/qa/ekran/motion-v3/.
 */
export const metadata: Metadata = {
  title: "Hareket laboratuvarı v3",
  robots: { index: false, follow: false },
};

const v = (o: Record<string, string | number>) => o as CSSProperties;

export default async function MotionLabV3Page() {
  const collection = await getCollection("turkiyede-satista", { limit: 8 });
  const products = (collection?.products ?? []).filter((p) => p.image).slice(0, 5);
  const heroImg = products[0]?.image;

  return (
    <main id="icerik">
      {/* ---------------------------------------------------------------- K-233 hero intro (M-24), 100vh */}
      <HeroIntro id="lab-hero" className="relative grid min-h-svh overflow-hidden bg-gradient-forest-hero text-cream-100 lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center gap-6 px-6 py-16 lg:px-16">
          <IntroLogo className="w-[88px] lg:w-[136px]">
            <Image src="/brand/greenleaf-mark.svg" alt="Greenleaf" width={136} height={136} priority unoptimized />
          </IntroLogo>
          <p data-motion-part="eyebrow" className="text-sm font-semibold uppercase tracking-eyebrow text-lime-200">
            Greenleaf Türkiye
          </p>
          <h1 data-motion-part="title" className="max-w-[14ch] text-5xl leading-[1.02] lg:text-7xl">
            Doğadan gelen bakım, her gün.
          </h1>
          <p data-motion-part="lead" className="max-w-[46ch] text-lg text-cream-100">
            Logo soldan dönerek gelir, ardından başlık belirir. Görsel hiçbir zaman gizlenmez.
          </p>
          <div data-motion-part="cta" className="flex flex-wrap gap-3">
            <Link id="lab-v1" href="/hareket-lab" className="inline-flex min-h-12 items-center rounded-pill border border-cream-100 px-7 font-semibold text-cream-100 hover:bg-cream-100 hover:text-forest-900">
              Laboratuvar v1
            </Link>
            <a href="#k231" className="inline-flex min-h-12 items-center rounded-pill bg-cream-50 px-7 font-semibold text-forest-900 hover:bg-white">
              Geçişleri dene
            </a>
          </div>
        </div>
        <div data-motion-part="media" className="relative min-h-[50vh]">
          <span data-motion-part="layer" aria-hidden="true" className="absolute left-[12%] top-[14%] size-56 rounded-full bg-green-700/50" style={v({ "--i": 0, "--from-x": "-60px", "--from-r": "-20deg" })} />
          <span data-motion-part="layer" aria-hidden="true" className="absolute bottom-[12%] right-[10%] size-40 rotate-6 rounded-tile bg-lime-200/40" style={v({ "--i": 1, "--from-x": "80px", "--from-r": "18deg" })} />
          {heroImg && <Image src={heroImg.src} alt={heroImg.alt} fill priority sizes="50vw" className="object-contain p-16" />}
        </div>
      </HeroIntro>

      {/* ---------------------------------------------------------------- K-231 baseline: hover enter and leave are smooth */}
      <section id="k231" className="bg-cream-50 px-6 py-16 lg:px-16">
        <h2 className="text-3xl">K-231 · yumuşak giriş ve çıkış</h2>
        <p className="mt-2 max-w-[60ch] text-ink-muted">
          Aşağıdaki öğelerin hiçbirinde kendi transition sınıfı yok. Renk, zemin, gölge ve opaklık geçişini motion.css taban katmanı verir.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <button id="lab-btn" type="button" className="min-h-12 rounded-pill bg-green-700 px-7 font-semibold text-white hover:bg-forest-900">
            Birincil düğme
          </button>
          <a id="lab-chip" href="#k231" className="inline-flex min-h-11 items-center rounded-pill border border-green-700 px-5 text-green-700 hover:bg-green-700 hover:text-white">
            Çip / bağlantı
          </a>
          <a id="lab-link" href="#k231" className="text-lg font-medium text-ink hover:text-green-700">
            Metin bağlantısı
          </a>
          <a id="lab-tile" href="#k231" className="block w-64 rounded-tile bg-white p-6 shadow-tile hover:shadow-tile-hover">
            <span className="block font-semibold">Karo</span>
            <span className="mt-1 block text-sm text-ink-muted">gölge 250 ms içinde büyür ve geri döner</span>
          </a>
          <span id="lab-fade" className="inline-block rounded-md bg-forest-900 px-5 py-3 text-cream-100 opacity-60 hover:opacity-100">
            Opaklık
          </span>
        </div>
      </section>

      {/* ---------------------------------------------------------------- K-234 collage + drift */}
      <section className="relative overflow-hidden bg-forest-900 px-6 py-24 text-cream-100 lg:px-16">
        <h2 className="text-3xl">K-234 · kolaj ve derinlik</h2>
        <Collage className="relative mt-10 grid grid-cols-2 gap-6 lg:grid-cols-5">
          {products.map((p, i) => (
            <div
              key={p.id}
              data-motion-part="piece"
              className={`rounded-tile bg-white p-4 shadow-tile ${i % 2 ? "rotate-3" : "-rotate-2"}`}
              style={v({ "--i": i, "--from-x": `${(i - 2) * 40}px`, "--from-r": `${i % 2 ? 14 : -12}deg` })}
            >
              {p.image && (
                <span className="relative block aspect-square">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="20vw" className="object-contain" />
                </span>
              )}
            </div>
          ))}
        </Collage>
        <Drift depth={0.6} aria-hidden="true" className="pointer-events-none absolute -right-10 top-10 size-48 rounded-full bg-green-700/40" />
        <Drift depth={1.4} aria-hidden="true" className="pointer-events-none absolute -left-8 bottom-6 size-32 rounded-full bg-lime-200/30" />
      </section>
    </main>
  );
}
