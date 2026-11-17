import type { CSSProperties, ElementType, ReactNode } from "react";
import { cormorant } from "@/lib/fonts";
import type { AccentVars } from "./palette";
import { accentStyle } from "./palette";
import { normalizeTheme, type ThemeKey } from "./themes";

/**
 * Server component: scopes a theme preset and/or a product palette to a subtree.
 *   <ThemeScope theme="premium-gold">…</ThemeScope>           -> [data-theme="premium-gold"] vars from tokens.css
 *   <ThemeScope accent={product.accent}>…</ThemeScope>         -> static per-product accent (PDP top block, card)
 * Unknown/null theme = brand theme (no attribute). Premium scopes also expose the Cormorant variable
 * (only downloaded if a premium display style actually uses it — K-082 preview option).
 */
export function ThemeScope({
  theme,
  accent,
  as: Tag = "div",
  className,
  style,
  children,
}: {
  theme?: ThemeKey | string | null;
  accent?: Partial<AccentVars> | null;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const key = normalizeTheme(theme);
  const isThemed = key !== "default";
  const classes = [isThemed ? cormorant.variable : null, className].filter(Boolean).join(" ") || undefined;
  return (
    <Tag
      data-theme={isThemed ? key : undefined}
      className={classes}
      style={accent ? { ...(accentStyle(accent) as CSSProperties), ...style } : style}
    >
      {children}
    </Tag>
  );
}
