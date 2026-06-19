import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestI18n } from '../helpers/i18n'
import AscensionSection from '@/components/home/AscensionSection.vue'

function mountSection(locale: 'fr' | 'en' = 'fr') {
  return mount(AscensionSection, { global: { plugins: [createTestI18n(locale)] } })
}

describe('AscensionSection', () => {
  it('est la cible de l’ancre #ascension', () => {
    expect(mountSection().find('#ascension').exists()).toBe(true)
  })

  it('rend les quatre paliers de progression', () => {
    expect(mountSection().findAll('.asc__step')).toHaveLength(4)
  })

  it('marque le palier Royaume comme palier de guerre (PvP)', () => {
    const wrapper = mountSection()
    expect(wrapper.findAll('.asc__step--war')).toHaveLength(1)
    expect(wrapper.find('.asc__step--war').text()).toContain('Royaume')
  })

  it('suit la locale active', () => {
    expect(mountSection('en').text()).toContain('The Ascension')
  })
})
