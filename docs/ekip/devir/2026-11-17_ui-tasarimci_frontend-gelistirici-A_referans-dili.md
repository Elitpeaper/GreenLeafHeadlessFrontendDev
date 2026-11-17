---
kimden: ui-tasarimci
kime: frontend-gelistirici (A)
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-185 (ONAYLI), K-186…K-189 (ÖNERİ), S-066, docs/tasarim/referans/REFERANS-CIKARIM.md, tasarim-kurallari.md v1.2 §2.7 §6 §9.6
---

## Ne yaptım
Kullanıcının seçtiği referansı (K-185) çıkardım. Vitrin yüzeyleri orman zeminli, krem/kum/toprak ikincil nötrler, karo/rozet/panel sistemi, sol üst ışıklı yumuşak uzun gölgeler. tokens.json v1.2 **yalnız ekleme**; hiçbir mevcut sınıf değişmedi. Yeni Tailwind sınıfları: `bg-forest-600/700/800`, `bg-cream-50/100/200`, `text-cream-100/200`, `bg-sand-300/400`, `bg-earth-500…900`, `rounded-tile`, `rounded-panel`, `shadow-tile`, `shadow-tile-hover`, `shadow-long`, `shadow-badge`, `shadow-cta-cream`, `shadow-card-on-forest`. Gradyanlar henüz CSS değişkeni değil (frontend-mimar'a not); şimdilik `tokens.json › gradient.*` değerini birebir kullan.

## Senden istediğim (senin alanın)
1. **Footer (K-189, K-078'in yerine):** `gradient.forest-deep` zemin + `<TextureGrain strength={0.12}/>` arka katman; `rounded-t-panel`; metin `text-cream-100`, başlıklar `text-cream-200`; logo beyaz yuvarlak plakada (logo yalnız beyaz zeminde); "Çok yakında" rozetleri değişmez (açık hap); en altta imza bandı.
2. **Ürün kartı (K-200 korunur):** medya karosu radius `rounded-tile`; hover gölgesi `shadow-tile`. Kart hep beyaz; fiyat/rozet/PV değişmez. Kart orman zemine düşerse (mega menü tanıtım alanı) beyaz plaka + `shadow-card-on-forest`.
3. **Mega menü tanıtım karosu:** `gradient.tile-earth` veya orman zemin + `IconBadge` (`@/components/illustrations`); öne çıkan ürün kartı beyaz plakada.
4. **Kategori / `/urunler` / arama başlığı:** S-066 cevabını bekle. Önerim (b): 160–220 px orman başlık bandı (`gradient.forest-hero` + grain), H1 `text-cream-200`, kök kategori `IconBadge tone="cream"`-benzeri disk içinde ikon; ızgara beyaz/cream-50 zeminde. Cevap gelene kadar mevcut hâli bozma.
5. Header beyaz kalır (değişiklik yok).

## Bilmen gerekenler
- Orman/toprak zeminde metin eşleşmeleri ve yasaklar: tasarim-kurallari §2.7 (ör. forest-500 ve earth-500 üstünde metin yok; orman zeminde fiyat yok).
- Bir ekranda en çok 1 doku + 1 desen; doku metin plakasının içine değil bölüm zeminine.
- Kütüphane: `/svg-kutuphanesi` → "Referans dili" grubu.

## Kabul kriteri
Footer ve kart K-189/§7.4'e uygun; TASARIM-INCELEME-1'de bu maddeler "uygun" çıkar.
