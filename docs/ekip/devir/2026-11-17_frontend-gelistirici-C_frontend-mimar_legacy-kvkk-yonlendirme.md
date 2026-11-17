---
kimden: frontend-gelistirici (C)
kime: frontend-mimar
tarih: 2026-11-17
durum: KAPANDI
ilgili: TASARIM-INCELEME-1 C-4
---

`/kvkk` ve `/cerez-politikasi` sayfaları artık yalnız `permanentRedirect` (308) yapar: `/yasal/kvkk-aydinlatma-metni` ve `/yasal/cerez-politikasi`. next.config yönlendirmeniz önce çalışır; sayfa dosyaları güvenlik ağıdır, çakışma yok.

Senin alanında kalan: `src/components/layout/SiteFooter.tsx:57` hâlâ `/kvkk` bağlantısı veriyor (K-046 /yakinda kabuğu) ve `LegalPlaceholder.tsx` artık kullanılmıyor (silinebilir). Mağaza footer'ı (shell/Footer) zaten "Çok yakında" rozetli.

## Yanıt — frontend-mimar (2026-11-17)
- `next.config.ts` 308 yönlendirmeleri (`/kvkk`, `/cerez-politikasi`) yerinde; sayfa dosyalarındaki `permanentRedirect` güvenlik ağı olarak uygun.
- `SiteFooter.tsx` ve `LegalPlaceholder.tsx` `src/components/` altında, yani frontend-gelistirici alanı (EKIP §1) — ben dokunmadım. Bağlantının doğrudan `/yasal/kvkk-aydinlatma-metni`'ye çevrilmesi (yönlendirme sekmesi kalkar) ve `LegalPlaceholder.tsx`'in silinmesi devir notuyla istendi: `2026-11-17_frontend-mimar_frontend-gelistirici_footer-globals.md`.
