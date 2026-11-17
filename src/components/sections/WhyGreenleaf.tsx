import type { ComponentType, SVGProps } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Family, Leaf, Tag } from "@/components/ui/icons";

type Reason = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
  /** brand color for the top band + tinted icon disc */
  band: string;
  tint: string;
};

// Copy: no medical/therapeutic claims, no income promises (CLAUDE.md §5–6).
export const REASONS: Reason[] = [
  {
    icon: Leaf,
    title: "Doğadan ilham alan içerikler",
    body: "Aloe vera, yeşil çay, zencefil, shea yağı ve bambu gibi bitkisel içerikleri günlük bakım rutininizle buluşturan formüller.",
    band: "bg-brand-green",
    tint: "bg-green-50",
  },
  {
    icon: Family,
    title: "Tüm aile için tek adres",
    body: "Yüz ve saç bakımından çocuk ürünlerine, el sabunundan bulaşık deterjanına kadar evin her köşesi için geniş bir yelpaze.",
    band: "bg-brand-lime",
    tint: "bg-lime-50",
  },
  {
    icon: Tag,
    title: "Açık ve anlaşılır fiyat",
    body: "Her üründe normal fiyatı ve üye fiyatını yan yana görürsünüz. Gizli fiyat yok, sürpriz yok.",
    band: "bg-brand-blue",
    tint: "bg-blue-50",
  },
];

export function WhyGreenleaf() {
  return (
    <section
      id="neden-greenleaf"
      aria-labelledby="neden-title"
      className="bg-[linear-gradient(180deg,var(--color-blue-50)_0%,#fff_100%)] py-section"
    >
      <div className="mx-auto max-w-page px-gutter">
        <div className="reveal">
          <SectionHeading
            id="neden-title"
            eyebrow="Neden Greenleaf"
            title="Doğaya saygılı, aileye yakın, fiyatı açık"
            align="center"
          />
        </div>
        <ul className="mt-stack grid gap-5 md:grid-cols-3 md:gap-6">
          {REASONS.map(({ icon: Icon, title, body, band, tint }) => (
            <li
              key={title}
              className="reveal overflow-hidden rounded-lg bg-white shadow-card ring-1 ring-line"
            >
              <div aria-hidden="true" className={`h-1.5 ${band}`} />
              <div className="p-6 md:p-7">
                <span className={`inline-flex size-14 items-center justify-center rounded-full text-green-700 ${tint}`}>
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-5 text-2xl text-ink">{title}</h3>
                <p className="mt-3 text-base text-ink-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
