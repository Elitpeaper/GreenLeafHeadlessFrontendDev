# Sayfa Haritası

> Sahip: proje-yoneticisi (URL ve indeksleme kuralları seo-uzmani ile kesinleşir) · Son güncelleme 2026-11-16 · Durum: Kapı 1 geçti (değişikliklerle)
> URL kuralı (K-051 ONAYLI + K-087 ÖNERİ): küçük harf, Türkçe karakter dönüştürülmüş slug, dil öneki yok, sonda eğik çizgi yok, filtre ve sıralama sorgu parametresinde.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | `/odeme/*` (4 sayfa) kaldırıldı | K-068 |
| 2026-11-16 | `/cilt-testi`, `/cilt-testi/sonuc` kaldırıldı → `/cilt-tipine-gore` (+ `/cilt-tipine-gore/{tip}`) | K-069, K-089 |
| 2026-11-16 | `/pv-nedir` eklendi (P0) | K-062, K-086 |
| 2026-11-16 | Temalı koleksiyon/ürün sayfaları: yeni URL ailesi yok, mevcut şablonların tema varyantı | K-065, K-092 |
| 2026-11-16 | `/yasal/e-posta-acik-riza` eklendi (e-posta adımı açılmadan önce) | K-090 |
| 2026-11-16 | `/pv-nedir`'e "Greenleaf iş fırsatı" bölümü (kullanıcı K-085, K-015 İPTAL); ayrı sayfa açılmaz | K-085, K-099 |

**Öncelik:** P0 = tam tasarlanır, Kapı 2'de önizlemede onaylanır · P1 = P0 bileşenlerinden türetilir, ilk yayında var · P2 = sonraki faz.
**Faz:** "İlk yayın" = tam sitenin ilk canlıya çıkışı. Ara sayfa (K-046) bu haritanın dışındadır; tam site yayına girince `/` adresini devreder.

## 1. Sayfa listesi

| # | Sayfa | URL | Öncelik | Faz | İndeks | Wireframe | Not |
|---|---|---|---|---|---|---|---|
| 1 | Ana sayfa | `/` | P0 | İlk yayın | Evet | `wireframe/ana-sayfa.md` | Görsellik + animasyon önceliği (K-070) |
| 2 | Kök kategori | `/kategori/{kok}` | P0 | İlk yayın | Evet | `wireframe/kategori.md` | 12 kök |
| 3 | Alt kategori | `/kategori/{kok}/{alt}` | P0 | İlk yayın | Evet | `wireframe/kategori.md` | |
| 4 | Koleksiyon | `/koleksiyon/{anahtar}` | P1 | İlk yayın | Evet (boş değilse) | `wireframe/kategori.md` §Varyant | |
| 4a | **Temalı koleksiyon** | `/koleksiyon/{anahtar}` (koleksiyonun `theme` alanı dolu) | **P0** (en az 1 örnek) | İlk yayın | Evet | `wireframe/premium-tema.md` | Ör. altın temalı set koleksiyonu; anahtar veriden (S-029) |
| 5 | Arama sonuçları | `/arama?q=…` | P0 | İlk yayın | Hayır | `wireframe/arama.md` | |
| 6 | Ürün detay | `/urun/{slug}` | P0 | İlk yayın | Evet | `wireframe/urun-detay.md` | Durumlar: TR · yakında · temalı (K-092) |
| 7 | Sepet | *(drawer; sayfa yok)* | P0 | İlk yayın | — | `wireframe/sepet-drawer.md` | `/sepet` → `/` + drawer açık |
| 8 | Üye ol | `/uye-ol` | P0 | İlk yayın | Evet | `wireframe/uye-ol.md` | |
| 9 | **PV nedir** (+ "Greenleaf iş fırsatı" bölümü `#is-firsati`) | `/pv-nedir` (ui-tasarimci önerisi `/pv`; seo-uzmani seçer) | **P0** | İlk yayın | Evet | `wireframe/pv.md` | Ana mesajlardan biri (K-062). Kazanç içeriği (K-085) sitede yalnız bu bölümde, atıf + "garanti değildir" uyarısıyla (K-099) |
| 10 | **Cilt tipine göre ürün bulucu** | `/cilt-tipine-gore?tip=…&hassas=…&ihtiyac=…&rutin=…` | P0 | İlk yayın | Evet (parametresiz hâl) | `wireframe/cilt-tipine-gore.md` | Parametreli hâller noindex, kanonik parametresiz |
| 11 | Cilt tipine göre ön seçimli | `/cilt-tipine-gore/{tip}` (`kuru`, `yagli`, `karma`, `normal`, `hassas`) | P1 | İlk yayın | Evet | aynı | 5 sayfa; SEO giriş kapısı; seo-uzmani onaylar |
| 12 | Sertifikalar | `/sertifikalar` | P1 | İlk yayın | Evet | §2.1 | |
| 13 | Hakkımızda ve iletişim | `/hakkimizda` (`#iletisim`) | P1 | İlk yayın | Evet | §2.2 | |
| 14 | Favoriler | `/favoriler` | P1 | İlk yayın | Hayır | §2.3 | |
| 15 | KVKK aydınlatma metni | `/yasal/kvkk-aydinlatma-metni` | P1 | İlk yayın | Evet | §2.4 | E-posta işleme bölümü eklenir (K-090) |
| 16 | Çerez politikası | `/yasal/cerez-politikasi` | P1 | İlk yayın | Evet | §2.4 | |
| 17 | Kullanım koşulları | `/yasal/kullanim-kosullari` | P1 | İlk yayın | Evet | §2.4 | Fiyatların bilgi amaçlı olduğu, online ödemenin henüz açık olmadığı yazar |
| 18 | E-posta açık rıza / ticari ileti onay metni | `/yasal/e-posta-acik-riza` | P1 | E-posta adımı açılmadan önce | Evet | §2.4 | Uzman kontrolü zorunlu |
| 19 | 404 | *(bilinmeyen adres)* | P1 | İlk yayın | Hayır | §2.5 | |
| 20 | Hata (500) | *(sistem)* | P1 | İlk yayın | Hayır | §2.5 | |
| 21 | Ödeme adımları | — | P2 | Backend/ödeme fazı | — | — | K-068: bu fazda yapılmaz |
| 22 | Mesafeli satış · Ön bilgilendirme · İade ve cayma | `/yasal/…` | P2 | Ödeme açılmadan önce | Evet | yasal şablon | |
| 23 | Rehber (blog), İçerik sözlüğü | `/rehber…`, `/icerik-sozlugu…` | P2 | Sonraki faz | Evet | — | |
| 24 | Giriş / kayıt / hesabım | — | P2 | Backend fazı | — | — | K-017 |

**Yönlendirmeler (seo-uzmani'ye):** `/sepet` → `/` (drawer açık) · `/iletisim` → `/hakkimizda#iletisim` · `/kategori` → `/` · `/urun` → `/` · `/pv` → `/pv-nedir` · `/cilt-testi` → `/cilt-tipine-gore` (ara sayfada veya dış yerlerde bu adres anılmışsa) · `/odeme` ve alt adresleri → `/` (drawer açık). Slug değişince eski slug 301.

## 2. Wireframe dosyası olmayan P1 sayfalar — kısa tarif

### 2.1 Sertifikalar (`/sertifikalar`)
- **Amaç:** ISO/GMP/Helal iddiasını belgeyle göstermek.
- **Bölümler:** (1) Başlık + 2 cümle (üretici düzeyindeki belgeler). (2) Belge kartları: rozet, belge adı, düzenleyen kuruluş, kapsam, geçerlilik, "Belgeyi aç (PDF)" yeni sekmede, dosya boyutu. (3) Kaynak notu. (4) Tek CTA "Ürünleri keşfet" → `/koleksiyon/turkiyede-satista`.
- **Veri:** `certificates[]`: `id, title, type, issuer, scope, validUntil, pdf, badge`. EAEU belgeleri yok (K-045).
- **Boş/eksik:** PDF yoksa kart görünmez. **Mobil:** tek sütun.

### 2.2 Hakkımızda ve iletişim (`/hakkimizda`)
- Greenleaf kimdir (Çin merkezli, Suzhou) → bu site kimin (K-047 yer tutucuları) → sertifika rozet şeridi → `#iletisim` (e-posta, telefon; **form yok**) → künye tablosu (boş satır gizli).
- **Tek CTA:** "Ürünleri keşfet". Üyelik yalnız metin bağlantısı.

### 2.3 Favoriler (`/favoriler`)
- Cihazda saklanan kod listesi; veri her açılışta okunur; yayından kalkan sessizce düşer + not. Yakında ürünler eklenebilir. Kartlar PV dahil standart kart.
- **Boş durum:** "Henüz favorin yok" + "Türkiye'de satışta olanları gör".

### 2.4 Yasal şablon (`/yasal/*`)
- Başlık, son güncelleme, içindekiler (≥ 4 başlık), metin; okuma genişliği sınırlı. Metinler icerik-editoru + uzman.
- KVKK aydınlatma metni **e-posta işleme** amacını, hukuki sebebini, aktarılan servisi (servis belli olunca; yurt dışı aktarım varsa ayrıca) ve saklama süresini kapsar (K-090).

### 2.5 404 ve hata
- 404: kısa mesaj, arama kutusu, 4 kök kategori, "Ana sayfaya dön"; ürün adresi geçersizse aynı kategoriden 4 TR ürünü (biliniyorsa).
- Hata: "Bir şeyler ters gitti" + "Tekrar dene" + ana sayfa.

## 3. Global bileşenler (her sayfada)
Duyuru şeridi (isteğe bağlı; taslak metin: "Online alışveriş çok yakında. Üyelere özel fiyatlar için üye ol →") · Header (mikro animasyonlar, hover renk geçişi bölgesi — K-093) · **Görselli mega menü** / mobil görselli çekmece (`wireframe/mega-menu.md`) · Anlık arama paneli · Sepet drawer (`wireframe/sepet-drawer.md`) · Hesap paneli (K-017) · Footer (mikro animasyonlar). Ayrıntı: `BILGI-MIMARISI.md` §3.
