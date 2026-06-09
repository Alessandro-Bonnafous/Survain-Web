import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestI18n } from '../helpers/i18n'
import { EXTERNAL_LINKS } from '@/config/links'
import Community from '@/pages/community.vue'

function mountCommunity(locale: 'fr' | 'en' = 'fr') {
  return mount(Community, { global: { plugins: [createTestI18n(locale)] } })
}

describe('page Community', () => {
  it('expose le Discord vers le bon lien externe (nouvel onglet)', () => {
    const wrapper = mountCommunity()
    const link = wrapper.get('.community__discord')
    expect(link.attributes('href')).toBe(EXTERNAL_LINKS.discord)
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener')
  })

  it('rend le lecteur de musiques avec les 3 pistes', () => {
    const wrapper = mountCommunity()
    expect(wrapper.findAll('.music-player__track')).toHaveLength(3)
  })

  it('liste les 6 sections à venir', () => {
    const wrapper = mountCommunity()
    expect(wrapper.findAll('.community__soon-item')).toHaveLength(6)
  })

  it('suit la locale active', () => {
    const wrapper = mountCommunity('en')
    expect(wrapper.text()).toContain('Official Discord')
  })
})
