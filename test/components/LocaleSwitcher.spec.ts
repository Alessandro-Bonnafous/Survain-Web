import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import fr from '@/i18n/locales/fr.json'
import en from '@/i18n/locales/en.json'
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'

function mountSwitcher() {
  const i18n = createI18n({
    legacy: false,
    locale: 'fr',
    fallbackLocale: 'en',
    messages: { fr, en },
  })
  const wrapper = mount(LocaleSwitcher, { global: { plugins: [i18n] } })
  return { wrapper, i18n }
}

describe('LocaleSwitcher', () => {
  it('rend un bouton par locale supportée', () => {
    const { wrapper } = mountSwitcher()
    expect(wrapper.findAll('.locale-switcher__btn')).toHaveLength(2)
  })

  it('marque la locale courante comme active', () => {
    const { wrapper } = mountSwitcher()
    const active = wrapper.get('.locale-switcher__btn--active')
    expect(active.text()).toBe('Français')
    expect(active.attributes('aria-pressed')).toBe('true')
  })

  it('change la locale au clic', async () => {
    const { wrapper, i18n } = mountSwitcher()
    const buttons = wrapper.findAll('.locale-switcher__btn')
    await buttons[1].trigger('click')
    expect(i18n.global.locale.value).toBe('en')
  })
})
