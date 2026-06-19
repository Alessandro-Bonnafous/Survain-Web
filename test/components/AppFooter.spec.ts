import { describe, expect, it } from 'vitest'
import { RouterLinkStub, mount } from '@vue/test-utils'
import { createTestI18n } from '../helpers/i18n'
import { EXTERNAL_LINKS } from '@/config/links'
import AppFooter from '@/components/layout/AppFooter.vue'

function mountFooter(locale: 'fr' | 'en' = 'fr') {
  return mount(AppFooter, {
    global: {
      plugins: [createTestI18n(locale)],
      stubs: { RouterLink: RouterLinkStub },
    },
  })
}

describe('AppFooter', () => {
  it('rend les liens de navigation internes (marque + sections)', () => {
    const wrapper = mountFooter()
    const internal = wrapper.findAllComponents(RouterLinkStub)
    expect(internal.map((l) => l.props('to'))).toEqual([
      '/',
      '/#univers',
      '/gameplay',
      '/#communaute',
    ])
  })

  it('expose le Discord vers le bon lien externe (nouvel onglet)', () => {
    const link = mountFooter().get('.foot__social a')
    expect(link.attributes('href')).toBe(EXTERNAL_LINKS.discord)
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener')
  })

  it('affiche la mention de droits selon la locale', () => {
    expect(mountFooter('en').text()).toContain('All rights reserved')
  })
})
