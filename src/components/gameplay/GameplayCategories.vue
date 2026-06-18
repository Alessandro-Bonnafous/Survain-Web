<template>
  <div class="categories">
    <div class="categories__tabs" role="tablist">
      <button
        v-for="(category, i) in content"
        :key="category.id"
        type="button"
        role="tab"
        class="categories__tab"
        :class="{ 'categories__tab--active': i === active }"
        :aria-selected="i === active"
        @click="active = i"
      >
        {{ t(category.titleKey) }}
      </button>
    </div>

    <div class="categories__panel">
      <GameplayChapter
        v-for="chapter in content[active].chapters"
        :key="chapter.id"
        :chapter="chapter"
      />
    </div>
  </div>
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
.categories__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0 0 2.2rem;
}
.categories__tab {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--parchment);
  background: rgba(202, 164, 90, 0.06);
  border: 1px solid rgba(202, 164, 90, 0.28);
  padding: 0.6rem 1.1rem;
  cursor: pointer;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  transition:
    background 0.25s,
    color 0.25s,
    border-color 0.25s;
}
.categories__tab:hover {
  color: var(--color-gold-light);
  border-color: rgba(202, 164, 90, 0.5);
}
.categories__tab--active {
  background: linear-gradient(150deg, var(--color-gold-light), var(--color-gold) 70%);
  border-color: transparent;
  color: #1a1206;
}
</style>
