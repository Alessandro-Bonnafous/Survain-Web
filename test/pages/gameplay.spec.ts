import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestI18n } from '../helpers/i18n'
import Gameplay from '@/pages/gameplay.vue'

function mountGameplay(locale: 'fr' | 'en' = 'fr') {
  return mount(Gameplay, { global: { plugins: [createTestI18n(locale)] } })
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
