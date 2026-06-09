import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import fr from '@/i18n/locales/fr.json'
import en from '@/i18n/locales/en.json'
import Gameplay from '@/pages/gameplay.vue'

function mountGameplay(locale: 'fr' | 'en' = 'fr') {
  const i18n = createI18n({ legacy: false, locale, fallbackLocale: 'en', messages: { fr, en } })
  return mount(Gameplay, { global: { plugins: [i18n] } })
}

describe('page Gameplay', () => {
  it('rend un onglet par catégorie', () => {
    const wrapper = mountGameplay()
    expect(wrapper.findAll('.gameplay__tab')).toHaveLength(4)
  })

  it('affiche les chapitres de la première catégorie par défaut', () => {
    const wrapper = mountGameplay()
    expect(wrapper.text()).toContain('Les Contrées')
  })

  it('change de catégorie au clic sur un onglet', async () => {
    const wrapper = mountGameplay()
    const tabs = wrapper.findAll('.gameplay__tab')
    await tabs[1].trigger('click')
    expect(wrapper.text()).toContain('Constructions et artisanat')
  })

  it('suit la locale active', () => {
    const wrapper = mountGameplay('en')
    const tabs = wrapper.findAll('.gameplay__tab')
    expect(tabs[0].text()).toBe('Progression and Territorial Structure')
  })
})
