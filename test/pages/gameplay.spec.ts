import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestI18n } from '../helpers/i18n'
import Gameplay from '@/pages/gameplay.vue'

function mountGameplay(locale: 'fr' | 'en' = 'fr') {
  return mount(Gameplay, { global: { plugins: [createTestI18n(locale)] } })
}

// La page Gameplay fusionne Gameplay + Outils sous deux sous-onglets.
describe('page Gameplay', () => {
  it('expose les deux sous-onglets Gameplay / Arbre de craft', () => {
    const wrapper = mountGameplay()
    const subtabs = wrapper.findAll('.gp__subtab').map((t) => t.text())
    expect(subtabs).toEqual(['Gameplay', 'Arbre de craft'])
  })

  it('affiche le Gameplay (catégories) par défaut : un onglet par catégorie', () => {
    const wrapper = mountGameplay()
    expect(wrapper.findAll('.categories__tab')).toHaveLength(4)
    expect(wrapper.text()).toContain('Les Contrées')
  })

  it('change de catégorie au clic sur un onglet', async () => {
    const wrapper = mountGameplay()
    await wrapper.findAll('.categories__tab')[1].trigger('click')
    expect(wrapper.text()).toContain('Constructions et artisanat')
  })

  it('bascule sur l’arbre de craft via le sous-onglet', async () => {
    const wrapper = mountGameplay()
    await wrapper.findAll('.gp__subtab')[1].trigger('click')
    expect(wrapper.findAll('.craft__tab')).toHaveLength(5)
    expect(wrapper.findAll('.categories__tab')).toHaveLength(0)
  })

  it('suit la locale active', () => {
    const wrapper = mountGameplay('en')
    expect(wrapper.findAll('.categories__tab')[0].text()).toBe(
      'Progression and Territorial Structure',
    )
  })
})
