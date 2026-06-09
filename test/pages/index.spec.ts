import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import fr from '@/i18n/locales/fr.json'
import en from '@/i18n/locales/en.json'
import { EXTERNAL_LINKS } from '@/config/links'
import Home from '@/pages/index.vue'

function mountHome(locale: 'fr' | 'en' = 'fr') {
  const i18n = createI18n({ legacy: false, locale, fallbackLocale: 'en', messages: { fr, en } })
  return mount(Home, { global: { plugins: [i18n] } })
}

describe('Home', () => {
  it('rend les trois paragraphes de présentation', () => {
    const wrapper = mountHome()
    expect(wrapper.findAll('.home__paragraph')).toHaveLength(3)
  })

  it('affiche le lore en français', () => {
    const wrapper = mountHome('fr')
    expect(wrapper.text()).toContain('univers impitoyable de SURVAIN')
  })

  it('expose les CTA trailer et Discord vers les bons liens externes', () => {
    const wrapper = mountHome()
    const hrefs = wrapper.findAll('.home__btn').map((a) => a.attributes('href'))
    expect(hrefs).toEqual([EXTERNAL_LINKS.trailer, EXTERNAL_LINKS.discord])
  })
})
