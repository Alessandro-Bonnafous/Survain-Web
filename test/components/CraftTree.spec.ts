import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestI18n } from '../helpers/i18n'
import CraftTree from '@/components/gameplay/CraftTree.vue'

function mountCraft(locale: 'fr' | 'en' = 'fr') {
  return mount(CraftTree, { global: { plugins: [createTestI18n(locale)] } })
}

// Le contenu de l'ancienne page /tools vit désormais dans CraftTree (sous-onglet
// « Arbre de craft » de la page Gameplay). Comportement identique.
describe('CraftTree', () => {
  it('rend un onglet par section', () => {
    const wrapper = mountCraft()
    expect(wrapper.findAll('.craft__tab')).toHaveLength(5)
  })

  it('affiche par défaut la récolte (biome seul, 6 colonnes)', () => {
    const wrapper = mountCraft()
    expect(wrapper.findAll('.craft__control')).toHaveLength(1)
    expect(wrapper.findAll('th')).toHaveLength(6)
  })

  it('masque le sélecteur de biome pour les constructions (4 colonnes)', async () => {
    const wrapper = mountCraft()
    await wrapper.findAll('.craft__tab')[1].trigger('click')
    expect(wrapper.findAll('.craft__control')).toHaveLength(0)
    expect(wrapper.findAll('th')).toHaveLength(4)
  })

  it('affiche biome + tier pour les armes (8 colonnes, sans « Qté totale »)', async () => {
    const wrapper = mountCraft()
    await wrapper.findAll('.craft__tab')[3].trigger('click')
    expect(wrapper.findAll('.craft__control')).toHaveLength(2)
    expect(wrapper.findAll('th')).toHaveLength(8)
  })

  it('armures : 8 colonnes (sans « Qté base »/« Qté biome suppl. ») et sans « bonus »', async () => {
    const wrapper = mountCraft()
    await wrapper.findAll('.craft__tab')[4].trigger('click')
    expect(wrapper.findAll('th')).toHaveLength(8)
    expect(wrapper.text()).not.toContain('bonus')
  })

  it('suit la locale active', () => {
    const wrapper = mountCraft('en')
    expect(wrapper.findAll('.craft__tab')[0].text()).toBe('Gathering')
  })

  it('traduit les valeurs catégorielles (FR brut, EN traduit)', () => {
    expect(mountCraft('fr').text()).toContain('Hache')
    const en = mountCraft('en')
    expect(en.text()).toContain('Axe')
    expect(en.text()).not.toContain('Hache')
  })

  it('traduit les noms d’items (récolte : Bouleau → Birch)', () => {
    expect(mountCraft('fr').text()).toContain('Bouleau')
    const en = mountCraft('en')
    expect(en.text()).toContain('Birch')
    expect(en.text()).not.toContain('Bouleau')
  })
})
