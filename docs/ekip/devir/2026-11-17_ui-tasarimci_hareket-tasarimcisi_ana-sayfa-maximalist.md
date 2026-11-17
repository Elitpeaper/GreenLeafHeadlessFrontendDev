---
kimden: ui-tasarimci
kime: hareket-tasarimcisi
tarih: 2026-11-17
durum: KAPANDI (hareket-tasarimcisi 2026-11-17, bkz. hareket.md v3 §23–§24; uygulama devri: 2026-11-17_hareket-tasarimcisi_frontend-gelistirici_motion-v3.md)
ilgili: K-233, K-231, K-238, K-239, K-242 (ÖNERİ), S-067, briefler/ana-sayfa-maximalist.md §2.6, §3, §10; tokens.json `heroIntro`
---

## Ne yaptım
K-233 hero girişinin yerini ve bütçesini belirledim, nasıl hareket edeceğini tarif etmedim. Logo, resmî `greenleaf-mark.svg` (yuvarlak, kendi beyaz diski var) olarak hero'da 136 / 88 px boyutunda, metin sütununun sol üstünde duruyor. Son pozu 0°. Bütçe: logo ≤ 900 ms, H1 opacity 600 ms, toplam ≤ 1,6 sn, saf CSS.

## Senden istediğim
Brief'teki şu hareket noktalarının zamanlamasını ve eğrilerini `hareket.md`'ye yaz:
- H-1…H-5: logonun yuvarlanma girişi (dönüş miktarı kat edilen mesafeyle tutarlı olsun), H1 fade, kademeli metin, kolaj katmanları, Dev şeridin dolması.
- S-1: Dev şeridin kaydırmaya bağlı zıt yönlü kayması.
- V-1: Vitrin 2'de sekmeye göre değişen dev ikon.
- §10'daki SVG etkileşim haritası.
- Otomatik geçişin girişten sonra başlaması (K-238).
- Oturum içinde ana sayfaya dönüşte girişin tekrar etmemesi (S-067 b önerisi).

## Bilmen gerekenler
- Logo çizimi, rengi ve oranı değişmez. Döngüye girmez, hover'da dönmez.
- Azaltılmış harekette yalnız yumuşak opaklık kalır (K-231).
- H1 LCP adayı. Ölçülen mobil LCP 2,5 sn'yi aşarsa yedek plan `heroIntro.lcpFallback`.
- Aynı ekranda en çok 2 sürekli hareket olmalı (hero saati ve marka marquee'si ayrı ekranlarda).

## Kabul kriteri
Hareketler gerçek tarayıcıda kaydedilsin: tam katman, yumuşak katman ve JS kapalı olmak üzere üç durum. Her durumda son poz çizimle birebir olmalı ve içerik eksiksiz görünmeli. CLS ≤ 0,1, LCP ≤ 2,5 sn.
