import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import fr from '@/i18n/locales/fr.json'
import en from '@/i18n/locales/en.json'
import Home from '@/pages/index.vue'

function mountHome(locale: 'fr' | 'en' = 'fr') {
  const i18n = createI18n({ legacy: false, locale, fallbackLocale: 'en', messages: { fr, en } })
  return mount(Home, { global: { plugins: [i18n] } })
}

// Sprint A : la home porte le hero v7 (wordmark + tagline + lede + 2 CTA) et sa
// nav fixe mono-page. Le lore détaillé d'antan a été retiré (réintégration
// prévue en Sprint B via une section « Univers »).
describe('Home (hero v7)', () => {
  it('affiche le wordmark SURVAIN', () => {
    const wrapper = mountHome()
    const img = wrapper.find('img.wordmark')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toContain('survain-wordmark')
  })

  it('affiche la tagline et le lede en français', () => {
    const wrapper = mountHome('fr')
    expect(wrapper.text()).toContain('Mythologie nordique')
    expect(wrapper.text()).toContain('De la contrée solitaire au royaume entier')
  })

  it('affiche le lede en anglais', () => {
    const wrapper = mountHome('en')
    expect(wrapper.text()).toContain('From the solitary land to the entire kingdom')
  })

  it('expose les deux CTA du hero', () => {
    const wrapper = mountHome()
    const labels = wrapper.findAll('.btn').map((b) => b.text())
    expect(labels).toContain("Rejoindre l'aventure")
    expect(labels).toContain('Carnet de développement')
  })

  it('rend la nav mono-page avec les ancres univers / gameplay / communauté', () => {
    const wrapper = mountHome()
    const navHrefs = wrapper.findAll('.nav__links a').map((a) => a.attributes('href'))
    expect(navHrefs).toEqual(['#univers', '#gameplay', '#communaute'])
  })
})
