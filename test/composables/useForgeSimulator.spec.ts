import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useForgeSimulator } from '@/composables/useForgeSimulator'
import type { ForgeAudioApi } from '@/composables/useForgeAudio'

/** Audio factice : aucune ressource réelle n'est chargée pendant les tests. */
function stubAudio(): ForgeAudioApi {
  return {
    muted: ref(false),
    play: vi.fn(),
    stop: vi.fn(),
    stopAll: vi.fn(),
    toggleMute: vi.fn(),
  }
}

function makeSim() {
  return useForgeSimulator(stubAudio())
}

describe('useForgeSimulator — matériaux', () => {
  it('attribue 25 % par bon matériau (0 → 100)', () => {
    const sim = makeSim()
    sim.setBiome('cote')
    expect(sim.materialQuality.value).toBe(0)

    sim.toggleMineral('sel-gemme')
    expect(sim.materialQuality.value).toBe(25)
    sim.toggleMineral('cuivre-marin')
    sim.toggleMineral('perle-minerale')
    sim.toggleMineral('fer-vaseux')
    expect(sim.materialQuality.value).toBe(100)
    expect(sim.state.qualityValue).toBe(100)
  })

  it('ignore les matériaux d’un autre biome', () => {
    const sim = makeSim()
    sim.setBiome('cote')
    sim.toggleMineral('mithril') // matériau « montagnes »
    expect(sim.materialQuality.value).toBe(0)
  })

  it('désélectionne au second clic', () => {
    const sim = makeSim()
    sim.setBiome('foret')
    sim.toggleMineral('cuivre')
    sim.toggleMineral('cuivre')
    expect(sim.materialQuality.value).toBe(0)
  })
})

describe('useForgeSimulator — fourneau', () => {
  it('qualité 100 % quand cycles = cible et chaleur idéale', () => {
    const sim = makeSim()
    sim.setBiome('cote') // cible 850, 4 cycles
    sim.state.furnaceCycles = 4
    sim.state.furnaceDtiValues = [0, 0, 0, 0]
    sim.computeFurnaceQuality()
    expect(sim.state.furnaceDC).toBe(0)
    expect(sim.state.furnaceQuality).toBe(100)
  })

  it('pénalise l’écart de cycles (|DC * 5|)', () => {
    const sim = makeSim()
    sim.setBiome('cote') // 4 cycles attendus
    sim.state.furnaceCycles = 6 // DC = +2
    sim.state.furnaceDtiValues = [0, 0, 0, 0, 0, 0]
    sim.computeFurnaceQuality()
    expect(sim.state.furnaceDC).toBe(2)
    expect(sim.state.furnaceQuality).toBe(90)
  })

  it('un tick « loaded » incrémente les cycles et enregistre l’écart de température', () => {
    const sim = makeSim()
    sim.setBiome('foret') // cible 950
    sim.state.furnacePhase = 'loaded'
    sim.state.furnaceTemperature = 1000
    sim.furnaceTick()
    expect(sim.state.furnaceCycles).toBe(1)
    expect(sim.state.furnaceDtiValues).toEqual([50])
  })

  it('le soufflet réchauffe, sinon la température baisse', () => {
    const sim = makeSim()
    sim.setBiome('plaines') // facteurs biome 1/1
    sim.state.furnaceTemperature = 800
    sim.state.heatBoostCycles = 1
    sim.furnaceTick() // +50
    expect(sim.state.furnaceTemperature).toBe(850)
    sim.furnaceTick() // plus de boost → -20
    expect(sim.state.furnaceTemperature).toBe(830)
  })
})

describe('useForgeSimulator — forge', () => {
  it('chaque défaut retire 5 % de qualité', () => {
    const sim = makeSim()
    sim.state.forgePhase = 1
    sim.state.forgeDefects = 3
    sim.state.forgeCycleLocked = false
    sim.finishForgePhase1()
    expect(sim.state.forgePhase).toBe(2)
    expect(sim.state.forgeQuality).toBe(85)
    expect(sim.state.goTrempeVisible).toBe(true)
  })

  it('un cycle sans clic dans la fenêtre compte un défaut', () => {
    const sim = makeSim()
    sim.state.forgePhase = 1
    sim.state.forgeCycles = 0
    sim.state.forgeDefects = 0
    sim.forgeCycleTick() // 1er cycle : rien à manquer encore
    expect(sim.state.forgeDefects).toBe(0)
    expect(sim.state.forgeCycleLocked).toBe(true)
    sim.forgeCycleTick() // cycle non honoré → défaut
    expect(sim.state.forgeDefects).toBe(1)
    sim.dispose()
  })

  it('termine la phase après 10 cycles', () => {
    const sim = makeSim()
    sim.state.forgePhase = 1
    sim.state.forgeCycles = 10
    sim.state.forgeCycleLocked = false
    sim.forgeCycleTick()
    expect(sim.state.forgePhase).toBe(2)
  })
})

describe('useForgeSimulator — trempe', () => {
  it('trempe parfaite = 100 %', () => {
    const sim = makeSim()
    sim.state.trempeEciBasSum = 0
    sim.state.trempeEciHautSum = 0
    sim.computeTrempeQuality()
    expect(sim.state.trempeQuality).toBe(100)
  })

  it('trop rapide → pénalité ECi bas / 20', () => {
    const sim = makeSim()
    sim.state.trempeEciBasSum = 40
    sim.computeTrempeQuality()
    expect(sim.state.trempeQuality).toBe(98)
  })

  it('trop lent → pénalité ECi haut / 20', () => {
    const sim = makeSim()
    sim.state.trempeEciHautSum = 60
    sim.computeTrempeQuality()
    expect(sim.state.trempeQuality).toBe(97)
  })
})

describe('useForgeSimulator — qualité finale', () => {
  it('soustrait la pénalité de trempe au total courant', () => {
    const sim = makeSim()
    sim.state.qualityValue = 80
    sim.state.trempeEciBasSum = 40 // pénalité 2
    sim.goEnd()
    expect(sim.state.step).toBe('final')
    expect(sim.state.finalQuality).toBe(78)
  })
})

describe('useForgeSimulator — cycle de vie', () => {
  let sim: ReturnType<typeof makeSim>
  beforeEach(() => {
    sim = makeSim()
  })

  it('start exige un biome', () => {
    sim.start()
    expect(sim.state.step).toBe('intro')
    sim.setBiome('montagnes')
    sim.start()
    expect(sim.state.step).toBe('materials')
    expect(sim.state.season).not.toBeNull()
    sim.dispose()
  })

  it('reset ramène à l’intro', () => {
    sim.setBiome('cote')
    sim.start()
    sim.reset()
    expect(sim.state.step).toBe('intro')
    expect(sim.state.season).toBeNull()
    expect(sim.state.selectedMinerals).toEqual([])
  })
})
