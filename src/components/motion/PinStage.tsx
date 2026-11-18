"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { loadGsap } from "@/lib/motion/gsap";
import { getLenis } from "@/lib/motion/lenis";
import { onMotionTier } from "@/lib/motion/preference";

/** Viewports that get the pinned scene (Ravena: width > 900; fine pointer so Lenis drives the transform pin). */
export const PIN_STAGE_QUERY = "(min-width: 901px) and (hover: hover) and (pointer: fine)";

/**
 * Ravena-style pinned scene (K-265, K-257; docs/arastirma/penta-hareket-yaklasimi.md §5, hareket.md §27).
 * A 100vh stage is pinned while vertical scrolling scrubs a timeline (scrub 2, snap per item):
 *  - [data-stage-image] ×n  photos stacked in one frame; each next one opens from the bottom like a curtain
 *                           (outer yPercent 100 -> 0, its [data-stage-img] child -100 -> 0: transform-only clip)
 *  - [data-stage-text]  ×n  stacked text blocks; the active one gets [data-active] (CSS: fade + 30 px rise, .45 s, .3 s delay)
 *  - [data-stage-point] ×n  progress bar ticks; [data-stage-marker] slides to the active tick
 *  - [data-stage-side] text giant outline title, stroke drawn with the scroll (stroke-dashoffset)
 *  - [data-stage-fill]      ground layer that grows (scaleY) while the stage scrolls in
 * Only in the full tier on PIN_STAGE_QUERY. Otherwise the stage stays display:none and the sibling [data-stage-list]
 * (Swiper strip) is the content. The host gets [data-stage-ready] once the pin exists (CSS swaps the two then; the
 * stage sits far below the fold, so the swap shifts nothing in view). Keyboard: focusing a link of item i scrolls to i.
 */
export function PinStage({ children, ...rest }: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    const stage = host?.querySelector<HTMLElement>("[data-pin-stage]");
    if (!host || !stage) return;
    const html = document.documentElement;
    const can = window.matchMedia(PIN_STAGE_QUERY);
    let live = true;
    let mm: { revert: () => void } | null = null;
    const wanted = () => live && can.matches && html.dataset.motion === "on";

    const sync = () => {
      if (!wanted()) {
        mm?.revert();
        mm = null;
        return;
      }
      if (mm) return;
      loadGsap()
        .then(({ gsap, ScrollTrigger }) => {
          if (mm || !wanted()) return;
          const q = <T extends Element>(s: string) => Array.from(stage.querySelectorAll<T>(s));
          const images = q<HTMLElement>("[data-stage-image]");
          const texts = q<HTMLElement>("[data-stage-text]");
          const points = q<HTMLElement>("[data-stage-point]");
          const marker = stage.querySelector<HTMLElement>("[data-stage-marker]");
          const side = stage.querySelector<SVGTextElement>("[data-stage-side] text");
          const fill = host.querySelector<HTMLElement>("[data-stage-fill]");
          const n = texts.length;
          if (n < 2) return;
          const m = gsap.matchMedia();
          mm = m;
          m.add(PIN_STAGE_QUERY, () => {
            const headerH = () => Math.round(document.getElementById("header-accent")?.getBoundingClientRect().height ?? 0);
            const syncHeaderOffset = () => host.style.setProperty("--pin-top", `${headerH()}px`);
            syncHeaderOffset();
            host.setAttribute("data-stage-ready", "");
            let active = -1;
            const setActive = (i: number) => {
              if (i === active) return;
              active = i;
              texts.forEach((t, k) => t.toggleAttribute("data-active", k === i));
              points.forEach((p, k) => p.toggleAttribute("data-active", k <= i));
              const p = points[i];
              if (marker && p) gsap.to(marker, { y: p.offsetTop + p.offsetHeight / 2, duration: 0.3, ease: "power1.out" });
            };
            setActive(0);

            // curtains: every photo after the first starts closed (below its frame)
            images.forEach((im, i) => {
              if (!i) return;
              gsap.set(im, { yPercent: 100 });
              gsap.set(im.querySelector("[data-stage-img]"), { yPercent: -100 });
            });

            const tl = gsap.timeline({
              defaults: { ease: "none", duration: 1 },
              scrollTrigger: {
                trigger: stage,
                // K-292: the sticky header stays visible, so the stage is pinned right under it
                start: () => {
                  syncHeaderOffset();
                  return `top top+=${headerH()}`;
                },
                end: () => `+=${Math.round(innerHeight * 0.85 * (n - 1))}`,
                pin: true,
                // transform pin: a fixed pin is reported by Chrome as a ~0.9 layout shift (K-260 measurement)
                pinType: "transform",
                scrub: 2,
                snap: { snapTo: 1 / (n - 1), duration: { min: 0.25, max: 0.7 }, delay: 0.12, ease: "power1.inOut" },
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onUpdate: (self) => setActive(Math.min(n - 1, Math.max(0, Math.round(self.progress * (n - 1))))),
              },
            });
            // depth (brief fotograf-ve-svg-yerlesim §2): photos cropped at scale 1.12 drift ±6 % sideways over the pin;
            // the text never moves with them
            const photos = images.map((im) => im.querySelector("img")).filter((x): x is HTMLImageElement => !!x);
            gsap.set(photos, { scale: 1.12 });
            tl.fromTo(photos, { xPercent: 3 }, { xPercent: -3, duration: n - 1 }, 0);
            images.forEach((im, i) => {
              if (!i) return;
              const at = i - 1;
              tl.to(im, { yPercent: 0 }, at)
                .to(im.querySelector("[data-stage-img]"), { yPercent: 0 }, at)
                .fromTo(im.querySelector("img"), { scale: 1.3 }, { scale: 1.12 }, at)
                .to(images[i - 1]!.querySelector("img"), { scale: 1.2 }, at);
            });
            const st = tl.scrollTrigger!;

            // the giant outline title draws itself while the stage scrolls in and through the pin
            if (side) {
              const len = Math.ceil(side.getComputedTextLength() * 1.6) || 2000;
              // P-12: the outline is repainted only when the dash moves a visible step (~1/90 of the stroke): the
              // value snaps, so most scroll frames write the same offset and nothing repaints (the layer is isolated
              // by will-change in motion.css)
              const step = Math.max(4, Math.round(len / 90));
              gsap.fromTo(
                side,
                { strokeDasharray: len, strokeDashoffset: len },
                { strokeDashoffset: 0, ease: "none", snap: { strokeDashoffset: step }, scrollTrigger: { trigger: stage, start: "top bottom", end: () => `top+=${innerHeight} top`, scrub: true } },
              );
            }
            if (fill) {
              gsap.fromTo(fill, { scaleY: 0.35 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: host, start: "top bottom", end: "top top", scrub: true } });
            }

            const onFocus = (e: FocusEvent) => {
              const i = texts.findIndex((t) => t.contains(e.target as Node));
              if (i < 0) return;
              const y = st.start + (i / (n - 1)) * (st.end - st.start);
              const lenis = getLenis();
              if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
              else window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
            };
            stage.addEventListener("focusin", onFocus);
            return () => {
              stage.removeEventListener("focusin", onFocus);
              host.removeAttribute("data-stage-ready");
              host.style.removeProperty("--pin-top");
              texts.forEach((t) => t.removeAttribute("data-active"));
              points.forEach((p) => p.removeAttribute("data-active"));
            };
          });
          ScrollTrigger.refresh();
        })
        .catch(() => {}); // chunk failed: the list (Swiper strip) stays the content; the next sync() retries
    };
    const off = onMotionTier(sync);
    can.addEventListener("change", sync);
    sync();
    return () => {
      live = false;
      off();
      can.removeEventListener("change", sync);
      mm?.revert();
      mm = null;
    };
  }, []);

  // own wrapper: the pin-spacer GSAP inserts lives inside it, not in a parent React renders children into
  return (
    <div ref={ref} data-pin-host="" {...rest}>
      {children}
    </div>
  );
}
