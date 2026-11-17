# Kabul Kriterleri

> Sahip: proje-yoneticisi · Uygulayan: kalite-denetcisi · Son güncelleme 2026-11-16 · Durum: Kapı 1 geçti (değişikliklerle)
> Her madde **geçti/kaldı** olarak test edilebilir. Kimlik: `KK-<bölüm>-<no>`. Test seti: 360, 390 (iPhone), 768, 1024, 1440 px; Chrome/Edge/Firefox/Safari son 2 sürüm + iOS Safari 16+ (K-034). "Hover cihazı" = fare/trackpad'li masaüstü; "dokunmatik" = 390 px iPhone.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | §0.1 PV yakında dahil her üründe (KK-0-05, KK-0-06 değişti) | K-062, K-098 |
| 2026-11-16 | §0.4 performans bütçesi animasyon önceliğine göre güncellendi (KK-0-18) | K-070, K-097 |
| 2026-11-16 | §0.5 e-posta istisnası (KK-0-20…22) | K-069, K-090 |
| 2026-11-16 | §1 görselli mega menü (KK-1-01…12) | K-064, K-091 |
| 2026-11-16 | §2 ana sayfa animasyon, PV bandı, premium sahne, hover | K-065, K-066, K-070, K-094 |
| 2026-11-16 | §6 ödeme adımları silindi; pasif ödeme düğmesi kriterleri | K-068, K-088 |
| 2026-11-16 | §7 cilt testi → bulucu + e-posta | K-069, K-089, K-090 |
| 2026-11-16 | Yeni §11 tema + hover renk geçişi, §12 PV sayfası | K-065, K-066, K-086, K-092, K-093 |
| 2026-11-16 | Kullanıcı K-085 (kazanç içeriği, K-015 İPTAL): KK-8-02, KK-12-03 güncellendi, KK-12-05 eklendi | K-085, K-099 |

## 0. Site geneli

### 0.1 Fiyat ve PV
- KK-0-01 TR ürününün göründüğü her yerde (kart, detay, drawer, bulucu, üye ol, mega menü kartı, arama paneli) iki etiketli fiyat vardır: "Fiyat" ve "Üye fiyatı"; Üye fiyatı rozet içindedir; üye fiyatı hiçbir yerde tek başına görünmez. Tek istisna: ana sayfa hero'daki yüzen packshot'lar fiyatsızdır, yalnız PV taşır.
- KK-0-02 Fiyat = kaynaktaki müşteri fiyatı = Üye fiyatı × 2; rastgele 10 üründe veri ile ekran karşılaştırılır, fark 0.
- KK-0-03 Hiçbir yerde üstü çizili fiyat, "%", "indirim", "tasarruf", "kazanç" fiyat bağlamında yoktur (kod + render taraması; temalı sayfalar ve mega menü tanıtım alanı dahil).
- KK-0-04 Fiyat biçimi her yerde aynı ("₺1.299,90"; kuruşsuzda "₺1.300").
- KK-0-05 PV, `pv` verisi olan **her** üründe (TR ve yakında) kart, detay, arama paneli, mega menü kartı, bulucu ve sepet satırında görünür; biçim "PV 0,5"; ipucu tıklama, dokunma ve klavye odağıyla açılır, Esc ile kapanır, "PV nedir?" bağlantısı `/pv-nedir`'e gider; ipucu metninde kazanç/gelir içeriği yoktur.
- KK-0-06 Yakında ürünlerde fiyat ve üye fiyatı hiçbir yerde görünmez; PV görünür ve ipucunda "Türkiye'de satışa çıktığında değişebilir" notu vardır. `pv` verisi olmayan üründe PV öğesi hiç render edilmez ("PV —" yok).
- KK-0-06a Yakında ürünlerin PV değeri = RU mağaza puanı / 100; rastgele 10 yakında üründe kaynakla karşılaştırılır, fark 0.

### 0.2 "Yakında" ürünler
- KK-0-07 Yakında ürün hiçbir yoldan (kart, detay, yapışkan çubuk, bulucu toplu ekleme) sepete eklenemez.
- KK-0-08 Her yakında ürün "Türkiye'ye yakında" rozetini yazıyla taşır.
- KK-0-09 Hiçbir sayfada Kiril karakter görünmez (HTML, `title`, `alt`, meta dahil).

### 0.3 Erişilebilirlik (WCAG 2.2 AA)
- KK-0-10 axe: her P0 sayfada 0 kritik/ciddi hata (temalı sayfalar dahil).
- KK-0-11 Metin kontrastı ≥ 4,5:1, büyük metin/arayüz ≥ 3:1 — **ana tema, her ürün/koleksiyon teması ve hover paletiyle değişen her öğe** için ayrı ölçülür.
- KK-0-12 Tüm işlevler yalnız klavyeyle tamamlanır (A8 demo yolu klavyeyle; hover'a bağlı adımlar hariç, çünkü dekoratif); odak her zaman görünür, yapışkan öğelerin altında kalmaz.
- KK-0-13 Dokunma hedefleri ≥ 44×44 px (PV ipucu düğmesi dahil).
- KK-0-14 `prefers-reduced-motion` açıkken: otomatik geçiş, kayma, parallax, büyütme, sayaç, süsleme çizimi ve **hover renk geçişi** kapalıdır; içerik ilk hâlinde tam görünür; işlev kaybı yok.
- KK-0-15 Drawer, mega menü, mobil çekmece, filtre paneli, hesap paneli, PV ipucu: açılınca odak doğru yere taşınır, Esc kapatır, kapanınca odak açan öğeye döner.
- KK-0-15a 5 sn'den uzun süren her otomatik/sürekli hareket görünür bir kontrolle durdurulabilir veya ≤ 5 sn'de kendiliğinden durur (WCAG 2.2.2); ekranda aynı anda en çok 2 sürekli dekoratif hareket vardır.

### 0.4 Performans (mobil, 4G yavaşlatma)
- KK-0-16 Ana sayfa, kategori, ürün detay, temalı koleksiyon, bulucu: LCP ≤ 2,5 sn, CLS ≤ 0,1, INP ≤ 200 ms.
- KK-0-17 Lighthouse mobil Performans ≥ 90, Erişilebilirlik ≥ 95, En İyi Uygulamalar ≥ 95, SEO ≥ 95 (P0 sayfalar).
- KK-0-18 İlk yüklemede sayfa başına JS (sıkıştırılmış) ≤ 170 KB (animasyon kütüphanesi kullanılırsa dahil, kendisi ≤ 25 KB); ana sayfa ilk ekran aktarımı ≤ 500 KB, tüm sayfa kaydırıldığında toplam ≤ 1,6 MB; mega menü görselleri ilk sayfa yüküne dahil değildir (panel açılmadan istek 0).
- KK-0-19 360 px'de hiçbir sayfada yatay kaydırma yok.
- KK-0-19a Hero başlığı (H1) opacity animasyonu almaz; LCP öğesinin görünürlüğü animasyonla gecikmez (Performance panelinde LCP zamanı animasyonsuz sürümle ±100 ms).

### 0.5 Veri ve gizlilik
- KK-0-20 Bulucunun e-posta formu dışında siteden hiçbir form/kişisel veri ağ isteğiyle gönderilmez. `emailCapture.enabled=false` iken e-posta formu DOM'da yoktur ve ilgili servise istek 0'dır.
- KK-0-21 Çerez yazılmaz; tarayıcı deposunda yalnız sepet, favoriler, son aramalar ve (açıksa) e-posta formunun gönderim sayacı bulunur; e-posta adresi hiçbir depoda yoktur.
- KK-0-22 Analitik olayları tetiklenir ve kişisel veri (ad, e-posta, telefon, adres) taşımaz: `add_to_cart`, `cart_open`, `checkout_disabled_click`, `membership_click`, `membership_entry_click`, `megamenu_open`, `megamenu_featured_click`, `pv_tooltip_open`, `pv_page_view`, `finder_view`, `finder_select`, `finder_add_all`, `finder_no_result`, `email_capture_submit`, `search_query`, `search_no_result`, `certificate_pdf_open`, `filter_apply`, `pdp_view`, `plp_view`, `theme_collection_view`.

### 0.6 Yayın engelleri (biri açıksa yayın yok)
- KK-0-23 `membership.url` gerçek sponsor bağlantısıdır ve gerçek tarayıcıda doğrulanmıştır (K-016).
- KK-0-24 Satıcı bilgileri yer tutucu değildir.
- KK-0-25 KVKK aydınlatma, çerez politikası, kullanım koşulları yayında ve uzman kontrolünden geçmiş; e-posta adımı açıksa aydınlatma metninin e-posta bölümü ve `/yasal/e-posta-acik-riza` da uzman kontrolünden geçmiştir.
- KK-0-26 Yayındaki her üründe Türkçe ad + ≥ 1 görsel + iddia denetiminden geçmiş metin; TR ürünlerinde fiyat ve PV dolu; fiyat yayın öncesi 24 saat içinde panelden yenilenmiş.
- KK-0-27 Sertifika rozetlerinin her biri açılan bir PDF'e gider.
- KK-0-28 `bant-ve-yamalar`, `diger-saglik-urunleri` ve Sağlık ve Takviye ürünlerinin tamamında iddia denetimi kaydı ve sabit uyarı notu vardır.

## 1. Header, mega menü, mobil çekmece, footer
- KK-1-01 Masaüstünde "Kategoriler" paneli 4 bölgeyi gösterir: kök listesi (küçük görselli), en çok 8 görselli alt kategori karosu + kalanlar metin listesi, 1 öne çıkan ürün/set kartı, 1 tanıtım karosu; veri olmayan bölge kapanır ve düzen bozulmaz.
- KK-1-02 Panel tıklama, Enter/Space ve (hover cihazında) niyet gecikmeli hover ile açılır; ↑/↓/→/←, Tab ve Esc ile tamamen kullanılır; kapanınca odak düğmeye döner.
- KK-1-03 Kökler arası fareyle çapraz geçişte yanlış köke atlanmaz (alt kategori karolarına ulaşılabilir).
- KK-1-04 Öne çıkan kartlarda TR üründe iki etiketli fiyat + PV, yakında üründe rozet + PV vardır; "Sepete ekle" yoktur; `bant-ve-yamalar` / `diger-saglik-urunleri` ürünü öne çıkan/tanıtım alanında görünmez.
- KK-1-05 Tanıtım alanında indirim, yüzde, geri sayım yoktur.
- KK-1-06 Mega menü görselleri panel açılmadan (veya hover niyeti oluşmadan) indirilmez; açılınca kök değişimi ≤ 100 ms'de görsel tepki verir.
- KK-1-07 Mobil çekmecede kökler küçük görselli satırlardır; köke dokununca kapak görselli alt kategori paneli kayar, "‹ Geri" döner ve odak kök satırına gelir; panel sonunda (varsa) öne çıkan kart ve tanıtım karosu; "Üye ol" `/uye-ol`'a gider.
- KK-1-08 Ürünsüz kategori menüde, şeritte, footer'da görünmez.
- KK-1-09 Header kaydırınca kompakt hâle geçer; CLS üretmez; mikro animasyonlar reduced-motion'da kapalı.
- KK-1-10 Sepet ve favori sayaçları anında güncellenir ve ekran okuyucuya duyurulur.
- KK-1-11 Footer satıcı ibaresi yapılandırmadan gelir; yasal bağlantılar 200 döner; "PV nedir?" ve "Cildine uygun ürünleri bul" bağlantıları vardır.
- KK-1-12 Header üst bağlantılarında "PV nedir?" ve "Cildine uygun ürünleri bul" vardır ve doğru adrese gider.

## 2. Ana sayfa
- KK-2-01 Bölüm sırası `wireframe/ana-sayfa.md` (K-094) gibidir — kullanıcının Kapı 2'de seçtiği varyanta (A/B) göre; veri olmayan koşullu bölümler hiç render edilmez.
- KK-2-02 Hero birincil CTA `/koleksiyon/turkiyede-satista`'ya gider; hero görseli LCP öğesidir; mobilde ayrı kırpım.
- KK-2-03 Hero giriş koreografisi ≤ 1,2 sn'de tamamlanır; çoklu slayt otomatik geçişi durdurulabilir ve odak/hover ile durur.
- KK-2-04 Vitrin 1, Premium sahne ve Vitrin 2'de aynı ürün iki kez görünmez.
- KK-2-05 Vitrin 1 yalnız TR ürünlerini gösterir; her kartta "Sepete ekle" çalışır ve drawer açılır; kartlarda PV vardır.
- KK-2-06 PV bandı (varyant A) veya PV sahnesi (varyant B) `/pv-nedir`'e gider; PV sayacı reduced-motion'da sabit değer gösterir; bantta kazanç dili yok.
- KK-2-07 (Varyant A) Premium sahne yalnız yapılandırılmış ve tema kayıt defterinde bulunan bir koleksiyonla render edilir; aksi hâlde bölüm yoktur; "Koleksiyonu keşfet" doğru adrese gider.
- KK-2-08 Bulucu bandındaki her cilt tipi çipi `/cilt-tipine-gore?tip={tip}` açar ve sonuç o tiple dolu gelir.
- KK-2-09 Üyelik bölümü `/uye-ol`'a gider; ana sayfada başka üyelik bölümü yoktur.
- KK-2-10 Sertifika rozetleri PDF'i yeni sekmede açar; güven şeridinde kargo/iade vaadi yoktur.
- KK-2-11 Görünür alana giriş animasyonları her bölümde bir kez oynar; geri kaydırmada tekrarlanmaz.
- KK-2-12 Sayfada tek H1 vardır.

## 3. Kategori / koleksiyon
- KK-3-01 Varsayılan sıralamada tüm TR ürünleri yakında ürünlerinden önce; karışık sonuçta ayraç görünür.
- KK-3-02 "Yalnız Türkiye'de satışta" çipi doğru sayıyla süzer, adrese `bulunabilirlik=tr` yazar.
- KK-3-03 Filtre/sıralama adrese yansır; adres yeni sekmede aynı sonucu verir; geri tuşu önceki duruma döner.
- KK-3-04 Fiyat filtresi etkinken yakında ürünler yoktur ve açıklama notu görünür.
- KK-3-05 Cilt tipi/İhtiyaç filtreleri yalnız Cilt Bakımı, Makyaj, Setler ve aramada (etiketli ürün varken).
- KK-3-06 0 sonuç verecek seçenek pasif; 0 sonuçta "Filtreleri temizle" çalışır.
- KK-3-07 "Daha fazla yükle" 24'er; geri dönüşte konum korunur.
- KK-3-08 Kart: ad ≤ 2 satır; marka ayrı satır; kartın tamamı detaya gider; "Sepete ekle", favori ve PV ipucu tıklaması detaya gitmez; TR ve yakında kartlar aynı ızgarada aynı yükseklikte; yakında kartta "Sepete ekle" yerine "Ürünü incele" vardır ve detaya gider.
- KK-3-09 Mobilde filtre paneli alttan açılır, "N ürünü göster" canlı değişir.
- KK-3-10 Geçersiz kategori adresi 404.
- KK-3-11 Listeleme sayfalarında hover renk geçişi tetiklenmez.

## 4. Ürün detay
- KK-4-01 TR: iki etiketli fiyat, PV + ipucu, miktar (1–10), "Sepete ekle", KDV notu, üyelik satırı.
- KK-4-02 Yakında: rozet, durum kutusu, PV + "değişebilir" notu (veri varsa), "Benzer ürünleri gör"; fiyat/miktar/sepete ekle yok; CTA benzerler rayına (yoksa filtreli listeye) götürür.
- KK-4-03 Benzerler rayı (yakında) yalnız TR; "Birlikte kullan" (TR) ≤ 4 ürün, ürünün kendisi yok.
- KK-4-04 Boş alan bölümleri render edilmez.
- KK-4-05 Rozet satırı K-058'e uyar.
- KK-4-06 Mobil yapışkan çubuk birincil CTA ekrandan çıkınca görünür; içeriği örtmez; temalı üründe de temasızdır.
- KK-4-07 Görsel 800 px'ten büyük gösterilmez; tek görselde küçük resim şeridi yok.
- KK-4-08 Sağlık ve Takviye ürünlerinde takviye notu; `bant-ve-yamalar` ve `diger-saglik-urunleri` ürünlerinde satın alma kutusu altında ve Açıklama'da sabit uyarı notu görünür.
- KK-4-09 Bilinmeyen slug 404.
- KK-4-10 Temalı ürün: tema yüzeyleri uygulanır; satın alma kutusu öğe sırası ve metinleri temasız ürünle aynıdır (DOM sırası karşılaştırılır).

## 5. Arama
- KK-5-01 Anlık panel 2. karakterde açılır, ≤ 300 ms'de sonuç; ≤ 3 kategori + 6 ürün.
- KK-5-02 Örnek sorgular ilk 3'te: "sampuan" → Şampuanlar; "şampun" → şampuan ürünleri; "dis macunu" → Diş Macunları; "CAA038"/"caa038" → CARICH Zencefil Hacim Şampuanı en üstte; xlsx barkodu → ilgili ürün; "ilife aloe" → iLiFE aloe; "yibelle" → YIBEILE; "deterjan" → çamaşır deterjanları (TR önce).
- KK-5-03 Alaka içinde TR önce.
- KK-5-04 Panel klavyeyle; sonuç sayısı duyurulur; Esc kapatır.
- KK-5-05 0 sonuçta yazım önerisi, kategori bağlantıları ve bulucu kartı.
- KK-5-06 `/arama?marka=carich` yalnız CARICH; H1 "CARICH ürünleri".
- KK-5-07 Sonuç sayfası noindex.
- KK-5-08 Panel ürün satırında TR'de iki etiketli fiyat + PV, yakında'da rozet + PV.

## 6. Sepet drawer
- KK-6-01 Sepete ekleme drawer'ı açar, satırı vurgular; aynı ürün miktarı artırır; 10'da durur + bildirim.
- KK-6-02 Sepet yenileme ve tarayıcı kapat-aç sonrası korunur; fiyat/ad/PV güncel veriden gelir.
- KK-6-03 Yayından kalkan / yakında'ya düşen ürün düşer + bildirim.
- KK-6-04 "Toplam", "Üye fiyatıyla toplam" ve "Toplam PV" doğrudur (3 ürün, farklı miktarlar, elle hesap); tasarruf satırı ve kargo satırı yoktur.
- KK-6-05 Boş sepette tek CTA "Türkiye'de satışta olanları gör"; pasif ödeme düğmesi ve "Üye ol" görünmez.
- KK-6-06 Dolu sepette "Ödemeye geç" düğmesi görünür, "Yakında" rozetini metin olarak taşır, `aria-disabled="true"`dır, klavyeyle odaklanır; tıklama/Enter hiçbir sayfa açmaz, konsol hatası üretmez, `checkout_disabled_click` olayını gönderir.
- KK-6-07 Pasif düğmenin hemen altında açıklama metni ("Online ödeme altyapımız hazırlanıyor…") her zaman görünür (yalnız tooltip değil) ve düğmenin erişilebilir açıklamasına bağlıdır; metin kontrastı ≥ 4,5:1.
- KK-6-08 Drawer'daki etkin birincil düğme "Üye ol"dur ve `/uye-ol`'a gider; görsel ağırlığı pasif düğmeden belirgin biçimde fazladır.
- KK-6-09 `/sepet`, `/odeme` ve `/odeme/*` adresleri ana sayfaya yönlenir ve drawer açılır; hiçbir ödeme sayfası yoktur.

## 7. Cilt tipine göre bulucu
- KK-7-01 Cilt tipi seçilmeden ürün gösterilmez; seçilince sonuç ≤ 100 ms'de görünür; hassasiyet ve ihtiyaç seçimleri sonucu canlı günceller; 3'ten fazla ihtiyaç seçilemez.
- KK-7-02 Tüm seçimler adreste; adres yeni sekmede aynı sonucu verir; `/cilt-tipine-gore/{tip}` ilgili tipi ön seçili açar.
- KK-7-03 Deterministik: aynı adres her açılışta aynı sonuç.
- KK-7-04 Sabit test vakaları (birim + elle): (a) CILT-TESTI §4 örneği; (b) `tip=kuru` iken yalnız `yagli` etiketli ürün hiçbir yerde çıkmaz; (c) `tip=hassas` iken yalnız `hassas`/`tum-ciltler` etiketli ürünler; (d) TR ve yakında aday varken ana öneri TR; (e) aynı ürün iki adımda yok; (f) aday olmayan kombinasyon "sonuç yok" ve filtreli kategori bağlantısı.
- KK-7-05 Rutin seviyesi değişimi adım sayısını 3/5/8 yapar; "Tüm uygun ürünler" görünümü süzgeçten geçen tüm ürünleri TR önce listeler.
- KK-7-06 "Rutindeki ürünleri sepete ekle (N)": N yalnız TR ana öneriler; tam N ürün eklenir, drawer açılır; yakında eklenmez + not; N=0'da metin/hedef değişir; toplamlar ve Toplam PV doğru.
- KK-7-07 Uyarı notu başlıkta ve sonuçta görünür.
- KK-7-08 `emailCapture.enabled=false` iken DOM'da e-posta alanı yoktur, "Bağlantıyı kopyala" kartı vardır ve çalışır; ağ isteği 0'dır.
- KK-7-09 (`enabled=true`) İki onay kutusu ayrıdır ve ikisi de **işaretsiz** başlar; kutu 1 (açık rıza) işaretlenmeden gönderim yapılmaz ve hata alan altında gösterilir; kutu 2 (ticari ileti) isteğe bağlıdır; aydınlatma ve onay metni bağlantıları kutuların yanında yeni sekmede açılır; Gönder düğmesi pasifleştirilmez; başarı/hata `aria-live` ile duyurulur; oturumda 3 gönderimden sonra form gizlenir.
- KK-7-10 (`enabled=true`) Gönderilen yükte yalnız e-posta, sonuç parametreleri, açık rıza, ticari ileti onayı, metin sürümleri ve zaman vardır (ağ sekmesi); e-posta analitiğe ve tarayıcı deposuna yazılmaz.

## 8. Üye ol
- KK-8-01 Birincil düğme `membership.url`'i yeni sekmede (`noopener`) açar, `membership_click` olayını kaynakla gönderir.
- KK-8-02 Sayfada kazanç/gelir rakamı ve iş fırsatı anlatımı yoktur; yalnız SSS'de "Greenleaf iş fırsatı nedir?" sorusu `/pv-nedir#is-firsati`'ya bağlanır. Yüzde ifadesi yalnız "Üye fiyatı nedir?" cevabında kaynak atfıyla bulunabilir.
- KK-8-03 Fiyat örneği TR ürünleri, iki etiketli fiyat + PV.
- KK-8-04 Sponsor kodu yapılandırılmışsa kopyalanır ve duyurulur; değilse bölüm yok.
- KK-8-05 Bağlantı yoksa önizlemede bildirim (yayın engeli KK-0-23).
- KK-8-06 Site içi tüm "Üye ol" giriş noktaları (sepet drawer ve PV sayfası dahil) önce `/uye-ol`'a gider; istisna "Greenleaf üye girişi".

## 9. P1 sayfalar
- KK-9-01 Sertifikalar: belge adı, kuruluş, kapsam, çalışan PDF (boyutuyla); EAEU yok.
- KK-9-02 Hakkımızda: "Çin merkezli (Suzhou)"; "Rus markası" yok; iletişimde form yok.
- KK-9-03 Favoriler: anında ekle/çıkar; yenilemeden sonra korunur; yakında favorilenebilir; kartlarda PV.
- KK-9-04 Yasal sayfalar: son güncelleme tarihi ve satıcı bilgileri yapılandırmadan.
- KK-9-05 404 arama kutusu ve kategori bağlantıları içerir, HTTP 404; hata sayfası "Tekrar dene".

## 10. Demo yolu (Kapı 2 ve Kapı 3)
- KK-10-01 `AKISLAR.md` A8'deki 9 adım 390 px mobilde (hover adımları hariç) ve 1440 px masaüstünde kesintisiz, konsol hatası olmadan; ayrıca reduced-motion açıkken masaüstünde işlev kaybı olmadan tamamlanır.

## 11. Tema ve hover renk geçişi
- KK-11-01 En az 1 temalı koleksiyon sayfası ve 1 temalı ürün detayı önizlemede vardır; tema yalnız `premium-tema.md` §A3 yüzeylerini değiştirir; logo, header ve footer ana temadadır.
- KK-11-02 Kayıt defterinde olmayan `theme` anahtarı hata vermez, sayfa ana temayla render edilir.
- KK-11-03 Her temanın kontrast tablosu `docs/tasarim/` altında belgelidir ve kalite-denetcisi ölçümüyle eşleşir (KK-0-11).
- KK-11-04 Hover renk geçişi yalnız `premium-tema.md` §B2 bölgelerinde, hover cihazında fareyle veya klavye odağıyla (`:focus-visible`) tetiklenir; dokunmatikte, reduced-motion'da ve `prefers-contrast: more`'da tetiklenmez.
- KK-11-05 Geçişte değişmeyenler (logo, metin rengi, fiyat rozeti, PV, birincil düğme dolgusu, odak halkası, durum renkleri) değişmez.
- KK-11-06 Bölgeden çıkınca vurgu renkleri ana temaya döner; karttan karta geçişte titreme yok; INP ≤ 200 ms ve geçiş sırasında layout kaydı yok (Performance paneli).
- KK-11-07 Paleti olmayan ürün üzerine gelmek vurgu renklerini değiştirmez.
- KK-11-08 Temalı alanlarda da tıbbi iddia, indirim, yüzde, geri sayım yoktur; ekranda aynı anda en çok 1 sürekli dekoratif hareket.

## 12. PV sayfası
- KK-12-01 `/pv-nedir` hero, üç adım ve son çağrıyı her zaman; "Nerede görürsün" ve "Örnek sepet"i TR verisi varken gösterir.
- KK-12-02 Örnek sepet toplamları ("Toplam", "Üye fiyatıyla toplam", "Toplam PV") doğrudur.
- KK-12-03 Kazanç/ödül/kâr marjı/liderlik içeriği yalnız `#is-firsati` bölümündedir; bölüm "garanti değildir" uyarısıyla başlar ve biter; bölümdeki her rakam `businessPlan` kaynağıyla birebir aynıdır ve atıflıdır; kişisel gelir örneği ve sahte aciliyet yoktur; `businessPlan` verisi yoksa bölüm render edilmez; birincil CTA `/uye-ol`.
- KK-12-05 Ana sayfa, ürün detay, kategori, sepet, bulucu ve mega menüde kazanç/gelir/ödül içeriği yoktur (render metin taraması).
- KK-12-04 Sayfa indekslenir; `/pv` → `/pv-nedir` yönlenir.
