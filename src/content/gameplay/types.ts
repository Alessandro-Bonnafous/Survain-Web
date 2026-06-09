/**
 * Schéma de contenu de la page Gameplay.
 *
 * Source unique : la **structure** (catégories → chapitres → blocs) vit dans
 * `structure.ts`, indépendante de la langue. Tout texte traduisible y est
 * référencé par une **clé i18n** (résolue via `t()` dans les composants), et le
 * texte vit dans `locales/<lang>/gameplay.json`.
 *
 * Les **valeurs invariantes** (pourcentages, effectifs…) — qui doivent être
 * strictement identiques entre locales car elles servent de référence au jeu —
 * sont écrites une seule fois, en littéral, directement dans la structure.
 *
 * La présentation est volontairement neutre : la maquette de Thierry ne
 * touchera que la couche d'affichage, pas ces données.
 */

/**
 * Cellule de tableau :
 * - `string` → valeur littérale **invariante** (ex. `'25%'`), partagée par
 *   toutes les locales ;
 * - `{ key }` → texte **traduisible** (ex. un nom de biome), résolu via i18n.
 */
export type Cell = string | { key: string }

/** Élément de liste : amorce optionnelle en gras + texte, tous deux traduits. */
export interface ListItemRef {
  strongKey?: string
  textKey: string
}

/** Bloc de contenu rendu par `ContentBlock.vue`. */
export type Block =
  | { kind: 'paragraph'; textKey: string }
  | { kind: 'list'; items: ListItemRef[] }
  | { kind: 'table'; headerKeys: string[]; rows: Cell[][] }
  | { kind: 'image'; imageId: string; altKey: string }
  | { kind: 'selector'; labelKey: string; options: SelectorOptionRef[] }

/** Option d'un sélecteur (label traduit + blocs). */
export interface SelectorOptionRef {
  labelKey: string
  blocks: Block[]
}

/** Option résolue (label déjà traduit) transmise au slot du sélecteur. */
export interface ResolvedSelectorOption {
  label: string
  blocks: Block[]
}

/** Chapitre d'une catégorie. */
export interface Chapter {
  id: string
  titleKey: string
  summaryKey: string
  blocks: Block[]
}

/** Grande catégorie de gameplay. */
export interface Category {
  id: string
  titleKey: string
  chapters: Chapter[]
}

export type GameplayContent = Category[]
