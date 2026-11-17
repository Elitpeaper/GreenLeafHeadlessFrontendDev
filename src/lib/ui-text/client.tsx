"use client";

/**
 * Client-side UI copy accessor. The dictionary is NOT imported here (that shipped ~10 KB gz of JSON in the shared
 * client chunk); the server picks the needed keys (`pickClientText`) and passes them to <UiTextProvider>.
 * A missing key returns the key itself, same as the server `t()` — a test (`client-keys.test.ts`) keeps that from happening.
 */
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { lookup, plural, type TextDict, type TextVars } from "./fill";

const Ctx = createContext<TextDict>({});

export function UiTextProvider({ dict, children }: { dict: TextDict; children: ReactNode }) {
  return <Ctx.Provider value={dict}>{children}</Ctx.Provider>;
}

export function useT() {
  const dict = useContext(Ctx);
  return useMemo(
    () => ({
      t: (key: string, vars?: TextVars) => lookup(dict, key, vars),
      tc: (base: string, count: number, vars?: TextVars) => plural(dict, base, count, vars),
    }),
    [dict],
  );
}
