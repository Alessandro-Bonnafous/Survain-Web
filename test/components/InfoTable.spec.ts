import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import InfoTable from '@/components/ui/InfoTable.vue'

describe('InfoTable', () => {
  it('rend les en-têtes et les lignes', () => {
    const wrapper = mount(InfoTable, {
      props: {
        headers: ['A', 'B'],
        rows: [
          ['1', '2'],
          ['3', '4'],
        ],
      },
    })
    expect(wrapper.findAll('th')).toHaveLength(2)
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
    expect(wrapper.findAll('tbody td')).toHaveLength(4)
    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('4')
  })
})
