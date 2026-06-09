import regionsPvp from '@/assets/images/gameplay/regions-pvp.jpg'
import panoramaPvp from '@/assets/images/gameplay/panorama-pvp.jpg'

/**
 * Mappe l'identifiant logique d'une image de contenu vers l'URL de l'asset
 * (résolue/optimisée par Vite). Les blocs `image` du contenu référencent ces
 * ids plutôt qu'un chemin, pour découpler le contenu des assets.
 */
export const gameplayImages: Record<string, string> = {
  'regions-pvp': regionsPvp,
  'panorama-pvp': panoramaPvp,
}
