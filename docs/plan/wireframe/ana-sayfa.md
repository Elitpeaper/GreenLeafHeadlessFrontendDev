# Wireframe — Ana Sayfa (`/`)

> Sahip: proje-yoneticisi · Son güncelleme 2026-11-16 · Öncelik P0
> Dayanak: K-061 (ONAYLI, K-094 ile güncellenir), K-008, K-036, K-044, K-045, K-048, K-062, K-065, K-066, K-069, K-070 (ONAYLI); K-086, K-092, K-093, K-094, K-097 (ÖNERİ).
> Renk/font kararı yok; yalnız ihtiyaç ve **hareket niyeti**. Hareketin eğrisi/süresi hareket-tasarimcisi'nin, görsel dili ui-tasarimci'nin. Vitrinler **koleksiyon anahtarıyla** tanımlıdır.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | Görsellik ve animasyon birinci öncelik: her bölüme "Hareket niyeti" ve hareket bütçesi | K-070, K-097 |
| 2026-11-16 | Yeni bölümler: PV bandı (§5), Premium sahne (§6, temalı koleksiyon) | K-062, K-065, K-086, K-094 |
| 2026-11-16 | Cilt testi bandı → Cilt tipine göre bulucu bandı (§7) | K-069 |
| 2026-11-16 | Hover renk geçişi bölgeleri: header, hero ürün katmanı, Vitrin 1, Premium sahne | K-066, K-093 |
| 2026-11-16 | Duyuru metni: "Online alışveriş çok yakında" (ödeme sayfası yok) | K-068 |
| 2026-11-16 | Kartlarda PV her üründe (yakında dahil) | K-062 |
| 2026-11-16 | ui-tasarimci brief'iyle (`docs/tasarim/briefler/ana-sayfa.md`, K-083) hizalama: PV yerleşimi ve premium sahne **önizleme varyantı**; Vitrin 2 hover bölgesi; hero packshot'larında yalnız PV; marquee izinli (durdurulabilir); sürekli hareket sınırı 2 | ui-tasarimci |

> Görsel konsept ve hareket işaretleri (⟡ M-n): `docs/tasarim/briefler/ana-sayfa.md`. Bu belge yapı/veri/davranış kaynağıdır; çelişkide KARAR-KAYDI geçerlidir.

### Önizlemede kullanıcıya sunulacak plan varyantları (Kapı 2'de seçilir)
| Konu | Varyant A (plan önerisi) | Varyant B (ui-tasarimci K-083 / brief) |
|---|---|---|
| PV yerleşimi | Ayrı **PV bandı** Vitrin 1'in hemen ardından (§5); üyelik bölümünde PV yalnız 3. kart | PV sahnesi üyelik bölümünün girişi (tek bölüm, iki sahne); §5 yok |
| Premium sunumu | Ayrı **Premium sahne** bölümü (§6) | Premium set Vitrin 2 "Setler" sekmesinde premium kart varyantıyla; §6 yok |
Gerekçe A: K-062 "PV ana mesaj, ayrı bölüm" ve K-065 "premium gerçekten premium" kararlarını ana sayfada görünür kılmak. Gerekçe B: daha sakin ritim, üyelik tek bölüm. İki varyant da K-008 (tekrarsız vitrin) ve K-099'a (ana sayfada kazanç içeriği yok) uyar.

**Sayfanın tek görevi:** Ziyaretçiyi 10 saniyede "güzel, canlı, güvenilir, Türkçe bir Greenleaf mağazası" algısıyla alışverişe sokmak; portföy izleyicisine "bunu ben de istiyorum" dedirtmek.
**Birincil CTA:** Hero'daki "Alışverişe başla". Her bölümün kendi tek CTA'sı aşağıda.

**Bölüm sırası (K-094):** 0 Duyuru → 1 Header → 2 Hero → 3 Kategori şeridi → 4 Vitrin 1 (`turkiyede-satista`) → 5 PV bandı → 6 Premium sahne (koşullu) → 7 Bulucu bandı → 8 Marka mesajı + Neden Greenleaf → 9 Vitrin 2 (sekmeli) → 10 Üyelik → 11 Hikâye + sertifikalar + güven → 12 Markalar → (13 İçerik yuvası — gizli) → 14 Footer.
**Kaçınılacaklar karşılığı (MEMORY §7):** alışveriş önde (2–4 alışveriş, üyelik 10. sırada tek bölüm); vitrinler tekrarsız (4 ↔ 6 ↔ 9); sertifika kanıtlı (11); çift fiyat net (4, 6, 9, 10); PV açık ama ana sayfada kazanç/iş fırsatı içeriği yok — o yalnız `/pv-nedir#is-firsati`'da (K-085, K-099).

## Hareket ilkeleri (sayfa geneli — K-070, K-097)
1. **Ritim:** Sayfa "nefes alan" bir akışla canlanır; her bölüm görünür alana girişte **bir kez** belirir (tekrar kaydırmada yeniden oynamaz). Ekranda aynı anda en çok **2 sürekli** (ambient) dekoratif hareket (ör. hero'da packshot yüzmesi + yaprak salınımı). 5 sn'den uzun süren ambient hareket için WCAG 2.2.2 gereği durdurma yolu sağlanır: sayfa düzeyinde görünür bir "Hareketi durdur" kontrolü **veya** ambient döngülerin ≤ 5 sn sonra durması (seçim hareket-tasarimcisi'nde).
2. **Kimlik:** Hareket dili brandbook motiflerinden türer: yeşil–lime–mavi **çizgi bandı** (soldan uzama), **yaprak demeti** türevi (yavaş salınım; pinwheel kopyası değil, logo hareket etmez).
3. **Performans:** Yalnız transform/opacity; LCP öğesi (hero görseli ve H1) görünürlüğü animasyonla geciktirilmez; CLS 0; kaydırmaya bağlı animasyonlar ana iş parçacığını meşgul etmez.
4. **Erişilebilirlik:** `prefers-reduced-motion` → tüm dekoratif hareket, otomatik geçiş, parallax ve renk geçişi kapalı; içerik ilk hâlinde tam görünür. Otomatik hareket 5 sn'den uzun sürüyorsa durdurma yolu var (WCAG 2.2.2).
5. **Dokunmatik:** hover tabanlı hiçbir efekt mobilde tetiklenmez; mobil hareket yalnız görünür alana giriş ve dokunma geri bildirimi.

---

## 0. Duyuru şeridi (isteğe bağlı)
- **Amaç:** Online ödemenin henüz açık olmadığını baştan dürüstçe söylemek.
- **İçerik:** Tek satır: "Online alışveriş çok yakında. Üyelere özel fiyatlar için üye ol →".
- **Veri:** `announcement.{text, href, enabled}`.
- **Durumlar:** `enabled=false` → bölüm yok (sunucuda karar; CLS yok). Kapatılınca oturum boyunca gizli.
- **Mobil:** Tek satır, taşarsa kısaltılır.
- **Hareket niyeti:** Yok (sabit; okunabilirlik).
- **CTA:** → `/uye-ol`.

## 1. Header
Global; `BILGI-MIMARISI.md` §3.1. Ana sayfada düz header (hero üstü şeffaf varyant yok). Mikro animasyonlar ve **hover renk geçişi hedef bölgesi** (üst marka bandı, aktif gezinme çizgisi).

## 2. Hero — sayfanın gösteriş anı
- **Amaç:** İlk 3 saniyede marka algısı + alışverişe giriş.
- **İçerik:** Canlı, aydınlık AI atmosfer görseli (brandbook fotoğraf yönü: güneşli yeşil doğa; K-044) + isteğe bağlı **ürün katmanı** (1–3 resmî packshot, atmosferin önünde; ürün görünümü değiştirilmez) + başlık (≤ 8 kelime) + alt metin (≤ 20 kelime) + birincil düğme + ikincil metin bağlantısı + alt kenarda çizgi bandı.
- **Taslak metin (icerik-editoru):** "Doğadan ilham, her gün için bakım" · "Greenleaf'in cilt, saç, vücut ve ev bakım ürünleri artık Türkiye'de." · "Alışverişe başla" · "Cildine uygun ürünleri bul".
- **Veri:** `hero[]` (1–3 slayt): `image {desktop, mobile}`, `alt`, `title`, `subtitle`, `primary`, `secondary`, `products[]` (isteğe bağlı ürün katmanı; kod listesi veya koleksiyon anahtarı), `theme?` (slayt temalı koleksiyonu tanıtıyorsa).
- **Ürün katmanı kuralı:** Packshot'larda **yalnız PV çipi** gösterilir, fiyat gösterilmez (tek başına üye fiyatı yasağı + yer darlığı; ui-tasarimci brief §2). Packshot tıklanınca ürün detayı. Bu, KK-0-01'in tek istisnasıdır.
- **Durumlar:** 1 slayt → kontrol yok. Görsel yüklenemezse marka zemini + metin. Ürün katmanındaki ürün yayından kalkarsa katmandan düşer.
- **Mobil:** Ayrı dikey kırpım; metin alt üçte birde veya görselin altında; düğme tam genişlik; ürün katmanı en çok 1 packshot.
- **Hareket niyeti:**
  - Giriş koreografisi (≤ 1,2 sn toplam): görsel hafif ölçek-oturması (1,04 → 1) · başlık **yalnız transform** ile yukarı oturur (opacity animasyonu yok — LCP) · alt metin ve düğmeler kademeli belirir · çizgi bandı soldan uzar · ürün packshot'ları hafif yüzer şekilde yerine gelir.
  - Sürekli (en çok 2): yaprak demeti türevi motifin çok yavaş salınımı + packshot'ların yavaş yüzmesi; masaüstünde fare konumuna bağlı **çok hafif** derinlik (parallax ≤ 8 px) — isteğe bağlı, hareket-tasarimcisi karar verir.
  - Çoklu slayt: 6 sn otomatik geçiş, hover/odak/dokunmada durur, görünür durdur düğmesi; reduced-motion'da otomatik geçiş yok.
  - **Hover renk geçişi (K-093, önizleme varyantı):** packshot'a gelince hero yaprak motifi ürün paletine döner.
- **Performans:** Hero görseli LCP; öncelikli, boyutlu, tek ağır görsel; video bu fazda yok (K-097).
- **CTA:** "Alışverişe başla" → `/koleksiyon/turkiyede-satista`.

## 3. Kategori şeridi (görselli)
- **Amaç:** "Nereden başlayayım" cevabı; geniş katalogu göstermek.
- **İçerik:** 12 kök: **görsel** (kök görseli, mega menüyle aynı kaynak — `category.image`; yoksa ikon) + ad (+ "N ürün"). Başlık "Kategoriler".
- **Veri:** `getCategories()` → `slug, title, icon, image, productCount, order`.
- **Durumlar:** Ürünsüz kök gizli. Görsel yoksa ikonlu karo.
- **Mobil:** Yatay kaydırma, ~3,5 öğe görünür, scroll-snap.
- **Hareket niyeti:** Görünür alana girişte karolar soldan sağa kısa kademeli belirme (toplam ≤ 400 ms); hover'da görsel hafif yakınlaşma + ikon küçük sıçrama (yalnız ince işaretçi).
- **CTA:** Her öğe → `/kategori/{kok}`.

## 4. Vitrin 1 — koleksiyon `turkiyede-satista` (hover renk geçişi bölgesi)
- **Amaç:** Hemen satın alınabilir ürünler.
- **İçerik:** Başlık "Türkiye'de satışta", alt satır "Hemen sepete ekleyebileceğin ürünler", 8–12 kart rayı, "Tümünü gör (N)".
- **Kart:** sitenin tek kartı (`kategori.md` §Kart): görsel, marka, ad, hacim, "Fiyat", "Üye fiyatı" rozeti, **PV** (ipuçlu), rozetler, Sepete ekle, Favori; temalı üründe ince tema işareti.
- **Veri:** `getCollection('turkiyede-satista')`; `one-cikanlar` önce, sonra `order`.
- **Durumlar:** < 4 ürün → ızgara; 0 → gizli; yükleniyor → iskelet kartlar.
- **Mobil:** Ray, 1,15 kart; masaüstü 4 kart + oklar.
- **Hareket niyeti:** Kartlar görünür alana girişte kademeli yükselerek belirir; kart hover'ı: görsel ≤ 1,04 + gölge yükselmesi; "Sepete ekle" → "Eklendi ✓" + sayaç pop + drawer.
- **Hover renk geçişi (K-093, ui-tasarimci Z3):** karta (hover veya klavye odağı) gelince bölüm zemin tint'i, eyebrow, inline bant ve köşe yaprak motifi ürün paletine döner; bölümden çıkınca ana tema. Header bandının da değişmesi önizleme seçeneğidir (`premium-tema.md` §B2). Paleti olmayan ürün bir şey değiştirmez.
- **CTA:** "Tümünü gör" → `/koleksiyon/turkiyede-satista`.

## 5. PV bandı (K-062, K-086) — Varyant A
- **Amaç:** PV'yi sitenin ana mesajlarından biri olarak, ilk fiyatların görüldüğü yerin hemen ardından tanıtmak.
- **İçerik:** Kısa başlık (taslak: "Her üründe PV var"), tek cümle (taslak: "PV, Greenleaf ürünlerinin puan değeridir; üye olarak alışveriş yaptığında hesabında görünür."), **canlı örnek**: Vitrin 1'de görünmeyen bir TR ürününün küçük kartı veya Vitrin 1'in ilk ürününün PV'si büyük tipografiyle ("PV 3"), bağlantı.
- **Veri:** icerik-editoru metni (S-026 sonrası kesinleşir); örnek ürün `collections: pv-ornek` yoksa Vitrin 1 ilk ürünü (kart tekrarına girmez: yalnız PV değeri ve ad gösterilir, kart değil).
- **Durumlar:** TR ürünü yoksa örnek kısmı gizli, metin + bağlantı kalır.
- **Mobil:** Tek sütun, büyük PV rakamı üstte.
- **Hareket niyeti:** PV rakamı görünür alana girişte 0'dan değere sayar (≤ 800 ms, bir kez); yanında yaprak/çizgi motifi kısa çizim animasyonu. Reduced-motion'da sabit değer.
- **Dil:** Bantta kazanç/gelir/ödül içeriği yok (K-099); PV puan değeri ve birikimi olarak anlatılır.
- **CTA:** "PV nedir?" → `/pv-nedir`.

## 6. Premium sahne — temalı koleksiyon (koşullu; K-065, K-092) — Varyant A
- **Amaç:** Premium ürün/set kimliğini (ör. altın temalı set) tam sahne olarak göstermek; portföy izleyicisi için en güçlü "vay" anı.
- **İçerik:** Tam genişlik temalı bölüm: koleksiyon adı, 1–2 cümle hikâye, `heroImage`, 2–4 ürün/set kartı, süsleme SVG'leri. Tema `wireframe/premium-tema.md` §A.
- **Veri:** `homePremium.collectionKey` (yapılandırma; S-029) → koleksiyon `theme`, `heroImage`, üyeler. **Vitrin 1'de görünen ürünler burada tekrar etmez** (çakışan ürün bu sahneden düşer; sahne < 2 ürüne inerse yalnız 1 büyük kart + koleksiyon bağlantısı).
- **Durumlar:** Yapılandırma yok veya tema kayıt defterinde yok → bölüm gizli.
- **Mobil:** Görsel üstte (≤ 60 vh), kartlar yatay ray.
- **Hareket niyeti:** Bölüme girişte tema zemininin perde gibi açılması (clip/transform), süslemelerin çizilerek belirmesi, bir kez ve kısa (≤ 1 sn); altın vb. temada tek bir ışık süpürmesi (sürekli değil). Sürekli hareket sınırı (en çok 2) korunur.
- **Hover renk geçişi (K-093):** kartlar ürün paletini header'a ve sahne süslemelerine taşır.
- **CTA:** "Koleksiyonu keşfet" → `/koleksiyon/{anahtar}`.

## 7. Cilt tipine göre bulucu bandı (K-069)
- **Amaç:** Farklılaştırıcıyı erkenden göstermek.
- **İçerik:** Başlık (taslak: "Cildine uygun ürünleri bul"), **5 cilt tipi çipi doğrudan bantta** (Kuru, Yağlı, Karma, Normal, Hassas) — çipe tıklamak bulucuyu o tiple açar; kısa madde: "Kayıt gerekmez".
- **Veri:** Statik metin + `finder.enabled`.
- **Durumlar:** `finder.enabled=false` → gizli.
- **Mobil:** Çipler 2 satıra sarılır, ≥ 44 px.
- **Hareket niyeti:** Çipler kademeli belirir; hover'da çip hafif yükselir; doku karoları (ui-tasarimci brief §5) görünür alana girince bir kez yelpaze gibi açılır; sürekli hareket yok.
- **CTA:** Her çip → `/cilt-tipine-gore?tip={tip}`; bant geneli "Bulucuyu aç" → `/cilt-tipine-gore`. (Tek eylem türü: tip seçmek.)

## 8. Marka mesajı + "Neden Greenleaf"
- **Amaç:** Greenleaf'i tanımayana kim olduğunu anlatmak (Çin merkezli, Suzhou; "Rus markası" denmez).
- **İçerik:** Kısa manifesto + 3–4 kanıtlanabilir madde ikonla; belgeye dayananlar `certificates` verisine bağlı.
- **Durumlar:** Doğrulanmamış madde yok; < 2 madde → yalnız manifesto.
- **Mobil:** 2×2 veya tek sütun.
- **Hareket niyeti:** Manifesto satır satır belirir (maske ile; reduced-motion'da düz metin); ikonlar çizgiyle çizilir (bir kez).
- **CTA:** "Hikâyemiz" → `/hakkimizda`.

## 9. Vitrin 2 — sekmeli (tekrarsız)
- **Amaç:** Katalog genişliği (yakında ürünler dahil olabilir).
- **İçerik:** 3–4 kök sekmesi; her sekmede 8 kart; "Tümünü gör".
- **Veri:** `homeTabs[] = {categorySlug, collectionKey?}`; `one-cikanlar` ∩ kategori, boşsa TR önce ilk 8. **Vitrin 1 ve Premium sahnedeki ürünler burada yok** (K-008).
- **Durumlar:** Sekmede < 4 ürün → sekme gizli; hepsi gizliyse bölüm gizli.
- **Mobil:** Çip sekmeler; ray 1,15 kart.
- **Hareket niyeti:** Sekme göstergesi kayar; içerik çapraz geçiş (≤ 200 ms).
- **Hover renk geçişi:** Vitrin 1 ile aynı kural (ui-tasarimci Z3). Varyant B'de "Setler" sekmesindeki premium set kartı altın palete geçişin göründüğü yerdir.
- Bantlar/yamalar ve diğer sağlık ürünleri alt kategorileri sekmeye ve vitrine alınmaz (K-095).
- **CTA:** "Tüm {Kategori} ürünleri" → `/kategori/{kok}`.

## 10. Üyelik bölümü (tek ve şık)
- **Amaç:** Üyeliği "indirimli alışveriş" avantajı olarak anlatmak (K-099: ana sayfada kazanç içeriği yok).
- **İçerik:** Başlık "Üye ol, üyelere özel fiyatla al"; 3 kart: (1) Üye fiyatı — örnek TR ürününde iki etiketli fiyat + PV; (2) Kolay kayıt — 3 adım; (3) PV — "Alışverişlerinin PV'si hesabında" + `/pv-nedir` metin bağlantısı. Tek düğme.
- **Veri:** `collections: uyelik-ornek` (yoksa Vitrin 1 ilk ürünü — yalnız fiyat satırı, kart tekrarı değil).
- **Mobil:** Kartlar alt alta; düğme tam genişlik.
- **Hareket niyeti:** Koyu panel (sayfadaki tek koyu panel) görünür alana girerken hafif ölçek-oturma; alt kenar çizgi bandı uzar.
- **CTA:** "Üye olmayı öğren" → `/uye-ol`.

## 11. Hikâye + sertifikalar + güven
- **İçerik:** Fabrika/marka hikâyesi + görsel; sertifika rozet şeridi (ISO 22716, GMP, Helal → PDF); güven şeridi yalnız doğrulanabilir maddeler; kargo/iade vaadi yok.
- **Veri:** `certificates[]`, satıcı yapılandırması.
- **Durumlar:** PDF'siz rozet görünmez; belge yoksa yalnız hikâye.
- **Mobil:** Hikâye üstte, rozetler tek satır.
- **Hareket niyeti:** Görselde kaydırmaya bağlı çok hafif parallax (≤ 24 px; reduced-motion'da yok); rozetler odak/hover'da hafif kalkma.
- **CTA:** "Tüm sertifikalar" → `/sertifikalar`.

## 12. Markalar
- **İçerik:** Alt marka logo/adları (en çok 10), sıra TR ürün sayısı.
- **Durumlar:** Logo yoksa tipografik ad; < 3 marka → gizli.
- **Mobil:** Yatay kaydırma.
- **Hareket niyeti:** Yavaş kayan şerit (marquee) izinlidir (ui-tasarimci brief §10): hover/odakta durur, görünür durdur düğmesi vardır, reduced-motion'da statik ızgara. Logolar tek tonlu gösterilecekse bu yalnız **alt marka** logoları içindir; Greenleaf logosu hiçbir koşulda tonlanmaz.
- **CTA:** Her marka → `/arama?marka={slug}`.

## 13. İçerik yuvası (gizli)
Rehber gelene kadar render edilmez.

## 14. Footer
Global; `BILGI-MIMARISI.md` §3.5 (mikro animasyonlar dahil).

---

## Sayfa düzeyi gereksinimler
- **Performans (K-097):** LCP = hero görseli; ilk ekranda tek ağır görsel; ilk ekran aktarımı ≤ 500 KB; sayfa toplamı ≤ 1,6 MB (tüm bölümler kaydırılınca); hero dışı görseller tembel; animasyon için ek JS kütüphanesi kullanılırsa ≤ 25 KB (sıkıştırılmış) ve ilk yüklemeyi bloklamaz.
- **SEO:** Tek H1 = hero başlığı (çoklu slaytta yalnız ilk slaytın başlığı H1).
- **En kötü hâl:** Hero + kategori şeridi + Vitrin 1 + PV bandı (metin) + üyelik + footer her zaman render edilir; diğerleri koşullu.
- **Analitik:** `hero_cta_click`, `category_strip_click`, `collection_view_all`, `pv_band_click`, `premium_scene_click`, `finder_banner_click` (tip), `membership_section_click`, `certificate_pdf_open`.
