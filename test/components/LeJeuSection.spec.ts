import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestI18n } from '../helpers/i18n'
import LeJeuSection from '@/components/home/LeJeuSection.vue'

function mountSection(locale: 'fr' | 'en' = 'fr') {
  return mount(LeJeuSection, { global: { plugins: [createTestI18n(locale)] } })
}

describe('LeJeuSection', () => {
  it('est la cible de l’ancre #jeu', () => {
    expect(mountSection().find('#jeu').exists()).toBe(true)
  })

  it('rend les trois piliers du jeu', () => {
    expect(mountSection().findAll('.jeu__pillar')).toHaveLength(3)
  })

  it('suit la locale active', () => {
    expect(mountSection('fr').text()).toContain('Faveur des Dieux')
    expect(mountSection('en').text()).toContain('Favor of the Gods')
  })
})
