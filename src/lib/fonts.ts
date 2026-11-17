import { Comfortaa, Cormorant_Garamond, Jost, Poppins } from "next/font/google";

/**
 * K-042 + brandbook (FuturaBookC / FuturaDemiC / Comfortaa Bold).
 * Three candidates, switchable with `?font=jost|poppins|comfortaa` for preview comparison:
 *  - jost      (DEFAULT) Jost body + headings — closest free Futura.
 *  - poppins   Poppins body + headings — previous working assumption.
 *  - comfortaa Jost body + Comfortaa headings/eyebrows (brandbook secondary font).
 * Only Jost is preloaded; the browser fetches the others only when a variant uses them.
 * Once the user picks, delete the unused loaders here and in FONT_OPTIONS / globals.css.
 */
export const jost = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jost",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
});

export const comfortaa = Comfortaa({
  subsets: ["latin", "latin-ext"],
  variable: "--font-comfortaa",
  display: "swap",
  preload: false,
});

/**
 * Premium display option B (K-082, premium-theme.md §3). Variable is attached only inside premium ThemeScope
 * containers; preload: false -> the file downloads only if [data-premium-font="cormorant"] actually uses it.
 * Preview switch: ?premiumFont=cormorant (handled by fontBootScript).
 */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
});

export const FONT_OPTIONS = [
  { key: "jost", label: "Jost" },
  { key: "poppins", label: "Poppins" },
  { key: "comfortaa", label: "Jost + Comfortaa" },
] as const;

export type FontKey = (typeof FONT_OPTIONS)[number]["key"];

export const DEFAULT_FONT: FontKey = "jost";

export const fontVariables = `${jost.variable} ${poppins.variable} ${comfortaa.variable}`;

/** Runs before paint: applies ?font= (-> <html data-font>) and ?premiumFont=cormorant (-> <html data-premium-font>), remembered per tab. */
export const fontBootScript = `(function(){try{var pq=new URLSearchParams(location.search).get('premiumFont');var ps=null;try{ps=sessionStorage.getItem('gl-premium-font')}catch(e){}var pf=pq==='cormorant'||pq==='jost'?pq:ps;if(pf==='cormorant'){document.documentElement.setAttribute('data-premium-font','cormorant')}if(pq){try{sessionStorage.setItem('gl-premium-font',pq)}catch(e){}}var ok={${FONT_OPTIONS.map((f) => `${f.key}:1`).join(",")}};var q=new URLSearchParams(location.search).get('font');var s=null;try{s=sessionStorage.getItem('gl-font')}catch(e){}var f=q&&ok[q]?q:(s&&ok[s]?s:null);if(f){document.documentElement.setAttribute('data-font',f);try{sessionStorage.setItem('gl-font',f)}catch(e){}}}catch(e){}})();`;
