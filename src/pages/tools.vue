<template>
  <section class="tools">
    <h1 class="tools__title">{{ t('pages.tools.title') }}</h1>
    <p class="tools__intro">{{ t('tools.intro') }}</p>

    <div class="tools__tabs" role="tablist">
      <button
        v-for="section in SECTIONS"
        :key="section"
        type="button"
        role="tab"
        class="tools__tab"
        :class="{ 'tools__tab--active': section === activeSection }"
        :aria-selected="section === activeSection"
        @click="activeSection = section"
      >
        {{ t(`tools.sections.${section}`) }}
      </button>
    </div>

    <div class="tools__controls">
      <label v-if="perBiome" class="tools__control">
        <span>{{ t('tools.biomeLabel') }}</span>
        <select v-model="biomeId" class="tools__select">
          <option v-for="biome in BIOMES" :key="biome.id" :value="biome.id">
            {{ t(`tools.biomes.${biome.id}`) }}
          </option>
        </select>
      </label>

      <label v-if="perTier" class="tools__control">
        <span>{{ t('tools.tierLabel') }}</span>
        <select v-model="tier" class="tools__select">
          <option v-for="tierOption in TIERS" :key="tierOption" :value="tierOption">
            {{ t(`tools.tiers.${tierOption}`) }}
          </option>
        </select>
      </label>
    </div>

    <InfoTable :headers="table.headers" :rows="table.rows" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import InfoTable from '@/components/ui/InfoTable.vue'
import {
  BIOMES,
  TIERS,
  type BiomeId,
  type Tier,
  armorsOf,
  constructions,
  processing,
  resourcesOf,
  weaponsOf,
} from '@/content/craft'

const { t, te, locale } = useI18n()

/**
 * Traduit une valeur catégorielle énumérable (outil, type, rôle…). Le FR est
 * la langue canonique des données (affichée telle quelle) ; les autres locales
 * sont traduites via le dictionnaire `tools.values`, avec repli sur la valeur
 * brute si absente. Les noms propres d'items restent non traduits.
 */
function tv(value: string): string {
  if (locale.value === 'fr') return value
  const key = `tools.values.${value}`
  return te(key) ? t(key) : value
}

/**
 * Traduit un nom d'item (ressource, bâtiment, arme, armure) via le lexique
 * `tools.items`. Même logique que `tv` mais sur un namespace distinct (évite
 * les collisions, ex. « Cuisine » catégorie vs bâtiment). Repli FR si absent.
 */
function tvi(value: string): string {
  if (locale.value === 'fr') return value
  const key = `tools.items.${value}`
  return te(key) ? t(key) : value
}

/**
 * Traduit une cellule de coût (« 9 Mangrove », « 30 Charme / + 2 Aubépine
 * (Plaines bonus) ») : quantités conservées, noms et biomes bonus traduits via
 * `tvi`. Le FR reste la valeur brute.
 */
function translateCost(raw: string): string {
  if (locale.value === 'fr' || !raw || raw === '-') return raw
  return raw
    .split(' / ')
    .map((segment) => {
      const m = segment.match(/^(\+\s*)?(\d+)\s+(.+?)(?:\s*\(([^)]+?)\s+bonus\))?$/)
      if (!m) return segment
      const [, plus, qty, name, bonus] = m
      const base = `${plus ? '+ ' : ''}${qty} ${tvi(name.trim())}`
      return bonus ? `${base} (${tvi(bonus.trim())} bonus)` : base
    })
    .join(' / ')
}

const SECTIONS = ['recolte', 'constructions', 'processing', 'weapons', 'armors'] as const
type Section = (typeof SECTIONS)[number]

const activeSection = ref<Section>('recolte')
const biomeId = ref<BiomeId>('foret')
const tier = ref<Tier>('T1')

// Récolte/armes/armures sont par biome ; armes/armures ont aussi un tier.
const perBiome = computed(() => ['recolte', 'weapons', 'armors'].includes(activeSection.value))
const perTier = computed(() => ['weapons', 'armors'].includes(activeSection.value))

interface TableData {
  headers: string[]
  rows: string[][]
}

const table = computed<TableData>(() => {
  switch (activeSection.value) {
    case 'recolte': {
      const h = 'tools.headers.recolte'
      return {
        headers: [
          t(`${h}.tool`),
          t(`${h}.type`),
          t(`${h}.t1`),
          t(`${h}.t2`),
          t(`${h}.t3`),
          t(`${h}.annexes`),
        ],
        rows: resourcesOf(biomeId.value).map((r) => [
          tv(r.outil),
          tv(r.type),
          tvi(r.t1),
          tvi(r.t2),
          tvi(r.t3),
          tvi(r.annexes),
        ]),
      }
    }
    case 'constructions': {
      const h = 'tools.headers.construction'
      return {
        headers: [t(`${h}.building`), t(`${h}.t1`), t(`${h}.t2`), t(`${h}.t3`)],
        rows: constructions.map((c) => [tv(c.Batiments), tvi(c.T1), tvi(c.T2), tvi(c.T3)]),
      }
    }
    case 'processing': {
      const h = 'tools.headers.processing'
      return {
        headers: [t(`${h}.category`), t(`${h}.t1`), t(`${h}.t2`), t(`${h}.t3`)],
        rows: processing.map((p) => [
          tv(p.Catégorie),
          tvi(p['T1 - Hutte Craft']),
          tvi(p['T2 - Maison Artisanale']),
          tvi(p['T3 - Hall des Artisans']),
        ]),
      }
    }
    case 'weapons': {
      const h = 'tools.headers.weapon'
      return {
        headers: [
          t(`${h}.category`),
          t(`${h}.role`),
          t(`${h}.weapon`),
          t(`${h}.qty`),
          t(`${h}.wood`),
          t(`${h}.ore`),
          t(`${h}.fiber`),
          t(`${h}.marine`),
          t(`${h}.resource`),
        ],
        rows: weaponsOf(biomeId.value, tier.value).map((w) => [
          tv(w.Catégorie),
          tv(w.Rôle),
          tvi(w.Arme),
          w['Qté Totale'],
          translateCost(w['Bois craft']),
          translateCost(w['Minerai craft']),
          translateCost(w['Fibres craft']),
          translateCost(w['Ressources marines craft']),
          translateCost(w['Ressources craft']),
        ]),
      }
    }
    default: {
      const h = 'tools.headers.armor'
      return {
        headers: [
          t(`${h}.type`),
          t(`${h}.resistance`),
          t(`${h}.armor`),
          t(`${h}.qtyBase`),
          t(`${h}.qtyBonus`),
          t(`${h}.wood`),
          t(`${h}.ore`),
          t(`${h}.fiber`),
          t(`${h}.marine`),
          t(`${h}.animal`),
        ],
        rows: armorsOf(biomeId.value, tier.value).map((a) => [
          tv(a.Type),
          tv(a.Résistance),
          tvi(a.Armure),
          a['Qté base'],
          a['Qté biome supplémentaire'],
          translateCost(a['Bois craft']),
          translateCost(a['Minerai craft']),
          translateCost(a['Fibres craft']),
          translateCost(a['Marines craft']),
          translateCost(a['Animal craft']),
        ]),
      }
    }
  }
})
</script>

<style scoped>
.tools__title {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-gold);
}

.tools__intro {
  font-family: var(--font-body);
  color: var(--color-gold-light);
  opacity: 0.85;
}

.tools__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0 1rem;
}

.tools__tab {
  font-family: var(--font-body);
  background: transparent;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 2px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.tools__tab--active,
.tools__tab:hover {
  background-color: var(--color-gold);
  color: var(--color-black);
}

.tools__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
}

.tools__control {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-family: var(--font-body);
  color: var(--color-gold);
}

.tools__select {
  font-family: var(--font-body);
  background: var(--color-black);
  color: var(--color-gold-light);
  border: 1px solid var(--color-gold);
  padding: 0.4rem 0.6rem;
  border-radius: 2px;
  min-width: 12rem;
}
</style>
