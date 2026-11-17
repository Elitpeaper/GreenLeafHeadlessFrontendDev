# Tasarım Kuralları — v1.4 (ui-tasarimci)
> v1.4 (2026-11-17): K-270 fotoğraf yoğunluğu (§8.2, §8.3), K-271 SVG yalnız boş alanda (§9.5), fotoğraf üstü metin scrim kuralı (§8.2). K-267 ile §9.1 `giant` varyantı ve §15 Dev şerit kullanımdan kalktı.

> Durum: **v1.3, Faz 2** (2026-11-17). v1.3: K-233/K-234 maksimalist ana sayfa. Yalnız ana sayfayı kapsayan istisnalar §15'te toplandı; §2.3, §3, §9.1, §9.3 ve §14 buna göre işaretlendi (öneri K-235…K-242, brief `briefler/ana-sayfa-maximalist.md`). v1.2: K-185 referans dili. Orman zeminleri, krem/kum/toprak ikincil nötrleri, karo, panel ve rozet sistemi, yumuşak uzun gölge ve doku eklendi (§1, §2.3, §2.7, §6, §8.2, §9.6, §14). Ayrıntı ve gerekçe: `referans/REFERANS-CIKARIM.md`. Öneri kararları K-186…K-189. v1.1: K-177 modern tipografi/boşluk ölçeği (K-074 iptal), K-175/K-179 SVG illüstrasyon kütüphanesi (§9.5). v0 ("yakında" sayfası) bunun alt kümesidir; çelişkide v1 geçerlidir.
> Bağlayıcı kaynaklar: brandbook 2023 (`brandbook-analizi.md`), ONAYLI kararlar K-036, K-041, K-042, K-044, K-045, K-049, K-062…K-071. Bu belgede **ÖNERİ** olarak işaretlenen maddeler K-072 ve sonrasıdır; kullanıcı önizlemede onaylayana kadar değiştirilebilir.
> Token'ların tek kaynağı `docs/tasarim/tokens.json`. Kodda ham HEX kullanılmaz; ya Tailwind token sınıfı ya da `var(--accent-…)` kullanılır.
> Bileşen ayrıntıları için `docs/tasarim/bilesenler/*.md`, sayfa kurgusu için `docs/tasarim/briefler/*.md`, zamanlama ve koreografi için `docs/tasarim/hareket.md` (hareket-tasarimcisi) kullanılır.

---

## 1. İlkeler (her kararda bu sırayla tartılır)
1. **Gerçek Greenleaf kimliği.** Brandbook yeşil/lime/mavi, Futura ailesi (web'de Jost), yeşil-lime-mavi çizgi bandı ve yaprak dili kullanılır. Ticaret yüzeyleri ve logo zemini beyazdır. Rakip distribütör sitelerinin hazır şablon görünümünden (düz koyu yeşil + altın CTA, Roboto, banner yığını) bilinçli olarak uzak durulur. **v1.2 (K-185/K-186):** vitrin yüzeylerinde orman zemini kullanılır. Bu zemin rakiplerin düz koyu yeşilinden şu yollarla ayrışır: kâğıt kesimi derinlik, doku, toprak tonlu karolar, krem (altın değil) CTA ve marka çizgi bandı.
2. **Canlı, derin, sıcak.** Fotoğraf yönü güneşlidir. Vitrin yüzeylerinde koyu orman zemini sıcak krem ve toprak vurgularla dengelenir. "Muted botanical" (soluk, gri-bej, taupe, zeytin, düşük doygunluk) **yoktur**. Krem, kum ve toprak yalnız ikincil nötr olarak kullanılır (§2.7). Sayfa zemini hiçbir zaman bej veya kahve olmaz.
3. **Modern, editoryal okunabilirlik (K-177).** Hedef kitle yaşlı değildir: gövde 16 px, sıkı ve büyük başlık ölçeği, WCAG AA kontrast. Birincil eylem hover'a gizlenmez; her ekranda **tek net birincil eylem** bulunur.
4. **Şeffaf fiyat.** Her yerde iki etiketli fiyat ("Fiyat" ve yeşil rozette "Üye fiyatı") ile **PV** gösterilir (K-036, K-062). Fiyat her zaman açık zemin üzerinde durur.
5. **Gösterişli ama hızlı.** Ana sayfa görsellik ve hareket açısından iddialıdır (K-070). Buna karşın LCP ≤ 2,5 sn, CLS ≤ 0,1 ve reduced-motion desteği (K-034) pazarlık konusu değildir.
6. **Tema katmanı, kimliği bozmaz.** Ürüne özel renk (K-065) ve hover ile renk değişimi (K-066) yalnız **aksan katmanını** değiştirir. Metin, fiyat rozeti, birincil düğme ve odak halkası değişmez.

## 2. Renk sistemi

### 2.1 Katmanlar
| Katman | İçerik | Değişir mi? |
|---|---|---|
| **Marka sabitleri** | `brand-green` #4EAE36, `brand-lime` #86B726, `brand-blue` #30A8D7, `brand-black` #333533 | Hayır. Yalnız zemin, motif, logo ve bantta kullanılır. Metinde kullanılmaz. |
| **Nötr ve işlev** | `ink`, `ink-muted`, `surface`, `surface-muted`, `line`, `line-strong`, `danger` | Hayır |
| **Erişilebilir türevler** | `green-700/800/900` (K-041), `blue-700/800`, `lime-700` | Hayır |
| **Aksan katmanı** | `--accent-*`, `--stripe-*`, `--accent-gradient` (CSS custom property) | **Evet:** tema preset'i veya ürün paleti ile değişir |
| **Tema renkleri** | `gold-*`, `ink-deep` | Yalnız `premium-gold` temasında kullanılır |
| **Vitrin nötrleri (v1.2, K-186)** | `forest-500…950`, `cream-50/100/200`, `sand-300/400`, `earth-500…900` | Hayır. Yalnız vitrin yüzey modunda (§2.7) zemin, karo, rozet ve dekor olarak kullanılır. `forest-900/950` premium temada da kullanılır |

### 2.2 Ana tablo ve kontrast (hepsi hesaplanmış WCAG oranlarıdır)
| Token | HEX | Rol | Kontrast |
|---|---|---|---|
| `ink` | #333533 | Tüm başlık ve gövde metni (brandbook) | beyaz 12.37 · green-50 11.43 · blue-50 11.39 · surface-muted 11.57 |
| `ink-muted` | #5A625B | İkincil metin | beyaz 6.30 · green-50 5.82 · lime-100 5.61 |
| `green-700` | #2F7A22 | Link, birincil düğme, **üye fiyatı rozeti** | beyaz üstünde 5.35, beyaz metin 5.35, green-50 4.94 |
| `green-800` | #245F1A | Birincil düğme hover | beyaz 7.70 |
| `green-900` | #1B4614 | Koyu panel (sayfada 1 kez) | beyaz 10.87 · green-200 8.81 · lime-200 7.65 |
| `blue-700` | #176A8E | Küçük mavi metin, **odak halkası** | beyaz 6.02 |
| `blue-800` / `blue-100` | #0F5573 / #E3F2F9 | "Türkiye'ye yakında" ve "Yakında" rozeti | 7.14 |
| `lime-700` / `lime-100` | #4A6A0F / #EEF5DA | **PV çipi** | 5.57 |
| `line-strong` | #8A948B | Form ve kontrol çerçevesi | 3.14 (metin dışı 3:1 eşiği) |
| `danger` | #B42318 | Hata | 6.57 |

**Yasaklı eşleşmeler:** beyaz üstünde metin olarak brand-green (2.83), brand-lime (2.38), brand-blue (2.72) · brand-blue üstünde beyaz metin (2.72) · brand-green üstünde ink (4.38; yalnız ≥ 24 px başlıkta, o da kaçınılır) · gold-300/400 ile beyaz üstünde metin (1.53/1.98).

### 2.3 Kullanım oranı (default tema, bir ekran yüksekliği)
- **Ticaret ekranı** (listeleme, PDP, drawer, arama): yüzeyin yaklaşık %75'i beyaz veya cream-50, %12'si metin, %10'u marka rengi (bant, motif, rozet, düğme) olur. Orman zemini yalnız kısa başlık bandında bulunur (≤ %20, S-066).
- **Vitrin ekranı** (ana sayfa hero ve karo bandı, tanıtım sayfası hero'ları, footer): orman zemini %50–65, toprak/kum karolar %15–25, krem metin ve CTA %10, marka rengi (bant, rozet içi, yaprak) %5–8 olur. Kahve **hiçbir zaman** sayfa veya bölüm zemini olmaz, yalnız karo ve kâğıt levha olur.
- Ana sayfa bir bütün olarak yaklaşık yarı yarıya orman ve açık yüzeyden oluşur. Ardışık iki orman bölümü yan yana gelmez; araya açık bir bölüm girer.
- **v1.3 (yalnız ana sayfa, §15):** brand-green, lime ve blue düz **renk bloğu** olarak bölüm zemini olabilir (Dev şerit, marka duvarı, hero kolaj arkası). Üstündeki metin yalnız forest-950 olur (green 5.48 · lime 6.49 · blue 5.68). forest-900 brand-green üstünde 4.45 kaldığı için kullanılmaz.
- Mavi brandbook'taki gibi **blok zemini** (blue-50 bant) ve aksan olarak kullanılır, yeşilin yerine geçmez.

### 2.4 Aksan katmanı (tema edilebilir) — ÖNERİ K-072
Bileşenlerin tema alan parçaları yalnız şu değişkenleri okur (varsayılanlar `tokens.json › accent.vars`):
`--accent-decor`, `--accent-decor-2`, `--accent-decor-3` (dekoratif, metin değil) · `--accent` / `--accent-hover` / `--on-accent` (dolu tema öğesi) · `--accent-text` (temalı küçük metin) · `--accent-soft` (tint zemin, kart görsel zemini) · `--accent-line` · `--accent-deep` / `--on-accent-deep` / `--accent-on-deep` (koyu panel) · `--surface-themed` / `--on-surface-themed` · `--stripe-1/2/3` · `--accent-gradient`.

**Değişmezler (hiçbir tema veya palet bunları değiştiremez):** üye fiyatı rozeti (green-700 + beyaz), birincil düğme (green-700), odak halkası (3 px blue-700 + 2 px beyaz boşluk), `ink`/`ink-muted` metin, fiyat metni ve `danger`.
**Neden:** K-036 yeşil rozeti tanınırlık için sabitler. Kullanıcı tek bir öğrenilmiş CTA rengine güvenir. Odak halkasının öngörülebilir olması erişilebilirlik gereğidir.

Uygulama: `:root` default temayı taşır. `[data-theme="premium-gold"]` ve ürün paleti (`style="--accent-…"`) bir kapsayıcı üzerinde yerel olarak ezer. Hover'la renk değişimi için renk değişkenleri `@property` ile `<color>` olarak kaydedilir (hareket-tasarimcisi ve frontend-mimar).

### 2.5 Tema preset'leri
- **`default`**: brandbook renkleri. Kontrol değerleri `tokens.json › themes.default.checks` içindedir.
- **`premium-gold`** (K-065; ana temada yasak, ürün/koleksiyon sayfasında serbest): forest-900 derin zemin, altın varak gradyanı (yalnız çizgi, süs ve bant için; metin arkasında asla), altın düğme (`gold-button` gradyanı + `ink-deep` metin, her durakta ≥ 7.08). Ayrıntı: `bilesenler/premium-theme.md`.

### 2.6 Ürün paleti → token eşlemesi — ÖNERİ K-073
Ürün verisinde isteğe bağlı bir `palette { primary, secondary, tertiary, onPrimary }` alanı bulunur (veri-muhendisi şema v2; `null` olabilir). Eşleme **derleme zamanında** hesaplanır, birim testten geçer ve sonuç `palette.resolved` olarak saklanır. Tarayıcıda hesap yapılmaz. Algoritma `tokens.json › paletteDerivation.steps` içindedir. Özeti:
- `primary` olduğu gibi yalnız dekora (`--accent-decor`) gider.
- `--accent-soft` = primary'nin beyaza %10 karışımıdır.
- `--accent` / `--on-accent`: önce verilen çift, sonra beyaz, sonra ink denenir. Hiçbiri tutmazsa primary, beyazla **≥ 4.6:1** sağlanana kadar koyulaştırılır.
- `--accent-text`, **hem beyaz hem `--accent-soft`** karşısında ≥ 4.6:1 olana kadar koyulaştırılır.
- Hedef 4.6'dır (4.5 + yuvarlama payı). Herhangi bir kontrol başarısız olursa palet düşer ve marka teması kullanılır. Sessiz düşüş derleme loguna yazılır.
- Örnek çıktılar (gold, pembe, deniz mavisi, turuncu) `tokens.json`'dadır. Hepsinde ink/soft oranı ≥ 10.4'tür.

### 2.7 Yüzey modları ve vitrin paleti (v1.2) — ÖNERİ K-186
Her sayfa alanı iki moddan birindedir (`tokens.json › surfaceMode`):
| Mod | Zemin | Metin | Nerede |
|---|---|---|---|
| **Vitrin** | `forest-hero` / `forest-deep` / `forest-radial` gradyanları, forest-700/800 | Başlık cream-200, gövde cream-100 veya beyaz | Ana sayfa hero ve tanıtım karoları bandı · PV / üye ol / bulucu / blog / haberler / hakkımızda hero'ları · footer · mega menü tanıtım karosu · çok yakında paneli |
| **Ticaret** | Beyaz, cream-50, surface-muted | ink / ink-muted | Ürün ızgaraları, PDP satın alma kutusu, drawer, arama, formlar. **Ürün kartı her zaman beyazdır** |

Vitrin metin eşleşmeleri (hesaplanmış): cream-100/forest-600 5.38 · cream-100/forest-700 7.09 · cream-200/forest-700 6.24 · cream-200/forest-600 **4.73, yalnız ≥ 24 px başlık** · beyaz/forest-600 6.21 · lime-200/forest-800 7.40 · forest-900/sand-300 (krem CTA) 7.56 · cream-100/earth-600 5.13 · beyaz/earth-700 8.12 · earth-900/sand-400 6.30 · earth-700 metin/cream-50 7.60 · green-700/cream-50 5.00.
**Vitrin yasakları:** forest-500 ve earth-500 üstünde metin (4.30 / 4.56, yalnız dekor) · orman zeminde sand-300 metin (3.73) · orman zeminde brand-green/lime/blue metin · fiyat, üye fiyatı rozeti ve PV çipinin orman/toprak zeminde durması (beyaz plaka zorunlu).
**CTA:** orman zeminde birincil eylem **krem haptır** (`gradient.cta-cream`, forest-900 metin, ≥ 7.56, `shadow-cta-cream`, 52 px). Bu, `primary-button.onDark` kuralının vitrin karşılığıdır. Açık zeminde birincil düğme green-700 olarak kalır (değişmez).

## 3. Tipografi (K-042, K-049)
- **Varsayılan:** Jost (gövde 400, başlık 600). Futura'ya en yakın ücretsiz font budur.
- **Aksan:** Comfortaa 700. Yalnız eyebrow (≥ 15 px), marka alıntısı, büyük dekoratif rakam ve footer sloganında kullanılır. Bir bölümde en fazla bir küme olur. **Gövde, fiyat, düğme, form, ürün adı ve navigasyonda kullanılmaz** (yuvarlak harflerin küçük boyda ayırt edilebilirliği düşüktür).
- **Önizleme seçicisi:** `?font=jost|poppins|comfortaa`. Son seçimi kullanıcı yapar.
- **Premium display seçeneği** (yalnız premium-gold): (a) Jost 300–400, büyük harf, 0.14em harf aralığı (yeni font yok, Futura ailesinde kalır; **varsayılan**) veya (b) Cormorant Garamond 500–600, yalnız ≥ 32 px. Gerekçe: araştırmadaki 5 premium referansın hepsi serif display kullanıyor (OZET #31). Düşük x-yüksekliği nedeniyle küçük boyda kullanılmaz. Kullanıcı önizlemede seçer.

| Rol | Token | Boyut (360 → 1440) | Ağırlık · satır · harf aralığı |
|---|---|---|---|
| Hero H1, editoryal cümle | `display` | 44 → 92 px | 500–600 · 0.98 · -0.03em |
| Sayfa H1 | `4xl` | 36 → 64 | 600 · 1.04 · -0.02em |
| Bölüm H2 | `3xl` | 28 → 44 | 600 · 1.1 · -0.015em |
| H3, PDP fiyatı | `2xl` | 22 → 28 | 600 · 1.25 · -0.01em |
| H4, drawer toplamı | `xl` | 20 | 600 · 1.4 |
| Kart adı | `base` → `lg` | 16 → 18 | 500 · 1.55 |
| Giriş paragrafı | `lg` | 18 | 400 · 1.55 |
| Gövde, düğme, input | `base` | **16** | 400 / 500 · 1.6 |
| Meta, marka, hacim, breadcrumb | `sm` | 14 | 400–500 |
| Rozet, PV çipi, eyebrow | `xs` | 12 (tek satır) | 500–600; eyebrow büyük harf + `eyebrow` aralığı |
| Dekoratif rakam (PV, 404) | `mega` | 56 → 136 | 300–600, `aria-hidden` |
| Ana sayfa hero H1 (v1.3, yalnız §15) | `ultra` | 56 → 136 | 700 · 0.9 · -0.045em · en çok 3 satır |
| Dev dekor kelime/sayı (v1.3, yalnız §15) | `colossal` | 96 → 288 | 600–700 · 0.85 · kontur ya da ≤ %25 alfa, her zaman `aria-hidden` |

**Neden (K-177):** Kitle 40+ değildir. Modern e-ticaret ve editoryal referanslar (araştırmadaki premium/editoryal yön) 16 px gövde ile büyük, sıkı başlıklar arasında güçlü bir ölçek farkı kurar. Bu fark "premium" hissini taşır ve şablon distribütör sitelerinin tek ölçekli görünümünden ayrışır.

Kurallar: başlıklarda `text-wrap: balance`, gövdede `pretty` · fiyatta `tabular-nums` · paragraf genişliği en fazla `prose` (40rem ≈ 72 karakter) · 24 px altında 300 ağırlık yok · 12 px (`xs`) yalnız tek satırlık etiket ve ink-muted ya da daha koyu renkte · büyük harf yalnız 3 kelimeye kadar olan eyebrow ve marka adlarında kullanılır.

## 4. Okunabilirlik ve erişilebilirlik tabanı (K-177; K-074 iptal)
1. Gövde 16 px, en küçük metin 12 px. 12 px yalnız tek satırlık etiketlerde (rozet, PV çipi, eyebrow) kullanılır.
2. Kontrast **WCAG AA** zorunlu tabandır: normal metin ≥ 4.5:1, büyük metin (≥ 24 px ya da ≥ 18.7 px kalın) ve metin dışı öğeler ≥ 3:1. Oranlar §2.2'dedir.
3. Dokunma alanı en az 44 px (K-034). Düğme ve input 44 px, büyük CTA 52 px, çip 36 px görünür + 44 px'e tamamlanan tıklama alanı.
4. **Birincil eylem hover'a gizlenmez.** "Sepete ekle" kartta görünür kalır. Hover süsler ve ikincil eylemleri (favori, hızlı bakış) belirginleştirebilir.
5. İkon düğmelerinin erişilebilir adı bulunur. Header'daki yalnız ikonlu düğmeler tooltip ile desteklenir.
6. Görsel üstüne doğrudan metin konmaz. Metin panelde durur ya da ölçülmüş bir scrim (≥ 4.5 garanti) kullanılır.
7. Form etiketi her zaman alanın üstünde görünür. Hata ikon ve metinle verilir. Input yazı boyutu 16 px'in altına inmez (iOS yakınlaştırması).
8. Fiyat biçimi tektir: "₺1.299,90" / "₺1.300". Ekran okuyucu için "TL" sr-only metni eklenir.

## 5. Boşluk ve ızgara
- 4 px temel ızgara. `gutter` 16 → 32 · `section` 48 → 96 · `section-tight` 32 → 56 · `stack` 20 → 32 · `card-pad` 12 → 16 · `grid-gap` 12 → 20 px. K-177 ile ritim sıkılaştı: boşluğu büyük başlıklar taşır.
- Kapsayıcılar: `page` 76rem (içerik) · `wide` 90rem (hero, mega menü, tam genişlik raylar) · `prose` 40rem · `drawer` 28rem.
- Sütunlar: mobil 4 (ürün 2 sütun) · tablet 8 (ürün 3) · masaüstü 12 (ürün 4; filtre panelli listede 3).
- Ritim: bölümler arasında `section` boşluk kullanılır. Bant türü bölümlerde (cilt testi, PV) `section-tight` kullanılır. Ardışık iki tint bölüm yan yana gelmez; araya beyaz bölüm veya çizgi bandı girer.

## 6. Radius, yükseklik (elevation), çerçeve
- Radius: sm 8 (rozet) · md 12 (input, mega menü karosu) · lg 20 (kart) · **tile 28 (v1.2: tanıtım/kategori karosu, kart medya karosu)** · xl 32 (büyük panel) · **panel 36 (v1.2: yaprak dilimli panel, hero çerçevesi, footer üst köşeleri)** · 2xl 48 (**yaprak kesimi**: hero ve özellik görsellerinde yalnız tek köşe, diğerleri lg; brandbook yaprak formuna gönderme) · pill (düğme, arama, çip). Kare ve büyük harfli düğme kullanılmaz.
- Elevation, 4 seviyede ve yeşil tonlu yumuşak gölgelerle uygulanır:
  0 düz (`line` çerçeve) → 1 `card` → 2 `lift` (hover/seçili) → 3 `overlay` (mega menü, drawer, popover).
  Premium'da `gold` gölgesi kullanılır. Gri, sert ve siyah gölge kullanılmaz.
- **Vitrin gölgeleri (v1.2):** ışık her zaman **sol üstten** gelir, gölge sağ alta düşer ve orman (#0A2A18) tonludur. `tile` / `tile-hover` (karo), `long` (yönlü: rozet çerçevesi, hero görseli, panel), `badge` (yuvarlak rozet), `cta-cream`, `card-on-forest` (orman zemindeki beyaz plaka). Bir bileşende tek gölge yönü kullanılır; ters yönlü gölge olmaz.
- Kart çerçevesi `line` (dekoratif) olur. Kontrol çerçevesi `line-strong` (3.14) olur.

## 7. İkonografi
- UI ikonları için **Lucide** kullanılır: 24 px ızgara, 1.75 px çizgi, yuvarlak uç ve birleşim. Bu seçim brandbook'un "yuvarlak formlu" font diline uyar. Dolgulu set ve emoji yoktur.
- **Kategori ikonları (12 kök):** aynı ızgarada özel çizilir. Çizgi ink rengindedir. Arkada `--accent-soft` zeminli, `--accent-decor-3` %35 yaprak biçimli bir leke bulunur (duotone). Görselli mega menüde ikon fotoğrafın yedeğidir.
- Boyutlar: 20 (satır içi) · 24 (UI) · 32 (özellik) · 40 (kategori, 64 px karo içinde).
- Bilgi ikonu (PV ipucu) bir `button` olarak uygulanır ve tooltip/popover açar. Yalnız `title` özniteliği kullanılmaz.

## 8. Görsel ve fotoğraf yönü
### 8.1 Ürün görselleri (resmî, K-044)
- Ürün görselinin rengi, kırpımı veya içeriği değiştirilmez. Kart ve PDP görsel zemini `--accent-soft` olur. Kaynak görsel saf beyaz zeminliyse `mix-blend-mode: multiply` ile zemine oturtulur (`images[].bg = "white"` veri bayrağıyla). Saydam PNG doğrudan konur.
- Oran: kartta 1:1 alan, ürün %76'sını kaplar (iç boşluk %12). Tüm kartlarda optik hiza tutarlı olur.

### 8.2 Atmosfer fotoğrafları (hero, bant, hikâye — K-102, ÖNERİ K-160)
> K-102: sitede **AI üretimi görsel yoktur**. Kaynak yalnız resmî Greenleaf görselleri ve ticari kullanıma açık lisanslı stok (Unsplash/Pexels). Seçili dosyalar `public/images/stock/`, tüketim `data/content/stock-images.json`, kaynak/lisans kaydı `docs/tasarim/gorsel-kaynaklari.md`. Kayıtta olmayan görsel siteye girmez.
**Yön: "parlak, canlı doğa".** Brandbook s.2 ve s.8'de güneşli orman, ters ışıkta yapraklar, kalp biçimli yaprak tacı, çimen üstünde cam küre ve doğada özgür insanlar yer alır.
- **Işık:** sabah veya öğleden sonra güneşi, ters ışık (yaprak damarları parlar), yumuşak bokeh, mavi gökyüzü aksanı (brandbook mavisine yakın).
- **Renk:** doygun taze yeşiller, beyaz ve açık gökyüzü. Lime yansımaları bulunur. v1.2: orman zeminiyle uyum için **altın saat ışığı** (sıcak huzme, orman içi ters ışık) serbesttir. Fotoğrafın ağırlığı yine yeşil kalır, sonbahar/kuru yaprak ağırlıklı ve kasvetli kare kullanılmaz.
- **Konu:** yaprak, eğrelti, su damlası, cam küre, ahşapsız sade yüzeyler, ellerin doğayla teması. Tanınabilir yüz kullanılmaz; eller ve uzak siluetler serbesttir (model izni gerekmez).
- **Kompozisyon:** metin paneli için boş alan bırakılır (sol veya alt üçte bir). Mobil için ayrı dikey kırpım hazırlanır. Ürün eklenecekse resmî packshot **üst katmanda** ayrı öğe olarak konur, görsele "basılmaz".
- **Yasak:** AI üretimi veya AI ile düzenlenmiş görsel, ürünün yeniden üretilmesi, görselde yazı veya tanınabilir marka logosu, tanınabilir yüz, karanlık ve moody ton, bej/krem stüdyo, sahte laboratuvar ve tıbbi çağrışım (TİTCK).
- **Yeni görsel ekleme:** Unsplash/Pexels fotoğraf sayfasında lisans "Unsplash License" / "Pexels License" olmalı (Unsplash+ değil); en uzun kenar: ana sayfa hero ve liste bantları ≤ 2400 px, dikey pin (kapı) fotoğrafları ≤ 2000 px, sayfa hero'ları ve doku/yaşam ≤ 1600 px, karo ve kapak ≤ 1200 px; webp; `gorsel-kaynaklari.md` tablosuna satır + manifest girdisi eklenir. Pinterest vb. yalnız mood referansıdır, indirilmez.
- **v1.4 Fotoğraf yoğunluğu (K-270):** görsel alan varsayılan olarak **fotoğrafla** doldurulur. İkon/SVG yalnız (a) gerçekten küçük işaret alanlarında (menü satırı ikonu, sekme ikonu, rozet), (b) boş durum / "çok yakında" / 404 ekranlarında ve (c) K-271 boş alan animasyonlarında kalır. Slot → sayfa eşlemesi: `briefler/fotograf-ve-svg-yerlesim.md`.
- **Fotoğraf üstünde metin (v1.4):** metin yalnız düz zeminli plakada **veya** fotoğrafın üstünde metin bölgesinde en az `forest-950 (#0A2A18) / %70` scrim (alttan gradyan; en kötü durumda saf beyaz piksel üstünde beyaz metin 5.85:1 — %62'de 4.52 sınırda olduğu için %70 alt sınır) ile durur. Scrim'siz fotoğraf üstü metin yasağı sürer. Fiyat fotoğraf üstünde asla durmaz.

### 8.3 Kategori görselleri (mega menü, kategori şeridi) — v1.4 (K-270, K-161'i değiştirir)
- **Raf duvarı ve kategori karoları:** her kök için `shelf.<kök>` fotoğrafı karonun tamamını kaplar (`object-cover`), ad scrim üstünde. Kategori ikonu karonun köşesinde 40 px cream plakada işaret olarak kalır. (Eski "stok fotoğraf karoda yok" kuralı K-270 ile kalktı; ürün beklentisi riski, fotoğrafın ürün değil **ortam** göstermesiyle — yaşam/doku karesi — karşılanır.)
- **Kategori sayfası başlık bandı (K-230):** `category.<kök>` fotoğrafı + orman scrim. Mega menü mobil kök kapağı aynı slot.
- **Mega menü masaüstü:** kök satırı ikonu kalır (küçük işaret alanı); alt kategori karoları packshot kompozisyonu (K-077); tanıtım karosu `promo.mega`.

## 9. Marka motifleri
### 9.1 Çizgi bandı (imza)
- Sıra yeşil → lime → mavi (`--stripe-1/2/3`). Varyantlar:
  - **signature**: 10/6/8 px, 4 px boşluk. Hero alt kenarı, üyelik paneli alt kenarı ve footer'ın en altında kullanılır.
  - **thin**: 2/1/1 px. Header üst kenarı, drawer üst kenarı ve mega menü alt kenarında kullanılır.
  - **inline**: 56 px genişlik, 4/3/3 px. Bölüm eyebrow'u altında kullanılır.
- **giant** (v1.3, yalnız ana sayfa Dev şerit): 120/72/96 px (mobil 70/42/56), boşluksuz, içinde forest-950 büyük harf tipografi. Ekranda signature bandın yerine geçer; ikisi aynı ekranda bulunmaz.
- Bir ekran yüksekliğinde en fazla **bir signature** bant bulunur. Bant her zaman yataydır ve tam genişliktir (inline hariç). Çapraz, eğik veya dalgalı bant kullanılmaz. Bant gradyan olarak uygulanmaz, üç ayrı renk bandıdır (brandbook). İstisna: premium'da altın varak bant.
- Hareket noktası: bandın soldan çizilmesi (hareket-tasarimcisi).

### 9.2 Yaprak demeti (`LeafCluster`)
- Brandbook'un "iki yarı saydam yaprak, kesişimi koyu" dilinin soyut türevidir. `multiply` karışımı, `--accent-decor` ve `--accent-decor-3` renklerinde, %55–75 opaklıkta uygulanır.
- Kullanım: hero kenarı, cilt testi bandı, footer filigranı (%12 opaklık), boş durum illüstrasyonları. Bir ekranda en fazla 2 demet bulunur.
- **Pinwheel değildir.** 7 kümeli işaret yeniden çizilmez, taklit edilmez, döndürülmez.

### 9.3 Resmî işaret ve logo
- Logo dosyası `public/brand/greenleaf-logo.svg` (tam yatay kilit) yalnız beyaz zeminde kullanılır. Rengi, oranı, kırpımı ve animasyonu değiştirilmez. Header'da 32–40 px yüksekliktedir.
- **K-233 istisnası (v1.3):** ana sayfa hero'sunda resmî `greenleaf-mark.svg` (kendi beyaz diskiyle) 88–136 px boyutunda bir kez soldan dönerek girer. Son poz 0°, opak ve çizimle birebirdir. Döngü ve hover dönüşü yoktur. Başka hiçbir yerde logo veya işaret hareket etmez.
- İşaret (`greenleaf-mark.svg`) brandbook sosyal kullanımı gibi ince yeşil halka içinde kullanılır (favicon, footer rozeti). Filigran, döndürme ve yükleme göstergesi olarak kullanılmaz (kullanıcı kararı gerekirse: bkz. rapor).

### 9.4 Premium süslemeleri
Yalnız premium-gold temasında kullanılır: 1 px altın varak çizgi, çift ince çizgi (1 px + 3 px boşluk + 1 px), yaprak-elmas ayırıcı (iki yaprak sivri uçla birleşir) ve köşe süsü (yaprak kıvrımı). SVG olarak ve `--accent-gradient` stroke ile çizilir. Ayrıntı: `bilesenler/premium-theme.md`.

### 9.5 SVG illüstrasyon kütüphanesi (K-175, K-179)
Kaynak `src/components/illustrations/` (sahibi ui-tasarimci), katalog `/svg-kutuphanesi` (noindex). Tüm çizimler özgündür. AI üretimi ve raster yoktur. Her bileşen 6 kB'ın altındadır; tek istisna `SceneHeroLeaves`'dir (≈ 8,7 kB ham, gzip ≈ 2 kB, sayfada en çok 1 kez, LCP öğesi değildir).
- **Dil:** brandbook'un yarı saydam, üst üste binen yaprak dili kullanılır (pinwheel'den **esinlenilir**, işaret ve logo asla çizilmez). Yapraklar `multiply` ile kesişir ve kesişim koyulaşır. Çizgi `currentColor` (varsayılan ink #333533), 2 px ve yuvarlak uçludur. Dolgular brand-green, lime ve blue renklerinde, %35–75 opaklıktadır. Premium çizimlerde yalnız gold-300/400/500 ve forest-900 kullanılır (premium-gold teması, K-065).
- **Renk:** bileşenler token değişkenlerini (`--accent-decor*`, `--color-brand-*`) kullanır. Bu nedenle hover-recolor bölgesinde (K-066) kendiliğinden yeni palete geçerler. Çizgi `currentColor` olduğu için koyu zeminde `text-white` ile çevrilir. Çizimler metin taşımaz (404 rakamı hariç, o da `aria-hidden`).
- **Erişilebilirlik:** varsayılan `aria-hidden` olur. Anlam taşıyorsa `title` verilir (`role="img"` + `<title>`). Bilgi illüstrasyonla değil, yanındaki metinle verilir.
- **Etkileşim (K-179):** kökte `data-svg-interact="bloom|sway|draw|spin|parallax"`, hareketli gruplarda `data-svg-part="…"` ve `--i` (sıra) bulunur. Davranışı hareket-tasarimcisi uygular. Dokunmatikte ve reduced-motion açıkken çizim statik ve eksiksiz görünür.
- **Yoğunluk:** bir ekran yüksekliğinde kategori ikonları dışında en fazla 1 büyük sahne ve 1 desen bulunur. Desenler %4–10 görünürlükte kalır. Desen üstündeki metinde ink kontrastı ≥ 10:1 korunur.
- **v1.4 Kullanım yeri (K-271, K-175/K-179'u daraltır):** SVG çizim **fotoğrafın yerine geçmez**. Yalnız sayfaların boş kalan alanlarında (bölüm kenar boşlukları, başlık yanı boşluk, liste sonu, içerik sütunu yanındaki gutter, boş durumlar) durur ve **kullanıcı hareketine bağlı** aktifleşir (imleç yakınlığı/hover, kaydırma ilerlemesi). Kendiliğinden döngü yok. Hangi sayfada hangi çizimin nerede durduğu: `briefler/fotograf-ve-svg-yerlesim.md` §3. Mevcut `SceneHeroLeaves`, `SceneMembership`, `SceneBlog`, `SceneFinderLeaves`, `SceneHeroBotanical` sahneleri hero/kapı görsel sütunlarından çıkar, boş alan yerleşimine taşınır.
- **Ayırıcılar:** dalga ayırıcı bir **yüzey geçişidir**, çizgi bandı (§9.1) değildir. İmza bant yine düz ve üç renklidir. Dalga ayırıcının rengi (`currentColor`) bir sonraki bölümün zemin rengidir.

### 9.6 Referans dili: kâğıt katman, doku, karo, panel, rozet (v1.2) — ÖNERİ K-187, K-188
- **Kâğıt kesimi yapraklar** (`PaperLeaf`, `SceneHeroLeaves`, `Leaf*Specimen`): opak katmanlar `PaperShadow` ile alttakine gölge düşürür. Türler oval, mızrak, kalp ve iskelettir; tonlar forest, deep, green, sand ve earth'tür. Yalnız vitrin zemininde kullanılır. Brand dilindeki yarı saydam `Leaf` ile aynı kompozisyonda karıştırılmaz (iki farklı malzeme). Ekranda en çok 1 kâğıt kesimi sahne bulunur.
- **Doku** (`TextureGrain`, `PatternLeafVeinEmboss`): yalnız bölüm zeminine konur, metin plakasının içine konmaz. Grain orman zeminde %10–16, kremde %5–8 kullanılır. Emboss yalnız orman/toprak zeminde olur. Ekranda en çok 1 doku + 1 desen bulunur. İkisi de statiktir, hareket etmez.
- **Karo:** `rounded-tile`, `shadow-tile`, `gradient.tile-*` zemin, üstte ortalı `IconBadge` (72/56 px), başlık `2xl`, özet ≤ 2 satır. Karonun tamamı tek bağlantıdır. Fiyat karoda yer almaz (yalnız `tile-cream` istisna). Fotoğraf karosunda metin cream-50 plakada durur.
- **Yaprak dilimli panel** (`PanelLeafSegments`): `rounded-panel` + `shadow-long`. Sütun sayısı içerik ızgarasına eşittir (2–5), içerik ortalıdır, Lucide ikon cream-100. Kullanım: /uye-ol, /pv-nedir, /hakkimizda. Ana sayfada yer almaz.
- **Yuvarlak rozet** (`IconBadge`, `glyph` × `tone`): dekoratiftir (`aria-hidden`), glif/zemin ≥ 3:1. Papatya veya 6–8 yapraklı çiçek glifi çizilmez (pinwheel benzerliği).
- Ayrıntılı anatomi ve sayfa eşlemesi: `referans/REFERANS-CIKARIM.md` §6–7.

## 10. Fiyat ve PV gösterimi (K-036, K-059, K-062)
- Her ürün yüzeyinde (kart, mini kart, mega menü kartı, drawer satırı, PDP) şu sıra uygulanır: **"Fiyat ₺X"** (ink) · **yeşil rozet "Üye fiyatı ₺Y"** · **PV çipi "PV 12,5"** (lime). Üstü çizili fiyat, yüzde ve "tasarruf" kullanılmaz.
- Tek başına üye fiyatı hiçbir yerde gösterilmez. Yer yoksa ikisi birden gizlenir (yalnız PV kalabilir).
- **"Türkiye'ye yakında" ürünleri:** fiyat yoktur (K-052'nin bu kısmı geçerlidir). **PV görünür** (K-062). Sepete ekle yoktur.
- PV ipucu metni K-060'tır, son hâlini icerik-editoru verir. PV bilgi düğmesi `/pv` açıklama sayfasına bağlanır (`bilesenler/pv-explainer.md`).

## 11. Hareket (sahibi hareket-tasarimcisi)
Bu belge hareketi tarif etmez, **nerede** hareket olacağını işaretler. Her bileşen dosyasında "Hareket noktaları (→ hareket-tasarimcisi)" başlığı bulunur. Genel çerçeve: transform, opacity ve kayıtlı renk değişkenleri kullanılır · `prefers-reduced-motion` açıkken dekoratif hareket olmaz · hover yalnız `(hover:hover) and (pointer:fine)` cihazlarda çalışır · LCP öğesi animasyonla gizlenmez.

## 12. Hover ile renk değişimi (K-066) — ÖNERİ K-075
Bölgeler, değişen token'lar ve güvenlik kuralları `bilesenler/hover-recolor.md` dosyasındadır. Özet: yalnız dekor ve tint token'ları değişir · CTA, fiyat ve metin değişmez · dokunmatikte tetiklenmez · klavye odağı da tetikler · reduced-motion açıkken hiç değişmez.

## 13. Erişilebilirlik kontrol listesi
AA kontrast (§2.2) ve okunabilirlik tabanı (§4) · görünür odak halkası (3 px blue-700 + 2 px beyaz) · "İçeriğe geç" bağlantısı · yeni sekmede açılan bağlantıda sr-only "(yeni sekmede açılır)" · drawer, mega menü ve modal'da odak hapsi ile dönüş · `aria-expanded` / `aria-controls` · raylarda `role=region` + `aria-label`, klavyeyle kaydırma · pasif ödeme düğmesinde `aria-disabled` + açıklama · dokunma hedefi ≥ 44 px · `lang="tr"` · renk tek başına bilgi taşımaz.

## 14. Yapılmayacaklar
Ana temada altın veya metalik efekt (premium-gold teması hariç, K-065) · soluk "muted botanical" palet (taupe, zeytin, gri-bej, düşük doygunluk) · bej veya kahve sayfa/bölüm zemini (krem/kum/toprak yalnız §2.7 kapsamında karo, levha, CTA ve metin olarak) · orman/toprak zeminde fiyat, üye fiyatı rozeti veya PV çipi · referans görselin (K-185) kendisinin ya da izinin kullanılması · logonun yeniden çizilmesi, renklendirilmesi veya animasyonu (tek istisna: K-233 hero girişi, §9.3) · pinwheel kopyası veya döndürülmesi · beyaz zeminde brand-green/lime/blue ile metin · mavi üstünde beyaz metin · gradyanlı veya eğik çizgi bandı (ana tema) · fiyatta yüzde veya üstü çizili fiyat · tek başına üye fiyatı · hover'a gizlenmiş eylem · görsel üstünde scrim'siz metin · sahte geri sayım, sahte stok veya sahte yorum · kazanç içeriğinin `/pv-nedir#is-firsati` dışında kullanılması (K-085, K-099) · WhatsApp · Rusça metin · tıbbi iddia çağrıştıran görsel.

## 15. Maksimalist ana sayfa (v1.3, K-234) — ÖNERİ K-235…K-242
Kapsam **yalnız ana sayfadır** (`/`). Diğer sayfalar v1.2 kurallarıyla devam eder. Uygulama tarifi: `briefler/ana-sayfa-maximalist.md`.
1. **Ölçek kontrastı esastır.** Süs eklemek yerine ölçek büyütülür: `ultra` H1, `colossal` dekor tipografi ve imza bandın `giant` varyantı kullanılır. Her dekor tipografi `aria-hidden` olur, anlamı gerçek metin taşır.
2. **Tipografi katmanı.** Dekor tipografi (kontur ya da ≤ %25 alfa) kolaj katmanlarının **arkasında** durabilir. Gerçek metin hiçbir zaman fotoğraf, packshot ya da kâğıt katman üstüne gelmez (§4.6 aynen geçerlidir). Gerçek metin yalnız düz token zemininde durur ve geçtiği her zeminde oranı hesaplanır.
3. **Kolaj sınırı.** Bir kolajda en çok 6 katman bulunur: zemin+doku, dekor tipografi, renk bloğu, fotoğraf çerçevesi, kâğıt yaprak ve packshot çıkartması. Fotoğraf ve çıkartmalar ±6°'ye kadar döner. Metin içeren karolar ve metnin kendisi dönmez.
4. **Yoğunluk istisnası.** §9.5'teki "1 büyük sahne" kuralı ana sayfada "1 kolaj" olarak okunur (kolaj içinde ≤ 2 kâğıt yaprak öğesi + 1 sahne). "1 doku + 1 desen" ve "ekranda 1 bant" kuralları aynen geçerlidir.
5. **Renk blokları.** §2.3'teki v1.3 maddesi geçerlidir. Fiyat hiçbir zaman blok üstünde durmaz, beyaz kartta kalır.
6. **Hero girişi (K-233).** İşaretin girişi ve H1 opaklığı `tokens.json › heroIntro` bütçesiyle uygulanır. "H1 opaklık almaz" kuralı (K-097) yalnız bu öğe için kalkar. LCP ≤ 2,5 sn yine zorunludur.
7. **Değişmezler** aynen geçerlidir: fiyat, üye rozeti ve PV beyaz kartta; birincil düğme; odak halkası; AA kontrast; logo çizimi; AI görseli yok.
