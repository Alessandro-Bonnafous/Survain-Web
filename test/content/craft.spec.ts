import { describe, expect, it } from 'vitest'
import {
  armorsOf,
  biomeValue,
  constructions,
  processing,
  resources,
  resourcesOf,
  weaponsByTier,
  weaponsOf,
} from '@/content/craft'

describe('données craft', () => {
  it('expose les jeux de données attendus', () => {
    expect(resources).toHaveLength(48)
    expect(constructions).toHaveLength(18)
    expect(processing).toHaveLength(11)
    expect(weaponsByTier.T1).toHaveLength(56)
    expect(weaponsByTier.T2).toHaveLength(56)
    expect(weaponsByTier.T3).toHaveLength(56)
  })

  it('mappe un id de biome vers sa valeur de données', () => {
    expect(biomeValue('cote')).toBe('Côte maritime')
    expect(biomeValue('foret')).toBe('Forêt')
  })

  it('filtre les ressources par biome', () => {
    const forest = resourcesOf('foret')
    expect(forest).toHaveLength(12)
    expect(forest.every((r) => r.biome === 'Forêt')).toBe(true)
  })

  it('filtre armes et armures par biome et tier', () => {
    const weapons = weaponsOf('cote', 'T1')
    expect(weapons.length).toBeGreaterThan(0)
    expect(weapons.every((w) => w.Biome === 'Côte maritime')).toBe(true)

    const armors = armorsOf('foret', 'T3')
    expect(armors.length).toBeGreaterThan(0)
    expect(armors.every((a) => a.Biome === 'Forêt')).toBe(true)
  })
})
