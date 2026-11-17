# Tasarım incelemesi 1 (K-184)

> İnceleyen: ui-tasarimci · 2026-11-17 · Ölçüt: `tasarim-kurallari.md` v1.2, `referans/REFERANS-CIKARIM.md` (K-185), bileşen spesifikasyonları.
> Yöntem: kaynağın 2026-11-17 00:15 itibarıyla geçici kopyası, `next dev` port 3206, `NEXT_PUBLIC_PREVIEW_ALL=1` (sunumun yapılacağı önizleme modu). Headless Chrome ile tam sayfa görüntüler 1440 ve 390 px'te alındı.
> Görüntüler: `docs/qa/ekran/tasarim-inceleme-1/` (`<sayfa>-1440.jpg`, `<sayfa>-390.jpg`). İncelenen sayfalar: ana sayfa `/`, kategori `/kategori/cilt-bakimi`, `/urunler`, PDP `/urun/ilife-sod-ipek-yuz-kremi`, `/pv-nedir`, `/cilt-tipine-gore`, `/blog`, çok yakında `/kvkk`.
> Kapsam dışı: `motion-v2` (hareket, ayrı inceleme), sol alttaki Next geliştirici rozeti (yalnız dev modda görünür).

## Öncelik
- **P1** onaylı veya yürürlükteki bir kuralın ihlalidir, ya da sunumda yanlış izlenim bırakır. Kullanıcıya gösterilmeden önce düzeltilmelidir.
- **P2** referans yönüne (K-185 ONAYLI, uygulaması K-186…K-189 ÖNERİ) geçiştir. Ayrıntılar devir notlarında yazılı (`devir/2026-11-17_ui-tasarimci_*_referans-dili.md`).
- **P3** cila.

**Genel değerlendirme:** Sistem disiplinli: iki etiketli fiyat, PV çipi, kontrast ve boş bağlantı yasağı her sayfada tutarlı uygulanmış. Ancak site henüz **referans dilinde değil**: beyaz zemin, açık yeşil tint ve beyaz kartlar hâkim. Bu, Pinterest referansından (derin orman zemini, toprak karolar, kâğıt katman derinliği) belirgin biçimde uzak. Kullanıcı ilk bakışta "seçtiğim referans bu mu?" diye soracaktır. Bu yüzden P2 maddeleri sunumdan önce yapılmalıdır. Sunum öncesi en az şunlar tamamlanmalı: ana sayfa hero, tanıtım karoları, footer, PV/bulucu hero'ları ve çok yakında paneli.

---

## Geliştirici A — kabuk, kart, listeleme

| # | Öncelik | Dosya / bileşen | Sorun | Olması gereken |
|---|---|---|---|---|
| A-1 | P1 | `app/(magaza)/urunler/page.tsx:28`, `app/(magaza)/kategori/[kok]/[[...alt]]/page.tsx:87` | Başlık bandının altındaki çizgi bandı **yan yana üç parça** (`grid-cols-[3fr_1.4fr_2fr]`). Bu, bandın gradyan/segment hâlidir. | §9.1: bant her zaman **üst üste üç yatay şerittir** (yeşil → lime → mavi), yan yana parça olmaz. Bu boyda `thin` (2/1/1) ya da `inline` kullan. Header'daki `grid-rows-[2px_1px_1px]` doğru örnektir. |
| A-2 | P1 | `ListingView` / sıralama "Önerilen" | Görselsiz ürünler (ör. CARICH Makyaj Temizleme Mendili, Greenleaf Pürüzsüzleştirici Yüz Kremi) kategori ve `/urunler`'in **ilk sırasında** görünüyor. Grid'in ilk satırı yaprak ikonlu boş karolarla açılıyor. | "Önerilen" sıralamada görselli ürünler önce gelmeli. Görselsizler TR grubunun sonuna gider (K-153 vitrinler için bu kuralı koymuştu, listeleme için de gerekli). |
| A-3 | P1 | Kart, LGD012 "Greenleaf Pürüzsüzleştirici Yüz Kremi" | Önizlemede **₺89.910 / üye ₺44.955** fiyatıyla sepete eklenebilir görünüyor. Veride `publishReady:false` ve fiyat şüpheli (K-103, K-219). | Fiyatı şüpheli (`price-implausible`) ürün önizlemede de fiyatsız ve sepete eklenemez olmalı (yakında kartı gibi), ya da listeden çıkarılmalı. Sahibi frontend-mimar (K-121 bayrağı), bkz. M-1. |
| A-4 | P2 | `/urunler` ve kategori başlık bandı | `bg-accent-soft` açık tint. `/urunler`'de sağ yarı boş, kategoride sağda fotoğraf var. İki sayfa farklı görünüyor. | S-066 cevabına bağlı. Önerim (b): 160–220 px **orman bandı** (`gradient.forest-hero` + grain), H1 cream-200, sağda kök rozeti veya `category.<kök>` fotoğrafı. `/urunler`'de fotoğraf yerine `SceneHeroLeaves` kırpımı. İki sayfada aynı iskelet. |
| A-5 | P2 | `components/shell/Footer.tsx` | Footer açık (surface-muted). Referans dilinin kapanış katmanı eksik. | K-189: `forest-deep` + grain, `rounded-t-panel`, metin cream-100, logo beyaz plakada, en altta imza bandı. |
| A-6 | P2 | Ürün kartı medya karosu | Radius `lg` (20). Gölge yok denecek kadar az. | Medya karosu `rounded-tile` (28), hover'da `shadow-tile`. Kart beyaz kalır, fiyat bloğu aynı kalır. |
| A-7 | P3 | Kart ızgarası (1440, `/urunler` 2. satır) | Ad 2 satır olan kartta fiyat bloğu komşularından ~40 px aşağıda kalıyor. Satır içinde fiyatlar hizalı değil. | Kart gövdesi `grid-rows-[auto_auto_1fr_auto]` (ya da `mt-auto`) ile fiyat bloğu kart dibine yaslanmalı. Ad için 2 satırlık yer zaten ayrılmış, meta satırı da sabit yükseklikte olmalı. |
| A-8 | P3 | Kategori / `/urunler` alt kategori çip şeridi | Şerit sağ kenarda sert kesiliyor (1440'ta "Göz Çevresi Bakımı" yarım). Kaydırılabilir olduğu belli değil. | Sağ kenarda 48 px zemin rengine solma (mask) + masaüstünde ok düğmesi, ya da `flex-wrap` ile 2 satır. |
| A-9 | P3 | Sayfa kapsayıcıları | Listeleme `max-w-wide` + 32 px kenar boşluğu (logo hizası) kullanıyor, ana sayfa ve PDP `container.page` (144 px) kullanıyor. Sayfalar arasında geçişte içerik sol kenarı zıplıyor. | Breadcrumb ve başlık aynı kapsayıcıda olmalı. Önerim: listeleme de `container.page`. Filtre paneliyle 3 sütun sığar, `wide` yalnız tam genişlik raylarda kullanılır (§5). |

## Geliştirici B — ana sayfa, PDP, PV, bulucu

| # | Öncelik | Dosya / bileşen | Sorun | Olması gereken |
|---|---|---|---|---|
| B-1 | P2 | `sections/home/HeroSwiper.tsx`, `HomeSlides.tsx` | Tam genişlik fotoğraf üstünde beyaz cam panel (mobilde fotoğrafın ~%70'ini kapatıyor), yeşil düğme. Referansın orman zemini + kâğıt katman + krem başlık + krem hap dili yok. | K-187 / REFERANS-CIKARIM §6: metin solda düz orman zemininde, görsel sağda (slayt 1 `SceneHeroLeaves`, 2 ve 5 yaprak kesimli çerçevede foto). H1 cream-200, CTA krem hap. Mobilde görsel üstte, metin altta. |
| B-2 | P1 | Hero alt kenarı | İmza çizgi bandı yok. Hero doğrudan beyaz bölüme kesiliyor. | §9.1: hero alt kenarında `signature` bant. |
| B-3 | P1 | Hero kontrolleri (1440 ve 390) | Oynat/durdur + noktalar kapsülü hero'nun sol alt köşesinde, mobilde metin panelinin hemen altına biniyor. Okların hizası da farklı. | Kontroller tek grup olarak metin sütununun altında ya da hero'nun sağ altında, 24 px iç boşlukla. Mobilde görsel ile metin arasında. Panel/metinle çakışma olmamalı. |
| B-4 | P2 | `sections/home/HomeTeasers.tsx` ("Greenleaf dünyası") | 5 beyaz kart, açık tint illüstrasyon zemini. Referansın en tanınır parçası (orman bandı üstünde iri toprak/yeşil karolar + yuvarlak rozetler) yok. | K-188: 3×2 karo ızgarası, orman bant zemini + `PatternLeafVeinEmboss`. Karo tonları ve rozetler devir notunda. 6. karo /hakkimizda fotoğraf karosu. |
| B-5 | P1 | Vitrin 2 "Keşfet" (Cilt Bakımı sekmesi) | İlk iki kart **görselsiz** ürün. Ana sayfanın en görünür ürün alanında boş yaprak ikonları var. K-153 kuralının ihlali. | Vitrin 2 sekmelerinde de yalnız görselli ürün (K-153'ü Vitrin 2'ye genişlet). |
| B-6 | P2 | Vitrin 1 zemini | `green-50` tint bant. | K-186 ritmi: hero (orman) → şerit (cream-50) → Vitrin 1 (beyaz) → Vitrin 2 (cream-50) → karo bandı (orman). Ardışık iki tint olmaz. |
| B-7 | P3 | Vitrin 1 rayı ve kategori şeridi (1440) | Raylarda oklar başlıktan ~70 px aşağıda ayrı bir satırda, aralarında boşluk oluşuyor. Ray sağda kapsayıcı kenarında sert kesiliyor (5. kart yarım). | Oklar başlık satırında, "Tümünü gör" bağlantısının yanında olmalı. Ray sağa doğru ekran kenarına taşmalı (`wide` içinde bleed), ya da 4 kart tam sığmalı. |
| B-8 | P2 | `sections/home/CategoryStrip.tsx` | Diskler `green-50` + ince çerçeve. Konumları doğru. | K-188 §7.3: 88/72 px `cream-50` disk + `shadow-badge`, şerit zemini cream-50. |
| B-9 | P1 | `/pv-nedir` hero | PV parasının üst yarısındaki yaprak süsü "PV" yazısının üzerine biniyor (1440 ve 390). Metin okunuyor ama süs metni kesiyor. | Süs metnin arkasında kalmalı ve metin alanına girmemeli (`z`-sırası veya süs yukarı kaydırılmalı). Kural: illüstrasyon metin taşımaz ve metni örtmez (§9.5). |
| B-10 | P2 | `/pv-nedir` "Üç adımda PV" | 3 beyaz kart. | K-188: yaprak dilimli panel (`PanelLeafSegments segments={3}`, `rounded-panel shadow-long`, içerik ortalı, ikon cream-100). Hero kısa orman hero'ya döner (§7.7). |
| B-11 | P3 | `/pv-nedir` toplam sahnesi | Toplam PV hem sol dev parada (4,2) hem sağdaki toplam kutusunda (4,2) tekrar ediyor. | Tek odak: sol para kalsın, sağdaki toplam kutusu satır listesinin altında ince bir "Toplam PV" satırı olsun. Ya da tersi. |
| B-12 | P1 | `components/finder/FinderPage.tsx:29` | `InlineStripe` başlığın üstünde, sayfanın tepesinde ortada tek başına duruyor (eyebrow yok, header'a yapışık). 1440 ve 390'da "kopmuş çizgi" gibi görünüyor. | Inline bant yalnız eyebrow'un altında kullanılır (§9.1). Ya eyebrow ekle ("Cilt tipine göre") ve bandı altına al, ya da kaldır. |
| B-13 | P2 | `/cilt-tipine-gore` | Hero illüstrasyonu (5 çapraz kart + fotoğraf + damla + yay) aynı anda çok fazla katman içeriyor. Cilt tipi seçimi hem sol panelde hem sağdaki 5 büyük kartta tekrar ediyor. | Hero §7.7 kısa orman hero'su: sağda `SceneFinderLeaves` + `BadgeDrop`, foto yok. Başlangıç durumunda sağdaki 5 kart **tek seçim yüzeyi** olur, sol panel yalnız ihtiyaç çipleri ve özet olarak kalır (ya da tersi). Aynı seçim iki kez sunulmaz. |
| B-14 | P3 | `/cilt-tipine-gore` 1440 | Sağ sütunda kartların altında ~400 px boşluk var, sol panel uzun. | İhtiyaç çipleri 2 sütuna ya da yatay `flex-wrap`'e alınmalı. Sol panel yüksekliği sağ ile dengelenmeli. |
| B-15 | P3 | PDP 1440 | Üst iki sütun `container.page`'de, "Ürün hakkında" akordeonu daha dar ve ortalı (sol kenar 336 px). Göz sol hizayı kaybediyor. | Akordeon sol sütun hizasında başlamalı (`prose` genişlik, sola yaslı) ya da "Öne çıkanlar" ile aynı genişlikte olmalı. |
| B-16 | P2 | PDP "İlgili ürünler" bandı | (Görüntüde altta) beyaz. | cream-50 bant (§7.7). Satın alma kutusu değişmez. |

## Geliştirici C — blog, haberler, çok yakında

| # | Öncelik | Dosya / bileşen | Sorun | Olması gereken |
|---|---|---|---|---|
| C-1 | P1 | `components/blog/PostCover.tsx` | 8 kapağın hepsi neredeyse aynı (açık zemin + 5 yapraklı yelpaze). Ayrıca yeşil-mavi yarı saydam **yelpaze/fan, Greenleaf işaretini taklit eder görünüyor** (§9.2 "pinwheel değildir"; yelpaze merkezden ışınsal açılırsa işaret çağrışımı güçlenir). | Kapaklar çeşitlenmeli: kâğıt katman specimen'leri (`LeafOval/Lance/Heart/SkeletonSpecimen`, farklı ton), konu ikonlu `IconBadge` ve 4 farklı zemin tonu. Işınsal yelpaze kompozisyonu kaldırılmalı. Gerçek kapak görselleri geldiğinde (blog-kapaklari notu) bunlar yedek olur. |
| C-2 | P1 | `PostCover` alt kenarı | Her kartın kapağında imza çizgi bandı var. 1440'ta bir ekranda 4–5 bant görünüyor. | §9.1: ekranda en çok **bir** signature bant. Kapaklardan kaldır, gerekirse yalnız öne çıkan yazıda `inline` kullan. |
| C-3 | P2 | `/blog`, `/haberler` başlığı | Beyaz zemin, sade başlık. | §7.7 kısa orman hero'su: H1 cream-200, `SceneBlog` (krem çizgi) + specimen yaprak + `BadgeBook`. |
| C-4 | P1 | `app/kvkk/page.tsx` (ve `/cerez-politikasi`) | Bu sayfa **mağaza kabuğunun dışında**: K-046 "yakında" sayfasının header'ını ("Ürünler / Neden Greenleaf / Üyelik", "Üye ol · Çok yakında") ve footer'ını gösteriyor. Mağaza footer'ından gelen kullanıcı başka bir siteye geçmiş gibi oluyor. | Mağaza içi yasal sayfa `/yasal/kvkk-aydinlatma-metni` zaten var. `/kvkk` ve `/cerez-politikasi` oraya **kalıcı yönlendirme** olmalı (seo-uzmani ile). Footer bağlantıları `/yasal/*`'a gitmeli. |
| C-5 | P2 | `components/coming-soon/ComingSoonPage.tsx` | Beyaz zemin, ink çizgi illüstrasyon, yeşil düğme. | §7.7: cream-50 sayfa + ortada `rounded-panel shadow-long` orman paneli, illüstrasyon `text-cream-100`, başlık cream-200, tek krem hap eylem, "Çok yakında" açık hap rozet. |
| C-6 | P3 | Yakında kabuğunun footer'ı (`/kvkk` 1440/390) | "E-posta" ve "Telefon" etiketleri ikonun altına kayıyor, rozetle aynı satırda değil. | İkon + etiket + rozet tek satırda, `items-center`. C-4 yapılınca bu footer zaten görünmez. |

## frontend-mimar

| # | Öncelik | Dosya | Sorun | Olması gereken |
|---|---|---|---|---|
| M-1 | P1 | `src/lib/catalog/*` (K-121 önizleme bayrağı) | `NEXT_PUBLIC_PREVIEW_ALL=1` yalnız `publishReady` filtresini değil, `price-implausible` korumasını da kaldırıyor (A-3). Sunum bu modda yapılacak. | Önizleme modu yalnız **Türkçe adı eksik** ürünleri açmalı. Fiyatı şüpheli ürün her modda satışa kapalı (fiyatsız, sepete eklenemez). |
| M-2 | P2 | `scripts/tokens/build-tokens.mjs` | `tokens.gradient.*` CSS değişkeni olarak yazılmıyor. | Devir notu: `2026-11-17_ui-tasarimci_frontend-mimar_tokens-v1-2.md`. |

## Uygun bulunanlar (değişmesin)
İki etiketli fiyat + yeşil üye rozeti + PV çipi her yüzeyde doğru ve kontrastlı · mobil kartta fiyat satırlarının alt alta dizilmesi · PDP satın alma kutusu sırası ve tek birincil eylem · "Çok yakında" rozetinin tutarlı kullanımı (boş bağlantı görülmedi) · header kompakt, logo beyaz zeminde · kategori ikonları (K-209) · "Yalnız Türkiye'de satışta" çipi · bulucu uyarı metni · sayfalarda iç not ("önizleme", "taslak") görülmedi (K-181).

## Sonraki adım
P1 maddeleri ve en azından B-1, B-4, A-5, C-5 (P2) bittiğinde tasarım incelemesi 2 aynı yöntemle 1440 ve 390'da tekrarlanır. Hareket (`motion-v2`) ayrıca incelenir.
