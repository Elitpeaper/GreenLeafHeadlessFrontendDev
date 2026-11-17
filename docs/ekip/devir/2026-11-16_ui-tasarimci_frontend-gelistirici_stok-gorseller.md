---
kimden: ui-tasarimci
kime: frontend-gelistirici (her iki geliştirici) · bilgi: frontend-mimar, hareket-tasarimcisi
tarih: 2026-11-16
durum: AÇIK
ilgili: K-102, K-160, K-161, K-162 · public/images/stock/ · data/content/stock-images.json · docs/tasarim/gorsel-kaynaklari.md
---

## Ne yaptım
K-102 (AI görsel yok) gereği tüm atmosfer görsellerini lisanslı stok fotoğrafla (Unsplash License, sayfa sayfa doğrulandı) karşıladım. 28 webp dosyası `public/images/stock/` altında. Slot → dosya eşlemesi `data/content/stock-images.json` içinde: her slotta `file`, `alt` (TR), `width`, `height`, `blurDataURL` (32 px webp) ve hero'larda `mobile` (1080×1350, 4:5) var.

## Slotlar
| Slot | Kullanım |
|---|---|
| `home.hero.1` / `.2` / `.3` | Ana sayfa hero (tek görsel = `.1`; slayt ise 3'ü). `mobile` alt alanı `<picture>`/`sizes` ile mobilde |
| `brand.story.1`, `brand.story.2` | Hikâye/marka mesajı bölümü (resmî fabrika fotoğrafı gelirse `.1` değişir) |
| `membership.scene` | Üyelik bölümü ve `/uye-ol` başlığı |
| `pv.scene` | PV açıklama bölümü/sayfası (`pv-explainer.md`) |
| `skinFinder.hero` | Cilt tipi bulucu giriş ekranı + mega menü Cilt Bakımı/Makyaj kampanya karosu |
| `skinFinder.texture.dewy`, `skinFinder.texture.aloe` | Bulucu bölüm zeminleri / ana sayfa test bandı |
| `premium.gold.1`, `premium.gold.2` | Premium (gold) koleksiyon sayfası hikâye bandı (`premium-theme.md` §4) |
| `category.<kök>` (12 kök slug'ı) | Kategori sayfası başlık bandı, mobil mega menü kök kapağı (16:7), kampanya karosu. **Kategori karosunda/şeridinde kullanılmaz** (orada packshot kompozisyonu veya ikon, §8.3) |
| `footer.texture` | Footer üst dekoratif şerit (düşük opaklık/maske) |
| `emptyState.texture` | Boş durumlar (boş sepet, sonuç yok, 404) |

## Senden istediğim
1. Görselleri yalnız bu manifestten oku. Dosya yolunu bileşene gömme (sahiplik: tüketim tipi/yardımcısı frontend-mimar'da, istersen `src/config/images.ts`'e bağlasın).
2. `next/image`: `width`/`height` manifestten, `placeholder="blur"` + `blurDataURL`. Hero `priority`, diğerleri lazy. `object-fit: cover` (kategori fotoğraflarının bir kısmı dikey).
3. Dekoratif kullanımda (mega menü, footer dokusu, boş durum zemini) `alt=""`. İçerik görseli olarak kullanılırsa manifestteki `alt`.
4. Görsel üstüne scrim'siz metin yazma (brief kabulü). Metin her zaman beyaz panelde.
5. Yeni bir görsel gerekiyorsa dosyayı kendin ekleme; ui-tasarimci'ye not bırak (lisans kaydı zorunlu, K-102).

## Bilmen gerekenler
- Unsplash atıfı zorunlu değil. Öneri (K-162): footer'da "Fotoğraflar: Unsplash" bağlantılı küçük satır, `/hakkimizda` veya yasal sayfa altında tam liste.
- Hareket noktaları (hareket-tasarimcisi): hero ölçek-in + paralaks (M-2, M-4), hikâye görseli paralaksı (M-22). Fotoğraflar ≥ %10 kırpma payına sahip.

## Kabul kriteri
- Sitede `public/images/stock/` dışında atmosfer görseli yok; her kullanılan dosya manifestte ve `gorsel-kaynaklari.md`'de.
- Hero LCP ≤ 2,5 sn (mobil), CLS 0 (sabit oran + blur).
- Dekoratif kullanımlarda `alt=""`; içerik kullanımlarında TR alt metin.

## Developer B durumu (2026-11-16)
Ana sayfa, PDP, PV, bulucu, üye ol, sertifikalar, hakkımızda, yasal şablon tamam (rapor: Orkestratör). Not ortak olduğu için (Developer A kabuk/kart/listeleme) KAPANDI işaretini A kendi kısmını bitirince yapar.
