"use client";

import { useEffect, useId, useState } from "react";
import { motionTier, onMotionTier, setMotionChoice } from "@/lib/motion/preference";

/**
 * "Hareketi azalt" switch (K-264). The site opens with full motion whatever the OS setting; this visible control lets a
 * visitor choose the gentle tier, saved in localStorage (gl-motion) and applied live (CSS, runtime, Lenis, GSAP all
 * follow html[data-motion]). Labels come from the server component that renders it (Footer).
 *   <MotionToggle label={t("motion.toggle.label")} hint={t("motion.toggle.hint")} />
 */
export function MotionToggle({ label, hint, className = "" }: { label: string; hint?: string; className?: string }) {
  const hintId = useId();
  // SSR renders "off" (not pressed); the real state is read after mount, so hydration never mismatches
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const sync = () => setReduced(motionTier() !== "on");
    sync();
    return onMotionTier(sync);
  }, []);

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={reduced}
        aria-describedby={hint ? hintId : undefined}
        onClick={() => setMotionChoice(reduced ? "on" : "reduced")}
        data-motion-toggle=""
        className="group/mt inline-flex min-h-tap-min items-center gap-3 rounded-pill text-sm font-medium text-cream-100 transition-colors duration-250 hover:text-white"
      >
        <span
          aria-hidden="true"
          className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-pill bg-cream-100/25 ring-1 ring-cream-100/40 transition-colors duration-250 group-aria-checked/mt:bg-lime-200"
        >
          <span data-motion-toggle-knob="" className="ml-0.5 size-5 rounded-full bg-cream-50 shadow-xs group-aria-checked/mt:bg-forest-900" />
        </span>
        {label}
      </button>
      {hint && (
        <span id={hintId} className="sr-only">
          {hint}
        </span>
      )}
    </span>
  );
}
