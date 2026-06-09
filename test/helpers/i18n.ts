import { createI18n } from 'vue-i18n'
import fr from '@/i18n/locales/fr.json'
import en from '@/i18n/locales/en.json'
import frGameplay from '@/i18n/locales/fr/gameplay.json'
import enGameplay from '@/i18n/locales/en/gameplay.json'
import enToolsItems from '@/i18n/locales/en/tools-items.json'

/**
 * Crée une instance i18n de test avec les mêmes messages fusionnés que
 * l'application (dont le namespace `gameplay`). Instance fraîche par appel pour
 * isoler l'état de locale entre les tests.
 */
export function createTestI18n(locale: 'fr' | 'en' = 'fr') {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages: {
      fr: { ...fr, gameplay: frGameplay },
      en: { ...en, gameplay: enGameplay, tools: { ...en.tools, items: enToolsItems } },
    },
  })
}
