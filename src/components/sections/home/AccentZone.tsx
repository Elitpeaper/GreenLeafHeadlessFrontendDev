import type { ReactNode } from "react";
import { RecolorZone } from "@/components/motion/RecolorZone";

/**
 * Z3 home showcase zone (hover-recolor.md) — thin wrapper over hareket-tasarimcisi's <RecolorZone kind="showcase">
 * (events + timing live in the global MotionRuntime). Cards are triggers via their own data-accent.
 * `linkHeader` mirrors the palette on the header band (Z2) — preview option premium-tema.md §B2.
 */
export function AccentZone({
  as = "section",
  className,
  children,
  linkHeader = false,
  ...rest
}: {
  as?: "section" | "div";
  className?: string;
  children: ReactNode;
  linkHeader?: boolean;
  "aria-labelledby"?: string;
  id?: string;
}) {
  return (
    <RecolorZone kind="showcase" as={as} link={linkHeader ? ["header-accent"] : undefined} className={className} {...rest}>
      {children}
    </RecolorZone>
  );
}
