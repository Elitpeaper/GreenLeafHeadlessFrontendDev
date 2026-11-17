import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
};

export function SectionHeading({ id, eyebrow, title, intro, tone = "light", align = "left" }: Props) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`font-display inline-flex items-center gap-2 text-sm ${dark ? "text-green-200" : "text-green-700"}`}
      >
        <span aria-hidden="true" className={`h-0.5 w-6 rounded-full ${dark ? "bg-brand-lime" : "bg-brand-green"}`} />
        {eyebrow}
      </p>
      <h2 id={id} className={`mt-3 text-4xl ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg ${dark ? "text-green-200" : "text-ink-muted"}`}>{intro}</p>}
    </div>
  );
}
