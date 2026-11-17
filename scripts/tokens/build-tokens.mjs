// Generates src/styles/tokens.css (Tailwind v4 @theme + accent layer + themes) from docs/tasarim/tokens.json.
// Run: npm run tokens  (also runs automatically before dev/build)
//
// Output sections:
//   1. @property registrations for the hover-recolor accent vars (K-066) -> they can transition smoothly.
//   2. @theme            static design tokens (colors, type, spacing, radius, shadow, ease, size, tracking, z).
//   3. @theme inline     Tailwind colors that point at the runtime accent layer (bg-accent-soft, text-accent-text ...).
//   4. :root             default theme accent vars + motion durations + gradients.
//   5. [data-theme=...]  theme presets (premium-gold).
//   6. [data-accent-zone] transition rule for the recolor zone (timing owned by hareket-tasarimcisi via --recolor-*).
//   7. @utility          v1.2 (K-186/K-188): bg-gradient-<key> for every gradient + surface-showcase / surface-commerce.
//                        tokens.texture is doc-only (textures are SVG components in src/components/illustrations).
//   8. v1.3 (K-234 home maximalist): text-stroke-<key> (typeStroke), color-block-<key> (colorBlock),
//                        --stripe-<variant>-band-N vars (stripe.variants; giant is responsive), --z-collage-*,
//                        --collage-* rotations, --hero-intro-* size/timing budget (keyframes stay in motion.css).
//                        fontSize.ultra/colossal and shadow.sticker are covered by the generic fontSize/shadow loops.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const tokens = JSON.parse(readFileSync(resolve(root, "docs/tasarim/tokens.json"), "utf8"));
const out = resolve(root, "src/styles/tokens.css");

/** Vars that the hover recolor (K-066, hover-recolor.md §3) is allowed to change. Keep in sync with src/lib/theme/accent.ts. */
const RECOLOR_VARS = [
  "--accent-soft",
  "--accent-line",
  "--accent-decor",
  "--accent-decor-2",
  "--accent-decor-3",
  "--accent-text",
  "--stripe-1",
  "--stripe-2",
  "--stripe-3",
];

const decl = (name, value) => `  ${name}: ${value};`;
const themeLines = [];
const push = (name, value) => themeLines.push(decl(`--${name}`, value));

// ---- @theme (static tokens) ----
for (const [k, v] of Object.entries(tokens.color)) push(`color-${k}`, v.value);
for (const [k, v] of Object.entries(tokens.fontSize)) {
  push(`text-${k}`, v.value);
  if (v.lineHeight) push(`text-${k}--line-height`, v.lineHeight);
  if (v.letterSpacing) push(`text-${k}--letter-spacing`, v.letterSpacing);
}
for (const [k, v] of Object.entries(tokens.fontWeight ?? {})) push(`font-weight-${k}`, String(v));
for (const [k, v] of Object.entries(tokens.letterSpacing ?? {})) push(`tracking-${k}`, v.value);
for (const [k, v] of Object.entries(tokens.spacing)) {
  if (typeof v === "object") push(`spacing-${k}`, v.value);
}
for (const [k, v] of Object.entries(tokens.size ?? {})) push(`spacing-${k}`, v.value); // h-control, min-h-tap-min, ...
for (const [k, v] of Object.entries(tokens.container)) push(`container-${k}`, v.value);
for (const [k, v] of Object.entries(tokens.radius)) push(`radius-${k}`, v.value);
for (const [k, v] of Object.entries(tokens.shadow)) push(`shadow-${k}`, v.value);
for (const [k, v] of Object.entries(tokens.motion.ease)) push(`ease-${k}`, v.value);

// ---- Accent layer: Tailwind color utilities that resolve at runtime ----
const accentVarNames = Object.keys(tokens.accent.vars).filter((n) => n !== "--accent-gradient");
const inlineLines = accentVarNames.map((n) => decl(`--color-${n.slice(2)}`, `var(${n})`));

// ---- Themes ----
const themes = tokens.themes ?? {};
const defaultVars = themes.default?.vars ?? {};
for (const [name, spec] of Object.entries(tokens.accent.vars)) {
  if (!(name in defaultVars)) throw new Error(`tokens: themes.default.vars is missing ${name} (declared in accent.vars)`);
  if (spec.default !== undefined && String(spec.default).toLowerCase() !== String(defaultVars[name]).toLowerCase()) {
    console.warn(`tokens: WARN accent.vars ${name}.default (${spec.default}) != themes.default (${defaultVars[name]}) — themes.default wins`);
  }
}

const propertyBlocks = RECOLOR_VARS.map((name) => {
  const initial = defaultVars[name];
  if (!initial) throw new Error(`tokens: no default value for recolor var ${name}`);
  return `@property ${name} {\n  syntax: "<color>";\n  inherits: true;\n  initial-value: ${initial};\n}`;
});

const rootLines = [];
for (const [k, v] of Object.entries(defaultVars)) rootLines.push(decl(k, v));
for (const [k, v] of Object.entries(tokens.motion.duration)) rootLines.push(decl(`--duration-${k}`, v.value));
for (const [k, v] of Object.entries(tokens.fontFamily ?? {})) {
  if (k.startsWith("$") || typeof v?.value !== "string") continue;
  rootLines.push(decl(`--font-role-${k}`, v.value));
}
for (const [k, v] of Object.entries(tokens.z ?? {})) {
  if (!k.startsWith("$")) rootLines.push(decl(`--z-${k}`, String(v)));
}
// Gradients are global (usable anywhere a premium ornament is drawn), values come from the premium theme.
const gradients = new Map();
for (const [k, v] of Object.entries(themes["premium-gold"]?.gradients ?? {})) gradients.set(k, v.value);
// v1.2 showcase gradients (K-186/K-188): top-level tokens.gradient, "$doc" keys skipped. Names must not collide.
for (const [k, v] of Object.entries(tokens.gradient ?? {})) {
  if (k.startsWith("$")) continue;
  if (gradients.has(k)) throw new Error(`tokens: gradient name collision "${k}" (premium-gold vs tokens.gradient)`);
  gradients.set(k, v.value);
}
for (const [k, v] of gradients) rootLines.push(decl(`--gradient-${k}`, v));

// Utilities: bg-gradient-<key> (background-image only, so bg-<color> fallbacks still compose).
const utilityBlocks = [...gradients.keys()].map(
  (k) => `@utility bg-gradient-${k} {
  background-image: var(--gradient-${k});
}`,
);
// Surface modes (K-186, tokens.surfaceMode): showcase = forest ground + cream text; commerce = light ground + ink.
// Prices/member badge/PV are never placed directly on surface-showcase (invariant, tasarim-kurallari §1.2).
if (tokens.surfaceMode?.showcase) {
  if (!gradients.has("forest-hero")) throw new Error("tokens: surfaceMode.showcase needs gradient.forest-hero");
  utilityBlocks.push(
    `@utility surface-showcase {
  background-color: var(--color-forest-800);
  background-image: var(--gradient-forest-hero);
  color: var(--color-cream-100);
}`,
  );
}
if (tokens.surfaceMode?.commerce) {
  utilityBlocks.push(`@utility surface-commerce {
  background-color: var(--color-surface);
  color: var(--color-ink);
}`);
}

// ---- v1.3 additions (K-233 / K-234 / K-235 / K-236 / K-237) ----
const v13Root = [];
const mdLines = []; // responsive overrides, min-width 768px (tokens.breakpoint.md)
const isCssLen = (v) => typeof v === "string" && /^-?\d*\.?\d+(px|rem|em|ms|s|deg)$/.test(v.trim());
const need = (cond, msg) => {
  if (!cond) throw new Error(`tokens: ${msg}`);
};
const colorRef = (name) => {
  need(name in tokens.color, `unknown color reference "${name}"`);
  return `var(--color-${name})`;
};

// typeStroke -> @utility text-stroke-<key>: decorative outline type only (aria-hidden, never meaning-bearing).
for (const [k, v] of Object.entries(tokens.typeStroke ?? {})) {
  if (k.startsWith("$")) continue;
  need(isCssLen(v.width) && typeof v.color === "string", `typeStroke.${k} needs width + color`);
  v13Root.push(decl(`--type-stroke-${k}-width`, v.width), decl(`--type-stroke-${k}-color`, v.color));
  utilityBlocks.push(`@utility text-stroke-${k} {
  color: transparent;
  -webkit-text-stroke: var(--type-stroke-${k}-width) var(--type-stroke-${k}-color);
}`);
}

// colorBlock -> @utility color-block-<key>: flat brand ground + its verified text colour (HOME only, K-236).
for (const [k, v] of Object.entries(tokens.colorBlock ?? {})) {
  if (k.startsWith("$")) continue;
  utilityBlocks.push(`@utility color-block-${k} {
  background-color: ${colorRef(v.ground)};
  color: ${colorRef(v.text)};
}`);
}

// stripe.variants -> --stripe-<variant>-band-1..3 (+ -gap, -width). bandsMobile = mobile-first value, desktop from md.
// Names never collide with the accent vars --stripe-1..3.
for (const [k, v] of Object.entries(tokens.stripe?.variants ?? {})) {
  const bands = v.bands ?? [];
  need(bands.length === 3 && bands.every(isCssLen), `stripe.variants.${k}.bands must be 3 lengths`);
  const mobile = v.bandsMobile;
  if (mobile) need(mobile.length === 3 && mobile.every(isCssLen), `stripe.variants.${k}.bandsMobile must be 3 lengths`);
  bands.forEach((b, i) => {
    v13Root.push(decl(`--stripe-${k}-band-${i + 1}`, mobile ? mobile[i] : b));
    if (mobile) mdLines.push(`    --stripe-${k}-band-${i + 1}: ${b};`);
  });
  if (v.gap !== undefined) v13Root.push(decl(`--stripe-${k}-gap`, isCssLen(String(v.gap)) ? v.gap : "0px"));
  if (isCssLen(v.width)) v13Root.push(decl(`--stripe-${k}-width`, v.width));
}

// collage -> --z-collage-<layer> + rotation budget (real text is never rotated).
const collage = tokens.collage;
if (collage) {
  for (const [k, z] of Object.entries(collage.z ?? {})) {
    const kebab = k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`); // decorType -> decor-type
    v13Root.push(decl(`--z-collage-${kebab}`, String(z)));
  }
  const rot = collage.rotation ?? {};
  if (isCssLen(rot.photo)) v13Root.push(decl("--collage-rotate-photo", rot.photo));
  (rot.stickers ?? []).forEach((r, i) => {
    const val = String(r).replace(/^\+/, "");
    need(isCssLen(val), `collage.rotation.stickers[${i}] must be an angle`);
    v13Root.push(decl(`--collage-rotate-sticker-${i + 1}`, val));
  });
  if (isCssLen(rot.max)) v13Root.push(decl("--collage-rotate-max", rot.max));
  const gap = String(collage.gapToText ?? "").match(/^\d+px/)?.[0];
  if (gap) v13Root.push(decl("--collage-gap-to-text", gap));
}

// heroIntro -> size + timing budget only (K-233). Keyframes/easing belong to hareket-tasarimcisi (motion.css).
const hi = tokens.heroIntro;
if (hi) {
  const dur = (s, path) => {
    const m = String(s ?? "").match(/(\d*\.?\d+)\s*(ms|s)\b/);
    need(m, `heroIntro.${path} has no duration`);
    return `${m[1]}${m[2]}`;
  };
  need(isCssLen(hi.logo?.size?.mobile) && isCssLen(hi.logo?.size?.desktop), "heroIntro.logo.size needs mobile + desktop");
  v13Root.push(
    decl("--hero-intro-logo-size", hi.logo.size.mobile),
    decl("--hero-intro-logo-max-duration", dur(hi.logo.maxDuration, "logo.maxDuration")),
    decl("--hero-intro-headline-duration", dur(hi.headline?.duration, "headline.duration")),
    decl("--hero-intro-headline-lead", dur(hi.headline?.startOffset, "headline.startOffset")),
    decl("--hero-intro-total", dur(hi.total, "total")),
  );
  mdLines.push(`    --hero-intro-logo-size: ${hi.logo.size.desktop};`);
}
rootLines.push(...v13Root);

const themeBlocks = [];
for (const [key, spec] of Object.entries(themes)) {
  if (key === "default") continue;
  const selector = spec.selector ?? `[data-theme="${key}"]`;
  const lines = Object.entries(spec.vars ?? {}).map(([k, v]) => decl(k, v));
  themeBlocks.push(`${selector} {\n${lines.join("\n")}\n}`);
}

const css = `/* AUTO-GENERATED from docs/tasarim/tokens.json by scripts/tokens/build-tokens.mjs — do not edit. */

/* Hover-recolor accent vars (K-066): registered so CSS can transition them. Unsupported browsers swap instantly. */
${propertyBlocks.join("\n")}

/* Variant for the full motion layer (K-190): html[data-motion="on"] is set by the motion runtime, incl. the
   ?motion=full preview switch. Use motion-on:hover:-translate-y-1 for movement; colour transitions need no variant (K-231). */
@custom-variant motion-on (&:where(html[data-motion="on"] *));
/* K-264: the site's own motion tier is the single source, not the OS media query. motion-safe / motion-reduce follow
   html[data-motion] (set by the boot script from the visitor's "Hareketi azalt" choice), so an OS "reduce" setting no
   longer switches hover movement off on its own. */
@custom-variant motion-safe (&:where(html[data-motion="on"] *));
@custom-variant motion-reduce (&:where(html:not([data-motion="on"]) *));

@theme {
${themeLines.join("\n")}
}

/* Accent layer as Tailwind colors: bg-accent-soft, text-accent-text, border-accent-line, bg-stripe-1 ... */
@theme inline {
${inlineLines.join("\n")}
}

:root {
${rootLines.join("\n")}
}

/* Theme presets — apply with data-theme on any container (see src/lib/theme/ThemeScope.tsx). */
${themeBlocks.join("\n\n")}

/* Recolor zone: transitions only the registered accent vars. Timing knobs belong to hareket-tasarimcisi. */
[data-accent-zone] {
  transition-property: ${RECOLOR_VARS.join(", ")};
  transition-duration: var(--recolor-duration, 420ms);
  transition-timing-function: var(--recolor-ease, var(--ease-standard));
}
/* K-231: colour changes stay smooth (~0.25 s) in the reduced tier too; only position/scale motion is removed (K-264: site tier). */
html:not([data-motion="on"]) [data-accent-zone] {
  transition-duration: var(--recolor-duration-reduced, 250ms);
}

${mdLines.length ? `/* v1.3 responsive token values (mobile-first; md = 768px). */\n@media (min-width: 768px) {\n  :root {\n${mdLines.join("\n")}\n  }\n}\n` : ""}
/* v1.2 gradient + surface-mode utilities (K-186/K-188); v1.3 text-stroke-* / color-block-* (K-234/K-236). */
${utilityBlocks.join("\n\n")}
`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, css);
const count = themeLines.length + inlineLines.length + rootLines.length + propertyBlocks.length + utilityBlocks.length;
console.log(`tokens: wrote ${count} declarations, ${themeBlocks.length} theme preset(s) -> src/styles/tokens.css`);
