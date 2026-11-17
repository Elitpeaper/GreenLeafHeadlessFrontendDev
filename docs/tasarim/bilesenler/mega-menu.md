# Bileşen — Mega menü (`MegaMenu`, `MobileNavDrawer`)

> ui-tasarimci · v1 · 2026-11-16 · Dayanak: K-050 (12 kök), K-064 (**çok detaylı ve görselli**), K-066 (hover-recolor bölgesi), BILGI-MIMARISI §3.2–3.3 · ÖNERİ K-077
> Etkileşim kuralları (açılış, niyet gecikmesi, klavye) BILGI-MIMARISI §3.2'deki gibidir. Bu belge görsel düzeni tanımlar.

## 1. Masaüstü (≥ 1024 px)

### 1.1 Düzen
Header'ın altından açılan tam genişlik panel. İç genişlik `container.wide` (90rem). Yükseklik içerikle belirlenir, en fazla `100dvh − header`. Panel zemini beyaz, gölge `overlay`, alt kenarda **thin çizgi bandı** (`--stripe-*`, hover-recolor bölgesi). Arka plan sayfası %30 ink karartma alır.

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ KÖKLER (280px)      │ ALT KATEGORİLER (esnek)                          │ ÖNE ÇIKAN (320px)│
│ ┌──┐ Cilt Bakımı  › │  Cilt Bakımı                         Tümü (250) →│ ┌──────────────┐ │
│ └──┘ 250 · TR 18    │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐     │ │ SET kartı    │ │
│ ┌──┐ Makyaj       › │  │ görsel │ │ görsel │ │ görsel │ │ görsel │     │ │ (mini kart + │ │
│ ...                 │  │ Temizl.│ │ Tonik  │ │ Serum  │ │ Krem   │     │ │ fiyat + PV)  │ │
│ (12 satır)          │  │  32    │ │  14    │ │  21    │ │  40    │     │ └──────────────┘ │
│                     │  └────────┘ └────────┘ └────────┘ └────────┘     │ ┌──────────────┐ │
│                     │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐     │ │ KAMPANYA /   │ │
│                     │  │  ...   │                                       │ │ tanıtım karo │ │
│                     │  Metin listesi: kalan alt kategoriler (2 sütun)   │ │ (görsel+başl)│ │
│                     │                                                   │ └──────────────┘ │
├─────────────────────┴───────────────────────────────────────────────────┴──────────────────┤
│ ════════ thin stripe ════════                                                              │
```

### 1.2 Sol sütun — kökler
- Satır 56 px: 40 px yuvarlak **kategori küçük görseli** (§8.3 kompozisyon kırpımı; yoksa duotone ikon) + ad (base 500) + alt satırda "250 ürün · 18'i Türkiye'de" (xs ink-muted).
- Seçili kök: `--accent-soft` zemin, solda 3 px `--accent-decor` dikey çubuk, ad 600. Hover (ince işaretçi) seçer, ~150 ms niyet gecikmesi uygulanır (BILGI-MIMARISI).
- Kök sırası BILGI-MIMARISI'ndeki gibidir. "Setler" satırı altın değil, normal görünür.

### 1.3 Orta alan — alt kategoriler
- Başlık satırı: kök adı (2xl 600) + sağda "Tüm {Kök} ürünleri (N) →" (`--accent-text` link).
- **Görselli karolar:** en çok 8 alt kategori (ürün sayısına göre). Karo 4:3 görsel (radius md, `--accent-soft` zemin, packshot kompozisyonu) + ad (sm 500) + sayı (xs ink-muted). 4 sütun.
- Kalan alt kategoriler görsellerin altında 2 sütunlu metin listesi olarak gösterilir (ad + sayı).
- Yalnız yakında ürünü olan alt kategori sönük gösterilmez. Sayının yanında "yakında" etiketi (xs blue-800) bulunur.

### 1.4 Sağ sütun — öne çıkan (K-064)
Yukarıdan aşağı en çok 2 karo bulunur:
1. **Öne çıkan ürün/set kartı:** seçili kökün `megaFeatured` ürünü (yoksa kökün ilk TR ürünü). Mini kartın büyütülmüş dikey hâlidir: görsel 4:3, ad, **Fiyat + Üye fiyatı rozeti + PV** (ikisi birlikte). Düğme yoktur (bağlantıdır). Ürünün `palette`'i varsa bu kart **hover-recolor tetikleyicisidir**: üzerine gelince panelin sağ sütun zemini, alt bandı ve seçili kök çubuğu ürün paletine geçer.
2. **Kampanya/tanıtım karosu:** `megaMenu.campaigns[kök]` yapılandırmasından gelir (görsel, eyebrow, başlık, bağlantı). Görsel tam karo ve radius lg olur. Metin görselin altındaki beyaz panelde durur, görsel üstüne yazılmaz. Varsayılanlar: Cilt Bakımı/Makyaj → "Cildine uygun ürünü bul" (stok atmosfer `skinFinder.hero`, blue-50 panel) · diğerleri → "{Kök}: Türkiye'de satışta olanlar" · Setler → premium set varsa premium-gold karo.
- Kampanya karosunda sahte aciliyet, geri sayım ve yüzde **yoktur**.
- Veri yoksa karo kapanır ve orta alan genişler.

### 1.5 Durumlar
Kapalı · açılıyor · açık (kök seçili) · kök değişiyor (orta alan çapraz geçiş) · görseller yükleniyor (karo iskeleti, sabit oran) · veri yok (yalnız metin listesi, düzen bozulmaz).

## 2. Mobil ve tablet (< 1024 px) — çekmece
- Soldan açılır, genişlik `min(88vw, 400px)`, tam yükseklik, üst kenarda thin çizgi bandı. Başlık satırında logo (küçük) ve "Kapat" (44 px) bulunur.
- **Seviye 1:**
  1. Vurgulu satır: "Cildine uygun ürünü bul" (blue-50 zemin, duotone ikon, ›).
  2. "Kategoriler" başlığı + 12 kök satırı (64 px): 48 px yuvarlak küçük görsel + ad + "N ürün" + ›.
  3. Hızlı bağlantılar (ikonlu, 52 px): Türkiye'de satışta · Setler · **PV nedir?** · Favoriler · Sertifikalar · Hakkımızda ve iletişim.
  4. Alt yapışkan alan: tam genişlik "Üye ol" (56 px, birincil) + "Greenleaf üye girişi ↗" metin bağlantısı.
- **Seviye 2 (sağdan kayan panel):** "‹ Geri" + kök adı · 16:7 **kök kapak görseli** (kategori kompozisyonu, radius md) · "Tüm {Kök} (N)" satırı · alt kategoriler: 56 px küçük görselli liste satırları (görsel + ad + sayı) · en altta öne çıkan ürün/set mini kartı (fiyat + üye fiyatı + PV) · varsa kampanya karosu (görsel üstte, metin altta).
- Dokunmatikte hover-recolor yoktur (K-066).

## 3. Erişilebilirlik
- Tetikleyici `button` "Kategoriler" olur, `aria-expanded` ve `aria-controls` taşır. Panel `role` olarak gezinme bölgesidir (`nav aria-label="Kategoriler"`). Menü rolü (`menu`) **kullanılmaz** (bağlantı listesi).
- Klavye davranışı BILGI-MIMARISI §3.2'deki gibidir. Kök listesinde ↑/↓ seçimi değiştirir. Tab orta alana geçer.
- Görsellerin `alt` metni boştur (dekoratif; ad metni yanındadır).
- Çekmece odak hapsi kullanır, Esc ve geri hareketiyle kapanır, kaydırma kilidi uygular, odak tetikleyiciye döner.

## 4. Hareket noktaları (→ hareket-tasarimcisi)
Panelin açılıp kapanması (üstten kayma + solma) · kök değişiminde orta alanın çapraz geçişi · karoların kademeli belirmesi (yalnız ilk açılışta) · karo hover'ında görselin yakınlaşması · seçili kök çubuğunun kayması · alt çizgi bandının çizilmesi · çekmece kayması ve seviye 2 paneli · **hover-recolor** (sağ sütun zemini, alt bant, kök çubuğu).

## 5. Veri gereksinimi
`getCategories()` → `slug, title, image?, icon, productCount, trCount, children[]` · `megaFeatured` (kök başına ürün kodu, yapılandırma) · `megaMenu.campaigns` (yapılandırma: `image, alt, eyebrow, title, href, theme?`). Kategori görselleri veri-muhendisi'nden gelir (devir notu).
