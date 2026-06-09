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
  margin: 0 0 1rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.music-player__track {
  width: 100%;
  text-align: left;
  font-family: var(--font-body);
  background: transparent;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
  padding: 0.6rem 0.9rem;
  cursor: pointer;
  border-radius: 2px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.music-player__track--active,
.music-player__track:hover {
  background-color: var(--color-gold);
  color: var(--color-black);
}

.music-player__audio {
  width: 100%;
  max-width: 32rem;
}
</style>
