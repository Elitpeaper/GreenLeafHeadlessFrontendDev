"use client";

/**
 * Shared open state of the "Keşfet" all-pages panel (K-266). Three entry points open the same panel: sub-nav trigger,
 * compact-header compass button, mega menu footer link. `trigger` remembers the element to return focus to on Esc.
 */
import { create } from "zustand";

interface ExploreState {
  open: boolean;
  trigger: HTMLElement | null;
  show: (trigger?: HTMLElement | null) => void;
  hide: (returnFocus?: boolean) => void;
  toggle: (trigger?: HTMLElement | null) => void;
}

export const useExplore = create<ExploreState>((set, get) => ({
  open: false,
  trigger: null,
  show: (trigger = null) => set({ open: true, trigger }),
  hide: (returnFocus = false) => {
    const { trigger } = get();
    set({ open: false });
    if (returnFocus) trigger?.focus();
  },
  toggle: (trigger = null) => (get().open ? get().hide() : set({ open: true, trigger })),
}));
