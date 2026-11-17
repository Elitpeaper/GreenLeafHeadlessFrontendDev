/** Brandbook signature: green / lime / blue horizontal bands (cover + letterhead bottom edge). */
export function BrandStripe({ animate = "none", className = "" }: { animate?: "none" | "load" | "scroll"; className?: string }) {
  const motion = animate === "load" ? "stripe-grow" : animate === "scroll" ? "reveal-stripe" : "";
  return (
    <div aria-hidden="true" className={`brand-stripe ${motion} ${className}`}>
      <span />
      <span />
      <span />
    </div>
  );
}
