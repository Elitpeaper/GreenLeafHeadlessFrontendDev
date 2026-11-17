# Brief — Ana sayfa (görsel konsept)

> **GEÇERSİZ (2026-11-17):** yerini `ana-sayfa-maximalist.md` (K-233/K-234) aldı. Bu dosya yalnız tarihçe içindir.

> ui-tasarimci · v1 · 2026-11-16 · Kod içi tasarım (K-043): bu brief, frontend-gelistirici ile hareket-tasarimcisi'nin önizlemeyi kurması içindir.
> Dayanak: K-061 sırası (Kapı 1'de onaylandı), K-062 (PV ana mesaj), K-064, K-066, K-070 (görsellik ve animasyon birinci öncelik), K-044. Yapı ve veri `docs/plan/wireframe/ana-sayfa.md`'dedir; çelişkide KARAR-KAYDI geçerlidir.
> Hareket yalnız **işaretlenir** (⟡ M-n). Zamanlama hareket-tasarimcisi'ndedir. Tüm ⟡ noktaları reduced-motion açıkken statik olur.

## Konsept: "Güneşte yaprak, üç renkli şerit"
Sayfa, brandbook kapağını dijitale taşır: **beyaz zemin, güneşli canlı yaprak fotoğrafı, yeşil-lime-mavi çizgi bandı**. Bantlar bölümler arasında yapısal bir iplik gibi akar ve kaydırdıkça "çizilir". Hareket iki yerde yoğunlaşır: hero ve vitrinler (ürün). Geri kalan bölümler sakin ve okunur kalır. Rakip siteleri kalabalık banner'lar ve koyu yeşil-altın şablon olarak tanımlarsak bizim farkımız: ferah, ışıklı, net fiyatlı ve tek bir imza motifli bir sayfa.

**Ritim haritası** (zemin): beyaz → beyaz → **tint vitrin** → **blue-50 bant** → beyaz → beyaz → **lime-50/beyaz PV + koyu üyelik** → beyaz → surface-muted footer. Ardışık iki tint bölüm yoktur.

---

## 0. Duyuru şeridi (isteğe bağlı)
blue-50, 40 px, tek satır: "Online ödeme çok yakında · Üyelere özel fiyatlar için üye ol →". Hareket yoktur.

## 1. Header
`bilesenler/header.md`. Thin bant ⟡ M-1 (ilk yüklemede çizilir).

## 2. Hero — "Işık"
- **Düzen (masaüstü):** `container.wide`, 12 sütun. Sağ 7 sütun atmosfer fotoğrafıdır (`home.hero.1–3`, K-102): ters ışıkta taze yapraklar, su damlaları, mavi gökyüzü aksanı (kurallar §8.2). Görsel radius lg'dir; **sol alt köşe 2xl yaprak kesimlidir**. Sol 5 sütun **beyaz metin panelidir** ve görselin üstüne ~64 px taşar (görsel üstüne yazı yok; kart gölge `lift`):
  - eyebrow (Comfortaa 700, `--accent-text`): "Greenleaf artık Türkiye'de"
  - H1 `display` (Jost 600): "Doğadan ilham, her gün için bakım" (icerik-editoru)
  - lead (lg, ink-muted): 1 cümle
  - Birincil "Alışverişe başla" (56 px) + ikincil metin bağlantısı "Cildine uygun ürünü bul →"
  - Güven mikro satırı (xs ink-muted, ikonlu): "Orijinal Greenleaf ürünleri · ISO 22716 ve GMP belgeli üretim" (yalnız doğrulanmış maddeler)
- **Yüzen packshot'lar:** görselin üstünde 2–3 resmî ürün görseli (gerçek TR ürünleri, `--accent-soft` daire zeminli, gölge `card`). Her birinde küçük PV çipi bulunur (PV ana mesaj; fiyat yoktur çünkü tek başına üye fiyatı gösterilmez ve fiyat çifti için yer yoktur). Tıklanınca ürün detayına gidilir.
- **LeafCluster:** metin panelinin sol üstünden taşar (%70 opaklık).
- **Alt kenar:** tam genişlik **signature bant**.
- **Mobil:** görsel üstte, 4:5 dikey kırpım. Metin paneli görselin alt %15'ine taşan beyaz kart olarak durur. Düğme tam genişliktir. Packshot'lardan yalnız 1–2 tanesi görünür (küçük).
- **LCP:** hero görseli öncelikli yüklenir. H1 opaklık animasyonuyla gizlenmez.
- ⟡ M-2 hero giriş koreografisi (panel → H1 → CTA kademeli; görsel hafif ölçek-in) · ⟡ M-3 packshot'ların yavaş yüzmesi (ambient) · ⟡ M-4 kaydırmada görselin hafif paralaksı · ⟡ M-5 signature bandın soldan çizilmesi · ⟡ M-6 LeafCluster salınımı. Çoklu slayt varsa autoplay, durdur düğmesi ve hover'da durma (wireframe).

## 3. Kategori şeridi — "Raflar"
- Başlık satırı: eyebrow + inline bant + H2 "Kategoriler" + sağda "Tüm kategoriler" (mega menüyü açar).
- 12 kök, **yuvarlak görsel karolar** (112 px masaüstü / 88 px mobil): kategori kompozisyonu (`--accent-soft` zemin üzerinde packshot'lar) + altında ad (sm 500) + "N ürün" (xs). Görsel yoksa duotone ikon gösterilir.
- Masaüstünde tek satıra sığmazsa (12 × 112) yatay ray ve oklar kullanılır. Mobilde scroll-snap ile 4,5 öğe görünür.
- Hover (ince işaretçi): karo çevresinde 3 renkli ince halka (`--stripe-*` konik dilimler) belirir, görsel hafif yükselir.
- ⟡ M-7 karoların kademeli girişi · ⟡ M-8 hover halkasının çizilmesi.

## 4. Vitrin 1 — "Türkiye'de satışta" (RecolorZone Z3)
- **Zemin:** `--accent-soft` (varsayılan green-50) tam genişlik bant, üst ve alt kenarı düz. Bölüm köşesinde büyük LeafCluster bulunur (`--accent-decor`).
- Başlık: eyebrow "Hemen sepete" + H2 "Türkiye'de satışta" + "Tümünü gör (N) →". Masaüstünde sağda ray okları (48 px yuvarlak, beyaz, gölge card).
- Ray: standart ürün kartları, masaüstünde 4 görünür, mobilde 1,25.
- **Hover-recolor:** paleti olan bir karta gelince bölüm zemini, eyebrow, inline bant ve LeafCluster ürün renklerine yumuşakça döner (`hover-recolor.md`). "Vitrin anı" budur.
- ⟡ M-9 kartların kademeli girişi · ⟡ M-10 ray kaydırma (scroll-snap + ok) · ⟡ M-11 hover-recolor · ⟡ M-12 sepete ekle → "Eklendi" + sayaç + drawer.

## 5. Cilt testi bandı — "Mavi blok"
- **Zemin:** blue-50 (brandbook: mavi = blok zemini), `section-tight`. Sol: H2 "Cildine uygun ürünü 1 dakikada bul" + 3 madde (ikon + sm) + birincil "Teste başla". Sağ: 5 cilt tipi **doku karosu** illüstrasyonu (yaprak metaforları, `skin-finder.md` §1) yelpaze gibi üst üste dizilir, aralarında brand-blue LeafCluster bulunur.
- Bandın üst kenarında inline bant ortalanır.
- Mobilde illüstrasyon üstte (yatay sıra, kırpılmış), metin altta yer alır.
- ⟡ M-13 doku karolarının yelpaze gibi açılması (görünür alana girince bir kez) · ⟡ M-14 maddelerin kademeli belirmesi.

## 6. Marka mesajı + Neden Greenleaf — "Manifesto"
- Beyaz zemin, ortalanmış. **Büyük alıntı:** Comfortaa 700, `3xl`, ink, 2–3 satır (icerik-editoru; Suzhou merkezli Çin firması, doğaya saygı, kalite). Alıntının arkasında çok soluk dev yaprak silüeti bulunur (%6).
- Altında 3–4 kanıt maddesi: 64 px duotone ikon + başlık (xl 600) + 1 cümle. Masaüstünde 4 sütun, mobilde 2 × 2.
- "Hikâyemiz →" metin bağlantısı.
- ⟡ M-15 alıntının kelime kelime belirmesi (yalnız opacity/transform, 1 kez) · ⟡ M-16 ikonların çizgi çizimi.

## 7. Vitrin 2 — "Keşfet" (sekmeli, RecolorZone Z3)
- Beyaz zemin (Vitrin 1'den ayrışır). Sekmeler pill çipler halindedir: seçili sekme `--accent` (dolu) + `--on-accent`. Gösterge kayar.
- Ray veya 4'lü ızgara (8 kart). Yakında ürünler kart varyantıyla burada görünebilir (rozet + PV).
- Setler sekmesinde premium set varsa **premium kart varyantı** gösterilir ve hover-recolor altın palete döner (gold sinyali burada belirir).
- ⟡ M-17 sekme göstergesinin kayması + içerik çapraz geçişi · ⟡ M-11 (hover-recolor).

## 8. PV + Üyelik — tek bölüm, iki sahne (ÖNERİ K-083)
K-061'de üyelik tek bölümdür. K-062 PV'yi ana mesaj yaptı. Öneri: PV'yi üyeliğin **girişi** olarak aynı bölümde göstermek. Böylece sayfada ikinci bir "üyelik benzeri" bölüm oluşmaz.
- **8a PV sahnesi (beyaz → lime-50 geçişli zemin):** solda büyük PV çipi (`mega` rakam + "PV"), H2 "Her ürünün bir puan değeri var: PV", K-060 cümlesi, "PV nedir? →". Sağda 3 mini ürün kartı yer alır, PV çipleri bir "Toplam PV" kutusuna akar (`pv-explainer.md` §3).
- **8b Üyelik paneli (sayfadaki tek koyu panel):** `--accent-deep` (green-900), radius xl, `container.page` içinde. Başlık beyaz, vurgu kelimesi lime-200 (7.65). 3 kart (beyaz, radius lg): (1) **"Üye fiyatı"**: gerçek bir TR ürününün iki etiketli fiyatı + PV (fiyat açık kart içinde, rozet yeşil) · (2) "Kolay kayıt": 3 numaralı adım · (3) "Cilt testi". Tek birincil düğme koyu zemin varyantıdır (`onDark`): **beyaz zemin + green-900 metin** (10.87) "Üye olmayı öğren". green-700 düğme green-900 panelde ayrışmadığı için birincil düğme değişmezliğinin tek istisnası budur. v0'daki lime düğme seçeneği önizlemede alternatif olarak sunulur. Panelin alt kenarında signature bant bulunur. Kazanç dili yoktur.
- ⟡ M-18 PV çiplerinin toplam kutusuna akışı (1 kez) · ⟡ M-19 toplam sayısının sayımı · ⟡ M-20 panelin hafif ölçek-in girişi + bant çizimi.

## 9. Hikâye + sertifikalar + güven
- İki sütun: solda resmî fabrika/marka görseli (radius lg, tek köşe 2xl yaprak kesimi), sağda kısa hikâye + "Hikâyemiz".
- Altında **sertifika rozet satırı:** 3 rozet (ISO 22716, GMP, Helal), her biri 96 px beyaz yuvarlak kart, ince `line` çerçeve. Altında "PDF ↗" etiketi bulunur. Tıklanınca PDF açılır (K-045, K-058).
- Güven şeridi (yalnız doğrulanabilir maddeler): 3 ikonlu madde, surface-muted ince bant.
- ⟡ M-21 rozetlerin hover/odakta kalkması · ⟡ M-22 görselin kaydırmada hafif paralaksı.

## 10. Markalar
- Alt marka logoları tek tonda (ink %70), hover'da tam renk alır. Logo yoksa tutarlı tipografik marka adı (Jost 600, 0.08em) gösterilir.
- **Yavaş kayan şerit (marquee)** iki sıra halinde, ters yönde. Hover/odakta durur, durdur düğmesi bulunur. Reduced-motion açıkken statik ve sarmalı ızgara olur.
- ⟡ M-23 marquee.

## 11. İçerik yuvası — gizli (veri yoksa render edilmez)

## 12. Footer
`bilesenler/footer.md`. Footer [A] PV şeridi ana sayfada gizlenir (8a ile tekrar).

---

## Kabul (görsel)
- İlk ekranda (1440 × 900 ve 390 × 844): logo, H1, birincil CTA ve en az bir ürün packshot'ı görünür. Görsel üstünde scrim'siz metin yoktur.
- Sayfada tek koyu panel (8b) ve signature bant ekran başına en fazla 1 bulunur.
- Her ürün yüzeyinde Fiyat + Üye fiyatı + PV birlikte durur (hero packshot'larında yalnız PV; gerekçe yukarıda).
- Reduced-motion ile tüm ⟡ noktaları statiktir ve içerik eksiksiz görünür.
- LCP ≤ 2,5 sn (hero görseli), CLS ≤ 0,1 (iskeletler ve sabit oranlar).

## Kullanıcının önizlemede seçeceği varyantlar
1. Font: `?font=jost|poppins|comfortaa`.
2. Hero: tek görsel ya da 3 slayt.
3. Vitrin 1 zemini: tint bant (öneri) ya da beyaz.
4. 8b üyelik düğmesi: beyaz zemin (öneri) ya da lime-200.
5. Hover-recolor reduced-motion davranışı: devre dışı (öneri) ya da anlık.
