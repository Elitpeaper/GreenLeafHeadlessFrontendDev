/** Pure text helpers shared by server (`index.ts`) and client (`client.tsx`) accessors. No dictionary import here. */
export type TextVars = Record<string, string | number>;

/** Fills "{name}" placeholders. Unknown placeholders are left as-is so missing vars are visible in review. */
export function fill(template: string, vars?: TextVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

export type TextDict = Record<string, string>;

export function lookup(dict: TextDict, key: string, vars?: TextVars): string {
  const v = dict[key];
  return fill(typeof v === "string" ? v : key, vars);
}

export function plural(dict: TextDict, base: string, count: number, vars?: TextVars): string {
  const key = count === 1 && `${base}_one` in dict ? `${base}_one` : `${base}_other`;
  return lookup(dict, key in dict ? key : base, { count, ...vars });
}

/** Key prefixes that client components read through `useT()`. The server picks exactly these into the provider. */
export const CLIENT_TEXT_PREFIXES = [
  "common.",
  "header.",
  "megaMenu.",
  "footer.link.",
  "cart.",
  "search.",
  "listing.",
  "favorites.",
  "blog.share.",
  "product.card.",
  "product.price.",
  "product.memberPrice.",
  "product.badge.",
  "product.pv.",
  "product.qty.",
] as const;
