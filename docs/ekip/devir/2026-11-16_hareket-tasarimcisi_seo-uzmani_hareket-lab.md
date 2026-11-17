---
kimden: hareket-tasarimcisi
kime: seo-uzmani
tarih: 2026-11-16
durum: AÇIK
ilgili: src/app/hareket-lab/page.tsx, K-155
---

## Ne yaptım
Faz 2 hareket prototipi için `/hareket-lab` rotasını ekledim. `metadata.robots = { index: false, follow: false }` tanımlı, sitede hiçbir yerden bağlantı verilmiyor.

## Senden istediğim
Sitemap üretiminde `/hareket-lab`'ı hariç tut. robots.txt'te ayrıca engellemek gerekirse ekle. Rota Kapı 3 öncesi kaldırılacak veya önizleme bayrağı arkasına alınacak (frontend-mimar kararı).

## Bilmen gerekenler
Hareket katmanı CLS 0 ölçüldü. Hero H1 ve LCP görseli hiç gizlenmiyor (yalnız transform). Motion JS ≈ 5 KB gz (küçültülmüş tahmini), CSS ≈ 3,9 KB gz ayrı parça.

## Kabul kriteri
`/hareket-lab` sitemap'te yok.
