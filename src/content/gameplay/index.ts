import { gameplayFr } from './fr'
import { gameplayEn } from './en'
import type { GameplayContent } from './types'

export type { GameplayContent } from './types'
export { gameplayImages } from './images'

const byLocale: Record<string, GameplayContent> = {
  fr: gameplayFr,
  en: gameplayEn,
}

/** Renvoie le contenu Gameplay pour la locale donnée (repli sur le FR). */
export function getGameplayContent(locale: string): GameplayContent {
  return byLocale[locale] ?? gameplayFr
}
