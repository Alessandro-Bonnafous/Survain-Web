<!--
  Page Simulateur de forge (Sprint M3) : mini-jeu d'artisanat « T3 — Hall des
  Artisans » porté depuis le legacy. Layout `blank` (nav fixe partagée).
  Toute la logique vit dans `useForgeSimulator` ; l'UI dans `ForgeSimulator`.
-->
<route>
{
  meta: {
    layout: 'blank'
  }
}
</route>

<template>
  <main class="forge-page">
    <div class="forge-page__inner">
      <header class="forge-page__head">
        <p class="forge-page__eyebrow">
          <span class="forge-page__rule" aria-hidden="true" />
          {{ t('forge.page.eyebrow') }}
          <span class="forge-page__rule" aria-hidden="true" />
        </p>
        <h1 class="forge-page__title">{{ t('forge.page.title') }}</h1>
      </header>

      <ForgeSimulator />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ForgeSimulator from '@/components/forge/ForgeSimulator.vue'

const { t } = useI18n()
</script>

<style scoped>
.forge-page {
  min-height: 100vh;
  background: var(--ink);
  padding: clamp(7rem, 14vh, 10rem) 0 clamp(4rem, 10vh, 7rem);
}
.forge-page__inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2.5rem;
}
.forge-page__head {
  text-align: center;
  margin-bottom: 2.6rem;
}
.forge-page__eyebrow {
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
.forge-page__rule {
  height: 1px;
  width: clamp(1.5rem, 9vw, 5rem);
  background: linear-gradient(90deg, transparent, rgba(202, 164, 90, 0.6));
}
.forge-page__eyebrow .forge-page__rule:last-child {
  background: linear-gradient(90deg, rgba(202, 164, 90, 0.6), transparent);
}
.forge-page__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  letter-spacing: 0.04em;
  color: var(--stone-light);
  margin: 0;
}
</style>
