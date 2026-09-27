import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type Lang = "de" | "en"
export const LANGS: Lang[] = ["de", "en"]

/** A text available in both languages, e.g. { "de": "Hallo", "en": "Hello" }. */
export type Localized = Record<Lang, string>
/** Plain strings (same in both languages) or a localized object. */
export type Text = string | Localized

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (text: Text | null | undefined) => string
  formatMonth: (yyyymm: string) => string
}

const LangContext = createContext<LangContextValue | null>(null)

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem("lang")
    if (stored === "de" || stored === "en") return stored
  } catch {
    // storage unavailable
  }
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "de"
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem("lang", next)
    } catch {
      // storage unavailable
    }
  }, [])

  const value = useMemo<LangContextValue>(() => {
    const locale = lang === "de" ? "de-DE" : "en-GB"
    const monthFmt = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" })
    return {
      lang,
      setLang,
      t: (text) => (text == null ? "" : typeof text === "string" ? text : text[lang] ?? text.de),
      formatMonth: (yyyymm) => {
        const [y, m] = yyyymm.split("-").map(Number)
        return monthFmt.format(new Date(y, (m || 1) - 1, 1))
      },
    }
  }, [lang, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>")
  return ctx
}
