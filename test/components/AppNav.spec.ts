import { describe, expect, it } from 'vitest'
import { RouterLinkStub, mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import fr from '@/i18n/locales/fr.json'
import en from '@/i18n/locales/en.json'
import AppNav from '@/components/AppNav.vue'

function mountNav() {
  const i18n = createI18n({
    legacy: false,
    locale: 'fr',
    fallbackLocale: 'en',
    messages: { fr, en },
  })
  return mount(AppNav, {
    global: {
      plugins: [i18n],
      stubs: { RouterLink: RouterLinkStub },
    },
  })
}

describe('AppNav', () => {
  it('rend les quatre liens de navigation internes', () => {
    const wrapper = mountNav()
    const internal = wrapper.findAllComponents(RouterLinkStub)
    expect(internal).toHaveLength(4)
    expect(internal.map((l) => l.props('to'))).toEqual(['/', '/gameplay', '/community', '/tools'])
  })

  it('expose le trailer comme lien externe ouvrant un nouvel onglet', () => {
    const wrapper = mountNav()
    const trailer = wrapper.get('a[target="_blank"]')
    expect(trailer.attributes('href')).toContain('youtube.com')
    expect(trailer.attributes('rel')).toBe('noopener')
  })

  it('intègre le sélecteur de langue', () => {
    const wrapper = mountNav()
    expect(wrapper.find('.locale-switcher').exists()).toBe(true)
  })
})
