import { BrandStripe } from "@/components/brand/BrandStripe";
import { LeafCluster } from "@/components/brand/LeafCluster";
import { siteReady } from "@/components/coming-soon/placeholders";
import { MembershipCta } from "@/components/membership/MembershipCta";
import { t } from "@/lib/ui-text";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check } from "@/components/ui/icons";
import { site } from "@/config/site";

// No income/earnings promises — membership is presented purely as a shopping benefit.
const BENEFITS = [
  { title: "Üyelere özel fiyat", body: "Satıştaki tüm ürünlerde normal fiyat yerine üye fiyatından alışveriş yaparsınız." },
  {
    title: "Birebir destek",
    body: siteReady.sellerName
      ? `${site.sellerName} ürün seçiminden siparişe kadar her adımda size yardımcı olur.`
      : "Ürün seçiminden siparişe kadar her adımda size yardımcı oluruz.",
  },
  { title: "Tüm aile için tek üyelik", body: "Cilt bakımından ev temizliğine, ihtiyacınız olan her üründe aynı avantaj." },
];

const STEPS = [
  { title: "“Üye ol” düğmesine tıklayın", body: "Kayıt sayfası yeni sekmede açılır." },
  { title: "Kayıt formunu doldurun", body: "Birkaç temel bilgiyle üyeliğiniz oluşturulur." },
  { title: "Üye fiyatıyla alışveriş yapın", body: "Sorunuz olursa bize her zaman ulaşabilirsiniz." },
];

export function Membership() {
  return (
    <section id="uyelik" aria-labelledby="uyelik-title" className="py-section">
      <div className="mx-auto max-w-page px-gutter">
        <div className="reveal relative isolate overflow-hidden rounded-xl bg-green-900 shadow-lift">
          <LeafCluster
            tone="onDark"
            className="pointer-events-none absolute -right-24 -top-10 -z-10 w-[34rem] max-w-none opacity-90 md:-right-10 md:w-[40rem]"
          />
          <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-[1.1fr_1fr] md:gap-12 md:p-14">
            <div>
              <SectionHeading
                id="uyelik-title"
                eyebrow="Üyelik"
                tone="dark"
                title="Üye olun, her alışverişte üye fiyatından yararlanın"
              />
              <ul className="mt-8 space-y-5">
                {BENEFITS.map((b) => (
                  <li key={b.title} className="flex gap-4">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-lime text-ink">
                      <Check className="size-5" />
                    </span>
                    <div>
                      <p className="font-medium text-white">{b.title}</p>
                      <p className="mt-1 text-base text-green-200">{b.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="self-center rounded-lg bg-white p-6 text-ink shadow-card md:p-8">
              <h3 className="text-2xl">Nasıl üye olunur?</h3>
              <ol className="mt-6 space-y-5">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="font-display inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-base text-green-700 ring-1 ring-green-200"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium">{s.title}</p>
                      <p className="mt-0.5 text-sm text-ink-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <MembershipCta href={site.sponsorLink} source="yakinda-membership" label="Üye ol – üyelere özel fiyatla alışveriş" newTabLabel={t("common.opensNewTab")} />
              </div>
            </div>
          </div>
          <BrandStripe animate="scroll" />
        </div>
      </div>
    </section>
  );
}
