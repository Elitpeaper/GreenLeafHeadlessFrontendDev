"use client";

import { useEffect } from "react";
import "./motion.css";

// URL of the full page load (module evaluated once, with the first-load chunks): the deferred runtime compares
// against it so a client navigation made before the runtime arrived still cancels the hero intro (K-244).
const bootHref = typeof location === "undefined" ? "" : location.href.split("#")[0];

/**
 * Client island of the motion layer: renders nothing, wires every [data-motion] / [data-accent-zone] globally.
 * The runtime itself is a lazy chunk (K-263 budget): it only touches elements after window "load" + an idle slot
 * anyway (hydration rule), so it is imported then. Until it runs nothing is hidden: the reveal CSS waits for
 * html[data-motion-runtime], which the runtime sets. A failed chunk leaves the page static and fully visible.
 */
export function MotionRuntime() {
  useEffect(() => {
    let live = true;
    let stop: (() => void) | undefined;
    let cancel = () => {};
    const run = () => {
      import("@/lib/motion/runtime")
        .then(({ startMotionRuntime }) => {
          if (live) stop = startMotionRuntime({ bootHref });
        })
        .catch(() => {});
    };
    const idle = () => {
      if (typeof window.requestIdleCallback === "function") {
        const id = window.requestIdleCallback(run, { timeout: 700 });
        cancel = () => window.cancelIdleCallback(id);
      } else {
        const id = window.setTimeout(run, 200);
        cancel = () => window.clearTimeout(id);
      }
    };
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
    return () => {
      live = false;
      window.removeEventListener("load", idle);
      cancel();
      stop?.();
    };
  }, []);
  return null;
}
