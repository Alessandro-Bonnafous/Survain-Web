import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ExampleSelector from '@/components/gameplay/ExampleSelector.vue'
import type { ResolvedSelectorOption } from '@/content/gameplay/types'

const options: ResolvedSelectorOption[] = [
  { label: 'Alpha', blocks: [{ kind: 'paragraph', textKey: 'a' }] },
  { label: 'Beta', blocks: [{ kind: 'paragraph', textKey: 'b' }] },
]

function mountSelector() {
  return mount(ExampleSelector, {
    props: { label: 'Choix', options },
    slots: {
      // Slot scopé : on rend un marqueur basé sur l'option sélectionnée.
      default: (props: { option: ResolvedSelectorOption }) => props.option.label,
    },
  })
}

describe('ExampleSelector', () => {
  it('rend une option par choix et affiche la première par défaut', () => {
    const wrapper = mountSelector()
    expect(wrapper.findAll('option')).toHaveLength(2)
    expect(wrapper.find('.example-selector__panel').text()).toBe('Alpha')
  })

  it('met à jour le panneau quand on change de sélection', async () => {
    const wrapper = mountSelector()
    await wrapper.find('select').setValue('1')
    expect(wrapper.find('.example-selector__panel').text()).toBe('Beta')
  })
})
