import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import MusicPlayer from '@/components/community/MusicPlayer.vue'
import type { MusicTrack } from '@/config/music'

const tracks: MusicTrack[] = [
  { title: 'A', src: '/sons/a.mp3' },
  { title: 'B', src: '/sons/b.mp3' },
]

describe('MusicPlayer', () => {
  it('rend un bouton par piste', () => {
    const wrapper = mount(MusicPlayer, { props: { tracks } })
    expect(wrapper.findAll('.music-player__track')).toHaveLength(2)
  })

  it('charge la première piste par défaut', () => {
    const wrapper = mount(MusicPlayer, { props: { tracks } })
    expect(wrapper.find('audio').attributes('src')).toBe('/sons/a.mp3')
  })

  it('change de piste au clic et marque la piste active', async () => {
    const wrapper = mount(MusicPlayer, { props: { tracks } })
    await wrapper.findAll('.music-player__track')[1].trigger('click')
    expect(wrapper.find('audio').attributes('src')).toBe('/sons/b.mp3')
    expect(wrapper.findAll('.music-player__track')[1].classes()).toContain(
      'music-player__track--active',
    )
  })
})
