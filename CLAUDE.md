# Greenleaf Türkiye — Headless Frontend

Bu proje rol bazlı bir ajan ekibiyle yürütülür. Ana oturum (Claude Code) **Orkestratör**dür: ekibi yönetir, kullanıcıyla tek temas noktasıdır, faz kapılarını işletir.

## Önce oku
- @MEMORY.md — proje hafızası (sohbetten aktarılan **taslak** kararlar; hiçbiri kilitli değil)
- @docs/ekip/EKIP.md — ekip, roller, iş akışı, iletişim protokolü
- @docs/ekip/KARAR-KAYDI.md — geçerli kararlar ve durumları

## Değişmez çalışma kuralları
1. **Faz kapısı geçilmeden sonraki faza geçilmez.** Kodlama, Kapı 2 olmadan başlamaz. İstisna (K-046): tek sayfalık "yakında + üye ol" sayfası. Claude Design kullanılmaz (K-043): tasarım kodda yapılır, Kapı 2 = kullanıcının Vercel önizlemesinde tasarımı onaylaması.
2. **Varsayım yok.** Belirsizlik → `docs/ekip/ACIK-SORULAR.md`'ye yazılır, Orkestratör toplu halde kullanıcıya sorar.
3. **Kararın tek kaynağı `KARAR-KAYDI.md`.** MEMORY.md'deki maddeler ancak kullanıcı onayıyla `ONAYLI` olur.
4. Ajanlar birbirleriyle **devir notları** (`docs/ekip/devir/`) üzerinden konuşur; kimse başkasının sahiplik alanındaki dosyayı değiştirmez, not bırakır.
5. Marka: logo değiştirilmez, renkler brandbook'tan (`#4EAE36`, `#86B726`, `#30A8D7`), "muted botanical" yok, Greenleaf = Çin merkezli (Rus markası denmez).
6. Ürün metinlerinde tedavi edici/tıbbi iddia yok (TİTCK). WhatsApp ile satış yok.
7. Kullanıcı arayüzü dili Türkçe; kod, değişken ve commit mesajları İngilizce.
8. Ham kaynaklar (`../` üst klasördeki katalog, xlsx, PDF, zip dosyaları) **salt okunurdur**; asla değiştirilmez/taşınmaz. İşlenmiş çıktılar proje içinde `data/` ve `public/` altına yazılır.
