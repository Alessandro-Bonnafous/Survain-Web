import { describe, expect, it } from 'vitest'
import {
  armorsByTier,
  armorsOf,
  biomeValue,
  constructions,
  processing,
  resources,
  resourcesOf,
  weaponsByTier,
  weaponsOf,
} from '@/content/craft'
import enToolsItems from '@/i18n/locales/en/tools-items.json'

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

  it('le lexique EN couvre tous les noms d’items (sinon repli FR)', () => {
    const dict = enToolsItems as Record<string, string>
    const terms = new Set<string>()
    const add = (v: string) => {
      if (v && v !== '-') terms.add(v)
    }
    // Noms entiers d'items.
    resources.forEach((r) => [r.t1, r.t2, r.t3, r.annexes].forEach(add))
    constructions.forEach((c) => [c.T1, c.T2, c.T3].forEach(add))
    processing.forEach((p) =>
      [p['T1 - Hutte Craft'], p['T2 - Maison Artisanale'], p['T3 - Hall des Artisans']].forEach(
        add,
      ),
    )
    const weapons = [...weaponsByTier.T1, ...weaponsByTier.T2, ...weaponsByTier.T3]
    const armors = [...armorsByTier.T1, ...armorsByTier.T2, ...armorsByTier.T3]
    weapons.forEach((w) => add(w.Arme))
    armors.forEach((a) => add(a.Armure))
    // Noms (et biomes bonus) extraits des colonnes de coûts — même parsing que la page.
    const seg = (s: string) => {
      const m = s.match(/^(\+\s*)?(\d+)\s+(.+?)(?:\s*\(([^)]+?)\s+bonus\))?$/)
      if (m) {
        add(m[3].trim())
        if (m[4]) add(m[4].trim())
      }
    }
    const wCols = [
      'Bois craft',
      'Minerai craft',
      'Fibres craft',
      'Ressources marines craft',
      'Ressources craft',
    ] as const
    weapons.forEach((w) => wCols.forEach((c) => w[c].split(' / ').forEach(seg)))
    const aCols = [
      'Bois craft',
      'Minerai craft',
      'Fibres craft',
      'Marines craft',
      'Animal craft',
    ] as const
    armors.forEach((a) => aCols.forEach((c) => a[c].split(' / ').forEach(seg)))

    const missing = [...terms].filter((term) => !(term in dict))
    expect(missing).toEqual([])
  })
})
