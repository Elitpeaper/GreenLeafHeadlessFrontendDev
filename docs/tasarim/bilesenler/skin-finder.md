# Bileşen — Cilt tipine göre ürün bulucu (`SkinFinder`)

> ui-tasarimci · v1 · 2026-11-16 · Dayanak: **K-069** (cilt tipine uygun ürünler: test veya filtre; **e-posta alınır**; KVKK aydınlatma + açık rıza), K-055/K-056 (soru ve etiket sözlüğü, `docs/plan/CILT-TESTI.md`), K-018 (uydurma puan yok) · ÖNERİ K-081
> Soru metinleri ve puanlama CILT-TESTI.md'dedir. Bu belge ekranları ve bileşenleri tanımlar. Hukuki metinler icerik-editoru ve uzmandadır.

## 0. İki giriş, tek veri
1. **Test** (`/cilt-testi`): 4 soru → sonuç → isteğe bağlı e-posta.
2. **Filtre** (listeleme): Cilt Bakımı, Makyaj ve Setler'de araç çubuğunun üstünde "Cilt tipine göre" çip şeridi (Kuru · Yağlı · Karma · Normal · Hassas) bulunur. Çipe basmak `skinType` filtresini uygular. Şeridin sonunda "Emin değil misin? 1 dakikalık test →" yer alır.
Her ikisi de aynı `skinType[]/concerns[]` etiketlerini kullanır (K-056). Önerilen ürünler standart ürün kartıyla gösterilir.

## 1. Görsel dil
- Zemin **blue-50** (brandbook: mavi = blok zemini) ve beyaz kartlardan oluşur. Yüz fotoğrafı ve selfie kullanılmaz. İllüstrasyonlar soyut **doku karoları** olarak çizilir: her cilt tipi için yaprak yüzeyi metaforu (kuru → ince damarlı mat yaprak, yağlı → parlak su damlalı yaprak, karma → yarısı parlak yaprak, normal → dengeli taze yaprak, hassas → yumuşak tüylü yaprak). Çizimler LeafCluster dilinde, `--accent-decor` ve `--accent-decor-2` ile yapılır.
- İlerleme göstergesi **çizgi bandının kendisidir**: 4 bölümlük yatay bant soru ilerledikçe yeşil, lime ve mavi bantlarla dolar.

## 2. Ekranlar
### 2.1 Giriş
Sol: H1 "Cildine uygun ürünü bul" + 3 madde ("4 kısa soru", "Fotoğraf ve kişisel veri istemiyoruz", "Sonuç hemen ekranda") + birincil "Teste başla" (56 px). Sağ: atmosfer fotoğrafı `skinFinder.hero` (yaprak ve su damlası, K-102) radius 2xl yaprak kesimiyle. Altta thin bant bulunur.

### 2.2 Soru ekranı (S1–S4)
```
[════ ════ ──── ────]  Soru 2 / 4                         (bant ilerleme + metin)
Cildin yeni ürünlere ya da hava değişimine karşı hassas mı?     (3xl, ink)
ⓘ Neden soruyoruz?  (açılır açıklama, sm)

┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ [doku illüs]│ │ [doku illüs]│ │ [doku illüs]│     seçenek karoları
│ Evet, sık…  │ │ Bazen       │ │ Hayır       │
└─────────────┘ └─────────────┘ └─────────────┘
[‹ Geri]                                   [Devam →] (S3'te 1–3 seçim sayacı)
```
- **Seçenek karosu:** beyaz, radius lg, 1.5 px `line-strong` çerçeve. Min yükseklik 120 px (masaüstü) / 72 px (mobil, illüstrasyon 48 px solda). Metin base 500.
  - Seçili: 2 px green-700 çerçeve, `--accent-soft` zemin, sağ üstte ✓ rozeti (green-700/beyaz). Renk dışında ✓ ile de belirtilir.
  - Odak: standart halka.
- Tek seçimli soruda seçim otomatik ilerlemez; 40+ kitle için kontrol kullanıcıda kalır, "Devam" gerekir. Çok seçimli S3'te "2 / 3 seçildi" sayacı gösterilir ve 3'ten sonrası `aria-disabled` olur, ipucu verilir.
- Semantik: `fieldset` + `legend` (soru), `input type=radio|checkbox` (görsel karo etiketi).

### 2.3 Sonuç
1. **Profil kartı** (beyaz, radius xl, üstte signature bant): "Cildin: Karma · Hassasiyet: Var · Odak: Nem, Parlama" çipleri + "Cevaplarını değiştir" bağlantısı. "Emin değilim" seçildiyse CILT-TESTI'ndeki not gösterilir.
2. **Rutin rayı:** `routineStep` sırasına göre numaralı adımlar (Comfortaa rakamlar `mega` küçük boy, `aria-hidden`; metinde "Adım 1: Temizleme"). Her adımda 1 ana ürün kartı (standart kart) ve "Alternatif" bağlantısı bulunur. Yakında ürün çıkarsa yakında kart varyantı gösterilir (sepete eklenmez, PV görünür).
3. **Toplu eylem kutusu** (yapışkan, alt): "Rutindeki Türkiye'de satıştaki N ürünü sepete ekle" (birincil, tek CTA) + toplam satırı: "Toplam ₺X · [Üye fiyatıyla ₺Y] · PV Z".
4. **E-posta kartı** (§3), sonuçların altında.
5. Uyarı notu (xs): "Bu öneriler genel bakım önerisidir, tıbbi değerlendirme değildir." (icerik-editoru).

## 3. E-posta ve onay adımı (K-069)
**İlke: önce değer.** Sonuçlar e-posta istenmeden gösterilir. E-posta kartı isteğe bağlıdır ve atlanabilir (araştırma OZET #13).
```
┌ Sonuçlarını e-postana gönderelim ───────────────────────────┐
│ E-posta adresin                                              │
│ [______________________________]                             │
│ ☐ Cilt testi sonuçlarımın bu e-posta adresine gönderilmesi   │  zorunlu açık rıza
│   için kişisel verilerimin işlenmesine açık rıza veriyorum.  │
│   Aydınlatma metni ↗                                         │
│ ☐ Greenleaf ürünleri hakkında ticari e-ileti almak istiyorum │  isteğe bağlı, ayrı (İYS/ETK)
│ [ Sonuçlarımı gönder ]                                        │
└──────────────────────────────────────────────────────────────┘
```
- Onay kutuları **boş** başlar ve birbirinden ayrıdır. Aydınlatma metni bağlantısı onay metninin yanında, yeni sekmede açılır. Kutular 24 px görsel, 44 px hedef ve `line-strong` çerçeveye sahiptir.
- Gönder düğmesi her zaman etkin görünür. Eksik durumda alan altında hata verilir (danger + ikon) ve ilk hatalı alana odaklanılır. Pasif düğme kullanılmaz; 40+ kullanıcı neyin eksik olduğunu görür.
- **Servis henüz yok** (K-069: bilgiler en son gelecek): gönderimde veri hiçbir yere gönderilmez. Kart "Bu özellik çok yakında açılacak. Sonuçlarını bu sayfanın adresini kaydederek saklayabilirsin." durumuna geçer ve "Bağlantıyı kopyala" düğmesi sunulur. Bu durum `emailService.enabled=false` yapılandırmasıyla belirlenir.
- Başarılı (servis açılınca): kart yeşil onay durumuna geçer ("Gönderdik"), e-posta maskelenmiş gösterilir.
- Metinler hukuk kontrolüne tabidir (icerik-editoru + uzman).

## 4. Mobil
Soru ekranında karolar tek sütun (72 px satır, illüstrasyon solda) olur. "Geri" ve "Devam" alt yapışkan çubukta durur (klavye açılmadığı için güvenli). Sonuçta rutin rayı dikey liste olur, toplu eylem alt yapışkan kalır.

## 5. Erişilebilirlik
Soru değişiminde odak yeni `legend`'e taşınır. İlerleme `aria-valuenow` olan `progressbar` + metinle verilir. Karolarda yerel radio/checkbox kullanılır. E-posta alanında `autocomplete="email"` ve `inputmode="email"` bulunur. Hata özetleri `role="alert"` ile verilir.

## 6. Hareket noktaları (→ hareket-tasarimcisi)
Soru geçişi (yatay kayma + solma, geri yönde ters) · ilerleme bandının dolması · karo seçimindeki ✓ pop'u · sonuç profil kartının girişi ve rutin adımlarının kademeli belirmesi · toplu ekleme sonrası sayaç ve drawer · e-posta kartının durum geçişi · doku illüstrasyonlarında çok hafif ambient hareket (reduced'da yok).
