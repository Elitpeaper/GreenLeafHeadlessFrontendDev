import type { ElementType } from "react";
import { cssVars } from "@/lib/css";
import { motion, type MotionId } from "@/lib/motion/ids";

/**
 * M-15 manifesto quote: words appear one after another once in view (35 ms step, capped at 30 words ≈ 1.05 s).
 * Server-split so the DOM never changes on the client. Screen readers read the plain sentence once.
 */
export function WordReveal({
  text,
  as: Tag = "p",
  point = "M-15",
  className = "",
}: {
  text: string;
  as?: ElementType;
  point?: MotionId;
  className?: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <Tag className={className} {...motion(point)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} data-motion-word="" style={{ display: "inline-block", ...cssVars({ "--motion-i": Math.min(i, 30) }) }}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}
