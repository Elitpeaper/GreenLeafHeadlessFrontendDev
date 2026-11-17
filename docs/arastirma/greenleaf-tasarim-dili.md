# Greenleaf Resmî Mağaza — Tasarım Dili, Bilgi Mimarisi ve Varlık Analizi

> Hazırlayan: A1-greenleaf-dil (PAZAR-ARASTIRMACI altında) · FAZ 0 Discovery · Tarih: 15 Kasım 2026
> Kapsam: https://global.green-leaf.shop (OpenCart tabanlı, Rusça resmî mağaza). Kod yazılmamıştır; yalnızca araştırma.
> Yöntem: Ana sayfa, 2 kategori, 2 ürün ve sertifika sayfasının HTML'i ile **16 CSS dosyası** ve 8 JS dosyası `curl` ile çekilip regex/grep ile analiz edildi. Ham dosyalar: `.cache/arastirma/greenleaf/`.
> Gösterim: **Gözlem** = doğrudan HTML/CSS kanıtı. **Yorum** = benim değerlendirmem (karar değildir).
> Marka notu: Greenleaf, Suzhou merkezli **Çin firmasıdır**; "Rus markası" denmez. Mağaza arayüz dili Rusçadır çünkü en güçlü pazarı Rusya/BDT'dir.

---

## 0. Yönetici özeti (en kritik 8 bulgu)

1. **Gerçek CSS'te brandbook renkleri yok.** `#4EAE36`, `#86B726`, `#30A8D7` değerleri 16 CSS dosyasının hiçbirinde ve HTML'de geçmiyor (grep: 0 sonuç). Poppins ve Futura da hiçbir yerde geçmiyor. **MEMORY §5 ile çelişen bulgu.**
2. Mağaza fiilen **koyu orman yeşili + altın (gold) metalik** paleti kullanıyor (ör. `#0b5a32`, `#173923`, `#16490d` + `#d9a33b`, `#c69129`, altın gradyanlar). Mavi neredeyse yok (yalnızca OpenCart varsayılan şablon kalıntısı `#1f90bb`/`#229ac8`, ve `natalia.css`'te bir kez `#279bd3`).
3. Font **Roboto** (self-host woff2, `font-family:"Greenleaf Header"` adıyla), başlıklarda bir sayfada Georgia serif. **Poppins yok.**
4. Logo ve favicon ise **brandbook renklerini taşıyor**: pinwheel/rozet işareti lime-yeşil + açık mavi, çakışmalarda koyu yeşil ve koyu mavi (görsel inceleme). Yani marka kimliği logoda var, ama mağaza teması bunu kullanmıyor.
5. Tema kasıtlı olarak "lüks eko" görünüyor: altın "Sepete ekle" düğmeleri, altın "Partner ol" CTA'sı, krem/ivory zeminler, yaprak/botanik PNG süslemeler. 770 farklı renk değeri → **tutarsız, token'sız, gradyan-yoğun** bir CSS (design drift kanıtı).
6. Mağaza **kişisel bir partner mağazası** olarak render ediliyor (`greenleaf-home--store-32`; başlık/footer/telefon/e-posta/sohbet balonu bir bağımsız partnere ait). Yani gördüğümüz sayfa "global resmî vitrin" değil, **partnere özel bir kopya**; içerik mağaza başına değişiyor. (Kişisel iletişim bilgileri bu dokümana alınmadı.)
7. Ürün kartında **tek fiyat** var (indirimli/liste çifti yok), rozet yok, puan yok, tek "Sepete ekle" düğmesi + favori + karşılaştır ikonları. Ürün detayında "bonus puan fiyatı", stok/teslim ("14 gün içinde"), 3 sekme (Açıklama / Yorumlar / Özellikler). İlgili ürün, çoklu galeri görseli, sertifika rozeti yok.
8. **Sertifikalar mevcut ama gömülü değil**: ayrı bir "Сертификаты на продукцию" sayfasında 362 belge (18 genel: ISO 9001/14001/45001/22716, **GMP Cosmetic**, **Halal** (çok sayıda), 344 ürün belgesi); hepsi PDF. MEMORY §7'deki "ISO/GMP/Helal iddiaları kanıtsız" ifadesi **kısmen yanlış** — belgeler var, sadece ürün sayfalarında/ana sayfada görünür rozet olarak kullanılmıyor.

---

## 1. MEMORY §7 ile doğrulama / çelişki tablosu

| MEMORY §7 iddiası | Doğrulama | Kanıt |
|---|---|---|
| İkonlu kategori şeridi + alt kategorili mega menü | **Doğrulandı** (şerit değil, "Каталог товаров" butonuyla açılan sol sekmeli panel; 13 kök, her biri 3 sütunlu alt grup paneli) | `index.php?route=common/home`, `gl-shell.css` `.gl-shell-panel`, `.gl-shell-roots`, `.gl-shell-groups{column-count:3}` |
| Header: logo, kategori menüsü, arama, favori/karşılaştırma/sepet sayaçları, "Partner ol" CTA | **Doğrulandı** + ek: "İИ поиск" (yapay zekâ arama) düğmesi, üst bilgi çubuğu, "Giriş" ikonu | HTML `.gl-shell-top`, `.gl-shell-ai`, `.gl-shell-partner` ("Стать партнёром") |
| Bölüm akışı: hero → marka mesajı → neden Greenleaf → ürün vitrinleri → sekmeli kategori vitrini → fabrika/marka hikâyesi → üyelik → güven şeridi → haberler → markalar → footer | **Kısmen doğru.** Gerçek sıra §6'da. "Marka mesajı" ayrı bölüm değil (hero'da metin yok, slider tamamen görsel); "güven şeridi" ayrı bölüm değil, "Neden Greenleaf" içindeki 5'li istatistik şeridi (`.gh-facts`) ve "О фабрике"deki 4 istatistik kartı; "sekmeli kategori vitrini" gerçekte sekme değil **4 bağlantılı** statik kategori rayı | Ana sayfa HTML satır sırası (§6) |
| Haber/içerik bölümü | **Doğrulandı** — "ЭКО газета" + "Новости компании" iki sütun | `.gh-editorial` |
| Fiyatlar %50 indirim reklamı ama fiyata yansımıyor | **Doğrulandı**: "Партнёрская скидка 50%" benefit kartında; ürün kartında tek fiyat (`price-new`), `gh-card__old` / `price-old` / `special` sınıfı 35 kartta **0** adet | Ana sayfa HTML; kategori sayfası |
| "Sepete ekle" + "Talebe ekle" yan yana | **Kısmen**: Ana vitrinde `В корзину`, kategori rayında (eski kart) `Добавить в заявку` (talep) — **iki farklı şablon aynı sayfada**; aynı kartta iki düğme değil, iki kart ailesi (`gh-card` ve `greenleaf-product-card`) | `home.d.html` satır 784 ve 1407 |
| Aynı ürünler birden çok bölümde tekrar | **Doğrulandı**: 3 vitrin × ~11–12 ürün (35 kart) + kategori rayı; ilk ürünler tekrar ediyor | 35 adet `.gh-card` |
| Ürün adlarında koli bilgisi | **Doğrulandı**: "(В коробке 5шт)", "(Кол-во в коробке 20 шт)" ad başında | Kategori sayfası ürün adları |
| Ana sayfanın büyük kısmı üye toplama/gelir vaadi | **Doğrulandı** (benefits kartı "50%", "О фабрике" içinde "бизнес-модель", tüm "gl-team" bölümü = ekibe katıl) | `.gl-team`, `.gh-benefit--saving` |
| ISO/GMP/Helal kanıtsız | **Çelişki**: belge sayfası var, 362 PDF | `?route=account/voucher` |

---

## 2. Renkler (CSS'ten gerçek değerler)

Kaynak dosyalar (hepsi `https://global.green-leaf.shop/extension/greenleaf/catalog/view/stylesheet/` altında): `greenleaf.css`, `oc3-parity.css`, `home.css`, `home-parity.css`, `home-benefits-oc3.css`, `home-about-oc3.css`, `home-team-oc3.css`, `interactive.css`, `natalia.css`, `navigation.css`, `gl-home.css`, `gl-shell.css`, `gl-category.css`, `gl-category-products.css`, `gl-commerce.css`; ayrıca OpenCart çekirdeği `https://global.green-leaf.shop/catalog/view/stylesheet/stylesheet.css` ve `bootstrap.css`.

### 2.1 Brandbook'a karşı durum — **Gözlem**
- `#4EAE36`, `#86B726`, `#30A8D7`: **0 eşleşme** (CSS + HTML).
- Brandbook yeşilinin en yakın CSS karşılıkları (RGB mesafesi): `#4d9c29` (22), `#529c2a` (22), `#4b9b25` (26), `#36a527` (30), `#479322` (34) — hepsi `gl-shell.css` içindeki **gradyan duraklarında**, düz renk olarak değil.
- Lime `#86B726` yakını: `#8abf36` (18, `gl-category-products.css`), `#8ccc45`, `#91ca46`, `#93cf42` (hepsi gradyan başlangıcı).
- Mavi `#30A8D7` yakını: `#279bd3` (16, `natalia.css`, tek kullanım), `#23a1d1` (16) ve `#229ac8` (25) → **OpenCart varsayılan `#menu`** kuralı (`stylesheet.css`), Greenleaf tasarımı değil.
- Toplam **770 farklı renk değeri** tanımlı (3/6/8 haneli hex). Brandbook'taki "3 renk" disiplininden çok uzak.

### 2.2 Kullanılan baskın renk aileleri — **Gözlem**

Sayım yalnızca 6 haneli hex'lerdir (tüm tema CSS'leri toplamı, #fff hariç yaklaşık üst sıra):

| Hex | Adet | Nerede / ne için | Dosya · seçici |
|---|---|---|---|
| `#ffffff` | 192 | zemin, kart içi, düğme yazısı | tümü |
| `#009807` | 7 | **eski tema üst bar zemini** (parity tema) | `greenleaf.css` `.theme-greenleaf-parity .gl-site-header` (satır 438) |
| `#173923` | 6 | header aksiyon ikon yazısı, koyu yeşil metin | `greenleaf.css` `.gl-header-action` |
| `#0b5a32` | 6 | "Ekip" bölümü vurgu başlık, kart ikonu | `home-team-oc3.css` `.gl-team__header h2 span` |
| `#0b4b28` | 5 | Profil sayfası H1 (Georgia) | `natalia.css` `.greenleaf-natalia-profile h1` |
| `#546b21` | 5 | zeytin tonu kenar/metin | `gl-shell.css`, `gl-category-products.css` |
| `#163b21` | 4 | mega menü mürekkep rengi | `navigation.css` `--gl-menu-ink` |
| `#145410` / `#07550a` / `#14541b` | — | **fiyat rengi** (koyu yeşil) | `gl-home.css` `.gh-card__price`; `gl-category-products.css` `.gcp-price`; `gl-commerce.css` `.price-new` |
| `#267706` / `#247519` | — | üst bar "Добро пожаловать" metni | `gl-shell.css` `.gl-shell-top__row>strong` |
| `#ffca21` | 2 | **eski arama düğmesi (sarı)** | `greenleaf.css` `.greenleaf-search .btn` |
| `#42b600` | 3 | sohbet FAB düğmesi zemini | `greenleaf.css` `.greenleaf-contact-fab__button` |

### 2.3 Rol bazlı kullanım — **Gözlem**
- **Header zemini (güncel kabuk):** beyazdan açık yeşile dikey gradyan `linear-gradient(#fff,#f6faf0 70%,#fff)` — `gl-shell.css` `.gl-shell`. Eski `#009807` düz yeşil header artık `gl-shell` ile ezilmiş görünüyor (greenleaf.css'te kalıntı).
- **Katalog butonu ("Каталог товаров"):** yeşil gradyan `linear-gradient(115deg,#479322,#226b21)`, kenar `#7cb952` — `gl-shell.css` `.gl-shell-catalog` (satır 120).
- **"İИ поиск" ve "Смотреть все" düğmesi:** `linear-gradient(155deg,#91ca46,#4d9c29 40%,#256e21 95%)` — `gl-shell.css` satır 82.
- **Sayaç rozeti (favori/sepet):** `linear-gradient(#8ccc45,#338922)`, beyaz kenar, beyaz metin — `.gl-shell-action b`.
- **"Partner ol" CTA:** **altın** metalik gradyan (`#ffeaa2 → #bd881d → #88580d`), kenar `#ba841f` — `.gl-shell-partner` (satır 92–96, 294).
- **Ürün "Sepete ekle" düğmesi:** **altın** (`linear-gradient(#ffdb71,#c38a1d 45%,#9b670b 76%,#e4b441)`, kenar `#d8a331`) — `gl-home.css` `.gh-card__actions .gh-card__cart`; kategori kartında 6 katmanlı maskeli SVG altın efekt — `gl-category-products.css` `.gcp-gold`. **Yorum:** CTA yeşil değil altın; brandbook'ta altın yok.
- **Fiyat:** koyu yeşil, ağırlık 650–740, `clamp(18px,1.4vw,23px)`; ürün sayfasında 27–38px, yaprak PNG'li açık yeşil zemin kutusu (`price-leaf.png`).
- **Eyebrow etiketleri ("Рекомендуем"):** altın-kahve `#996008` (`--gh-gold`), büyük harf, letter-spacing .035em — `gl-home.css`.
- **Kart zemini:** krem gradyan (`#fbfaf4 → #fff → #f6f5ec`), kenar `#e8e4d2` (sıcak bej), `radius 18px` — `gl-home.css` `.gh-card`.
- **Footer:** açık zemin; başlıklar `#1d472b` büyük harf; sosyal ikon karoları `#52636c` (gri-mavi) — `gl-shell.css` satır 175–184. Koyu footer yok.
- **Metin mürekkebi:** `--ink:#142a24`, `#142b24`, `#1f3325` (hepsi çok koyu yeşilimsi; saf siyah değil).
- **Link/focus:** `outline:3px solid #2c780c` (focus-visible) — `gl-home.css` satır 16. Hover link `#237720`/`#387419`.

### 2.4 Tanımlı değişkenler (kısmi token sistemi) — **Gözlem**
`greenleaf.css :root`: `--greenleaf-color-primary:#2f7d32`, `-primary-dark:#1d5521`, `-accent:#e8b84f`, `-surface:#f4f8f1`, `-text:#1f3325`, `-line:#dce7d8`, `-muted:#66746a`, `--greenleaf-radius:18px`, `--greenleaf-shadow:0 16px 45px rgba(31,75,38,.10)`.
`navigation.css`: `--gl-menu-green:#237c31`, `--gl-menu-green-dark:#165e24`, `--gl-menu-gold:#d9a33a`, `--gl-menu-ink:#163b21`.
`home-benefits-oc3.css`: `--gl-benefits-green:#0d5a2b`, `-green-deep:#003d20`, `-gold:#d9a72e`, `-cream:#fffaf0`.
→ Her bölüm kendi yeşil/altın değişkenini tanımlıyor; tek merkezi palet yok. **Yorum:** bu CSS "kopyalanacak sistem" değil "kopyalanmaması gereken ders".

### 2.5 Logo/favicon'daki gerçek marka renkleri — **Gözlem (görsel inceleme)**
`https://global.green-leaf.shop/image/catalog/greenleaf-icon.png` (favicon, 84 KB PNG): lime-yeşil yapraklar (≈ `#86B726`), yeşil çakışma bölgeleri (≈ `#4EAE36`), açık mavi yapraklar ve koyu mavi çakışmalar (≈ `#30A8D7`). Bu, brandbook'taki üç rengin gerçek köken kaynağı olduğunu destekliyor. (Piksel okuması yapılmadı; göz kestirimi — kesin değer için veri-muhendisi PNG/SVG'den örnekleme yapabilir.)

---

## 3. Tipografi — **Gözlem**

| Özellik | Değer | Kaynak |
|---|---|---|
| Ana font | **Roboto**, yedek `"Segoe UI", Arial, sans-serif` | `gl-home.css` `.gh-section`; `greenleaf.css` (6×) |
| Header fontu | `"Greenleaf Header"` = Roboto woff2 yeniden adlandırılmış (cyrillic + latin alt kümeler), `font-weight:100 900`, `font-display:swap` | `gl-shell.css` `@font-face` → `/extension/greenleaf/catalog/view/image/gl-category/roboto-cyrillic.woff2`, `roboto-latin.woff2` |
| Serif | `Georgia, 'Times New Roman', serif` — yalnızca partner profil başlıkları | `natalia.css` H1 (clamp 38–68px) |
| Inter | Bir kez (tek kural) | `greenleaf.css` |
| Poppins / Futura | **YOK** | 0 eşleşme |
| İkon fontu | Font Awesome (all.min.css, `fa-solid / fa-regular / fa-brands`) | `/catalog/view/stylesheet/fonts/fontawesome/css/all.min.css` |

Boyut sıklığı (tüm tema CSS): 13px (52×), 14px (33×), 12px (28×), 15px (20×), 17px (18×), 11px (15×), 20px, 16px (12×). Gövde 16px / `line-height:1.45` (`gl-home.css .gh-section`). Fluid `clamp()` yoğun kullanılıyor (ör. kart başlığı `clamp(13px,.98vw,16px)`, bölüm H2 `clamp(22px,2vw,33px)`, ürün fiyatı `clamp(27px,2.2vw,38px)`).
Ağırlıklar: 800 (37×), 700 (29×), 850 (16×), 750 (16×), 500, 600, 620, 650, 680, 740 — **çok sayıda ara ağırlık** (variable font kullanımı). Başlıklar büyük harf (`text-transform:uppercase`) sıkça: benefit H3, footer H2, eyebrow.
**Yorum:** Poppins marka fontu (brandbook), mağazada Roboto → Türkiye sitesinde Poppins kullanmak resmî mağazadan "sapma" değil, brandbook'a dönüş olur; ama kullanıcı onayı gerekir (bkz. soru S1).

---

## 4. Boşluk, radius, gölge, kırılma noktaları, kapsayıcı — **Gözlem**

- **Radius** (sıklık): 12px (13×), 13px (12×), 50% (19×), 10px (11×), 999px (9×), 14px (9×), 9px, 18px (`--greenleaf-radius`, kart), 20px (galeri), 28px (`.gh-merch`), 35px (benefit kart tavanı). Yuvarlak, yumuşak, "bubbly" dil. Arama kutusu 14–26px, kategori paneli 21px, mega menü satırı 17px.
- **Gölge:** hep yeşilimsi/sıcak tonlu, düşük opaklık: `0 3px 9px #5e54311a` (kart, + `inset 0 0 0 2px #fff` iç beyaz çerçeve), `0 8px 24px #79a65331` (benefit), `0 18px 46px #244a2438` (mega menü paneli), `--greenleaf-shadow:0 16px 45px rgba(31,75,38,.10)`. "İç beyaz çerçeve (inset 2px #fff)" imza detayı.
- **Kapsayıcı genişlikleri:** `.gl-shell-inner{width:min(96.5%,1624px)}` (header/footer), `.gh-merch{max-width:1480px}` (vitrin), `.greenleaf-parity .container{max-width:1350px}` (eski tema), mobilde `95%`. İçerikte Bootstrap `.container`.
- **Grid:** ürün rayı masaüstü **5 sütun** (`grid-auto-columns:calc((100% - 4*gap)/5)`, gap `clamp(8px,.8vw,14px)`), kategori sayfası **4 sütun** (`.gcp-grid`, gap `clamp(9px,1.05vw,17px)`), benefit **4 sütun**, haber düzeni `1.96fr 1fr`. Kategori sayfası düzeni: sol kenar çubuğu (`.glc-aside`) + ana alan.
- **Breakpoint'ler** (sıklık): `max-width:767px` (9×), `991px` (7×), `1199px` (4×), `575px` (4×); `min-width:768/992/1200`; ek: `1100px`, `820px`, `600px`, `520px`, `365px` (`gl-home.css`). Bootstrap 5 ızgarası (576/768/992/1200/1400) tabanda. `@media (hover:hover)`, `(prefers-reduced-motion)` kullanılmış (iyi pratik).
- **Boşluk ölçeği:** sabit 4/8 grid yok; çoğu `clamp(vw)` tabanlı. Bölüm dikey boşluğu `clamp(22px,2.3vw,38px)`.

---

## 5. İkon dili, pinwheel ve çizgi bandı motifi

### 5.1 İkonlar — **Gözlem**
- **UI ikonları (header, sepet, arama):** **inline değil, harici SVG dosyaları** (`<img src="…/gl-shell/heart.svg">`), Figma'dan dışa aktarılmış (SVG içinde `id="Иконка / heart"`), **çizgi (stroke) stili**, kalınlık ≈ 1.75, `stroke-linecap:round`, renk `#17282B` / `#152529` (koyu yeşilimsi), 30×30. Dosyalar: `heart.svg`, `compare.svg`, `bag.svg`, `user.svg`, `search.svg`, `sparkles.svg`, `nav-*.svg` — yol: `/extension/greenleaf/catalog/view/image/gl-shell/`.
- **Kart ikonları** (favori/karşılaştır/sepet): Font Awesome (`fa-heart`, `fa-arrow-right-arrow-left`, `fa-shopping-cart`) ve ayrıca `card-heart.svg` vb. — iki sistem karışık.
- **Kategori ikonları:** iki set. (a) Kök kategoriler: `/extension/greenleaf/catalog/view/image/gl-category/*.svg` (36×36, **dolgulu/tek renk koyu yeşil `#347B16`**), (b) 111 alt kategori ikonu: `/image/catalog/greenleaf/menu-icons/gl-137-NNN.svg` (48×48, **dolgulu, tek renk `#1C7709`**, opacity .953, Figma kökenli). Ayrıca 13 kök için **webp "fotoğraf/illüstrasyon" ikonlar** (`gl-shell/desktop-0…9.webp`, `mobile-0…13.webp`, 50×51, 2–5 KB).
- **Bölüm ikonları** (hakkında/ekip): **inline SVG**, 32×32 viewBox, çizgi stili, `stroke-width:1.7`, `currentColor` — `home-team-oc3.css` `.gl-team__card-icon svg`.
- **Benefit "madeni para" ikonları** (`saving.svg`, `formula.svg`, `factory.svg`, `family.svg`): karmaşık (9 KB), zeytin-yeşil gradyanlı (`#5B6A09…#B5AC42`), 3D/skeuomorfik.
- **Yorum:** UI çizgi ikonu + kategori dolgulu ikon karışımı tutarsız; Türkiye sitesi için tek stil (örn. 1.5–1.75 stroke, rounded) seçilmeli; mevcut SVG'ler yeniden renklendirilebilir (stroke renkleri tek `#hex`).

### 5.2 Pinwheel ve yeşil+mavi bant motifi — **Gözlem**
- **Pinwheel (rozet) yalnızca logo/favicon'da**: `https://global.green-leaf.shop/image/catalog/grinlif.png` (220×61 gösterim; yatay kilit: sol rozet + "Greenleaf" yazı, yazı yeşil) ve `greenleaf-icon.png` (yalnız rozet). Görsel incelemede rozet **7 yaprak kümesi** gösteriyor (4 lime-yeşil + 3 mavi, her küme 3 örtüşen yaprak) — brandbook'taki "altı yapraklı" tanımıyla **sayım farkı olabilir**; brandbook görülüp doğrulanmalı (soru S4).
- **Tema içinde pinwheel desen/arka plan olarak kullanılmıyor**: CSS'te `pinwheel|stripe|petal|repeating-linear` araması 0 sonuç. Süs olarak **botanik yaprak/dal PNG-WEBP'leri** (`botanical-*.webp`, `footer-sprig.png`, `margin-leaves.png`, `*-leaf-*.png`) ve dalga SVG'leri (`footer-waves.svg`, `cart-wave.svg`) var.
- **Yeşil+mavi çizgi bandı: bulunamadı.** Mağaza bu motifi kullanmıyor. **Yorum:** brandbook'taki bu motif Türkiye sitesinde özgün bir "marka sadakati" farklılaştırıcısı olabilir (resmî mağazada yok).

---

## 6. Ana sayfa bölüm sırası (yukarıdan aşağı) — **Gözlem**
Kaynak: `https://global.green-leaf.shop/index.php?route=common/home` (sayfa `greenleaf-home--store-32`, yani bir partner mağazası).

| # | Bölüm | İçerik | Sınıf |
|---|---|---|---|
| 0 | **Üst bilgi çubuğu** | yaprak ikonu + "Добро пожаловать в Greenleaf!", slogan "Натуральные решения для здоровья, дома и гармонии", telefon, çalışma saatleri | `.gl-shell-top` |
| 1 | **Header kabuğu** | logo, sepet/favori/karşılaştırma/giriş, arama (kategori seçici + AI arama), "Стать партнёром" CTA | `.gl-shell` |
| 2 | **Navigasyon bandı** | yeşil "Каталог товаров" butonu + "Сертификаты на продукцию", "Контакты", "О компании" … bağlantıları (beyaz metin) | `.gl-shell-navigation` |
| 3 | **Hero slider** | tam genişlik 5 görsel afiş (slider21/34/33/32/31.jpg), ok + nokta, otomatik 6 sn, metin yok (H1 görünmez) | `.greenleaf-home-slider` |
| 4 | **"Почему выбирают Greenleaf"** | başlıkta logo görseli; 4 kart: Выгода (50% partner indirimi), Состав, Производство (ISO/GMP/Halal iddiası), Здоровье; altta 5'li istatistik şeridi (42 ülke, 5000+ ürün, …) | `.gh-benefits` |
| 5 | **Vitrin 1 – "Товары дня"** (eyebrow: Рекомендуем) | yatay kaydırılan 5 sütunlu ray, "Смотреть все" + ok düğmeleri | `.gh-collection` |
| 6 | **Vitrin 2 – "Популярные товары"** (Выбор покупателей) | aynı ray | `.gh-collection` |
| 7 | **Vitrin 3 – "Новые поступления"** (Новинки) | aynı ray (3 vitrin toplam 35 kart, bej "display" paneli içinde) | `.gh-merch` |
| 8 | **"Товары по категориям"** (Подборки) | 4 bağlantı: Уходовая косметика, Товары для здоровья, Стирка, Дом + ürün rayı (eski `greenleaf-product-card`, `Добавить в заявку` düğmeli) | `.greenleaf-category-products` |
| 9 | **"О фабрике"** | aile fotoğrafı + 4 istatistik kartı (20+ yıl, kendi üretim, güvenli formül, 5000+); 6 avantaj maddesi; "Подробнее о Greenleaf" butonu; slogan "Здоровье. Экологичность. Осознанное потребление. Лучшее будущее!" | `.gl-about` |
| 10 | **"Стань частью моей команды"** | partner portre görseli + 7 numaralı kart (mentorluk, eğitim, kütüphane, planlama, hazır araçlar, AI araçları, servis merkezi) + CTA "Стать частью моей команды" + 5 güven ikonu | `.gl-team` |
| 11 | **Editoryal**: "ЭКО газета" (2 makale, "Полезно знать") + "Новости компании" (4 haber) | tarihli kart (520×320 görsel) | `.gh-editorial` |
| 12 | **"Наши бренды"** | 9 marka logosu (Berclean, Limancy, Meoweqlo, Miaorou, Morefuture, Okfad, Predawn, Suting, Yijian) yatay ray | `.gh-brands` |
| 13 | **Footer** | bkz. §9 | `.gl-shell-footer` |
| — | **Yüzen sohbet düğmesi** (FAB) | sağ alt, yuvarlak yeşil `#42b600` + balon "Нужна помощь?", kanal paneli (MAX/Telegram/WhatsApp) + AI soru formu | `.greenleaf-contact-fab` |

**Yorum:** Gerçek sıra, MEMORY §7'deki öneri akışa büyük ölçüde yakın; fark: sertifika/güven ayrı bölüm olarak yok; 3 vitrin art arda ve aynı kalıp; "ekip" bölümü partner işe alımı odaklı. Ağırlık merkezi "alışveriş" değil "iş fırsatı" (bkz. §1).

---

## 7. Header ve mega menü yapısı — **Gözlem**

**Header (masaüstü):**
1. Üst bilgi şeridi: yaprak ikonu + karşılama, slogan, telefon, saat (dikey ayraçlarla).
2. Ana satır: hamburger (mobil) · **logo** (`grinlif.png`, 220×61) · [kaydırınca "docked" modda "Каталог" butonu bu satıra taşınır, `gl-shell.js` `.is-docked`] · **arama kutusu** (kategori `<select>`, `placeholder="Поиск товаров, брендов, статей…"`, arama ikonu, yan yana **"ИИ поиск"** yeşil gradyan düğmesi; AI paneli "Что подобрать? / Например: шампунь для сухих волос") · aksiyonlar: **Избранное**, **Сравнение**, **Корзина** (açılır mini sepet), **Войти** — her biri ikon + altında küçük etiket + yeşil sayı rozeti · **"Стать партнёром"** altın CTA (grup ikonu + ok).
3. Navigasyon bandı: "Каталог товаров" (yeşil gradyan düğme, `aria-expanded`) + "Сертификаты на продукцию", "Контакты", "О компании" (+ haber/duyuru ikonları).
- Sticky/docked davranış: `window.scrollY >= threshold` ile arama kutusu küçülüp (`min-height:40px`, `radius:12px`) tek satıra yerleşir → `hareket-tasarimcisi`.

**Mega menü ("Каталог товаров" paneli):**
- Açılır panel, `border-radius:21px`, krem-yeşil gradyan, büyük gölge.
- **Sol sütun:** 13 kök kategori — ikon (webp 50×51) + ad + `›`; `role="tablist"` dikey sekmeler, aktif satır açık zeminli ve gölgeli.
- **Sağ alan:** seçili kökün paneli: başlık (H2 `clamp(24px,2.4vw,41px)`, `#2a5529`) + "Смотреть все товары раздела →" buton + (varsa) dekoratif banner (`desktop-10.webp`, 1196×120 oranı) + **3 sütunlu alt kategori grupları** (`column-count:3`, sütun çizgili), grup başlığı bold `#17441b`, altında bağlantılar. Üstte "öne çıkan" çip bağlantıları (`.gl-shell-featured`).
- **Mobil:** soldan açılan çekmece (`max-width:430px`, sağ köşeler 24px radius) — kök satırları ikonlu, alt panele kayma (`gl-mobile-subpanel`), alt kategori satırında açılır ok; "Стать партнёром" altın buton çekmecede de var. Krem/altın başlık şeridi (`#f5ecd4`).
- Kategori sayfasında ayrıca **sol dikey kenar çubuğu** (`.glc-aside`, 13 kök, SVG ikonlu) + üstte **alt kategori çipleri** (`.glc-chips`).

---

## 8. TAM kategori ağacı (menü HTML'inden) — **Gözlem**
Taban: `https://global.green-leaf.shop` · Arayüz dili Rusça; parantez içi Türkçe karşılık (**benim çevirim**, resmî değil). Yol türü iki biçimdir: SEO slug (`/slug`) veya `?route=product/category&path=ID`.
13 kök, ≈ 110 alt kategori. Her kökte "Смотреть все товары раздела" adresi kökün URL'sidir. (Kök 68'in panelinde bir çapraz bağlantı bloğu — diğer 12 kökün listesi — tekrar ediyor.)

### 8.1 Уход за домом (Ev bakımı) — `/tovari-dlya-doma`
- Аксессуары для уборки (Temizlik aksesuarları) — `?route=product/category&path=61_206`
- **Дом (Ev)** — `/uhod-dlya-doma`: Ароматизаторы для дома (oda kokuları) `/aromatizator-dlya-doma` · Пакеты, пленка, целлофан `?route=product/category&path=61_62_209` · Средства для мытья полов (zemin temizleyici) `/sredstvo-dlya-mytya-polov` · Средства для удаления накипи (kireç çözücü) `/sredstvo-dlya-udaleniya-nakipi` · Чистка труб (boru açıcı) `/chistka-trub`
- **Кухня (Mutfak)** — `/kuhnya`: Салфетки для уборки `/salfetki-dlya-uborki` · Средство для мытья посуды (bulaşık) `/sredstvo-dlya-mytya-posudy` · Чистящее средство для кухни `/chistyashchee-sredstvo-dlya-kukhni`
- Средства от насекомых (böcek ilaçları) — `?route=product/category&path=61_205`
- **Стирка (Çamaşır)** — `/stirka`: Для стиральной машины `/dlya-stiralnoj-mashiny` · Жидкое средство для стирки `/zhidkoe-sredstvo-dlya-stirki` · Кондиционер для белья (yumuşatıcı) `/kondicioner-dlya-belya` · Листы для стирки разноцветного белья `/stirka-raznocvetnogo-belya` · Мыло для стирки `/mnogofunkcionalnaya-stirka` · Стиральный порошок `?route=product/category&path=61_65_207`
- Туалет (Tuvalet) — `/tualet` (alt yok)

### 8.2 Уходовая косметика (Bakım kozmetiği) — `/uhodovaya-kosmetika` (405 ürün, 26 sayfa)
- **Волосы (Saç)** — `/volosi`: Для укладки `?route=product/category&path=60_83_234` · Кондиционер-ополаскиватель `/kondicioner` · Краска для волос (saç boyası) `/kraska-dlya-volos` · Лосьон `/loson` · Маска `/maska` · Масло `/maslo` · Шампунь `/shampun-kosmetika`
- **Глаза (Göz)** — `/uhod-za-glazami`: Крема для глаз `?route=product/category&path=60_80_208` · Маски согревающие (ısıtıcı maske) `/maski-sogrevayushchie` · Патчи для глаз (göz yamaları) `/patchi-dlya-glaz`
- Защита от солнца (Güneş koruma) — `?route=product/category&path=60_232`
- **Лицо (Yüz)** — `/uhod-za-licom`: Бальзам для губ (dudak balmı) `/balzam-dlya-gub` · Косметические наборы (setler) `?route=product/category&path=60_79_231` · Крема `/krema` · Лосьон `/loson-ukhodovyj` · Маска косметическая `/maska-kosmeticheskaya` · Масло для лица `/maslo-dlya-lica` · Основа под макияж `/osnova-pod-makiyazh-lico` · Скраб для лица `/skrab-dlya-lica` · Снятие макияжа (makyaj temizleme) `/snyatie-makiyazha` · Средство для умывания (yüz yıkama) `/sredstvo-dlya-umyvaniya` · Сыворотка (serum) `/syvorotka-lico`
- **Ноги (Ayak)** — `/nogi`: Спрей для ног `/sprej-dlya-nog`
- **Руки (El)** — `/uhod-za-rukami`: Крем для рук `/krem-dlya-ruk`
- **Тело (Vücut)** — `/telo`: Гель `/gel` · Крем для тела `/krem-dlya-tela` · Скраб `/skrab` · Спрей `/sprej` · Депиляция (tüy dökücü) `?route=product/category&path=60_85_214`
- Парфюмерия (Parfümeri) — `/parfumeriya`

### 8.3 Гигиена (Hijyen) — `/hygiene`
- **Женская (Kadın)** — `/zhenskaya`: Бритвы `/britvy` · Прокладки (pedler) `/prokladki` · Растворы (solüsyonlar) `?route=product/category&path=66_71_212`
- **Личная (Kişisel)** — `/lichnaya`: Бомбочки для ванны (banyo bombası) `/bombochki-dlya-vanny` · Гели для душа `/gel-dlya-dusha` · Дезодоранты `?route=product/category&path=66_73_201` · Жидкое мыло `/zhidkoe-mylo` · Инструменты (araçlar) `/trimmer-kosmeticheskij` · Мочалки для душа (duş lifi) `/mochalki-dlya-dusha` · Твердое мыло `/tverdoe-mylo`
- **Полости рта (Ağız bakımı)** — `/polosti-rta`: Зубные нити (diş ipi) `/zubnye-niti` · Зубные пасты `/zubnye-pasty` · Зубные щетки `/zubnye-schetki` · Ополаскиватели (gargara) `/opolaskivateli` · Спреи `/sprei` · Дополнительный уход `?route=product/category&path=66_74_213`
- **Салфетки и бумага (Mendil ve kâğıt)** — `/salfetki-i-bumaga`: Ватные диски и палочки (pamuk/kulak çubuğu) `/vatnye-diski` · Влажные салфетки (ıslak mendil) `/vlazhnye-kosmeticheskie-salfetki` · Салфетки, полотенца, платочки `/salfetki-platochki` · Туалетная бумага `/tualetnaya-bumaga`

### 8.4 Макияж (Makyaj) — `/makiyazh`
- Аксессуары для макияжа — `?route=product/category&path=67_227`
- **Брови (Kaş)** — `/brovi`: Окрашивание бровей `/okrashivanie-brovej` · Уход за ресницами и бровями `/ukhod-za-resnicami-i-brovyami`
- **Глаза (Göz)** — `/glaza`: Подводка для глаз (eyeliner) `/podvodka-dlya-glaz` · Тени для глаз (far) `/teni-dlya-glaz` · Ресницы `?route=product/category&path=67_77_215`
- **Губы (Dudak)** — `/guby`: Помада для губ `/pomada-dlya-gub`
- **Лицо (Yüz)** — `/lica`: Консилер `/konsiler` · Основа под макияж `/osnova-pod-makiyazh` · Пудра `/pudra` · Тональное средство (fondöten) `/tonalnoe-sredstvo`

### 8.5 Аксессуары (Aksesuar) — `/aksessuary`
Для автомобиля `?route=product/category&path=70_235` · Зонты (şemsiye) `?route=product/category&path=70_218` · Очки с защитой (bilgisayar gözlüğü) `/ochki-dlya-raboty-za-kompyuterom` · Расчестка (tarak) `?route=product/category&path=70_203` · Солнцезащитные очки `/solncezashchitnye-ochki` · Чемодан (bavul) `/chemodan`

### 8.6 Канцелярские товары (Kırtasiye) — `/kantseliarskie-tovary` (alt kategori yok)

### 8.7 Обувь и уход (Ayakkabı ve bakım) — `/obuv-i-ukhod`
Женские тапочки (kadın terliği) `/zhenskie-tapochki` · Крем для обуви `/krem-dlya-obuvi` · Мужские тапочки `/muzhskie-tapochki` · Стельки (tabanlık) `/stelki` · Шарики для обуви (ayakkabı topları) `/shariki-dlya-obuvi`

### 8.8 Одежда и текстиль (Giyim ve tekstil) — `/tekstil-i-odezhda`
- **Женская** — `/dlia-vzroslykh`: Женские гольфы `/zhenskie-golfy-vzroslie` · Женские носки `/zhenskie-noski` · Женское нижнее белье `?route=product/category&path=86_88_221` · Колготки `/kolgotki`
- **Мужская** — `?route=product/category&path=86_229`: Галстуки `?route=product/category&path=86_229_220` · Мужские гольфы `/muzhskie-golfy-vzroslie` · Мужские носки `/muzhskie-noski` · Мужские трусы `/muzhskie-trusy`
- Полотенца (havlu) — `?route=product/category&path=86_219`

### 8.9 Посуда (Mutfak gereçleri) — `/posuda` (alt kategori yok)

### 8.10 Продукты и напитки (Gıda ve içecek) — `/produkti-i-napitki`
Напитки `/chaj-v-paketikakh` · Продукты `?route=product/category&path=89_236` · Сахар `/sakhar`

### 8.11 Товары для детей (Çocuk ürünleri) — `/dlya-detey`
Десткая посуда `?route=product/category&path=69_228` · Детские влажные салфетки `/detskie-vlazhnye-salfetki-salfetki` · Детские зубные пасты `/detskie-zubnye-pasty` · Детские зубные щетки `/detskie-zubnye-shchetki` · Зубная паста `/zubnaya-pasta` · Зубная щетка `/zubnaya-shchetka` · Крем `/krem-gel` · Молочко для тела `/molochko-dlya-tela` · Пена для ванны `/pena-dlya-vanny` · Подгузники (bebek bezi) `/podguzniki` · Предметы ухода `?route=product/category&path=69_230` · Салфетки `/salfetki` · Стирка `?route=product/category&path=69_217` · Шампунь, Гель `/shampun` · Детская одежда `/dlia-detei`

### 8.12 Товары для здоровья (Sağlık ürünleri) — `/zdorovie`
БАДы (takviyeler) `/bad` · Витамины `/vitaminy` · Лечебные пластыри (terapötik flaster) `/plastyr` · Массажное средство `/massazhnoe-sredstvo` · Омолаживающий гель `?route=product/category&path=59_200` · Средства от укусов насекомых `?route=product/category&path=59_204` · Мази, спреи и др. `?route=product/category&path=59_216`

### 8.13 Товары для мужчин (Erkek ürünleri) — `/dlya-muzhchin`
- **Гигиена** — `/muzhskaya`: Бритвы `/britvy-muzhskie`
- Для бритья (tıraş) — `/britvennyj-stanok`
- Для здоровья — `?route=product/category&path=68_199`
- **Уход** — `/uhodovaya-kosmetika-dlya-muzhchin`: Крем `/krem` · Лосьон `/loson-muzhskoi` · Сыворотка `/syvorotka`

**Gözlem/Yorum notları:**
- Yapı karışık: 2–3 seviye; bazı kategorilerde "grup başlığı" kendisi de ürün listesi sayfası (leaf). Slug'lar tutarsız (`/loson` vs `/loson-ukhodovyj` vs `/loson-muzhskoi`); bazı kategorilerin slug'ı yok (`?route=…&path=…`).
- Aynı ad farklı yerlerde tekrar (Лосьон ×3, Шампунь, Зубная паста çocuk/yetişkin) → Türkiye taksonomisi için **temiz, 2 seviyeli, tekrarsız** yeni ağaç gerekir (planlama kararı).
- Kozmetik dışı çok geniş kapsam: tekstil, kırtasiye, mutfak, ayakkabı. Türkiye'de ürün odağı henüz kararlaştırılmadı (MEMORY §3); ağaç buna göre sadeleştirilebilir (karar kullanıcıda).

---

## 9. Footer yapısı — **Gözlem**
Kaynak: ana sayfa `<footer class="gl-shell-footer">`. Açık zeminli; 4 sütunlu grid:
1. **Наши контакты:** logo, telefon, e-posta, şehir (partner iletişimi; kişisel veri bu belgeye alınmadı), sosyal ikon karoları (JS ile `?route=extension/greenleaf/common/contacts` JSON'undan dolduruluyor: Instagram/Telegram/VK/WhatsApp ikon sınıfları tanımlı; karo `27×27`, radius 6px, `#52636c`).
2. **Дополнительно:** Бренды, Новости компании, Связаться с нами, Возвраты, Специальные предложения.
3. **Моя учётная запись:** Моя учётная запись, История заказов, Список желаний, Рассылка.
4. **QR магазина:** mağaza URL'si için JS (`qrcode.js`, `footer-qr.js`) ile üretilen QR + "Отсканируйте для перехода в магазин".
- Alt şerit: "Работает на OpenCart · © 2026 · Перевод © OpenCart.Name".
- **Yok:** ödeme yöntemi ikonları (0 eşleşme), yasal sayfa bağlantıları (gizlilik/şartlar/mesafeli satış), bülten abone formu (yalnızca "Рассылка" hesap linki), sertifika rozetleri.
- **Yorum:** Türkiye için yasal bağlantılar (KVKK, mesafeli satış, iade) ve ödeme ikonları (iyzico/PayTR sonrası) footer'da yer almalı; resmî mağaza bunları vermiyor.

---

## 10. Ürün kartı anatomisi — **Gözlem**

İki farklı kart ailesi aynı sayfada:

**A) Vitrin kartı `.gh-card`** (3 vitrinde; `gl-home.css`)
- Kapsayıcı: radius 18px, bej kenar `#e8e4d2`, krem radyal gradyan zemin, `inset 2px #fff` iç çerçeve, `padding clamp(10–16px)`.
- Görsel: 420×420 önbellek (`/image/cache/catalog/product/…-420x420.png`), `object-fit:contain`, `mix-blend-mode:multiply`, `aspect-ratio:1.37`; hover'da `scale(1.15)` (`@media (hover:hover)`).
- Ad: H3 `clamp(13–16px)`, 600, **3 satır kırpma** (`-webkit-line-clamp:3`).
- Fiyat: tek, koyu yeşil, 740 ağırlık, `margin-top:auto` ile kart altına itilmiş. (`s` etiketi için `.gh-card__price s` stili tanımlı ama HTML'de **hiç kullanılmamış**.)
- Adet: `− 1 +` stepper.
- Aksiyonlar: **altın "В корзину"** (esnek genişlik) + 32px kare **favori** + **karşılaştır** ikon düğmeleri.
- Rozet / puan / indirim etiketi / stok durumu: **yok**.

**B) Raf kartı `.greenleaf-product-card`** (kategori rayı) ve **C) Kategori listesi `.gcp-card`** (kategori sayfası, `gl-category-products.css`)
- Görsel 250×250 (`/image/cache/catalog/product/greenleaf/<kod>/main-250x250.jpeg`); açıklama kırpma (2 satır, "…" ile `..`); fiyat; adet stepper; altın metalik "В корзину" (maskeli 6 katmanlı SVG); favori ♥; karşılaştır ⇄. Grid/List görünüm anahtarı var.
- **Yorum:** B'de düğme "Добавить в заявку" (talep ekle) — MEMORY §7'deki "iki net olmayan CTA" gözlemi bu kart ailesinden geliyor.

Kart sayacı: ana sayfada 35 `.gh-card`, kategoride 16/sayfa (`limit=16,25,50,75,100`).

---

## 11. Kategori (listeleme) sayfası — **Gözlem**
Kaynak: `https://global.green-leaf.shop/uhodovaya-kosmetika`
- Düzen: **sol kenar çubuğu** (13 kök, ikon+ad, aktif satır işaretli) + ana alan.
- Üst "hero": fotoğraflı başlık bandı (kategori fotoğrafı 300×300), kırıntı (`Главная › Каталог товаров › …`), küçük "GREENLEAF" üst etiketi, H1.
- **Alt kategori çipleri** (ikonlu).
- Araç çubuğu: "Сравнить" bağlantısı, **grid/list** geçişi, "Сортировать по:" (Varsayılan, Ad A–Z/Z–A, fiyat, puan…) ve "Показывать:" (16/25/50/75/100) — hepsi `<select>` ile URL gezintisi.
- Izgara 4 sütun; **sonsuz kaydırma** (`data-greenleaf-infinite-scroll`, `infinite-scroll.js`, IntersectionObserver + fetch) + klasik sayfalama (1…9, `>`, `>|`) + "Показано с 1 по 16 из 405 (Страниц: 26)".
- **Fiyat aralığı, marka, cilt tipi vb. filtre yok** — yalnızca sıralama. **Yorum:** 405 ürünlük kategori için filtre eksikliği büyük fırsat (rakip seviyesi düşük, MEMORY §8 ile uyumlu).

---

## 12. Ürün detay sayfası — **Gözlem**
Kaynaklar: `https://global.green-leaf.shop/ilife-dnevnyie-gigienicheskie-prokladki`, `https://global.green-leaf.shop/v-korobke-5st-yue-zhonggui-podarocnyj-nabor-sredstv-po-uhodu-za-kozej-s-antivozrastnym-effektom-kordiceps-yza139`
- İki sütun: **sol galeri** (tek ana görsel 800×800, `aspect-ratio:480/405`, radius 20px, tıkla-büyüt `data-gl-gallery-open`; ürünlerde yalnızca **1 görsel** gözlendi, küçük resim şeridi yok); **sağ detay**.
- Sağ: kırıntı (ev ikonu › kök › alt › alt › ürün) · "Greenleaf" üst etiketi · H1 · "Модель DAD004" · stok satırı ("Доступность Через 14 Дней", yeşil onay ikonu) · **5 yıldız (boş) + "Отзывы (0)"** · **fiyat kutusu** (açık yeşil gradyan, yaprak PNG'li, `price-new` 27–38px) + "Цена в бонусных баллах: 50" · favori/karşılaştır düğmeleri · **adet stepper + "Добавить в корзину"** (`btn-primary btn-lg`).
- **Sekmeler (Bootstrap nav-tabs):** Описание · Отзывы (0) · Характеристики.
  - Açıklama: "Описание товара" H2 + **Преимущества / Способ применения / Кому подходит** H3 alt başlıkları (yapılandırılmış uzun metin).
  - Özellikler: tablo (Model, ağırlık, boyutlar).
  - Yorumlar: boş durum "Будьте первым…" + yorum formu (ad, metin, 1–5 radyo).
- **Yok:** ilgili/benzer ürünler, sertifika/ISO/Halal rozeti, içerik (INCI) listesi bölümü, paylaş, indirim etiketi, sticky mobil CTA, birden çok görsel, SSS.
- Sepet/ödeme stilleri `gl-commerce.css` içinde (sepet, adres, kupon, kargo, cüzdan ikonları tanımlı).

---

## 13. JS tabanlı hareket (→ hareket-tasarimcisi) — **Gözlem**

**Kütüphane yok**: Swiper/Owl/slick **kullanılmıyor** (grep: 0). Tamamı vanilla JS + CSS `scroll-snap`. jQuery 3.7.1 + Bootstrap 5 bundle yalnızca OpenCart çekirdeği için.

| Hareket | Uygulama | Detay | Dosya |
|---|---|---|---|
| **Hero slider** → hareket-tasarimcisi | `.greenleaf-home-slider__track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory}` + JS `scrollTo/scrollBy` | **autoplay**, `data-autoplay="6000"` (min 4000 ms), `setInterval`, duraklatma durumu (`data-greenleaf-autoplay="paused"`, tetikleyici kodda doğrulanmadı), `visibilitychange` ile sekme gizlenince durur, `prefers-reduced-motion` desteği; ok düğmeleri + nokta göstergesi | `home-hero-category-slider.js` |
| **Ürün rayları** → hareket-tasarimcisi | `scroll-snap-type:x mandatory`, `scrollTo({behavior:'smooth'})` | ok düğmeleri, klavye ← →, "Смотреть все" ile ray → grid genişleme (`.is-expanded`) | `home-product-carousel.js`, `gl-home.js` |
| **Header "docking"** → hareket-tasarimcisi | `window.scrollY >= threshold` → `.is-docked` | arama kutusu küçülür, katalog butonu araç çubuğuna taşınır, partner CTA kompaktlaşır | `gl-shell.js` |
| **Mega menü** | sekme tıklama/hover → panel değişimi, `aria-selected` | `navigation.js` (premium-menu) | `navigation.js` |
| **Mobil çekmece** | soldan kayan panel + alt panel (inert/aria-hidden) | `gl-shell.js` | |
| **Sonsuz kaydırma** → hareket-tasarimcisi | IntersectionObserver + fetch ile sonraki sayfa | kategori listesi | `infinite-scroll.js` |
| **Kart hover** | `transform:scale(1.025–1.15)` görsel, `transition:… .18–.23s ease`; yalnızca `(hover:hover)` | süre hissi: hızlı, ince | `gl-home.css`, `gl-category-products.css` |
| **Ürün görseli değişimi** | `@keyframes gl-commerce-reveal{from{opacity:.45}to{opacity:1}}` 0.2s | tek keyframe | `gl-commerce.css` |
| **Sohbet FAB / AI panel** | aç/kapat paneli, AJAX | | `interactive.js` |
| **Azaltılmış hareket** | `@media (prefers-reduced-motion:reduce){…transition:none!important;animation:none!important}` | 6 kez tanımlı | `gl-shell.css` vb. |

**Yorum:** Resmî mağazada gerçek "animasyon" neredeyse yok (tek keyframe); sadece hover scale ve slider. Yani "UI güzelliği" hareketten değil statik süslemeden geliyor → Türkiye sitesi için hareket alanı **boş fırsat**.

---

## 14. Gözlem ile Yorumun ayrımı — tasarım dili özeti

**Gözlem (resmî mağaza):** Koyu yeşil + altın palet, Roboto, krem kart, yumuşak 12–28px radius, yeşilimsi sıcak gölge, botanik süs görselleri, dolgulu tek renk kategori ikonları + çizgi UI ikonları, altın CTA düğmeleri, çok yoğun içerik (7 bölüm + 3 vitrin), logoda brandbook renkleri.

**Yorum:** Mağaza "premium eko-lüks ama dağınık" bir hava veriyor; marka kimliğinin asıl rengi (lime/yeşil/mavi) logoda kalmış, temada kaybolmuş. Kullanıcının "gerçek Greenleaf kimliğine sadık, muted botanical değil" talebi, bu teması taklit etmek yerine **logodaki canlı yeşil-lime-mavi üçlüsüne** dönmek anlamına gelebilir (karar tasarım/kullanıcıda).

---

## 15. Greenleaf TR için çıkarım

Etiketler: **ALIN** = olduğu gibi benimse · **UYARLA** = fikri al, farklı uygula · **ALMA** = yapma. Her madde ilgili ajana yönlendirilmiştir.

### Bilgi mimarisi / bileşen
- **ALIN** — Sol dikey kök kategori + sağda 3 sütunlu alt grup paneli (mega menü), ikonlu kök satırları. → `ui-tasarimci`, `planlama`
- **ALIN** — Header'da arama + favori/karşılaştırma/sepet/giriş sayaçlı ikonlar + vurgulu tek CTA (bizde "Üye ol/Partner ol"). → `ui-tasarimci`
- **ALIN** — Kategori sayfasında sol kök kenar çubuğu + alt kategori çipleri + grid/list anahtarı + sıralama/limit. → `ui-tasarimci`
- **ALIN** — Ürün sayfası alt başlıklı açıklama yapısı (Faydalar / Kullanım / Kime uygun) ve Özellikler tablosu. → `icerik`, `ui-tasarimci`
- **ALIN** — Editoryal "Eko gazetesi" + şirket haberleri (blog/SEO karşılığı). → `seo-uzmani`, `icerik`
- **ALIN** — Sertifika sayfası (arama kutulu, kart başına PDF bağlantısı, "genel" vs "ürün" ayrımı). → `ui-tasarimci`, `icerik`
- **UYARLA** — "İИ поиск" (doğal dil ürün bulma): "cildine uygun ürünü bul" testine dönüştür (MEMORY §9 fikri ile örtüşüyor). → `planlama`, `ui-tasarimci`
- **UYARLA** — Header "docking" (kaydırınca kompakt, arama+katalog tek satır). → `hareket-tasarimcisi`
- **UYARLA** — Hero slider (scroll-snap, 6 sn autoplay, hover duraklat, reduced-motion) — aynı mantık; Swiper gerekmeden CSS scroll-snap ile. → `hareket-tasarimcisi`
- **UYARLA** — 5 sütunlu yatay ürün rayı; bizde tekrarsız koleksiyon + "liste fiyatı + üye fiyatı" çifti. → `ui-tasarimci`
- **UYARLA** — Üst bilgi çubuğu (karşılama + slogan + destek); Türkçe slogan, WhatsApp'sız (WhatsApp ile satış yok). → `icerik`
- **UYARLA** — Kategori ağacı: 13 kök mantığı alınır ama sadeleştirilmiş, tekrarsız, ürün odağına göre (Türkiye'de aktif 37 ürün). → `planlama`
- **UYARLA** — "Neden Greenleaf" 4 kart + istatistik şeridi; iddiaları sertifikalarla bağla (belge linki). → `icerik`
- **UYARLA** — Kart "ikon düğmeleri" (favori/karşılaştır) → karşılaştırma ikincil önemde. → `ui-tasarimci`
- **UYARLA** — Mobil çekmece menü (kök satırı + alt panele kayma). → `ui-tasarimci`, `hareket-tasarimcisi`
- **UYARLA** — Sertifika rozetleri: resmî mağazada ürün sayfasında yok; belge sayfasındaki ISO 9001/14001/45001/22716, GMP Cosmetic, Halal PDF'lerini ürün sayfasında rozet + tıklanabilir belgeye dönüştür. → `ui-tasarimci`, `hukuk-uyum` (TR'de helal/ISO ifadesi doğrulanmalı)

### Görsel dil
- **ALIN** — Logo + favicon aynen (değiştirilmeden): `grinlif.png`, `greenleaf-icon.png` (bkz. `greenleaf-varliklar.md`). → `ui-tasarimci`
- **UYARLA** — Yumuşak radius (12–20px), yeşilimsi sıcak gölge, `inset 2px #fff` iç çerçeve — ama sade, 2–3 radius değeriyle token'laştır. → `ui-tasarimci`
- **UYARLA** — Çizgi UI ikonları (stroke 1.75, rounded) tek sette birleştir; renkler token'dan. → `ui-tasarimci`
- **UYARLA** — Botanik yaprak süsleri çok seyrek; marka pinwheel'ini süs/arka plan olarak (resmî mağazada kullanılmayan farklılaştırıcı). → `ui-tasarimci`
- **UYARLA** — Eyebrow (büyük harf küçük üst etiket) + ince çizgi başlık ayracı. → `ui-tasarimci`
- **UYARLA** — Beyaz zemin + açık yeşil gradyan kabuk. → `ui-tasarimci`
- **ALMA** — Altın metalik gradyan CTA/Partner butonları, altın kenar parıltılar (brandbook'ta yok, "lüks" ama marka dışı; yeşil CTA tercih). → `ui-tasarimci` (kullanıcı onayı: S2)
- **ALMA** — 770 renk/gradyan dağınıklığı; her bölümün kendi yeşil/altın değişkeni. Tek token dosyası. → `ui-tasarimci`
- **ALMA** — Roboto'yu varsayılan alma; brandbook Poppins (S1). → `ui-tasarimci`
- **ALMA** — Mix-blend-mode multiply + 1.15× zoom hover (ağır, bulanıklık riski); daha ince 1.03–1.05. → `ui-tasarimci`
- **ALMA** — "3D madeni para" benefit ikonları (skeuomorfik, zeytin gradyan); marka paletinde düz/çizgi ikon. → `ui-tasarimci`
- **ALMA** — İki kart ailesi (`gh-card` + `greenleaf-product-card`) ve iki farklı CTA metni; tek kart bileşeni, tek CTA. → `ui-tasarimci`

### İçerik / ticari
- **ALMA** — Ana sayfanın yarısının iş fırsatı/ekip toplama bölümlerine ayrılması; üyelik tek bölümde. → `planlama`
- **ALMA** — Ürün adında koli bilgisi "(В коробке 5шт)"; temiz ad. → `veri-muhendisi`
- **ALMA** — Aynı ürünlerin 3 vitrinde tekrarı. → `planlama`
- **ALMA** — Sonsuz kaydırma + klasik sayfalama birlikte (kafa karıştırıcı); biri (öneri: "Daha fazla yükle"). → `ui-tasarimci`
- **ALMA** — Tek görsel ve ilgili ürünsüz ürün sayfası; çoklu galeri + "birlikte alınanlar" ekle. → `ui-tasarimci`
- **ALMA** — "Talep/başvuru" dili (`Добавить в заявку`) — perakende mağazada "Sepete ekle". → `icerik`
- **ALMA** — Kişisel partner telefon/e-posta/foto'su içeriği; bunlar partnere özeldir, kopyalanmamalı. → `planlama`

---

## 16. Kullanıcıya açık sorular (önerimle)
- **S1 — Font:** Roboto (resmî mağaza) mı, brandbook'taki Poppins mi? **Öneri: Poppins** (brandbook; kullanıcı da belirtmişti). Futura lisanslı, web'de zorlayıcı.
- **S2 — CTA rengi:** Altın mı (resmî mağaza), marka yeşili mi? **Öneri: yeşil (#4EAE36) birincil CTA**, altın yalnızca "üye fiyatı" rozetinde ikincil vurgu olarak değerlendirilebilir (tasarımcı kararı).
- **S3 — Marka paleti:** Resmî mağaza "koyu yeşil + altın", brandbook "yeşil + lime + mavi". **Öneri: brandbook** (kullanıcı kararıyla uyumlu), koyu yeşil yalnızca metin/koyu zemin için türetilmiş ton olarak.
- **S4 — Pinwheel:** Logoda görsel olarak 7 küme sayıldı, brandbook "altı yapraklı" diyor. Brandbook PDF/SVG ile doğrulanmalı (kullanıcı bekleyen girdisi: logo SVG + brandbook).
- **S5 — Bu mağaza partner kopyası:** "Resmî global mağaza" yerine başka bir partnerin sayfasını inceledik (store-32). Başka bir mağaza varyantı (varsayılan/store-0) analiz edilsin mi? Not: `.greenleaf-contact-fab--store-0` sınıfı CSS'te var, yani varsayılan bir varyant mevcut.

---

## 17. Sınırlamalar ve doğrulama notları
- Python ortamda yoktu; analiz `curl`, `grep`, `perl` ve `node` ile yapıldı.
- Ana sayfa **bir partnerin mağaza varyantı** (store-32); renkler/CSS tüm varyantlarda aynı olmak zorunda değil, içerik farklı olabilir.
- Piksel renk örneklemesi (logo) yapılmadı; kestirim görseldir.
- Sepet/ödeme/giriş sayfaları incelenmedi (giriş gerektirebilir; yalnızca public sayfalar). `greenleaf-global.com`'a hiç erişilmedi.
- Ürün görselleri indirilmedi; yalnız URL desenleri not edildi.
- Kategori sayısı ve ağaç, menü HTML'i anlık görüntüsüdür (15 Kasım 2026); 111 alt kategori ikon dosyası sayıldı.
- Ham dosyalar: `.cache/arastirma/greenleaf/` (home/cat/prod/certs HTML, 16 CSS, 8 JS, `assets/` küçük SVG ve logo).
