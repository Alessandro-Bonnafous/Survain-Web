import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestI18n } from '../helpers/i18n'
import Tools from '@/pages/tools.vue'

function mountTools(locale: 'fr' | 'en' = 'fr') {
  return mount(Tools, { global: { plugins: [createTestI18n(locale)] } })
}

describe('page Tools', () => {
  it('rend un onglet par section', () => {
    const wrapper = mountTools()
    expect(wrapper.findAll('.tools__tab')).toHaveLength(5)
  })

  it('affiche par défaut la récolte (biome seul, 6 colonnes)', () => {
    const wrapper = mountTools()
    expect(wrapper.findAll('.tools__control')).toHaveLength(1)
    expect(wrapper.findAll('th')).toHaveLength(6)
  })

  it('masque le sélecteur de biome pour les constructions (4 colonnes)', async () => {
    const wrapper = mountTools()
    await wrapper.findAll('.tools__tab')[1].trigger('click')
    expect(wrapper.findAll('.tools__control')).toHaveLength(0)
    expect(wrapper.findAll('th')).toHaveLength(4)
  })

  it('affiche biome + tier pour les armes (9 colonnes)', async () => {
    const wrapper = mountTools()
    await wrapper.findAll('.tools__tab')[3].trigger('click')
    expect(wrapper.findAll('.tools__control')).toHaveLength(2)
    expect(wrapper.findAll('th')).toHaveLength(9)
  })

  it('suit la locale active', () => {
    const wrapper = mountTools('en')
    expect(wrapper.findAll('.tools__tab')[0].text()).toBe('Gathering')
  })
})
