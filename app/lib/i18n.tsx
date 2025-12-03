import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import en from "~/i18n/locales/en";
import ar from "~/i18n/locales/ar";
import he from "~/i18n/locales/he";

type LocaleKey = "en" | "ar" | "he";

const LOCALES: Record<LocaleKey, any> = { en, ar, he };

type I18nContextType = {
  locale: LocaleKey;
  setLocale: (l: LocaleKey) => void;
  t: (path: string, fallback?: string) => string;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleKey>(() => {
    try {
      const stored = localStorage.getItem("locale");
      if (stored === "ar" || stored === "he" || stored === "en") return stored;
    } catch (e) {
      /* ignore */
    }
    return "en";
  });

  useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch (e) {}
  }, [locale]);

  const dir = useMemo(
    () => (locale === "ar" || locale === "he" ? "rtl" : "ltr"),
    [locale]
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const setLocale = (l: LocaleKey) => setLocaleState(l);

  const t = (path: string, fallback = "") => {
    const parts = path.split(".");
    let cur: any = LOCALES[locale];
    for (const p of parts) {
      if (!cur) return fallback || path;
      cur = cur[p];
    }
    return typeof cur === "string" ? cur : fallback || path;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
