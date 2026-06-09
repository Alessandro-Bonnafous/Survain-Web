<template>
  <header class="app-header">
    <!-- Héro volontairement minimal (dégradé via tokens). L'habillage final
         et l'imagerie de fond seront fournis par la maquette de Thierry. -->
    <RouterLink to="/" class="app-header__brand">
      <img
        :src="logoUrl"
        :alt="t('site.title')"
        class="app-header__logo"
        width="120"
        height="120"
      />
      <span class="app-header__title">{{ t('site.title') }}</span>
    </RouterLink>
    <p class="app-header__tagline">{{ t('site.tagline') }}</p>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import logoUrl from '@/assets/images/logo-survain.png'

const { t } = useI18n()
</script>

<style scoped>
.app-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 1rem 1.5rem;
  text-align: center;
  background: linear-gradient(180deg, var(--color-gold-dark), var(--color-black));
  border-bottom: 2px solid var(--color-gold);
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
}

.app-header__logo {
  width: clamp(72px, 12vw, 120px);
  height: auto;
}

.app-header__title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 9vw, 5rem);
  color: var(--color-red);
  letter-spacing: 0.04em;
}

.app-header__tagline {
  margin: 0;
  font-family: var(--font-body);
  color: var(--color-gold-light);
  font-size: clamp(0.95rem, 2.5vw, 1.25rem);
}
</style>
