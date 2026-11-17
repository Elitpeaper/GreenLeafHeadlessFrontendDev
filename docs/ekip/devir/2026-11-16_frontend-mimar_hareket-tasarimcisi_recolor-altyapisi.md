---
kimden: frontend-mimar
kime: hareket-tasarimcisi
tarih: 2026-11-16
durum: KAPANDI
ilgili: K-066, K-070, K-097, K-124 (ÖNERİ), docs/tasarim/bilesenler/hover-recolor.md, docs/teknik/TEKNIK-TASARIM.md §6
---

## Ne yaptım
Hover renk geçişi (RecolorZone) ve premium tema için altyapıyı kurdum. Zamanlama/eğri/koreografi sende.

## Senden istediğim
`src/components/motion/RecolorZone.tsx` (ve gerekiyorsa `src/lib/motion/`) bileşenini aşağıdaki API üzerine kur; Z1 (mega menü), Z2 (header, Z1'e bağlı), Z3 (ana sayfa vitrinleri) için süreleri belirle.

## Bilmen gerekenler — genişleme noktaları
- **CSS (otomatik, `src/styles/tokens.css`):** 9 değişken `@property` ile `<color>` olarak kayıtlı: `--accent-soft, --accent-line, --accent-decor, --accent-decor-2, --accent-decor-3, --accent-text, --stripe-1, --stripe-2, --stripe-3`. `[data-accent-zone]` bunlara `transition` uygular; süre ve eğri bölgede **`--recolor-duration`** (varsayılan 420ms) ve **`--recolor-ease`** (varsayılan `--ease-standard`) ile ayarlanır; reduced-motion'da 0. Kural derleyicide (`scripts/tokens/build-tokens.mjs`) — farklı bir yapı gerekirse bana not bırak, `tokens.css`'i elle düzenleme.
- **Tetikleyici:** `accentTriggerProps(product.accent)` (`@/lib/theme/accent`) → `data-accent='{"--accent-soft":…}'`. Paletsiz ürün `{}` döner, hiçbir şey tetiklemez. `ProductListStub` zaten ekliyor (ana sayfa Vitrin 1 bölümü `data-accent-zone` ile hazır test alanı).
- **Hook:** `useAccentZone<T>({ intentDelay, releaseDelay, linkedIds, disabled })` (`@/lib/theme/useAccentZone`) → `{ ref, activate(vars), release() }`. Olay delegasyonu: `pointerover` (yalnız ince işaretçi + gerçek hover; dokunmatik asla), `pointerleave` → bırakma, `focusin` (`:focus-visible`, her cihazda), `focusout` bölge dışına. Tetikleyiciler arası doğrudan geçiş (sıfırlamadan). `linkedIds: ["header-accent"]` Z1 → Z2 eşzamanlılığı.
- **Ortam koruması:** `canRecolor("pointer" | "focus")` — reduced-motion, `prefers-contrast: more`, `forced-colors`'ta false.
- **Kontrast:** değerler sunucuda `resolvePalette` ile çözülmüş; ara noktalar (sRGB + Oklab, t = .25/.5/.75) testte ≥ 4.5 (`src/lib/theme/palette.test.ts`). Bölgede yalnız bu 9 değişken değişebilir; `--accent`, birincil düğme, üye fiyatı rozeti, fiyat, odak halkası değişmez.
- **Premium:** `[data-theme="premium-gold"]` kapsayıcısı (`ThemeScope`), gradyanlar `--gradient-gold-foil/-gold-button/-forest-depth/-gold-glow`. Varak çizim/parıltı animasyonları bunları kullanabilir (yalnız transform/opacity/stroke-dashoffset; K-097 bütçesi, ≤ 2 sürekli hareket).
- Mevcut CSS animasyonları `src/app/globals.css`'te (v0); `src/lib/motion/` ve `src/components/motion/` henüz boş — senin alanın.

## Kabul kriteri
Z1–Z3'te hover/odak ile yalnız 9 değişken yumuşak geçer; dokunmatik emülasyonda ve reduced-motion'da hiçbir renk değişmez; INP ≤ 200 ms; `npm run lint` + `npm run build` geçer.
