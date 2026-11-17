"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Swiper } from "swiper";
import { motionTier, onMotionTier } from "@/lib/motion/preference";
import "swiper/css";
import "swiper/css/a11y";

/**
 * Card strip on Swiper.js (K-256), the mobile / reduced-tier twin of a <PinStage> (Ravena: ≤ 900 px Swiper,
 * speed 1000, 1 → 1.5 → 2 → 3 slides per view, arrow buttons). Server-rendered slides; until Swiper (lazy chunk)
 * arrives the same markup is a native scroll-snap strip (motion.css [data-swiper-strip]), so it is never empty.
 *
 *   <SwiperStrip prev={<button data-strip-prev …/>} next={<button data-strip-next …/>} label="…">
 *     <div className="swiper-slide">…</div> ×n
 *   </SwiperStrip>
 * Children must be `.swiper-slide` elements. Arrows are any elements carrying data-strip-prev / data-strip-next.
 */
export function SwiperStrip({ children, controls, label, className = "" }: { children: ReactNode; controls?: ReactNode; label?: string; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let s: Swiper | null = null;
    let live = true;
    let off = () => {};
    import("@/lib/motion/swiper")
      .then(({ Swiper, A11y, Keyboard, Navigation }) => {
        if (!live || !el.current || !host.current) return;
        s = new Swiper(el.current, {
          modules: [A11y, Keyboard, Navigation],
          speed: motionTier() === "on" ? 1000 : 300,
          slidesPerView: 1.12,
          spaceBetween: 16,
          grabCursor: true,
          watchOverflow: true,
          keyboard: { enabled: true, onlyInViewport: true },
          navigation: {
            prevEl: host.current.querySelector<HTMLElement>("[data-strip-prev]"),
            nextEl: host.current.querySelector<HTMLElement>("[data-strip-next]"),
            disabledClass: "is-disabled",
          },
          a11y: { enabled: true, slideRole: "group", itemRoleDescriptionMessage: "slide", slideLabelMessage: "{{index}} / {{slidesLength}}" },
          breakpoints: { 481: { slidesPerView: 1.5 }, 769: { slidesPerView: 2, spaceBetween: 20 }, 1025: { slidesPerView: 3, spaceBetween: 24 } },
        });
        // gentle tier: slides still follow the finger, arrow moves are short (K-231)
        off = onMotionTier((tier) => {
          if (s) s.params.speed = tier === "on" ? 1000 : 300;
        });
      })
      .catch(() => {}); // chunk failed: the native scroll-snap strip stays usable
    return () => {
      live = false;
      off();
      s?.destroy(true, true);
    };
  }, []);

  return (
    <div ref={host} data-swiper-strip-host="" className={className}>
      <div ref={el} data-swiper-strip="" className="swiper" aria-label={label} role={label ? "region" : undefined}>
        <div className="swiper-wrapper">{children}</div>
      </div>
      {controls}
    </div>
  );
}
