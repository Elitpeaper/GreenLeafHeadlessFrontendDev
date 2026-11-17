/**
 * UI copy accessor (MIKRO-METIN / data/content/ui.tr.json, owner icerik-editoru).
 * SERVER-SIDE accessor. Client components must NOT import this file (it would put the whole JSON into the client
 * bundle); they use `useT()` from ./client, fed by `pickClientText()` through <UiTextProvider> (see StoreChrome).
 *
 * Added by frontend-gelistirici (no helper existed). Ownership: frontend-mimar may move/reshape — keep `t`, `tc`.
 * `pending.tr.json` holds strings requested from icerik-editoru; ui.tr.json always wins.
 */
import ui from "@data/content/ui.tr.json";
import pending from "./pending.tr.json";
import { CLIENT_TEXT_PREFIXES, fill, type TextVars } from "./fill";

const dict: Record<string, unknown> = { ...pending, ...ui };

export { fill };
export type { TextVars };

/** String entries whose key starts with a client prefix — the payload for <UiTextProvider>. */
export function pickClientText(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(dict)) {
    if (typeof v === "string" && CLIENT_TEXT_PREFIXES.some((p) => k.startsWith(p))) out[k] = v;
  }
  return out;
}

/** Text by key. A missing key returns the key itself (visible in review, never crashes). */
export function t(key: string, vars?: TextVars): string {
  const v = dict[key];
  return fill(typeof v === "string" ? v : key, vars);
}

/** Plural: picks `${base}_one` / `${base}_other`, `{count}` filled automatically. */
export function tc(base: string, count: number, vars?: TextVars): string {
  const key = count === 1 && `${base}_one` in dict ? `${base}_one` : `${base}_other`;
  return t(key in dict ? key : base, { count, ...vars });
}

/**
 * Structured copy by key (FAQ arrays, `pv.business.plan` ...). Returns `fallback` (default null) when the key is
 * missing or holds a plain string. The caller owns the shape `T`; validate before rendering optional parts.
 */
export function tRaw<T>(key: string): T | null;
export function tRaw<T>(key: string, fallback: T): T;
export function tRaw<T>(key: string, fallback: T | null = null): T | null {
  const v = dict[key];
  return v !== undefined && typeof v !== "string" ? (v as T) : fallback;
}
