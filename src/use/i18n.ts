import es from "./i18n/es.json"
import en from "./i18n/en.json"

const translations = {
  es,
  en,
}

// Get initial language from localStorage or default to 'es'
const getInitialLanguage = (): "es" | "en" => {
  const saved = localStorage.getItem("language")
  return (saved === "es" || saved === "en") ? saved : "es"
}

let currentLanguage = getInitialLanguage()

export function setLanguage(lang: "es" | "en") {
  currentLanguage = lang
  localStorage.setItem("language", lang)
}

export function getCurrentLanguage(): "es" | "en" {
  return currentLanguage
}

export function t(key: string, params: Record<string, any> = {}): string {
  const keys = key.split(".")
  let translation: any = translations[currentLanguage]

  for (const k of keys) {
    if (translation[k] === undefined) {
      return key
    }
    translation = translation[k]
  }

  if (typeof translation === "string") {
    Object.keys(params).forEach((param) => {
      translation = translation.replace(`{{${param}}}`, params[param])
    })
    return translation
  }

  return key
}