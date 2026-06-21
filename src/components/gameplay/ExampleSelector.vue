<template>
  <div class="example-selector">
    <div class="example-selector__label">
      <span>{{ label }}</span>
      <SelectMenu
        :model-value="selected"
        :options="selectOptions"
        :aria-label="label"
        @update:model-value="selected = Number($event)"
      />
    </div>

    <div class="example-selector__panel">
      <!-- Le rendu des blocs de l'option est délégué au parent (slot scopé),
           ce qui évite un cycle d'imports avec ContentBlock. -->
      <slot :option="options[selected]" :index="selected" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SelectMenu from '@/components/ui/SelectMenu.vue'
import type { ResolvedSelectorOption } from '@/content/gameplay/types'

const props = defineProps<{ label: string; options: ResolvedSelectorOption[] }>()

const selected = ref(0)

const selectOptions = computed(() =>
  props.options.map((option, i) => ({ value: i, label: option.label })),
)
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

.example-selector__panel {
  margin-top: 1rem;
}
</style>
