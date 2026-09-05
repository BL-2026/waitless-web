import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { STRINGS, type Strings } from "../translations/translations";
import type { LanguageCode } from "../types";

const STORAGE_KEY = "waitless-language";

interface LanguageContextValue {
  language: LanguageCode | null;
  setLanguage: (lang: LanguageCode) => void;
  t: Strings | null;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "en" || value === "fr" || value === "es" || value === "ar";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return isLanguageCode(stored) ? stored : null;
  });

  useEffect(() => {
    document.documentElement.lang = language ?? "en";
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  function setLanguage(lang: LanguageCode) {
    window.sessionStorage.setItem(STORAGE_KEY, lang);
    setLanguageState(lang);
  }

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: language ? STRINGS[language] : null,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside a LanguageProvider");
  }
  return context;
}
