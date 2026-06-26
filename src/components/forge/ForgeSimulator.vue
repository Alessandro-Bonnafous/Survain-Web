<template>
  <div class="sim">
    <!-- Bandeau : biome, arme, saison, qualité globale, son -->
    <div class="sim__band">
      <div class="sim__cell">
        <span class="sim__label">{{ t('forge.biomeLabel') }}</span>
        <select
          v-if="state.step === 'intro'"
          class="sim__select"
          :value="state.biome"
          @change="onBiomeChange"
        >
          <option value="">{{ t('forge.biomePlaceholder') }}</option>
          <option v-for="key in biomeKeys" :key="key" :value="key">
            {{ t(`forge.biomes.${key}`) }}
          </option>
        </select>
        <span v-else class="sim__value">{{
          state.biome ? t(`forge.biomes.${state.biome}`) : '—'
        }}</span>
      </div>

      <div class="sim__cell sim__cell--weapon">
        <img
          v-if="currentBiome"
          class="sim__weapon-icon"
          :src="currentBiome.weaponIcon"
          :alt="t(`forge.weapons.${state.biome}`)"
        />
        <div>
          <span class="sim__label">{{ t('forge.weaponLabel') }}</span>
          <span class="sim__value">
            {{ state.biome ? t(`forge.weapons.${state.biome}`) : t('forge.weaponPlaceholder') }}
          </span>
        </div>
      </div>

      <div class="sim__cell">
        <span class="sim__label">{{ t('forge.seasonLabel') }}</span>
        <span class="sim__value">
          {{
            state.season ? t(`forge.seasons.${state.season}.name`) : t('forge.seasonPlaceholder')
          }}
        </span>
        <span v-if="state.season" class="sim__season-detail">
          {{ t(`forge.seasons.${state.season}.effect`) }}
        </span>
      </div>

      <div class="sim__cell">
        <span class="sim__label" :title="t('forge.qualityHint')">{{ t('forge.quality') }}</span>
        <span class="sim__quality">{{ state.qualityValue }}%</span>
      </div>

      <div class="sim__cell sim__cell--actions">
        <button type="button" class="sim__icon-btn" @click="sim.audio.toggleMute()">
          {{ sim.audio.muted.value ? t('forge.unmute') : t('forge.mute') }}
        </button>
        <button
          v-if="state.step !== 'intro'"
          type="button"
          class="sim__icon-btn"
          @click="sim.reset()"
        >
          {{ t('forge.restart') }}
        </button>
      </div>
    </div>

    <section class="stage">
      <h2 class="stage__title">{{ t('forge.page.stage') }}</h2>

      <!-- INTRO -->
      <div v-if="state.step === 'intro'" class="panel intro">
        <p class="intro__text">{{ t('forge.page.intro') }}</p>
        <button type="button" class="next-btn" :disabled="!state.biome" @click="sim.start()">
          {{ t('forge.start') }}
        </button>
      </div>

      <!-- ÉTAPE 0 : MATÉRIAUX -->
      <div v-else-if="state.step === 'materials'" class="panel">
        <h3 class="panel__title">{{ t('forge.materials.title') }}</h3>
        <div class="materials">
          <div class="materials__map">
            <img class="materials__img" :src="IMAGES.minerais" alt="" />
            <button
              v-for="m in minerals"
              :key="m.id"
              type="button"
              class="hotspot"
              :class="{ 'hotspot--active': state.selectedMinerals.includes(m.id) }"
              :style="{ left: m.left + '%', top: m.top + '%' }"
              @click="sim.toggleMineral(m.id)"
            >
              {{ t(`forge.minerals.${m.id}`) }}
            </button>
          </div>

          <div class="materials__side">
            <h4 class="materials__heading">{{ t('forge.materials.selected') }}</h4>
            <ul v-if="state.selectedMinerals.length" class="materials__list">
              <li v-for="id in state.selectedMinerals" :key="id">
                {{ t(`forge.minerals.${id}`) }}
              </li>
            </ul>
            <p v-else class="materials__empty">{{ t('forge.materials.none') }}</p>
          </div>

          <div class="materials__quality">
            <span class="sim__label" :title="t('forge.materials.hint')">{{
              t('forge.quality')
            }}</span>
            <span class="quality-big">{{ materialQuality }}%</span>
            <button
              v-if="materialQuality >= 100"
              type="button"
              class="next-btn"
              @click="sim.startFurnace()"
            >
              {{ t('forge.materials.next') }}
            </button>
          </div>
        </div>
      </div>

      <!-- ÉTAPE 1 : FOURNEAU -->
      <div v-else-if="state.step === 'furnace'" class="panel">
        <h3 class="panel__title">{{ t('forge.furnace.title') }}</h3>
        <div class="layout layout--gauge">
          <div class="gauge">
            <div class="gauge__title">{{ t('forge.temperature') }}</div>
            <div class="gauge__shell">
              <div
                class="gauge__marker"
                :style="{ bottom: furnaceTargetPercent + '%', color: currentBiome?.color }"
              />
              <div class="gauge__fill" :style="{ height: furnaceFillPercent + '%' }" />
            </div>
            <div class="gauge__value">{{ Math.round(state.furnaceTemperature) }}°C</div>
          </div>

          <div class="scene">
            <img class="scene__img" :src="state.furnaceImage" alt="" />
            <button
              class="hot hot--bellows"
              type="button"
              :aria-label="t('forge.furnace.bellows')"
              @click="sim.pumpBellows()"
            />
          </div>

          <div class="tools">
            <img
              class="tools__hourglass"
              :class="{ 'is-tick': state.furnaceHourglassFlip }"
              :src="IMAGES.sablier"
              alt=""
            />
            <img
              class="tools__tongs"
              :src="state.furnaceTongs"
              :alt="t('forge.furnace.tongs')"
              @click="sim.clickFurnaceTongs()"
            />
          </div>

          <div class="result">
            <span class="sim__label">{{ t('forge.quality') }}</span>
            <span class="quality-big">{{ Math.round(state.furnaceQuality) }}%</span>
            <p class="result__feedback">{{ furnaceFeedback }}</p>
            <button
              v-if="state.goForgeVisible"
              type="button"
              class="next-btn"
              @click="sim.startForge()"
            >
              {{ t('forge.furnace.next') }}
            </button>
          </div>
        </div>
      </div>

      <!-- ÉTAPE 2 : FORGE -->
      <div v-else-if="state.step === 'forge'" class="panel">
        <h3 class="panel__title">{{ t('forge.forge.title') }}</h3>
        <div class="layout">
          <div class="scene scene--wide">
            <img class="scene__img" :src="state.forgeImage" alt="" />
            <button
              v-show="state.forgeActionsVisible"
              class="hot hot--hammer"
              type="button"
              :aria-label="t('forge.forge.hammer')"
              @click="sim.handleForgeAction('hammer')"
            />
            <button
              v-show="state.forgeActionsVisible"
              class="hot hot--pince"
              type="button"
              :aria-label="t('forge.forge.pince')"
              @click="sim.handleForgeAction('pince')"
            />
          </div>

          <div class="tools">
            <img
              class="tools__hourglass"
              :class="{ 'is-tick': state.forgeHourglassFlip }"
              :src="IMAGES.sablier"
              alt=""
            />
            <img
              v-show="state.forgeTongsVisible"
              class="tools__tongs"
              :src="state.forgeTongs"
              :alt="t('forge.forge.tongs')"
              @click="sim.startForgePhase1()"
            />
          </div>

          <div class="result">
            <span class="sim__label">{{ t('forge.quality') }}</span>
            <span class="quality-big">{{ Math.round(state.forgeQuality) }}%</span>
            <p class="result__feedback">{{ forgeFeedback }}</p>
            <button
              v-if="state.goTrempeVisible"
              type="button"
              class="next-btn"
              @click="sim.startTrempe()"
            >
              {{ t('forge.forge.next') }}
            </button>
          </div>
        </div>
      </div>

      <!-- ÉTAPE 3 : TREMPE -->
      <div v-else-if="state.step === 'trempe'" class="panel">
        <h3 class="panel__title">{{ t('forge.trempe.title') }}</h3>
        <div class="layout layout--gauge">
          <div class="gauge">
            <div class="gauge__title">{{ t('forge.temperature') }}</div>
            <div class="gauge__shell">
              <div
                class="gauge__range"
                :style="{
                  bottom: trempeRangeBottomPercent + '%',
                  height: trempeRangeHeightPercent + '%',
                }"
              />
              <div class="gauge__fill" :style="{ height: trempeFillPercent + '%' }" />
            </div>
            <div class="gauge__value">{{ Math.round(state.trempeTemperature) }}°C</div>
          </div>

          <div class="scene">
            <img class="scene__img" :src="state.trempeImage" alt="" />
            <button
              v-show="state.trempePinceVisible"
              class="hot hot--trempe"
              type="button"
              :aria-label="t('forge.trempe.pince')"
              @click="sim.quenchPince()"
            />
          </div>

          <div class="tools">
            <img
              class="tools__hourglass"
              :class="{ 'is-tick': state.trempeHourglassFlip }"
              :src="IMAGES.sablier"
              alt=""
            />
            <img
              v-show="state.trempeTongsVisible"
              class="tools__tongs"
              :src="state.trempeTongs"
              :alt="t('forge.trempe.pince')"
              @click="sim.startTrempePhase1()"
            />
          </div>

          <div class="result">
            <span class="sim__label">{{ t('forge.quality') }}</span>
            <span class="quality-big">{{ Math.round(state.trempeQuality) }}%</span>
            <p class="result__feedback">{{ trempeFeedback }}</p>
            <button v-if="state.goEndVisible" type="button" class="next-btn" @click="sim.goEnd()">
              {{ t('forge.trempe.next') }}
            </button>
          </div>
        </div>
      </div>

      <!-- ÉTAPE 4 : FINAL -->
      <div v-else class="panel">
        <h3 class="panel__title">{{ t('forge.final.title') }}</h3>
        <div class="final">
          <div class="final__text">
            <p>
              <i18n-t keypath="forge.final.quality">
                <template #q
                  ><strong class="final__q">{{ state.finalQuality }}</strong></template
                >
              </i18n-t>
            </p>
            <p>{{ t('forge.final.reproduce') }}</p>
            <p>{{ t('forge.final.teach') }}<br />{{ t('forge.final.library') }}</p>
            <hr />
            <p>{{ t('forge.final.finalize') }}</p>
            <ul>
              <li>{{ t('forge.final.items.manche') }}</li>
              <li>{{ t('forge.final.items.bandeau') }}</li>
              <li>{{ t('forge.final.items.aiguisement') }}</li>
              <li>{{ t('forge.final.items.ornement') }}</li>
            </ul>
            <p class="final__ref">{{ t('forge.final.ref') }}</p>
            <button type="button" class="next-btn" @click="sim.reset()">
              {{ t('forge.restart') }}
            </button>
          </div>
          <div class="final__image">
            <img :src="IMAGES.lame" :alt="t('forge.final.title')" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useForgeSimulator } from '@/composables/useForgeSimulator'
import { BIOME_KEYS, FORGE_IMAGES as IMAGES, MINERALS, type BiomeKey } from '@/config/forge'

const { t } = useI18n()
const sim = useForgeSimulator()
const { state, currentBiome, materialQuality } = sim
const {
  furnaceFillPercent,
  furnaceTargetPercent,
  trempeFillPercent,
  trempeRangeBottomPercent,
  trempeRangeHeightPercent,
} = sim

const biomeKeys = BIOME_KEYS
const minerals = MINERALS

function onBiomeChange(event: Event): void {
  sim.setBiome((event.target as HTMLSelectElement).value as BiomeKey | '')
}

const furnaceFeedback = computed(() => {
  if (state.furnacePhase !== 'finished') return t('forge.qualityHint')
  const duration =
    state.furnaceDC < 0
      ? t('forge.furnace.durationShort')
      : state.furnaceDC > 0
        ? t('forge.furnace.durationLong')
        : t('forge.furnace.durationPerfect')
  const heat =
    state.furnaceDtiNegativeSum > state.furnaceDtiPositiveSum
      ? t('forge.furnace.heatCracks')
      : state.furnaceDtiNegativeSum < state.furnaceDtiPositiveSum
        ? t('forge.furnace.heatBurnt')
        : t('forge.furnace.heatControlled')
  const signedDC = state.furnaceDC > 0 ? `+${state.furnaceDC}` : String(state.furnaceDC)
  const detail = t('forge.furnace.detail', {
    dc: signedDC,
    neg: Math.round(state.furnaceDtiNegativeSum),
    pos: Math.round(state.furnaceDtiPositiveSum),
  })
  return `${duration} · ${heat} · ${detail}`
})

const forgeFeedback = computed(() => {
  if (state.forgePhase < 2) return t('forge.forge.default')
  if (state.forgeDefects > 0)
    return t('forge.forge.defects', { n: state.forgeDefects }, state.forgeDefects)
  return t('forge.forge.goodRhythm')
})

const trempeFeedback = computed(() => {
  if (state.trempePhase < 2) return t('forge.trempe.default')
  if (state.trempeEciBasSum > 0)
    return `${t('forge.trempe.tooFast')} · ${t('forge.trempe.eciLow', { v: Math.round(state.trempeEciBasSum) })}`
  if (state.trempeEciHautSum > 0)
    return `${t('forge.trempe.tooSlow')} · ${t('forge.trempe.eciHigh', { v: Math.round(state.trempeEciHautSum) })}`
  return t('forge.trempe.perfect')
})
</script>

<style scoped>
.sim {
  --sim-panel: rgba(18, 14, 10, 0.88);
  --sim-card: linear-gradient(180deg, rgba(44, 37, 29, 0.94), rgba(8, 8, 8, 0.98));
  --sim-edge: rgba(202, 164, 90, 0.52);
  color: var(--parchment);
}

/* ---------- Bandeau ---------- */
.sim__band {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: stretch;
  margin-bottom: 1.6rem;
}
.sim__cell {
  background: var(--sim-card);
  border: 2px solid var(--sim-edge);
  padding: 0.8rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  justify-content: center;
  min-width: 9rem;
}
.sim__cell--weapon {
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
}
.sim__cell--actions {
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
  margin-left: auto;
}
.sim__label {
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 0.66rem;
  letter-spacing: var(--tracking-caps);
  color: var(--color-gold);
}
.sim__value {
  font-size: 1rem;
  color: var(--color-gold-light);
}
.sim__season-detail {
  font-size: 0.74rem;
  color: var(--ash);
}
.sim__quality {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-gold-light);
}
.sim__weapon-icon {
  width: 46px;
  height: 46px;
  object-fit: contain;
}
.sim__select {
  background: rgba(5, 5, 5, 0.9);
  border: 1px solid var(--sim-edge);
  color: var(--color-gold-light);
  font-family: var(--font-body);
  font-size: 0.95rem;
  padding: 0.4rem 0.6rem;
}
.sim__icon-btn {
  background: var(--sim-card);
  border: 1px solid var(--sim-edge);
  color: var(--color-gold-light);
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  transition: border-color 0.2s;
}
.sim__icon-btn:hover {
  border-color: var(--color-gold-light);
}

/* ---------- Scène / panneaux ---------- */
.stage {
  position: relative;
}
.stage__title {
  margin: 0 0 1.5rem;
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-gold-light);
}
.panel {
  background: var(--sim-panel);
  border: 2px solid rgba(84, 54, 22, 0.9);
  box-shadow: inset 0 0 28px rgba(0, 0, 0, 0.55);
  padding: 1.4rem;
}
.panel__title {
  margin: 0 0 1.4rem;
  text-align: center;
  font-family: var(--font-display);
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-gold);
}

.intro {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  padding: 2.6rem 1.4rem;
}
.intro__text {
  max-width: 48ch;
  margin: 0;
  line-height: 1.6;
  font-size: 1.05rem;
}

.next-btn {
  margin-top: 1.2rem;
  padding: 0.8rem 1.8rem;
  cursor: pointer;
  color: var(--color-gold-light);
  background: var(--sim-card);
  border: 2px solid rgba(202, 164, 90, 0.7);
  font-family: var(--font-display);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition:
    transform 0.2s,
    border-color 0.2s;
}
.next-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: var(--color-gold-light);
}
.next-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ---------- Layouts d'étape ---------- */
.layout {
  display: grid;
  grid-template-columns: minmax(420px, 1.3fr) minmax(260px, 0.7fr) 220px;
  gap: 1.4rem;
  align-items: stretch;
}
.layout--gauge {
  grid-template-columns: 140px minmax(380px, 1.2fr) minmax(240px, 0.7fr) 220px;
}

.gauge,
.tools,
.result {
  background: var(--sim-card);
  border: 2px solid var(--sim-edge);
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.6rem;
}
.gauge__title {
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: var(--color-gold);
}
.gauge__shell {
  width: 54px;
  height: 340px;
  border: 2px solid rgba(240, 210, 142, 0.78);
  border-radius: 30px;
  background: rgba(5, 5, 5, 0.92);
  position: relative;
  box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.9);
}
.gauge__fill {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(0deg, #ff2a00, #ff8a00, #ffe08a);
  border-radius: 0 0 28px 28px;
  transition: height 0.25s ease;
}
.gauge__marker {
  position: absolute;
  left: -8px;
  right: -8px;
  height: 6px;
  background: currentColor;
  border-radius: 999px;
  box-shadow: 0 0 12px currentColor;
  z-index: 5;
}
.gauge__range {
  position: absolute;
  left: -8px;
  right: -8px;
  border-top: 3px solid #7fffd4;
  border-bottom: 3px solid #7fffd4;
  background: rgba(127, 255, 212, 0.18);
  box-shadow: 0 0 10px rgba(127, 255, 212, 0.7);
  z-index: 4;
  transition:
    bottom 0.25s ease,
    height 0.25s ease;
}
.gauge__value {
  font-size: 1.3rem;
  color: var(--color-gold-light);
}

.scene {
  position: relative;
  min-height: 420px;
  border: 2px solid rgba(202, 164, 90, 0.45);
  background: #060504;
  overflow: hidden;
}
.scene__img {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
  display: block;
}
.hot {
  position: absolute;
  border: none;
  background: rgba(255, 255, 255, 0);
  cursor: pointer;
}
.hot:active {
  background: rgba(255, 210, 100, 0.13);
}
.hot--bellows {
  right: 6%;
  bottom: 16%;
  width: 39%;
  height: 31%;
}
.hot--hammer {
  left: 0;
  top: 15%;
  width: 42%;
  height: 62%;
}
.hot--pince {
  right: 0;
  top: 42%;
  width: 50%;
  height: 38%;
}
.hot--trempe {
  right: 0;
  top: 0;
  width: 42%;
  height: 48%;
}

.tools {
  gap: 1.6rem;
}
.tools__hourglass {
  width: 120px;
  height: 120px;
  object-fit: contain;
  transition: transform 0.25s ease;
}
.tools__hourglass.is-tick {
  transform: rotate(180deg);
}
.tools__tongs {
  width: 100%;
  max-width: 300px;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.15s ease;
}
.tools__tongs:hover {
  transform: scale(1.03);
}

.result__feedback {
  font-size: 0.82rem;
  line-height: 1.4;
  color: var(--ash);
  margin: 0;
}
.quality-big {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-gold-light);
}

/* ---------- Matériaux ---------- */
.materials {
  display: grid;
  grid-template-columns: minmax(420px, 1.35fr) minmax(240px, 0.75fr) 220px;
  gap: 1.4rem;
  align-items: stretch;
}
.materials__map {
  position: relative;
  min-height: 460px;
  border: 2px solid rgba(202, 164, 90, 0.45);
  background: #060504;
  overflow: hidden;
}
.materials__img {
  width: 100%;
  height: 100%;
  min-height: 460px;
  object-fit: cover;
  display: block;
}
.hotspot {
  position: absolute;
  min-width: 100px;
  padding: 0.4rem 0.5rem;
  border: 1px solid rgba(240, 210, 142, 0.78);
  border-radius: 6px;
  background: rgba(12, 9, 5, 0.72);
  color: #ffe3a0;
  font-family: var(--font-body);
  font-size: 0.78rem;
  line-height: 1.1;
  text-align: center;
  cursor: pointer;
  text-shadow: 0 2px 5px #000;
  transition: all 0.15s ease;
}
.hotspot:hover,
.hotspot--active {
  color: #fff1c4;
  border-color: #ffe0a0;
  background: rgba(82, 55, 20, 0.92);
  box-shadow: 0 0 16px rgba(202, 164, 90, 0.42);
  transform: translateY(-1px);
}
.materials__side,
.materials__quality {
  background: var(--sim-card);
  border: 2px solid var(--sim-edge);
  padding: 1.1rem;
}
.materials__quality {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.6rem;
}
.materials__heading {
  margin: 0 0 0.8rem;
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.04em;
  color: var(--color-gold);
}
.materials__list {
  margin: 0;
  padding-left: 1.3rem;
  color: #ffe3a0;
  line-height: 1.6;
}
.materials__empty {
  margin: 0;
  color: var(--ash);
}

/* ---------- Final ---------- */
.final {
  display: grid;
  grid-template-columns: minmax(360px, 1fr) minmax(300px, 0.85fr);
  gap: 1.6rem;
  align-items: center;
  background: var(--sim-card);
  border: 2px solid var(--sim-edge);
  padding: 1.8rem;
}
.final__text {
  line-height: 1.55;
}
.final__text p {
  margin: 0 0 1rem;
}
.final__text ul {
  margin: 0.5rem 0 0 1.4rem;
}
.final__text hr {
  border: none;
  border-top: 1px solid var(--sim-edge);
  margin: 1.2rem 0;
}
.final__q {
  color: var(--color-gold-light);
  font-size: 1.6rem;
}
.final__ref {
  color: var(--ash);
  font-size: 0.85rem;
}
.final__image {
  border: 2px solid var(--sim-edge);
  background: #080604;
  padding: 0.8rem;
}
.final__image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

/* ---------- Responsive ---------- */
@media (max-width: 980px) {
  .layout,
  .layout--gauge,
  .materials,
  .final {
    grid-template-columns: 1fr;
  }
  .gauge__shell {
    height: 220px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gauge__fill,
  .gauge__range,
  .tools__hourglass,
  .tools__tongs,
  .next-btn {
    transition: none;
  }
}
</style>
