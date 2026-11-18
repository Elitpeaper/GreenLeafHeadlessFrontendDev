# Yükleme ekranı seçenekleri (K-287)

Sahip: hareket-tasarimcisi · 2026-11-18 · Durum: ÖNERİ. Kullanıcı seçene kadar siteye bağlı değil.
Demo (yalnız önizleme, noindex): `/hareket-lab/loading` → `/a`, `/b`, `/c`, `/d`. Her demoda "Tekrar oynat", "İlk açılış / Sayfa geçişi", "Sayfa hazır: 200 ms / 700 ms / 2 sn", "Tam ekran" ve "Hareketi azalt (simülasyon)" düğmeleri var.
Kod: `src/components/motion/loaders/` (Loaders.tsx + loaders.css), demo `src/app/hareket-lab/loading/`.

## Ortak kurallar (K-192'den alınan dersler)
- **İçerik itilmez.** `loading.tsx` / 60vh yükleyici yok. Açılış perdesi sayfanın **üstünde** sabit katmandır; altındaki sayfa normal boyanır, gizlenmez, kaymaz → CLS 0. Perdede metin ya da büyük görsel yok, bu yüzden LCP öğesi sayfadaki öğe olarak kalır.
- **Süre üst sınırı CSS'te.** Perde JS'e bağlı değildir: en geç `cap` anında kendiliğinden çıkar (JS çalışmasa bile). Sayfa erken hazırsa en kısa süre (`min`) bitince çıkar. Sayfa statik ön-render olduğu için HTML neredeyse anında hazır; perde aslında kısa bir marka anıdır, bu yüzden üst sınırlar ≤ 1,4 sn tutuldu.
- **Yalnız ilk tam yüklemede, oturumda bir kez.** `<head>` içindeki satır içi betik `sessionStorage` bakıp `html[data-splash]` koyar; site içi gezinmede perde hiç oynamaz (K-244 ile aynı mantık). Sayfa geçişlerinde ayrı, küçük gösterge çıkar; gezinme 150 ms'den kısa sürerse gösterge hiç görünmez.
- **Erişilebilirlik.** Perde `aria-hidden`, odak tuzağı yok; geçiş göstergesinde ekran okuyucuya "Sayfa yükleniyor" durumu verilir. "Hareketi azalt" seçildiğinde hiçbir şey kaymaz veya dönmez, yalnız opaklık değişir.
- **Ana sayfa çakışması.** `/`'de hero girişi (K-233: logo yuvarlanarak gelir) zaten var. Açılış perdesi seçilirse ya `/`'de perde gösterilmez ya da hero girişi perde bitince başlar (S-070). Öneri: `/`'de perde yok, diğer sayfalara ilk girişte var.

## A · Resmî işaret, maskeyle çizilme
Krem zeminde `greenleaf-mark.svg` saat yönünde dairesel bir maskeyle ortaya çıkar, ince bir halka çizilir, işaret −140°'den yerine oturur. Çizim değişmez, yalnız sarmalayıcı döner ve maskelenir. Geçişte küçük hapta işaret çizilip silinir (döngü var, logo dönmez).
- **Ne zaman:** ilk açılış + sayfa geçişi (hap). **Süre:** en az 720, en çok 1000 ms + 320 ms çıkış.
- **LCP/CLS:** CLS 0. Not: `greenleaf-mark.svg` 51 KB (18 KB gz) çünkü dosyada görünmeyen yazı yolları da var. Aynı çizimin yalnız işaret yolları 10 KB (4 KB gz); kullanılacaksa ui-tasarimci'den bu sade dosya istenir. **GSAP:** yok, saf CSS.

## B · Yedi yaprak açılması
Beyaz zeminde yedi basit yaprak (yeşil, lime, mavi) sırayla merkezden açılır, bütün 1/7 tur dönüp oturur, çıkarken yapraklar dışa savrulur. Logo yeniden çizilmez; yedi yaprak yalnız 7 kümeli ritmi hatırlatır. Geçişte küçük hapta yapraklar sırayla yanar.
- **Ne zaman:** ilk açılış + sayfa geçişi (hap). **Süre:** en az 900, en çok 1200 ms + 320 ms çıkış.
- **LCP/CLS:** CLS 0, dosya isteği yok (SVG satır içi, < 1 KB). **GSAP:** yok, saf CSS.

## C · İmza şeridi dolması
Açılışta ekranı yeşil/lime/mavi üç bant kaplar, renk soldan dolar, bantlar sırayla sağa kayarak sayfayı açar. Geçişte ekranın en üstünde brandbook'un ince üç satırlı şeridi dolar.
- **Ne zaman:** öneri yalnız sayfa geçişi (ince şerit); açılış perdesi isteğe bağlı. **Süre:** açılış en az 500, en çok 800 ms + 520 ms çıkış.
- **LCP/CLS:** en hafif seçenek, görsel yok, CLS 0. Not: tam ekran marka renkli bantlar K-236'ya göre yalnız ana sayfada kullanılabiliyor, bu yüzden açılış perdesi kural istisnası ister. **GSAP:** yok, saf CSS.

## D · Orman perdesi ve kâğıt yapraklar
Orman yeşili perdeye dört kâğıt kesimi yaprak farklı yönlerden süzülür, altta imza şeridi uzar; çıkarken perde kavisli alt kenarıyla yukarı kalkar, yapraklar daha hızlı uçar. Geçişte perde alttan gelir, yeni sayfa hazır olunca kalkar (Ravena/Penta tarzı, K-265).
- **Ne zaman:** ilk açılış + sayfa geçişi (tam perde; yalnız masaüstü önerilir). **Süre:** açılış en az 1000, en çok 1400 ms + 720 ms çıkış; geçişte gezinme en az ~1,2 sn sürer.
- **LCP/CLS:** CLS 0; en uzun bekleme bu seçenekte. Geçişte tıklamadan hemen sonra perde boyandığı için INP etkilenmez, ama hızlı sayfalarda bile gezinme yavaş hissedilir. **GSAP:** açılış saf CSS; geçiş GSAP zaman çizelgesi (masaüstünde zaten tembel yüklü chunk).

## Öneri
**Açılış: A** (resmî işaret, ≤ 1 sn, oturumda bir kez, `/` hariç) + **geçiş: C** (üstte ince üç renkli şerit, 150 ms eşiği). Marka işareti ilk izlenimi taşır, geçişler hızlı ve sessiz kalır. Daha gösterişli bir his istenirse geçişte yalnız masaüstü için D.
