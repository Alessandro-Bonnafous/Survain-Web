import data from './data.json'

/**
 * Arbre de craft — données de référence du jeu, extraites verbatim du site
 * legacy (Arbre-Craft.html). Ce sont des **valeurs canoniques** : identiques
 * quelle que soit la locale (seuls les libellés d'UI sont traduits, cf. i18n
 * namespace `tools`). Les noms d'items/ressources ne sont pas traduits.
 */

export type Tier = 'T1' | 'T2' | 'T3'
export const TIERS: readonly Tier[] = ['T1', 'T2', 'T3']

/** Biomes : `value` = chaîne utilisée dans les données ; `id` = clé i18n. */
export const BIOMES = [
  { id: 'foret', value: 'Forêt' },
  { id: 'plaines', value: 'Plaines' },
  { id: 'montagnes', value: 'Montagnes' },
  { id: 'cote', value: 'Côte maritime' },
] as const

export type BiomeId = (typeof BIOMES)[number]['id']

export interface Resource {
  biome: string
  outil: string
  type: string
  t1: string
  t2: string
  t3: string
  annexes: string
}

export interface Construction {
  Catégorie: string
  Batiments: string
  T1: string
  T2: string
  T3: string
}

export interface Processing {
  Catégorie: string
  'T1 - Hutte Craft': string
  'T2 - Maison Artisanale': string
  'T3 - Hall des Artisans': string
}

export interface Weapon {
  Biome: string
  Catégorie: string
  Rôle: string
  Arme: string
  'Qté Totale': string
  'Bois craft': string
  'Minerai craft': string
  'Fibres craft': string
  'Ressources marines craft': string
  'Ressources craft': string
}

export interface Armor {
  Biome: string
  'Biome supplémentaire': string
  Résistance: string
  Type: string
  Armure: string
  'Qté base': string
  'Qté biome supplémentaire': string
  'Bois craft': string
  'Minerai craft': string
  'Fibres craft': string
  'Marines craft': string
  'Animal craft': string
}

const craft = data as unknown as {
  ressources: Resource[]
  constructions: Construction[]
  processing: Processing[]
  weapons: Record<Tier, Weapon[]>
  armors: Record<Tier, Armor[]>
}

export const resources = craft.ressources
export const constructions = craft.constructions
export const processing = craft.processing
export const weaponsByTier = craft.weapons
export const armorsByTier = craft.armors

export function biomeValue(id: BiomeId): string {
  return BIOMES.find((b) => b.id === id)?.value ?? BIOMES[0].value
}

export function resourcesOf(id: BiomeId): Resource[] {
  return resources.filter((r) => r.biome === biomeValue(id))
}

export function weaponsOf(id: BiomeId, tier: Tier): Weapon[] {
  return weaponsByTier[tier].filter((w) => w.Biome === biomeValue(id))
}

export function armorsOf(id: BiomeId, tier: Tier): Armor[] {
  return armorsByTier[tier].filter((a) => a.Biome === biomeValue(id))
}
