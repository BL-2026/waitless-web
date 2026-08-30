import { createContext, useContext, useState, type ReactNode } from "react";
import { STRINGS, type Strings } from "../translations/translations";
import type { LanguageCode } from "../types";

// This interface is the contract: anything reading this context is
// guaranteed to get exactly these three fields, with these types.
interface LanguageContextValue {
  language: LanguageCode | null;
  setLanguage: (lang: LanguageCode) => void;
  t: Strings | null;
}

// The generic <LanguageContextValue | null> tells createContext what
// shape the value will eventually be, even though it starts as null
// before any Provider sets it.
const LanguageContext = createContext<LanguageContextValue | null>(null);

// "ReactNode" is TypeScript's built-in type for "anything React can
// render" — text, elements, lists of elements, etc. It's the correct
// type for a "children" prop.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode | null>(null);

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
