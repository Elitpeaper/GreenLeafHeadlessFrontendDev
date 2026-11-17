---
kimden: ui-tasarimci
kime: frontend-mimar
tarih: 2026-11-16
durum: KAPANDI
ilgili: docs/tasarim/tokens.json v1, scripts/tokens/build-tokens.mjs, K-072, K-073, K-075, K-082 (ÖNERİ)
---

## Ne yaptım
`tokens.json` v1'e geçti. Mevcut builder ile geriye uyumlu: `color` düz ve her girdide `.value` var (node ile doğrulandı). Yeni üst anahtarlar şimdilik builder tarafından yok sayılıyor: `accent`, `themes`, `paletteDerivation`, `fontFamily`, `letterSpacing`, `breakpoint`, `grid`, `size`, `icon`, `z`, `stripe.variants`. Şunlar mevcut döngülerle otomatik üretilecek: `fontSize.mega`, `spacing.section-tight/card-pad/grid-gap`, `container.wide/drawer`, `radius.2xl`, `shadow.overlay/gold` ve yeni renkler (`line-strong`, `lime-100/200/700`, `blue-100/800`, `danger*`, `gold-*`, `forest-*`, `ink-deep`).

## Senden istediğim
1. `build-tokens.mjs`'i genişlet:
   - `:root` içinde `themes.default.vars`, `[data-theme="premium-gold"]` bloğunda `themes.premium-gold.vars`
   - `themes.premium-gold.gradients` → `--gradient-gold-foil`, `--gradient-gold-button`, `--gradient-forest-depth`, `--gradient-gold-glow`
   - `fontFamily` → `--font-sans/display/accent`, `size` → `--size-*`, `letterSpacing` → `--tracking-*`
   - Hover-recolor'da değişen değişkenler için `@property` kayıtları (`syntax: '<color>'`, `inherits: true`): `--accent-soft, --accent-line, --accent-decor, --accent-decor-2, --accent-decor-3, --accent-text, --stripe-1, --stripe-2, --stripe-3`
2. `paletteDerivation` algoritmasını `src/lib/theme/palette.ts` olarak yaz. Derleme zamanında veya veri adımında çalışsın, tarayıcıda değil. `tokens.json`'daki 4 örnek ve hover geçişindeki ara noktalar (t = 0.25/0.5/0.75) için birim test ekle. Eşik 4.6. Başarısız palet `null` döner ve derleme uyarısı üretir.
3. `themeHint` ("gold" | "premium") → `premium-gold` eşlemesi yapılandırmadan açılıp kapanabilsin (`themes.enabledFor`).
4. Premium display font seçeneği (Cormorant Garamond) yalnız premium rotalarda, `preload: false` ile yüklensin. Önizleme anahtarı `?premiumFont=cormorant` (K-042'deki `?font=` gibi).

## Bilmen gerekenler
Değişmezler (tema ezemez): üye fiyatı rozeti, birincil düğme (tek istisna koyu panelde `onDark`), odak halkası, ink. Ayrıntı `tokens.json › accent.invariant`. `z` değerlerini kodla senkron tut.

## Kabul kriteri
`npm run tokens` yeni değişkenleri üretiyor. `data-theme="premium-gold"` kapsayıcısında değerler değişiyor. Palet testleri geçiyor. Hover-recolor değişkenleri transition ile yumuşak geçiyor.

## Kapanış (frontend-mimar, 2026-11-16)
1. `build-tokens.mjs`: `:root` = `themes.default.vars`; `[data-theme="premium-gold"]` bloğu; `--gradient-gold-foil/-gold-button/-forest-depth/-gold-glow`; `--font-role-sans/display/accent` (mevcut `?font=` anahtarını ezmemek için `--font-sans/display` globals.css'te kaldı); `size` → Tailwind spacing (`h-control`, `min-h-tap-min`, `h-header`…); `--tracking-eyebrow/premium`; `--z-*`; 9 recolor değişkeni için `@property`; aksan katmanı Tailwind renkleri (`bg-accent-soft`, `text-accent-text`, `bg-stripe-1`…); `[data-accent-zone]` geçiş kuralı.
2. `src/lib/theme/palette.ts` + `palette.test.ts` (4 örnek, t = 0/.25/.5/.75/1, sRGB + Oklab, eşik 4.6). 1684/1684 ürün paleti çözülüyor; başarısız palet `null` + derleme uyarısı (`json-source.ts`). Not: örneklerdeki hex'ler birebir tutmayabilir (adım/karışım yorumu); testler oran garantisini doğrular.
3. `themes.enabledFor` → `src/config/storefront.ts`.
4. Cormorant: `fonts.ts` (`preload: false`), değişken yalnız premium `ThemeScope`'ta; `?premiumFont=cormorant`; `premium-display` yardımcı sınıfı (globals.css).
`z` değerleri `--z-header` vb. olarak üretiliyor; sınıfta `z-(--z-header)`.
