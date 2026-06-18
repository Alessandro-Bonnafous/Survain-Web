<template>
  <div class="example-selector">
    <label class="example-selector__label">
      <span>{{ label }}</span>
      <select v-model.number="selected" class="example-selector__select">
        <option v-for="(option, i) in options" :key="i" :value="i">{{ option.label }}</option>
      </select>
    </label>

    <div class="example-selector__panel">
      <!-- Le rendu des blocs de l'option est délégué au parent (slot scopé),
           ce qui évite un cycle d'imports avec ContentBlock. -->
      <slot :option="options[selected]" :index="selected" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ResolvedSelectorOption } from '@/content/gameplay/types'

defineProps<{ label: string; options: ResolvedSelectorOption[] }>()

const selected = ref(0)
</script>

<style scoped>
.example-selector {
  margin: 1.4rem 0;
  padding: 1.2rem 1.3rem;
  border: 1px solid rgba(202, 164, 90, 0.2);
  background: rgba(202, 164, 90, 0.03);
}

.example-selector__label {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.68rem;
  color: var(--color-gold);
}

.example-selector__select {
  font-family: var(--font-body);
  text-transform: none;
  letter-spacing: normal;
  font-size: 0.95rem;
  background: rgba(7, 8, 10, 0.9);
  color: var(--parchment);
  border: 1px solid rgba(202, 164, 90, 0.4);
  padding: 0.5rem 0.7rem;
  max-width: 28rem;
}
.example-selector__select:focus-visible {
  outline: 2px solid var(--color-gold-light);
  outline-offset: 2px;
}

.example-selector__panel {
  margin-top: 1rem;
}
</style>
