"use client";

import { useCallback, useEffect, useRef } from "react";
import { applyAccent, canRecolor, clearAccent, readTriggerAccent, type RecolorVars } from "./accent";

export interface AccentZoneOptions {
  /** ms before a hovered trigger recolors the zone (intent). Owner: hareket-tasarimcisi. */
  intentDelay?: number;
  /** ms after leaving the zone before colors return. */
  releaseDelay?: number;
  /** Extra elements that mirror the zone (Z1 mega menu -> Z2 header). Resolved lazily by id. */
  linkedIds?: string[];
  /** Turn the zone off (e.g. A/B preview toggle). */
  disabled?: boolean;
}

/**
 * Event-delegating recolor zone. Usage (hareket-tasarimcisi builds <RecolorZone> on top):
 *
 *   const zone = useAccentZone<HTMLElement>({ intentDelay: 120, releaseDelay: 200 });
 *   <section ref={zone.ref} data-accent-zone> … <a {...accentTriggerProps(p.accent)}>…</a> … </section>
 *
 * - triggers are any descendants with data-accent (see accentTriggerProps)
 * - mouse/pen hover only on fine pointers; keyboard :focus-visible on every device; touch never
 * - switching between triggers goes straight to the new palette (no reset in between)
 * - disabled under prefers-contrast: more / forced colors; stays on (smooth colour only) under reduced motion (K-231)
 */
export function useAccentZone<T extends HTMLElement>(options: AccentZoneOptions = {}) {
  const { intentDelay = 0, releaseDelay = 0, linkedIds, disabled = false } = options;
  const ref = useRef<T | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const linkedKey = linkedIds?.join("|") ?? "";

  const targets = useCallback((): HTMLElement[] => {
    const els: HTMLElement[] = ref.current ? [ref.current] : [];
    for (const id of linkedKey ? linkedKey.split("|") : []) {
      const el = document.getElementById(id);
      if (el) els.push(el);
    }
    return els;
  }, [linkedKey]);

  const activate = useCallback(
    (vars: Partial<RecolorVars>) => {
      for (const el of targets()) applyAccent(el, vars);
    },
    [targets],
  );
  const release = useCallback(() => {
    for (const el of targets()) clearAccent(el);
  }, [targets]);

  useEffect(() => {
    const zone = ref.current;
    if (!zone || disabled) return;
    const schedule = (fn: () => void, delay: number) => {
      window.clearTimeout(timer.current);
      timer.current = undefined;
      if (delay > 0) timer.current = window.setTimeout(fn, delay);
      else fn();
    };

    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !canRecolor("pointer")) return;
      const vars = readTriggerAccent(e.target as Element);
      if (vars) schedule(() => activate(vars), intentDelay);
    };
    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      schedule(release, releaseDelay);
    };
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as Element;
      if (!target.matches?.(":focus-visible") || !canRecolor("focus")) return;
      const vars = readTriggerAccent(target);
      if (vars) schedule(() => activate(vars), 0);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!zone.contains(e.relatedTarget as Node | null)) schedule(release, releaseDelay);
    };

    zone.addEventListener("pointerover", onPointerOver);
    zone.addEventListener("pointerleave", onPointerLeave);
    zone.addEventListener("focusin", onFocusIn);
    zone.addEventListener("focusout", onFocusOut);
    return () => {
      window.clearTimeout(timer.current);
      zone.removeEventListener("pointerover", onPointerOver);
      zone.removeEventListener("pointerleave", onPointerLeave);
      zone.removeEventListener("focusin", onFocusIn);
      zone.removeEventListener("focusout", onFocusOut);
      release();
    };
  }, [activate, release, intentDelay, releaseDelay, disabled]);

  return { ref, activate, release };
}
