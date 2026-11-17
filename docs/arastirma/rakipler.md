# Rakip Greenleaf Distribütör Siteleri — Araştırma (FAZ 0)

> Hazırlayan: A2-rakipler (PAZAR-ARAŞTIRMACI altında) · Tarih: 15 Kasım 2026
> Kapsam: KZ / UZ / RU distribütör-satıcı siteleri + Türkiye'deki MLM-kozmetik markalarının üye/liste fiyatı sunumu.
> Yöntem: Ana sayfalar `curl` ile önbelleğe alındı (`.cache/arastirma/rakipler/<site>/home.html`), içerik WebFetch ile okundu; ürün sayfası örnekleri çekildi. Görseller indirilmedi.
> Biçim: **Gözlem** = kaynağa dayalı olgu, **Yorum** = bizim değerlendirmemiz. Her bulgunun kaynak URL'si ilgili bölümde.
> Not: Greenleaf Çin merkezli (Suzhou Greenleaf) bir firmadır. greenleaf-global.com'a (giriş gerektirir) ve resmî global.green-leaf.shop'a bu belgede erişilmedi/analiz edilmedi; yalnızca arama sonucunda görünen herkese açık sayfa başlıkları anıldı.

---

## 0. Yönetici özeti

- 6 bağımsız site bulundu (KZ 3, UZ 2, RU 1). **Türkiye'de Greenleaf'e ait herhangi bir distribütör/mağaza sitesi bulunamadı** (TR sorgularında yalnızca ilgisiz kozmetik firmaları çıktı) → Türkiye'de rekabet fiilen boş; "ilk güzel site" olma fırsatı var. (Yorum: Arama motoru kısıtlı olduğundan "kesinlikle yok" denemez, "bulunamadı" denir.)
- **Çıta gerçekten düşük** (MEMORY §8 doğrulandı): hazır WordPress/Elementor/WooCommerce şablonları, düzensiz ürün adları (koli bilgisi addan ayrılmamış), tek fiyat gösterimi, üye kazanma baskısı.
- **Fiyat yapısı kanıtı:** greenleaf-marketplace.ru'da "güncel fiyat 188 ₽ / Розничная 376 ₽" yani liste = 2 × güncel fiyat. Bu, MEMORY §6'daki çift fiyat modelini birebir doğruluyor. Ancak üye/partner etiketi yok, "0,2 PV" açıklamasız.
- **Hiçbir rakip** cilt testi, içerik sözlüğü, tıklanabilir sertifika belgesi veya düzgün ürün detay hiyerarşisi sunmuyor.
- Rakiplerin en yaygın zayıflığı: ürün adında "(Коробка 20 шт)", yazım hataları, aynı ürün tekrarı, kupon/kep/tişört gibi ürün olmayan kalemlerin kataloğa karışması, kanıtsız sertifika/gelir vaatleri, marka yazımı tutarsızlığı (iLiFE / ILiFE / ILIFE).
- Bir site (greenleafstore.uz) ana sayfa HTML'i **~32 MB** — performans felaketi örneği.

---

## 1. Bulunan siteler — tek tek analiz

### 1.1 green-leaf.kz — "GreenLeaf Казахстан" (Kazakistan)
- URL: https://green-leaf.kz/ · Katalog: https://green-leaf.kz/shop/
- **Tür:** Karma — katalog + mağaza (sepet, "Купить") + üye/partner toplama. Başlık: "экотовары для дома, здоровья и красоты".
- **Platform (Gözlem):** WordPress + WooCommerce + Elementor (HTML'de `wp-content`, `woocommerce`, `elementor`, `wp-json`).
- **Ana sayfa/katalog yapısı:** Header (logo, Главная / О компании / Каталог (9 kategori) / Как начать свой бизнес / Подписка / Контакты, sepet "0 ₸", WhatsApp bağlantısı, "Стать партнером"). Katalog 93 sayfa sayfalamalı; **filtre, sıralama, arama yok**. 
- **Fiyat gösterimi:** Tek fiyat, ₸; üye/partner fiyatı ve PV yok. Fiyatlar koli bazlı (toptan paket).
- **Ürün adı kalitesi (Gözlem, örnekler):** "(Коробка 20 шт) Greenleaf антибактериальное туалетное мыло с полынью /120 г — 1 600 ₸"; "(60 шт коробка)Carich подвесная ароматерапия для автомобиля 8мл/синий — 3 600 ₸"; "(Коробка 36 шт) CARICH Крем для рук 50 г — 1 200 ₸". Yazım hataları ("Корбока"), kiril/translit karışımı slug (`czvetok`), aynı adın iki farklı fiyatla tekrarı, "1000 купонов Greenleaf" / "304 маленькая кепка" gibi ürün olmayan kalemler.
- **Mobil/performans:** `viewport` meta var, `loading="lazy"` kullanımı sınırlı (8 adet); Elementor ağır DOM (1000+ elementor sınıfı). Gerçek cihaz testi yapılmadı (kısıt).
- **Güven öğeleri:** telefon, e-posta, Almatı adresi; sertifika, yorum, puan **yok**. Alt bilgi "kamuya açık teklif değildir" uyarısı.
- **Zayıf noktalar:** Toptan dili, filtre/arama yok, sertifika yok, Platin/Bronz paket başvuru formları (fiyatsız), CTA karmaşası (alışveriş mi üyelik mi belirsiz).
- **Bizim için fırsat:** Aynı katalog genişliğini (93 sayfa) **filtre + arama + temiz ad** ile sunmak; "Купить" ile "Стать партнером" karışıklığına karşı alışveriş önde, üyelik tek bölümde.
- Kaynak: https://green-leaf.kz/shop/ · önbellek: `.cache/arastirma/rakipler/green-leaf.kz/home.html`

### 1.2 greenleaf-family.kz — "Greenleaf Family Казахстан" (Kazakistan)
- URL: https://greenleaf-family.kz/
- **Tür:** Karma — resmî servis merkezi iddiası + partner toplama + mağaza (ürün sayfalarında "Ожидаем поступление" durumu görüldü).
- **Platform:** WordPress + WooCommerce 11.x + WPBakery Page Builder.
- **Ana sayfa akışı:** Header (WhatsApp, **"СТАТЬ ПАРТНЁРОМ"** düğmesi, menü: Главная / Каталог / О компании / Медиа / Контакты) → şirket/marka tanıtım metni → servis merkezi fotoğrafı + adres → ortaklık avantajları ("Официальный статус", "без посредников") → haftalık iş atölyesi (Cumartesi 12:00) → 12 popüler ürün → 6 haber/makale → "Born For Beauty" blok → "−50 %" partner afişi → footer.
- **Fiyat gösterimi:** Tek fiyat ₸. Partner indirimi yalnızca afiş metninde ("минус 50% на весь ассортимент"); karta yansımıyor. PV yok.
- **Ürün adları (örnek):** "Средство для чистки унитаза iLiFE, 500 мл — 2 800 ₸", "Молочный гель для душа Carich, 1 кг — 5 000 ₸". Diğerlerinden **daha düzenli** (ürün türü + marka + hacim; koli bilgisi addan ayrı). Marka yazımı yine tutarsız (iLiFE/Айлайф).
- **Ürün detay (Gözlem):** Breadcrumb, "Описание / Детали" iki sekme, artikul (KLA053), kullanım adımları, kontrendikasyonlar — içerik zengin. Ancak sertifika, yorum, menşe yok; ürün "stokta yok" iken satın alma düğmesi görünmüyor; sayfa altı partner afişi baskın.
- **Güven:** telefon, sosyal bağlantılar, adres, kullanıcı sözleşmesi, ücretsiz haftalık atölye. Kazanç iddiası ("финансовая свобода") kanıtsız. Sayfa altında "error: Content is protected!" (sağ tık engeli betiği) görünüyor.
- **Zayıf noktalar:** Üyelik CTA'sı 3 yerde tekrar; sertifika/yorum yok; fiyat vaadi görünmez.
- **Fırsat:** Yoğun içerik (kullanım, sakınca) iyi bir fikir → bizde bunu temiz sekme + "Nasıl kullanılır" şeklinde, tedavi edici iddiasız (TİTCK) yazmak.
- Kaynak: https://greenleaf-family.kz/ · https://greenleaf-family.kz/product/vannochka-dlya-nog-travyanoj-nabor/

### 1.3 greenleafazamat.kz — "Greenleaf" (Kazakistan)
- URL: https://greenleafazamat.kz/
- **Tür:** Mağaza + kurumsal tanıtım (çok dilli: RU, EN, KK, HI, **TR**). Üye toplama içeriği yok ("Наша команда" yalnızca personel).
- **Platform:** WordPress + WooCommerce + Elementor 3.33 (en ağır DOM: 8 000+ elementor sınıfı).
- **Ana sayfa akışı:** Hero ("Beauty and cleanliness every day") → yeni/çok satan → 3 kategori bloğu → şirket istatistikleri → Hit satışlar → starter setler/kupon/yenilikler → "Why choose us" → markalar → ekip → danışma formu. 
- **Fiyat:** Tek fiyat ₸; partner/PV yok; adlarda koli ifadesi ("Кол-во в коробке 20 шт").
- **Ürün adları (örnek):** "Greenleaf Aromatic smoothing shampoo, 500 ml (box of 20) — 4 600 ₸" (İngilizce/Rusça karışık).
- **Güven:** Intercos (İtalya) / CRB (İsviçre) ortaklığı, "30+ ülke", "300 000+ partner", 68 milyon USD sanayi parkı, Çin Ticaret Bakanlığı lisansı, schema.org (35 JSON-LD bloğu) — en SEO bilinçli rakip.
- **Zayıf noktalar:** "Купить сейчас" **popup** açıyor (sepet değil); şirket abartı rakamları; Elementor performansı.
- **Fırsat/Not (Yorum):** Dil seçeneklerinde **Türkçe listelenmiş** — ancak TR içeriğini doğrulamadım. Türkçe arayan birini yakalayabilecek tek rakip olabilir; izlenmeli.
- Kaynak: https://greenleafazamat.kz/

### 1.4 green-leaf.uz — "GreenLeaf в Узбекистане" (Özbekistan)
- URL: https://green-leaf.uz/
- **Tür:** Ağırlıklı **işe alım (MLM) sayfası** + vitrin mağaza. Kendini "новая млм-компания в Узбекистане", "франшиза за доступные деньги" olarak tanıtıyor.
- **Platform:** WordPress + WooCommerce 9.5 (WP 7.1.4), tema yapımcısı "FVVStudio" imzası. Metrica var.
- **Ana sayfa akışı:** Header (8 kategori, arama, favori, Войти/Регистрация) → menü (Новая компания, О компании, Маркетинг-план, Магазин, Видео, Контакты) → hero/promo bannerlar → "açın kendi işinizi" bloğu → 8 ürün serisi → avantajlar (ücretsiz teslimat 990 000 сум üzeri, iade garantisi, geziler/araba/daire teşvikleri) → "Приглашаем в команду" + katalog/pazarlama planı PDF'leri → pazarlama avantajları → 4 **HALAL** sertifika görseli → markalar → şirket hikâyesi (1998, Suzhou) → 2 ürün karuseli.
- **Fiyat gösterimi:** **Hiçbir üründe fiyat yok** — tüm kartlarda "Узнать цену". Fiyat/puan listeleri PDF olarak indirtiliyor.
- **Ürün adları:** Genelde açıklayıcı ama marka yazımı tutarsız (SEALUXE/Sealuxe, YIBEILE/Yibelle), mükerrer ürünler.
- **Güven:** HALAL görselleri, "%100 güvenli ödeme", 7/24 destek iddiası. Yorum, tüzel kişi bilgisi, adres yok. Alt bilgi 2020 telif (güncel değil); ana menüde dış alan adına ("pbsudoku.su") giden "Новая компания" bağlantısı şüphe uyandırıyor.
- **Zayıf noktalar:** Fiyatsız vitrin (alışveriş yapılamaz), gelir/araba/daire vaadi, güvensiz hissi.
- **Fırsat:** "Fiyat sor" yerine **net liste + üye fiyatı**; hesaplanabilir tasarruf mesajı.
- Kaynak: https://green-leaf.uz/

### 1.5 greenleafstore.uz — "Greenleaf Store" (Özbekistan)
- URL: https://greenleafstore.uz/
- **Tür:** Gerçek e-ticaret mağazası; "Официальный дистрибьютор Greenleaf в Узбекистане" iddiası. Üyelik toplama baskısı **yok**.
- **Platform:** Tek bir bilinen CMS/şablon tespit edilemedi (HTML'de WP/Tilda/OpenCart izi yok; özel/framework). Üst şeritte **"Сайт работает в тестовом режиме"** uyarısı var.
- **Yapı:** Header (O компании, Продукция, Контакты, Блог, dil RU/EN/UZ, Войти, sepet) → hero ("Greenleaf — Born for beauty") → 3 değer (Качество / Экологичность / Доступность) → Hit satışlar → ürün ızgarası (kategori filtreleri: Декоративная косметика, Уходовая…, **Купонные товары, Балловые товары, Стартовые наборы**) → marka filtreleri (Carich, Chanery, Flower Point, GREENPAL, KARDLI, MAIWEIS, Marvisia, SEALUXE, YIBEILE, iLiFE…). Marka listesi en kapsamlı olan.
- **Fiyat:** Tek fiyat, **sum**, koli bazlı ("112,200.0 s"); "Балловые/Купонные" kategorileri puan sistemini kategori olarak gösteriyor ama üye fiyatı ayrımı yok. Format kusuru: "112,200.0 s".
- **Ürün adları:** "(Кол-во в коробке 24 шт) CARICH Нежный отбеливающий мусс для зубов, 100 мл" — koli bilgisi adın başında; aynı ürün iki farklı yazımla ("Carich ополаскиватель" / "Калиши ополаскиватель").
- **Performans (Gözlem, ölçüm):** Ana sayfa HTML'i `curl` ile **33 032 906 bayt (~33 MB)**, ~21 sn indirme; ~16 700 `<img>` etiketi. WebFetch 10 MB sınırını aştığı için sayfa okunamadı; içerik yerel önbellekten ayıklandı. Mobil için bu ciddi bir sorun (Yorum).
- **Güven:** Yalnızca metin vaatleri ("sertifikalı"), rozet/belge yok.
- **Fırsat:** Performans ve ürün kartı temizliği; kupon/puan kavramlarını **anlaşılır, tek bir "Üye fiyatı"** diline çevirmek.
- Kaynak: https://greenleafstore.uz/ · önbellek: `.cache/arastirma/rakipler/greenleafstore.uz/home.html` (büyük dosya)

### 1.6 greenleaf-marketplace.ru — "Greenleaf Store / Marketplace" (Rusya)
- URL: https://greenleaf-marketplace.ru/ · Ürün: https://greenleaf-marketplace.ru/products/DAD192
- **Tür:** Gerçek perakende mağaza (Kurgan merkezli satıcı görünümü; footer'da Kurgan e-posta/adres). Üyelik CTA'sı zayıf (footer'da "Партнерская программа").
- **Platform:** **Next.js** (`/_next/static`) — rakipler arasında tek modern yığın.
- **Ana sayfa akışı:** Promo şeridi (PVZ teslimat 119 ₽, çalışma saatleri MSK) → header (Каталог, Войти, Корзина) → hero ("Премиальная эко-продукция…", 3 metrik: %100 orijinal / %0 fosfat-klor / 5.0 ★) → Ürün günü → 16 popüler kategori karosu → rozet filtreli katalog (Все / Новинки / Акции / Эко-дом / Детям) → 27 marka ailesi → güvenlik standartları → 9 yorum → footer.
- **Fiyat gösterimi (Gözlem):** "**188 ₽**" + "**0,2 PV**" + "Розничная: 376 ₽". Yani güncel = 0,5 × perakende. Üye/partner etiketi yok; PV açıklanmıyor. 
- **Ürün adları:** "iLiFE probiotic daily sanitary pads 245mm/7pcs iLife ежедневные … 245мм/7 шт" — İngilizce+Rusça tekrar; marka yazımı üç biçim. 
- **Ürün detay:** Breadcrumb, "НОВИНКА", SKU, yıldız, uzun açıklama + "Читать полностью", adet seçici + "В корзину", yorum alanı ("Загрузка отзывов…"), 4 benzer ürün. "100% предоплата" ön plan.
- **Güven:** "ISO9001/ISO14001/GMP" **metin olarak**, sertifika belgeleri yok (menüde "Сертификаты GMP / ISO" bağlantısı var); 5.0 puan 2–9 yorumdan; bazı yorumlar anlamsız metin ("ывава ыап…"); açıklamada bozuk metin parçası. Marka tutarsızlığı (Greenleaf Family / Organic Market / Marketplace).
- **Mobil/performans:** `viewport` var; HTML 314 KB; `lazy` kullanımı HTML'de görünmüyor (Next/Image olabilir). Gerçek ölçüm yapılmadı.
- **Fırsat:** En yakın "alışveriş önde" örnek; üzerine **temiz ad, açıklamalı PV/üye fiyatı, gerçek sertifika belgeleri, doğrulanmış yorum** ile fark yaratılabilir.
- Kaynak: https://greenleaf-marketplace.ru/

### 1.7 Diğer izler (site değil, kanal)
- Kazakistan'da Greenleaf ürünleri Kaspi ilanlarında ve Satu'da satılıyor (örn. https://obyavleniya.kaspi.kz/a/aloe-kapsula-greenleaf-121920877, https://satu.kz/Ilife.html); Özbekistan'da OLX.uz'da Carich ürünü ilanı (https://www.olx.uz/d/oz/obyavlenie/eko-zubnaya-gelpasta-otbelivanie-bez-ftora-yaponskaya-texnologiya-120-g-ID400Yk.html). (Yorum: Bağımsız satıcılar pazaryerlerinde; Türkiye'de Trendyol/Hepsiburada'da paralel satış riski sonradan izlenmeli — bu belgede incelenmedi.)
- 2GIS'te Almatı'da "Greenleaf" mağaza kartı var: https://2gis.kz/almaty/firm/70000001089039970 (perakende nokta).

---

## 2. Karşılaştırma tablosu

Genel kalite puanı (1–5) **Yorum**dur: UI/UX, bilgi netliği, güven ve teknik kaliteye göre öznel. "Mobil" sütunu yalnızca teknik işaretlere dayanır (viewport meta, HTML boyutu); gerçek cihaz testi yapılmadı.

| Site | Ülke | Tür | Platform | Fiyat gösterimi | Üye fiyatı var mı | Cilt testi | Sertifika rozeti | Mobil (teknik işaret) | Genel kalite 1–5 |
|---|---|---|---|---|---|---|---|---|---|
| green-leaf.kz | KZ | Karma (katalog+mağaza+üye) | WordPress/WooCommerce/Elementor | Tek fiyat ₸, koli bazlı | Hayır | Yok | Yok | viewport var; ağır DOM | 2 |
| greenleaf-family.kz | KZ | Karma (servis merkezi+partner+mağaza) | WP/WooCommerce/WPBakery | Tek fiyat ₸; −50 % yalnızca afişte | Hayır (metinde) | Yok | Yok | viewport var | 2,5 |
| greenleafazamat.kz | KZ | Mağaza + kurumsal | WP/WooCommerce/Elementor | Tek fiyat ₸, koli ifadeli | Hayır | Yok | Metin iddiaları (lisans, ortaklık) | viewport var; en ağır DOM | 3 |
| green-leaf.uz | UZ | Ağırlıklı işe alım + vitrin | WP/WooCommerce | **Fiyat yok** ("Узнать цену") | Hayır (PDF listeler) | Yok | 4 HALAL görseli | viewport var | 2 |
| greenleafstore.uz | UZ | Mağaza (test modu) | Belirsiz/özel | Tek fiyat sum, koli bazlı | Hayır (puan/kupon kategorisi var) | Yok | Yok | ~33 MB HTML — zayıf | 2 |
| greenleaf-marketplace.ru | RU | Perakende mağaza | Next.js | **188 ₽ + "0,2 PV" + "Розничная 376 ₽"** | Kısmen (etiketsiz) | Yok | Metin (ISO/GMP), belge yok | viewport var; hafif HTML | 3,5 |

---

## 3. Genel gözlemler ve kalıplar

**Gözlem**
1. 5/6 site WordPress ailesi (4 WooCommerce+Elementor/WPBakery), 1 Next.js, 1 belirsiz.
2. 6/6 sitede cilt testi, içerik sözlüğü, tıklanabilir sertifika belgesi **yok**.
3. Fiyat: 0/6 sitede "Üye fiyatı" etiketi; yalnızca RU sitesinde ikili fiyat (etiketsiz). Diğerleri tek fiyat veya fiyatsız.
4. Ürün adlarında koli bilgisi KZ ve UZ sitelerinde yaygın (greenleaf-family.kz ve RU sitesinde değil).
5. Üye toplama dili: "Стать партнером" (header'da kalıcı), kazanç/araba/daire vaadi, WhatsApp. (Bizim projede WhatsApp ile satış yok, karar MEMORY §1.)
6. Marka yazımı tutarsız (iLiFE/ILiFE/ILIFE, Yibeile/Yibelle, Nilrich/Nilirich).
7. Kaynak içerik Rusça meta + Rusça uzun metin; çeviri/yerelleştirme kalitesi bizim için ayrı iş.

**Yorum**
- Rakipler "bizim ürünümüz var, gel üye ol" mantığında; hiçbiri "iyi alışveriş deneyimi" ile yarışmıyor. Bizim farkımız güzel UI + net fiyat mantığı olacak.
- RU sitesi (Next.js) bile ürün adı, PV açıklaması ve güven öğelerinde zayıf; "modern yığın = iyi UX" değil.

---

## 4. Türkiye'deki diğer MLM-kozmetik markaları: üye / liste fiyatı sunumu

Amaç: kullanıcıların alışık olduğu etiketleri ve kalıpları görmek. **Sınırlama:** Sayfalar WebFetch ile (JS çalıştırmadan, tek sayfa) okundu; Amway 403 verdi; Farmasi'de fiyat/ürün kartı içeriği alınamadı. Girişli üye görünümü hiçbir sitede incelenmedi.

| Marka | Misafir fiyatı | Üye/danışman fiyatı etiketi | PV/BV | "Üye ol" CTA yeri | Kaynak |
|---|---|---|---|---|---|
| **Farmasi TR** | Ana sayfa içeriğinde fiyat alınamadı | Etiket doğrulanamadı | Doğrulanamadı | Header'da "**Farmasi Girişimcisi Ol!**", gövdede "FARMASİ GİRİŞİMCİSİ OL — Kendi İşini Kur, Farmasi ile Büyü!"; ayrıca "MİSAFİR SİPARİŞİ" (kayıtsız sipariş takibi); footer'da CTA yok | https://www.farmasi.com.tr/ |
| **Oriflame TR** (www.oriflame.com.tr → tr.oriflame.com 301) | Kartta güncel fiyat + üstü çizili yüksek referans fiyat (örn. ₺499,99 / ₺919,00) | Üye etiketi yok; ayrım belirtilmiyor; "%50 İndirim ile Sahip Olun" kampanya metni | BV/puan ana sayfada yok | Çekilen içerikte join CTA yok; yalnızca "Hemen Keşfet" | https://tr.oriflame.com/ |
| **Atomy TR** | Herkese aynı fiyat (TL), örn. 2.399,99 TL | Yok | "**Oturum açtıktan sonra PV görüntülenir.**" (PV girişe kilitli) | Üst yardımcı çubukta "**Üye Ol**" (Giriş Yap'ın yanında); fiyatın yanında yok | https://tr.atomy.com/main |
| **Amway TR** | Erişilemedi (HTTP 403) | — | — | — | https://www.amway.com.tr/ (403) |

Ek kaynak: Farmasi'nin üye girişi "Girişimci" sözcüğüyle yapılıyor (uygulama: https://apps.apple.com/us/app/id1434329055 — "Girişimci Girişi yaparak sipariş…"; "Katalog" ayrı bir bölüm). Amway PV/BV mantığı genel olarak: PV aylık prim yüzdesini, BV primin hesaplandığı tabanı belirler (Tayvan iş kılavuzu: https://assets.contentstack.io/v3/assets/blteeab84dbccc3382e/blta889810046e0cae3/67a5c3c0a480ae9a942846be/Amway_Business_Manual_202312.pdf) — Türkiye'ye özgü değil.

**Gözlem:** TR MLM sitelerinde "Üye fiyatı / Katalog fiyatı / Danışman fiyatı" etiketleri **ana sayfa düzeyinde görünmedi**; kalıp "herkese tek fiyat (üstü çizili referansla), kayıtlı üyeye ayrı/PV girişten sonra" şeklinde. Üyelik çağrısı en çok header'da veya yardımcı çubukta, ürün kartında değil. "Girişimci" (Farmasi) ile "Üye" (Atomy) farklı çerçeveler.

**Yorum:** Greenleaf TR'de **kartta iki fiyatı da misafire göstermek** pazarda alışılmışın dışında ama bizim bilinçli farkımız olur (MEMORY §7). Kullanıcıya "Girişimci/iş fırsatı" yerine "**Üye ol, yarı fiyatına al**" çerçevesi daha alışveriş odaklı. Not: Yerel hukuk açısından üye fiyatı/iş fırsatı dilinde "kazanç vaadi" yazmamak gerekir (hukuki danışma, hukuki tavsiye değildir).

---

## 5. Greenleaf TR için çıkarım (ALIN / UYARLA / ALMA)

Etiket: kime ait → ilgili ajan.

**ALIN**
1. Gerçek alışveriş mantığı: arama + filtre + kategori (rakiplerde yok → bizde standart) → ui-tasarimci.
2. Ürün detay yapısı: breadcrumb, SKU, sekmeli açıklama (Açıklama/Detay/Kullanım), benzer ürünler (greenleaf-family.kz, marketplace.ru) → ui-tasarimci.
3. Ürün sayfasında teslimat/ödeme koşullarının kısa özeti (marketplace.ru "teslimat 119 ₽ / %100 ön ödeme" ön plan) → ui-tasarimci / icerik.
4. Çok dilli altyapı fikri (greenleafazamat.kz dil seçici) — TR + opsiyonel EN → veri-muhendisi.
5. Schema.org/JSON-LD ürün işaretlemesi (greenleafazamat.kz 35 blok, marketplace.ru 4) → seo-uzmani.
6. Ürün başına SKU/artikul alanı (kod) veri şemasında → veri-muhendisi.

**UYARLA**
1. Çift fiyat: kartta **liste fiyatı (üstü çizili/siyah) + üye fiyatı (yeşil rozet)**; marketplace.ru'daki "güncel / Розничная" kalıbını **etiketleyip** (örn. "Üye fiyatı", "Liste fiyatı") ve PV'yi açıklayarak kullan → ui-tasarimci.
2. PV: Atomy gibi PV'yi girişe kilitleme **yerine** PV'yi küçük, açıklamalı bilgi ikonuyla göster (karar kullanıcıda, bkz. sorular) → ui-tasarimci / icerik.
3. Sertifika alanı: HALAL/ISO/GMP görseli (green-leaf.uz) → **tıklanabilir belge** (PDF/modal), belge yoksa "yakında" göster, kanıtsız iddia yazma → ui-tasarimci / icerik.
4. Üyelik CTA: header'da "Üye ol" (Atomy modeli) + sayfada **tek** şık bölüm; ürün kartında "yarı fiyatına almak için üye ol" ipucu → ui-tasarimci.
5. Yorum/puan: marketplace.ru'daki 5.0 ★ düzeni, ancak yalnızca doğrulanmış yorumla ve backend yokken sahte puan göstermeden → ui-tasarimci / veri-muhendisi.
6. Ürün içerik yapısı (kullanım adımları, sakınca): greenleaf-family.kz'deki gibi ama tedavi edici iddia olmadan → icerik.
7. Ücretsiz/yerel etkinlik fikri (Cumartesi atölyesi) → ileride "Etkinlikler" bölümü, şimdilik kapsam dışı.

**ALMA**
1. Fiyat gizleme ("Узнать цену") — alışveriş engeli.
2. Ürün adında koli bilgisi ("(Коробка 20 шт)") ve kupon/şapka gibi ürün olmayan kalemler (MEMORY §6).
3. Kazanç/araba/daire/"финансовая свобода" vaatleri ve işe alım ağırlıklı ana sayfa.
4. "Купить" butonunun popup açması, "Sepete ekle" + "Talep" ikilisi.
5. Her yerde tekrarlanan "Стать партнером" sticky çağrısı.
6. 30+ MB sayfa, ağır sayfa-oluşturucu DOM'u (Elementor) — Next.js + görsel optimizasyonu şart.
7. Sağ tık/içerik koruma betiği, "test modu" şeridi, dış alan adlı şüpheli bağlantılar.
8. Marka yazımı tutarsızlığı — tek bir marka/ürün adlandırma sözlüğü kullan (iLiFE, Carich, Nilrich, SEALUXE… yazım standardı) → icerik / veri-muhendisi.
9. Kanıtsız sayısal iddia ("300 000+ partner", "%100 orijinal", 5.0 ★ az yorumdan).

---

## 6. Kullanıcıya sorulması önerilen sorular
1. Kartta **liste ve üye fiyatı misafire de görünsün mü?** (Öneri: Evet — rakipler ve TR MLM siteleri bunu yapmıyor; bu bizim farkımız. Hukuki kontrol sonra.)
2. **PV** misafire gösterilsin mi? (Öneri: Evet, küçük "PV" etiketi + tek satırlık açıklama; MEMORY'de PV alanı zaten şemada.)
3. Sertifika belgeleri (ISO/GMP/HALAL) elinizde var mı, PDF olarak paylaşabilir misiniz? (Yoksa rozet boş kalır.)
4. Türkiye'de Greenleaf ürünlerini zaten satan başka bir site/pazaryeri satıcısı biliyor musunuz? (Bu araştırma bulamadı.)
5. Üyelik dili: "Üye ol" mu, "Girişimci/İş ortağı ol" mu? (Öneri: Ana dil "Üye ol – indirimli alışveriş"; iş fırsatı dili ikincil.)

## 7. Karar önerileri
- Üye/liste fiyatı etiketleri: **"Liste fiyatı"** (üstü çizili) ve **"Üye fiyatı"** (yeşil rozet); "Danışman" dili kullanma.
- Kart tasarımında PV'yi açıklamalı ikincil bilgi olarak tut.
- Ürün adı temizleme kuralı: koli → ayrı alan; marka yazım sözlüğü.
- Sertifika bölümünü "belge yoksa gösterme" kuralıyla kur.

## 8. Sınırlamalar
- Arama motoru kısıtlı olduğundan site listesi kapsamlı değildir; 6 site doğrulandı, Rusya'da yalnızca 1 bağımsız mağaza bulundu. Kazakistan/Özbekistan'da başka siteler olabilir.
- Gerçek cihazda mobil/performans testi (Lighthouse) yapılmadı; "mobil" sütunu teknik işaretlere dayanır.
- Üye/liste fiyatı gözlemleri yalnızca **misafir görünümü** içindir; giriş gerektiren alanlara erişilmedi.
- Farmasi ve Amway TR'de fiyat içeriği alınamadı (JS/403); bu markalar için ürün sayfası düzeyinde bulgu eksik, ikinci tur gerekirse tarayıcı tabanlı bakış önerilir.
- İletişim bilgileri (telefon, e-posta) kişisel veri sayılmasın diye bu belgeye yazılmadı.
- Özbek dili içeriği (UZ) ve Kazak dili içeriği ayrıca incelenmedi.
