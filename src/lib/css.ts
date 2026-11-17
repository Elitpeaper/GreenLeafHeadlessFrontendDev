import type { CSSProperties } from "react";

/** Typed helper for CSS custom properties in `style`, e.g. style={cssVars({ "--d": "120ms" })}. */
export const cssVars = (vars: Record<`--${string}`, string | number>) => vars as CSSProperties;
