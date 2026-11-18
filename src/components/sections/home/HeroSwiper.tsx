"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { Swiper } from "swiper";
import { ChevronLeft, ChevronRight } from "@/components/ui/lucide";
import { whenHeroIntroDone } from "@/lib/motion";
import { motionTier, onMotionTier } from "@/lib/motion/preference";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/a11y";

/**
 * Full-width hero swiper (K-172) on Swiper.js (K-256): fade effect, so the persistent ground + logo (HomeHero, K-243)
 * never move; only each slide's text block + collage cross-fade. Slides are server-rendered children.
 * Autoplay (Swiper Autoplay) starts only after the K-233 entrance (whenHeroIntroDone) and then gives slide 1 its full
 * interval. It pauses on mouse hover (Swiper), keyboard focus inside and hidden tab (Swiper), has a visible pause
 * button (WCAG 2.2.2) and never starts under reduced motion. The active dot shows the remaining time
 * (autoplayTimeLeft drives one compositor animation per slide, no per-frame style writes; P-07) and autoplay stops while
 * the hero is off screen (IntersectionObserver). Inactive slides are `inert`. Arrow keys work while focus is inside (not page-wide).
 * Swiper core is loaded lazily and initialised on the server-rendered markup (slide 1 is visible before it arrives, so
 * Swiper is not first-load JS). swiper/react is not used: it builds its instance during render, which reads the clock
 * and breaks the static prerender of "/".
 */
const INTERVAL = 7000;

export interface HeroSwiperLabels {
  region: string;
  slide: string; // "{n} / {total}"
  prev: string;
  next: string;
  pause: string;
  play: string;
  goTo: string; // "{n}. slayta git"
}

type BarAnim = { current: { el: HTMLElement; anim: Animation } | null };
/** P-07: stop and forget the active progress-bar animation (class state takes over again). */
const dropBar = (ref: BarAnim) => {
  ref.current?.anim.cancel();
  ref.current = null;
};

const fill = (s: string, n: number, total: number) => s.replace("{n}", String(n)).replace("{total}", String(total));

export function HeroSwiper({ slides, names, labels }: { slides: ReactNode[]; names: string[]; labels: HeroSwiperLabels }) {
  const total = slides.length;
  const root = useRef<HTMLElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const focusIn = useRef(false);
  const el = useRef<HTMLDivElement>(null);
  const api = useRef<Swiper | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false); // site motion tier (K-264)
  const [userPlay, setUserPlay] = useState(false); // explicit "play" while reduced: autoplay only, speed stays gentle
  const [introDone, setIntroDone] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const barAnim = useRef<{ el: HTMLElement; anim: Animation } | null>(null);

  const manual = userPaused || (reduced && !userPlay);
  const allowed = total > 1 && introDone && !manual && onScreen;

  // P-07: no autoplay clock (Swiper rAF + timer) while the hero is scrolled out of view
  useEffect(() => {
    const node = root.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setOnScreen(!!e?.isIntersecting), { threshold: 0 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // K-243: wait for the hero entrance (resolves at once when it does not play: client return, motion off)
  useEffect(() => {
    let live = true;
    whenHeroIntroDone(root.current).then(() => live && setIntroDone(true));
    // K-264: site motion tier (html[data-motion]) is the single gate; the OS setting no longer stops autoplay
    const onTier = () => setReduced(motionTier() !== "on");
    onTier();
    const off = onMotionTier(onTier);
    return () => {
      live = false;
      off();
    };
  }, []);

  useEffect(() => {
    let s: Swiper | null = null;
    let live = true;
    import("@/lib/motion/swiper").then(({ Swiper, A11y, Autoplay, EffectFade }) => {
      if (!live || !el.current) return;
      s = new Swiper(el.current, {
        modules: [Autoplay, EffectFade, A11y],
        effect: "fade",
        fadeEffect: { crossFade: true },
        speed: 600,
        rewind: true,
        grabCursor: true,
        autoplay: { delay: INTERVAL, disableOnInteraction: false, pauseOnMouseEnter: true },
        a11y: { itemRoleDescriptionMessage: "slide", slideRole: "group", slideLabelMessage: "" },
        on: {
          init: (sw) => void sw.autoplay.stop(), // started by the effect below, after the K-233 entrance
          slideChange: (sw) => {
            setActive(sw.activeIndex);
            dropBar(barAnim);
          },
          // P-07: the fill is one linear WAAPI animation (compositor). Swiper's per-frame time-left only keeps it in step:
          // it is paused / resumed with autoplay and re-seeked only when it drifts, so nothing is written per frame.
          autoplayTimeLeft: (sw, _ms, left) => {
            const bar = bars.current[sw.activeIndex];
            if (!bar) return;
            let b = barAnim.current;
            if (!b || b.el !== bar) {
              dropBar(barAnim);
              const anim = bar.animate([{ scale: "0 1" }, { scale: "1 1" }], { duration: INTERVAL, easing: "linear", fill: "both" });
              anim.pause();
              b = barAnim.current = { el: bar, anim };
            }
            const want = Math.min(1, Math.max(0, 1 - left)) * INTERVAL;
            const paused = sw.autoplay.paused;
            if (paused && b.anim.playState === "running") b.anim.pause();
            else if (!paused && b.anim.playState !== "running") b.anim.play();
            if (Math.abs(Number(b.anim.currentTime ?? 0) - want) > 120) b.anim.currentTime = want;
          },
          autoplayStop: () => dropBar(barAnim),
          // a finished transition must not resume while keyboard focus is inside
          autoplayResume: (sw) => void (focusIn.current && sw.autoplay.pause()),
        },
      });
      api.current = s;
      setReady(true);
    });
    return () => {
      live = false;
      api.current = null;
      dropBar(barAnim);
      s?.destroy(true, false);
    };
  }, []);


  // K-231: opacity cross-fade stays smooth in every tier, just shorter in the gentle tier
  useEffect(() => {
    if (ready && api.current) api.current.params.speed = reduced ? 250 : 600;
  }, [ready, reduced]);

  useEffect(() => {
    const a = ready ? api.current?.autoplay : undefined;
    if (!a) return;
    if (allowed && !a.running) {
      a.start();
      if (focusIn.current) a.pause();
    } else if (!allowed && a.running) a.stop();
  }, [ready, allowed]);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    if (e.key === "ArrowRight") api.current?.slideNext();
    else api.current?.slidePrev();
  };

  // K-231: transition list covers colour AND movement; movement only with motion-safe (reduced = colour fade only)
  const ctrl =
    "grid size-12 place-items-center rounded-full bg-cream-50 text-forest-900 shadow-cta-cream ring-1 ring-cream-200 transition-[background-color,box-shadow,translate,scale] duration-250 hover:bg-cream-100 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-95";

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="relative z-10"
      onFocus={() => {
        focusIn.current = true;
        if (api.current?.autoplay.running) api.current.autoplay.pause();
      }}
      onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
        focusIn.current = false;
        const sw = api.current;
        if (sw?.autoplay.running && sw.autoplay.paused && !sw.el.matches(":hover")) sw.autoplay.resume();
      }}
      onKeyDown={onKeyDown}
    >
      <div ref={el} className="swiper">
        <div className="swiper-wrapper">
          {slides.map((sl, i) => (
            <div key={i} className="swiper-slide overflow-hidden" aria-label={`${fill(labels.slide, i + 1, total)}: ${names[i] ?? ""}`} inert={i !== active}>
              {sl}
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <div className="pointer-events-none relative z-20 pb-4 md:absolute md:inset-x-0 md:bottom-6 md:pb-0">
          <div className="mx-auto flex max-w-wide items-center justify-start gap-3 px-gutter md:justify-end">
            <div className="pointer-events-auto flex items-center gap-1 rounded-pill bg-cream-50 p-1.5 shadow-cta-cream ring-1 ring-cream-200">
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full text-forest-900 transition-colors duration-250 hover:bg-cream-100"
                aria-label={manual ? labels.play : labels.pause}
                aria-pressed={manual}
                onClick={() => {
                  if (manual) {
                    setUserPaused(false);
                    if (reduced) setUserPlay(true);
                  } else if (reduced) setUserPlay(false);
                  else setUserPaused(true);
                }}
              >
                {manual ? <PlayIcon /> : <PauseIcon />}
              </button>
              <ol className="flex items-center pr-2">
                {slides.map((_, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => api.current?.slideTo(i)}
                      aria-label={fill(labels.goTo, i + 1, total)}
                      aria-current={i === active ? "true" : undefined}
                      className="group grid h-11 w-9 place-items-center px-1"
                    >
                      {/* K-231: fixed-width bar (no width animation); state = colour + the remaining-time fill */}
                      <span
                        className={`relative block h-1.5 w-full overflow-hidden rounded-pill transition-colors duration-250 ${
                          i === active ? "bg-green-200" : "bg-line-strong group-hover:bg-ink-muted"
                        }`}
                      >
                        <span
                          ref={(el) => {
                            bars.current[i] = el;
                          }}
                          className={`absolute inset-0 origin-left rounded-pill bg-green-700 transition-none ${i === active && manual ? "" : "scale-x-0"}`}
                        />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="pointer-events-auto hidden gap-2 md:flex">
              <button type="button" className={ctrl} aria-label={labels.prev} onClick={() => api.current?.slidePrev()}>
                <ChevronLeft size={22} />
              </button>
              <button type="button" className={ctrl} aria-label={labels.next} onClick={() => api.current?.slideNext()}>
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" fill="currentColor">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}
