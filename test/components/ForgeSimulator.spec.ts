import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestI18n } from '../helpers/i18n'
import ForgeSimulator from '@/components/forge/ForgeSimulator.vue'
import { MINERALS } from '@/config/forge'

function mountSim(locale: 'fr' | 'en' = 'fr') {
  return mount(ForgeSimulator, { global: { plugins: [createTestI18n(locale)] } })
}

describe('ForgeSimulator', () => {
  it('affiche l’intro avec le bouton « Commencer » désactivé sans biome', () => {
    const wrapper = mountSim()
    const start = wrapper.get('.intro .next-btn')
    expect(start.attributes('disabled')).toBeDefined()
  })

  it('passe à l’étape matériaux après choix d’un biome + Commencer', async () => {
    const wrapper = mountSim()
    await wrapper.get('.sim__select').setValue('cote')
    await wrapper.get('.intro .next-btn').trigger('click')
    expect(wrapper.findAll('.hotspot')).toHaveLength(MINERALS.length)
  })

  it('suit la locale active', () => {
    expect(mountSim('en').text()).toContain('Hall of Artisans')
  })
})
