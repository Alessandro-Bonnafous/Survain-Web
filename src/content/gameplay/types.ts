/**
 * Schéma de contenu de la page Gameplay.
 *
 * Le contenu est modélisé en TypeScript typé (et non en markdown) car il
 * contient des tableaux et des sélecteurs interactifs. Une version par locale
 * (`fr.ts`, `en.ts`) partage ce même schéma ; un test de parité garantit que
 * les deux restent structurellement alignées.
 *
 * La présentation est volontairement neutre (cf. composants génériques) : la
 * maquette de Thierry ne touchera que la couche d'affichage, pas ces données.
 */

/** Élément d'une liste à puces (avec une amorce optionnelle en gras). */
export interface ListItem {
  /** Amorce mise en gras (ex. « L'entrepôt : »). */
  strong?: string
  text: string
}

/** Image de contenu (chemin résolu côté composant via import d'asset). */
export interface ContentImage {
  /** Identifiant logique de l'image (mappé vers un asset, cf. `images.ts`). */
  id: string
  alt: string
}

/** Bloc de contenu rendu par `ContentBlock.vue`. */
export type Block =
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: ListItem[] }
  | { kind: 'table'; headers: string[]; rows: string[][] }
  | { kind: 'image'; image: ContentImage }
  | { kind: 'selector'; label: string; options: SelectorOption[] }

/** Une option d'un sélecteur (ex. un métier, un set d'arme par biome). */
export interface SelectorOption {
  label: string
  blocks: Block[]
}

/** Un chapitre d'une catégorie (carte + contenu détaillé). */
export interface Chapter {
  id: string
  title: string
  /** Résumé court affiché en tête de chapitre. */
  summary: string
  blocks: Block[]
}

/** Une des grandes catégories de gameplay. */
export interface Category {
  id: string
  title: string
  chapters: Chapter[]
}

export type GameplayContent = Category[]
