# Greenleaf Resmî Mağaza — Varlık (Asset) Envanteri

> Hazırlayan: A1-greenleaf-dil · FAZ 0 · 15 Kasım 2026
> Kaynak site: https://global.green-leaf.shop (kullanıcının açık kullanım izni vardır).
> **Önemli:** Bu belge yalnızca URL envanteridir. **İndirme işi `veri-muhendisi`'ne devredilmiştir.** Ürün görselleri ve büyük görseller indirilmedi; küçük SVG/ikonlardan birkaçı yalnızca renk/içerik incelemesi için `.cache/arastirma/greenleaf/assets/` altına alındı.
> Boyut sütunu: `Content-Length` HTTP başlığından (HEAD) ölçülenler "ölçüldü", HTML `width/height` niteliklerinden gelenler "HTML", bilinmeyenler "?" ile gösterilir.
> Kısaltma: **B** = `https://global.green-leaf.shop` ; **E** = `https://global.green-leaf.shop/extension/greenleaf/catalog/view/image` ; **M** = `https://global.green-leaf.shop/image/catalog/greenleaf/menu-icons`
> Not: Sayfa HTML'inde bazı yollar göreli (`extension/greenleaf/...`), kökten tam URL B + yol şeklindedir; aşağıda tam URL verilmiştir.
> Not 2: Bu mağaza bir partner varyantıdır (store-32); kişiye özel varlıklar (partner portresi/avatarı) "ALMA" olarak işaretlenmiştir.

---

## 1. Logolar

| URL | Tür | Format | Boyut | Amaç / nerede | Not |
|---|---|---|---|---|---|
| https://global.green-leaf.shop/image/catalog/grinlif.png | logo (yatay kilit: rozet + "Greenleaf" yazısı, yeşil) | PNG | 41.292 B; HTML 220×61 (gösterim) | Header logosu, footer logosu, "Ekip" bölümü marka satırı | **ALIN.** Şeffaf/beyaz zemin üzerinde kullanılıyor; piksel boyutu küçük (≈360×110 civarı kestirim) — vektör SVG kaynağı (kullanıcının logo SVG'si) tercih edilmeli. "Logo değiştirilmeden kullanılmalı" (MEMORY §5) |
| https://global.green-leaf.shop/image/catalog/greenleaf-icon.png | logo / favicon (yalnız rozet, lime-yeşil + mavi yaprak kümeleri) | PNG | 84.599 B; ≈1000×950 (görsel okumadan) | `<link rel="icon">` favicon; pinwheel motifinin en net hali | **ALIN.** Yüksek çözünürlüklü; pinwheel motifi için en iyi mevcut kaynak (marka renkleri doğrudan görülüyor) |
| https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/gl-home/benefits-brand.png | logo (wordmark, "Neden Greenleaf" başlığında) | PNG | 49.424 B (ölçüldü); HTML 321×74 | Ana sayfa "Почему выбирают [Greenleaf]" başlığı | UYARLA — yazı renkleri teması |
| https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/benefits/greenleaf-wordmark-gold.png | logo (altın varyant wordmark) | PNG | 459.604 B (ölçüldü) | "О фабрике" bölümü başlığı | **ALMA** — altın varyant marka renkleri dışı; ayrıca ağır |
| https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/gl-shell/original-logo-clear.png | logo (CSS arka plan referansı) | PNG | ? | `gl-shell.css` içinde url() referansı | HEAD alınmadı; veri-muhendisi doğrulasın |

## 2. Favicon

| URL | Tür | Format | Boyut | Amaç | Not |
|---|---|---|---|---|---|
| https://global.green-leaf.shop/image/catalog/greenleaf-icon.png | favicon | PNG | 84.599 B | `<link rel="icon" type="image/png">` | 84 KB favicon için fazla; Türkiye sitesinde 32/180/512 px türevleri üretilmeli |

## 3. Banner / hero (ana sayfa slider)

| URL | Tür | Format | Boyut | Amaç | Not |
|---|---|---|---|---|---|
| https://global.green-leaf.shop/image/catalog/slider/new/slider21.jpg | banner (1. slayt) | JPEG | 195.497 B | Hero slider, `alt="Компания GreenLeaf 16"` | İçerikte Rusça metin/görsel olabilir; görsel içeriği incelenmedi |
| https://global.green-leaf.shop/image/catalog/slider/new/slider34.jpg | banner (2. slayt) | JPEG | 140.233 B | Hero slider | aynı |
| https://global.green-leaf.shop/image/catalog/slider/new/slider33.jpg | banner (3. slayt) | JPEG | 232.886 B | Hero slider | aynı |
| https://global.green-leaf.shop/image/catalog/slider/new/slider32.jpg | banner (4. slayt) | JPEG | 238.897 B | Hero slider | aynı |
| https://global.green-leaf.shop/image/catalog/slider/new/slider31.jpg | banner (5. slayt) | JPEG | 332.283 B | Hero slider | aynı |
| https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/gl-shell/desktop-10.webp | banner (mega menü dekoratif şerit, 1196×120 oran) | WebP | 106.364 B (ölçüldü) | Mega menü paneli üst afişi | Metin içerebilir |
| https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/about/about-greenleaf-family-v2.jpg | fotoğraf (aile/yaşam tarzı) | JPEG | 188.916 B (ölçüldü) | "О фабрике" bölümü ana görseli | Rusya/BDT insan yüzleri olabilir; Türkiye için uygunluk gözden geçirilmeli |
| https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/team/team-invite-portrait.png | fotoğraf (partner portresi) | PNG | 410.400 B | "Ekip" bölümü | **ALMA** — kişiye özel (partner portresi) |
| https://global.green-leaf.shop/image/catalog/ava/Anna-Armash.png | avatar (partner) | PNG | 340.904 B | Sohbet FAB düğmesi avatarı | **ALMA** — kişiye özel |
| https://global.green-leaf.shop/image/cache/catalog/category/beautiful-girl-after-shower-posing-on-white-wall-woman-puts-concealer-to-hide-bruises-under-eyes-300x300.jpg | görsel (kategori hero fotoğrafı, 300×300) | JPEG | ? | Kategori sayfası başlık bandı (`/uhodovaya-kosmetika`) | Stok fotoğraf izlenimi — lisans durumu bilinmiyor; kullanmadan önce kullanıcıyla netleştirin |

## 4. Bölüm süsleri (botanik/yaprak PNG, WebP, dalga SVG)

| URL | Tür | Format | Boyut | Amaç | Not |
|---|---|---|---|---|---|
| E/gl-home/saving-top.png (https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/gl-home/saving-top.png) | süs (yaprak) | PNG | 31.605 B (ölçüldü) | "Выгода" benefit kartı üst yaprak | Desen: her benefit için `*-top.png` / `*-bottom.png` (saving, formula, factory, family) → 8 dosya |
| E/gl-home/{formula,factory,family}-{top,bottom}.png | süs (yaprak) | PNG | ? | Diğer 3 benefit kartı | URL deseni: `https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/gl-home/` + ad |
| E/gl-home/{benefits-left,benefits-right,display-top-left,display-bottom-left,display-bottom-right,section-leaf}.png | süs | PNG | ? | Vitrin paneli köşe yaprakları, eyebrow yaprağı (17px) | `gl-home.css` url() referansları |
| E/gl-home/{display-top-line,display-bottom-line,gold-accent,gold-flourish,coin-base,coin-edge,coin-shadow,coin-top,stat-glow,stat-light,stat-reflection,stat-streak,card-glass,card-glint}.svg | süs (altın/parıltı) | SVG | ? | Altın ayraç, madeni para efekti, parlama | **ALMA** — altın/skeuomorfik efektler |
| E/gl-shell/botanical-base.webp, botanical-left-sprig.webp, botanical-right.webp | süs (header arka plan dalları) | WebP | ? | Header arka planı (`.gl-shell-landscape`) | URL deseni: `https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/gl-shell/` + ad |
| E/gl-shell/footer-branch.png, footer-sprig.png, footer-waves.svg | süs (footer dal/dalga) | PNG / SVG | ? | Footer arka planı | UYARLA |
| E/gl-category/margin-leaves.png | süs (kategori sayfası kenar yaprağı) | PNG | ? | Kategori sayfası | UYARLA |
| E/gl-shell/welcome-leaf.webp | süs / ikon (üst bar yaprak, 34×38) | WebP | 2.104 B (ölçüldü) | Üst bilgi çubuğu "Добро пожаловать" yanındaki yaprak | **ALIN** (küçük; marka yaprağı) |
| E/gl-shell/mobile-15.webp, mobile-16.webp, mobile-17.webp | süs (mobil çekmece arka planı) | WebP | ? | Mobil menü köşe bitkileri | UYARLA |
| https://global.green-leaf.shop/image/catalog/greenleaf/gl-commerce/price-leaf.png | süs (fiyat kutusu yaprağı) | PNG | 15.966 B (ölçüldü) | Ürün detay fiyat kutusu | UYARLA |
| https://global.green-leaf.shop/image/catalog/greenleaf/gl-commerce/{cart,checkout}-leaf-*.png, description-leaf.png, cart-wave.svg, checkout-wave-{a,b}.svg | süs | PNG / SVG | ? | Sepet/ödeme/açıklama arka plan süsleri | Desen: `https://global.green-leaf.shop/image/catalog/greenleaf/gl-commerce/` + ad. UYARLA |

## 5. UI ikonları (çizgi stili, header/aksiyon)

Hepsi Figma'dan dışa aktarılmış **çizgi (stroke) SVG**; stroke ≈ 1.75, `round` uçlar, renk `#17282B`/`#152529`. Yol: `https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/gl-shell/`

| URL | Tür | Format | Boyut | Amaç | Not |
|---|---|---|---|---|---|
| …/gl-shell/heart.svg | ikon (favori) | SVG | 1.056 B (ölçüldü); 31×31 | Header "Избранное" | ALIN (yeniden renklendirilebilir; tek `stroke`) |
| …/gl-shell/compare.svg | ikon (karşılaştır) | SVG | ? | Header "Сравнение" | ALIN |
| …/gl-shell/bag.svg | ikon (sepet) | SVG | 775 B (ölçüldü) | Header "Корзина" | ALIN |
| …/gl-shell/user.svg | ikon (kullanıcı) | SVG | ? | Header "Войти" | ALIN |
| …/gl-shell/search.svg | ikon (arama) | SVG | 736 B (ölçüldü); 25×25 | Arama gönder düğmesi | ALIN |
| …/gl-shell/sparkles.svg | ikon (AI arama) | SVG | ? | "ИИ поиск" düğmesi | UYARLA (AI arama kararına bağlı) |
| …/gl-shell/group.svg | ikon (grup/ortak, beyaz dolgu) | SVG | 806 B (ölçüldü) | "Стать партнёром" CTA | UYARLA ("Üye ol" için) |
| …/gl-shell/arrow.svg, down.svg, rail-chevron.svg, nav-down.svg | ikon (ok) | SVG | ? | CTA oku, select oku, ray oku | ALIN |
| …/gl-shell/nav-menu.svg, nav-shield.svg, nav-phone.svg, nav-info.svg, nav-megaphone.svg, nav-news.svg | ikon (nav bandı: menü, sertifika kalkanı, telefon, bilgi, duyuru, haber) | SVG | ? | Navigasyon bandı bağlantıları | ALIN (nav-shield = sertifika) |
| …/gl-shell/top-phone.svg, top-clock.svg | ikon (üst bar) | SVG | ? | Üst bilgi çubuğu telefon/saat | ALIN |
| …/gl-shell/section-body.svg, section-eyes.svg, section-face.svg, section-feet.svg, section-hair.svg, section-hands.svg | ikon (mega menü bölüm başlığı: vücut, göz, yüz, ayak, saç, el) | SVG | section-face 6.213 B (ölçüldü) | Mega menü alt grup başlıkları | UYARLA — karmaşık path'ler |
| …/gl-shell/mobile-grid.svg, mobile-oral.svg, mobile-personal.svg, mobile-wipes.svg, mobile-women.svg | ikon (mobil menü alt kategori) | SVG | ? | Mobil çekmece | UYARLA |
| …/gl-home/{card-heart,card-compare,card-cart,check,rail-prev,rail-next,rail-view}.svg | ikon (kart/ray) | SVG | ? | Ürün kartı ikon düğmeleri, ray okları, madde işareti onayı | ALIN |
| …/gl-home/{stat-world,stat-bag,stat-layers,stat-idea,stat-families}.svg | ikon (istatistik şeridi) | SVG | stat-world 1.854 B (ölçüldü) | "Neden Greenleaf" altındaki 5'li şerit | UYARLA (gradyan stroke) |
| …/gl-home/{saving,formula,factory,family}.svg | ikon (benefit "madeni para") | SVG | saving 9.471 B (ölçüldü) | 4 benefit kartı | **ALMA** — skeuomorfik, zeytin gradyanlı |
| https://global.green-leaf.shop/image/catalog/greenleaf/gl-commerce/product-plus.svg | ikon (+ adet artır, #256A29) | SVG | 497 B (ölçüldü); 14×14 | Ürün sayfası stepper | ALIN |
| https://global.green-leaf.shop/image/catalog/greenleaf/gl-commerce/{star-filled,star-open,truck,shipping,wallet,coupon,comment,customer,map-pin,address,basket,check,down,heart,compare,product-cart,*-crumb,*-home}.svg | ikon (yorum yıldızı, teslimat, cüzdan, kupon, adres…) | SVG | ? | Ürün/sepet/ödeme sayfaları (35 dosya `gl-commerce.css` referansı) | ALIN (sepet/ödeme akışı tasarımında işe yarar) |
| https://global.green-leaf.shop/catalog/view/stylesheet/fonts/fontawesome/css/all.min.css | ikon fontu (Font Awesome) | CSS + woff2 | ? | `fa-solid/regular/brands` ikonları (sosyal, ok, kalp, sepet) | Lisans: FA Free (CC BY 4.0 / OFL); önerilen: Lucide/Phosphor SVG ile değiştir (karar tasarımcıda) |

## 6. Kategori ikonları

| URL | Tür | Format | Boyut | Amaç | Not |
|---|---|---|---|---|---|
| …/gl-category/home-care.svg | ikon (kök: Ev bakımı) | SVG | 1.608 B (ölçüldü); 36×36 | Kategori sayfası sol kenar çubuğu | Dolgulu, tek renk `#347B16`; yeniden renklendirilebilir |
| …/gl-category/cosmetics.svg | ikon (kök: Bakım kozmetiği) | SVG | 1.973 B (ölçüldü) | Kenar çubuğu | aynı |
| …/gl-category/{hygiene,makeup,accessories,stationery,shoes,textiles,dishes,groceries,children,health,men}.svg | ikon (diğer 11 kök) | SVG | ? | Kenar çubuğu | Yol: `https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/gl-category/` + ad. Toplam 13 kök ikon + `crumb-home.svg`, `crumb-next.svg`, `next.svg` |
| M/gl-137-NNN.svg (111 dosya, ör. `https://global.green-leaf.shop/image/catalog/greenleaf/menu-icons/gl-137-106.svg`) | ikon (alt kategori) | SVG | gl-137-106: 3.440 B (ölçüldü); 48×48 | Mega menü ve kategori çipleri (alt kategori başına bir ikon) | Dolgulu, tek renk `#1C7709`, Figma kaynaklı; ID→kategori eşlemesi için veri-muhendisi menü HTML'inden eşleştirsin (`.cache/arastirma/greenleaf/home.d.html`) |
| …/gl-shell/desktop-0.webp … desktop-9.webp | ikon (kök kategori, "illüstrasyon" WebP, 50×51) | WebP | desktop-0: 3.988 B (ölçüldü) | Mega menü sol sütunu (sıra: Ev bakımı, Bakım kozmetiği, Hijyen, Makyaj, Aksesuar, Kırtasiye, Ayakkabı, Giyim, Mutfak, Gıda) | Renkli/raster; SVG setiyle çakışıyor — tek set seçilmeli |
| …/gl-shell/mobile-0.webp … mobile-13.webp | ikon (mobil menü kök kategori) | WebP | mobile-0: 5.344 B (ölçüldü) | Mobil çekmece (mobile-10/11/12 = Çocuk/Sağlık/Erkek) | aynı |
| …/gl-shell/category-1.webp … category-8.webp | görsel (kategori raylı kartlar, daire fotoğraf) | WebP | category-1: 26.256 B (ölçüldü) | Mega menüdeki "rail" yuvarlak fotoğraflar (`.gl-shell-rail__photo`) | UYARLA |

## 7. Marka (alt marka) logoları

Yol: `https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/gl-home/`

| URL | Tür | Format | Boyut | Amaç | Not |
|---|---|---|---|---|---|
| …/gl-home/brand-berclean.png | marka logosu (Berclean) | PNG | 4.780 B (ölçüldü) | "Наши бренды" rayı | **Dikkat:** MEMORY §6'daki alt markalar (Carich, Easylove, iLife, Kardli, Nilrich, Sealuxe, Yibelle) bu rayda **yok**; ray yalnız 9 marka içeriyor. Marka logosu kullanım hakkı/uygunluğu markalarla ayrıca netleştirilmeli |
| …/gl-home/brand-limancy.png, brand-meoweqlo.png, brand-miaorou.png, brand-morefuture.png, brand-okfad.png, brand-predawn.png, brand-suting.png, brand-yijian.png | marka logosu | PNG | ? | aynı | Küçük dosyalar (≈5 KB sınıfı) |

## 8. Sertifikalar (PDF belgeler)

Sayfa: https://global.green-leaf.shop/index.php?route=account/voucher ("Сертификаты на продукцию", 362 belge: 18 genel + 344 ürün). Belgeler **görsel değil PDF**; sayfada "kalkan/dosya" ikonlu kartlar halinde. **Gözlem:** ISO/GMP/Halal için hazır rozet/logo görseli yok; rozetleri sıfırdan çizmek gerekecek, PDF'ler kanıt bağlantısı olarak kullanılabilir.

| URL | Tür | Format | Boyut | Amaç | Not |
|---|---|---|---|---|---|
| https://global.green-leaf.shop/files/certificates/source/2502121119bQnc6L4hu8.pdf | sertifika (ISO 45001:2018) | PDF | ? | Genel belge | Tarih önekli ad: 25-02-12 |
| https://global.green-leaf.shop/files/certificates/source/2502121117g7KbpdjbFK.pdf | sertifika (ISO 22716:2007 — kozmetik GMP) | PDF | ? | Genel belge | kozmetik GMP standardı |
| https://global.green-leaf.shop/files/certificates/source/2502121114MnudCxTRCM.pdf | sertifika (ISO 9001:2015) | PDF | ? | Genel belge | |
| https://global.green-leaf.shop/files/certificates/source/2502121112QKskW1C76E.pdf | sertifika (ISO 14001:2015) | PDF | ? | Genel belge | |
| https://global.green-leaf.shop/files/certificates/source/2312081412q095xlnWpi.pdf | sertifika (ISO 14001:2015, 2023 sürümü) | PDF | ? | Genel belge | |
| https://global.green-leaf.shop/files/certificates/source/2312081408Z3WOyBdjbM.pdf | sertifika (ISO 9001:2015, 2023 sürümü) | PDF | ? | Genel belge | |
| https://global.green-leaf.shop/files/certificates/source/2312081406ANS7ORN6SW.pdf | sertifika (ISO 45001:2018, 2023 sürümü) | PDF | ? | Genel belge | |
| https://global.green-leaf.shop/files/certificates/source/2312081411ojCdqY5SMl.pdf | sertifika (GMP Cosmetic) | PDF | ? | Genel belge | Brandbook/MEMORY'deki "GMP" iddiasının kanıtı |
| https://global.green-leaf.shop/files/certificates/source/2312081404mqquKfMkwm.pdf | sertifika (Halal Certificate) | PDF | ? | Genel belge | Halal kanıtı |
| https://global.green-leaf.shop/files/certificates/source/2603191327STWa3nwa9S.pdf | sertifika (Halal, Şubat 2026) | PDF | ? | Genel belge | |
| https://global.green-leaf.shop/files/certificates/source/26020416573y831nw9qd.pdf | sertifika (Halal — çaylar) | PDF | ? | Genel belge | |
| https://global.green-leaf.shop/files/certificates/source/2602041656tuR6S1XY3W.pdf | sertifika (Halal — Nilrich) | PDF | ? | Genel belge | |
| https://global.green-leaf.shop/files/certificates/source/2502261123nFCl9soju5.pdf | sertifika (Halal — 9 ürün, Suzhou Luye) | PDF | ? | Genel belge | |
| https://global.green-leaf.shop/files/certificates/source/25022611231TFl2ksZeT.pdf | sertifika (Halal — diş macunu, ARA/Suzhou Luye) | PDF | ? | Genel belge | |
| https://global.green-leaf.shop/files/certificates/source/2502121121lGyqLaUcb7.pdf | sertifika (Halal) | PDF | ? | Genel belge | |
| https://global.green-leaf.shop/files/certificates/source/2601050748kp5mx2zHlg.pdf | sertifika (Changzhou Mingcan Tea Co Ltd, EN) | PDF | ? | Genel belge | |
| https://global.green-leaf.shop/files/certificates/source/24012415417GfgyjPJhU.pdf | sertifika (Kazakistan sertifikaları) | PDF | ? | Genel belge | TR için ilgisiz |
| (344 ürün belgesi: SGR / DS türü; adlar sayfada, URL deseni `…/files/certificates/source/<tarih+kod>.pdf`) | sertifika (ürün bazlı) | PDF | ? | Ürün belgeleri | Rusya/EAEU (СГР = devlet tescil belgesi) belgeleri; **Türkiye'de geçerli değil**, hukuki uyarı gerektirir (TİTCK/ürün güvenliği ayrı). Tam liste: `.cache/arastirma/greenleaf/certs.html` |

## 9. Ödeme / sosyal ikonlar

| URL | Tür | Format | Boyut | Amaç | Not |
|---|---|---|---|---|---|
| (yok) | ödeme ikonları | — | — | — | Footer/ürün sayfasında **ödeme yöntemi ikonu bulunmuyor** (0 eşleşme). Türkiye için iyzico/PayTR sonrası ayrıca temin edilecek |
| Font Awesome `fa-brands fa-instagram/telegram/vk/whatsapp` | sosyal ikonlar | icon font | — | Footer sosyal karoları (`gl-shell.js` ile dinamik) | Görsel dosya yok; kanallar bir JSON uç noktasından geliyor (`?route=extension/greenleaf/common/contacts`) — kişisel partner kanalları, kopyalanmaz |

## 10. Yazı tipleri

| URL | Tür | Format | Boyut | Amaç | Not |
|---|---|---|---|---|---|
| https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/gl-category/roboto-latin.woff2 | font (Roboto Latin, `"Greenleaf Header"`) | WOFF2 | ? | Tema fontu | Poppins değil. Roboto Apache 2.0 — yeniden dağıtım serbest; ancak Türkiye sitesinde Poppins önerilir (soru S1) |
| https://global.green-leaf.shop/extension/greenleaf/catalog/view/image/gl-category/roboto-cyrillic.woff2 | font (Roboto Kiril) | WOFF2 | ? | Rusça için | **ALMA** (Türkçe sitede gereksiz) |

## 11. Ürün görseli URL desenleri (indirilmez, yalnızca desen)

| Desen | Örnek | Amaç | Not |
|---|---|---|---|
| `https://global.green-leaf.shop/image/cache/catalog/product/<ad>-420x420.png` | …/product/48-Gigienicheskie-prokladki-dnevnye-420x420.png | Vitrin kartı görseli | OpenCart yeniden boyutlandırma önbelleği: 250×250, 420×420, 800×800 mevcut |
| `https://global.green-leaf.shop/image/cache/catalog/product/greenleaf/<kod>/main-<w>x<h>.jpeg` | …/greenleaf/yza139/main-800x800.jpeg | Yeni ürün yapısı (ürün kodu klasörü) | Katalogtaki ürün kodları (ör. YZA139) ile eşleşme ihtimali |
| `https://global.green-leaf.shop/image/cache/catalog/eco-blog/2026/10/<slug>-520x320.jpg` | kozha-v-otopitelnyy-sezon-520x320.jpg | Blog kapak | İçerik görselleri; kullanıma konu olmaz (Rusça içerik) |
| `https://global.green-leaf.shop/image/cache/catalog/articles/…`, `…/telegram/greenleaf_family_official/<id>/01-poster-520x320.jpg` | haber görselleri | Şirket haberleri | Telegram kanalı görselleri; hak durumu belirsiz |

---

## 12. Özet ve öneriler (veri-muhendisi için)

1. **Öncelik 1 (marka çekirdeği):** `grinlif.png`, `greenleaf-icon.png`, `welcome-leaf.webp`. Ayrıca kullanıcıdan gelecek **logo SVG + brandbook** esas alınmalı; bunlar yalnızca geçici/yedek.
2. **Öncelik 2 (UI ikon seti):** `gl-shell/*.svg` (≈30 küçük SVG), `gl-home/` kart/ray/stat ikonları, `gl-commerce/*.svg` (35). Hepsi küçük; tek tek HEAD ile 0.5–10 KB aralığında ölçüldü. Renkler tek `stroke`/`fill` olduğundan token'dan yeniden renklendirilebilir.
3. **Öncelik 3 (kategori ikonları):** 13 kök (`gl-category/*.svg`) + 111 alt (`menu-icons/gl-137-*.svg`). ID→ad eşlemesi menü HTML'inde (`home.d.html` satır 85–410 / kategori çipleri) mevcut; eşleme tablosu veri-muhendisi çıkarmalı. Not: 111 ikon yalnızca ana sayfa+kategori HTML'inde sayılan; tümü tam liste olmayabilir.
4. **Marka renklerini taşıyan** tek görseller logo/favicon; diğer tüm süsler koyu-yeşil/altın temalı → **brandbook paletine geçilecekse yeniden renklendirilmeli veya hiç alınmamalı**.
5. **Sertifikalar PDF**: sitede ayrı kullanım için ISO 9001/14001/45001/22716, GMP Cosmetic, Halal (genel) PDF'leri bağlanabilir. Rozet görselleri resmî mağazada yok; ui-tasarimci çizecek. `СГР/ДС` belgeleri Rusya/EAEU'ya ait → Türkiye'de doğrudan sunulmamalı (hukuk-uyum görüşü gerekli).
6. **ALMA listesi:** `team-invite-portrait.png`, `Anna-Armash.png` (kişisel), `greenleaf-wordmark-gold.png`, madeni para/altın SVG efektleri, `roboto-cyrillic.woff2`, kategori hero stok fotoğrafı (lisans belirsiz).
7. **Kullanıcının açık izni** bu sitenin verisi, görseli, SVG'si ve tasarım dili için geçerlidir; yine de üçüncü taraf stok fotoğrafları ve alt marka logoları için netleştirme önerilir (soru).
8. Önbellekte incelenen dosyalar: `.cache/arastirma/greenleaf/assets/` (logo, favicon, 9 küçük SVG).
