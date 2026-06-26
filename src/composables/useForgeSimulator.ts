import { computed, getCurrentInstance, onBeforeUnmount, reactive } from 'vue'
import {
  BIOMES,
  FORGE_IMAGES,
  FORGE_CYCLE_COUNT,
  FORGE_CYCLE_MS,
  FLASH_MS,
  FURNACE_TEMP_MAX,
  FURNACE_TEMP_MIN,
  FURNACE_TICK_MS,
  REQUIRED_MATERIALS_BY_BIOME,
  SEASONS,
  SEASON_KEYS,
  TREMPE_COOL_MS,
  TREMPE_RANGE_AMPLITUDE,
  TREMPE_SHRINK_MS,
  TREMPE_TEMP_MAX,
  TREMPE_TEMP_MIN,
  type BiomeKey,
  type SeasonKey,
} from '@/config/forge'
import { useForgeAudio, type ForgeAudioApi } from '@/composables/useForgeAudio'

export type ForgeStep = 'intro' | 'materials' | 'furnace' | 'forge' | 'trempe' | 'final'
export type FurnacePhase = 'cold' | 'loaded' | 'finished'
export type ForgeAction = 'hammer' | 'pince'

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

/**
 * Cœur du simulateur de forge. Toute la logique des cinq étapes (matériaux,
 * fourneau, forge, trempe, final) est portée fidèlement depuis le legacy
 * `Simulateur.html`. L'état est réactif ; les accès DOM directs du legacy sont
 * remplacés par des champs d'état que les composants bindent.
 *
 * Les minuteries (`setInterval`/`setTimeout`) sont centralisées et nettoyées
 * automatiquement au démontage. Les méthodes de « tick » sont exposées pour
 * permettre des tests déterministes sans temps réel.
 *
 * @param audio injectable pour les tests (par défaut : `useForgeAudio()`).
 */
export function useForgeSimulator(audio: ForgeAudioApi = useForgeAudio()) {
  const state = reactive({
    step: 'intro' as ForgeStep,
    biome: '' as BiomeKey | '',
    season: null as SeasonKey | null,

    // --- Matériaux ---
    selectedMinerals: [] as string[],

    // Qualité globale affichée dans le bandeau (suit l'étape courante).
    qualityValue: 0,

    // --- Fourneau ---
    furnaceTemperature: 700,
    furnaceQuality: 100,
    furnacePhase: 'cold' as FurnacePhase,
    furnaceCycles: 0,
    heatBoostCycles: 0,
    biomeCoolingFactor: 1,
    biomeHeatingFactor: 1,
    furnaceDtiValues: [] as number[],
    furnaceDtiNegativeSum: 0,
    furnaceDtiPositiveSum: 0,
    furnaceDC: 0,
    furnaceDTtotal: 0,
    furnaceHourglassFlip: false,
    furnaceImage: FORGE_IMAGES.fourneau,
    furnaceTongs: FORGE_IMAGES.pinceFroide,
    goForgeVisible: false,

    // --- Forge ---
    forgeQuality: 100,
    forgePhase: 0 as 0 | 1 | 2,
    forgeCycles: 0,
    forgeDefects: 0,
    forgeExpectedAction: null as ForgeAction | null,
    forgeActionClicked: false,
    forgeCycleLocked: false,
    forgeHourglassFlip: false,
    forgeImage: FORGE_IMAGES.forge,
    forgeTongs: FORGE_IMAGES.pinceChaude,
    forgeTongsVisible: true,
    forgeActionsVisible: false,
    goTrempeVisible: false,

    // --- Trempe ---
    trempeTemperature: 20,
    trempeQuality: 100,
    trempePhase: 0 as 0 | 1 | 2,
    trempeRangeUpper: 0,
    trempeRangeLower: 0,
    trempeEciBasSum: 0,
    trempeEciHautSum: 0,
    trempeHourglassFlip: false,
    trempeImage: FORGE_IMAGES.trempe,
    trempeTongs: FORGE_IMAGES.pinceForgee,
    trempeTongsVisible: true,
    trempePinceVisible: false,
    goEndVisible: false,

    // --- Final ---
    finalQuality: 100,
  })

  // ---------------------------------------------------------------------------
  // Minuteries (centralisées + nettoyées au démontage)
  // ---------------------------------------------------------------------------
  let furnaceTimer: ReturnType<typeof setInterval> | null = null
  let forgeTimer: ReturnType<typeof setInterval> | null = null
  let forgeFlashTimer: ReturnType<typeof setTimeout> | null = null
  let trempeCoolTimer: ReturnType<typeof setInterval> | null = null
  let trempeShrinkTimer: ReturnType<typeof setInterval> | null = null
  let trempeFlashTimer: ReturnType<typeof setTimeout> | null = null

  function clearTimer(timer: ReturnType<typeof setInterval> | null): null {
    if (timer) clearInterval(timer)
    return null
  }
  function clearTimeoutTimer(timer: ReturnType<typeof setTimeout> | null): null {
    if (timer) clearTimeout(timer)
    return null
  }

  function dispose(): void {
    furnaceTimer = clearTimer(furnaceTimer)
    forgeTimer = clearTimer(forgeTimer)
    trempeCoolTimer = clearTimer(trempeCoolTimer)
    trempeShrinkTimer = clearTimer(trempeShrinkTimer)
    forgeFlashTimer = clearTimeoutTimer(forgeFlashTimer)
    trempeFlashTimer = clearTimeoutTimer(trempeFlashTimer)
    audio.stopAll()
  }

  // ---------------------------------------------------------------------------
  // Dérivés
  // ---------------------------------------------------------------------------
  const currentBiome = computed(() => (state.biome ? BIOMES[state.biome] : null))

  const materialQuality = computed(() => {
    if (!state.biome) return 0
    const required = REQUIRED_MATERIALS_BY_BIOME[state.biome]
    const correct = required.filter((id) => state.selectedMinerals.includes(id)).length
    return correct * 25
  })

  const toPercent = (value: number, min: number, max: number) =>
    clamp(((value - min) / (max - min)) * 100, 0, 100)

  const furnaceFillPercent = computed(() =>
    toPercent(state.furnaceTemperature, FURNACE_TEMP_MIN, FURNACE_TEMP_MAX),
  )
  const furnaceTargetPercent = computed(() =>
    currentBiome.value
      ? toPercent(currentBiome.value.target, FURNACE_TEMP_MIN, FURNACE_TEMP_MAX)
      : 0,
  )
  const trempeFillPercent = computed(() =>
    toPercent(state.trempeTemperature, TREMPE_TEMP_MIN, TREMPE_TEMP_MAX),
  )
  const trempeRangeBottomPercent = computed(() =>
    toPercent(state.trempeRangeLower, TREMPE_TEMP_MIN, TREMPE_TEMP_MAX),
  )
  const trempeRangeHeightPercent = computed(() =>
    Math.max(
      0,
      toPercent(state.trempeRangeUpper, TREMPE_TEMP_MIN, TREMPE_TEMP_MAX) -
        trempeRangeBottomPercent.value,
    ),
  )

  // ---------------------------------------------------------------------------
  // Étape 0 — Matériaux
  // ---------------------------------------------------------------------------
  function getSeasonFactors(): { coolingFactor: number; heatingFactor: number } {
    if (!state.season) return { coolingFactor: 1, heatingFactor: 1 }
    return SEASONS[state.season]
  }

  function rollBiomeFactors(): void {
    const biome = state.biome
    if (biome === 'cote') {
      state.biomeCoolingFactor = 0.9 + Math.random() * 0.1
      state.biomeHeatingFactor = 1 + Math.random() * 0.1
    } else if (biome === 'montagnes') {
      state.biomeCoolingFactor = 1.1
      state.biomeHeatingFactor = 0.9
    } else if (biome === 'foret') {
      state.biomeCoolingFactor = 1
      state.biomeHeatingFactor = 0.9
    } else {
      state.biomeCoolingFactor = 1
      state.biomeHeatingFactor = 1
    }
  }

  function setBiome(biome: BiomeKey | ''): void {
    state.biome = biome
    state.selectedMinerals = []
    state.qualityValue = 0
  }

  function start(): void {
    if (!state.biome) return
    state.season = SEASON_KEYS[Math.floor(Math.random() * SEASON_KEYS.length)]
    state.selectedMinerals = []
    state.qualityValue = 0
    resetFurnaceStep()
    resetForgeStep()
    resetTrempeStep()
    state.step = 'materials'
  }

  function toggleMineral(id: string): void {
    const i = state.selectedMinerals.indexOf(id)
    if (i >= 0) state.selectedMinerals.splice(i, 1)
    else state.selectedMinerals.push(id)
    state.qualityValue = materialQuality.value
  }

  // ---------------------------------------------------------------------------
  // Étape 1 — Fourneau
  // ---------------------------------------------------------------------------
  function updateFurnacePhaseImages(): void {
    if (state.furnacePhase === 'cold') {
      state.furnaceImage = FORGE_IMAGES.fourneau
      state.furnaceTongs = FORGE_IMAGES.pinceFroide
      state.goForgeVisible = false
    } else if (state.furnacePhase === 'loaded') {
      state.furnaceImage = FORGE_IMAGES.fourneauMinerai
      state.furnaceTongs = FORGE_IMAGES.pinceVide
      state.goForgeVisible = false
    } else {
      state.furnaceImage = FORGE_IMAGES.fourneau
      state.furnaceTongs = FORGE_IMAGES.pinceChaude
      state.goForgeVisible = true
    }
  }

  function resetFurnaceStep(): void {
    state.furnaceTemperature = 700
    state.furnaceQuality = 100
    state.furnacePhase = 'cold'
    state.furnaceCycles = 0
    state.heatBoostCycles = 0
    state.furnaceDtiValues = []
    state.furnaceDtiNegativeSum = 0
    state.furnaceDtiPositiveSum = 0
    state.furnaceDC = 0
    state.furnaceDTtotal = 0
    furnaceTimer = clearTimer(furnaceTimer)
    rollBiomeFactors()
    updateFurnacePhaseImages()
  }

  function computeFurnaceQuality(): void {
    const biome = currentBiome.value
    const expectedCycles = biome ? biome.cycles : 0
    state.furnaceDC = state.furnaceCycles - expectedCycles

    state.furnaceDtiNegativeSum = 0
    state.furnaceDtiPositiveSum = 0
    state.furnaceDtiValues.forEach((dti) => {
      if (dti < 0) state.furnaceDtiNegativeSum += Math.abs(dti)
      if (dti > 0) state.furnaceDtiPositiveSum += dti
    })

    state.furnaceDTtotal =
      (state.furnaceDtiPositiveSum - state.furnaceDtiNegativeSum) / (5 * (expectedCycles || 1))

    state.furnaceQuality = clamp(
      100 - Math.abs(state.furnaceDTtotal) - Math.abs(state.furnaceDC * 5),
      0,
      100,
    )
  }

  /** Un tick d'horloge du fourneau (toutes les 2 s pendant l'étape fourneau). */
  function furnaceTick(): void {
    state.furnaceHourglassFlip = !state.furnaceHourglassFlip

    if (state.furnacePhase === 'loaded') {
      state.furnaceCycles += 1
      const target = currentBiome.value ? currentBiome.value.target : 0
      state.furnaceDtiValues.push(state.furnaceTemperature - target)
    }

    const { coolingFactor, heatingFactor } = getSeasonFactors()
    if (state.heatBoostCycles > 0) {
      state.furnaceTemperature += 50 * heatingFactor * state.biomeHeatingFactor
      state.heatBoostCycles -= 1
    } else {
      state.furnaceTemperature -= 20 * coolingFactor * state.biomeCoolingFactor
    }
    state.furnaceTemperature = clamp(state.furnaceTemperature, FURNACE_TEMP_MIN, FURNACE_TEMP_MAX)
  }

  function startFurnace(): void {
    state.step = 'furnace'
    resetFurnaceStep()
    furnaceTimer = clearTimer(furnaceTimer)
    furnaceTimer = setInterval(furnaceTick, FURNACE_TICK_MS)
  }

  /** Clic sur la pince du fourneau : charge le minerai, puis termine la cuisson. */
  function clickFurnaceTongs(): void {
    if (state.furnacePhase === 'cold') {
      state.furnaceCycles = 0
      state.furnaceDtiValues = []
      state.furnaceDtiNegativeSum = 0
      state.furnaceDtiPositiveSum = 0
      state.furnaceDC = 0
      state.furnaceDTtotal = 0
      state.furnacePhase = 'loaded'
      audio.play('furnaceMineral')
      updateFurnacePhaseImages()
    } else if (state.furnacePhase === 'loaded') {
      audio.stop('furnaceMineral')
      computeFurnaceQuality()
      state.furnacePhase = 'finished'
      updateFurnacePhaseImages()
    }
  }

  function pumpBellows(): void {
    if (state.furnacePhase === 'cold' || state.furnacePhase === 'loaded') {
      state.heatBoostCycles = 3
      audio.play('bellows')
    }
  }

  // ---------------------------------------------------------------------------
  // Étape 2 — Forge (jeu de rythme)
  // ---------------------------------------------------------------------------
  function resetForgeStep(): void {
    state.forgeQuality = 100
    state.forgePhase = 0
    state.forgeCycles = 0
    state.forgeDefects = 0
    state.forgeExpectedAction = null
    state.forgeActionClicked = false
    state.forgeCycleLocked = false
    forgeTimer = clearTimer(forgeTimer)
    forgeFlashTimer = clearTimeoutTimer(forgeFlashTimer)
    state.forgeImage = FORGE_IMAGES.forge
    state.forgeTongs = FORGE_IMAGES.pinceChaude
    state.forgeTongsVisible = true
    state.forgeActionsVisible = false
    state.goTrempeVisible = false
  }

  function startForge(): void {
    // Le fourneau est terminé : on coupe son horloge avant de passer à la forge.
    furnaceTimer = clearTimer(furnaceTimer)
    state.step = 'forge'
    state.qualityValue = Math.round(state.furnaceQuality)
    resetForgeStep()
  }

  /** Un cycle de forge (toutes les 2 s pendant la phase 1). */
  function forgeCycleTick(): void {
    if (state.forgePhase !== 1) return

    if (state.forgeCycleLocked && !state.forgeActionClicked) {
      state.forgeDefects += 1
    }

    if (state.forgeCycles >= FORGE_CYCLE_COUNT) {
      finishForgePhase1()
      return
    }

    state.forgeHourglassFlip = !state.forgeHourglassFlip
    state.forgeCycles += 1
    state.forgeExpectedAction = Math.random() < 0.5 ? 'hammer' : 'pince'
    state.forgeActionClicked = false
    state.forgeCycleLocked = true

    audio.play(state.forgeExpectedAction === 'hammer' ? 'hammer' : 'pinceRotation')
  }

  /** Clic sur la pince chaude (phase 0) : démarre le rythme. */
  function startForgePhase1(): void {
    if (state.forgePhase !== 0) return

    state.forgePhase = 1
    state.forgeCycles = 0
    state.forgeDefects = 0
    state.forgeQuality = 100
    state.forgeExpectedAction = null
    state.forgeActionClicked = false
    state.forgeCycleLocked = false
    state.forgeImage = FORGE_IMAGES.forgeMarteauPince
    state.forgeTongsVisible = false
    state.forgeActionsVisible = true
    state.goTrempeVisible = false

    forgeTimer = clearTimer(forgeTimer)
    forgeCycleTick()
    forgeTimer = setInterval(forgeCycleTick, FORGE_CYCLE_MS)
  }

  function handleForgeAction(action: ForgeAction): void {
    if (state.forgePhase !== 1) return
    if (!state.forgeCycleLocked) return
    if (state.forgeActionClicked) return
    if (action !== state.forgeExpectedAction) return

    state.forgeActionClicked = true
    state.forgeImage = action === 'hammer' ? FORGE_IMAGES.forgeMarteau : FORGE_IMAGES.forgePince

    forgeFlashTimer = clearTimeoutTimer(forgeFlashTimer)
    forgeFlashTimer = setTimeout(() => {
      if (state.forgePhase === 1) state.forgeImage = FORGE_IMAGES.forgeMarteauPince
    }, FLASH_MS)
  }

  function finishForgePhase1(): void {
    forgeTimer = clearTimer(forgeTimer)

    if (state.forgeCycleLocked && !state.forgeActionClicked) {
      state.forgeDefects += 1
    }

    state.forgeCycleLocked = false
    state.forgePhase = 2
    state.forgeQuality = Math.max(0, 100 - state.forgeDefects * 5)
    state.forgeImage = FORGE_IMAGES.forge
    state.forgeTongs = FORGE_IMAGES.pinceForgee
    state.forgeTongsVisible = true
    state.forgeActionsVisible = false
    state.goTrempeVisible = true
  }

  // ---------------------------------------------------------------------------
  // Étape 3 — Trempe
  // ---------------------------------------------------------------------------
  function resetTrempeStep(): void {
    const reference = currentBiome.value ? currentBiome.value.target : 0
    state.trempeTemperature = reference
    state.trempeQuality = 100
    state.trempePhase = 0
    state.trempeRangeUpper = reference + 100
    state.trempeRangeLower = state.trempeRangeUpper - TREMPE_RANGE_AMPLITUDE
    state.trempeEciBasSum = 0
    state.trempeEciHautSum = 0
    trempeCoolTimer = clearTimer(trempeCoolTimer)
    trempeShrinkTimer = clearTimer(trempeShrinkTimer)
    trempeFlashTimer = clearTimeoutTimer(trempeFlashTimer)
    state.trempeImage = FORGE_IMAGES.trempe
    state.trempeTongs = FORGE_IMAGES.pinceForgee
    state.trempeTongsVisible = true
    state.trempePinceVisible = false
    state.goEndVisible = false
  }

  function startTrempe(): void {
    state.step = 'trempe'
    state.qualityValue = Math.max(0, Math.round(state.furnaceQuality - state.forgeDefects * 5))
    resetTrempeStep()

    // Frise temporelle : la plage de trempe rétrécit toutes les 2 s.
    trempeShrinkTimer = setInterval(() => {
      state.trempeHourglassFlip = !state.trempeHourglassFlip
      if (state.trempePhase === 1) {
        state.trempeRangeUpper -= 100
        state.trempeRangeLower -= 100
      }
    }, TREMPE_SHRINK_MS)
  }

  function trackTrempeGap(): void {
    if (state.trempeTemperature < state.trempeRangeLower) {
      state.trempeEciBasSum += state.trempeRangeLower - state.trempeTemperature
    }
    if (state.trempeTemperature > state.trempeRangeUpper) {
      state.trempeEciHautSum += state.trempeTemperature - state.trempeRangeUpper
    }
  }

  /** Un tick de refroidissement de la trempe (toutes les 1 s). */
  function trempeCoolTick(): void {
    if (state.trempePhase !== 1) return
    state.trempeTemperature -= 5
    trackTrempeGap()
    if (state.trempeTemperature <= 100) finishTrempePhase1()
  }

  /** Clic sur la pince forgée (phase 0) : démarre le refroidissement. */
  function startTrempePhase1(): void {
    if (state.trempePhase !== 0) return
    state.trempePhase = 1
    state.trempeEciBasSum = 0
    state.trempeEciHautSum = 0
    state.trempeImage = FORGE_IMAGES.trempeHaute
    state.trempeTongsVisible = false
    state.trempePinceVisible = true

    trempeCoolTimer = clearTimer(trempeCoolTimer)
    trempeCoolTimer = setInterval(trempeCoolTick, TREMPE_COOL_MS)
  }

  function quenchPince(): void {
    if (state.trempePhase !== 1) return
    audio.play('trempe')
    state.trempeTemperature = Math.max(20, state.trempeTemperature - 100)
    trackTrempeGap()

    state.trempeImage = FORGE_IMAGES.trempeBasse
    trempeFlashTimer = clearTimeoutTimer(trempeFlashTimer)
    trempeFlashTimer = setTimeout(() => {
      if (state.trempePhase === 1) state.trempeImage = FORGE_IMAGES.trempeHaute
    }, FLASH_MS)

    if (state.trempeTemperature <= 100) finishTrempePhase1()
  }

  function computeTrempeQuality(): void {
    if (state.trempeEciBasSum > 0) {
      state.trempeQuality = Math.max(0, 100 - state.trempeEciBasSum / 20)
    } else if (state.trempeEciHautSum > 0) {
      state.trempeQuality = Math.max(0, 100 - state.trempeEciHautSum / 20)
    } else {
      state.trempeQuality = 100
    }
  }

  function finishTrempePhase1(): void {
    state.trempeTemperature = Math.max(20, state.trempeTemperature)
    state.trempePhase = 2
    trempeCoolTimer = clearTimer(trempeCoolTimer)
    trempeShrinkTimer = clearTimer(trempeShrinkTimer)
    trempeFlashTimer = clearTimeoutTimer(trempeFlashTimer)
    state.trempeImage = FORGE_IMAGES.trempe
    state.trempePinceVisible = false
    state.trempeTongs = FORGE_IMAGES.pinceLame
    state.trempeTongsVisible = true
    state.goEndVisible = true
    computeTrempeQuality()
  }

  // ---------------------------------------------------------------------------
  // Étape 4 — Final
  // ---------------------------------------------------------------------------
  function goEnd(): void {
    const eciPenalty = Math.max(state.trempeEciBasSum, state.trempeEciHautSum) / 20
    const finalQuality = Math.max(0, Math.round(state.qualityValue - eciPenalty))
    state.qualityValue = finalQuality
    state.finalQuality = finalQuality
    state.step = 'final'
  }

  function reset(): void {
    dispose()
    state.step = 'intro'
    state.season = null
    state.qualityValue = 0
    state.selectedMinerals = []
    resetFurnaceStep()
    resetForgeStep()
    resetTrempeStep()
  }

  // Nettoyage automatique si appelé dans un composant.
  if (getCurrentInstance()) {
    onBeforeUnmount(dispose)
  }

  return {
    state,
    audio,
    // dérivés
    currentBiome,
    materialQuality,
    furnaceFillPercent,
    furnaceTargetPercent,
    trempeFillPercent,
    trempeRangeBottomPercent,
    trempeRangeHeightPercent,
    // actions
    setBiome,
    start,
    toggleMineral,
    startFurnace,
    clickFurnaceTongs,
    pumpBellows,
    startForge,
    startForgePhase1,
    handleForgeAction,
    startTrempe,
    startTrempePhase1,
    quenchPince,
    goEnd,
    reset,
    dispose,
    // ticks (exposés pour les tests)
    furnaceTick,
    computeFurnaceQuality,
    forgeCycleTick,
    finishForgePhase1,
    trempeCoolTick,
    finishTrempePhase1,
    computeTrempeQuality,
  }
}

export type ForgeSimulatorApi = ReturnType<typeof useForgeSimulator>
