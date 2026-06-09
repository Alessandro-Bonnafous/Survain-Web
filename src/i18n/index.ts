import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'
import frGameplay from './locales/fr/gameplay.json'
import enGameplay from './locales/en/gameplay.json'

export const SUPPORTED_LOCALES = ['fr', 'en'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: SupportedLocale = 'fr'

// Le contenu volumineux (gameplay) vit dans des fichiers dédiés par locale,
// fusionnés sous le namespace `gameplay`.
export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'en',
  messages: {
    fr: { ...fr, gameplay: frGameplay },
    en: { ...en, gameplay: enGameplay },
  },
})
