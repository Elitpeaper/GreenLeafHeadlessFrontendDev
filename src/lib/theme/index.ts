/** Theme layer public API. ThemeScope is a server component; useAccentZone is client-only (import from its file). */
export { ThemeScope } from "./ThemeScope";
export { THEME_KEYS, normalizeTheme, type ThemeKey } from "./themes";
export { RECOLOR_VARS, accentTriggerProps, applyAccent, clearAccent, canRecolor, recolorSubset, type RecolorVars } from "./accent";
export { resolvePalette, accentStyle, contrast, type AccentVars, type ResolvedPalette } from "./palette";
