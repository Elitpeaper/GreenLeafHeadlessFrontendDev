# Bileşen — Ürün kartı (`ProductCard`)

> ui-tasarimci · v1 · 2026-11-16 · Dayanak: K-030, K-036, K-052 (fiyat kısmı), K-059, K-062, K-065, K-066 · ÖNERİ K-076
> Sitenin **tek** ürün kartıdır. Listeleme, vitrin, arama, cilt testi sonucu ve favorilerde kullanılır. Mini varyantı mega menü, arama paneli ve drawer önerilerinde yer alır.

## 1. Anatomi (dikey kart, yukarıdan aşağı)
```
┌───────────────────────────────┐  radius lg (20), bg surface, border 1px line, shadow card
│ [Rozet]                  (♡) │  ← media: 1:1, bg var(--accent-soft), ürün %76
│                               │     rozet sol üst (en çok 1), favori sağ üst (44×44)
│          [ packshot ]         │
│                               │
├───────────────────────────────┤  ← card-pad (14→20)
│ CARICH                        │  marka: xs/sm 500, ink-muted, büyük harf, 0.08em
│ Nemlendirici yüz kremi,       │  ad: base→xl 500, ink, en çok 2 satır + "…"
│ hassas ciltler için           │
│ 50 ml · Kuru, hassas cilt     │  meta: sm, ink-muted, tek satır (hacim · kimin için)
│                               │
│ Fiyat           ┌───────────┐ │  fiyat bloğu (bkz. §2)
│ ₺1.299,90       │Üye fiyatı │ │
│                 │ ₺649,95   │ │
│                 └───────────┘ │
│ (PV 12,5 ⓘ)                   │  PV çipi
│ ┌───────────────────────────┐ │
│ │       Sepete ekle         │ │  birincil düğme, tam genişlik, 48 px, her zaman görünür
│ └───────────────────────────┘ │
└───────────────────────────────┘
```
- Kartın tamamı detaya gider. Uygulama: başlık bağlantısı `::after` ile kartı kaplar. Favori ve "Sepete ekle" bunun üstünde (z-index) ayrı hedeflerdir.
- Kart yükseklikleri bir sırada eşittir. Fiyat bloğu ve düğme kartın altına yaslanır (`mt-auto`), ad 1 satırsa boşluk ad ile meta arasında kalır.

## 2. Fiyat bloğu (K-036, K-059)
| Öğe | Stil | Not |
|---|---|---|
| "Fiyat" etiketi | xs 500, ink-muted | Görünür etiket şarttır |
| Fiyat tutarı | lg 600, ink, `tabular-nums` | "₺1.299,90" + sr-only " TL" |
| Üye fiyatı rozeti | bg **green-700**, beyaz metin (5.35), radius md, iç boşluk 6×10 | Üstte "Üye fiyatı" xs 500, altta tutar lg 700. **Tema ve palet tarafından değiştirilmez** |
| PV çipi | bg lime-100, metin lime-700 (5.57), radius pill, xs 600 | "PV 12,5" + ⓘ düğmesi (popover: K-060 metni + "PV nedir?" → `/pv`). Çip 32 px görünür, hedef 44 px |

- **Yerleşim:** Kart iç genişliği ≥ 220 px ise Fiyat solda, rozet sağda, aynı satırda (baseline hizalı) durur. < 220 px ise (mobil 2 sütun) alt alta dizilir: önce Fiyat satırı, sonra tam genişlik rozet (etiket ve tutar yan yana tek satırda). Uygulamada container query kullanılır, viewport sorgusu kullanılmaz.
- Okuma sırası (ekran okuyucu): "Fiyat 1.299,90 TL. Üye fiyatı 649,95 TL. 12,5 PV."
- Üstü çizgi, yüzde ve "tasarruf" yoktur. Rozetin içinde ok veya indirim ikonu yoktur.

## 3. Varyantlar
### 3.1 Türkiye'de satışta (varsayılan)
Yukarıdaki anatomi.

### 3.2 "Türkiye'ye yakında" (K-052 fiyat kısmı + K-062)
- Rozet: "Türkiye'ye yakında" (blue-100 zemin + blue-800 metin, 7.14, saat değil **yaprak/filiz** ikonu). Başka rozetle birlikte gösterilmez.
- Görsel normal renkte kalır. Gri tonlama ve soluklaştırma yapılmaz (ürünü kusurlu gösterir).
- Fiyat bloğunun yerinde tek satır bilgi bulunur: "Fiyatı Türkiye'de satışa çıkınca açıklanacak" (sm, ink-muted; metni icerik-editoru verir). **PV çipi görünür.**
- Düğme yerinde **aynı yükseklikte** ikincil, çerçeveli bir bağlantı görünümü yer alır: "Ürünü incele →". Sepete ekle yoktur. Kart yüksekliği satıştaki kartla aynı kalır.
- Favori kalbi vardır (K-052).

### 3.3 Temalı (K-065)
- Ürün verisinde `palette.resolved` varsa kart kökünde bu değerler `style` ile `--accent-*` olarak yazılır. Etkilenen alanlar: görsel zemini (`--accent-soft`), hover'da üst kenarda beliren 3 px bant (`--stripe-1/2/3`), mini "koleksiyon" etiketi (`--accent-text`).
- Ürünün `themeHint` değeri "gold" veya "premium" ise ve yapılandırmada etkinse kart `data-theme="premium-gold"` alır:
  - 1 px çerçeve altın varak gradyanı (`--accent-gradient`, border-image veya iç SVG). Gölge `gold` olur.
  - Görsel zemini `gold-50` ve arkada `gold-glow` radyali bulunur. Görselin alt kenarında ince çift altın çizgi yer alır.
  - Marka satırının üstünde "PREMIUM SET" eyebrow'u (`--accent-text` gold-800, 6.37) bulunur.
  - Ad, fiyat bloğu, PV ve "Sepete ekle" **değişmez** (fiyat açık zeminde kalır, rozet yeşil kalır).

### 3.4 Mini kart (yatay)
Mega menü, arama paneli, drawer önerileri ve boş sepet için kullanılır: 72–96 px kare görsel + marka, ad (2 satır) + Fiyat / Üye fiyatı (küçük, tek satır: "₺1.299,90 · Üye ₺649,95" — "Üye" kelimesi rozet içinde) + PV çipi. Düğme yoktur (tamamı bağlantıdır). Yer çok darsa fiyatlar birlikte gizlenir, yalnız PV kalır.

### 3.5 Durumlar
| Durum | Görünüm |
|---|---|
| Varsayılan | shadow card, border line |
| Hover (yalnız `pointer:fine`) | shadow lift, görsel hafif yakınlaşma, üst kenarda 3 px tema bandı belirir · **→ hareket** |
| Klavye odağı | Kartın tamamında odak halkası (`:focus-within` yalnız başlık bağlantısı odaktayken). Düğme ve kalbin kendi halkası vardır |
| Basılı (düğme) | green-800 |
| Ekleniyor/Eklendi | Düğme "Eklendi ✓" metnine geçer (1,2 sn), sayaç ve drawer tetiklenir · **→ hareket** |
| Favoride | Kalp dolu (green-700), `aria-pressed="true"` · **→ hareket (pop)** |
| Yükleniyor (iskelet) | Aynı ölçüde: görsel kare + 3 metin çubuğu + fiyat bloğu + düğme. `surface-muted` zemin, CLS 0 · **→ hareket (shimmer, reduced'da yok)** |
| Görsel hatası | `--accent-soft` zemin + kategori ikonu + ürün adı (sm). Kırık ikon gösterilmez |
| Tükendi (gelecek, K-025) | Rozet "Tükendi" (surface-muted + ink), düğme `aria-disabled` "Tükendi" (surface-muted zemin, ink-muted 5.90, çerçeve line-strong) |
| Satır içi hata (sepete eklenemedi) | Düğme altında danger metin "Eklenemedi, tekrar dene" |

## 4. Mobil
- 360 px'te 2 sütun ve 12 px boşluk kullanılır, kart genişliği yaklaşık 158 px olur. Fiyat blokları alt alta dizilir (§2). Ad 16 px, düğme 48 px ve "Sepete ekle" metni tek satır olur. Sığmazsa ikon + "Ekle" kullanılır; erişilebilir ad "Sepete ekle: {ürün adı}" olur.
- Raylarda kart genişliği %78 olur (1,15–1,3 kart görünür).
- Hover efektleri dokunmatikte yoktur. Kartta uzun basma menüsü yoktur.

## 5. Erişilebilirlik
- `<article aria-labelledby>`. Başlık h3 (bölüm başlığının altında) olur.
- "Sepete ekle" erişilebilir adı "Sepete ekle: {ad}" olur. Kalp `aria-pressed` alır, adı "Favorilere ekle: {ad}" olur.
- PV ⓘ bir `button` olur ve `aria-expanded` popover açar. Esc ile kapanır.
- Rozet metni gerçek metindir (görsel değil).
- Renk yalnız süstür. Fiyat türü daima metin etiketiyle verilir.

## 6. Hareket noktaları (→ hareket-tasarimcisi)
Hover yakınlaşma ve gölge · üst tema bandının belirmesi · "Eklendi" düğme geçişi · kalp pop · iskelet shimmer · raydaki ilk girişte kademeli belirme · hover-recolor bölgesinde kartın **tetikleyici** rolü (bkz. `hover-recolor.md`).

## 7. Veri gereksinimi
`images[0] (+bg)`, `brand.title`, `title`, `volume`, `skinType/concerns` (ilk 1–2, Türkçe etiket), `price`, `memberPrice`, `pv`, `availability (tr|yakinda)`, `badges[]`, `palette? {primary, secondary, tertiary, onPrimary}` + derlenmiş `palette.resolved`, `themeHint?`, `stock?`.
