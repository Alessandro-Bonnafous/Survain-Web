import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectMenu from '@/components/ui/SelectMenu.vue'

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]

function mountMenu(modelValue: string = 'a') {
  return mount(SelectMenu, {
    props: { modelValue, options, ariaLabel: 'Choix' },
    attachTo: document.body,
  })
}

describe('SelectMenu', () => {
  it('affiche le libellé de la valeur sélectionnée et masque le menu par défaut', () => {
    const wrapper = mountMenu('b')
    expect(wrapper.find('.select__value').text()).toBe('Beta')
    expect(wrapper.find('.select__menu').exists()).toBe(false)
  })

  it('ouvre le menu au clic et rend une option par choix', async () => {
    const wrapper = mountMenu()
    await wrapper.find('.select__toggle').trigger('click')
    expect(wrapper.find('.select__menu').exists()).toBe(true)
    expect(wrapper.findAll('.select__option')).toHaveLength(2)
  })

  it('émet update:modelValue et referme au choix d’une option', async () => {
    const wrapper = mountMenu()
    await wrapper.find('.select__toggle').trigger('click')
    await wrapper.findAll('.select__option')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
    expect(wrapper.find('.select__menu').exists()).toBe(false)
  })

  it('marque l’option active comme sélectionnée (aria + classe)', async () => {
    const wrapper = mountMenu('b')
    await wrapper.find('.select__toggle').trigger('click')
    const selected = wrapper.find('.select__option--selected')
    expect(selected.text()).toBe('Beta')
    expect(selected.element.closest('[role="option"]')?.getAttribute('aria-selected')).toBe('true')
  })
})
