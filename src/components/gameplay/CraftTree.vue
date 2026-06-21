<template>
  <div class="craft">
    <p class="craft__intro">{{ t('tools.intro') }}</p>

    <div class="craft__tabs" role="tablist">
      <button
        v-for="section in SECTIONS"
        :key="section"
        type="button"
        role="tab"
        class="craft__tab"
        :class="{ 'craft__tab--active': section === activeSection }"
        :aria-selected="section === activeSection"
        @click="activeSection = section"
      >
        {{ t(`tools.sections.${section}`) }}
      </button>
    </div>

    <div class="craft__controls">
      <div v-if="perBiome" class="craft__control">
        <span class="craft__control-label">{{ t('tools.biomeLabel') }}</span>
        <SelectMenu
          :model-value="biomeId"
          :options="biomeOptions"
          :aria-label="t('tools.biomeLabel')"
          @update:model-value="biomeId = $event as BiomeId"
        />
      </div>

      <div v-if="perTier" class="craft__control">
        <span class="craft__control-label">{{ t('tools.tierLabel') }}</span>
        <SelectMenu
          :model-value="tier"
          :options="tierOptions"
          :aria-label="t('tools.tierLabel')"
          @update:model-value="tier = $event as Tier"
        />
      </div>
    </div>

    <InfoTable :headers="table.headers" :rows="table.rows" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import InfoTable from '@/components/ui/InfoTable.vue'
import SelectMenu from '@/components/ui/SelectMenu.vue'
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

/**
 * Retire le mot « bonus » des cellules de coût (« (Plaines bonus) » →
 * « (Plaines) »). Demandé par le PO sur le tableau des armures : le biome
 * supplémentaire reste indiqué entre parenthèses, sans la mention « bonus ».
 */
function stripBonus(value: string): string {
  return value.replace(/\s+bonus\)/g, ')')
}

const SECTIONS = ['recolte', 'constructions', 'processing', 'weapons', 'armors'] as const
type Section = (typeof SECTIONS)[number]

const activeSection = ref<Section>('recolte')
const biomeId = ref<BiomeId>('foret')
const tier = ref<Tier>('T1')

// Options des dropdowns (libellés traduits, recalculés au changement de locale).
const biomeOptions = computed(() =>
  BIOMES.map((biome) => ({ value: biome.id, label: t(`tools.biomes.${biome.id}`) })),
)
const tierOptions = computed(() =>
  TIERS.map((tierOption) => ({ value: tierOption, label: t(`tools.tiers.${tierOption}`) })),
)

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
          stripBonus(translateCost(a['Bois craft'])),
          stripBonus(translateCost(a['Minerai craft'])),
          stripBonus(translateCost(a['Fibres craft'])),
          stripBonus(translateCost(a['Marines craft'])),
          stripBonus(translateCost(a['Animal craft'])),
        ]),
      }
    }
  }
})
</script>

<style scoped>
/* L'arbre de craft sort de la colonne de contenu (max 1180px) pour offrir au
   tableau une largeur confortable (demande PO : « agrandir le tableau »). Le
   breakout est centré sur le viewport ; InfoTable gère le scroll horizontal
   au-delà. */
.craft {
  width: min(1500px, 94vw);
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.craft__intro {
  font-family: var(--font-body);
  color: var(--ash);
  max-width: 60ch;
  margin: 0 0 2rem;
  line-height: 1.6;
}

.craft__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0 0 1.6rem;
}
.craft__tab {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--parchment);
  background: rgba(202, 164, 90, 0.06);
  border: 1px solid rgba(202, 164, 90, 0.28);
  padding: 0.6rem 1.1rem;
  cursor: pointer;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  transition:
    background 0.25s,
    color 0.25s,
    border-color 0.25s;
}
.craft__tab:hover {
  color: var(--color-gold-light);
  border-color: rgba(202, 164, 90, 0.5);
}
.craft__tab--active {
  background: linear-gradient(150deg, var(--color-gold-light), var(--color-gold) 70%);
  border-color: transparent;
  color: #1a1206;
}

.craft__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.4rem;
}
.craft__control {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.craft__control-label {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.68rem;
  color: var(--color-gold);
}
</style>
