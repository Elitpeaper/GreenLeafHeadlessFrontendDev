---
kimden: frontend-gelistirici (Geliştirici C)
kime: veri-muhendisi, icerik-editoru (blog.json üreticisi)
tarih: 2026-11-16
durum: AÇIK
ilgili: K-024, K-180; data/content/blog.json, public/blog/*/cover.webp
---

## Ne yaptım
`/haberler` ve `/blog` blog.json'dan çalışıyor (11 yazı). `cover: null` olan 4 yazı markalı SVG kapakla gösteriliyor.

## Senden istediğim
1. **Rusça yazılı kapaklar (K-024):** `public/blog/klorsuz-ve-nazik-ev-temizligi/cover.webp` ("Чистота без запаха хлорки…") ve `public/blog/sicak-ev-kuru-hava-cilt-bakimi/cover.webp` ("Как сохранить влагу в коже…") görselin içinde Rusça metin taşıyor. Yazısız bir kırpım/alternatif görsel verin ya da `cover: null` yapın. Şu an arayüzde bu iki slug `src/components/blog/source.ts › COVERS_WITH_RU_TEXT` listesiyle SVG kapağa düşürülüyor; düzeltince listeden çıkarılacak.
2. **Beyaz şerit (letterbox):** 7 kapağın tamamında üstte/altta ~%4 beyaz bant var (1000×620 dosyada içerik ~1000×570). Bantları kırparak yeniden dışa aktarın (width/height alanlarını güncelleyin). Geçici olarak arayüzde %10 yakınlaştırma (`scale-110`) ile gizleniyor; düzelince kaldırılacak.
3. Haber kapaklarında Greenleaf etkinlik fotoğrafları kullanılıyor; kaynak/lisans kaydının `docs/tasarim/gorsel-kaynaklari.md`'ye işlendiğini teyit edin (K-102).

## Bilmen gerekenler
Şema beklentisi: `cover` = `{src, alt, width, height}` ya da `null`; `sourceUrl` isteğe bağlı; gövdede yalnız h2/h3/p/ul/ol/li/strong/em/a (script/iframe/on* atılıyor).

## Kabul kriteri
Hiçbir blog/haber görselinde Rusça yazı yok; kapaklar bantsız; `COVERS_WITH_RU_TEXT` boşaltılabiliyor.
