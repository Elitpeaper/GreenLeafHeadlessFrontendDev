/**
 * Swiper core + the only modules the site uses (K-256). Import it lazily, never statically, so Swiper stays out of the
 * first-load JS: slides are server-rendered and usable (native scroll strip / first slide) before Swiper initialises.
 *   const { Swiper, Autoplay, EffectFade, A11y, Navigation, Keyboard } = await import("@/lib/motion/swiper");
 */
export { default as Swiper } from "swiper";
export { A11y, Autoplay, EffectFade, Keyboard, Navigation } from "swiper/modules";
