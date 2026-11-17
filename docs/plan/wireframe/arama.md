# Wireframe — Arama (anlık panel + `/arama`)

> Sahip: proje-yoneticisi · Faz 1 · 2026-11-16 · Öncelik P0
> Dayanak: K-028 (Türkçe eşdeğerlik, yazım toleransı, kod/barkod), K-029, K-038, K-052.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | Panel ürün satırında PV (TR ve yakında); "Cildine uygun ürünü bul" satırı bulucuya (`/cilt-tipine-gore`) gider | K-062, K-069 |

**Tek görevi:** Aradığını en kısa yoldan bulmak — çoğu zaman sonuç sayfasına hiç gitmeden ürün detayına.
**Birincil eylem:** Paneldeki ürün satırına tıklamak; Enter = sonuç sayfası.

---

## A. Arama kutusu (header)
- Masaüstü: header ortasında geniş kutu, yer tutucu "Ürün, marka veya ürün kodu ara". Mobil: arama ikonu → tam ekran arama paneli (kutu otomatik odaklı, klavye açılır).
- Kısayol: masaüstünde "/" tuşu kutuya odaklar.
- Temizle (×) düğmesi; Esc paneli kapatır.

## B. Anlık panel
### B1. Boş kutu (odakta, 0–1 karakter)
- "Popüler aramalar" (yapılandırmadan 5–8 terim, ör. "şampuan", "diş macunu", "çamaşır deterjanı", "serum", "aloe vera"), "Kategoriler" (ilk 6 kök), "Cildine uygun ürünleri bul" satırı (→ `/cilt-tipine-gore`).
- Son aramalar (cihazda, en çok 5, "Temizle").

### B2. Sonuçlar (≥ 2 karakter, ≤ 150 ms gecikmeyle, yazarken 150 ms bekleme)
- **Kategori önerileri** (en çok 3): "Şampuanlar — Saç Bakımı" → kategori sayfası.
- **Ürünler** (en çok 6): küçük görsel, marka, ad (eşleşen kısım vurgulu), TR'de "Fiyat ₺X · Üye fiyatı ₺Y" (tek üye fiyatı yalnız başına gösterilmez — tasarim-kurallari §6) + "PV 0,5", yakında'da "Türkiye'ye yakında" rozeti + PV (veri varsa). Panel satırında ipucu düğmesi yok (yer darlığı; ekran okuyucu "puan değeri" okur). TR önce.
- **Alt satır:** "“{q}” için tüm sonuçları gör (N)" → `/arama?q=`.
- **Kod/barkod tam eşleşmesi:** Tek ürün en üstte "Ürün kodu eşleşmesi" etiketiyle.
- **Klavye:** ↑/↓ öğeler arası, Enter seçili öğeye; hiçbiri seçili değilse sonuç sayfasına. `combobox` + `listbox` semantiği, sonuç sayısı duyurulur.
- **0 sonuç:** "“{q}” için sonuç yok" + yazım önerisi ("Bunu mu demek istedin: şampuan?") + popüler kategoriler.
- **Mobil:** Tam ekran; sonuçlar listesi kaydırılır; klavye açıkken alt satır görünür kalır.
- **Hareket:** Panel açılışı hafif solma + 4 px kayma; sonuç güncellemesinde titreme yok (önceki sonuç yenisi gelene kadar kalır).

## C. Eşleştirme kuralları (davranış tarifi; uygulama frontend-mimar)
| Kural | Örnek |
|---|---|
| Türkçe karakter eşdeğerliği (ı/i, ş/s, ğ/g, ö/o, ü/u, ç/c), büyük/küçük harf duyarsız | "sampuan" → "Şampuan"; "DIS MACUNU" → "Diş Macunu" |
| Hafif yazım toleransı (≥ 5 harfli sözcükte 1 hata) | "şampun" → "Şampuan" |
| Ürün kodu ve barkod (tam) | "CAA038", "caa038" → ilgili ürün |
| Marka eş adları | "ilife", "i life" → iLiFE; "yibelle", "yibeil" → YIBEILE |
| Aranan alanlar ve ağırlık | ad > marka > kategori adı > ihtiyaç/cilt tipi Türkçe adları > kısa açıklama |
| Sıralama | alaka puanı içinde `availability=tr` önce |
| Rusça metin | Aramaya girmez |
| Eş anlamlılar (sözlük, icerik-editoru) | "deterjan" ↔ "çamaşır deterjanı"; "yüz kremi" ↔ "nemlendirici" |

Kabul örnek sorguları `KABUL-KRITERLERI.md` §5'te.

## D. Sonuç sayfası (`/arama?q=…`)
- Listeleme şablonu (`kategori.md`) ile aynı: breadcrumb yerine H1 "“{q}” için 42 sonuç", araç çubuğu (hızlı TR çipi, filtre, sıralama), ızgara, daha fazla yükle.
- Sıralama varsayılanı "En alakalı" (+ Fiyat artan/azalan, Yeni gelenler).
- Filtre grupları: Kategori (kökler) · Bulunabilirlik · Marka · Fiyat · (sonuçta etiketli ürün varsa) Cilt tipi, İhtiyaç.
- `q` olmadan yalnız filtreyle (ör. `/arama?marka=carich`): H1 "CARICH ürünleri" — ana sayfa Markalar bölümünün hedefi.
- **0 sonuç:** "“{q}” için sonuç bulunamadı" + yazım önerisi + "Kategorilere göz at" (kök ızgarası) + bulucu kartı ("Cildine uygun ürünleri bul"). Tek CTA: yazım önerisi varsa o, yoksa "Türkiye'de satışta olanları gör".
- **SEO:** noindex.
- **Analitik:** `search_query` (terim, sonuç sayısı), `search_result_click` (konum), `search_no_result` (terim) — terim kişisel veri içerebileceğinden yalnız toplu raporlanır.
