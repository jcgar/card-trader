import es from "./i18n/es.json"
import en from "./i18n/en.json"

const translations = {
  es,
  en,
}

// You can add a function to set the current language if needed
let currentLanguage = "es"

export function setLanguage(lang: "es" | "en") {
  currentLanguage = lang
}

export function t(key: string, params: Record<string, any> = {}): string {
  const keys = key.split(".")
  let translation = translations[currentLanguage]

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

