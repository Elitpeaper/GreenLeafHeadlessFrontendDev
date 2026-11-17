# Tasarım incelemesi 2 (K-184)

> İnceleyen: ui-tasarimci · 2026-11-17 · Ölçüt: `briefler/ana-sayfa-maximalist.md` v2, `tasarim-kurallari.md` v1.3, `TASARIM-INCELEME-1.md`, ONAYLI kararlar (K-036, K-062, K-182, K-186…K-189, K-230…K-234). ONAYLI kararlar yeniden tartışılmadı.
> Kanıt: geliştiricilerin görüntüleri (`ekran/home-v2/`, `A3/`, `A4/`, `B3/`, `C2/`, `motion-v3/`) + kendi koşum: kaynağın geçici kopyası (`%TEMP%\gl-review2`), `next build` + `next start -p 3210`, `NEXT_PUBLIC_PREVIEW_ALL=1`, headless Chrome (CDP). Yeni görüntüler: `docs/qa/ekran/inceleme-2/`.
> Not: `ekran/A3/*-390.png` dosyaları **boş beyaz** (6–15 KB). Mobil listeleme bu yüzden yeniden çekildi (`inceleme-2/liste-390-*`). `home-v2/home-*.png` tam sayfa görüntülerinde Vitrin 2'nin 2. satırı görünmüyor. Bunun nedeni görüntünün `M-9` giriş animasyonu tetiklenmeden alınması; gerçek kaydırmada kartlar görünüyor (`inceleme-2/home-1440-vitrin2-b.png`). Bu bir hata değil, kanıt eksiği.

Öncelikler: **P1** sunumdan önce mutlaka düzelmeli · **P2** sunumdan önce düzelmesi önerilir · **P3** cila.

## Karar özeti

| Alan | Karar |
|---|---|
| Ana sayfa v2: hero "Mühür" + giriş (K-233) | **GEÇTİ** (P2 maddeleriyle) |
| Ana sayfa v2: Dev şerit | **GEÇTİ** |
| Ana sayfa v2: Raf duvarı | **DÜZELT** (P2) |
| Ana sayfa v2: Vitrin 1 | **GEÇTİ** |
| Ana sayfa v2: Kapılar | **DÜZELT** (P2) |
| Ana sayfa v2: Vitrin 2 "Keşfet" | **DÜZELT** (P1) |
| Ana sayfa v2: Marka duvarı + footer bağlantısı | **GEÇTİ** |
| Mega menü 1440 (ilk kez görüldü) | **DÜZELT** (P1 dil hatası) |
| Tur 1 düzeltmeleri, A (kabuk/kart/listeleme) | **GEÇTİ**: A-1…A-9 kapandı |
| Tur 1 düzeltmeleri, B (PDP/PV/bulucu/üyelik) | **GEÇTİ**: B-1…B-16 kapandı, B-3 mobilde kısmen (aşağıda H-2) |
| Tur 1 düzeltmeleri, C (blog/haberler/yasal/çok yakında) | **GEÇTİ**: C-1…C-6 kapandı |
| Tur 1 düzeltmeleri, mimar (M-1) | **GEÇTİ**: LGD012 artık hiçbir yerde görünmüyor (`/api/arama?q=LGD012` → `[]`) |
| Hareket v3 (K-231, K-233) | **GEÇTİ** |
| Sıfırlanıp geri yüklenen dosyalar (`FinderApp`, `PvScene`, `Manifesto`) | **GEÇTİ**: `/cilt-tipine-gore`, `/pv-nedir`, `/hakkimizda` eksiksiz render ediliyor (B3) |

## Geliştirici B'nin bildirdiği sapmalar

| Sapma | Karar | Gerekçe |
|---|---|---|
| Masaüstünde slider kontrolleri sağ altta (brief: sol alt) | **Kabul** | Sol sütunda CTA satırıyla çakışmayı önlüyor, oklarla tek grup oluşturuyor. Tur 1 B-3 de "hero'nun sağ altı"na izin vermişti. Tek şart: slayt 4'teki çakışma giderilmeli (H-1). |
| Eyebrow logonun sağında | **Kabul** | Dikey yerden kazanç sağlıyor, H1 ve CTA 900 px'e sığıyor. Eyebrow logonun alt kenarıyla hizalı. Mobilde de okunuyor. |
| Header 166 px, hero = 100svh − 10.5rem | **Koşullu kabul** | Formül doğru. Ancak 1440 × 900'de Dev şeridin yalnız ≈ 2 px'i görünüyor. Brief §13.1'deki "Dev şeridin üst satırı görünür" ölçütü karşılanmıyor. Bkz. H-3. |
| Raf satırı 176 px (brief 168) | **Kabul** | 2 satırlık kök adları ("Ağız ve Diş Bakımı") için gerekli. |
| Mobil Cilt Bakımı karosu 120 px (brief 160) | **Kabul** | Raf duvarı mobilde zaten uzun. 120 px'te ikon ve ad dengeli duruyor. |
| Kapılarda CTA etiketi yok, yalnız ok | **Kabul** | Karonun tamamı tek `<a>`. Erişilebilir ad başlıktan geliyor ve "Çok yakında" durumunu da içermeli. |
| Dar kapı başlıkları `text-lg` | **Kısmen kabul** | Başlık boyutu uygun. Ancak gövde metni 1440'ta ≈ 15 karakterlik 5 satıra sıkışıyor. Bkz. K-1. |
| Dev şerit metni `aria-hidden` + sr-only cümle | **Kabul** | Brief §3 bunu zaten istiyor. |
| Vitrin 2'nin ilk sekmesi "Cilt Bakımı" neredeyse tamamen "Türkiye'ye yakında" | **Kabul edilmez**. Sahibi **B** (vitrin seçimi). `products.ts` sıralaması (TR önce) doğru çalışıyor. Sorun, Vitrin 1'in TR cilt ürünlerinin hepsini (8/8) alması ve tekrar yasağının (K-008) Vitrin 2'ye yalnız "yakında" ürün bırakması. Bkz. V-1. |

## Bulgular

### Ana sayfa v2: Geliştirici B

| # | Öncelik | Sahip | Yer | Sorun | Düzeltme |
|---|---|---|---|---|---|
| V-1 | **P1** | B | `TabbedShowcase.tsx` / sekme verisi | Ana sayfadaki ilk sekme (Cilt Bakımı) 7/7 "Türkiye'ye yakında". Fiyatı ve sepete ekle düğmesi olan tek bir kart bile yok. Ölçülen sekmeler: Cilt 7 ürün/7 yakında · Vücut 8/0 · Ev 8/0 · Ağız 8/4. Ayrıca 7 kart 4 sütunlu ızgarada **boş bir hücre** bırakıyor (`inceleme-2/home-1440-vitrin2-b.png`). | (1) Sekmeleri satışta olan (TR) ürün sayısına göre azalan sırala, böylece ilk sekme Vücut Bakımı olur. (2) Bir sekmenin gösterilmesi için ilk 4 kartında en az 2 TR ürünü olsun. Bu koşul sağlanmazsa sekme düşsün ya da sona gitsin. (3) Kart sayısını 4'ün katına indir (`lg`'de 4 veya 8). `md` altında mevcut 4 kart kuralı kalsın. |
| H-1 | P2 | B | `HomeHero.tsx` slayt 4 (PV) kolajı | 3. packshot çıkartması ve PV çipi kontrol hapının altında kalıyor (`inceleme-2/hero-slayt4-kontrol-cakisma.jpg`). | Kolajın alt güvenli alanını kontrol yüksekliği + 24 px olarak ayır (`bottom: calc(controls + 1.5rem)`). Çıktıyı yukarı ya da sola al. Bu kural tüm slaytlara uygulanmalı. |
| H-2 | P2 | B | Hero, 360/390 | (a) Kontroller kolajın üstüne biniyor. Brief §2.4 ve tur 1 B-3 "kolaj ile CTA arasında" diyor. (b) İlk ekranda (390 × 844, duyuru şeridi açık) Dev şerit ve kontroller ekranın dışında kalıyor. Hero ≈ 848 px. (c) "Üye ol" bağlantısı CTA'dan ≈ 40 px aşağıda yalnız duruyor. | Kontrolleri CTA'nın altına, kolajın üstüne taşı (sola yaslı, 16 px boşluk). Kolaj yüksekliğini ≈ 240 px'e indir. "Üye ol"u CTA'nın 12 px altına al ve alt çizgili yap (brief §2.3: cream-100, alt çizgili). Hedef: 390 × 844'te şeridin üst satırından ≥ 24 px görünsün. |
| H-3 | P2 | B | Hero, 1440 × 900 | Şeridin üst satırından yalnız ≈ 2 px görünüyor (kaydırma ipucu yok). | `min-h` değerini `calc(100svh − 10.5rem − 3rem)` yap. Böylece yeşil satırın ≈ 48 px'i ilk ekranda görünür. Duyuru şeridi kapatıldığında da aynı oran korunur (header yüksekliğini CSS değişkeninden oku). |
| R-1 | P2 | B | `Shelves.tsx`, 2×2 Cilt Bakımı karosu | Dekor "252" konturu "Cilt Bakımı" başlığının tam altında. Gerçek metin dekor çizgiyle üst üste biniyor (1440 ve 768: `inceleme-2/raf-252-baslik-ust-uste.jpg`). | Sayıyı karonun **sağ üstüne** taşı (başlık sol altta kalır) ya da sayıya `right-0 top-0` + karonun dışına %20 taşma ver. Başlık ve sayım satırının arkası düz zemin olmalı. |
| R-2 | P2 | B | Raf duvarı 768 | Bento 4 sütunda iki boş hücreyle bitiyor (`inceleme-2/raf-768-bosluk.jpg`). 390'da da son satırda 1 boş hücre var (P3). | `md`: son satırdaki öğeleri 2×1 yaparak satırı doldur ya da `grid-auto-flow: dense` + son öğeye `col-span` hesapla. 390'da Giyim ve Aksesuar 2×1 olsun (brief §4 "son satırda Setler 2×1 + 1 tek karo" mantığı). |
| K-1 | P2 | B | `HomeDoors.tsx` Üye ol + Haberler (`compact`), 1440 | Gövde metni ≈ 120 px genişliğe sıkışıyor. Üye ol karosunda 5 satır, ok düğmesi metne yapışık (`inceleme-2/kapilar-dar-karolar.jpg`). | `lg`'de compact karolarda gövdeyi en çok 2 satıra kırp (`line-clamp-2`) ya da gizle. Ok düğmesini başlık satırının sağına değil, karonun sağ alt köşesine sabitle ve metin sütununa `pr-14` ver. |
| K-2 | P3 | B | Kapılar sahne SVG'leri | Üye ol ve Haberler sahneleri sağ kenarda kesiliyor (hem 1440 hem 390). Kesim kasıtlı taşma gibi değil, kırpılma gibi duruyor. | Sahneyi karonun içinde 16 px pay bırakarak konumla ya da açıkça %30 dışarı taşır ve karoya `overflow: visible` ver. Yarım kalmasın. |
| V-2 | P3 | B | Vitrin 1 başlık satırı | "Tümünü gör (50)" `lg:mr-56` nedeniyle ızgaranın sağ kenarına hizalı değil. Raflar'daki "Tüm ürünler" kenarda duruyor. | Bağlantıyı ızgara kenarına hizala, specimen yaprağı bağlantının üstüne ya da arkasına (z alt) yerleştir. |
| L-1 | P3 | B | Kapılar başlığı | "Daha fazlası" 32 px kenar boşluğunda (`wide`), Raflar, Vitrin 1 ve Keşfet ise 144 px'te (`page`). Kaydırırken başlıkların sol hizası atlıyor. | Kapılar'ın başlık satırını `max-w-page`'e al. Karo ızgarası `wide`'da kalabilir. |

### Mega menü ve kabuk: Geliştirici A

| # | Öncelik | Sahip | Yer | Sorun | Düzeltme |
|---|---|---|---|---|---|
| M-1 | **P1** | A + icerik-editoru | `src/lib/ui-text/pending.tr.json:17` `megaMenu.rootTrCount` = `"{count}'i Türkiye'de"`, `:29` `listing.countWithTr` | Türkçe ek yanlış çekiliyor: mega menüde **"2'i, 3'i, 4'i, 10'i Türkiye'de"** görünüyor (doğrusu 2'si, 3'ü, 4'ü, 10'u). Bu, ana gezinmedeki en görünür metin (`inceleme-2/mega-ek-hatasi.jpg`). Liste bandı da aynı şablonu kullanıyor ("8'i" tesadüfen doğru). | Ek gerektirmeyen bir kalıba geç: `"{count} tanesi Türkiye'de"` / `"{count} ürün · {tr} tanesi Türkiye'de satışta"`. Alternatifi küçük bir `trPossessive(n)` yardımcısıdır (son okunan sayıya göre: 1 i, 2 si, 3 ü, 4 ü, 5 i, 6 sı, 7 si, 8 i, 9 u, 10 u, 20 si, 30 u, 40 ı, 50 si, 60 ı, 70 i, 80 i, 90 ı, 100 ü, 1000 i). Önerim ilki. Son metin icerik-editoru'nda. |
| M-2 | P2 | A | Mega menü "Öne çıkan" mini kart (Setler) | "₺11.000 ·" satır sonunda kalıyor, üye rozeti alt satıra düşüyor: sarkan ayraç (`inceleme-2/mega-ozellikli-kart-ayirac.jpg`). Ayrıca "Fiyat" etiketi yok, rozet "Üye ₺…" diye kısaltılmış (K-036 iki etiketli fiyat). | Ayracı kaldır, fiyatları `flex-wrap gap-x-2` ile diz. Etiketler: "Fiyat ₺11.000" + rozet "Üye fiyatı ₺5.500" (dar alanda alt alta). Ürün kartının container-query dar varyantıyla aynı düzen olsun. |
| M-3 | P3 | A | Mega menü paneli | Panelin altında sayfa karartılmıyor. Hero kontrolleri panel kenarının altından yarım görünüyor ve panel "bitmemiş" duruyor. | Panelin altına `bg-ink/30` örtü (tıklayınca kapatır) ya da panel alt kenarına `shadow-long` ekle. |
| A-10 | P3 | A | Kart, "yakında" varyantı | PV'si olmayan kartta (`pv: null`) "Fiyat … açıklanacak" notu kartın dibine iniyor, PV'li komşularda ise ortada kalıyor. Aynı satırda iki farklı hiza oluşuyor (Vitrin 2, `home-1440-vitrin2-a/b`). Beyaz packshot'lı yakında ürünlerde (paleti yok) görsel karosu beyaz kalıyor ve ürün kayboluyor. | Not satırını PV'den bağımsız sabit konumda tut (gövde ızgarasında not + PV yuvası, PV yoksa boş yükseklik). Paleti olmayan üründe karo zemini `cream-100` olsun. |
| A-11 | P3 | A | Footer PV/bulucu şeridi | Ana sayfada Kapılar'daki PV ve bulucu karolarını tekrarlıyor (K-083 önerisi: ana sayfada gizli). | Yalnız `/` rotasında gizle. |
| A-12 | P3 | A | Kanıt | `ekran/A3/*-390.png` boş. | Bir sonraki turda mobil görüntüleri `deviceScaleFactor` + `mobile: true` ve yükleme beklemesiyle yeniden al. |

### Diğer sayfalar: B ve C

| # | Öncelik | Sahip | Yer | Sorun | Düzeltme |
|---|---|---|---|---|---|
| S-1 | P2 | B + icerik-editoru | `/sertifikalar` hero | "Belgeler bu sayfada rozet olarak yer alacak; rozete tıklayınca belge PDF olarak açılır." cümlesi gelecek zamanlı bir iç not gibi okunuyor (K-181). | Örnek metin: "Greenleaf'in üretim ve kalite belgeleri. Her rozet, ilgili belgeyi PDF olarak açar." Belgeler gelene kadar rozetlerdeki "Çok yakında" yeterli. |
| S-2 | P3 | B | `/cilt-tipine-gore` | "Bu bulucu tıbbi bir değerlendirme değildir" uyarısı iki kez geçiyor (hero ve kartların altı). | Hero'dakini bırak, alttakini yalnız "Yeni bir ürünü önce küçük bir alanda dene." olarak kısalt. |

### Hareket: hareket-tasarimcisi
| # | Öncelik | Sahip | Sorun | Düzeltme |
|---|---|---|---|---|
| HR-1 | P3 | hareket | `motion-v3/olcum.json`: hover renk geçişleri `linear` eğriyle oynuyor. Çip çıkışının 4. karesinde metin zeminle neredeyse aynı tona düşüyor (≈ 60 ms). | Renk geçişlerinde `ease-out` (token `out`) kullan. Metin rengi zeminden önce dönsün (metne 120 ms, zemine 250 ms). |

## Uygun bulunanlar (değişmesin)
- Hero giriş koreografisi: logo soldan dönerek geliyor, H1 opaklıkla beliriyor. Azaltılmış harekette yalnız opaklık var (`SERI-hero-reduced-1440`). Logo çizimi değişmemiş, beyaz disk korunmuş.
- Krem başlık + krem hap CTA orman zemininde. Slayt 3'te `gold-button` var. Metin hiçbir slaytta fotoğraf üstüne gelmiyor.
- Dev şerit: üç bitişik renk, forest-950 metin, "Hikâyemiz →" gerçek bağlantı. Ekranda tek bant kuralına uyuluyor.
- Vitrin 1 hover'ı: bölge zemini, yaprak specimen'i, eyebrow çizgisi ve header bandı ürün paletine dönüyor. Fiyat, üye rozeti ve CTA sabit kalıyor (`inceleme-2/vitrin1-hover.png`).
- Fiyat bloğu, üye rozeti ve PV her kartta açık zeminde ve hizalı (A-7 kapandı). Kartlar 28 radius, beyaz.
- Listeleme orman bandı (K-230), üst üste üç şeritli bant (A-1), sarmalı çip şeridi (A-8), `container.page` hizası (A-9). 390'da taşma yok (`scrollWidth` = 360/390).
- Footer (K-189), çok yakında paneli (C-5), blog kapakları (C-1), yasal sayfa mağaza kabuğunda (C-4), PV para süsü (B-9), yaprak dilimli paneller (B-10).
- Mega menü 1440: kök ikonları, alt kategori packshot karoları, "yakında" etiketleri, öne çıkan kart ve tanıtım karosu brief K-077 ile uyumlu.

## Sonuç
P1 iki madde: **V-1** (Vitrin 2'nin ilk sekmesi tamamen satın alınamaz ürünlerden oluşuyor ve ızgarada boş hücre var) ve **M-1** (mega menüde Türkçe ek hatası). İkisi de küçük ve yerel düzeltmeler. Bunlar kapandığında önizleme kullanıcıya gösterilebilir. P2'lerin (H-1…H-3, R-1, R-2, K-1, M-2, S-1) sunumdan önce yapılması önerilir ama engel değildir. Yeniden inceleme yalnız değişen ekranlarda yapılır (ana sayfa 1440/390, mega menü).

---

## Tur 3 (2026-11-17): yalnız ana sayfa ve mega menü

> Kanıt: güncel kaynak `%TEMP%\gl-review2` kopyasına yeniden eşitlendi (src, public, data, scripts, docs/tasarim, yapılandırma). `next build` + `next start -p 3210`, `NEXT_PUBLIC_PREVIEW_ALL=1`, headless Chrome (CDP). Görüntüler sayfa baştan sona kaydırıldıktan sonra alındı (giriş animasyonları oynamış). Mega menü gerçek fare olaylarıyla açıldı. Klasör: `docs/qa/ekran/inceleme-3/`. Ölçümler: `olcum.json`, `olcum-mega.json`. Sunucu iş bitince kapatıldı.

### Kapanan maddeler

| # | Sonuç | Kanıt |
|---|---|---|
| V-1 (P1) | **Kapandı.** Sekmeler: Vücut Bakımı · Ev ve Temizlik · Ağız ve Diş Bakımı. İlk sekmenin 4/4 kartı satışta. 1440'ta 8 kart, boş hücre yok. | `home-1440.png`, `home-390.png` |
| M-1 (P1) | **Kapandı.** Tüm köklerde "N tanesi Türkiye'de". Sayfa metninde `'i/'si/'u Türkiye` kalıbı yok. | `olcum-mega.json`, `mega-*-1440.png` |
| M-2 | **Kapandı.** Öne çıkan mini kart: "Fiyat ₺11.000" + rozet "Üye fiyatı ₺5.500" + PV. Sarkan ayraç yok. | `mega-setler-1440.png` |
| M-3 | **Kapandı.** Panel altında örtü var, alttaki Dev şerit kararıyor. | `mega-cilt-bakimi-1440.png` |
| H-1 | **Kapandı.** 1440'ta 5 slaytın hiçbirinde kolaj ögesi kontrol hapının altına girmiyor. | `hero-1440-slayt2…5.png` |
| H-2a, H-2c | **Kapandı.** 360/390'da kontroller kolajın altında, CTA'dan ayrı. "Üye ol" CTA'nın hemen altında ve alt çizgili. | `home-390-ilk-ekran.png`, `hero-390-slayt*.png` |
| H-3 | **Kapandı.** 1440 × 900'de Dev şeridin 50 px'i ilk ekranda görünüyor (ölçülen `bandVisiblePx: 50`). | `home-1440-ilk-ekran.png` |
| R-1 | **Kapandı.** "252" karonun sağ üstünde. Başlığın arkası düz zemin. | `home-1440.png`, `home-768.png` |
| R-2 | **Kapandı.** 768'de bento tam satırla bitiyor (Mutfak 2×1 + Giyim 2×1). 360/390'da Giyim 2×1. | `home-768.png`, `home-390.png` |
| K-1 | **Kapandı.** Dar karolarda gövde gizli, ok sağ altta, metinle çakışmıyor. | `kapilar-1440-dar.png` |
| A-11 | **Kapandı.** Footer PV/bulucu şeridi ana sayfada yok. | `home-*.png` (footer) |
| Taşma | 360 / 390 / 768 / 1440'ta `scrollWidth` = görünüm genişliği. | `olcum.json` |

### H-2b kararı: **kabul**
390 × 844'te Dev şerit ilk ekranın 108 px altında kalıyor (360 × 780'de 172 px). Bu durum **kabul edildi**. Mobil H1 küçültülmeyecek. Gerekçeler:
1. Gerçek iOS Safari'de araç çubukları yüzünden görünen alan 844 değil, ≈ 660–750 px. Şeridi ilk ekrana sokmak için hero'yu ≈ 200 px kısaltmak gerekir. 56 px'lik H1'i 48 px'e indirmek yalnız ≈ 25 px kazandırır, bu da hedefe ulaştırmaz.
2. Mobilde kaydırma ipucunu zaten kolaj veriyor: ilk ekranın altında yarım kesilmiş fotoğraf ve PV çıkartmaları görünüyor. Yani "devamı var" sinyali mevcut.
3. H1, maximalist hero'nun (K-234) taşıyıcısı. 56 px, 360 px'te "Doğadan" kelimesini taşırmadan sığdıran en büyük değer.
Brief §13.1'deki "şeridin üst satırı görünür" ölçütü bundan sonra yalnız **≥ 1024 px** için geçerli. 768 × 1024'te şerit 27 px aşağıda kalıyor. Bu da kabul.

### Yeni ve açık kalan bulgular

| # | Öncelik | Sahip | Yer | Sorun | Düzeltme |
|---|---|---|---|---|---|
| R-3 | P2 | B | `src/components/sections/home/Shelves.tsx:94` | 1440'ta 1×1 "Hijyen ve Kâğıt Ürünleri" karosunda 3. satır ("Ürünleri") karo kenarında yarım kesiliyor (`inceleme-3/raf-1440-hijyen-kirpilma.png`). `line-clamp-2` çalışmıyor çünkü aynı öğedeki `block`, `display:-webkit-box`'ı eziyor. | (1) `size === "one"` iken başlık span'inden `block`'u kaldır. Böylece clamp güvenlik ağı olarak çalışır. (2) `LAYOUT`'a isteğe bağlı kısa karo etiketi ekle: `"hijyen-ve-kagit": { …, label: "Hijyen ve Kâğıt" }`. Bu etiket görünür metinde kullanılır, `aria-label` tam adı korur (`tileLabel`). Metin `ui.tr.json` üzerinden gelir (K-145). 24 px'te 2 satıra sığar. |
| T-1 | P3 | A + B | `ProductCard.tsx` marka satırı, mega menü öne çıkan kart, `StoryBrands.tsx` | `uppercase` + `lang="tr"` marka adlarını Türkçe büyük harfe çeviriyor: "İLİFE", "NİLRİCH", "PİNK POİNT". Bu marka yazımı yanlış. | Marka adını taşıyan öğeye `lang="en"` ver. Böylece CSS `uppercase` "ILIFE", "NILRICH", "PINK POINT" üretir. Ürün adlarına dokunma. |
| V-3 | P3 | B | Vitrin 1 başlığı, 360–768 | Dekor "50" kontur sayısı eyebrow ve H1'in ("Türkiye'de") arkasında. R-1 ile aynı sınıf bir sorun: gerçek metin dekor çizginin üstünde. | `lg` altında sayıyı gizle ya da başlık bloğunun sağına al (`right-0`), metinle kesişmesin. |
| V-2 | P3 | B | Vitrin 1 | Açık kaldı. "Tümünü gör (50)" 1440'ta ızgaranın sağ kenarına hizalı değil. | Tur 2'deki gibi. |
| L-1 | P3 | B | Kapılar | Açık kaldı. "Daha fazlası" başlığı `wide` kenarında (32 px), diğer bölüm başlıkları `page` kenarında (144 px). | Tur 2'deki gibi. |
| K-2 | P3 | B | Kapılar | Açık kaldı. Üye ol ve Haberler sahneleri sağ kenarda kırpılmış görünüyor. | Tur 2'deki gibi. |

Not: Mega menüde "1 tanesi Türkiye'de" (Sağlık ve Takviye) dil olarak doğru. Satışta ürünü olmayan kökte (Mutfak ve Gıda) ikinci parça hiç gösterilmiyor. Bu doğru davranış.

### Tur 3 sonucu
P1 madde yok. Ana sayfa ve mega menü **kullanıcıya gösterilebilir**. R-3 (P2) yarım kesik metin olduğu için sunumdan önce yapılması önerilir: iki satırlık küçük bir değişiklik. Engel değildir. P3'ler (T-1, V-3, V-2, L-1, K-2) sunumdan sonra cila turuna kalabilir. Bu tur için yeniden inceleme gerekmez. R-3 yapılırsa geliştirici 1440 Raflar görüntüsünü eklemesi yeterli.
