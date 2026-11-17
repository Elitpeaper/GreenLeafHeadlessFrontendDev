# Bileşen — Header (`SiteHeader`)

> ui-tasarimci · v1 · 2026-11-16 · Dayanak: BILGI-MIMARISI §3.1/3.3, K-017, K-062 (PV ana mesaj), K-064, K-066, K-070 (header'da mikro animasyon)
> **Güncelleme 2026-11-17:** §2 madde 2–3 (Kategoriler düğmesi + arama alanı), §3 (alt satır) ve §5 (mobil) yerini `header-arama-kategori.md`ye bıraktı (K-268, K-266). §4teki "40+" gerekçesi K-177 ile geçersiz.
> Ana sayfada şeffaf veya hero üstü varyant yoktur (okunabilirlik ve CLS). Header her sayfada düz beyazdır.

## 1. Katmanlar (yukarıdan aşağı)
| # | Katman | Yükseklik | İçerik |
|---|---|---|---|
| 0 | Duyuru şeridi (isteğe bağlı) | 40 px | blue-50 zemin, ink metin (11.39), tek satır + bağlantı (`--accent-text`). Kapatma düğmesi 44 px hedefli |
| 1 | **Thin çizgi bandı** | 4 px | `--stripe-1/2/3` (2/1/1 px) — **hover-recolor bölgesi** |
| 2 | Ana satır | 76 px (kompakt 64) | aşağıda |
| 3 | Alt gezinme satırı (≥ 1024 px) | 44 px | kompakt hâlde gizlenir |
| — | Alt kenar | 1 px `line` | kaydırma başlayınca yerini `shadow xs`'e bırakır |

## 2. Ana satır — masaüstü (≥ 1024 px)
Soldan sağa, 12 sütunlu ızgarada, `container.wide` içinde:
1. **Logo** (32–40 px yükseklik, ana sayfa bağlantısı, `aria-label="Greenleaf Türkiye ana sayfa"`).
2. **"Kategoriler" düğmesi:** pill, 48 px, çerçeve `line-strong`, ızgara ikonu + metin. Açıkken zemin `--accent-soft`, ikon ✕'e döner.
3. **Arama alanı:** pill, 48 px, esnek genişlik (en az 320, en çok 560), büyüteç solda, yer tutucu "Ürün, marka veya ürün kodu ara". Odakta çerçeve green-700 ve gölge `card` alır. Anlık arama paneli alanın altında açılır (`wireframe/arama.md`).
4. **İkon grubu** (her biri 48 px hedef): Hesap (K-017 paneli) · Favoriler (sayaçlı) · Sepet (sayaçlı). ≥ 1280 px'te ikon altında xs etiket bulunur ("Hesap", "Favoriler", "Sepetim"). Sayaç rozeti green-700 zemin + beyaz xs 600 (5.35), en az 22 px, sağ üst köşede durur.
5. **"Üye ol"** birincil düğmesi (pill, 48 px, green-700). Header'daki tek dolu düğmedir.

## 3. Alt gezinme satırı (≥ 1024 px)
Sol: "Türkiye'de satışta" · "Setler" · "Cildine uygun ürünü bul" (yaprak ikonlu). Sağ: **"PV nedir?"** (lime-700 metin + küçük PV çipi ikonu; K-062 ana mesaj) · "Sertifikalar". Metinler sm 500 ink. Hover'da `--accent-decor` alt çizgisi belirir. Aktif sayfa için 2 px `--accent-decor` alt çizgisi ve `aria-current="page"` kullanılır.

## 4. Kompakt hâl (kaydırma > 120 px)
Ana satır 64 px'e iner, logo %85 ölçeğe küçülür, alt gezinme satırı gizlenir. Thin bant kalır. Yapışkan (sticky) ve **yukarı kaydırınca da görünür** kalır. 40+ kitle için gizlenip beliren header kullanılmaz; sürpriz yaratır. Header yüksekliği değişimi CLS üretmez (sticky, akış dışı yer tutucu sabit).

## 5. Mobil (< 1024 px)
64 px tek satır: hamburger (sol, 48 px) · logo (orta, 28–32 px) · arama ikonu · sepet ikonu (sayaçlı). "Üye ol" header'da yer almaz, çekmecededir (BILGI-MIMARISI §3.3). Thin bant üstte kalır. Arama ikonu tam ekran arama panelini açar.

## 6. Durumlar
Varsayılan · kompakt · mega menü açık (Kategoriler düğmesi basılı, sayfa karartılı) · arama paneli açık · sepet sayacı 0 (rozet gizli) / 1–99 / 99+ · favori sayacı · duyuru kapalı (sunucu kararı, CLS yok) · odak (her öğede standart halka).

## 7. Erişilebilirlik
"İçeriğe geç" bağlantısı header'dan önce gelir ve odakta görünür. `header` + `nav aria-label="Ana gezinme"` kullanılır. Sayaçlar erişilebilir ada dahil edilir ("Sepetim, 3 ürün"). Değişimler `aria-live="polite"` sr-only metniyle duyurulur. Logo bağlantısı tek odak durağıdır.

## 8. Mikro animasyon noktaları (→ hareket-tasarimcisi; K-070 "küçük, ölçülü")
| # | Nokta | Amaç |
|---|---|---|
| H1 | Sayfa ilk yüklemede thin bandın soldan çizilmesi (yalnız ilk ziyaret/oturum) | Marka imzası |
| H2 | Kategoriler ikonunun ızgara ↔ ✕ dönüşümü | Durum geri bildirimi |
| H3 | Arama alanı odakta: odak halkası katmanının belirmesi ve çerçeve renginin geçişi (genişlik canlandırılmaz, K-157 notu) | Odak |
| H4 | Sepet sayacının "pop" yapması (ekleme sonrası), sepet ikonunun hafif sallanması **değil**, tek yaylanma | Ekleme onayı |
| H5 | Favori sayacının pop yapması | Onay |
| H6 | Normal ↔ kompakt geçişi: gölge (+ varsa alt satırın kayması). Logo ölçeklenmez (K-157) | Akıcılık |
| H7 | Alt gezinme bağlantılarında alt çizginin soldan uzaması | Hover |
| H8 | "Üye ol" düğmesinde hover'da küçük yaprak parıltısı (yaprak glifi kayar; sürekli animasyon değil) | Davet, aciliyetsiz |
| H9 | **Hover-recolor:** thin bandın ve Kategoriler açık zemininin ürün paletine geçmesi (tetik: mega menü öne çıkan kartı) | K-066 |
| H10 | Duyuru şeridinin kapanması (yükseklik çökmesi) | — |
Hiçbiri döngüsel veya sürekli değildir. Reduced-motion açıkken H1, H6 ve H8 yoktur; diğerleri anlık durum değişimi olur.
