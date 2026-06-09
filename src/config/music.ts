/**
 * Pistes musicales de la communauté (OST du jeu, reprises du site legacy).
 * Les fichiers sont servis statiquement depuis `public/sons/`. Les titres sont
 * des noms propres, identiques quelle que soit la langue.
 */
export interface MusicTrack {
  title: string
  src: string
}

export const MUSIC_TRACKS: MusicTrack[] = [
  { title: 'Heart of the Northern Realm', src: '/sons/heart-of-the-northern-realm.mp3' },
  { title: 'Heart of the Northern Realm (II)', src: '/sons/heart-of-the-northern-realm-2.mp3' },
  { title: 'Whispers of the First Contrée', src: '/sons/whispers-of-the-first-contree.mp3' },
]
