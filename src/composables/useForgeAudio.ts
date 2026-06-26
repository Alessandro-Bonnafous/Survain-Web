import { ref } from 'vue'
import { FORGE_SND } from '@/config/forge'

/**
 * Effets sonores du simulateur de forge. Les éléments `Audio` sont créés
 * paresseusement (au premier `play`) pour rester compatibles avec le rendu
 * statique (pas de `new Audio` côté serveur) et l'environnement de test
 * (happy-dom, sans véritable décodeur audio).
 *
 * Tous les sons sont déclenchés par une interaction utilisateur : l'autoplay
 * n'est donc pas bloqué, mais on enveloppe `play()` par sécurité (cf.
 * `MusicPlayer.vue`).
 */

export type ForgeSound = 'bellows' | 'furnaceMineral' | 'hammer' | 'pinceRotation' | 'trempe'

const SOUND_SRC: Record<ForgeSound, string> = {
  bellows: `${FORGE_SND}/soufflet.mp3`,
  furnaceMineral: `${FORGE_SND}/fourneau-minerai.mp3`,
  hammer: `${FORGE_SND}/hammer.mp3`,
  pinceRotation: `${FORGE_SND}/pince-rotation.mp3`,
  trempe: `${FORGE_SND}/trempe.mp3`,
}

/** Sons joués en boucle (le fourneau ronfle tant que le minerai chauffe). */
const LOOPING: ForgeSound[] = ['furnaceMineral']

export function useForgeAudio() {
  const muted = ref(false)
  const elements = new Map<ForgeSound, HTMLAudioElement>()

  function getElement(sound: ForgeSound): HTMLAudioElement | null {
    if (typeof Audio === 'undefined') return null

    let el = elements.get(sound)
    if (!el) {
      try {
        el = new Audio(SOUND_SRC[sound])
        el.preload = 'auto'
        if (LOOPING.includes(sound)) el.loop = true
        elements.set(sound, el)
      } catch {
        return null
      }
    }
    return el
  }

  function play(sound: ForgeSound): void {
    if (muted.value) return

    const el = getElement(sound)
    if (!el) return

    try {
      el.pause()
      el.currentTime = 0
      const played = el.play()
      if (played && typeof played.catch === 'function') {
        played.catch(() => {})
      }
    } catch {
      // API audio indisponible (ex. environnement de test) : no-op.
    }
  }

  function stop(sound: ForgeSound): void {
    const el = elements.get(sound)
    if (!el) return

    try {
      el.pause()
      el.currentTime = 0
    } catch {
      // no-op
    }
  }

  function stopAll(): void {
    for (const sound of elements.keys()) {
      stop(sound)
    }
  }

  function toggleMute(): void {
    muted.value = !muted.value
    if (muted.value) stopAll()
  }

  return { muted, play, stop, stopAll, toggleMute }
}

export type ForgeAudioApi = ReturnType<typeof useForgeAudio>
