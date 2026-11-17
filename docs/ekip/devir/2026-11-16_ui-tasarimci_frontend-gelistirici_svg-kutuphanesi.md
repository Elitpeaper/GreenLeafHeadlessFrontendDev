---
kimden: ui-tasarimci
kime: frontend-gelistirici (tüm örnekler: A, B, …)
tarih: 2026-11-16
durum: AÇIK
ilgili: K-175, K-177, K-179, K-181, K-182 · K-195…K-199 · src/components/illustrations/** · /svg-kutuphanesi · tasarim-kurallari.md §3–§5, §9.5
---

## Ne yaptım
1. **SVG illüstrasyon kütüphanesi** (K-175): `src/components/illustrations/` — 38 özgün, tipli React bileşeni (12 kategori ikonu, 6 sahne, 6 ayırıcı, 4 desen, 10 boş durum/çok yakında). Hepsi `@/components/illustrations` içinden içe aktarılır. Katalog: **`/svg-kutuphanesi`** (noindex, menüde bağlantı yok).
2. **K-177 tipografi/boşluk ölçeği**: `tokens.json` v1.1, `src/styles/tokens.css` yeniden üretildi. Gövde 16 px; `display` 44→92, `4xl` 36→64, `3xl` 28→44; `xs` 12 px; `section` 48→96; `control` 44, `control-lg` 52, `control-sm` 36. Token adları **değişmedi**, yalnız değerler değişti.

## Senden istediğim
Aşağıdaki yerleşimleri uygula (sahibi olduğun dosyalarda). Kütüphane dosyalarını değiştirme; eksik/yanlış bir şey varsa bana not bırak.

| Yer | Bileşen | Not |
|---|---|---|
| Ana sayfa hero slaytları (K-172) | `SceneHeroBotanical` | Fotoğrafın yanında/üstünde dekor katmanı: `absolute`, `pointer-events-none`, metin panelinin **arkasında değil yanında**. Slayt başına en fazla 1 sahne. |
| Kategori şeridi + mega menü (K-064) | `CategoryIllustration slug={kok.slug}` veya `CATEGORY_ICONS[slug]` | 40–48 px, `text-ink`; karo zemini `bg-accent-soft`. Görselli karoda yedek olarak. |
| Hero altı / footer üstü | `DividerWaveLayers` | `className="block w-full h-16 md:h-24 text-surface-muted"` (renk = sonraki bölümün zemini). Üst kenarda `flip`. |
| Beyaz → surface-muted geçişi | `DividerWave` | Aynı kural; ardışık iki dalga kullanma. |
| Aynı zeminli bölümler arası, blog yazısı | `DividerLeafVine` | `className="mx-auto h-8 w-full max-w-3xl"`. |
| Bölüm başlığı altı süsü | `DividerLeafDiamond` | `h-6 w-48`; premium sayfada `tone="gold"`. |
| Bölüm sonu imza | `DividerStripeLeaf` | Ekran başına en fazla 1 (imza bant kuralı §9.1). |
| Cilt bakımı içerikleri, SSS öncesi | `DividerDrops` | `h-8 w-full max-w-xl mx-auto`. |
| `/pv-nedir` hero + ana sayfa PV kartı (K-178) | `ScenePv` | |
| `/uye-ol` hero + üyelik CTA bölümü | `SceneMembership` | |
| Premium koleksiyon/gold set | `ScenePremiumFrame` | Yalnız `data-theme="premium-gold"` + forest zeminli kapsayıcıda; içerik çerçevenin üstüne `absolute inset-0` ile değil, çerçeve içeriğin arkasına `absolute inset-0 h-full w-full` ile konur. |
| `/cilt-tipine-gore` hero + bulucu kartı | `SceneFinderLeaves` | Bant zeminine `PatternDrops` eklenebilir. |
| `/blog`, `/haberler` başlığı (K-180) | `SceneBlog` | Görseli olmayan yazı kartında yedek: `EmptyNews`. |
| Üyelik paneli, kampanya karosu | `PatternLeafScatter` | `absolute inset-0 -z-10` katmanda; varsayılan `strength` dokunma. |
| Footer, metin paneli arkası | `PatternSeedDots` | |
| Blog/hakkımızda başlığı | `PatternLeafLines` | `text-ink` (currentColor çizgi). |
| `/kvkk` çok yakında (K-181) | `EmptyShield` | |
| `/cerez-politikasi` çok yakında | `EmptyCookie` | |
| `/yasal/*` çok yakında, `LegalPlaceholder` | `EmptyDocument` | |
| `/sertifikalar` belge bekleniyor | `EmptyCertificate` | |
| Bulucu e-posta kartı, iletişim | `EmptyMail` | |
| Sepet drawer boş | `EmptyCart` | 160–200 px. |
| `/arama` + filtre sonucu yok | `EmptySearch` | |
| `/favoriler` boş | `EmptyFavorites` | |
| `not-found.tsx` | `EmptyNotFound` | "404" çizimi aria-hidden; hata metni H1'de. |

Her boş durum/çok yakında ekranı: illüstrasyon (160–240 px) + başlık + tek cümle + **tek eylem** (gerçek bir sayfaya bağlantı; `#` yok, K-182). Arayüzde "taslak/önizleme/yer tutucu" sözcüğü yok (K-181).

## Bilmen gerekenler
- **API:** her bileşen `SVGProps` + `title?` + `interact?` alır. `title` yoksa `aria-hidden`. Boyutu `className` ile ver (`h-*`/`w-*`); çizgi rengi `currentColor` (`text-ink`, koyu zeminde `text-white`).
- **Renkler** `--accent-decor*`/`--accent-soft` token'larından gelir → hover-recolor bölgesinde (K-066) ve `premium-gold` temasında kendiliğinden değişir. Ham HEX ekleme.
- **Hover davranışı** (K-179): kökteki `data-svg-interact` ve gruplardaki `data-svg-part` kancalarına hareket-tasarimcisi bağlanıyor. Sen ek animasyon CSS'i yazma; bileşeni etkileşimli bir kapsayıcıya (kart/bağlantı) koyman yeterli.
- **K-177 etkisi:** `text-base` artık 16 px, `h-control` 44 px, `section` boşluğu daha kısa. 17–18 px varsayımıyla elle verilmiş `text-[17px]`, `min-h-[48px]` gibi değerler varsa token'a çevir. Kart adı mobilde `text-base`, masaüstünde `text-lg`.
- Desen bileşenleri kapsayıcıyı doldurur (`width/height=100%`); kapsayıcı `relative overflow-hidden` olmalı.
- Görsel kontrol için ayrı kopya kullan (paylaşılan `.next` sunucuları bozar).

## Kabul kriteri
- Tablodaki her yerleşim uygulanmış; 360 ve 1440 px'te illüstrasyon metinle çakışmıyor, yatay kaydırma yok.
- Hiçbir boş durumda yalnız illüstrasyon yok; başlık + tek gerçek eylem var.
- Kodda illüstrasyon için ham HEX veya kopyalanmış SVG path yok; hepsi `@/components/illustrations` içe aktarımı.
