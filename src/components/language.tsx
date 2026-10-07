"use client";
import {
  useState,
  useEffect,
  type ReactNode,
  Children,
  createElement,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import {
  translate,
  setRuntimeLanguage,
  type Language,
  type Catalog,
} from "@/i18n/translation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { LanguageContext, useLanguage } from "./language-context";
export { useLanguage } from "./language-context";
export function LanguageProvider({
  children,
  initialLanguage = "en",
  initialCatalog = {},
}: {
  children: ReactNode;
  initialLanguage?: Language;
  initialCatalog?: Catalog;
}) {
  const [language, setLocale] = useState<Language>(initialLanguage),
    [catalog, setCatalog] = useState<Catalog>(initialCatalog),
    [pending, setPending] = useState(false);
  const router = useRouter();
  const t = useCallback(
    (text: string) => translate(text, language, catalog),
    [language, catalog],
  );
  useEffect(() => {
    document.documentElement.lang = language;
    setRuntimeLanguage(language, catalog);
    localStorage.setItem("asteria-language", language);
  }, [language, catalog]);
  async function setLanguage(next: Language) {
    if (next === language) return;
    setPending(true);
    try {
      const nextCatalog =
        next === "sw" ? (await import("@/i18n/sw.json")).default : {};
      setCatalog(nextCatalog);
      setLocale(next);
      setRuntimeLanguage(next, nextCatalog);
      document.cookie = `asteria_language=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
      localStorage.setItem("asteria-language", next);
      document.documentElement.lang = next;
      router.refresh();
    } finally {
      setPending(false);
    }
  }
  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, pending }}>
      {children}
    </LanguageContext.Provider>
  );
}
export function Text({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  return (
    <>
      {Children.map(children, (child) =>
        typeof child === "string" ? t(child) : child,
      )}
    </>
  );
}
export function LocalizedElement({
  as,
  ...props
}: {
  as: string;
  [key: string]: unknown;
}) {
  const { t } = useLanguage();
  for (const key of ["aria-label", "title", "alt", "placeholder"])
    if (typeof props[key] === "string") props[key] = t(props[key] as string);
  return createElement(as, props);
}
export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, pending, t } = useLanguage();
  return (
    <Select
      value={language}
      onValueChange={(v) => void setLanguage(v as Language)}
      disabled={pending}
    >
      <SelectTrigger
        aria-label={t(compact ? "Change language" : "Language")}
        className={compact ? "language-select-compact" : "language-select"}
      >
        {compact ? (
          <>
            <Languages aria-hidden="true" />
            <span className="sr-only"><SelectValue /></span>
          </>
        ) : <SelectValue />}
      </SelectTrigger>
      <SelectContent position="popper" align="end">
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="sw">Kiswahili</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
