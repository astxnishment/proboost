"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const DraftContext = createContext<Map<string, unknown> | null>(null);

// Drafts live only in this browser page's memory. A language-route transition
// can remount a calculator without losing its canonical order selections.
export function OrderDraftProvider({ children }: { children: ReactNode }) {
  const [drafts] = useState(() => new Map<string, unknown>());
  return <DraftContext.Provider value={drafts}>{children}</DraftContext.Provider>;
}

export function useOrderState<T>(key: string, initial: T | (() => T)) {
  const drafts = useContext(DraftContext);
  const state = useState<T>(() => drafts?.has(key) ? drafts.get(key) as T : typeof initial === 'function' ? (initial as () => T)() : initial);
  const [value] = state;
  useEffect(() => { drafts?.set(key, value); }, [drafts, key, value]);
  return state;
}
