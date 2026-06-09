<template>
  <p v-if="block.kind === 'paragraph'" class="content-block__paragraph">{{ t(block.textKey) }}</p>

  <ul v-else-if="block.kind === 'list'" class="content-block__list">
    <li v-for="(item, i) in block.items" :key="i">
      <strong v-if="item.strongKey">{{ t(item.strongKey) }}</strong>
      {{ t(item.textKey) }}
    </li>
  </ul>

  <InfoTable
    v-else-if="block.kind === 'table'"
    :headers="block.headerKeys.map((key) => t(key))"
    :rows="block.rows.map(resolveRow)"
  />

  <figure v-else-if="block.kind === 'image'" class="content-block__figure">
    <img :src="imageSrc(block.imageId)" :alt="t(block.altKey)" loading="lazy" />
  </figure>

  <ExampleSelector
    v-else-if="block.kind === 'selector'"
    v-slot="{ option }"
    :label="t(block.labelKey)"
    :options="resolveOptions(block.options)"
  >
    <ContentBlock v-for="(child, i) in option.blocks" :key="i" :block="child" />
  </ExampleSelector>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type {
  Block,
  Cell,
  ResolvedSelectorOption,
  SelectorOptionRef,
} from '@/content/gameplay/types'
import { gameplayImages } from '@/content/gameplay/images'
import InfoTable from '@/components/ui/InfoTable.vue'
import ExampleSelector from './ExampleSelector.vue'

// `name` explicite pour permettre l'auto-référence récursive (blocs de sélecteur).
defineOptions({ name: 'ContentBlock' })

defineProps<{ block: Block }>()

const { t } = useI18n()

/** Une cellule littérale est rendue telle quelle ; une clé est traduite. */
function resolveCell(cell: Cell): string {
  return typeof cell === 'string' ? cell : t(cell.key)
}

function resolveRow(row: Cell[]): string[] {
  return row.map(resolveCell)
}

function resolveOptions(options: SelectorOptionRef[]): ResolvedSelectorOption[] {
  return options.map((option) => ({ label: t(option.labelKey), blocks: option.blocks }))
}

function imageSrc(id: string): string {
  return gameplayImages[id] ?? ''
}
</script>

<style scoped>
.content-block__paragraph {
  font-family: var(--font-body);
  line-height: 1.6;
  color: var(--color-gold-light);
  margin: 0 0 1rem;
}

.content-block__list {
  font-family: var(--font-body);
  line-height: 1.6;
  color: var(--color-gold-light);
  margin: 0 0 1rem;
  padding-left: 1.25rem;
}

.content-block__list li {
  margin-bottom: 0.5rem;
}

.content-block__list strong {
  color: var(--color-gold);
}

.content-block__figure {
  margin: 1rem 0;
}

.content-block__figure img {
  max-width: 100%;
  height: auto;
  border: 1px solid var(--color-gold);
}
</style>
