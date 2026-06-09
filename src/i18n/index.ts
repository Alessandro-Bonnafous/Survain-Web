import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'
import frGameplay from './locales/fr/gameplay.json'
import enGameplay from './locales/en/gameplay.json'
import enToolsItems from './locales/en/tools-items.json'

export const SUPPORTED_LOCALES = ['fr', 'en'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: SupportedLocale = 'fr'

// Le contenu volumineux vit dans des fichiers dédiés par locale, fusionnés dans
// leurs namespaces : `gameplay`, et `tools.items` (lexique EN des noms d'items ;
// le FR utilise les valeurs brutes des données, cf. `tv`/`tvi` côté pages).
export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'en',
  messages: {
    fr: { ...fr, gameplay: frGameplay },
    en: { ...en, gameplay: enGameplay, tools: { ...en.tools, items: enToolsItems } },
  },
})
