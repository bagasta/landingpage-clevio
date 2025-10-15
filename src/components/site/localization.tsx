"use client";

import { createContext, useContext, useState } from "react";

export type Locale = "id" | "en";

export interface LocalizedString {
  id: string;
  en: string;
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "id",
  setLocale: () => undefined,
});

export function LanguageProvider({
  children,
  defaultLocale = "id",
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  return <LanguageContext.Provider value={{ locale, setLocale }}>{children}</LanguageContext.Provider>;
}

export function useLocale() {
  return useContext(LanguageContext);
}

export function t(copy: LocalizedString, locale: Locale) {
  return locale === "en" ? copy.en : copy.id;
}
