# Bileşen — Premium / altın tema (`data-theme="premium-gold"`)

> ui-tasarimci · v1 · 2026-11-16 · Dayanak: **K-065** (ürüne/koleksiyona özel tema; premium sayfalar premium renk, SVG ve süsleme; altın gradyan yasağı yalnız ana tema için) · ÖNERİ K-082
> Token'lar `tokens.json › themes.premium-gold` içindedir. Bu tema ürün verisindeki `themeHint` ("gold" | "premium"; veri-muhendisi şema v2) veya koleksiyon yapılandırmasındaki `theme: "premium-gold"` ile açılır. `themeHint` yalnız ipucudur; temayı açma kararı yapılandırmadadır (`themes.enabledFor`), böylece yanlış ipucu tek satırla kapatılır. Ana sayfanın genelinde, header'da ve footer'da kullanılmaz.

## 1. Fikir: "Yaprakta altın ışık"
Greenleaf kimliğinden kopmadan premium bir his yaratılır. Derin orman yeşili (forest-900, marka yeşilinin en koyu türevi) zemin, sıcak altın varak çizgiler ve ince yaprak süsleri kullanılır. Rakiplerin "altın CTA + koyu yeşil her yerde" şablonu yerine burada altın **yalnız çerçeve ve süs** işlevi görür. Metin ve fiyat okunur açık yüzeylerde kalır.

## 2. Renk kullanımı
| Öğe | Değer | Kontrast |
|---|---|---|
| Derin bölüm zemini | `forest-depth` radyal (forest-900 → forest-950) | beyaz ≥ 10, gold-300 ≥ 8 |
| Derin zeminde başlık | gold-300 #E9CF8A | 8.24 |
| Derin zeminde gövde | gold-200 #F3E7C4 veya beyaz | 10.21 / 12.58 |
| Açık zemin | beyaz veya gold-50 #FBF6E9 | ink 11+ |
| Açık zeminde altın metin | gold-800 #7A5A12 (küçük), gold-700 (≥ 18 px) | 6.37 / 4.68 |
| Altın varak (çizgi, süs, bant) | `gold-foil` gradyanı | dekoratif, **metin arkasında asla** |
| Premium düğme | `gold-button` gradyanı + ink-deep metin | her durakta ≥ 7.08 |
| Üye fiyatı rozeti | **green-700 + beyaz (değişmez)**, derin zemine yakınsa 1 px gold-300 kenar | 5.35 |
| Odak halkası | blue-700 + beyaz boşluk (değişmez). Derin zeminde beyaz iç halka + gold-300 dış halka kullanılır (≥ 3:1) | — |

**Fiyat kuralı:** fiyat bloğu derin zemine hiç konmaz. Ürün bilgisi her zaman beyaz veya gold-50 kart içindedir.

## 3. Tipografi
- Display: önizlemede iki seçenek sunulur (tokens `fontFamily.premiumDisplay`):
  - **A (varsayılan):** Jost 300–400, büyük harf, 0.14em aralık. Ek font yoktur, Futura ailesinde kalır.
  - **B:** Cormorant Garamond 500–600, ≥ 32 px. Yalnız H1/H2 ve set adı için kullanılır, gövde ve fiyatta kullanılmaz.
- Eyebrow: "PREMIUM SET" / koleksiyon adı, xs 600, 0.14em, gold-300 (derin) veya gold-800 (açık).
- Gövde, fiyat ve düğme her zaman Jost'tur.

## 4. SVG süsleme kütüphanesi (`src/components/brand/ornaments/` — frontend-gelistirici çizer, onay ui-tasarimci)
| Ad | Tarif | Kullanım |
|---|---|---|
| `GoldRule` | 1 px varak çizgi, iki ucu incelen (stroke-gradient + uçlarda opaklık 0) | Başlık altı, bölüm ayırıcı |
| `GoldDoubleRule` | 1 px + 3 px boşluk + 1 px | Kart görsel alt kenarı, fiyat bloğu üstü |
| `LeafDiamond` | İki yaprak sivri uçlarla birleşip elmas oluşturur, ortasında 2 px nokta. 24 × 12 px | Ayırıcı merkezi, liste madde imi |
| `CornerFlourish` | Tek yaprak kıvrımı + ince sarmal, 48 × 48. Köşeye simetrik yerleşir | Hero paneli ve premium kart köşeleri (en fazla 2 karşı köşe) |
| `GoldFrame` | radius lg kart çevresinde 1 px varak çerçeve + 6 px içte ikinci ince çizgi (%40 opaklık) | Premium ürün kartı, set içerik kartı |
| `GoldStripe` | Çizgi bandının altın versiyonu (`--stripe-*` premium değerleri) | Hero alt kenarı |
Kurallar: çizgi kalınlığı ≤ 1.5 px · ekranda en fazla 4 süs öğesi · logo veya pinwheel çevresine süs konmaz · süsler `aria-hidden` olur.

## 5. Uygulama yüzeyleri
### 5.1 Premium koleksiyon sayfası (`/koleksiyon/{anahtar}` + `theme`)
1. **Hero (derin):** `forest-depth` zemin. Sol: eyebrow + H1 (display seçeneği) + 2 satır metin (gold-200) + `GoldRule`. Sağ: set packshot'ı `gold-glow` üzerinde, altında yansıma gölgesi. `CornerFlourish` 2 köşede bulunur. Alt kenarda `GoldStripe` yer alır.
2. **Set içeriği:** beyaz zemin. "Sette neler var" için ürün başına `GoldFrame` mini kart, aralarda `LeafDiamond` kullanılır.
3. **Ürün ızgarası:** standart ürün kartı, premium varyantı (`product-card.md` §3.3).
4. **Hikâye bandı (isteğe bağlı):** gold-50 zemin, tek görsel + metin.

### 5.2 Premium ürün detayı
- Galeri zemini gold-50 + `gold-glow`. Galeri altında `GoldDoubleRule` bulunur.
- Bilgi sütunu beyazdır. Ad üstünde koleksiyon eyebrow'u bulunur. Fiyat bloğu standarttır (rozet yeşil kalır).
- Birincil düğme: premium sayfada `gold-button` + ink-deep **kullanılabilir** (tokens `accent.invariant.primary-button` notu). Öneri ise yeşil birincil düğmenin korunmasıdır (CTA tutarlılığı). Kullanıcı önizlemede ikisini görür.
- "Set içeriği" ve "Kullanım ritüeli" bölümleri derin zeminli bir bant içinde, beyaz kartlarla gösterilir.
- Mobil yapışkan sepete ekle çubuğu: beyaz zemin, üst kenarda 1 px varak çizgi.

### 5.3 Premium kart başka sayfalarda
Normal listede premium ürün kendi kart varyantını korur. Bir ızgarada en fazla 1 satır premium kart bulunur (vitrinde öne çıkarma veriyle yapılır).

## 6. Diğer ürün paletleri
"Gold" dışındaki ürün kimlikleri (ör. pembe bir seri, deniz mavisi bir seri) tam tema almaz. Yalnız `palette.resolved` aksan değişkenleri uygulanır (kart görsel zemini, bant, eyebrow). Yeni bir tam tema (ör. "premium-pearl") gerekirse ui-tasarimci `themes` altına ekler.

## 7. Erişilebilirlik ve performans
Derin zeminde tüm metin ≥ 8:1 kontrastlıdır. Gradyan arkasında metin bulunmaz. Cormorant seçilirse yalnız premium rotalarda yüklenir (`preload: false`), `font-display: swap` ve boyut ayarlı yedek font kullanılır (CLS). SVG süsler satır içi ve 1 KB altındadır.

## 8. Hareket noktaları (→ hareket-tasarimcisi)
Varak çizgilerin soldan sağa çizilmesi · `gold-foil` üzerinde yavaş tek geçişli parıltı (hero girişinde bir kez, döngü yok) · packshot'ın `gold-glow` üzerinde hafif yükselmesi · `CornerFlourish` çizgi animasyonu (stroke-dashoffset) · premium kartın hover'ında çerçeve parıltısı. Reduced-motion açıkken hepsi statik olur.
