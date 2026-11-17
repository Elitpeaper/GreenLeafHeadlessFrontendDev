# Wireframe — PV Nedir? (`/pv-nedir`) + PV gösterim bileşenleri

> Sahip: proje-yoneticisi · 2026-11-16 · Öncelik P0
> Dayanak: K-062 (PV tüm ürünlerde, ayrı bölüm/sayfa, ana mesaj — ONAYLI), **K-085 (kazanç/iş fırsatı içeriği sitede yer alır, K-015 İPTAL — ONAYLI)**, K-098, K-086, K-099 (ÖNERİ) · ui-tasarimci `bilesenler/pv-explainer.md` (K-080) · kaynak metin `docs/arastirma/pv-resmi-kaynak.md`.
> Metinler taslaktır; nihai metin icerik-editoru'nündür. Rakamlar yalnız resmî Greenleaf pazarlama planından, birebir ve atıflı.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | İlk sürüm | K-062, K-086 |
| 2026-11-16 | Kullanıcı K-085: kazanç içeriği serbest → yeni §B6 "Greenleaf iş fırsatı" bölümü (atıf + garanti değildir uyarısı); "ne sağlar" bölümü resmî kaynakla dolduruldu | K-085, K-099 |

**Sayfanın tek görevi:** "PV ne demek, bana ne sağlar?" sorusunu cevaplayıp kişiyi üyeliğe yönlendirmek; isteyene Greenleaf iş fırsatını dürüstçe göstermek.
**Birincil CTA:** "Üye ol" → `/uye-ol`.
**Dil kuralı:** Sayfanın üst yarısı (§1–§5) alışveriş odaklı: PV = "puan değeri", üye fiyatı, puan birikimi. Kazanç/gelir/ödül/kâr marjı/liderlik içeriği **yalnız §B6 "Greenleaf iş fırsatı" bölümünde**; orada her rakam kaynak atıflı ve bölüm "garanti değildir" uyarısıyla başlar ve biter (K-085, K-099). Sahte aciliyet, "hemen zengin ol" türü vaat, gelir örneği ("ayda ₺X kazandı") yok.

---

## A. PV gösterim bileşenleri (sitenin her yerinde aynı)

### A1. PV etiketi
- **Biçim:** "PV 0,5" (Türkçe ondalık virgül; tam sayıda "PV 3"). Küçük, fiyatın altında veya yanında; fiyatla yarışmaz.
- **İpucu düğmesi (ⓘ):** etiketin yanında; tıklama/dokunma/odakla açılır, Esc veya dışarı dokunma kapatır. İçerik: tek cümle tanım (K-060 taslağı: "PV, Greenleaf üyelerinin alışverişlerinde hesaplanan puan değeridir.") + "PV nedir? →" bağlantısı (`/pv-nedir`).
- **Yakında üründe:** aynı etiket + ipucuna ek satır "Türkiye'de satışa çıktığında değişebilir." (K-098).
- **Veri:** `pv` (TR: panel `points/100`; yakında: RU `pointsRu/100`). `pv` boşsa etiket ve ipucu **render edilmez**.
- **Nerede:** ürün kartı, ürün detay satın alma kutusu, mobil yapışkan çubuk (yer kalırsa), arama paneli ürün satırı, sepet satırı + "Toplam PV", bulucu kartları + rutin toplamı, mega menü öne çıkan kartları, üye ol fiyat örneği, PV sayfası örneği.
- **Erişilebilirlik:** Ekran okuyucu "PV 0,5, puan değeri" okur; ipucu `aria-describedby`/disclosure semantiği; dokunma hedefi ≥ 44 px (görsel küçük olsa da).

### A2. Toplam PV
- Sepet ve bulucu rutin özetinde: "Toplam PV 2,4" (ipuçlu). Hesap: satır PV × adet toplamı; yakında ürünler toplama girmez (sepete zaten giremez).

---

## B. `/pv-nedir` sayfası

**Bölüm sırası:** 1 Hero → 2 Üç adımda PV → 3 Nerede görürsün (gerçek kart örneği) → 4 Örnek sepet → 5 PV üyelere ne sağlar → 6 Greenleaf iş fırsatı (`#is-firsati`) → 7 SSS → 8 Son çağrı → Footer.

### 1. Hero
- **İçerik:** H1 "PV nedir?" · alt metin (≤ 25 kelime) taslak: "PV, her Greenleaf ürününün puan değeridir. Üye olarak alışveriş yaptığında ürünlerin PV'si hesabında görünür." · birincil "Üye ol" · ikincil metin bağlantısı "Ürünlerde PV'yi gör" (`/koleksiyon/turkiyede-satista`).
- **Görsel:** Marka motifli soyut kompozisyon (pinwheel kopyası değil; çizgi bandı + yaprak demeti türevi) veya AI atmosfer; ana sayfa PV bandıyla aynı görsel dil.
- **Hareket:** Büyük "PV" tipografisi/rakam sayacı hafif girişle (sayaç 0'dan örnek değere ≤ 800 ms; reduced-motion'da sabit).
- **Mobil:** Metin üstte, düğme tam genişlik, görsel küçük.

### 2. Üç adımda PV
- 3 kart, ikonlu: (1) "Her ürünün bir PV değeri var" — kart ve ürün sayfasında görünür. (2) "Üye olarak alışveriş yap" — üye fiyatıyla. (3) "PV'lerin birikir" — Greenleaf hesabında toplanır, silinmez.
- **Veri:** icerik-editoru metni.
- **Mobil:** Dikey liste; numaralar kaydırmada sırayla belirir.

### 3. Nerede görürsün
- Gerçek bir TR ürün kartı (canlı veri, `collections: pv-ornek` yoksa `turkiyede-satista` ilk ürünü), PV etiketine işaret eden açıklama oku/etiketi. Kart tıklanabilir (detaya).
- **Durum:** TR ürünü yoksa bölüm gizli.

### 4. Örnek sepet
- 3 TR ürünlük statik örnek (veriden): satırlar + "Toplam ₺X · Üye fiyatıyla toplam ₺Y · Toplam PV Z". Tasarruf/yüzde yok.
- **Veri:** `collections: pv-ornek-sepet` (EL, 3 kod) yoksa `turkiyede-satista` ilk 3.
- **Durum:** < 3 TR ürünü varsa bölüm gizli.

### 5. PV üyelere ne sağlar
- 3–4 madde (kaynak: `docs/arastirma/pv-resmi-kaynak.md`): üye fiyatıyla alışveriş (müşteri fiyatının yarısı — veriyle tutarlı) · puanlar birikir ve silinmez · birikim kademeli olarak üst seviyelere geçiş hakkı verir · zorunlu aylık alışveriş yok. Türkiye koşullarıyla teyit edilmeyen madde (ör. "kalifikasyon onayı gerekmez") icerik-editoru teyidi olmadan yayına girmez.
- Altında küçük atıf: "Kaynak: Greenleaf pazarlama planı."

### 6. Greenleaf iş fırsatı (`#is-firsati`) — K-085, K-099
- **Amaç:** Kullanıcının onayladığı kazanç içeriğini (12 tür ödül, partner kâr marjı, kâr paylaşımı, liderlik seviyeleri) şeffaf ve atıflı biçimde sunmak.
- **Konum gerekçesi:** Sayfanın alt yarısında, alışveriş anlatımından sonra; MEMORY §7 "ana sayfa gelir vaadiyle dolu" hatasını tekrarlamamak için bu içerik sitede **yalnız burada** (bkz. K-099).
- **İçerik:** (a) Bölüm başı uyarı kutusu (taslak): "Aşağıdaki bilgiler Greenleaf pazarlama planından alınmıştır. Kazanç kişisel çalışmaya bağlıdır ve garanti değildir." (b) 12 ödül türü — kısa liste/ızgara (ad + 1 cümle); (c) partner fiyatı / kâr marjı açıklaması (oran resmî kaynaktaki gibi, atıflı); (d) kâr paylaşımı; (e) liderlik seviyeleri — basamak görseli (seviye adı + resmî eşik, varsa); (f) bölüm sonu aynı uyarı + "Türkiye'ye özgü koşullar farklıysa bu bölüm güncellenir." notu.
- **Veri:** icerik-editoru'nün resmî pazarlama planından hazırladığı yapılandırılmış metin (`businessPlan`: ödüller[], seviyeler[], kaynak, sonGüncelleme). Kaynakta olmayan rakam yazılmaz.
- **Durumlar:** `businessPlan` yoksa bölüm render edilmez (sayfa §5'te biter). Rakamı doğrulanmamış madde render edilmez.
- **Mobil:** Akordeon gruplar (Ödüller · Kâr marjı · Kâr paylaşımı · Seviyeler); uyarı kutusu her zaman açık.
- **Hareket niyeti:** Seviye basamakları görünür alana girince bir kez sırayla belirir; sayaç/geri sayım yok.
- **CTA:** Bölüm kendi düğmesini taşımaz; sayfanın tek CTA'sı §8 "Üye ol".
- **Yasal:** Yayın öncesi uzman kontrolü önerilir (K-085); doğrudan satış/tüketici mevzuatı açısından icerik-editoru işaretler.

### 7. SSS
- Akordeon, 4–6 soru (taslak): "PV para mıdır?" ("Hayır, puan değeridir; ödeme aracı değildir.") · "Üye olmadan PV birikir mi?" (resmî kaynağa göre) · "PV'mi nerede görürüm?" · "Türkiye'ye yakında ürünlerdeki PV kesin mi?" (K-098 notu) · "Sorum olursa kime ulaşırım?" (satıcı iletişim).

### 8. Son çağrı
- Kısa başlık + birincil "Üye ol" (→ `/uye-ol`; bu sayfadaki ikinci tekrarı, aynı eylem).

### Sayfa düzeyi
- **SEO:** İndekslenir; başlık "PV nedir? | {SATICI_ADI}"; SSS yapılandırılmış verisi seo-uzmani kararı.
- **Analitik:** `pv_page_view`, `pv_tooltip_open` (kaynak bileşen), `pv_cta_click`.
- **Boş en kötü hâl:** Hero + üç adım + son çağrı her zaman render edilir.
- **Adres:** Plan önerisi `/pv-nedir`; ui-tasarimci `/pv` önerdi — seo-uzmani karar verir, diğeri yönlendirme olur.

---

## C. Ana sayfa PV bandı
Tarifi `ana-sayfa.md` §5. Bu sayfanın kısa özeti: başlık + tek cümle + canlı bir ürünün PV'si + "PV nedir?" bağlantısı.
