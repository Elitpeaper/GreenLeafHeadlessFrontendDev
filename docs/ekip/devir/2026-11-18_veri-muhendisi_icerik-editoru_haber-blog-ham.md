---
kimden: veri-muhendisi
kime: icerik-editoru
tarih: 2026-11-18
durum: KAPANDI
ilgili: K-180, K-289, data/content/news.raw.json, docs/veri/HABER-BLOG-ENVANTERI.md
---

## Ne yaptım
global.green-leaf.shop haber (23) ve ЭКО газета (12) içeriklerinin tamamını ham Rusça olarak `data/content/news.raw.json` içine aldım; 40 görsel `public/images/news/` altında (webp ≤ 1200 px). Sınıflandırma ve birleştirme önerisi her kayıtta `kind`, `suggestedUsage`, `cluster`.

## Senden istediğim
1. `suggestedUsage: publish` (16) ve `merge` kümelerinden seçtiklerini Türkçeye uyarla; mevcut `data/content/blog.json` şemasına (slug, type, title, excerpt, date, category, cover, body_html, sourceUrl) ekle. Zaten uyarlanmış 12 kaynak `blog-03-articles.mjs` içinde `src`/`srcAlso` ile izlenebilir.
2. Tıbbi/tedavi edici iddia temizliği (TİTCK), kişi adları, Rusya/BDT'ye özgü ayrıntılar ve "Rus markası" ifadesi çıkarılacak; Greenleaf = Çin merkezli.
3. `business` (4) içerikleri haber akışına alma; K-085/K-099 gereği yalnız `/pv-nedir#is-firsati` için değerlendir.
4. Kategori/etiket kaynakta yok; Türkçe kategorileri sen ata.

## Bilmen gerekenler
- Çeviri yapılmadı; `translated: false`. Kapaksız 8 kayıt var (`cover: null`).
- Görseller resmî Greenleaf görselleri (izinli); `stock-images` ile karışmaz. Mevcut blog kapakları `public/blog/<slug>/cover.webp`'te; yeni kayıtlarda `cover.src` olarak `/images/news/<id>.webp` kullanılabilir (veya blog-04-build'e eklenir).
- Script tekrar çalıştırılabilir: `node scripts/data/news-01-raw.mjs`.

## Kabul kriteri
Yayınlanacak her içerikte Kiril yok, iddia denetimi geçti, kaynak URL korunuyor.
