<!--
  Page Gameplay (Sprint B) : fusionne Gameplay + Outils sous deux sous-onglets
  (« Gameplay » / « Arbre de craft »). Nouvelle DA, layout `blank` (nav fixe).
  L'ancienne route /tools redirige ici (cf. main.ts).
-->
<route>
{
  meta: {
    layout: 'blank'
  }
}
</route>

<template>
  <main class="gp">
    <div class="gp__inner">
      <header class="gp__head">
        <p class="gp__eyebrow">
          <span class="gp__rule" aria-hidden="true" />
          {{ t('nav.gameplay') }}
          <span class="gp__rule" aria-hidden="true" />
        </p>
        <h1 class="gp__title">{{ t('pages.gameplay.title') }}</h1>
      </header>

      <div class="gp__subtabs" role="tablist" :aria-label="t('pages.gameplay.title')">
        <button
          v-for="option in TABS"
          :key="option"
          type="button"
          role="tab"
          class="gp__subtab"
          :class="{ 'gp__subtab--active': option === tab }"
          :aria-selected="option === tab"
          @click="tab = option"
        >
          {{ t(`pages.gameplay.tabs.${option}`) }}
        </button>
      </div>

      <GameplayCategories v-if="tab === 'gameplay'" />
      <CraftTree v-else />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import GameplayCategories from '@/components/gameplay/GameplayCategories.vue'
import CraftTree from '@/components/gameplay/CraftTree.vue'

const { t } = useI18n()

const TABS = ['gameplay', 'craft'] as const
type Tab = (typeof TABS)[number]
const tab = ref<Tab>('gameplay')
</script>

<style scoped>
.gp {
  min-height: 100vh;
  background: var(--ink);
  /* dégage la nav fixe */
  padding: clamp(7rem, 14vh, 10rem) 0 clamp(4rem, 10vh, 7rem);
}
.gp__inner {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.gp__head {
  text-align: center;
  margin-bottom: 2.6rem;
}
.gp__eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
  margin: 0 0 1rem;
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: var(--tracking-caps);
  color: var(--color-gold);
}
.gp__rule {
  height: 1px;
  width: clamp(1.5rem, 9vw, 5rem);
  background: linear-gradient(90deg, transparent, rgba(202, 164, 90, 0.6));
}
.gp__eyebrow .gp__rule:last-child {
  background: linear-gradient(90deg, rgba(202, 164, 90, 0.6), transparent);
}
.gp__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  letter-spacing: 0.04em;
  color: var(--stone-light);
  margin: 0;
}

.gp__subtabs {
  display: flex;
  justify-content: center;
  gap: 0;
  margin: 0 auto 3rem;
  width: fit-content;
  border: 1px solid rgba(202, 164, 90, 0.28);
  clip-path: polygon(
    11px 0,
    100% 0,
    100% calc(100% - 11px),
    calc(100% - 11px) 100%,
    0 100%,
    0 11px
  );
  background: rgba(7, 8, 10, 0.6);
}
.gp__subtab {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--parchment);
  background: none;
  border: 0;
  padding: 0.85rem 1.9rem;
  cursor: pointer;
  transition:
    background 0.25s,
    color 0.25s;
}
.gp__subtab:hover {
  color: var(--color-gold-light);
}
.gp__subtab--active {
  background: linear-gradient(150deg, var(--color-gold-light), var(--color-gold) 70%);
  color: #1a1206;
}
.gp__subtab:focus-visible {
  outline: 2px solid var(--color-gold-light);
  outline-offset: 2px;
}
</style>
