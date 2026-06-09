<template>
  <article class="gameplay-chapter">
    <h3 class="gameplay-chapter__title">{{ t(chapter.titleKey) }}</h3>
    <p class="gameplay-chapter__summary">{{ t(chapter.summaryKey) }}</p>
    <ContentBlock v-for="(block, i) in chapter.blocks" :key="i" :block="block" />
  </article>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Chapter } from '@/content/gameplay/types'
import ContentBlock from './ContentBlock.vue'

defineProps<{ chapter: Chapter }>()

const { t } = useI18n()
</script>

<style scoped>
.gameplay-chapter {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-gold-dark);
}

.gameplay-chapter:last-child {
  border-bottom: none;
}

.gameplay-chapter__title {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-gold);
  margin: 0 0 0.5rem;
}

.gameplay-chapter__summary {
  font-family: var(--font-body);
  font-style: italic;
  color: var(--color-gold-light);
  opacity: 0.85;
  margin: 0 0 1rem;
}
</style>
