<template>
  <div class="music-player">
    <ul class="music-player__list">
      <li v-for="(track, i) in tracks" :key="track.src">
        <button
          type="button"
          class="music-player__track"
          :class="{ 'music-player__track--active': i === selected }"
          :aria-pressed="i === selected"
          @click="select(i)"
        >
          {{ track.title }}
        </button>
      </li>
    </ul>

    <audio ref="audio" class="music-player__audio" controls :src="current?.src"></audio>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { MusicTrack } from '@/config/music'

const props = defineProps<{ tracks: MusicTrack[] }>()

const selected = ref(0)
const audio = ref<HTMLAudioElement | null>(null)
const current = computed(() => props.tracks[selected.value])

function select(index: number): void {
  selected.value = index
  const el = audio.value
  if (!el) return
  try {
    el.load()
    const played = el.play()
    if (played && typeof played.catch === 'function') {
      // Lecture auto possiblement bloquée par le navigateur : on ignore.
      played.catch(() => {})
    }
  } catch {
    // `play()`/`load()` indisponibles (ex. environnement de test) : no-op.
  }
}
</script>

<style scoped>
.music-player__list {
  list-style: none;
  margin: 0 0 1.1rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.music-player__track {
  width: 100%;
  text-align: left;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
  font-weight: 600;
  background: rgba(202, 164, 90, 0.06);
  color: var(--parchment);
  border: 1px solid rgba(202, 164, 90, 0.28);
  padding: 0.65rem 0.95rem;
  cursor: pointer;
  clip-path: polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px);
  transition:
    background 0.25s,
    color 0.25s,
    border-color 0.25s;
}
.music-player__track:hover {
  color: var(--color-gold-light);
  border-color: rgba(202, 164, 90, 0.5);
}
.music-player__track--active {
  background: linear-gradient(150deg, var(--color-gold-light), var(--color-gold) 70%);
  border-color: transparent;
  color: #1a1206;
}

.music-player__audio {
  width: 100%;
  max-width: 32rem;
}
</style>
