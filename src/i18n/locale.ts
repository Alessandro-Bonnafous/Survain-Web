import { watch } from 'vue'
import { i18n, SUPPORTED_LOCALES, type SupportedLocale } from './index'

/** Clé de stockage du choix de langue de l'utilisateur. */
export const LOCALE_STORAGE_KEY = 'survain.locale'

/** Garde de type : `value` est-il une locale supportée ? */
export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

/**
 * Lit la locale persistée. Renvoie `null` si absente, invalide ou si le
 * stockage n'est pas disponible (rendu SSR de vite-ssg).
 */
export function readStoredLocale(): SupportedLocale | null {
  if (typeof localStorage === 'undefined') return null
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  return isSupportedLocale(stored) ? stored : null
}

/**
 * Persiste la locale et synchronise l'attribut `lang` du document.
 * No-op côté serveur (pas de `localStorage` / `document`).
 */
export function persistLocale(value: SupportedLocale): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LOCALE_STORAGE_KEY, value)
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = value
  }
}

/**
 * Initialisation côté client : applique la locale stockée si présente, puis
 * garde le stockage et l'attribut `lang` synchronisés à chaque changement.
 * À appeler uniquement quand `isClient` est vrai (cf. `main.ts`).
 */
export function restoreLocale(): void {
  const locale = i18n.global.locale
  const stored = readStoredLocale()
  if (stored) {
    locale.value = stored
  }
  persistLocale(locale.value as SupportedLocale)
  watch(locale, (next) => {
    if (isSupportedLocale(next)) {
      persistLocale(next)
    }
  })
}
