import { afterEach, describe, expect, it, vi } from 'vitest'
import { useLog } from '@/composables/useLog'

describe('useLog', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('expose les quatre niveaux de log', () => {
    const log = useLog()
    expect(Object.keys(log)).toEqual(['debug', 'info', 'warn', 'error'])
  })

  it('préfixe les messages et délègue au bon niveau de console', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    useLog().warn('attention', 42)
    expect(spy).toHaveBeenCalledWith('[Survain]', 'attention', 42)
  })
})
