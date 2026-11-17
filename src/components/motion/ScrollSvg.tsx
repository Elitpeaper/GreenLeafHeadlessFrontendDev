import type { HTMLAttributes, ReactNode } from "react";

/**
 * K-271 scroll / cursor-driven SVG for the empty areas of content pages (home, blog, haberler, sss).
 * Wrap an illustration from src/components/illustrations:
 *   <ScrollSvg mode="draw" className="pointer-events-none absolute -right-10 top-24 hidden w-72 lg:block">
 *     <DividerLeafVine className="h-auto w-full" />
 *   </ScrollSvg>
 * mode = space-separated triggers (brief fotograf-ve-svg-yerlesim.md §3 vocabulary):
 *   "draw"     scroll: stroked shapes are drawn with the scroll (GSAP DrawSVG, scrub)
 *   "parallax" scroll: the wrapper floats against the scroll (y ±60 px, scrub) and leans toward the cursor
 *   "view"     scroll: the illustration's own behaviour (bloom / sway …, data-svg-interact) plays once on entering view
 *   "near"     cursor: the illustration's own behaviour plays while the cursor is within 240 px (parallax ones lean)
 *   "both"     = "draw parallax"
 *   e.g. /sss side column: <ScrollSvg mode="near view"><SceneFinderLeaves /></ScrollSvg>
 * The illustration keeps its own hover behaviour (data-svg-interact). Full tier only; reduced tier / no JS: static and
 * complete (nothing is hidden before the script runs). Always decorative (aria-hidden).
 */
export function ScrollSvg({
  mode = "draw",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { mode?: string; children: ReactNode }) {
  return (
    <div aria-hidden="true" data-scroll-svg={mode} {...rest}>
      {children}
    </div>
  );
}
