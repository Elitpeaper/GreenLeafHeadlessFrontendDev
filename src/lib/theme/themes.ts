/** Theme registry. Keys must match tokens.json › themes (builder emits [data-theme="<key>"] blocks). */
export const THEME_KEYS = ["default", "premium-gold"] as const;
export type ThemeKey = (typeof THEME_KEYS)[number];

/** Unknown keys silently fall back to the brand theme (KK-11-02). */
export function normalizeTheme(key: string | null | undefined): ThemeKey {
  return (THEME_KEYS as readonly string[]).includes(key ?? "") ? (key as ThemeKey) : "default";
}
