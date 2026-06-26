/**
 * Données statiques du simulateur de forge (« T3 — Hall des Artisans »),
 * portées fidèlement depuis le legacy `Simulateur.html`.
 *
 * Les libellés (biomes, saisons, minerais, armes) sont traduits via i18n
 * (namespace `forge`) à partir des identifiants stables définis ici ; ces
 * identifiants servent aussi de clé d'égalité pour la sélection des matériaux.
 *
 * Assets servis statiquement depuis `public/images/forge/` et
 * `public/sons/forge/`.
 */

export type BiomeKey = 'cote' | 'foret' | 'montagnes' | 'plaines'
export type SeasonKey = 'automne' | 'ete' | 'hiver' | 'printemps'

/** Base des chemins d'assets (publics, servis tels quels). */
export const FORGE_IMG = '/images/forge'
export const FORGE_SND = '/sons/forge'

/** Images réutilisées dans plusieurs étapes. */
export const FORGE_IMAGES = {
  fourneau: `${FORGE_IMG}/fourneau.webp`,
  fourneauMinerai: `${FORGE_IMG}/fourneau-minerai.webp`,
  pinceFroide: `${FORGE_IMG}/pince-froide.webp`,
  pinceVide: `${FORGE_IMG}/pince-vide.webp`,
  pinceChaude: `${FORGE_IMG}/pince-chaude.webp`,
  pinceForgee: `${FORGE_IMG}/pince-forgee.webp`,
  pinceLame: `${FORGE_IMG}/pince-lame.webp`,
  forge: `${FORGE_IMG}/forge.webp`,
  forgeMarteau: `${FORGE_IMG}/forge-marteau.webp`,
  forgePince: `${FORGE_IMG}/forge-pince.webp`,
  forgeMarteauPince: `${FORGE_IMG}/forge-marteau-pince.webp`,
  trempe: `${FORGE_IMG}/trempe.webp`,
  trempeHaute: `${FORGE_IMG}/trempe-haute.webp`,
  trempeBasse: `${FORGE_IMG}/trempe-basse.webp`,
  sablier: `${FORGE_IMG}/sablier.webp`,
  lame: `${FORGE_IMG}/lame.webp`,
  minerais: `${FORGE_IMG}/minerais.webp`,
} as const

export interface BiomeDef {
  key: BiomeKey
  /** Image de fond du bandeau biome. */
  background: string
  /** Icône de l'arme associée. */
  weaponIcon: string
  /** Température cible du fourneau (°C). */
  target: number
  /** Nombre de cycles idéal au fourneau. */
  cycles: number
  /** Couleur du marqueur de cible sur la jauge. */
  color: string
}

export const BIOMES: Record<BiomeKey, BiomeDef> = {
  cote: {
    key: 'cote',
    background: `${FORGE_IMG}/biome-cote-maritime.webp`,
    weaponIcon: `${FORGE_IMG}/coutelas.webp`,
    target: 850,
    cycles: 4,
    color: '#6fd3ff',
  },
  foret: {
    key: 'foret',
    background: `${FORGE_IMG}/biome-foret.webp`,
    weaponIcon: `${FORGE_IMG}/epee-forestiere.webp`,
    target: 950,
    cycles: 5,
    color: '#62d96b',
  },
  montagnes: {
    key: 'montagnes',
    background: `${FORGE_IMG}/biome-montagnes.webp`,
    weaponIcon: `${FORGE_IMG}/hache-de-mineur.webp`,
    target: 1100,
    cycles: 6,
    color: '#ff944d',
  },
  plaines: {
    key: 'plaines',
    background: `${FORGE_IMG}/biome-plaines.webp`,
    weaponIcon: `${FORGE_IMG}/fleuret-cavalier.webp`,
    target: 1200,
    cycles: 3,
    color: '#ffe066',
  },
}

export const BIOME_KEYS: BiomeKey[] = ['cote', 'montagnes', 'plaines', 'foret']

export interface SeasonDef {
  key: SeasonKey
  /** Facteur appliqué à la perte de chaleur (refroidissement). */
  coolingFactor: number
  /** Facteur appliqué au gain de chaleur (soufflet). */
  heatingFactor: number
}

export const SEASONS: Record<SeasonKey, SeasonDef> = {
  automne: { key: 'automne', coolingFactor: 1, heatingFactor: 0.9 },
  ete: { key: 'ete', coolingFactor: 0.9, heatingFactor: 1.1 },
  hiver: { key: 'hiver', coolingFactor: 1.1, heatingFactor: 0.9 },
  printemps: { key: 'printemps', coolingFactor: 1, heatingFactor: 1 },
}

export const SEASON_KEYS: SeasonKey[] = ['automne', 'ete', 'hiver', 'printemps']

export interface MineralDef {
  /** Identifiant stable (clé i18n + clé d'égalité de sélection). */
  id: string
  /** Position de l'étiquette sur la carte des minerais (en %). */
  left: number
  top: number
}

/**
 * 16 minerais, positionnés comme dans le legacy (`.m1`..`.m16`).
 * Ordre par biome : cote (1-4), forêt (5-8), montagnes (9-12), plaines (13-16).
 */
export const MINERALS: MineralDef[] = [
  // Côte maritime
  { id: 'sel-gemme', left: 8, top: 28 },
  { id: 'cuivre-marin', left: 39, top: 28 },
  { id: 'perle-minerale', left: 70, top: 28 },
  { id: 'fer-vaseux', left: 8, top: 55 },
  // Forêt
  { id: 'cuivre', left: 39, top: 55 },
  { id: 'fer', left: 70, top: 55 },
  { id: 'argent', left: 8, top: 83 },
  { id: 'orichalque', left: 39, top: 83 },
  // Montagnes
  { id: 'fer-brut', left: 70, top: 83 },
  { id: 'or', left: 8, top: 8 },
  { id: 'mithril', left: 39, top: 8 },
  { id: 'obsidienne', left: 70, top: 8 },
  // Plaines
  { id: 'etain', left: 8, top: 41 },
  { id: 'zinc', left: 39, top: 41 },
  { id: 'quartz-pur', left: 70, top: 41 },
  { id: 'cristal-solaire', left: 39, top: 69 },
]

/** 4 matériaux corrects par biome (25 % de qualité chacun). */
export const REQUIRED_MATERIALS_BY_BIOME: Record<BiomeKey, string[]> = {
  cote: ['sel-gemme', 'cuivre-marin', 'perle-minerale', 'fer-vaseux'],
  foret: ['cuivre', 'fer', 'argent', 'orichalque'],
  montagnes: ['fer-brut', 'or', 'mithril', 'obsidienne'],
  plaines: ['etain', 'zinc', 'quartz-pur', 'cristal-solaire'],
}

/** Bornes de température de la jauge fourneau (°C). */
export const FURNACE_TEMP_MIN = 600
export const FURNACE_TEMP_MAX = 1300

/** Bornes de température de la jauge trempe (°C). */
export const TREMPE_TEMP_MIN = 20
export const TREMPE_TEMP_MAX = 1500

/** Amplitude initiale de la plage de trempe (°C). */
export const TREMPE_RANGE_AMPLITUDE = 150

/** Durées des minuteries (ms), reprises du legacy. */
export const FURNACE_TICK_MS = 2000
export const FORGE_CYCLE_MS = 2000
export const TREMPE_COOL_MS = 1000
export const TREMPE_SHRINK_MS = 2000
/** Durée du flash d'image après une action (ms). */
export const FLASH_MS = 1000
/** Nombre de cycles de la phase de forge. */
export const FORGE_CYCLE_COUNT = 10
