"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_FONT, FONT_OPTIONS, type FontKey } from "@/lib/fonts";

/**
 * Font comparison pill (K-042). Visible ONLY when the URL has ?font=… (K-181: no dev widgets in the presented UI).
 * Remove once the user has chosen a font.
 */
const EVENT = "gl-font-change";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

function getSnapshot(): string {
  if (!new URLSearchParams(window.location.search).has("font")) return "";
  return document.documentElement.getAttribute("data-font") ?? DEFAULT_FONT;
}

const getServerSnapshot = () => "";

function apply(key: FontKey) {
  document.documentElement.setAttribute("data-font", key);
  try {
    sessionStorage.setItem("gl-font", key);
  } catch {}
  const url = new URL(window.location.href);
  url.searchParams.set("font", key);
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(EVENT));
}

export function FontSwitcher() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!current) return null;

  return (
    <div
      role="group"
      aria-label="Yazı tipi"
      className="fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-pill bg-ink/90 p-1 text-xs text-white shadow-lift backdrop-blur"
    >
      <span className="px-2 text-green-200">Yazı tipi</span>
      {FONT_OPTIONS.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => apply(f.key)}
          aria-pressed={current === f.key}
          className="rounded-pill px-3 py-1.5 transition-colors hover:bg-white/15 aria-pressed:bg-white aria-pressed:text-ink"
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
