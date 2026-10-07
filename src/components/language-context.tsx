"use client";
import { createContext, useContext } from "react";
import type { Language } from "@/i18n/translation";
export const LanguageContext = createContext<{
  language: Language;
  t: (text: string) => string;
  setLanguage: (language: Language) => Promise<void>;
  pending: boolean;
}>({
  language: "en",
  t: (s) => s,
  setLanguage: async () => {},
  pending: false,
});
export const useLanguage = () => useContext(LanguageContext);
export function useLocalizedProps<T extends object>(props: T): T {
  const { t } = useLanguage();
  const result = { ...props } as Record<string, unknown>;
  for (const key of ["aria-label", "title", "alt", "placeholder"])
    if (typeof result[key] === "string") result[key] = t(result[key]);
  return result as T;
}
