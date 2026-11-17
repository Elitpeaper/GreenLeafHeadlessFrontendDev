# Tasarım incelemesi 3: K-184 kapısı, maksimalist ana sayfa + hareket v4

> ui-tasarimci · 2026-11-17 · Kapsam: `/` (brief `ana-sayfa-maximalist.md` v2, K-233…K-244, K-257/K-259/K-260), `/urunler`, `/kategori/cilt-bakimi`, `/urun/ilife-sod-ipek-yuz-kremi`, ek olarak `/koleksiyon/premium-gold` (açık kalan premium süs incelemesi).
> Ortam: zaten çalışan dev sunucusu `localhost:3001` (Next 16.4.6). Headless Chrome, CDP üzerinden. Ölçümler: `docs/qa/ekran/k184-ana-sayfa/olcum.json`, `olcum-b.json`.
> **Önemli ortam bulgusu:** headless Chrome bu makinede varsayılan olarak `data-motion="reduced"` alıyor (Windows "Animasyon efektleri" kapalı, S-060). Yani `def` görüntüleri **azaltılmış hareket** katmanını, `full` görüntüleri `?motion=full` tam katmanını gösterir. Kullanıcının makinesi de büyük olasılıkla ilk açılışta `reduced` katmanını gösterir.

## 1. Görüntüler (`docs/qa/ekran/k184-ana-sayfa/`)
| Dosya | İçerik |
|---|---|
| `home-{def,full}-{360,390,768,1440}-hero.png` | İlk ekran |
| `home-def-{360,390,768,1440}-tam.png`, `home-full-{390,1440}-tam.png` | Tam sayfa (full modda pin ve tek seferlik girişler tam sayfa yakalamada boş görünür; gerçek kaydırmayla `x-full-1440-*.png` doğrulandı) |
| `home-reduced-{390,1440}-hero.png` | Açıkça zorlanmış `prefers-reduced-motion` |
| `intro-1440-{250,600,1000,1700}ms.png` | Giriş kareleri (dev derlemesi yavaş, giriş ilk karede çoğunlukla bitmiş; zamanlama kanıtı hareket-tasarimcisi'nin `motion-v3/-v4` ölçümündedir) |
| `x-full-1440-{vitrin1,kesfet,kesfet-2satir,markalar}.png`, `x-390-*.png` | Gerçek tekerlek kaydırmayla bölüm görüntüleri |
| `{urunler,kategori,urun}-{390,1440}-{ust,tam}.png` | Diğer sayfalar |
| `premium-{1440-ust,1440-2,390-ust}.png` | Premium koleksiyon |

## 2. Otomatik denetim sonucu (16 sayfa × genişlik)
| Kontrol | Sonuç |
|---|---|
| Yatay taşma (360–1440, K-176) | **0** (scrollWidth = viewport her yerde) |
| Boş/`#`/`javascript:` bağlantı (K-182) | **0** |
| İç not metni ("taslak", "önizleme", "yer tutucu", "uzman kontrolü", "örnek eşleşme"…) (K-181) | **0** |
| H1 | Her sayfada 1. Ana sayfa H1 360/390/768/1440'ta **3 satır** (56 / 56 / 85 / 113 px). Kabul 6 karşılanıyor |
| Ürün kartı: Fiyat + Üye fiyatı + PV | Ana sayfada 32/32. Kategori sayfasında 5 yakında kartta PV yok (`pv: null`, K-098 gereği doğru) |
| Düz zeminli metin kontrastı | AA altı **0** (gradyan/foto zeminli metinler ölçülemez; bunlar token oranlarıyla elle kontrol edildi, §4) |
| `img` alt eksik / kırık görsel | 0 / 0 |
| LCP (dev, yerel) | 0,57–1,04 sn, eleman hero fotoğrafı. CLS yüklemede 0 |
| Konsol | `/`'de sunucu tarafı React "unique key" uyarısı (dev rozeti "1 Issue"), kategori/ürün rotalarında Next "URL data during prerendering" uyarısı |

## 3. Sapmalar (önem sırasıyla)

### Yüksek: kullanıcıya göstermeden önce düzeltilmeli
| # | Yer | Sapma | Kanıt | Sahip |
|---|---|---|---|---|
| **Y-1** | Vitrin 1 mobil ray (390/360/768) | İlk kart sol kenara **yapışık** (x = 0). Başlık 18 px'te başlıyor, kart 0'da. Sebep: `snap-start` + `px-gutter`, ama `scroll-padding` yok. Bu yüzden snap, ilk kartı kaydırma kutusunun kenarına hizalıyor (K-176) | `x-390-vitrin1-title.png`, `home-def-390-tam.png` | frontend-gelistirici-B · `src/components/sections/home/Showcase.tsx:61`. `ul`'ye `scroll-px-gutter` (scroll-padding-inline = gutter) eklenmeli |
| **Y-2** | Kapılar, pin kapalı masaüstü (azaltılmış hareket ≥ 1024) | 3 sütunlu ızgara 3 + 2 diziliyor ve sağ altta **1/3 genişlik × ~450 px boş orman alanı** kalıyor. Bu makinede varsayılan katman bu olduğundan kullanıcının ilk göreceği Kapılar hâli büyük olasılıkla budur | `home-def-1440-tam.png` (y ≈ 3600–4300) | hareket-tasarimcisi · `src/components/motion/motion.css:1864–1880` (`html:not([data-motion="on"]) [data-hpin-track]`). Brief §6 v2.1'deki 12 sütun bento kullanılmalı |

### Orta: gösterim sonrasında ilk turda düzeltilmeli
| # | Yer | Sapma | Kanıt | Sahip |
|---|---|---|---|---|
| O-1 | Raf duvarı | "Hijyen ve Kâğıt Ürünleri" 1440'ta ve 390'da "Hijyen ve Kâğıt…" diye kesiliyor (`line-clamp-2`). 1×1 karolarda ürün sayısı yok (brief §4: her karoda sayı) | `d1440` kırpımı, `x-390-shelves-title.png` | frontend-gelistirici-B · `Shelves.tsx:94` (`line-clamp-2` → `line-clamp-3` ya da kısa ad), `Shelves.tsx:97` (`def.size !== "one"` koşulu, ≥ 1024'te 1×1'de de sayı) |
| O-2 | Hero 768 (tablet) | Metin sola dizilmiş, sağ yarı (≈ 370 × 470 px) boş. Kolaj altta ve kontroller ilk ekranın dışında | `home-def-768-hero.png` | frontend-gelistirici-B · `HomeHero.tsx` / `HeroCollage.tsx`: md'de iki sütun (metin 7/12, kolaj 5/12) ya da H1 + kolajı yan yana getiren düzen |
| O-3 | Vitrin 1 başlık | "Tümünü gör (46) →" sağa yaslı değil, sayfa ortasında (x ≈ 912) duruyor. Specimen yaprak için yer bırakılmış ama hizasızlık göze batıyor | `d1440-1` | frontend-gelistirici-B · `Showcase.tsx:39` (bağlantı container sağ kenarına, yaprak bağlantının üstünde/arkasında) |
| O-4 | Vitrin 2 (cream-50) | Kart gövdesi çerçevesiz ve cream-50 üstünde, beyaz plaka yok. K-186 (ONAYLI) "ürün kartı her zaman beyaz" diyor. Fiyat yine açık zeminde, AA geçiyor. Engel değil | `x-full-1440-kesfet-2satir.png` | frontend-gelistirici-A · `ProductCard.tsx` (beyaz olmayan açık zeminde `surface="plate"`: beyaz plaka + card-pad; K-189 orman varyantıyla aynı mekanizma) |
| O-5 | Konsol | `/` sunucu render'ında "Each child in a list should have a unique key" (dev rozeti sunumda "1 Issue" gösteriyor) | `olcum.json › errors` | frontend-gelistirici-B · `HomeHero.tsx` slayt düğümleri / `HeroCollage.tsx` dizileri |
| O-6 | Sürekli ambient hareket | `globals.css:214–222` `.anim-sway` (14 s, `infinite alternate`) ve `.anim-float` (`infinite`) hâlâ tanımlı. `LeafCluster` bunları kullanıyor ve Footer, ListingView, CartDrawer, Membership'te render oluyor. K-158 bu sınıfların kaldırılmasını öngörüyordu. Tam katmanda 5 sn'yi aşan sürekli hareket WCAG 2.2.2 riski taşır (motion.css bunları geçersiz kılıyorsa doğrulanmalı) | kod okuması | hareket-tasarimcisi |

### Düşük: not
| # | Yer | Sapma | Sahip |
|---|---|---|---|
| D-1 | Dev şerit | Mavi satırdaki "Hikâyemiz →" bağlantısı dev yazının üstüne sert kenarla biniyor ("ÜYEYE ÖZEL FİYA" kesik). Bağlantı plakasının soluna 48 px brand-blue → saydam geçiş ya da ayraç `·` önerilir | frontend-gelistirici-B · `GiantBand.tsx:53` |
| D-2 | Kapılar eyebrow | Comfortaa'da "Greenleaf'te" kesmesi `f`'ye yapışıyor ve "Greenleafte" gibi okunuyor. Metin "Greenleaf ile" ya da eyebrow Jost olabilir | icerik-editoru (`home.v2.gates.eyebrow`) |
| D-3 | Kapsayıcı hizası | Hero ve Kapılar `container.wide` (sol 32), Raflar/Vitrinler `max-w-page` (sol 144). Brief gereği bilinçli, ama 1440'ta iki sol kenar görünüyor. Kabul edildi, izlenecek | — |
| D-4 | PDP 1440 | Görsel karosu breadcrumb'dan 6 px içeride (150 ↔ 144) | frontend-gelistirici-A |
| D-5 | `/urunler` | "1681 ürün" hem orman bandında hem araç çubuğunda geçiyor | frontend-gelistirici-A |
| D-6 | CLS | Reduced katmanda 1440'ta programatik hızlı kaydırma sırasında birikimli 0,121 ölçüldü. Yüklemede ve gerçek tekerlekte 0. Gerçek kullanıcı ölçümüyle doğrulanmalı | kalite-denetcisi |

## 4. Brief §13 kabul maddeleri
| # | Madde | Sonuç |
|---|---|---|
| 1 | İlk ekranda işaret, H1, CTA, ≥ 1 packshot; 1440'ta Dev şerit üst satırı | **Geçti** (1440: şerit y = 850'de görünüyor). 390'da şerit ilk ekranda değil; brief v2.1'de madde düzeltildi (hero `100svh − header` ile çelişiyordu) |
| 2 | Giriş: dönerek gelen işaret, opaklıkla H1; reduced'da yalnız opaklık; JS'siz görünür | Son poz 0° ve doğru. Dönme zamanlaması hareket-tasarimcisi `motion-v3/-v4` ölçümüne dayanıyor (dev derlemesinde kare yakalanamadı) |
| 3 | Gerçek metin foto/packshot/kâğıt üstünde değil; AA | **Geçti.** Hero metni orman zeminde, cream-200 başlık / cream-100 gövde (≥ 4.73 / 9.12). Kapılar: earth-900 / tile-sand 6.30, beyaz / earth-deep 8.12, krem / tile-green. Dev şerit forest-950 5.48 / 6.49 / 5.68. Markalar forest-950 / brand-lime 6.49 |
| 4 | Kartlar beyaz + Fiyat + Üye fiyatı + PV; hero/Kapılar packshot'ında yalnız PV | Fiyat üçlüsü **geçti** (32/32). Hero ve Kapılar packshot'larında yalnız PV var. "Beyaz" kısmı Vitrin 2'de sapma: O-4 |
| 5 | Tek bant · 1 doku + 1 desen · ardışık orman yok | **Geçti** (hero → şerit (marka renkleri) → cream → beyaz → orman → cream → lime → orman footer) |
| 6 | 360–1440 taşma yok; H1 360'ta ≤ 3 satır | **Geçti** |
| 7 | LCP ≤ 2,5 sn, CLS ≤ 0,1 | Yerel dev'de geçti (≤ 1,04 sn, 0). Gerçek 4G ölçümü kalite-denetcisi'nde |

## 5. Marka ve kurallar
- **Logo:** header kilidi ve hero işareti resmî dosya, renk ya da kırpma yok. Hero'da `greenleaf-mark.svg` kendi beyaz diskiyle duruyor. **Uygun.**
- **Fiyat açık zeminde:** hiçbir fiyat orman, lime, mavi ya da fotoğraf üstünde değil. Premium koleksiyonda (yakında ürünler) fiyat yerine açık mavi bilgi şeridi var. **Uygun.**
- **§15 kolaj grameri:** hero kolajı 6 katmanı aşmıyor. Fotoğraf −3°, çıkartmalar ±6° içinde. Metin dönmüyor. Dekor "DOĞA" ve dev sayılar kontur ve `aria-hidden`. **Uygun.**
- **Hareket v4:** pin (K-260) 1440'ta panelleri header altında tutuyor ve ilerleme çubuğu çalışıyor (`motion-v4/d12`). 390'da yatay şerit, sonraki karo görünüyor (`x-390-kapilar.png`). Swiper kontrolleri (durdur, oklar, noktalar) görünür. Pin kapalı masaüstü düzeni: Y-2.
- **Premium koleksiyon (açık kalan A notu):** süs seti (köşe kıvrımı, altın çift çizgi, elmas ayraç) ölçülü ve ekranda ≤ 4 süs var. Altın yalnız çizgi/süs/başlık rengi olarak kullanılıyor, metin arkasında değil. **Onaylandı.**

## 6. Hüküm
**Koşullu olarak gösterilebilir.** Marka, fiyat, erişilebilirlik ve K-181/K-182 açısından engel yok. Y-1 (mobil ray kenara yapışık) ve Y-2 (azaltılmış hareket masaüstünde Kapılar'da boş hücre) kullanıcının ilk bakışta göreceği yerlerde ve küçük düzeltmeler. Bu ikisi giderildikten sonra gösterilmesi öneriliyor. Orta ve düşük maddeler gösterimi bekletmez.
