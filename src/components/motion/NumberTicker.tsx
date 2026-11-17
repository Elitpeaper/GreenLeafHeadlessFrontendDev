import { motion, type MotionId } from "@/lib/motion/ids";

/**
 * Counts up to `value` once when in view (≤ 800 ms; M-19 PV total). Server-rendered with the FINAL value:
 * no JS / reduced motion = static number. Width is reserved (tabular digits + min-width) so counting never
 * shifts layout. Screen readers get the final value once (visual digits are aria-hidden).
 * Inside a M-18 flow host the count starts when the first chip lands.
 */
export function NumberTicker({
  value,
  from = 0,
  decimals = 0,
  suffix,
  point = "M-19",
  className = "",
}: {
  value: number;
  from?: number;
  decimals?: number;
  suffix?: string;
  point?: MotionId;
  className?: string;
}) {
  const text = new Intl.NumberFormat("tr-TR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
  return (
    <span className={className}>
      <span className="sr-only">
        {text}
        {suffix ? ` ${suffix}` : ""}
      </span>
      <span
        aria-hidden="true"
        {...motion(point)}
        data-value={value}
        data-from={from}
        data-decimals={decimals}
        style={{ display: "inline-block", minWidth: `${text.length}ch`, fontVariantNumeric: "tabular-nums" }}
      >
        {text}
      </span>
      {suffix ? <span aria-hidden="true"> {suffix}</span> : null}
    </span>
  );
}
