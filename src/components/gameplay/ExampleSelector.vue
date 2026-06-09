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
import type { SelectorOption } from '@/content/gameplay/types'

defineProps<{ label: string; options: SelectorOption[] }>()

const selected = ref(0)
</script>

<style scoped>
.example-selector {
  margin: 1rem 0;
}

.example-selector__label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-family: var(--font-body);
  color: var(--color-gold);
}

.example-selector__select {
  font-family: var(--font-body);
  background: var(--color-black);
  color: var(--color-gold-light);
  border: 1px solid var(--color-gold);
  padding: 0.4rem 0.6rem;
  border-radius: 2px;
  max-width: 28rem;
}

.example-selector__panel {
  margin-top: 0.75rem;
}
</style>
