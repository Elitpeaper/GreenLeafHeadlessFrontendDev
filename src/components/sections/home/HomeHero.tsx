import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { ScenePremiumFrame } from "@/components/illustrations/scenes";
import { BadgeDrop, BadgePv, LeafLanceSpecimen, LeafOvalSpecimen, SceneHeroLeaves, TextureGrain } from "@/components/illustrations";
import { SkinTexture } from "@/components/finder/SkinTexture";
import { HeroIntro, IntroLogo } from "@/components/motion";
import { ArrowRight } from "@/components/ui/lucide";
import { SKIN_TYPES } from "@/lib/catalog/skin";
import type { Collection, ProductSummary } from "@/lib/products";
import { ThemeScope } from "@/lib/theme/ThemeScope";
import { tRaw } from "@/lib/ui-text";
import { t } from "@/components/sections/copy";
import { ATMOSPHERE } from "../media";
import { InlineStripe } from "../parts";
import { creamCta } from "../PageHero";
import { PhotoFrame, Sticker, layerVars } from "./HeroCollage";
import { HeroSwiper } from "./HeroSwiper";

/**
 * Home hero "Mühür" (K-233 + K-172 + K-243, brief §2). ONE scene:
 *  - persistent layers (never slides): forest ground + grain, giant outline word, logo mark (rolls in once), controls;
 *  - rotating layers (5 slides): text block (left) + collage (right). Slide 1's H1 is the page's only h1.
 * The entrance (logo roll, H1 fade, staggered text, collage settle) is pure CSS from the motion system, only on a
 * full page load (K-244), and the swiper clock starts after it (HeroSwiper -> whenHeroIntroDone).
 * Text never sits on a photo, packshot or paper layer; packshots show PV only (hero exception to the price rule).
 */
export function HomeHero({
  heroProducts,
  trProducts,
  premium,
  pvProducts,
}: {
  heroProducts: ProductSummary[];
  trProducts: ProductSummary[];
  premium: Collection | null;
  pvProducts: ProductSummary[];
}) {
  const slides: Array<{ name: string; node: ReactNode }> = [];
  // Final copy (icerik-editoru): ui.tr.json `home.v2.hero.slides` = [{ eyebrow, titleLines[], title, body, cta }] in slide order.
  const copy = tRaw<SlideCopy[]>("home.v2.hero.slides", []);
  const c = (i: number): SlideCopy => copy[i] ?? { eyebrow: "", title: "", body: "", cta: "" };
  const lines = (i: number) => (c(i).titleLines?.length ? c(i).titleLines!.join("\n") : c(i).title);
  const withImg = (list: ProductSummary[]) => list.filter((p) => p.image).slice(0, 3);

  // 1 — brand / nature
  slides.push({
    name: c(0).title,
    node: (
      <SlideFrame
        intro
        eyebrow={c(0).eyebrow}
        title={lines(0)}
        body={c(0).body}
        cta={{ href: "/koleksiyon/turkiyede-satista", label: c(0).cta }}
        secondary={{ href: "/uye-ol", label: t("home.v2.hero.secondary") }}
      >
        <HeroLeavesBack intro />
        <PhotoFrame
          media
          priority
          image={ATMOSPHERE.homeHero}
          mobile={ATMOSPHERE.homeHeroMobile}
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="right-[4%] top-0 aspect-[4/5] w-[78%] -rotate-3 rounded-panel rounded-bl-2xl lg:top-4 lg:w-[88%]"
        />
        <LeafLanceSpecimen
          tone="sand"
          data-motion-part="layer"
          style={layerVars(4, ["-60px", "30px", "-30deg"])}
          className="absolute -bottom-2 left-[2%] z-10 w-14 rotate-[-24deg] lg:-bottom-6 lg:left-[-4%] lg:w-28"
        />
        {withImg(heroProducts).map((p, i) => (
          <Sticker key={p.id} intro product={p} pose={i} i={i + 1} size={STICKER_SIZES[i]!} className={STICKER_AT.s1[i]!} />
        ))}
      </SlideFrame>
    ),
  });

  // 2 — Türkiye'de satışta
  if (trProducts.length >= 3) {
    slides.push({
      name: c(1).title,
      node: (
        <SlideFrame
          eyebrow={c(1).eyebrow}
          title={lines(1)}
          body={c(1).body}
          cta={{ href: "/urunler", label: c(1).cta }}
        >
          <LeafOvalSpecimen tone="deep" className="absolute -right-[2%] -top-[2%] w-[46%] rotate-[28deg] lg:-top-[6%]" />
          <LeafLanceSpecimen tone="sand" className="absolute left-[2%] top-[4%] w-[24%] -rotate-[20deg] lg:left-[0%] lg:top-[6%] lg:w-[22%]" />
          <PhotoFrame
            image={ATMOSPHERE.homeHero2}
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="right-[6%] top-[6%] aspect-[4/5] w-[74%] rotate-2 rounded-panel rounded-br-2xl lg:top-10 lg:w-[84%]"
          />
          {withImg(trProducts).map((p, i) => (
            <Sticker key={p.id} product={p} pose={i + 1} i={i + 1} size={STICKER_SIZES[i]!} className={STICKER_AT.s2[i]!} />
          ))}
        </SlideFrame>
      ),
    });
  }

  // 3 — premium gold
  const goldLead = premium?.products.find((p) => p.image) ?? null;
  if (premium && goldLead) {
    slides.push({
      name: c(2).title,
      node: (
        <ThemeScope theme="premium-gold" className="h-full">
          <SlideFrame
            premium
            eyebrow={c(2).eyebrow}
            title={lines(2)}
            body={c(2).body}
            cta={{ href: premium.href, label: c(2).cta }}
          >
            <div className="absolute inset-x-[4%] bottom-[6%] top-[2%] rounded-panel bg-forest-950 shadow-long ring-1 ring-gold-400/50 lg:inset-x-[2%] lg:top-6" />
            <ScenePremiumFrame className="absolute inset-x-[4%] bottom-[6%] top-[2%] size-auto h-[92%] w-[92%] opacity-80 lg:inset-x-[2%] lg:top-6" />
            <PhotoFrame
              image={ATMOSPHERE.premium}
              sizes="(min-width: 1024px) 30vw, 60vw"
              className="right-[10%] top-[10%] aspect-[3/4] w-[46%] rotate-3 rounded-panel rounded-bl-2xl ring-2 ring-gold-300/70 lg:top-16 lg:w-[50%]"
            />
            <span className="absolute bottom-[12%] left-[10%] block size-28 rotate-[-4deg] sm:size-36 lg:left-[8%] lg:size-52">
              <span className="absolute -inset-6 rounded-full [background:var(--gradient-gold-glow)]" />
              <span className="absolute inset-0 rounded-full bg-gold-50 shadow-gold ring-1 ring-gold-300" />
              {goldLead.image && (
                <Image src={goldLead.image.src} alt="" fill sizes="208px" draggable={false} className="rounded-full object-contain p-[14%] mix-blend-multiply" />
              )}
            </span>
          </SlideFrame>
        </ThemeScope>
      ),
    });
  }

  // 4 — PV
  if (pvProducts.some((p) => p.pv != null)) {
    slides.push({
      name: c(3).title,
      node: (
        <SlideFrame
          eyebrow={c(3).eyebrow}
          title={lines(3)}
          body={c(3).body}
          cta={{ href: "/pv-nedir", label: c(3).cta }}
        >
          <span className="absolute right-[2%] top-[2%] block aspect-square w-[82%] rounded-full bg-brand-lime lg:right-[-2%] lg:top-2 lg:w-[96%]" />
          <PhotoFrame
            image={ATMOSPHERE.pvHero}
            sizes="(min-width: 1024px) 30vw, 60vw"
            className="bottom-[4%] left-[2%] aspect-[3/2] w-[44%] -rotate-3 rounded-tile rounded-tr-2xl lg:bottom-[8%] lg:left-[-4%] lg:w-[50%]"
          />
          <BadgePv className="absolute right-[10%] top-[10%] size-28 sm:size-36 lg:right-[8%] lg:top-[10%] lg:size-60" />
          {withImg(pvProducts).map((p, i) => (
            <Sticker key={p.id} product={p} pose={i} i={i + 1} size={STICKER_SIZES[i]!} className={STICKER_AT.s4[i]!} />
          ))}
        </SlideFrame>
      ),
    });
  }

  // 5 — skin finder
  slides.push({
    name: c(4).title,
    node: (
      <SlideFrame
        eyebrow={c(4).eyebrow}
        title={lines(4)}
        body={c(4).body}
        cta={{ href: "/cilt-tipine-gore", label: c(4).cta }}
      >
        <span className="absolute right-[2%] top-[2%] block aspect-square w-[82%] rounded-full bg-brand-blue lg:right-[-2%] lg:top-2 lg:w-[96%]" />
        <PhotoFrame
          image={ATMOSPHERE.finderHero}
          sizes="(min-width: 1024px) 30vw, 60vw"
          className="right-[12%] top-[6%] aspect-[4/5] w-[56%] rotate-2 rounded-panel rounded-bl-2xl lg:right-[10%] lg:top-10 lg:w-[62%]"
        />
        <BadgeDrop className="absolute left-[4%] top-[6%] size-20 sm:size-28 lg:left-[0%] lg:top-[8%] lg:size-36" />
        <div className="absolute inset-x-[2%] bottom-0 flex justify-center gap-1.5 lg:bottom-[2%] lg:gap-2">
          {SKIN_TYPES.map((s, i) => (
            <span
              key={s.slug}
              className={`w-[19%] rounded-lg bg-cream-50 p-1.5 shadow-sticker transition-[translate,rotate] duration-250 motion-safe:hover:-translate-y-1 ${
                i % 2 ? "rotate-[4deg]" : "-rotate-[3deg]"
              }`}
            >
              <SkinTexture type={s.slug} className="aspect-square w-full" />
            </span>
          ))}
        </div>
      </SlideFrame>
    ),
  });

  return (
    <HeroIntro as="div" className="relative isolate overflow-hidden bg-forest-800 bg-gradient-forest-hero text-cream-100">
      {/* persistent ground: grain + giant outline word (decor, aria-hidden). Sits behind the collage, right side. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <TextureGrain strength={0.12} />
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.2em] right-[-2%] -z-10 select-none text-[6rem] font-bold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_rgb(239_223_195/0.22)] sm:text-[9rem] lg:text-colossal"
      >
        {t("home.v2.hero.decor")}
      </span>

      <HeroSwiper
        slides={slides.map((s, i) => <Fragment key={i}>{s.node}</Fragment>)}
        names={slides.map((s) => s.name)}
        labels={{
          region: t("home.v2.hero.region"),
          slide: t("home.v2.hero.controls.status"),
          prev: t("home.v2.hero.controls.prev"),
          next: t("home.v2.hero.controls.next"),
          pause: t("home.v2.hero.controls.pause"),
          play: t("home.v2.hero.controls.play"),
          goTo: t("home.v2.hero.controls.goTo"),
        }}
      />

      {/* persistent logo mark (K-233, K-239): official artwork untouched; only this wrapper rolls in. Not a link: the accessible name lives in the header logo. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20">
        <div className="mx-auto max-w-wide px-gutter pt-6 lg:pt-8">
          <IntroLogo className="w-[88px] rounded-full shadow-badge lg:w-[136px]">
            <Image src="/brand/greenleaf-mark.svg" alt="" width={136} height={136} priority unoptimized draggable={false} className="block h-auto w-full" />
          </IntroLogo>
        </div>
      </div>
    </HeroIntro>
  );
}

interface SlideCopy {
  eyebrow: string;
  titleLines?: string[];
  title: string;
  body: string;
  cta: string;
}

/* Responsive sizes and anchor points of the packshot stickers per slide (Ø 168/140/120 desktop, 112/96/80 mobile). */
const STICKER_SIZES = ["size-24 lg:size-40", "size-20 lg:size-36", "size-16 lg:size-28"];
const STICKER_AT = {
  s1: ["left-[-2%] top-[14%] lg:left-[-8%] lg:top-[18%]", "right-[-1%] top-[44%] lg:right-[-3%] lg:top-[52%]", "left-[34%] bottom-[2%] lg:left-[16%] lg:bottom-[16%]"],
  s2: ["left-[-2%] top-[30%] lg:left-[-8%] lg:top-[34%]", "right-[-1%] top-[8%] lg:right-[-3%] lg:top-[8%]", "right-[8%] bottom-[2%] lg:right-[6%] lg:bottom-[2%]"],
  s4: ["left-[6%] top-[2%] lg:left-[2%] lg:top-[4%]", "right-[-1%] bottom-[22%] lg:right-[-3%] lg:bottom-[24%]", "right-[26%] bottom-[2%] lg:right-[24%] lg:bottom-[6%]"],
};

/** Paper-cut leaves behind slide 1's photo (SceneHeroLeaves, parallax). */
function HeroLeavesBack({ intro = false }: { intro?: boolean }) {
  return (
    <div
      {...(intro ? { "data-motion-part": "layer" } : null)}
      style={layerVars(0, ["60px", "0px", "12deg"])}
      className="absolute -right-[16%] -top-[6%] w-[104%] lg:-right-[22%] lg:-top-[4%] lg:w-[128%]"
    >
      <SceneHeroLeaves className="h-auto w-full" />
    </div>
  );
}

/**
 * One slide = text block (left) + collage (right). Mobile: text on top (flat ground), collage below, controls under it.
 * The logo row above the text is the persistent layer (top padding reserves its space).
 */
function SlideFrame({
  intro = false,
  premium = false,
  eyebrow,
  title,
  body,
  cta,
  secondary,
  children,
}: {
  intro?: boolean;
  premium?: boolean;
  eyebrow: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
  secondary?: { href: string; label: string };
  children: ReactNode;
}) {
  const Heading = intro ? "h1" : "h2";
  const part = (name: string) => (intro ? { "data-motion-part": name } : null);
  const lines = title.split("\n");
  return (
    <div className="relative mx-auto flex h-full min-h-[max(30rem,calc(100svh-14.5rem))] max-w-wide flex-col px-gutter pb-6 md:grid md:min-h-[max(34rem,calc(100svh-14.5rem))] md:grid-cols-12 md:gap-6 md:pb-6 lg:min-h-[max(37.5rem,calc(100svh-13.5rem))] lg:gap-8">
      <div className="relative z-10 pt-[calc(1.5rem+88px+1rem)] md:col-span-7 lg:col-span-7 lg:pt-[calc(2rem+136px+1.5rem)]">
        {/* eyebrow sits beside the persistent logo mark (bottom-aligned with it) to save a row; it belongs to the slide */}
        <div
          {...part("eyebrow")}
          className="absolute left-[calc(88px+1rem)] top-6 flex h-[88px] flex-col justify-end lg:left-[calc(136px+1.5rem)] lg:top-8 lg:h-[136px]"
        >
          <p className="font-[family-name:var(--font-role-accent)] text-sm font-bold text-lime-200">{eyebrow}</p>
          <InlineStripe className="mt-2" />
        </div>
        <Heading
          {...part("title")}
          className="text-ultra font-bold text-cream-200 lg:[font-size:clamp(3.5rem,calc((100svh-13.5rem-23.75rem)/2.7),var(--text-ultra))]"
        >
          {lines.map((line, i) => (
            <span key={i} className="block">
              {i === lines.length - 1 && line.endsWith(".") ? (
                <>
                  {line.slice(0, -1)}
                  <span className="text-lime-200">.</span>
                </>
              ) : (
                line
              )}{" "}
            </span>
          ))}
        </Heading>
        <p {...part("lead")} className="mt-4 max-w-[34ch] text-lg text-cream-100">
          {body}
        </p>
        <div {...part("cta")} className="mt-5 flex flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-6 lg:mt-6">
          <Link
            href={cta.href}
            draggable={false}
            className={
              premium
                ? "group/cta inline-flex min-h-14 items-center justify-center gap-2 rounded-pill bg-gradient-gold-button px-8 text-lg font-semibold text-ink-deep shadow-gold transition-[filter,box-shadow,translate,scale] duration-250 hover:brightness-105 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.97]"
                : `group/cta ${creamCta} min-h-14`
            }
          >
            {cta.label}
            <ArrowRight size={20} className="transition-transform duration-250 motion-safe:group-hover/cta:translate-x-1" />
          </Link>
          {secondary && (
            <Link href={secondary.href} draggable={false} className="inline-flex min-h-tap items-center gap-2 text-lg font-medium text-cream-100 underline decoration-current underline-offset-4 transition-[color,text-decoration-color] duration-250 hover:text-white">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
      <div aria-hidden="true" className="relative mt-6 h-60 sm:h-80 md:col-span-5 md:col-start-8 md:mb-16 md:mt-0 md:h-auto lg:col-span-5 lg:col-start-8">
        {children}
      </div>
    </div>
  );
}
