import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";

type Variant = "primary" | "secondary" | "onDark";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-pill font-medium text-center " +
  "transition-[translate,scale,background-color,color] duration-250 ease-standard motion-safe:active:scale-[0.98] " +
  "focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  // white on green-700 = 5.35:1, on green-800 (hover) = 7.70:1
  primary: "bg-green-700 text-white shadow-button hover:bg-green-800",
  // green-700 on white = 5.35:1
  secondary: "bg-white text-green-700 ring-1 ring-inset ring-line hover:bg-green-50",
  // ink on lime = 6.68:1
  onDark: "bg-brand-lime text-ink hover:bg-green-200 focus-visible:outline-brand-lime",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 py-2 text-sm",
  lg: "min-h-14 px-7 py-3 text-base",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  icon?: ReactNode;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", size = "lg", external, icon, className = "" }: Props) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      {external ? (
        <>
          <ArrowUpRight className="size-[1.15em] shrink-0 transition-transform duration-250 ease-out-expo motion-safe:group-hover/btn:translate-x-0.5 motion-safe:group-hover/btn:-translate-y-0.5" />
          <span className="sr-only"> (yeni sekmede açılır)</span>
        </>
      ) : (
        icon
      )}
    </a>
  );
}
