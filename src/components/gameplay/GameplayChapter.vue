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
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(202, 164, 90, 0.16);
}

.gameplay-chapter:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.gameplay-chapter__title {
  font-family: var(--font-display);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 1.25rem;
  color: var(--color-gold);
  margin: 0 0 0.6rem;
}

.gameplay-chapter__summary {
  font-family: var(--font-body);
  font-style: italic;
  color: var(--ash);
  margin: 0 0 1.4rem;
  line-height: 1.6;
}
</style>
