<template>
  <section class="gameplay">
    <h1 class="gameplay__title">{{ t('pages.gameplay.title') }}</h1>

    <div class="gameplay__tabs" role="tablist">
      <button
        v-for="(category, i) in content"
        :key="category.id"
        type="button"
        role="tab"
        class="gameplay__tab"
        :class="{ 'gameplay__tab--active': i === active }"
        :aria-selected="i === active"
        @click="active = i"
      >
        {{ t(category.titleKey) }}
      </button>
    </div>

    <div class="gameplay__panel">
      <GameplayChapter
        v-for="chapter in content[active].chapters"
        :key="chapter.id"
        :chapter="chapter"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { gameplayStructure } from '@/content/gameplay'
import GameplayChapter from '@/components/gameplay/GameplayChapter.vue'

const { t } = useI18n()

// La structure est unique ; seuls les libellés suivent la locale (via t()).
const content = gameplayStructure
const active = ref(0)
</script>

<style scoped>
.gameplay__title {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-gold);
}

.gameplay__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0;
}

.gameplay__tab {
  font-family: var(--font-body);
  background: transparent;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 2px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.gameplay__tab--active,
.gameplay__tab:hover {
  background-color: var(--color-gold);
  color: var(--color-black);
}
</style>
