import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestI18n } from '../helpers/i18n'
import { EXTERNAL_LINKS } from '@/config/links'
import CommunauteSection from '@/components/home/CommunauteSection.vue'

function mountSection(locale: 'fr' | 'en' = 'fr') {
  return mount(CommunauteSection, { global: { plugins: [createTestI18n(locale)] } })
}

// Le contenu de l'ancienne page /community vit désormais dans la section
// Communauté de la home (cible #communaute). /community redirige ici.
describe('CommunauteSection', () => {
  it('est la cible de l’ancre #communaute', () => {
    expect(mountSection().find('#communaute').exists()).toBe(true)
  })

  it('expose le Discord vers le bon lien externe (nouvel onglet)', () => {
    const link = mountSection().get('.comm__discord')
    expect(link.attributes('href')).toBe(EXTERNAL_LINKS.discord)
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener')
  })

  it('rend le lecteur de musiques avec les 3 pistes', () => {
    expect(mountSection().findAll('.music-player__track')).toHaveLength(3)
  })

  it('suit la locale active', () => {
    expect(mountSection('en').text()).toContain('Official Discord')
  })
})
